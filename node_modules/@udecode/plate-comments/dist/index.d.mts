import { B as BaseCommentsConfig, T as TCommentText } from './BaseCommentsPlugin-wcqq64db.mjs';
export { b as BaseCommentsPlugin, c as CommentUser, a as CommentsApi, C as CommentsSelectors, d as TComment } from './BaseCommentsPlugin-wcqq64db.mjs';
import { ExtendEditor, SlateEditor, FindNodeOptions, TNode } from '@udecode/plate-common';
import * as _udecode_slate from '@udecode/slate';
import '@udecode/plate-core';

declare const withComments: ExtendEditor<BaseCommentsConfig>;

declare const findCommentNode: (editor: SlateEditor, options?: FindNodeOptions) => _udecode_slate.TNodeEntry<TCommentText> | undefined;

declare const findCommentNodeById: (editor: SlateEditor, id: string) => _udecode_slate.TNodeEntry<TCommentText> | undefined;

declare const getCommentNodeEntries: (editor: SlateEditor) => _udecode_slate.TNodeEntry<TCommentText>[];

declare const getCommentNodesById: (editor: SlateEditor, id: string) => _udecode_slate.TNodeEntry<_udecode_slate.NodeOf<SlateEditor>>[];

declare const removeCommentMark: (editor: SlateEditor) => void;

declare const getCommentCount: (node: TCommentText) => number;

declare const getCommentKey: (id: string) => string;

declare const getCommentKeyId: (key: string) => string;

declare const getCommentKeys: (node: TCommentText) => string[];

declare const getCommentUrl: (commentId: string) => string;

declare const getElementAbsolutePosition: (element: HTMLElement) => {
    left: number;
    top: number;
};

declare const isCommentKey: (key: string) => boolean;

/** Whether the node has a comment id. */
declare const isCommentNodeById: (node: TNode, id: string) => boolean;

declare const isCommentText: (node: TNode) => node is TCommentText;

declare const unsetCommentNodesById: (editor: SlateEditor, { id }: {
    id: string;
}) => void;

export { BaseCommentsConfig, TCommentText, findCommentNode, findCommentNodeById, getCommentCount, getCommentKey, getCommentKeyId, getCommentKeys, getCommentNodeEntries, getCommentNodesById, getCommentUrl, getElementAbsolutePosition, isCommentKey, isCommentNodeById, isCommentText, removeCommentMark, unsetCommentNodesById, withComments };
