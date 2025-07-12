"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
  SuggestionPlugin: () => SuggestionPlugin,
  useHooksSuggestion: () => useHooksSuggestion
});
module.exports = __toCommonJS(react_exports);

// src/react/SuggestionPlugin.tsx
var import_react3 = require("@udecode/plate-common/react");

// src/lib/BaseSuggestionPlugin.ts
var import_plate_common10 = require("@udecode/plate-common");

// src/lib/withSuggestion.ts
var import_plate_common9 = require("@udecode/plate-common");

// src/lib/transforms/deleteFragmentSuggestion.ts
var import_plate_common6 = require("@udecode/plate-common");

// src/lib/transforms/deleteSuggestion.ts
var import_plate_common5 = require("@udecode/plate-common");
var import_slate = require("slate");

// src/lib/queries/findSuggestionId.ts
var import_plate_common2 = require("@udecode/plate-common");

// src/lib/queries/findSuggestionNode.ts
var import_plate_common = require("@udecode/plate-common");
var findSuggestionNode = (editor, _a = {}) => {
  var _b = _a, { match } = _b, options = __objRest(_b, ["match"]);
  return (0, import_plate_common.findNode)(editor, __spreadValues({
    match: (n, p) => n[BaseSuggestionPlugin.key] && (!match || match(n, p))
  }, options));
};

// src/lib/queries/findSuggestionId.ts
var findSuggestionId = (editor, at) => {
  let entry = findSuggestionNode(editor, {
    at
  });
  if (!entry) {
    let start;
    let end;
    try {
      [start, end] = (0, import_plate_common2.getEdgePoints)(editor, at);
    } catch (e) {
      return;
    }
    const nextPoint = (0, import_plate_common2.getPointAfter)(editor, end);
    if (nextPoint) {
      entry = findSuggestionNode(editor, {
        at: nextPoint
      });
      if (!entry) {
        const prevPoint = (0, import_plate_common2.getPointBefore)(editor, start);
        if (prevPoint) {
          entry = findSuggestionNode(editor, {
            at: prevPoint
          });
        }
      }
    }
  }
  if (entry) {
    return entry[0][SUGGESTION_KEYS.id];
  }
};

// src/lib/utils/getSuggestionKeys.ts
var import_plate_common3 = require("@udecode/plate-common");
var getSuggestionKey = (id = "0") => `${BaseSuggestionPlugin.key}_${id}`;
var isSuggestionKey = (key) => key.startsWith(`${BaseSuggestionPlugin.key}_`);
var getSuggestionKeys = (node) => {
  const keys = [];
  Object.keys(node).forEach((key) => {
    if (isSuggestionKey(key)) keys.push(key);
  });
  return keys;
};

// src/lib/utils/getSuggestionId.ts
var getSuggestionId = (node) => {
  return node[SUGGESTION_KEYS.id];
};

// src/lib/transforms/getSuggestionProps.ts
var getSuggestionCurrentUserKey = (editor) => {
  const { currentUserId } = editor.getOptions(BaseSuggestionPlugin);
  return getSuggestionKey(currentUserId);
};
var getSuggestionProps = (editor, id, {
  suggestionDeletion,
  suggestionUpdate
} = {}) => {
  const res = {
    [BaseSuggestionPlugin.key]: true,
    [SUGGESTION_KEYS.id]: id,
    [getSuggestionCurrentUserKey(editor)]: true
  };
  if (suggestionDeletion) {
    res.suggestionDeletion = true;
  }
  if (suggestionUpdate) {
    res.suggestionUpdate = suggestionUpdate;
  }
  return res;
};

// src/lib/transforms/setSuggestionNodes.ts
var import_plate_common4 = require("@udecode/plate-common");
var setSuggestionNodes = (editor, options) => {
  const { at = editor.selection, suggestionId = (0, import_plate_common4.nanoid)() } = options != null ? options : {};
  const _nodeEntries = (0, import_plate_common4.getNodeEntries)(editor, __spreadValues({
    match: (n) => (0, import_plate_common4.isInline)(editor, n)
  }, options));
  const nodeEntries = [..._nodeEntries];
  (0, import_plate_common4.withoutNormalizing)(editor, () => {
    const props = getSuggestionProps(
      editor,
      suggestionId,
      options
    );
    (0, import_plate_common4.addRangeMarks)(editor, props, {
      at
    });
    nodeEntries.forEach(([, path]) => {
      (0, import_plate_common4.setNodes)(editor, props, __spreadValues({
        at: path,
        match: (n) => {
          if (!(0, import_plate_common4.isInline)(editor, n)) return false;
          return true;
        }
      }, options));
    });
  });
};

