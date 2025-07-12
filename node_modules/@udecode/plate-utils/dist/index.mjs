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

// src/lib/defaultsDeepToNodes.ts
import { applyDeepToNodes } from "@udecode/plate-core";
import defaults from "lodash/defaults.js";
var defaultsDeepToNodes = (options) => {
  applyDeepToNodes(__spreadProps(__spreadValues({}, options), { apply: defaults }));
};

// src/lib/isType.ts
import castArray from "lodash/castArray.js";
var isType = (editor, node, key) => {
  const keys = castArray(key);
  const types = [];
  keys.forEach((_key) => types.push(editor.getType({ key: _key })));
  return types.includes(node == null ? void 0 : node.type);
};

// src/lib/moveSelectionByOffset.ts
import { isHotkey } from "@udecode/plate-core";
import { moveSelection } from "@udecode/slate";
import { Range } from "slate";
var moveSelectionByOffset = (editor, {
  event,
  query = () => true
}) => {
  const { selection } = editor;
  if (!selection || Range.isExpanded(selection) || !query(editor)) {
    return false;
  }
  if (isHotkey("left", event)) {
    event.preventDefault();
    moveSelection(editor, { reverse: true, unit: "offset" });
    return true;
  }
  if (isHotkey("right", event)) {
    event.preventDefault();
    moveSelection(editor, { unit: "offset" });
    return true;
  }
};
export {
  defaultsDeepToNodes,
  isType,
  moveSelectionByOffset
};
//# sourceMappingURL=index.mjs.map