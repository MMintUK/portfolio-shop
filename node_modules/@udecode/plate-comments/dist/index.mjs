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

// src/lib/BaseCommentsPlugin.ts
import {
  createTSlatePlugin,
  getNodeString,
  nanoid
} from "@udecode/plate-common";

// src/lib/withComments.ts
import { unsetNodes as unsetNodes2 } from "@udecode/plate-common";

// src/lib/transforms/removeCommentMark.ts
import { withoutNormalizing } from "@udecode/plate-common";

// src/lib/queries/findCommentNode.ts
import {
  findNode
} from "@udecode/plate-common";
var findCommentNode = (editor, options) => {
  return findNode(editor, __spreadValues({
    match: (n) => n[BaseCommentsPlugin.key]
  }, options));
};

// src/lib/queries/findCommentNodeById.ts
import { findNode as findNode2 } from "@udecode/plate-common";

// src/lib/utils/isCommentKey.ts
var isCommentKey = (key) => key.startsWith(`${BaseCommentsPlugin.key}_`);

// src/lib/utils/getCommentCount.ts
var getCommentCount = (node) => {
  let commentCount = 0;
  Object.keys(node).forEach((key) => {
    if (isCommentKey(key)) commentCount++;
  });
  return commentCount;
};

// src/lib/utils/getCommentKey.ts
var getCommentKey = (id) => `${BaseCommentsPlugin.key}_${id}`;

// src/lib/utils/getCommentKeyId.ts
var getCommentKeyId = (key) => key.replace(`${BaseCommentsPlugin.key}_`, "");

// src/lib/utils/getCommentKeys.ts
var getCommentKeys = (node) => {
  const keys = [];
  Object.keys(node).forEach((key) => {
    if (isCommentKey(key)) keys.push(key);
  });
  return keys;
};

// src/lib/utils/getCommentUrl.ts
var getCommentUrl = (commentId) => {
  const url = new URL(window.location.href);
  url.searchParams.set("comment", commentId);
  return url.toString();
};

// src/lib/utils/getElementAbsolutePosition.tsx
var getElementAbsolutePosition = (element) => {
  let left = 0;
  let top = 0;
  let currentElement = element;
  do {
    left += (currentElement.offsetLeft || 0) - currentElement.scrollLeft;
    top += (currentElement.offsetTop || 0) - currentElement.scrollTop;
    currentElement = currentElement.offsetParent;
  } while (currentElement);
  return {
    left,
    top
  };
};

// src/lib/utils/isCommentNodeById.ts
var isCommentNodeById = (node, id) => !!node[getCommentKey(id)];

// src/lib/utils/isCommentText.ts
var isCommentText = (node) => {
  return !!node[BaseCommentsPlugin.key];
};

// src/lib/utils/unsetCommentNodesById.ts
import { unsetNodes } from "@udecode/plate-common";
var unsetCommentNodesById = (editor, { id }) => {
  unsetNodes(editor, getCommentKey(id), {
    at: [],
    match: (n) => isCommentNodeById(n, id)
  });
};

// src/lib/queries/findCommentNodeById.ts
var findCommentNodeById = (editor, id) => {
  return findNode2(editor, {
    at: [],
    match: (n) => n[getCommentKey(id)]
  });
};

// src/lib/queries/getCommentNodeEntries.ts
import { getNodeEntries } from "@udecode/plate-common";
var getCommentNodeEntries = (editor) => {
  return [
    ...getNodeEntries(editor, {
      at: [],
      match: (n) => isCommentText(n)
    })
  ];
};

// src/lib/queries/getCommentNodesById.ts
import { getNodeEntries as getNodeEntries2 } from "@udecode/plate-common";
var getCommentNodesById = (editor, id) => {
  return Array.from(
    getNodeEntries2(editor, {
      at: [],
      match: (n) => isCommentNodeById(n, id)
    })
  );
};

// src/lib/transforms/removeCommentMark.ts
var removeCommentMark = (editor) => {
  const nodeEntry = findCommentNode(editor);
  if (!nodeEntry) return;
  const keys = getCommentKeys(nodeEntry[0]);
  withoutNormalizing(editor, () => {
    keys.forEach((key) => {
      editor.removeMark(key);
    });
    editor.removeMark(BaseCommentsPlugin.key);
  });
};

// src/lib/withComments.ts
var withComments = ({ editor }) => {
  const { insertBreak, normalizeNode } = editor;
  editor.insertBreak = () => {
    removeCommentMark(editor);
    insertBreak();
  };
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (node[BaseCommentsPlugin.key] && getCommentCount(node) < 1) {
      unsetNodes2(editor, BaseCommentsPlugin.key, { at: path });
      return;
    }
    normalizeNode(entry);
  };
  return editor;
};

// src/lib/BaseCommentsPlugin.ts
var BaseCommentsPlugin = createTSlatePlugin({
  key: "comment",
  extendEditor: withComments,
  node: { isLeaf: true },
  options: {
    activeCommentId: null,
    addingCommentId: null,
    comments: {},
    focusTextarea: false,
    myUserId: null,
    newValue: [{ children: [{ text: "" }], type: "p" }],
    users: {},
    onCommentAdd: null,
    onCommentDelete: null,
    onCommentUpdate: null
  }
}).extendOptions(({ getOptions }) => ({
  activeComment: () => {
    const { activeCommentId, comments } = getOptions();
    return activeCommentId ? comments[activeCommentId] : null;
  },
  commentById: (id) => {
    if (!id) return null;
    return getOptions().comments[id];
  },
  myUser: () => {
    const { myUserId, users } = getOptions();
    if (!myUserId) return null;
    return users[myUserId];
  },
  newText: () => {
    const { newValue } = getOptions();
    return getNodeString(newValue == null ? void 0 : newValue[0]);
  },
  userById: (id) => {
    if (!id) return null;
    return getOptions().users[id];
  }
})).extendApi(({ getOptions, setOptions }) => ({
  addComment: (value) => {
    var _a;
    const { myUserId } = getOptions();
    const id = (_a = value.id) != null ? _a : nanoid();
    const newComment = __spreadValues({
      id,
      createdAt: Date.now(),
      userId: myUserId != null ? myUserId : void 0
    }, value);
    if (newComment.userId) {
      setOptions((draft) => {
        draft.comments[id] = newComment;
      });
    }
    return newComment;
  },
  addRawComment: (id) => {
    const { myUserId } = getOptions();
    if (!myUserId) return;
    setOptions((draft) => {
      draft.comments[id] = {
        id,
        userId: myUserId
      };
    });
  },
  removeComment: (id) => {
    if (!id) return;
    setOptions((draft) => {
      delete draft.comments[id];
    });
  },
  resetNewCommentValue: () => {
    setOptions({ newValue: [{ children: [{ text: "" }], type: "p" }] });
  },
  updateComment: (id, value) => {
    if (!id) return;
    setOptions((draft) => {
      draft.comments[id] = __spreadValues(__spreadValues({}, draft.comments[id]), value);
    });
  }
}));
export {
  BaseCommentsPlugin,
  findCommentNode,
  findCommentNodeById,
  getCommentCount,
  getCommentKey,
  getCommentKeyId,
  getCommentKeys,
  getCommentNodeEntries,
  getCommentNodesById,
  getCommentUrl,
  getElementAbsolutePosition,
  isCommentKey,
  isCommentNodeById,
  isCommentText,
  removeCommentMark,
  unsetCommentNodesById,
  withComments
};
//# sourceMappingURL=index.mjs.map