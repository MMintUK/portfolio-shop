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

// src/react/CommentsPlugin.tsx
import {
  bindFirst
} from "@udecode/plate-common";
import { Key, toPlatePlugin } from "@udecode/plate-common/react";

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

// src/react/transforms/insertComment.ts
import {
  isExpanded,
  isText,
  nanoid as nanoid2,
  setNodes
} from "@udecode/plate-common";
import { deselectEditor } from "@udecode/plate-common/react";
var insertComment = (editor) => {
  const { selection } = editor;
  if (!isExpanded(selection)) return;
  const id = nanoid2();
  setNodes(
    editor,
    { [BaseCommentsPlugin.key]: true, [getCommentKey(id)]: true },
    { match: isText, split: true }
  );
  try {
    deselectEditor(editor);
  } catch (e) {
  }
  setTimeout(() => {
    editor.setOption(BaseCommentsPlugin, "activeCommentId", id);
  }, 0);
};

// src/react/useHooksComments.ts
import { isExpanded as isExpanded2 } from "@udecode/plate-common";
import { useHotkeys } from "@udecode/plate-common/react";
var useHooksComments = ({
  editor,
  setOption,
  tf
}) => {
  useHotkeys(
    editor.shortcuts.toggleComment.keys,
    (e) => {
      if (!editor.selection) return;
      e.preventDefault();
      if (!isExpanded2(editor.selection)) return;
      tf.insert.comment();
      setOption("focusTextarea", true);
    },
    {
      enableOnContentEditable: true
    }
  );
};

// src/react/CommentsPlugin.tsx
var CommentsPlugin = toPlatePlugin(BaseCommentsPlugin, {
  shortcuts: {
    toggleComment: {
      keys: [[Key.Mod, Key.Shift, "m"]]
    }
  },
  useHooks: useHooksComments
}).extendEditorTransforms(({ editor }) => ({
  insert: { comment: bindFirst(insertComment, editor) }
}));

// src/react/components/CommentDeleteButton.tsx
import {
  createPrimitiveComponent,
  useEditorPlugin as useEditorPlugin2
} from "@udecode/plate-common/react";

// src/react/stores/comment/CommentProvider.tsx
import { getNodeString as getNodeString2 } from "@udecode/plate-common";
import { createAtomStore, useEditorPlugin } from "@udecode/plate-common/react";
var SCOPE_ACTIVE_COMMENT = "activeComment";
var { CommentProvider, commentStore, useCommentStore } = createAtomStore(
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
  const { useOption } = useEditorPlugin(CommentsPlugin);
  const commentId = useCommentSelectors().id(scope);
  const comment = useOption("commentById", commentId);
  const users = useOption("users");
  if (!comment) return null;
  return users[comment.userId];
};
var useCommentReplies = (scope) => {
  const { useOption } = useEditorPlugin(CommentsPlugin);
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
  const { useOption } = useEditorPlugin(CommentsPlugin);
  const commentId = useCommentSelectors().id(scope);
  return useOption("commentById", commentId);
};
var useCommentText = (scope) => {
  var _a;
  const comment = useComment(scope);
  if (!comment) return null;
  return getNodeString2((_a = comment.value) == null ? void 0 : _a[0]);
};
var useEditingCommentText = () => {
  const editingValue = useCommentSelectors().editingValue();
  if (!editingValue) return null;
  return getNodeString2(editingValue == null ? void 0 : editingValue[0]);
};

