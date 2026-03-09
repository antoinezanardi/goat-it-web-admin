import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

function isDefineModelCall(node) {
  return node?.type === "Identifier" && node.name === "defineModel";
}

function shouldIgnore(path) {
  const expression = path.node.expression || path.node.init;
  const ignoreReason = "We can't mutate defineModel macro as it is stated here: https://github.com/stryker-mutator/stryker-js/issues/3305.";

  if (expression?.type === "CallExpression" && isDefineModelCall(expression.callee)) {
    return ignoreReason;
  }

  const isVariableWithDefineModel =
    path.isVariableDeclarator() &&
    path.node.id.type === "Identifier" &&
    path.node.init?.type === "CallExpression" &&
    isDefineModelCall(path.node.init.callee);

  if (isVariableWithDefineModel) {
    return ignoreReason;
  }
}

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "defineModel", {
    shouldIgnore,
  }),
];