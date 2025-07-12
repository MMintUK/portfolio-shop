import * as _udecode_plate_core_react from '@udecode/plate-core/react';
import * as _udecode_plate_core from '@udecode/plate-core';
import { d as SuggestionUser, e as TSuggestion, b as SuggestionSelectors, c as SuggestionPluginApi, S as SuggestionConfig } from '../BaseSuggestionPlugin-508h_1ux.js';
import { UseHooks } from '@udecode/plate-common/react';
import '@udecode/plate-common';

/** Enables support for suggestions in the editor. */
declare const SuggestionPlugin: _udecode_plate_core_react.PlatePlugin<_udecode_plate_core.PluginConfig<"suggestion", {
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

declare const useHooksSuggestion: UseHooks<SuggestionConfig>;

export { SuggestionPlugin, useHooksSuggestion };
