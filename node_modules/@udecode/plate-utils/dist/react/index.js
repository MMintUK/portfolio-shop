"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  PlateElement: () => PlateElement,
  PlateLeaf: () => PlateLeaf,
  createNodeHOC: () => createNodeHOC,
  createNodesHOC: () => createNodesHOC,
  createNodesWithHOC: () => createNodesWithHOC,
  selectEditor: () => selectEditor,
  useFormInputProps: () => useFormInputProps,
  useMarkToolbarButton: () => useMarkToolbarButton,
  useMarkToolbarButtonState: () => useMarkToolbarButtonState,
  usePlaceholderState: () => usePlaceholderState,
  usePlateElement: () => usePlateElement,
  usePlateLeaf: () => usePlateLeaf,
  useRemoveNodeButton: () => useRemoveNodeButton
});
module.exports = __toCommonJS(react_exports);

// src/react/PlateElement.tsx
var import_react = __toESM(require("react"));
var import_react2 = require("@udecode/plate-core/react");
var import_react_utils = require("@udecode/react-utils");
var import_clsx = require("clsx");
var usePlateElement = (props) => {
  const _a = (0, import_react2.omitPluginContext)(props), { attributes, element, elementToAttributes, nodeProps } = _a, rootProps = __objRest(_a, ["attributes", "element", "elementToAttributes", "nodeProps"]);
  return {
    props: __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, attributes), rootProps), nodeProps), elementToAttributes == null ? void 0 : elementToAttributes(element)), {
      className: (0, import_clsx.clsx)(props.className, nodeProps == null ? void 0 : nodeProps.className)
    }),
    ref: (0, import_react_utils.useComposedRef)(props.ref, attributes.ref)
  };
};
var PlateElement = import_react.default.forwardRef(
  (props, ref) => {
    const { props: rootProps, ref: rootRef } = usePlateElement(__spreadProps(__spreadValues({}, props), {
      ref
    }));
    return /* @__PURE__ */ import_react.default.createElement(import_react_utils.Box, __spreadProps(__spreadValues({}, rootProps), { ref: rootRef }));
  }
);
PlateElement.displayName = "PlateElement";

// src/react/PlateLeaf.tsx
var import_react3 = __toESM(require("react"));
var import_react4 = require("@udecode/plate-core/react");
var import_react_utils2 = require("@udecode/react-utils");
var import_clsx2 = require("clsx");
var usePlateLeaf = (props) => {
  const _a = (0, import_react4.omitPluginContext)(props), { attributes, leaf, leafToAttributes, nodeProps, text } = _a, rootProps = __objRest(_a, ["attributes", "leaf", "leafToAttributes", "nodeProps", "text"]);
  return {
    props: __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, attributes), rootProps), nodeProps), leafToAttributes == null ? void 0 : leafToAttributes(leaf)), {
      className: (0, import_clsx2.clsx)(props.className, nodeProps == null ? void 0 : nodeProps.className)
    }),
    ref: (0, import_react_utils2.useComposedRef)(props.ref, attributes.ref)
  };
};
var PlateLeaf = import_react3.default.forwardRef(
  (props, ref) => {
    const { props: rootProps, ref: rootRef } = usePlateLeaf(__spreadProps(__spreadValues({}, props), { ref }));
    return /* @__PURE__ */ import_react3.default.createElement(import_react_utils2.Text, __spreadProps(__spreadValues({}, rootProps), { ref: rootRef }));
  }
);
PlateLeaf.displayName = "PlateLeaf";

// src/react/createNodeHOC.tsx
var import_react5 = __toESM(require("react"));
var createNodeHOC = (HOC) => (Component, props) => function hoc(childrenProps) {
  return /* @__PURE__ */ import_react5.default.createElement(HOC, __spreadValues({}, __spreadValues(__spreadValues({}, childrenProps), props)), /* @__PURE__ */ import_react5.default.createElement(Component, __spreadValues({}, childrenProps)));
};

