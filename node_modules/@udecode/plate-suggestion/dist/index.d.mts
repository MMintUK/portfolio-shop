import { S as SuggestionConfig, T as TSuggestionText } from './BaseSuggestionPlugin-508h_1ux.mjs';
export { B as BaseSuggestionPlugin, a as SUGGESTION_KEYS, f as SuggestionEditorProps, c as SuggestionPluginApi, b as SuggestionSelectors, d as SuggestionUser, e as TSuggestion } from './BaseSuggestionPlugin-508h_1ux.mjs';
import { SlateEditor, TDescendant, ValueOf, ExtendEditor, FindNodeOptions, TNode, GetNodeEntriesOptions, SetNodesOptions } from '@udecode/plate-common';
import { ComputeDiffOptions } from '@udecode/plate-diff';
import { Location, Range } from 'slate';
import * as _udecode_slate from '@udecode/slate';
import '@udecode/plate-core';

declare function diffToSuggestions<E extends SlateEditor>(editor: E, doc0: TDescendant[], doc1: TDescendant[], { getDeleteProps, getInsertProps, getUpdateProps, isInline, ...options }?: Partial<ComputeDiffOptions>): ValueOf<E>;

declare const withSuggestion: ExtendEditor<SuggestionConfig>;

/**
 * Find the suggestion id at the cursor point, the point before and after (if
 * offset = 0).
 */
declare const findSuggestionId: (editor: SlateEditor, at: Location) => string | undefined;

declare const findSuggestionNode: <E extends SlateEditor>(editor: E, { match, ...options }?: FindNodeOptions<E>) => _udecode_slate.TNodeEntry<TSuggestionText> | undefined;

type TSuggestionCommonDescription = {
    suggestionId: string;
    userId: string;
};
type TSuggestionInsertionDescription = {
    insertedText: string;
    type: 'insertion';
} & TSuggestionCommonDescription;
type TSuggestionDeletionDescription = {
    deletedText: string;
    type: 'deletion';
} & TSuggestionCommonDescription;
type TSuggestionReplacementDescription = {
    deletedText: string;
    insertedText: string;
    type: 'replacement';
} & TSuggestionCommonDescription;
type TSuggestionDescription = TSuggestionDeletionDescription | TSuggestionInsertionDescription | TSuggestionReplacementDescription;
/**
 * Get the suggestion descriptions of the selected node. A node can have
 * multiple suggestions (multiple users). Each description maps to a user
 * suggestion.
 */
declare const getActiveSuggestionDescriptions: (editor: SlateEditor) => TSuggestionDescription[];

declare const getSuggestionId: (node: TNode) => string | undefined;

declare const getSuggestionKey: (id?: string) => string;
declare const isSuggestionKey: (key: string) => boolean;
declare const getSuggestionKeys: (node: TNode) => string[];
declare const getSuggestionUserIdByKey: (key?: string | null) => string | null;
declare const getSuggestionUserIds: (node: TNode) => string[];
declare const getSuggestionUserId: (node: TNode) => string;

declare const getSuggestionNodeEntries: <E extends SlateEditor>(editor: E, suggestionId: string, { at, match, ...options }?: {
    match?: (suggestion: TSuggestionText) => boolean;
} & GetNodeEntriesOptions<E>) => Generator<_udecode_slate.TNodeEntry<TSuggestionText>, void, undefined>;

declare const acceptSuggestion: (editor: SlateEditor, description: TSuggestionDescription) => void;

declare const addSuggestionMark: (editor: SlateEditor) => void;

declare const deleteFragmentSuggestion: (editor: SlateEditor, { reverse }?: {
    reverse?: boolean;
}) => void;

/**
 * Suggest deletion one character at a time until target point is reached.
 * Suggest additions are safely deleted.
 */
declare const deleteSuggestion: (editor: SlateEditor, at: Range, { reverse, }?: {
    reverse?: boolean;
}) => void;

declare const getSuggestionCurrentUserKey: (editor: SlateEditor) => string;
declare const getSuggestionProps: (editor: SlateEditor, id: string, { suggestionDeletion, suggestionUpdate, }?: {
    suggestionDeletion?: boolean;
    suggestionUpdate?: any;
}) => {
    [x: string]: string | boolean;
    suggestion: boolean;
    suggestionId: string;
};

declare const insertFragmentSuggestion: (editor: SlateEditor, fragment: TDescendant[], { insertFragment, }?: {
    insertFragment?: (fragment: TDescendant[]) => void;
}) => void;

declare const insertTextSuggestion: (editor: SlateEditor, text: string) => void;

declare const rejectSuggestion: (editor: SlateEditor, description: TSuggestionDescription) => void;

declare const setSuggestionNodes: (editor: SlateEditor, options?: {
    suggestionDeletion?: boolean;
    suggestionId?: string;
} & SetNodesOptions) => void;

export { SuggestionConfig, type TSuggestionCommonDescription, type TSuggestionDeletionDescription, type TSuggestionDescription, type TSuggestionInsertionDescription, type TSuggestionReplacementDescription, TSuggestionText, acceptSuggestion, addSuggestionMark, deleteFragmentSuggestion, deleteSuggestion, diffToSuggestions, findSuggestionId, findSuggestionNode, getActiveSuggestionDescriptions, getSuggestionCurrentUserKey, getSuggestionId, getSuggestionKey, getSuggestionKeys, getSuggestionNodeEntries, getSuggestionProps, getSuggestionUserId, getSuggestionUserIdByKey, getSuggestionUserIds, insertFragmentSuggestion, insertTextSuggestion, isSuggestionKey, rejectSuggestion, setSuggestionNodes, withSuggestion };
