import * as _udecode_plate_core from '@udecode/plate-core';
import { Value, TText, PluginConfig, WithPartial } from '@udecode/plate-common';

interface CommentUser {
    id: string;
    name: string;
    avatarUrl?: string;
}
interface TComment {
    id: string;
    /** @default Date.now() */
    createdAt: number;
    /** Author id. */
    userId: string;
    /** Slate value of the document. */
    value: Value;
    /** Whether the comment is resolved. */
    isResolved?: boolean;
    /** Parent comment id it replies to. */
    parentId?: string;
}
interface TCommentText extends TText {
    comment?: boolean;
    comments?: Record<string, boolean>;
}

type BaseCommentsConfig = PluginConfig<'comment', {
    activeCommentId: string | null;
    addingCommentId: string | null;
    comments: Record<string, TComment>;
    focusTextarea: boolean;
    myUserId: string | null;
    newValue: Value;
    users: Record<string, CommentUser>;
    onCommentAdd: ((value: WithPartial<TComment, 'userId'>) => void) | null;
    onCommentDelete: ((id: string) => void) | null;
    onCommentUpdate: ((value: Partial<Omit<TComment, 'id'>> & Pick<TComment, 'id'>) => void) | null;
} & CommentsSelectors, {
    comment: CommentsApi;
}>;
type CommentsSelectors = {
    activeComment?: () => TComment | null;
    commentById?: (id: string | null) => TComment | null;
    myUser?: () => CommentUser | null;
    newText?: () => string;
    userById?: (id: string | null) => CommentUser | null;
};
type CommentsApi = {
    addComment: (value: WithPartial<TComment, 'createdAt' | 'id' | 'userId'>) => WithPartial<TComment, 'userId'>;
    addRawComment: (id: string) => void;
    removeComment: (id: string | null) => void;
    resetNewCommentValue: () => void;
    updateComment: (id: string | null, value: Partial<TComment>) => void;
};
declare const BaseCommentsPlugin: _udecode_plate_core.SlatePlugin<PluginConfig<"comment", Partial<CommentsSelectors> & {
    activeCommentId: string | null;
    addingCommentId: string | null;
    comments: Record<string, TComment>;
    focusTextarea: boolean;
    myUserId: string | null;
    newValue: Value;
    users: Record<string, CommentUser>;
    onCommentAdd: ((value: WithPartial<TComment, "userId">) => void) | null;
    onCommentDelete: ((id: string) => void) | null;
    onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
} & CommentsSelectors, {
    comment: CommentsApi;
} & Record<"comment", Partial<CommentsApi>>, {}>>;

export { type BaseCommentsConfig as B, type CommentsSelectors as C, type TCommentText as T, type CommentsApi as a, BaseCommentsPlugin as b, type CommentUser as c, type TComment as d };
