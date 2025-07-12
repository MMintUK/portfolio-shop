var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/react/PlateElement.tsx
import React from "react";
import {
  omitPluginContext
} from "@udecode/plate-core/react";
import { Box, useComposedRef } from "@udecode/react-utils";
import { clsx } from "clsx";
var usePlateElement = (props) => {
  const _a = omitPluginContext(props), { attributes, element, elementToAttributes, nodeProps } = _a, rootProps = __objRest(_a, ["attributes", "element", "elementToAttributes", "nodeProps"]);
  return {
    props: __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, attributes), rootProps), nodeProps), elementToAttributes == null ? void 0 : elementToAttributes(element)), {
      className: clsx(props.className, nodeProps == null ? void 0 : nodeProps.className)
    }),
    ref: useComposedRef(props.ref, attributes.ref)
  };
};
var PlateElement = React.forwardRef(
  (props, ref) => {
    const { props: rootProps, ref: rootRef } = usePlateElement(__spreadProps(__spreadValues({}, props), {
      ref
    }));
    return /* @__PURE__ */ React.createElement(Box, __spreadProps(__spreadValues({}, rootProps), { ref: rootRef }));
  }
);
PlateElement.displayName = "PlateElement";

// src/react/PlateLeaf.tsx
import React2 from "react";
import {
  omitPluginContext as omitPluginContext2
} from "@udecode/plate-core/react";
import { Text, useComposedRef as useComposedRef2 } from "@udecode/react-utils";
import { clsx as clsx2 } from "clsx";
var usePlateLeaf = (props) => {
  const _a = omitPluginContext2(props), { attributes, leaf, leafToAttributes, nodeProps, text } = _a, rootProps = __objRest(_a, ["attributes", "leaf", "leafToAttributes", "nodeProps", "text"]);
  return {
    props: __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, attributes), rootProps), nodeProps), leafToAttributes == null ? void 0 : leafToAttributes(leaf)), {
      className: clsx2(props.className, nodeProps == null ? void 0 : nodeProps.className)
    }),
    ref: useComposedRef2(props.ref, attributes.ref)
  };
};
var PlateLeaf = React2.forwardRef(
  (props, ref) => {
    const { props: rootProps, ref: rootRef } = usePlateLeaf(__spreadProps(__spreadValues({}, props), { ref }));
    return /* @__PURE__ */ React2.createElement(Text, __spreadProps(__spreadValues({}, rootProps), { ref: rootRef }));
  }
);
PlateLeaf.displayName = "PlateLeaf";

// src/react/createNodeHOC.tsx
import React3 from "react";
var createNodeHOC = (HOC) => (Component, props) => function hoc(childrenProps) {
  return /* @__PURE__ */ React3.createElement(HOC, __spreadValues({}, __spreadValues(__spreadValues({}, childrenProps), props)), /* @__PURE__ */ React3.createElement(Component, __spreadValues({}, childrenProps)));
};

// src/react/createNodesHOC.tsx
import castArray from "lodash/castArray.js";
import merge from "lodash/merge.js";
var createHOC = (withHOC) => {
  return (components, options) => {
    const _components = __spreadValues({}, components);
    const optionsByKey = {};
    const optionsList = castArray(options);
    optionsList.forEach((_a) => {
      var _b = _a, { key, keys } = _b, opt = __objRest(_b, ["key", "keys"]);
      const _keys = key ? [key] : keys != null ? keys : Object.keys(_components);
      _keys.forEach((_key) => {
        optionsByKey[_key] = merge(optionsByKey[_key], opt);
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
import {
  getEndPoint,
  getStartPoint,
  select
} from "@udecode/slate";
import { focusEditor } from "@udecode/slate-react";
var selectEditor = (editor, { at, edge, focus }) => {
  if (focus) {
    focusEditor(editor);
  }
  let location = at;
  if (edge === "start") {
    location = getStartPoint(editor, []);
  }
  if (edge === "end") {
    location = getEndPoint(editor, []);
  }
  if (location) {
    select(editor, location);
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
import { useEditorRef, useEditorSelector } from "@udecode/plate-core/react";
import { isMarkActive } from "@udecode/slate-utils";
var useMarkToolbarButtonState = ({
  clear,
  nodeType
}) => {
  const pressed = useEditorSelector(
    (editor) => isMarkActive(editor, nodeType),
    [nodeType]
  );
  return {
    clear,
    nodeType,
    pressed
  };
};
var useMarkToolbarButton = (state) => {
  const editor = useEditorRef();
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
import { useEditorRef as useEditorRef2 } from "@udecode/plate-core/react";
import {
  isCollapsed,
  isElementEmpty,
  queryNode
} from "@udecode/slate";
import { findNodePath } from "@udecode/slate-react";
import { useComposing, useFocused, useSelected } from "slate-react";
var usePlaceholderState = ({
  element,
  hideOnBlur = true,
  query
}) => {
  const focused = useFocused();
  const selected = useSelected();
  const composing = useComposing();
  const editor = useEditorRef2();
  const isEmptyBlock = isElementEmpty(editor, element) && !composing;
  const enabled = isEmptyBlock && (!query || queryNode([element, findNodePath(editor, element)], query)) && (!hideOnBlur || isCollapsed(editor.selection) && hideOnBlur && focused && selected);
  return {
    enabled
  };
};

// src/react/useRemoveNodeButton.ts
import { useEditorRef as useEditorRef3 } from "@udecode/plate-core/react";
import { removeNodes } from "@udecode/slate";
import { findNodePath as findNodePath2 } from "@udecode/slate-react";
var useRemoveNodeButton = ({ element }) => {
  const editor = useEditorRef3();
  return {
    props: {
      onClick: () => {
        const path = findNodePath2(editor, element);
        removeNodes(editor, { at: path });
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};
export {
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
};
//# sourceMappingURL=index.mjs.map