import {
  debounce_default,
  init_debounce,
  init_ownerDocument,
  init_ownerWindow,
  init_useEnhancedEffect,
  ownerDocument_default,
  ownerWindow_default,
  useEnhancedEffect_default
} from "./chunk-7WDVHGNN.js";
import {
  init_isMuiElement,
  isMuiElement_default
} from "./chunk-ODFDX5RU.js";
import {
  init_useControlled,
  useControlled_default
} from "./chunk-4KID2AFQ.js";
import {
  createSvgIcon,
  init_createSvgIcon
} from "./chunk-7CDB7VAH.js";
import {
  init_requirePropFactory,
  requirePropFactory_default
} from "./chunk-KZVLZIDA.js";
import {
  init_useEventCallback,
  useEventCallback_default
} from "./chunk-FJAHJOV7.js";
import {
  init_useIsFocusVisible,
  useIsFocusVisible_default
} from "./chunk-VAG2RHAJ.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-YYOKWU5P.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-B6UEPJV2.js";
import {
  ClassNameGenerator_default,
  createChainedFunction,
  deprecatedPropType,
  init_esm,
  setRef,
  unsupportedProp,
  useId
} from "./chunk-7ICDQWAS.js";
import {
  __esm,
  __export
} from "./chunk-7TNKEIRG.js";

// node_modules/@mui/material/utils/createChainedFunction.js
var createChainedFunction_default;
var init_createChainedFunction = __esm({
  "node_modules/@mui/material/utils/createChainedFunction.js"() {
    init_esm();
    createChainedFunction_default = createChainedFunction;
  }
});

// node_modules/@mui/material/utils/deprecatedPropType.js
var deprecatedPropType_default;
var init_deprecatedPropType = __esm({
  "node_modules/@mui/material/utils/deprecatedPropType.js"() {
    init_esm();
    deprecatedPropType_default = deprecatedPropType;
  }
});

// node_modules/@mui/material/utils/setRef.js
var setRef_default;
var init_setRef = __esm({
  "node_modules/@mui/material/utils/setRef.js"() {
    init_esm();
    setRef_default = setRef;
  }
});

// node_modules/@mui/material/utils/useId.js
var useId_default;
var init_useId = __esm({
  "node_modules/@mui/material/utils/useId.js"() {
    "use client";
    init_esm();
    useId_default = useId;
  }
});

// node_modules/@mui/material/utils/unsupportedProp.js
var unsupportedProp_default;
var init_unsupportedProp = __esm({
  "node_modules/@mui/material/utils/unsupportedProp.js"() {
    init_esm();
    unsupportedProp_default = unsupportedProp;
  }
});

// node_modules/@mui/base/ClassNameGenerator/index.js
var init_ClassNameGenerator = __esm({
  "node_modules/@mui/base/ClassNameGenerator/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/material/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  capitalize: () => capitalize_default,
  createChainedFunction: () => createChainedFunction_default,
  createSvgIcon: () => createSvgIcon,
  debounce: () => debounce_default,
  deprecatedPropType: () => deprecatedPropType_default,
  isMuiElement: () => isMuiElement_default,
  ownerDocument: () => ownerDocument_default,
  ownerWindow: () => ownerWindow_default,
  requirePropFactory: () => requirePropFactory_default,
  setRef: () => setRef_default,
  unstable_ClassNameGenerator: () => unstable_ClassNameGenerator,
  unstable_useEnhancedEffect: () => useEnhancedEffect_default,
  unstable_useId: () => useId_default,
  unsupportedProp: () => unsupportedProp_default,
  useControlled: () => useControlled_default,
  useEventCallback: () => useEventCallback_default,
  useForkRef: () => useForkRef_default,
  useIsFocusVisible: () => useIsFocusVisible_default
});
var unstable_ClassNameGenerator;
var init_utils = __esm({
  "node_modules/@mui/material/utils/index.js"() {
    "use client";
    init_ClassNameGenerator();
    init_capitalize();
    init_createChainedFunction();
    init_createSvgIcon();
    init_debounce();
    init_deprecatedPropType();
    init_isMuiElement();
    init_ownerDocument();
    init_ownerWindow();
    init_requirePropFactory();
    init_setRef();
    init_useEnhancedEffect();
    init_useId();
    init_unsupportedProp();
    init_useControlled();
    init_useEventCallback();
    init_useForkRef();
    init_useIsFocusVisible();
    unstable_ClassNameGenerator = {
      configure: (generator) => {
        if (true) {
          console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join("\n"));
        }
        ClassNameGenerator_default.configure(generator);
      }
    };
  }
});

export {
  createChainedFunction_default,
  init_createChainedFunction,
  deprecatedPropType_default,
  setRef_default,
  useId_default,
  init_useId,
  unsupportedProp_default,
  init_unsupportedProp,
  unstable_ClassNameGenerator,
  utils_exports,
  init_utils
};
//# sourceMappingURL=chunk-LT2PXHPK.js.map
