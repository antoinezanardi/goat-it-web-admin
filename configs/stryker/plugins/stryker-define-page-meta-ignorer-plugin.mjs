import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

function isDefinePageMetaCall(node) {
  return node?.type === "Identifier" && node.name === "definePageMeta";
}

function shouldIgnore(path) {
  const expression = path.node.expression || path.node.init;

  if (expression?.type === "CallExpression" && isDefinePageMetaCall(expression.callee)) {
    return "The macro definePageMeta from Nuxt is breaking Stryker, so we ignore it.";
  }
}

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "definePageMeta", {
    shouldIgnore,
  }),
];