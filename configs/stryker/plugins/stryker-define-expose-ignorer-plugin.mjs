import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

function isDefineExposeCall(node) {
  return node?.type === "Identifier" && node.name === "defineExpose";
}

function shouldIgnore(path) {
  const expression = path.node.expression || path.node.init;

  if (expression?.type === "CallExpression" && isDefineExposeCall(expression.callee)) {
    return "The macro defineExpose from Nuxt is breaking Stryker, so we ignore it.";
  }
}

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "defineExpose", {
    shouldIgnore,
  }),
];