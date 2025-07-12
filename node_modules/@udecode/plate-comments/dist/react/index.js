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
  CommentDeleteButton: () => CommentDeleteButton,
  CommentEditActions: () => CommentEditActions,
  CommentEditButton: () => CommentEditButton,
  CommentEditCancelButton: () => CommentEditCancelButton,
  CommentEditSaveButton: () => CommentEditSaveButton,
  CommentEditTextarea: () => CommentEditTextarea,
  CommentNewSubmitButton: () => CommentNewSubmitButton,
  CommentNewTextarea: () => CommentNewTextarea,
  CommentProvider: () => CommentProvider,
  CommentResolveButton: () => CommentResolveButton,
  CommentUserName: () => CommentUserName,
  CommentsPlugin: () => CommentsPlugin,
  CommentsPositioner: () => CommentsPositioner,
  SCOPE_ACTIVE_COMMENT: () => SCOPE_ACTIVE_COMMENT,
  commentStore: () => commentStore,
  getCommentPosition: () => getCommentPosition,
  insertComment: () => insertComment,
  useActiveCommentNode: () => useActiveCommentNode,
  useComment: () => useComment,
  useCommentActions: () => useCommentActions,
  useCommentAddButton: () => useCommentAddButton,
  useCommentDeleteButton: () => useCommentDeleteButton,
  useCommentDeleteButtonState: () => useCommentDeleteButtonState,
  useCommentEditButton: () => useCommentEditButton,
  useCommentEditButtonState: () => useCommentEditButtonState,
  useCommentEditCancelButton: () => useCommentEditCancelButton,
  useCommentEditSaveButton: () => useCommentEditSaveButton,
  useCommentEditSaveButtonState: () => useCommentEditSaveButtonState,
  useCommentEditTextarea: () => useCommentEditTextarea,
  useCommentEditTextareaState: () => useCommentEditTextareaState,
  useCommentItemContentState: () => useCommentItemContentState,
  useCommentLeaf: () => useCommentLeaf,
  useCommentLeafState: () => useCommentLeafState,
  useCommentNewSubmitButton: () => useCommentNewSubmitButton,
  useCommentNewSubmitButtonState: () => useCommentNewSubmitButtonState,
  useCommentNewTextarea: () => useCommentNewTextarea,
  useCommentNewTextareaState: () => useCommentNewTextareaState,
  useCommentReplies: () => useCommentReplies,
  useCommentResolveButton: () => useCommentResolveButton,
  useCommentSelectors: () => useCommentSelectors,
  useCommentStates: () => useCommentStates,
  useCommentStore: () => useCommentStore,
  useCommentText: () => useCommentText,
  useCommentUser: () => useCommentUser,
  useCommentUserName: () => useCommentUserName,
  useCommentsPositioner: () => useCommentsPositioner,
  useCommentsPositionerState: () => useCommentsPositionerState,
  useCommentsResolved: () => useCommentsResolved,
  useCommentsShowResolvedButton: () => useCommentsShowResolvedButton,
  useEditingCommentText: () => useEditingCommentText,
  useFloatingCommentsContentState: () => useFloatingCommentsContentState,
  useFloatingCommentsState: () => useFloatingCommentsState,
  useHooksComments: () => useHooksComments
});
module.exports = __toCommonJS(react_exports);

// src/react/CommentsPlugin.tsx
var import_plate_common9 = require("@udecode/plate-common");
var import_react3 = require("@udecode/plate-common/react");

// src/lib/BaseCommentsPlugin.ts
var import_plate_common6 = require("@udecode/plate-common");

// src/lib/withComments.ts
var import_plate_common5 = require("@udecode/plate-common");

// src/lib/transforms/removeCommentMark.ts
var import_plate_common4 = require("@udecode/plate-common");

// src/lib/queries/findCommentNode.ts
var import_plate_common = require("@udecode/plate-common");
var findCommentNode = (editor, options) => {
  return (0, import_plate_common.findNode)(editor, __spreadValues({
    match: (n) => n[BaseCommentsPlugin.key]
  }, options));
};

// src/lib/queries/findCommentNodeById.ts
var import_plate_common3 = require("@udecode/plate-common");

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

