var __defProp = Object.defineProperty;
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

// src/react/SuggestionPlugin.tsx
import { toPlatePlugin } from "@udecode/plate-common/react";

// src/lib/BaseSuggestionPlugin.ts
import {
  createTSlatePlugin,
  nanoid as nanoid5
} from "@udecode/plate-common";

// src/lib/withSuggestion.ts
import {
  getNode,
  getPointAfter as getPointAfter3,
  getPointBefore as getPointBefore3,
  removeNodes as removeNodes2,
  setNodes as setNodes2,
  unsetNodes
} from "@udecode/plate-common";

// src/lib/transforms/deleteFragmentSuggestion.ts
import {
  collapseSelection,
  getEdgePoints as getEdgePoints2,
  withoutNormalizing as withoutNormalizing3
} from "@udecode/plate-common";

// src/lib/transforms/deleteSuggestion.ts
import {
  createPointRef,
  deleteText,
  findNode as findNode2,
  getEditorString,
  getPointAfter as getPointAfter2,
  getPointBefore as getPointBefore2,
  isBlock,
  isElementEmpty,
  isRangeAcrossBlocks,
  isStartPoint,
  moveSelection,
  nanoid as nanoid2,
  removeNodes,
  unhangCharacterRange,
  withoutNormalizing as withoutNormalizing2
} from "@udecode/plate-common";
import { Point } from "slate";

// src/lib/queries/findSuggestionId.ts
import {
  getEdgePoints,
  getPointAfter,
  getPointBefore
} from "@udecode/plate-common";