// src/lib/transforms/deleteSuggestion.ts
var deleteSuggestion = (editor, at, {
  reverse
} = {}) => {
  (0, import_plate_common5.withoutNormalizing)(editor, () => {
    var _a, _b;
    const { anchor: from, focus: to } = at;
    const suggestionId = (_a = findSuggestionId(editor, from)) != null ? _a : (0, import_plate_common5.nanoid)();
    const toRef = (0, import_plate_common5.createPointRef)(editor, to);
    let pointCurrent;
    while (true) {
      pointCurrent = (_b = editor.selection) == null ? void 0 : _b.anchor;
      if (!pointCurrent) break;
      const pointTarget = toRef.current;
      if (!pointTarget) break;
      if (!(0, import_plate_common5.isRangeAcrossBlocks)(editor, {
        at: { anchor: pointCurrent, focus: pointTarget }
      })) {
        const str = (0, import_plate_common5.getEditorString)(
          editor,
          reverse ? {
            anchor: pointTarget,
            focus: pointCurrent
          } : {
            anchor: pointCurrent,
            focus: pointTarget
          }
        );
        if (str.length === 0) break;
      }
      const getPoint = reverse ? import_plate_common5.getPointBefore : import_plate_common5.getPointAfter;
      const pointNext = getPoint(editor, pointCurrent, {
        unit: "character"
      });
      if (!pointNext) break;
      let range = reverse ? {
        anchor: pointNext,
        focus: pointCurrent
      } : {
        anchor: pointCurrent,
        focus: pointNext
      };
      range = (0, import_plate_common5.unhangCharacterRange)(editor, range);
      const entryBlock = (0, import_plate_common5.findNode)(editor, {
        at: pointCurrent,
        match: (n) => (0, import_plate_common5.isBlock)(editor, n) && n[BaseSuggestionPlugin.key] && !n.suggestionDeletion && n[getSuggestionCurrentUserKey(editor)]
      });
      if (entryBlock && (0, import_plate_common5.isStartPoint)(editor, pointCurrent, entryBlock[1]) && (0, import_plate_common5.isElementEmpty)(editor, entryBlock[0])) {
        (0, import_plate_common5.removeNodes)(editor, {
          at: entryBlock[1]
        });
        continue;
      }
      if (import_slate.Point.equals(pointCurrent, editor.selection.anchor)) {
        (0, import_plate_common5.moveSelection)(editor, {
          reverse,
          unit: "character"
        });
      }
      if ((0, import_plate_common5.isRangeAcrossBlocks)(editor, {
        at: range
      })) {
        continue;
      }
      const entryText = findSuggestionNode(editor, {
        at: range,
        match: (n) => !n.suggestionDeletion && n[getSuggestionCurrentUserKey(editor)]
      });
      if (entryText) {
        (0, import_plate_common5.deleteText)(editor, { at: range, unit: "character" });
        continue;
      }
      setSuggestionNodes(editor, {
        at: range,
        suggestionDeletion: true,
        suggestionId
      });
    }
  });
};

// src/lib/transforms/deleteFragmentSuggestion.ts
var deleteFragmentSuggestion = (editor, { reverse } = {}) => {
  (0, import_plate_common6.withoutNormalizing)(editor, () => {
    const selection = editor.selection;
    const [start, end] = (0, import_plate_common6.getEdgePoints)(editor, selection);
    if (reverse) {
      (0, import_plate_common6.collapseSelection)(editor, { edge: "end" });
      deleteSuggestion(
        editor,
        { anchor: end, focus: start },
        { reverse: true }
      );
    } else {
      (0, import_plate_common6.collapseSelection)(editor, { edge: "start" });
      deleteSuggestion(editor, { anchor: start, focus: end });
    }
  });
};