// src/lib/utils/unsetCommentNodesById.ts
var import_plate_common2 = require("@udecode/plate-common");
var unsetCommentNodesById = (editor, { id }) => {
  (0, import_plate_common2.unsetNodes)(editor, getCommentKey(id), {
    at: [],
    match: (n) => isCommentNodeById(n, id)
  });
};

// src/lib/queries/findCommentNodeById.ts
var findCommentNodeById = (editor, id) => {
  return (0, import_plate_common3.findNode)(editor, {
    at: [],
    match: (n) => n[getCommentKey(id)]
  });
};

// src/lib/transforms/removeCommentMark.ts
var removeCommentMark = (editor) => {
  const nodeEntry = findCommentNode(editor);
  if (!nodeEntry) return;
  const keys = getCommentKeys(nodeEntry[0]);
  (0, import_plate_common4.withoutNormalizing)(editor, () => {
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
      (0, import_plate_common5.unsetNodes)(editor, BaseCommentsPlugin.key, { at: path });
      return;
    }
    normalizeNode(entry);
  };
  return editor;
};

// src/lib/BaseCommentsPlugin.ts
var BaseCommentsPlugin = (0, import_plate_common6.createTSlatePlugin)({
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
    return (0, import_plate_common6.getNodeString)(newValue == null ? void 0 : newValue[0]);
  },
  userById: (id) => {
    if (!id) return null;
    return getOptions().users[id];
  }
})).extendApi(({ getOptions, setOptions }) => ({
  addComment: (value) => {
    var _a;
    const { myUserId } = getOptions();
    const id = (_a = value.id) != null ? _a : (0, import_plate_common6.nanoid)();
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

// src/react/transforms/insertComment.ts
var import_plate_common7 = require("@udecode/plate-common");
var import_react = require("@udecode/plate-common/react");
var insertComment = (editor) => {
  const { selection } = editor;
  if (!(0, import_plate_common7.isExpanded)(selection)) return;
  const id = (0, import_plate_common7.nanoid)();
  (0, import_plate_common7.setNodes)(
    editor,
    { [BaseCommentsPlugin.key]: true, [getCommentKey(id)]: true },
    { match: import_plate_common7.isText, split: true }
  );
  try {
    (0, import_react.deselectEditor)(editor);
  } catch (e) {
  }
  setTimeout(() => {
    editor.setOption(BaseCommentsPlugin, "activeCommentId", id);
  }, 0);
};

// src/react/useHooksComments.ts
var import_plate_common8 = require("@udecode/plate-common");
var import_react2 = require("@udecode/plate-common/react");
var useHooksComments = ({
  editor,
  setOption,
  tf
}) => {
  (0, import_react2.useHotkeys)(
    editor.shortcuts.toggleComment.keys,
    (e) => {
      if (!editor.selection) return;
      e.preventDefault();
      if (!(0, import_plate_common8.isExpanded)(editor.selection)) return;
      tf.insert.comment();
      setOption("focusTextarea", true);
    },
    {
      enableOnContentEditable: true
    }
  );
};

// src/react/CommentsPlugin.tsx
var CommentsPlugin = (0, import_react3.toPlatePlugin)(BaseCommentsPlugin, {
  shortcuts: {
    toggleComment: {
      keys: [[import_react3.Key.Mod, import_react3.Key.Shift, "m"]]
    }
  },
  useHooks: useHooksComments
}).extendEditorTransforms(({ editor }) => ({
  insert: { comment: (0, import_plate_common9.bindFirst)(insertComment, editor) }
}));

// src/react/components/CommentDeleteButton.tsx
var import_react5 = require("@udecode/plate-common/react");

// src/react/stores/comment/CommentProvider.tsx
var import_plate_common10 = require("@udecode/plate-common");
var import_react4 = require("@udecode/plate-common/react");
var SCOPE_ACTIVE_COMMENT = "activeComment";
var { CommentProvider, commentStore, useCommentStore } = (0, import_react4.createAtomStore)(
  {
    id: "",
    editingValue: null,
    isMenuOpen: false
  },
  {
    name: "comment"
  }
);
var useCommentStates = () => useCommentStore().use;
var useCommentSelectors = () => useCommentStore().get;
var useCommentActions = () => useCommentStore().set;
var useCommentUser = (scope) => {
  const { useOption } = (0, import_react4.useEditorPlugin)(CommentsPlugin);
  const commentId = useCommentSelectors().id(scope);
  const comment = useOption("commentById", commentId);
  const users = useOption("users");
  if (!comment) return null;
  return users[comment.userId];
};
var useCommentReplies = (scope) => {
  const { useOption } = (0, import_react4.useEditorPlugin)(CommentsPlugin);
  const commentId = useCommentSelectors().id(scope);
  const comments = useOption("comments");
  const replies = {};
  Object.keys(comments).forEach((id) => {
    const comment = comments[id];
    if (!comment) return null;
    if (comment.parentId === commentId) {
      replies[id] = comment;
    }
  });
  return replies;
};
var useComment = (scope) => {
  const { useOption } = (0, import_react4.useEditorPlugin)(CommentsPlugin);
  const commentId = useCommentSelectors().id(scope);
  return useOption("commentById", commentId);
};
var useCommentText = (scope) => {
  var _a;
  const comment = useComment(scope);
  if (!comment) return null;
  return (0, import_plate_common10.getNodeString)((_a = comment.value) == null ? void 0 : _a[0]);
};
var useEditingCommentText = () => {
  const editingValue = useCommentSelectors().editingValue();
  if (!editingValue) return null;
  return (0, import_plate_common10.getNodeString)(editingValue == null ? void 0 : editingValue[0]);
};

// src/react/components/CommentDeleteButton.tsx
var useCommentDeleteButtonState = () => {
  const { api, editor, setOption, useOption } = (0, import_react5.useEditorPlugin)(CommentsPlugin);
  const activeCommentId = useOption("activeCommentId");
  const onCommentDelete = useOption(
    "onCommentDelete"
  );
  const id = useCommentSelectors().id();
  return {
    id,
    activeCommentId,
    api,
    editor,
    setOption,
    onCommentDelete
  };
};
var useCommentDeleteButton = ({
  id,
  activeCommentId,
  api,
  editor,
  setOption,
  onCommentDelete
}) => {
  return {
    props: {
      onClick: () => {
        if (activeCommentId === id) {
          unsetCommentNodesById(editor, { id });
          setOption("activeCommentId", null);
        } else {
          api.comment.removeComment(id);
        }
        onCommentDelete == null ? void 0 : onCommentDelete(id);
      }
    }
  };
};
var CommentDeleteButton = (0, import_react5.createPrimitiveComponent)("button")({
  propsHook: useCommentDeleteButton,
  stateHook: useCommentDeleteButtonState
});

// src/react/components/CommentEditCancelButton.tsx
var import_react6 = require("@udecode/plate-common/react");
var useCommentEditCancelButton = () => {
  const setEditingValue = useCommentActions().editingValue();
  return {
    props: {
      onClick: () => {
        setEditingValue(null);
      }
    }
  };
};
var CommentEditCancelButton = (0, import_react6.createPrimitiveComponent)("button")({
  propsHook: useCommentEditCancelButton
});

// src/react/components/CommentEditSaveButton.tsx
var import_react7 = __toESM(require("react"));
var import_react8 = require("@udecode/plate-common/react");
var useCommentEditSaveButtonState = () => {
  const { api, getOptions, setOption } = (0, import_react8.useEditorPlugin)(CommentsPlugin);
  const id = useCommentSelectors().id();
  const editingValue = useCommentSelectors().editingValue();
  const setEditingValue = useCommentActions().editingValue();
  const value = useCommentText();
  return {
    id,
    api,
    editingValue,
    getOptions,
    setEditingValue,
    setOption,
    value
  };
};
var useCommentEditSaveButton = ({
  id,
  api,
  editingValue,
  getOptions,
  setEditingValue,
  value
}) => {
  return {
    props: {
      disabled: (value == null ? void 0 : value.trim().length) === 0,
      onClick: import_react7.default.useCallback(() => {
        var _a, _b;
        if (!editingValue) return;
        api.comment.updateComment(id, {
          value: editingValue
        });
        setEditingValue(null);
        (_b = (_a = getOptions()).onCommentUpdate) == null ? void 0 : _b.call(_a, { id, value: editingValue });
      }, [api.comment, editingValue, getOptions, id, setEditingValue])
    }
  };
};
var CommentEditSaveButton = (0, import_react8.createPrimitiveComponent)("button")({
  propsHook: useCommentEditSaveButton,
  stateHook: useCommentEditSaveButtonState
});

// src/react/components/CommentEditActions.tsx
var CommentEditActions = {
  CancelButton: CommentEditCancelButton,
  SaveButton: CommentEditSaveButton
};

// src/react/components/CommentEditButton.tsx
var import_react9 = require("@udecode/plate-common/react");
var useCommentEditButtonState = () => {
  const setIsMenuOpen = useCommentActions().isMenuOpen();
  const comment = useComment();
  const editingValue = useCommentActions().editingValue();
  return {
    comment,
    editingValue,
    setIsMenuOpen
  };
};
var useCommentEditButton = ({
  comment,
  editingValue,
  setIsMenuOpen
}) => {
  return {
    props: {
      onClick: () => {
        setIsMenuOpen(false);
        editingValue(comment.value);
      }
    }
  };
};
var CommentEditButton = (0, import_react9.createPrimitiveComponent)("button")({
  propsHook: useCommentEditButton,
  stateHook: useCommentEditButtonState
});

// src/react/components/CommentEditTextarea.tsx
var import_react10 = __toESM(require("react"));
var import_react11 = require("@udecode/plate-common/react");
var useCommentEditTextareaState = () => {
  const setEditingValue = useCommentActions().editingValue();
  const value = useEditingCommentText();
  const textareaRef = import_react10.default.useRef(null);
  import_react10.default.useEffect(() => {
    setTimeout(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.focus();
      }
    }, 0);
  }, [textareaRef]);
  return {
    setEditingValue,
    textareaRef,
    value
  };
};
var useCommentEditTextarea = ({
  setEditingValue,
  textareaRef,
  value
}) => {
  return {
    props: {
      placeholder: "Add a comment...",
      ref: textareaRef,
      rows: 1,
      value: value != null ? value : void 0,
      onChange: (event) => {
        setEditingValue([
          { children: [{ text: event.target.value }], type: "p" }
        ]);
      }
    }
  };
};
var CommentEditTextarea = (0, import_react11.createPrimitiveComponent)("textarea")({
  propsHook: useCommentEditTextarea,
  stateHook: useCommentEditTextareaState
});

// src/react/components/CommentNewSubmitButton.tsx
var import_plate_common11 = require("@udecode/plate-common");
var import_react12 = require("@udecode/plate-common/react");
var useCommentNewSubmitButtonState = () => {
  const { api, getOptions, useOption } = (0, import_react12.useEditorPlugin)(CommentsPlugin);
  const newText = useOption("newText");
  const comment = useComment(SCOPE_ACTIVE_COMMENT);
  const isReplyComment = !!comment;
  const submitButtonText = isReplyComment ? "Reply" : "Comment";
  return {
    api,
    comment,
    getOptions,
    isReplyComment,
    newText,
    submitButtonText
  };
};
var useCommentNewSubmitButton = ({
  api,
  comment,
  getOptions,
  isReplyComment,
  newText,
  submitButtonText
}) => {
  return {
    props: {
      children: submitButtonText,
      disabled: !(newText == null ? void 0 : newText.trim().length),
      type: "submit",
      onClick: () => {
        const { activeCommentId, newValue, onCommentAdd } = getOptions();
        const newComment = api.comment.addComment(
          isReplyComment ? {
            id: (0, import_plate_common11.nanoid)(),
            parentId: comment.id,
            value: newValue
          } : {
            id: activeCommentId,
            value: newValue
          }
        );
        onCommentAdd == null ? void 0 : onCommentAdd(newComment);
        api.comment.resetNewCommentValue();
      }
    }
  };
};
var CommentNewSubmitButton = (0, import_react12.createPrimitiveComponent)("button")({
  propsHook: useCommentNewSubmitButton,
  stateHook: useCommentNewSubmitButtonState
});

// src/react/components/CommentNewTextarea.tsx
var import_react13 = __toESM(require("react"));
var import_react14 = require("@udecode/plate-common/react");
var useCommentNewTextareaState = () => {
  const { setOption, useOption } = (0, import_react14.useEditorPlugin)(CommentsPlugin);
  const activeComment = useOption("activeComment");
  const value = useOption("newText");
  const focusTextarea = useOption("focusTextarea");
  const textareaRef = import_react13.default.useRef(null);
  import_react13.default.useEffect(() => {
    var _a;
    if (focusTextarea) {
      (_a = textareaRef.current) == null ? void 0 : _a.focus();
      setOption("focusTextarea", false);
    }
  }, [focusTextarea, setOption, textareaRef]);
  const placeholder = `${activeComment ? "Reply..." : "Add a comment..."}`;
  return {
    placeholder,
    setOption,
    textareaRef,
    value
  };
};
var useCommentNewTextarea = ({
  placeholder,
  setOption,
  textareaRef,
  value
}) => {
  return {
    props: {
      placeholder,
      ref: textareaRef,
      rows: 1,
      value: value != null ? value : void 0,
      onChange: (event) => {
        setOption("newValue", [
          { children: [{ text: event.target.value }], type: "p" }
        ]);
      }
    }
  };
};
var CommentNewTextarea = (0, import_react14.createPrimitiveComponent)("textarea")({
  propsHook: useCommentNewTextarea,
  stateHook: useCommentNewTextareaState
});

// src/react/components/CommentResolveButton.tsx
var import_react15 = require("@udecode/plate-common/react");
var useCommentResolveButton = () => {
  const { api, getOptions, setOption } = (0, import_react15.useEditorPlugin)(CommentsPlugin);
  const comment = useComment();
  return {
    props: {
      onClick: () => {
        const isResolved = !comment.isResolved;
        const value = {
          isResolved
        };
        const { activeCommentId, onCommentUpdate } = getOptions();
        api.comment.updateComment(activeCommentId, value);
        onCommentUpdate == null ? void 0 : onCommentUpdate(__spreadValues({
          id: activeCommentId
        }, value));
        if (isResolved) {
          setOption("activeCommentId", null);
        }
      }
    }
  };
};
var CommentResolveButton = (0, import_react15.createPrimitiveComponent)("button")({
  propsHook: useCommentResolveButton
});

// src/react/components/CommentUserName.tsx
var import_react16 = require("@udecode/plate-common/react");
var useCommentUserName = () => {
  var _a;
  const user = useCommentUser();
  return {
    props: {
      children: (_a = user == null ? void 0 : user.name) != null ? _a : "Anonymous"
    }
  };
};
var CommentUserName = (0, import_react16.createPrimitiveComponent)("div")({
  propsHook: useCommentUserName
});

// src/react/components/CommentsPositioner.tsx
var import_react19 = __toESM(require("react"));
var import_react20 = require("@udecode/plate-common/react");

// src/react/queries/getCommentPosition.ts
var import_react17 = require("@udecode/plate-common/react");
var import_clamp = __toESM(require("lodash/clamp.js"));
var getCommentPosition = (editor, node) => {
  const DOMNode = (0, import_react17.toDOMNode)(editor, node);
  if (!DOMNode) return;
  const DOMNodePosition = getElementAbsolutePosition(DOMNode);
  const editorDOMNode = (0, import_react17.toDOMNode)(editor, editor);
  if (!editorDOMNode) return;
  const { width: editorWidth, x: editorX } = editorDOMNode.getBoundingClientRect();
  const sidebarWidth = 418;
  const padding = 16;
  return {
    left: (0, import_clamp.default)(
      editorX + editorWidth + 16,
      window.innerWidth - (sidebarWidth + padding)
    ),
    top: DOMNodePosition.top
  };
};

// src/react/stores/comments/useActiveCommentNode.ts
var import_react18 = require("@udecode/plate-common/react");
var useActiveCommentNode = () => {
  const { editor, useOption } = (0, import_react18.useEditorPlugin)(CommentsPlugin);
  const id = useOption("activeCommentId");
  if (!id) return null;
  return findCommentNodeById(editor, id);
};

// src/react/components/CommentsPositioner.tsx
var useCommentsPositionerState = () => {
  var _a;
  const { editor, useOption } = (0, import_react20.useEditorPlugin)(CommentsPlugin);
  let activeCommentId = useOption("activeCommentId");
  const [position, setPosition] = import_react19.default.useState(
    {
      left: 0,
      top: 0
    }
  );
  if (position.left === 0 && position.top === 0) {
    activeCommentId = null;
  }
  const [node] = (_a = useActiveCommentNode()) != null ? _a : [];
  import_react19.default.useEffect(() => {
    if (!node) return;
    const domNode = (0, import_react20.toDOMNode)(editor, node);
    if (!domNode) return;
    const newPosition = getCommentPosition(editor, node);
    if (!newPosition) return;
    setPosition(newPosition);
  }, [editor, node]);
  return {
    activeCommentId,
    position
  };
};
var useCommentsPositioner = ({
  activeCommentId,
  position
}) => {
  return {
    hidden: !activeCommentId,
    props: {
      style: __spreadValues({}, position)
    }
  };
};
var CommentsPositioner = (0, import_react20.createPrimitiveComponent)("div")({
  propsHook: useCommentsPositioner,
  stateHook: useCommentsPositionerState
});

// src/react/components/useCommentAddButton.ts
var import_react21 = __toESM(require("react"));
var import_react22 = require("@udecode/plate-common/react");
var useCommentAddButton = () => {
  const { setOption, tf, useOption } = (0, import_react22.useEditorPlugin)(CommentsPlugin);
  const myUserId = useOption("myUserId");
  const onClick = import_react21.default.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      tf.insert.comment();
      setOption("focusTextarea", true);
    },
    [setOption, tf.insert]
  );
  return {
    hidden: !myUserId,
    props: { onClick }
  };
};

