import * as _udecode_plate_core_react from '@udecode/plate-core/react';
import * as _udecode_plate_core from '@udecode/plate-core';
import * as _udecode_utils from '@udecode/utils';
import * as _udecode_slate from '@udecode/slate';
import { B as BaseCommentsConfig, d as TComment, c as CommentUser, C as CommentsSelectors, a as CommentsApi, T as TCommentText } from '../BaseCommentsPlugin-wcqq64db.mjs';
import { SlateEditor, ExtendConfig, OmitFirst, Value } from '@udecode/plate-common';
import { UseHooks } from '@udecode/plate-common/react';
import * as react from 'react';
import react__default from 'react';
import * as jotai from 'jotai';
import * as jotai_x from 'jotai-x';

declare const insertComment: (editor: SlateEditor) => void;

type CommentsConfig = ExtendConfig<BaseCommentsConfig, {}, {}, {
    insert: {
        comment: OmitFirst<typeof insertComment>;
    };
}>;
/** Enables support for comments in the editor. */
declare const CommentsPlugin: _udecode_plate_core_react.PlatePlugin<_udecode_plate_core.PluginConfig<"comment", {
    activeCommentId: string | null;
    addingCommentId: string | null;
    comments: Record<string, TComment>;
    focusTextarea: boolean;
    myUserId: string | null;
    newValue: _udecode_slate.Value;
    users: Record<string, CommentUser>;
    onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
    onCommentDelete: ((id: string) => void) | null;
    onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
} & CommentsSelectors & Partial<CommentsSelectors>, {
    comment: CommentsApi;
} & Record<"comment", Partial<CommentsApi>>, {
    insert: {
        comment: (() => void) & (() => void);
    };
}>>;

declare const useHooksComments: UseHooks<CommentsConfig>;