// src/lib/queries/findSuggestionNode.ts
import {
  findNode
} from "@udecode/plate-common";
var findSuggestionNode = (editor, _a = {}) => {
  var _b = _a, { match } = _b, options = __objRest(_b, ["match"]);
  return findNode(editor, __spreadValues({
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
      [start, end] = getEdgePoints(editor, at);
    } catch (e) {
      return;
    }
    const nextPoint = getPointAfter(editor, end);
    if (nextPoint) {
      entry = findSuggestionNode(editor, {
        at: nextPoint
      });
      if (!entry) {
        const prevPoint = getPointBefore(editor, start);
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
import { isDefined } from "@udecode/plate-common";
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
import {
  addRangeMarks,
  getNodeEntries,
  isInline,
  nanoid,
  setNodes,
  withoutNormalizing
} from "@udecode/plate-common";
var setSuggestionNodes = (editor, options) => {
  const { at = editor.selection, suggestionId = nanoid() } = options != null ? options : {};
  const _nodeEntries = getNodeEntries(editor, __spreadValues({
    match: (n) => isInline(editor, n)
  }, options));
  const nodeEntries = [..._nodeEntries];
  withoutNormalizing(editor, () => {
    const props = getSuggestionProps(
      editor,
      suggestionId,
      options
    );
    addRangeMarks(editor, props, {
      at
    });
    nodeEntries.forEach(([, path]) => {
      setNodes(editor, props, __spreadValues({
        at: path,
        match: (n) => {
          if (!isInline(editor, n)) return false;
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
  withoutNormalizing2(editor, () => {
    var _a, _b;
    const { anchor: from, focus: to } = at;
    const suggestionId = (_a = findSuggestionId(editor, from)) != null ? _a : nanoid2();
    const toRef = createPointRef(editor, to);
    let pointCurrent;
    while (true) {
      pointCurrent = (_b = editor.selection) == null ? void 0 : _b.anchor;
      if (!pointCurrent) break;
      const pointTarget = toRef.current;
      if (!pointTarget) break;
      if (!isRangeAcrossBlocks(editor, {
        at: { anchor: pointCurrent, focus: pointTarget }
      })) {
        const str = getEditorString(
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
      const getPoint = reverse ? getPointBefore2 : getPointAfter2;
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
      range = unhangCharacterRange(editor, range);
      const entryBlock = findNode2(editor, {
        at: pointCurrent,
        match: (n) => isBlock(editor, n) && n[BaseSuggestionPlugin.key] && !n.suggestionDeletion && n[getSuggestionCurrentUserKey(editor)]
      });
      if (entryBlock && isStartPoint(editor, pointCurrent, entryBlock[1]) && isElementEmpty(editor, entryBlock[0])) {
        removeNodes(editor, {
          at: entryBlock[1]
        });
        continue;
      }
      if (Point.equals(pointCurrent, editor.selection.anchor)) {
        moveSelection(editor, {
          reverse,
          unit: "character"
        });
      }
      if (isRangeAcrossBlocks(editor, {
        at: range
      })) {
        continue;
      }
      const entryText = findSuggestionNode(editor, {
        at: range,
        match: (n) => !n.suggestionDeletion && n[getSuggestionCurrentUserKey(editor)]
      });
      if (entryText) {
        deleteText(editor, { at: range, unit: "character" });
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
  withoutNormalizing3(editor, () => {
    const selection = editor.selection;
    const [start, end] = getEdgePoints2(editor, selection);
    if (reverse) {
      collapseSelection(editor, { edge: "end" });
      deleteSuggestion(
        editor,
        { anchor: end, focus: start },
        { reverse: true }
      );
    } else {
      collapseSelection(editor, { edge: "start" });
      deleteSuggestion(editor, { anchor: start, focus: end });
    }
  });
};

// src/lib/transforms/insertFragmentSuggestion.ts
import {
  applyDeepToNodes,
  nanoid as nanoid3,
  withoutNormalizing as withoutNormalizing4
} from "@udecode/plate-common";
var insertFragmentSuggestion = (editor, fragment, {
  insertFragment = editor.insertFragment
} = {}) => {
  withoutNormalizing4(editor, () => {
    var _a;
    deleteFragmentSuggestion(editor);
    const id = (_a = findSuggestionId(editor, editor.selection)) != null ? _a : nanoid3();
    fragment.forEach((node) => {
      applyDeepToNodes({
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
import {
  insertNodes,
  isSelectionExpanded,
  nanoid as nanoid4,
  withoutNormalizing as withoutNormalizing5
} from "@udecode/plate-common";
var insertTextSuggestion = (editor, text) => {
  withoutNormalizing5(editor, () => {
    var _a;
    const id = (_a = findSuggestionId(editor, editor.selection)) != null ? _a : nanoid4();
    if (isSelectionExpanded(editor)) {
      deleteFragmentSuggestion(editor);
    }
    insertNodes(
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
      const pointTarget = getPointBefore3(editor, selection, {
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
      const pointTarget = getPointAfter3(editor, selection, { unit });
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
      const pointBefore = getPointBefore3(editor, path);
      if (pointBefore) {
        const nodeBefore = getNode(editor, pointBefore.path);
        if ((nodeBefore == null ? void 0 : nodeBefore[BaseSuggestionPlugin.key]) && nodeBefore[SUGGESTION_KEYS.id] !== node[SUGGESTION_KEYS.id]) {
          setNodes2(
            editor,
            { [SUGGESTION_KEYS.id]: nodeBefore[SUGGESTION_KEYS.id] },
            { at: path }
          );
          return;
        }
      }
      if (!getSuggestionId(node)) {
        const keys = getSuggestionKeys(node);
        unsetNodes(
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
          unsetNodes(editor, [BaseSuggestionPlugin.key, SUGGESTION_KEYS.id], {
            at: path
          });
        } else {
          removeNodes2(editor, { at: path });
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
var BaseSuggestionPlugin = createTSlatePlugin({
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
    const id = (_a = value.id) != null ? _a : nanoid5();
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
import React from "react";
import { useEditorVersion } from "@udecode/plate-common/react";
var useHooksSuggestion = ({
  editor,
  setOption
}) => {
  const version = useEditorVersion();
  React.useEffect(() => {
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
var SuggestionPlugin = toPlatePlugin(BaseSuggestionPlugin, {
  useHooks: useHooksSuggestion
});
export {
  SuggestionPlugin,
  useHooksSuggestion
};
//# sourceMappingURL=index.mjs.map