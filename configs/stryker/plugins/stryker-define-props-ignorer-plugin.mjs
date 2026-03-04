// eslint-disable-next-line unicorn/prevent-abbreviations
import { PluginKind, declareValuePlugin } from "@stryker-mutator/api/plugin";

export const strykerPlugins = [
  declareValuePlugin(PluginKind.Ignore, "defineProps", {
    // eslint-disable-next-line complexity
    shouldIgnore(path) {
      const isDefinePropertiesCall = node => node?.type === "Identifier" && node.name === "defineProps";
      const expression = path.node.expression || path.node.init;
      const ignoreReason = "We can't mutate defineProps macro as it is stated here: https://github.com/stryker-mutator/stryker-js/issues/3305.";

      if (
        expression?.type === "CallExpression" &&
        (isDefinePropertiesCall(expression.callee) ||
          expression.callee?.name === "withDefaults" &&
          expression.arguments[0]?.type === "CallExpression" &&
          isDefinePropertiesCall(expression.arguments[0]?.callee))
      ) {
        return ignoreReason;
      }

      const isVariableWithDefineProperties =
        path.isVariableDeclarator() &&
        path.node.id.type === "Identifier" &&
        path.node.init?.type === "CallExpression" &&
        (isDefinePropertiesCall(path.node.init.callee) ||
          path.node.init?.callee?.name === "withDefaults" &&
          path.node.init?.arguments[0]?.type === "CallExpression" &&
          isDefinePropertiesCall(path.node.init?.arguments[0]?.callee));

      if (isVariableWithDefineProperties) {
        return ignoreReason;
      }
    },
  }),
];
