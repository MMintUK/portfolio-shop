import * as _udecode_plate_core from '@udecode/plate-core';
import { UnknownObject, TText, PluginConfig, WithPartial } from '@udecode/plate-common';

interface SuggestionUser extends UnknownObject {
    id: string;
    name: string;
    avatarUrl?: string;
}
interface TSuggestion extends UnknownObject {
    id: string;
    /** @default Date.now() */
    createdAt: number;
    isAccepted?: boolean;
    isRejected?: boolean;
}
interface TSuggestionText extends TText {
    suggestion?: boolean;
    suggestionDeletion?: boolean;
    suggestionId?: string;
}
interface SuggestionEditorProps {
    activeSuggestionId?: string | null;
    isSuggesting?: boolean;
}

declare const SUGGESTION_KEYS: {
    readonly id: "suggestionId";
};
type SuggestionConfig = PluginConfig<'suggestion', {
    activeSuggestionId: string | null;
    currentUserId: string | null;
    isSuggesting: boolean;
    suggestions: Record<string, TSuggestion>;
    users: Record<string, SuggestionUser>;
    onSuggestionAdd: ((value: Partial<TSuggestion>) => void) | null;
    onSuggestionDelete: ((id: string) => void) | null;
    onSuggestionUpdate: ((value: Partial<Omit<TSuggestion, 'id'>> & Pick<TSuggestion, 'id'>) => void) | null;
} & SuggestionSelectors, {
    suggestion: SuggestionPluginApi;
}>;
type SuggestionSelectors = {
    currentSuggestionUser?: () => SuggestionUser | null;
    suggestionById?: (id: string | null) => TSuggestion | null;
    suggestionUserById?: (id: string | null) => SuggestionUser | null;
};
type SuggestionPluginApi = {
    addSuggestion: (value: WithPartial<TSuggestion, 'createdAt' | 'id' | 'userId'>) => void;
    removeSuggestion: (id: string | null) => void;
    updateSuggestion: (id: string | null, value: Partial<TSuggestion>) => void;
};
declare const BaseSuggestionPlugin: _udecode_plate_core.SlatePlugin<PluginConfig<"suggestion", {
    currentSuggestionUser: () => SuggestionUser | null;
    suggestionById: (id: string | null) => TSuggestion | null;
    suggestionUserById: (id: string | null) => SuggestionUser | null;
} & {
    activeSuggestionId: string | null;
    currentUserId: string | null;
    isSuggesting: boolean;
    suggestions: Record<string, TSuggestion>;
    users: Record<string, SuggestionUser>;
    onSuggestionAdd: ((value: Partial<TSuggestion>) => void) | null;
    onSuggestionDelete: ((id: string) => void) | null;
    onSuggestionUpdate: ((value: Partial<Omit<TSuggestion, "id">> & Pick<TSuggestion, "id">) => void) | null;
} & SuggestionSelectors, {
    suggestion: SuggestionPluginApi;
} & Record<"suggestion", Partial<SuggestionPluginApi>>, {}>>;

export { BaseSuggestionPlugin as B, type SuggestionConfig as S, type TSuggestionText as T, SUGGESTION_KEYS as a, type SuggestionSelectors as b, type SuggestionPluginApi as c, type SuggestionUser as d, type TSuggestion as e, type SuggestionEditorProps as f };