declare const useCommentDeleteButtonState: () => {
    id: string;
    activeCommentId: string | null;
    api: {
        comment: CommentsApi;
    } & Record<"comment", Partial<CommentsApi>>;
    editor: _udecode_plate_core_react.PlateEditor;
    setOption: <K extends "comments" | "activeCommentId" | "addingCommentId" | "focusTextarea" | "myUserId" | "onCommentAdd" | "onCommentDelete" | "onCommentUpdate" | keyof CommentsSelectors | "users" | "newValue">(optionKey: K, value: ({
        activeCommentId: string | null;
        addingCommentId: string | null;
        comments: Record<string, TComment>;
        focusTextarea: boolean;
        myUserId: string | null;
        newValue: _udecode_slate.Value;
        users: Record<string, CommentUser>;
        onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
        onCommentDelete: ((id: string) => void) | null;
        onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
    } & CommentsSelectors & Partial<CommentsSelectors>)[K]) => void;
    onCommentDelete: ((id: string) => void) | null;
};
declare const useCommentDeleteButton: ({ id, activeCommentId, api, editor, setOption, onCommentDelete, }: ReturnType<typeof useCommentDeleteButtonState>) => {
    props: {
        onClick: () => void;
    };
};
declare const CommentDeleteButton: react.ForwardRefExoticComponent<{
    as?: React.ElementType;
    asChild?: boolean;
    className?: string;
    options?: undefined;
    setProps?: ((hookProps: {
        onClick: () => void;
    }) => Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
    state?: {
        id: string;
        activeCommentId: string | null;
        api: {
            comment: CommentsApi;
        } & Record<"comment", Partial<CommentsApi>>;
        editor: _udecode_plate_core_react.PlateEditor;
        setOption: <K extends "comments" | "activeCommentId" | "addingCommentId" | "focusTextarea" | "myUserId" | "onCommentAdd" | "onCommentDelete" | "onCommentUpdate" | keyof CommentsSelectors | "users" | "newValue">(optionKey: K, value: ({
            activeCommentId: string | null;
            addingCommentId: string | null;
            comments: Record<string, TComment>;
            focusTextarea: boolean;
            myUserId: string | null;
            newValue: _udecode_slate.Value;
            users: Record<string, CommentUser>;
            onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
            onCommentDelete: ((id: string) => void) | null;
            onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
        } & CommentsSelectors & Partial<CommentsSelectors>)[K]) => void;
        onCommentDelete: ((id: string) => void) | null;
    } | undefined;
    style?: React.CSSProperties;
} & Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & react.RefAttributes<any>>;

declare const CommentEditActions: {
    CancelButton: react.ForwardRefExoticComponent<{
        as?: React.ElementType;
        asChild?: boolean;
        className?: string;
        options?: any;
        setProps?: ((hookProps: {
            onClick: () => void;
        }) => Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
        state?: undefined;
        style?: React.CSSProperties;
    } & Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & react.RefAttributes<any>>;
    SaveButton: react.ForwardRefExoticComponent<{
        as?: React.ElementType;
        asChild?: boolean;
        className?: string;
        options?: undefined;
        setProps?: ((hookProps: {
            disabled: boolean;
            onClick: () => void;
        }) => Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
        state?: {
            id: string;
            api: {
                comment: CommentsApi;
            } & Record<"comment", Partial<CommentsApi>>;
            editingValue: _udecode_slate.Value | null;
            getOptions: () => {
                activeCommentId: string | null;
                addingCommentId: string | null;
                comments: Record<string, TComment>;
                focusTextarea: boolean;
                myUserId: string | null;
                newValue: _udecode_slate.Value;
                users: Record<string, CommentUser>;
                onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
                onCommentDelete: ((id: string) => void) | null;
                onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
            } & CommentsSelectors & Partial<CommentsSelectors>;
            setEditingValue: (args_0: _udecode_slate.Value | null) => void;
            setOption: <K extends "comments" | "activeCommentId" | "addingCommentId" | "focusTextarea" | "myUserId" | "onCommentAdd" | "onCommentDelete" | "onCommentUpdate" | keyof CommentsSelectors | "users" | "newValue">(optionKey: K, value: ({
                activeCommentId: string | null;
                addingCommentId: string | null;
                comments: Record<string, TComment>;
                focusTextarea: boolean;
                myUserId: string | null;
                newValue: _udecode_slate.Value;
                users: Record<string, CommentUser>;
                onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
                onCommentDelete: ((id: string) => void) | null;
                onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
            } & CommentsSelectors & Partial<CommentsSelectors>)[K]) => void;
            value: string | null;
        } | undefined;
        style?: React.CSSProperties;
    } & Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & react.RefAttributes<any>>;
};

declare const useCommentEditButtonState: () => {
    comment: TComment;
    editingValue: (args_0: _udecode_slate.Value | null) => void;
    setIsMenuOpen: (args_0: boolean) => void;
};
declare const useCommentEditButton: ({ comment, editingValue, setIsMenuOpen, }: ReturnType<typeof useCommentEditButtonState>) => {
    props: {
        onClick: () => void;
    };
};
declare const CommentEditButton: react.ForwardRefExoticComponent<{
    as?: React.ElementType;
    asChild?: boolean;
    className?: string;
    options?: undefined;
    setProps?: ((hookProps: {
        onClick: () => void;
    }) => Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
    state?: {
        comment: TComment;
        editingValue: (args_0: _udecode_slate.Value | null) => void;
        setIsMenuOpen: (args_0: boolean) => void;
    } | undefined;
    style?: React.CSSProperties;
} & Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & react.RefAttributes<any>>;

declare const useCommentEditCancelButton: () => {
    props: {
        onClick: () => void;
    };
};
declare const CommentEditCancelButton: react.ForwardRefExoticComponent<{
    as?: React.ElementType;
    asChild?: boolean;
    className?: string;
    options?: any;
    setProps?: ((hookProps: {
        onClick: () => void;
    }) => Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
    state?: undefined;
    style?: React.CSSProperties;
} & Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & react.RefAttributes<any>>;

declare const useCommentEditSaveButtonState: () => {
    id: string;
    api: {
        comment: CommentsApi;
    } & Record<"comment", Partial<CommentsApi>>;
    editingValue: _udecode_slate.Value | null;
    getOptions: () => {
        activeCommentId: string | null;
        addingCommentId: string | null;
        comments: Record<string, TComment>;
        focusTextarea: boolean;
        myUserId: string | null;
        newValue: _udecode_slate.Value;
        users: Record<string, CommentUser>;
        onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
        onCommentDelete: ((id: string) => void) | null;
        onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
    } & CommentsSelectors & Partial<CommentsSelectors>;
    setEditingValue: (args_0: _udecode_slate.Value | null) => void;
    setOption: <K extends "comments" | "activeCommentId" | "addingCommentId" | "focusTextarea" | "myUserId" | "onCommentAdd" | "onCommentDelete" | "onCommentUpdate" | keyof CommentsSelectors | "users" | "newValue">(optionKey: K, value: ({
        activeCommentId: string | null;
        addingCommentId: string | null;
        comments: Record<string, TComment>;
        focusTextarea: boolean;
        myUserId: string | null;
        newValue: _udecode_slate.Value;
        users: Record<string, CommentUser>;
        onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
        onCommentDelete: ((id: string) => void) | null;
        onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
    } & CommentsSelectors & Partial<CommentsSelectors>)[K]) => void;
    value: string | null;
};
declare const useCommentEditSaveButton: ({ id, api, editingValue, getOptions, setEditingValue, value, }: ReturnType<typeof useCommentEditSaveButtonState>) => {
    props: {
        disabled: boolean;
        onClick: () => void;
    };
};
declare const CommentEditSaveButton: react__default.ForwardRefExoticComponent<{
    as?: react__default.ElementType;
    asChild?: boolean;
    className?: string;
    options?: undefined;
    setProps?: ((hookProps: {
        disabled: boolean;
        onClick: () => void;
    }) => Omit<react__default.DetailedHTMLProps<react__default.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
    state?: {
        id: string;
        api: {
            comment: CommentsApi;
        } & Record<"comment", Partial<CommentsApi>>;
        editingValue: _udecode_slate.Value | null;
        getOptions: () => {
            activeCommentId: string | null;
            addingCommentId: string | null;
            comments: Record<string, TComment>;
            focusTextarea: boolean;
            myUserId: string | null;
            newValue: _udecode_slate.Value;
            users: Record<string, CommentUser>;
            onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
            onCommentDelete: ((id: string) => void) | null;
            onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
        } & CommentsSelectors & Partial<CommentsSelectors>;
        setEditingValue: (args_0: _udecode_slate.Value | null) => void;
        setOption: <K extends "comments" | "activeCommentId" | "addingCommentId" | "focusTextarea" | "myUserId" | "onCommentAdd" | "onCommentDelete" | "onCommentUpdate" | keyof CommentsSelectors | "users" | "newValue">(optionKey: K, value: ({
            activeCommentId: string | null;
            addingCommentId: string | null;
            comments: Record<string, TComment>;
            focusTextarea: boolean;
            myUserId: string | null;
            newValue: _udecode_slate.Value;
            users: Record<string, CommentUser>;
            onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
            onCommentDelete: ((id: string) => void) | null;
            onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
        } & CommentsSelectors & Partial<CommentsSelectors>)[K]) => void;
        value: string | null;
    } | undefined;
    style?: react__default.CSSProperties;
} & Omit<react__default.DetailedHTMLProps<react__default.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & react__default.RefAttributes<any>>;

declare const useCommentEditTextareaState: () => {
    setEditingValue: (args_0: _udecode_slate.Value | null) => void;
    textareaRef: react__default.MutableRefObject<HTMLTextAreaElement | null>;
    value: string | null;
};
declare const useCommentEditTextarea: ({ setEditingValue, textareaRef, value, }: ReturnType<typeof useCommentEditTextareaState>) => {
    props: {
        placeholder: string;
        ref: react__default.MutableRefObject<HTMLTextAreaElement | null>;
        rows: number;
        value: string | undefined;
        onChange: (event: react__default.ChangeEvent<HTMLTextAreaElement>) => void;
    };
};
declare const CommentEditTextarea: react__default.ForwardRefExoticComponent<{
    as?: react__default.ElementType;
    asChild?: boolean;
    className?: string;
    options?: undefined;
    setProps?: ((hookProps: {
        placeholder: string;
        ref: react__default.MutableRefObject<HTMLTextAreaElement | null>;
        rows: number;
        value: string | undefined;
        onChange: (event: react__default.ChangeEvent<HTMLTextAreaElement>) => void;
    }) => Omit<react__default.DetailedHTMLProps<react__default.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref">) | undefined;
    state?: {
        setEditingValue: (args_0: _udecode_slate.Value | null) => void;
        textareaRef: react__default.MutableRefObject<HTMLTextAreaElement | null>;
        value: string | null;
    } | undefined;
    style?: react__default.CSSProperties;
} & Omit<react__default.DetailedHTMLProps<react__default.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & react__default.RefAttributes<any>>;

declare const useCommentNewSubmitButtonState: () => {
    api: {
        comment: CommentsApi;
    } & Record<"comment", Partial<CommentsApi>>;
    comment: TComment;
    getOptions: () => {
        activeCommentId: string | null;
        addingCommentId: string | null;
        comments: Record<string, TComment>;
        focusTextarea: boolean;
        myUserId: string | null;
        newValue: _udecode_slate.Value;
        users: Record<string, CommentUser>;
        onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
        onCommentDelete: ((id: string) => void) | null;
        onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
    } & CommentsSelectors & Partial<CommentsSelectors>;
    isReplyComment: boolean;
    newText: string | undefined;
    submitButtonText: string;
};
declare const useCommentNewSubmitButton: ({ api, comment, getOptions, isReplyComment, newText, submitButtonText, }: ReturnType<typeof useCommentNewSubmitButtonState>) => {
    props: {
        children: string;
        disabled: boolean;
        type: string;
        onClick: () => void;
    };
};
declare const CommentNewSubmitButton: react.ForwardRefExoticComponent<{
    as?: React.ElementType;
    asChild?: boolean;
    className?: string;
    options?: undefined;
    setProps?: ((hookProps: {
        children: string;
        disabled: boolean;
        type: string;
        onClick: () => void;
    }) => Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
    state?: {
        api: {
            comment: CommentsApi;
        } & Record<"comment", Partial<CommentsApi>>;
        comment: TComment;
        getOptions: () => {
            activeCommentId: string | null;
            addingCommentId: string | null;
            comments: Record<string, TComment>;
            focusTextarea: boolean;
            myUserId: string | null;
            newValue: _udecode_slate.Value;
            users: Record<string, CommentUser>;
            onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
            onCommentDelete: ((id: string) => void) | null;
            onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
        } & CommentsSelectors & Partial<CommentsSelectors>;
        isReplyComment: boolean;
        newText: string | undefined;
        submitButtonText: string;
    } | undefined;
    style?: React.CSSProperties;
} & Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & react.RefAttributes<any>>;

declare const useCommentNewTextareaState: () => {
    placeholder: string;
    setOption: <K extends "comments" | "activeCommentId" | "addingCommentId" | "focusTextarea" | "myUserId" | "onCommentAdd" | "onCommentDelete" | "onCommentUpdate" | keyof CommentsSelectors | "users" | "newValue">(optionKey: K, value: ({
        activeCommentId: string | null;
        addingCommentId: string | null;
        comments: Record<string, TComment>;
        focusTextarea: boolean;
        myUserId: string | null;
        newValue: _udecode_slate.Value;
        users: Record<string, CommentUser>;
        onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
        onCommentDelete: ((id: string) => void) | null;
        onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
    } & CommentsSelectors & Partial<CommentsSelectors>)[K]) => void;
    textareaRef: react__default.MutableRefObject<HTMLTextAreaElement | null>;
    value: string | undefined;
};
declare const useCommentNewTextarea: ({ placeholder, setOption, textareaRef, value, }: ReturnType<typeof useCommentNewTextareaState>) => {
    props: {
        placeholder: string;
        ref: react__default.MutableRefObject<HTMLTextAreaElement | null>;
        rows: number;
        value: string | undefined;
        onChange: (event: react__default.ChangeEvent<HTMLTextAreaElement>) => void;
    };
};
declare const CommentNewTextarea: react__default.ForwardRefExoticComponent<{
    as?: react__default.ElementType;
    asChild?: boolean;
    className?: string;
    options?: undefined;
    setProps?: ((hookProps: {
        placeholder: string;
        ref: react__default.MutableRefObject<HTMLTextAreaElement | null>;
        rows: number;
        value: string | undefined;
        onChange: (event: react__default.ChangeEvent<HTMLTextAreaElement>) => void;
    }) => Omit<react__default.DetailedHTMLProps<react__default.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref">) | undefined;
    state?: {
        placeholder: string;
        setOption: <K extends "comments" | "activeCommentId" | "addingCommentId" | "focusTextarea" | "myUserId" | "onCommentAdd" | "onCommentDelete" | "onCommentUpdate" | keyof CommentsSelectors | "users" | "newValue">(optionKey: K, value: ({
            activeCommentId: string | null;
            addingCommentId: string | null;
            comments: Record<string, TComment>;
            focusTextarea: boolean;
            myUserId: string | null;
            newValue: _udecode_slate.Value;
            users: Record<string, CommentUser>;
            onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
            onCommentDelete: ((id: string) => void) | null;
            onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
        } & CommentsSelectors & Partial<CommentsSelectors>)[K]) => void;
        textareaRef: react__default.MutableRefObject<HTMLTextAreaElement | null>;
        value: string | undefined;
    } | undefined;
    style?: react__default.CSSProperties;
} & Omit<react__default.DetailedHTMLProps<react__default.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & react__default.RefAttributes<any>>;

declare const useCommentResolveButton: () => {
    props: {
        onClick: () => void;
    };
};
declare const CommentResolveButton: react.ForwardRefExoticComponent<{
    as?: React.ElementType;
    asChild?: boolean;
    className?: string;
    options?: any;
    setProps?: ((hookProps: {
        onClick: () => void;
    }) => Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
    state?: undefined;
    style?: React.CSSProperties;
} & Omit<react.DetailedHTMLProps<react.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & react.RefAttributes<any>>;

declare const useCommentUserName: () => {
    props: {
        children: string;
    };
};
declare const CommentUserName: react.ForwardRefExoticComponent<{
    as?: React.ElementType;
    asChild?: boolean;
    className?: string;
    options?: any;
    setProps?: ((hookProps: {
        children: string;
    }) => Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">) | undefined;
    state?: undefined;
    style?: React.CSSProperties;
} & Omit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & react.RefAttributes<any>>;

declare const useCommentsPositionerState: () => {
    activeCommentId: string | null;
    position: {
        left: number;
        top: number;
    };
};
declare const useCommentsPositioner: ({ activeCommentId, position, }: ReturnType<typeof useCommentsPositionerState>) => {
    hidden: boolean;
    props: {
        style: {
            left: number;
            top: number;
        };
    };
};
declare const CommentsPositioner: react__default.ForwardRefExoticComponent<{
    as?: react__default.ElementType;
    asChild?: boolean;
    className?: string;
    options?: undefined;
    setProps?: ((hookProps: {
        style: {
            left: number;
            top: number;
        };
    }) => Omit<react__default.DetailedHTMLProps<react__default.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">) | undefined;
    state?: {
        activeCommentId: string | null;
        position: {
            left: number;
            top: number;
        };
    } | undefined;
    style?: react__default.CSSProperties;
} & Omit<react__default.DetailedHTMLProps<react__default.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & react__default.RefAttributes<any>>;

declare const useCommentAddButton: () => {
    hidden: boolean;
    props: {
        onClick: react__default.MouseEventHandler<HTMLSpanElement>;
    };
};

declare const useCommentItemContentState: () => {
    comment: TComment;
    commentText: string | null;
    editingValue: _udecode_slate.Value | null;
    isMyComment: boolean;
    isReplyComment: boolean;
    myUserId: string | null;
    user: CommentUser | null;
};

declare const useCommentLeafState: ({ leaf }: {
    leaf: TCommentText;
}) => {
    commentCount: number;
    isActive: boolean;
    lastCommentId: string;
    setOption: <K extends "comments" | "activeCommentId" | "addingCommentId" | "focusTextarea" | "myUserId" | "onCommentAdd" | "onCommentDelete" | "onCommentUpdate" | keyof CommentsSelectors | "users" | "newValue">(optionKey: K, value: ({
        activeCommentId: string | null;
        addingCommentId: string | null;
        comments: Record<string, TComment>;
        focusTextarea: boolean;
        myUserId: string | null;
        newValue: _udecode_slate.Value;
        users: Record<string, CommentUser>;
        onCommentAdd: ((value: _udecode_utils.WithPartial<TComment, "userId">) => void) | null;
        onCommentDelete: ((id: string) => void) | null;
        onCommentUpdate: ((value: Partial<Omit<TComment, "id">> & Pick<TComment, "id">) => void) | null;
    } & CommentsSelectors & Partial<CommentsSelectors>)[K]) => void;
};
declare const useCommentLeaf: ({ lastCommentId, setOption, }: ReturnType<typeof useCommentLeafState>) => {
    props: {
        onClick: (e: MouseEvent) => void;
    };
};

declare const useCommentsShowResolvedButton: () => {
    props: {
        pressed: boolean;
        onClick: (e: react__default.MouseEvent<HTMLButtonElement>) => void;
        onMouseDown: (e: react__default.MouseEvent<HTMLButtonElement>) => void;
    };
};

declare const useFloatingCommentsContentState: () => {
    activeCommentId: string | null;
    hasNoComment: boolean;
    myUserId: string | null;
    ref: react__default.MutableRefObject<null>;
};

declare const useFloatingCommentsState: () => {
    activeCommentId: string | null;
    loaded: boolean;
};

declare const getCommentPosition: (editor: SlateEditor, node: TCommentText) => {
    left: number;
    top: number;
} | undefined;

declare const SCOPE_ACTIVE_COMMENT = "activeComment";
interface CommentStoreState {
    id: string;
    editingValue: Value | null;
    isMenuOpen: boolean;
}
declare const CommentProvider: react.FC<jotai_x.ProviderProps<{
    id: string;
    editingValue: Value | null;
    isMenuOpen: boolean;
}>>;
declare const commentStore: jotai_x.StoreApi<CommentStoreState, object, "comment">;
declare const useCommentStore: jotai_x.UseStoreApi<CommentStoreState, object>;
declare const useCommentStates: () => {
    id: (options?: string | jotai_x.UseAtomOptions) => [string, (args_0: string) => void];
    editingValue: (options?: string | jotai_x.UseAtomOptions) => [Value | null, (args_0: Value | null) => void];
    isMenuOpen: (options?: string | jotai_x.UseAtomOptions) => [boolean, (args_0: boolean) => void];
} & {
    atom: <V, A extends unknown[], R>(atom: jotai.WritableAtom<V, A, R>, options?: string | jotai_x.UseAtomOptions) => [V, (...args: A) => R];
};
declare const useCommentSelectors: () => {
    id: (options?: string | jotai_x.UseAtomOptions) => string;
    editingValue: (options?: string | jotai_x.UseAtomOptions) => Value | null;
    isMenuOpen: (options?: string | jotai_x.UseAtomOptions) => boolean;
} & {
    atom: <V>(atom: jotai.Atom<V>, options?: string | jotai_x.UseAtomOptions) => V;
};
declare const useCommentActions: () => {
    id: (options?: string | jotai_x.UseAtomOptions) => (args_0: string) => void;
    editingValue: (options?: string | jotai_x.UseAtomOptions) => (args_0: Value | null) => void;
    isMenuOpen: (options?: string | jotai_x.UseAtomOptions) => (args_0: boolean) => void;
} & {
    atom: <V, A extends unknown[], R>(atom: jotai.WritableAtom<V, A, R>, options?: string | jotai_x.UseAtomOptions) => (...args: A) => R;
};
declare const useCommentUser: (scope?: string) => CommentUser | null;
declare const useCommentReplies: (scope?: string) => Record<string, TComment>;
declare const useComment: (scope?: string) => TComment | null | undefined;
declare const useCommentText: (scope?: string) => string | null;
declare const useEditingCommentText: () => string | null;

declare const useActiveCommentNode: () => _udecode_slate.TNodeEntry<TCommentText> | null | undefined;

declare const useCommentsResolved: () => TComment[];

export { CommentDeleteButton, CommentEditActions, CommentEditButton, CommentEditCancelButton, CommentEditSaveButton, CommentEditTextarea, CommentNewSubmitButton, CommentNewTextarea, CommentProvider, CommentResolveButton, type CommentStoreState, CommentUserName, type CommentsConfig, CommentsPlugin, CommentsPositioner, SCOPE_ACTIVE_COMMENT, commentStore, getCommentPosition, insertComment, useActiveCommentNode, useComment, useCommentActions, useCommentAddButton, useCommentDeleteButton, useCommentDeleteButtonState, useCommentEditButton, useCommentEditButtonState, useCommentEditCancelButton, useCommentEditSaveButton, useCommentEditSaveButtonState, useCommentEditTextarea, useCommentEditTextareaState, useCommentItemContentState, useCommentLeaf, useCommentLeafState, useCommentNewSubmitButton, useCommentNewSubmitButtonState, useCommentNewTextarea, useCommentNewTextareaState, useCommentReplies, useCommentResolveButton, useCommentSelectors, useCommentStates, useCommentStore, useCommentText, useCommentUser, useCommentUserName, useCommentsPositioner, useCommentsPositionerState, useCommentsResolved, useCommentsShowResolvedButton, useEditingCommentText, useFloatingCommentsContentState, useFloatingCommentsState, useHooksComments };
