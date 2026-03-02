import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "defineModel", {
    shouldIgnore(path) {
      const isDefineModelCall = node => node?.type === "Identifier" && node.name === "defineModel";
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
      return undefined;
    },
  }),
];