// src/lib/transforms/insertFragmentSuggestion.ts
var import_plate_common7 = require("@udecode/plate-common");
var insertFragmentSuggestion = (editor, fragment, {
  insertFragment = editor.insertFragment
} = {}) => {
  (0, import_plate_common7.withoutNormalizing)(editor, () => {
    var _a;
    deleteFragmentSuggestion(editor);
    const id = (_a = findSuggestionId(editor, editor.selection)) != null ? _a : (0, import_plate_common7.nanoid)();
    fragment.forEach((node) => {
      (0, import_plate_common7.applyDeepToNodes)({
        apply: (n) => {
          if (!n[BaseSuggestionPlugin.key]) {
            n[BaseSuggestionPlugin.key] = true;
          }
          if (n.suggestionDeletion) {
            delete n.suggestionDeletion;
          }
          n[SUGGESTION_KEYS.id] = id;
          const otherUserKeys = getSuggestionKeys(n);
          otherUserKeys.forEach((key) => {
            delete n[key];
          });
          n[getSuggestionCurrentUserKey(editor)] = true;
        },
        node,
        source: {}
      });
    });
    insertFragment(fragment);
  });
};

// src/lib/transforms/insertTextSuggestion.ts
var import_plate_common8 = require("@udecode/plate-common");
var insertTextSuggestion = (editor, text) => {
  (0, import_plate_common8.withoutNormalizing)(editor, () => {
    var _a;
    const id = (_a = findSuggestionId(editor, editor.selection)) != null ? _a : (0, import_plate_common8.nanoid)();
    if ((0, import_plate_common8.isSelectionExpanded)(editor)) {
      deleteFragmentSuggestion(editor);
    }
    (0, import_plate_common8.insertNodes)(
      editor,
      __spreadValues({
        text
      }, getSuggestionProps(editor, id)),
      {
        at: editor.selection,
        select: true
      }
    );
  });
};

// src/lib/withSuggestion.ts
var withSuggestion = ({
  editor,
  getOptions
}) => {
  const {
    deleteBackward,
    deleteForward,
    deleteFragment,
    insertBreak,
    insertFragment,
    insertText,
    normalizeNode
  } = editor;
  editor.insertBreak = () => {
    if (getOptions().isSuggesting) {
      insertTextSuggestion(editor, "\n");
      return;
    }
    insertBreak();
  };
  editor.insertText = (text) => {
    if (getOptions().isSuggesting) {
      insertTextSuggestion(editor, text);
      return;
    }
    insertText(text);
  };
  editor.insertFragment = (fragment) => {
    if (getOptions().isSuggesting) {
      insertFragmentSuggestion(editor, fragment, { insertFragment });
      return;
    }
    insertFragment(fragment);
  };
  editor.deleteFragment = (direction) => {
    if (getOptions().isSuggesting) {
      deleteFragmentSuggestion(editor, { reverse: true });
      return;
    }
    deleteFragment(direction);
  };
  editor.deleteBackward = (unit) => {
    if (getOptions().isSuggesting) {
      const selection = editor.selection;
      const pointTarget = (0, import_plate_common9.getPointBefore)(editor, selection, {
        unit
      });
      if (!pointTarget) return;
      deleteSuggestion(
        editor,
        { anchor: selection.anchor, focus: pointTarget },
        {
          reverse: true
        }
      );
      return;
    }
    deleteBackward(unit);
  };
  editor.deleteForward = (unit) => {
    if (getOptions().isSuggesting) {
      const selection = editor.selection;
      const pointTarget = (0, import_plate_common9.getPointAfter)(editor, selection, { unit });
      if (!pointTarget) return;
      deleteSuggestion(editor, {
        anchor: selection.anchor,
        focus: pointTarget
      });
      return;
    }
    deleteForward(unit);
  };
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (node[BaseSuggestionPlugin.key]) {
      const pointBefore = (0, import_plate_common9.getPointBefore)(editor, path);
      if (pointBefore) {
        const nodeBefore = (0, import_plate_common9.getNode)(editor, pointBefore.path);
        if ((nodeBefore == null ? void 0 : nodeBefore[BaseSuggestionPlugin.key]) && nodeBefore[SUGGESTION_KEYS.id] !== node[SUGGESTION_KEYS.id]) {
          (0, import_plate_common9.setNodes)(
            editor,
            { [SUGGESTION_KEYS.id]: nodeBefore[SUGGESTION_KEYS.id] },
            { at: path }
          );
          return;
        }
      }
      if (!getSuggestionId(node)) {
        const keys = getSuggestionKeys(node);
        (0, import_plate_common9.unsetNodes)(
          editor,
          [BaseSuggestionPlugin.key, "suggestionDeletion", ...keys],
          {
            at: path
          }
        );
        return;
      }
      if (getSuggestionKeys(node).length === 0) {
        if (node.suggestionDeletion) {
          (0, import_plate_common9.unsetNodes)(editor, [BaseSuggestionPlugin.key, SUGGESTION_KEYS.id], {
            at: path
          });
        } else {
          (0, import_plate_common9.removeNodes)(editor, { at: path });
        }
        return;
      }
    }
    normalizeNode(entry);
  };
  return editor;
};

