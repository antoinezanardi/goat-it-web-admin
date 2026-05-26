import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const CONFIG_PATH = path.resolve(import.meta.dirname, "../configs/oxlint/oxlint.config.jsonc");
const EXCLUDED_PLUGINS = new Set(["jest", "jsdoc", "jsx_a11y", "nextjs", "react", "react_perf"]);
const EXIT_CODE_MISSING = 1;
const EXIT_CODE_ERROR = 2;

type RulesByPlugin = Map<string, Set<string>>;

type OxlintRuleEntry = {
  scope: string;
  value: string;
};

type OxlintConfig = {
  rules?: Record<string, unknown>;
  overrides?: { rules?: Record<string, unknown> }[];
};

class ScriptError extends Error {
  public override readonly name = "ScriptError";

  public readonly exitCode: number;

  public constructor(message: string, exitCode: number) {
    super(message);
    this.exitCode = exitCode;
  }
}

function getOxlintVersion(): string {
  try {
    const raw: string = execSync("pnpm exec oxlint --version", { encoding: "utf8" }).trim();

    return raw.replace(/^version:\s*/iu, "");
  } catch {
    return "unknown";
  }
}

function isOxlintRuleEntryArray(data: unknown): data is OxlintRuleEntry[] {
  return Array.isArray(data) && data.every((entry: unknown) => typeof entry === "object" && entry !== null && "scope" in entry && "value" in entry);
}

function fetchRulesJson(): OxlintRuleEntry[] {
  const output: string = execSync("pnpm exec oxlint --rules --format json", { encoding: "utf8" });

  if (!output.trim()) {
    throw new ScriptError("'oxlint --rules --format json' returned empty output.", EXIT_CODE_ERROR);
  }

  const parsed: unknown = JSON.parse(output);

  if (!isOxlintRuleEntryArray(parsed)) {
    throw new ScriptError("Unexpected JSON structure from 'oxlint --rules --format json'.", EXIT_CODE_ERROR);
  }
  return parsed;
}

function getAvailableRules(): RulesByPlugin {
  const entries = fetchRulesJson();
  const rules: RulesByPlugin = new Map();

  for (const { scope, value } of entries) {
    if (!EXCLUDED_PLUGINS.has(scope)) {
      const existing: Set<string> = rules.get(scope) ?? new Set();

      existing.add(value);
      rules.set(scope, existing);
    }
  }

  if (rules.size === 0) {
    throw new ScriptError("No rules found in 'oxlint --rules --format json' output.", EXIT_CODE_ERROR);
  }
  return rules;
}

function stripJsoncComments(content: string): string {
  return content
    .replaceAll(/^\s*\/\/.*$/gmu, "")
    .replaceAll(/\/\/[^"]*$/gmu, "");
}

function isOxlintConfig(data: unknown): data is OxlintConfig {
  return typeof data === "object" && data !== null;
}

function parseConfig(): OxlintConfig {
  const content: string = readFileSync(CONFIG_PATH, "utf8");
  const parsed: unknown = JSON.parse(stripJsoncComments(content));

  if (!isOxlintConfig(parsed)) {
    throw new ScriptError("Unexpected config structure in oxlint.config.jsonc.", EXIT_CODE_ERROR);
  }
  return parsed;
}

function collectConfiguredRules(config: OxlintConfig): Set<string> {
  const configured: Set<string> = new Set();

  const collectFromObject = (rulesObject: Record<string, unknown>): void => {
    for (const key of Object.keys(rulesObject)) {
      const slashIndex = key.indexOf("/");

      if (slashIndex === -1) {
        return;
      }

      const plugin = key.slice(0, slashIndex);
      const ruleName = key.slice(slashIndex + 1);

      if (!EXCLUDED_PLUGINS.has(plugin)) {
        configured.add(`${plugin}/${ruleName}`);
      }
    }
  };

  if (config.rules) {
    collectFromObject(config.rules);
  }

  if (config.overrides) {
    for (const override of config.overrides) {
      if (override.rules) {
        collectFromObject(override.rules);
      }
    }
  }
  return configured;
}

function computeMissingRules(available: RulesByPlugin, configured: Set<string>): RulesByPlugin {
  const missing: RulesByPlugin = new Map();

  for (const [plugin, ruleSet] of available) {
    for (const ruleName of ruleSet) {
      const fullName = `${plugin}/${ruleName}`;

      if (!configured.has(fullName)) {
        const existing: Set<string> = missing.get(plugin) ?? new Set();

        existing.add(ruleName);
        missing.set(plugin, existing);
      }
    }
  }
  return missing;
}

function countRules(rulesMap: RulesByPlugin): number {
  let total = 0;

  for (const ruleSet of rulesMap.values()) {
    total += ruleSet.size;
  }
  return total;
}

function printReport(available: RulesByPlugin, configured: Set<string>, missing: RulesByPlugin): void {
  const version = getOxlintVersion();
  const availableCount = countRules(available);
  const missingCount = countRules(missing);

  console.log(`📦 Oxlint version: ${version}`);
  console.log(`📋 Available rules (included plugins): ${availableCount}`);
  console.log(`⚙️ Configured rules: ${configured.size}\n`);

  if (missingCount === 0) {
    console.log("✅ All rules are covered!");

    return;
  }

  console.log(`⚠️  Missing rules (${missingCount}):\n`);

  const sortedPlugins = [...missing.keys()].toSorted((left, right) => left.localeCompare(right));

  for (const plugin of sortedPlugins) {
    const ruleSet = missing.get(plugin) ?? new Set<string>();
    const sortedRules = [...ruleSet].toSorted((left, right) => left.localeCompare(right));

    console.log(`── ${plugin} (${sortedRules.length}) ──`);

    for (const rule of sortedRules) {
      console.log(`   ${plugin}/${rule}`);
    }

    console.log();
  }

  console.log(`📊 Total missing: ${missingCount} rules`);

  throw new ScriptError("Missing rules found.", EXIT_CODE_MISSING);
}

function main(): void {
  console.log("🔍 Checking oxlint rules coverage...\n");

  const available = getAvailableRules();
  const config = parseConfig();
  const configured = collectConfiguredRules(config);
  const missing = computeMissingRules(available, configured);

  printReport(available, configured, missing);
}

try {
  main();
} catch(error: unknown) {
  if (error instanceof ScriptError) {
    process.exitCode = error.exitCode;
  } else {
    console.error("❌ Unexpected error:", error);
    process.exitCode = EXIT_CODE_ERROR;
  }
}