// src/react/components/CommentDeleteButton.tsx
var useCommentDeleteButtonState = () => {
  const { api, editor, setOption, useOption } = useEditorPlugin2(CommentsPlugin);
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
var CommentDeleteButton = createPrimitiveComponent("button")({
  propsHook: useCommentDeleteButton,
  stateHook: useCommentDeleteButtonState
});

// src/react/components/CommentEditCancelButton.tsx
import { createPrimitiveComponent as createPrimitiveComponent2 } from "@udecode/plate-common/react";
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
var CommentEditCancelButton = createPrimitiveComponent2("button")({
  propsHook: useCommentEditCancelButton
});

// src/react/components/CommentEditSaveButton.tsx
import React from "react";
import {
  createPrimitiveComponent as createPrimitiveComponent3,
  useEditorPlugin as useEditorPlugin3
} from "@udecode/plate-common/react";
var useCommentEditSaveButtonState = () => {
  const { api, getOptions, setOption } = useEditorPlugin3(CommentsPlugin);
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
      onClick: React.useCallback(() => {
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
var CommentEditSaveButton = createPrimitiveComponent3("button")({
  propsHook: useCommentEditSaveButton,
  stateHook: useCommentEditSaveButtonState
});

// src/react/components/CommentEditActions.tsx
var CommentEditActions = {
  CancelButton: CommentEditCancelButton,
  SaveButton: CommentEditSaveButton
};

// src/react/components/CommentEditButton.tsx
import { createPrimitiveComponent as createPrimitiveComponent4 } from "@udecode/plate-common/react";
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
var CommentEditButton = createPrimitiveComponent4("button")({
  propsHook: useCommentEditButton,
  stateHook: useCommentEditButtonState
});

// src/react/components/CommentEditTextarea.tsx
import React2 from "react";
import { createPrimitiveComponent as createPrimitiveComponent5 } from "@udecode/plate-common/react";
var useCommentEditTextareaState = () => {
  const setEditingValue = useCommentActions().editingValue();
  const value = useEditingCommentText();
  const textareaRef = React2.useRef(null);
  React2.useEffect(() => {
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
var CommentEditTextarea = createPrimitiveComponent5("textarea")({
  propsHook: useCommentEditTextarea,
  stateHook: useCommentEditTextareaState
});

// src/react/components/CommentNewSubmitButton.tsx
import { nanoid as nanoid3 } from "@udecode/plate-common";
import {
  createPrimitiveComponent as createPrimitiveComponent6,
  useEditorPlugin as useEditorPlugin4
} from "@udecode/plate-common/react";
var useCommentNewSubmitButtonState = () => {
  const { api, getOptions, useOption } = useEditorPlugin4(CommentsPlugin);
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
            id: nanoid3(),
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
var CommentNewSubmitButton = createPrimitiveComponent6("button")({
  propsHook: useCommentNewSubmitButton,
  stateHook: useCommentNewSubmitButtonState
});

// src/react/components/CommentNewTextarea.tsx
import React3 from "react";
import {
  createPrimitiveComponent as createPrimitiveComponent7,
  useEditorPlugin as useEditorPlugin5
} from "@udecode/plate-common/react";
var useCommentNewTextareaState = () => {
  const { setOption, useOption } = useEditorPlugin5(CommentsPlugin);
  const activeComment = useOption("activeComment");
  const value = useOption("newText");
  const focusTextarea = useOption("focusTextarea");
  const textareaRef = React3.useRef(null);
  React3.useEffect(() => {
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
var CommentNewTextarea = createPrimitiveComponent7("textarea")({
  propsHook: useCommentNewTextarea,
  stateHook: useCommentNewTextareaState
});

// src/react/components/CommentResolveButton.tsx
import {
  createPrimitiveComponent as createPrimitiveComponent8,
  useEditorPlugin as useEditorPlugin6
} from "@udecode/plate-common/react";
var useCommentResolveButton = () => {
  const { api, getOptions, setOption } = useEditorPlugin6(CommentsPlugin);
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
var CommentResolveButton = createPrimitiveComponent8("button")({
  propsHook: useCommentResolveButton
});

// src/react/components/CommentUserName.tsx
import { createPrimitiveComponent as createPrimitiveComponent9 } from "@udecode/plate-common/react";
var useCommentUserName = () => {
  var _a;
  const user = useCommentUser();
  return {
    props: {
      children: (_a = user == null ? void 0 : user.name) != null ? _a : "Anonymous"
    }
  };
};
var CommentUserName = createPrimitiveComponent9("div")({
  propsHook: useCommentUserName
});

// src/react/components/CommentsPositioner.tsx
import React4 from "react";
import {
  createPrimitiveComponent as createPrimitiveComponent10,
  toDOMNode as toDOMNode2,
  useEditorPlugin as useEditorPlugin8
} from "@udecode/plate-common/react";

// src/react/queries/getCommentPosition.ts
import { toDOMNode } from "@udecode/plate-common/react";
import clamp from "lodash/clamp.js";
var getCommentPosition = (editor, node) => {
  const DOMNode = toDOMNode(editor, node);
  if (!DOMNode) return;
  const DOMNodePosition = getElementAbsolutePosition(DOMNode);
  const editorDOMNode = toDOMNode(editor, editor);
  if (!editorDOMNode) return;
  const { width: editorWidth, x: editorX } = editorDOMNode.getBoundingClientRect();
  const sidebarWidth = 418;
  const padding = 16;
  return {
    left: clamp(
      editorX + editorWidth + 16,
      window.innerWidth - (sidebarWidth + padding)
    ),
    top: DOMNodePosition.top
  };
};

// src/react/stores/comments/useActiveCommentNode.ts
import { useEditorPlugin as useEditorPlugin7 } from "@udecode/plate-common/react";
var useActiveCommentNode = () => {
  const { editor, useOption } = useEditorPlugin7(CommentsPlugin);
  const id = useOption("activeCommentId");
  if (!id) return null;
  return findCommentNodeById(editor, id);
};

// src/react/components/CommentsPositioner.tsx
var useCommentsPositionerState = () => {
  var _a;
  const { editor, useOption } = useEditorPlugin8(CommentsPlugin);
  let activeCommentId = useOption("activeCommentId");
  const [position, setPosition] = React4.useState(
    {
      left: 0,
      top: 0
    }
  );
  if (position.left === 0 && position.top === 0) {
    activeCommentId = null;
  }
  const [node] = (_a = useActiveCommentNode()) != null ? _a : [];
  React4.useEffect(() => {
    if (!node) return;
    const domNode = toDOMNode2(editor, node);
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
var CommentsPositioner = createPrimitiveComponent10("div")({
  propsHook: useCommentsPositioner,
  stateHook: useCommentsPositionerState
});

// src/react/components/useCommentAddButton.ts
import React5 from "react";
import { useEditorPlugin as useEditorPlugin9 } from "@udecode/plate-common/react";
var useCommentAddButton = () => {
  const { setOption, tf, useOption } = useEditorPlugin9(CommentsPlugin);
  const myUserId = useOption("myUserId");
  const onClick = React5.useCallback(
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
import { useEditorPlugin as useEditorPlugin11 } from "@udecode/plate-common/react";

// src/react/stores/comments/useCommentsResolved.ts
import { useEditorPlugin as useEditorPlugin10 } from "@udecode/plate-common/react";
var useCommentsResolved = () => {
  const { useOption } = useEditorPlugin10(CommentsPlugin);
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
  const { useOption } = useEditorPlugin11(CommentsPlugin);
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
import React6 from "react";
import { useEditorPlugin as useEditorPlugin12 } from "@udecode/plate-common/react";
var useCommentLeafState = ({ leaf }) => {
  const { editor, setOption, useOption } = useEditorPlugin12(CommentsPlugin);
  const [commentIds, setCommentIds] = React6.useState([]);
  const activeCommentId = useOption("activeCommentId");
  const comments = useOption("comments");
  const [commentCount, setCommentCount] = React6.useState(1);
  const [isActive, setIsActive] = React6.useState(false);
  React6.useEffect(() => {
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
      onClick: React6.useCallback(
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
import React7 from "react";
var useCommentsShowResolvedButton = () => {
  const [anchorEl, setAnchorEl] = React7.useState(
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
import React8 from "react";
import { useEditorPlugin as useEditorPlugin13 } from "@udecode/plate-common/react";
var useFloatingCommentsContentState = () => {
  const { useOption } = useEditorPlugin13(CommentsPlugin);
  const activeCommentId = useOption("activeCommentId");
  const activeComment = useOption("activeComment");
  const myUserId = useOption("myUserId");
  const ref = React8.useRef(null);
  return {
    activeCommentId,
    hasNoComment: !activeComment,
    myUserId,
    ref
  };
};

// src/react/components/useFloatingCommentsState.ts
import React9 from "react";
import { someNode } from "@udecode/plate-common";
import { useEditorPlugin as useEditorPlugin14, useEditorVersion } from "@udecode/plate-common/react";
var useFloatingCommentsState = () => {
  const { api, editor, setOption, useOption } = useEditorPlugin14(BaseCommentsPlugin);
  const version = useEditorVersion();
  const activeCommentId = useOption("activeCommentId");
  const [loaded, setLoaded] = React9.useState(false);
  const [active, setActive] = React9.useState(false);
  React9.useEffect(() => {
    if (activeCommentId && someNode(editor, {
      match: (n) => n[BaseCommentsPlugin.key]
    })) {
      setActive(true);
    }
    if (!someNode(editor, { match: (n) => n[BaseCommentsPlugin.key] })) {
      setOption("activeCommentId", null);
      setActive(false);
    }
  }, [active, activeCommentId, editor, setOption, version]);
  React9.useEffect(() => {
    setLoaded(true);
  }, []);
  React9.useEffect(() => {
    if (activeCommentId) {
      api.comment.resetNewCommentValue();
    }
  }, [activeCommentId, api.comment]);
  return {
    activeCommentId,
    loaded
  };
};
export {
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
};
//# sourceMappingURL=index.mjs.map