// src/lib/BaseSuggestionPlugin.ts
var SUGGESTION_KEYS = {
  id: "suggestionId"
};
var BaseSuggestionPlugin = (0, import_plate_common10.createTSlatePlugin)({
  key: "suggestion",
  extendEditor: withSuggestion,
  node: { isLeaf: true },
  options: {
    activeSuggestionId: null,
    currentUserId: null,
    isSuggesting: false,
    suggestions: {},
    users: {},
    onSuggestionAdd: null,
    onSuggestionDelete: null,
    onSuggestionUpdate: null
  }
}).extendOptions(({ getOptions }) => ({
  currentSuggestionUser: () => {
    const { currentUserId, users } = getOptions();
    if (!currentUserId) return null;
    return users[currentUserId];
  },
  suggestionById: (id) => {
    if (!id) return null;
    return getOptions().suggestions[id];
  },
  suggestionUserById: (id) => {
    if (!id) return null;
    return getOptions().users[id];
  }
})).extendApi(({ getOptions, setOptions }) => ({
  addSuggestion: (value) => {
    var _a;
    const { currentUserId } = getOptions();
    if (!currentUserId) return;
    const id = (_a = value.id) != null ? _a : (0, import_plate_common10.nanoid)();
    const newSuggestion = __spreadValues({
      id,
      createdAt: Date.now(),
      userId: currentUserId
    }, value);
    setOptions((draft) => {
      draft.suggestions[id] = newSuggestion;
    });
  },
  removeSuggestion: (id) => {
    if (!id) return;
    setOptions((draft) => {
      delete draft.suggestions[id];
    });
  },
  updateSuggestion: (id, value) => {
    if (!id) return;
    setOptions((draft) => {
      draft.suggestions[id] = __spreadValues(__spreadValues({}, draft.suggestions[id]), value);
    });
  }
}));

// src/react/useHooksSuggestion.ts
var import_react = __toESM(require("react"));
var import_react2 = require("@udecode/plate-common/react");
var useHooksSuggestion = ({
  editor,
  setOption
}) => {
  const version = (0, import_react2.useEditorVersion)();
  import_react.default.useEffect(() => {
    if (!editor.selection) return;
    const resetActiveSuggestion = () => {
      setOption("activeSuggestionId", null);
    };
    const suggestionEntry = findSuggestionNode(editor);
    if (!suggestionEntry) return resetActiveSuggestion();
    const [suggestionNode] = suggestionEntry;
    const id = getSuggestionId(suggestionNode);
    if (!id) return resetActiveSuggestion();
    setOption("activeSuggestionId", id);
  }, [editor, version, setOption]);
};

// src/react/SuggestionPlugin.tsx
var SuggestionPlugin = (0, import_react3.toPlatePlugin)(BaseSuggestionPlugin, {
  useHooks: useHooksSuggestion
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SuggestionPlugin,
  useHooksSuggestion
});
//# sourceMappingURL=index.js.map