// src/react/components/useCommentItemContent.ts
var import_react24 = require("@udecode/plate-common/react");

// src/react/stores/comments/useCommentsResolved.ts
var import_react23 = require("@udecode/plate-common/react");
var useCommentsResolved = () => {
  const { useOption } = (0, import_react23.useEditorPlugin)(CommentsPlugin);
  const comments = useOption("comments");
  const res = [];
  Object.keys(comments).forEach((key) => {
    const comment = comments[key];
    if (comment == null ? void 0 : comment.isResolved) {
      res.push(comment);
    }
  });
  return res;
};

// src/react/components/useCommentItemContent.ts
var useCommentItemContentState = () => {
  const { useOption } = (0, import_react24.useEditorPlugin)(CommentsPlugin);
  const comment = useComment();
  const isReplyComment = !!comment.parentId;
  const commentText = useCommentText();
  const user = useCommentUser();
  const myUserId = useOption("myUserId");
  const editingValue = useCommentSelectors().editingValue();
  const isMyComment = myUserId === comment.userId;
  return {
    comment,
    commentText,
    editingValue,
    isMyComment,
    isReplyComment,
    myUserId,
    user
  };
};

// src/react/components/useCommentLeaf.ts
var import_react25 = __toESM(require("react"));
var import_react26 = require("@udecode/plate-common/react");
var useCommentLeafState = ({ leaf }) => {
  const { editor, setOption, useOption } = (0, import_react26.useEditorPlugin)(CommentsPlugin);
  const [commentIds, setCommentIds] = import_react25.default.useState([]);
  const activeCommentId = useOption("activeCommentId");
  const comments = useOption("comments");
  const [commentCount, setCommentCount] = import_react25.default.useState(1);
  const [isActive, setIsActive] = import_react25.default.useState(false);
  import_react25.default.useEffect(() => {
    const ids = [];
    let count = 0;
    let _isActive = false;
    Object.keys(leaf).forEach((key) => {
      var _a;
      if (!isCommentKey(key)) return;
      const id = getCommentKeyId(key);
      if ((_a = comments[id]) == null ? void 0 : _a.isResolved) return;
      if (id === activeCommentId) {
        _isActive = true;
        setIsActive(true);
      }
      ids.push(getCommentKeyId(key));
      count++;
    });
    if (!_isActive && isActive) {
      setIsActive(false);
      ids.forEach((id) => {
        if (!comments[id]) {
          unsetCommentNodesById(editor, { id });
        }
      });
    }
    setCommentCount(count);
    setCommentIds(ids);
  }, [editor, activeCommentId, comments, isActive, leaf]);
  const lastCommentId = commentIds.at(-1);
  return {
    commentCount,
    isActive,
    lastCommentId,
    setOption
  };
};
var useCommentLeaf = ({
  lastCommentId,
  setOption
}) => {
  return {
    props: {
      onClick: import_react25.default.useCallback(
        (e) => {
          e.stopPropagation();
          setOption("activeCommentId", lastCommentId);
        },
        [lastCommentId, setOption]
      )
    }
  };
};