// src/react/createNodesHOC.tsx
var import_castArray = __toESM(require("lodash/castArray.js"));
var import_merge = __toESM(require("lodash/merge.js"));
var createHOC = (withHOC) => {
  return (components, options) => {
    const _components = __spreadValues({}, components);
    const optionsByKey = {};
    const optionsList = (0, import_castArray.default)(options);
    optionsList.forEach((_a) => {
      var _b = _a, { key, keys } = _b, opt = __objRest(_b, ["key", "keys"]);
      const _keys = key ? [key] : keys != null ? keys : Object.keys(_components);
      _keys.forEach((_key) => {
        optionsByKey[_key] = (0, import_merge.default)(optionsByKey[_key], opt);
      });
    });
    Object.keys(optionsByKey).forEach((key) => {
      if (!_components[key]) return;
      _components[key] = withHOC(_components[key], optionsByKey[key]);
    });
    return _components;
  };
};
var createNodesHOC = (HOC) => {
  return createHOC(createNodeHOC(HOC));
};
var createNodesWithHOC = (withHOC) => {
  return createHOC(withHOC);
};

// src/react/selectEditor.ts
var import_slate = require("@udecode/slate");
var import_slate_react = require("@udecode/slate-react");
var selectEditor = (editor, { at, edge, focus }) => {
  if (focus) {
    (0, import_slate_react.focusEditor)(editor);
  }
  let location = at;
  if (edge === "start") {
    location = (0, import_slate.getStartPoint)(editor, []);
  }
  if (edge === "end") {
    location = (0, import_slate.getEndPoint)(editor, []);
  }
  if (location) {
    (0, import_slate.select)(editor, location);
  }
};

// src/react/useFormInputProps.ts
var useFormInputProps = (options) => {
  if (!options) return { props: {} };
  const { preventDefaultOnEnterKeydown } = options;
  const handleEnterKeydownCapture = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
    }
  };
  return {
    props: {
      onKeyDownCapture: preventDefaultOnEnterKeydown ? (e) => handleEnterKeydownCapture(e) : void 0
    }
  };
};

// src/react/useMarkToolbarButton.ts
var import_react6 = require("@udecode/plate-core/react");
var import_slate_utils = require("@udecode/slate-utils");
var useMarkToolbarButtonState = ({
  clear,
  nodeType
}) => {
  const pressed = (0, import_react6.useEditorSelector)(
    (editor) => (0, import_slate_utils.isMarkActive)(editor, nodeType),
    [nodeType]
  );
  return {
    clear,
    nodeType,
    pressed
  };
};
var useMarkToolbarButton = (state) => {
  const editor = (0, import_react6.useEditorRef)();
  return {
    props: {
      pressed: state.pressed,
      onClick: () => {
        editor.tf.toggle.mark({ key: state.nodeType, clear: state.clear });
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};

// src/react/usePlaceholder.ts
var import_react7 = require("@udecode/plate-core/react");
var import_slate2 = require("@udecode/slate");
var import_slate_react2 = require("@udecode/slate-react");
var import_slate_react3 = require("slate-react");
var usePlaceholderState = ({
  element,
  hideOnBlur = true,
  query
}) => {
  const focused = (0, import_slate_react3.useFocused)();
  const selected = (0, import_slate_react3.useSelected)();
  const composing = (0, import_slate_react3.useComposing)();
  const editor = (0, import_react7.useEditorRef)();
  const isEmptyBlock = (0, import_slate2.isElementEmpty)(editor, element) && !composing;
  const enabled = isEmptyBlock && (!query || (0, import_slate2.queryNode)([element, (0, import_slate_react2.findNodePath)(editor, element)], query)) && (!hideOnBlur || (0, import_slate2.isCollapsed)(editor.selection) && hideOnBlur && focused && selected);
  return {
    enabled
  };
};

// src/react/useRemoveNodeButton.ts
var import_react8 = require("@udecode/plate-core/react");
var import_slate3 = require("@udecode/slate");
var import_slate_react4 = require("@udecode/slate-react");
var useRemoveNodeButton = ({ element }) => {
  const editor = (0, import_react8.useEditorRef)();
  return {
    props: {
      onClick: () => {
        const path = (0, import_slate_react4.findNodePath)(editor, element);
        (0, import_slate3.removeNodes)(editor, { at: path });
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PlateElement,
  PlateLeaf,
  createNodeHOC,
  createNodesHOC,
  createNodesWithHOC,
  selectEditor,
  useFormInputProps,
  useMarkToolbarButton,
  useMarkToolbarButtonState,
  usePlaceholderState,
  usePlateElement,
  usePlateLeaf,
  useRemoveNodeButton
});
//# sourceMappingURL=index.js.map