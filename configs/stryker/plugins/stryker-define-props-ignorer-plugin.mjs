/* eslint-disable unicorn/prevent-abbreviations */
import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

function isDefinePropsCall(node) {
  return node?.type === "Identifier" && node.name === "defineProps";
}

function isWithDefaultsWrappedDefineProps(callExpression) {
  return (
    callExpression?.callee?.name === "withDefaults" &&
    callExpression.arguments[0]?.type === "CallExpression" &&
    isDefinePropsCall(callExpression.arguments[0]?.callee)
  );
}

function isCallExpressionDefinePropsOrWithDefaults(expression) {
  return (
    expression?.type === "CallExpression" &&
    (isDefinePropsCall(expression.callee) || isWithDefaultsWrappedDefineProps(expression))
  );
}

function isVariableWithDefineProperties(path) {
  const init = path.node.init;

  return (
    path.isVariableDeclarator() &&
    path.node.id.type === "Identifier" &&
    init?.type === "CallExpression" &&
    (isDefinePropsCall(init.callee) || isWithDefaultsWrappedDefineProps(init))
  );
}

function shouldIgnore(path) {
  const expression = path.node.expression || path.node.init;
  const ignoreReason = "We can't mutate defineProps macro as it is stated here: https://github.com/stryker-mutator/stryker-js/issues/3305.";

  if (isCallExpressionDefinePropsOrWithDefaults(expression)) {
    return ignoreReason;
  }

  if (isVariableWithDefineProperties(path)) {
    return ignoreReason;
  }
}

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "defineProps", {
    shouldIgnore,
  }),
];