// src/react/components/useCommentsShowResolvedButton.ts
var import_react27 = __toESM(require("react"));
var useCommentsShowResolvedButton = () => {
  const [anchorEl, setAnchorEl] = import_react27.default.useState(
    null
  );
  const isActive = Boolean(anchorEl);
  return {
    props: {
      pressed: isActive,
      onClick: (e) => {
        setAnchorEl(e.currentTarget);
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};

// src/react/components/useFloatingCommentsContentState.ts
var import_react28 = __toESM(require("react"));
var import_react29 = require("@udecode/plate-common/react");
var useFloatingCommentsContentState = () => {
  const { useOption } = (0, import_react29.useEditorPlugin)(CommentsPlugin);
  const activeCommentId = useOption("activeCommentId");
  const activeComment = useOption("activeComment");
  const myUserId = useOption("myUserId");
  const ref = import_react28.default.useRef(null);
  return {
    activeCommentId,
    hasNoComment: !activeComment,
    myUserId,
    ref
  };
};

// src/react/components/useFloatingCommentsState.ts
var import_react30 = __toESM(require("react"));
var import_plate_common12 = require("@udecode/plate-common");
var import_react31 = require("@udecode/plate-common/react");
var useFloatingCommentsState = () => {
  const { api, editor, setOption, useOption } = (0, import_react31.useEditorPlugin)(BaseCommentsPlugin);
  const version = (0, import_react31.useEditorVersion)();
  const activeCommentId = useOption("activeCommentId");
  const [loaded, setLoaded] = import_react30.default.useState(false);
  const [active, setActive] = import_react30.default.useState(false);
  import_react30.default.useEffect(() => {
    if (activeCommentId && (0, import_plate_common12.someNode)(editor, {
      match: (n) => n[BaseCommentsPlugin.key]
    })) {
      setActive(true);
    }
    if (!(0, import_plate_common12.someNode)(editor, { match: (n) => n[BaseCommentsPlugin.key] })) {
      setOption("activeCommentId", null);
      setActive(false);
    }
  }, [active, activeCommentId, editor, setOption, version]);
  import_react30.default.useEffect(() => {
    setLoaded(true);
  }, []);
  import_react30.default.useEffect(() => {
    if (activeCommentId) {
      api.comment.resetNewCommentValue();
    }
  }, [activeCommentId, api.comment]);
  return {
    activeCommentId,
    loaded
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommentDeleteButton,
  CommentEditActions,
  CommentEditButton,
  CommentEditCancelButton,
  CommentEditSaveButton,
  CommentEditTextarea,
  CommentNewSubmitButton,
  CommentNewTextarea,
  CommentProvider,
  CommentResolveButton,
  CommentUserName,
  CommentsPlugin,
  CommentsPositioner,
  SCOPE_ACTIVE_COMMENT,
  commentStore,
  getCommentPosition,
  insertComment,
  useActiveCommentNode,
  useComment,
  useCommentActions,
  useCommentAddButton,
  useCommentDeleteButton,
  useCommentDeleteButtonState,
  useCommentEditButton,
  useCommentEditButtonState,
  useCommentEditCancelButton,
  useCommentEditSaveButton,
  useCommentEditSaveButtonState,
  useCommentEditTextarea,
  useCommentEditTextareaState,
  useCommentItemContentState,
  useCommentLeaf,
  useCommentLeafState,
  useCommentNewSubmitButton,
  useCommentNewSubmitButtonState,
  useCommentNewTextarea,
  useCommentNewTextareaState,
  useCommentReplies,
  useCommentResolveButton,
  useCommentSelectors,
  useCommentStates,
  useCommentStore,
  useCommentText,
  useCommentUser,
  useCommentUserName,
  useCommentsPositioner,
  useCommentsPositionerState,
  useCommentsResolved,
  useCommentsShowResolvedButton,
  useEditingCommentText,
  useFloatingCommentsContentState,
  useFloatingCommentsState,
  useHooksComments
});
//# sourceMappingURL=index.js.map