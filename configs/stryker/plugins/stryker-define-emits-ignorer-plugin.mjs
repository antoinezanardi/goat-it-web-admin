import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

function isDefineEmitsCall(node) {
  return node?.type === "Identifier" && node.name === "defineEmits";
}

function shouldIgnore(path) {
  const expression = path.node.expression || path.node.init;
  const ignoreReason = "We can't mutate defineEmits macro as it is stated here: https://github.com/stryker-mutator/stryker-js/issues/3305.";

  if (expression?.type === "CallExpression" && isDefineEmitsCall(expression.callee)) {
    return ignoreReason;
  }

  const isVariableWithDefineEmits =
    path.isVariableDeclarator() &&
    path.node.id.type === "Identifier" &&
    path.node.init?.type === "CallExpression" &&
    isDefineEmitsCall(path.node.init.callee);

  if (isVariableWithDefineEmits) {
    return ignoreReason;
  }
}

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "defineEmits", {
    shouldIgnore,
  }),
];