import { S as SlateEditor, A as AnyEditorPlugin, a as AnySlatePlugin, P as ParserOptions, b as SlatePlugin, c as PluginConfig, d as AnyPluginConfig, e as SlatePluginMethods, W as WithRequiredKey, f as SlatePluginContext, I as InferConfig, g as SlatePlugins, E as ExtendEditor, T as ToggleBlockOptions, N as Nullable, H as HtmlDeserializer, L as LengthConfig } from './withSlate-BhSA5OEZ.mjs';
export { p as BaseDeserializer, B as BaseEditor, q as BaseHtmlDeserializer, r as BaseInjectProps, m as BasePlugin, z as BasePluginContext, n as BasePluginNode, o as BaseSerializer, s as BaseTransformOptions, j as BaseWithSlateOptions, V as CorePlugin, C as CreateSlateEditorOptions, Z as DebugConfig, _ as DebugErrorType, a1 as DebugPlugin, R as Decorate, M as Deserializer, G as EditorPlugin, t as ExtendConfig, X as GetCorePluginsOptions, a2 as GetInjectNodePropsOptions, a3 as GetInjectNodePropsReturnType, D as HandlerReturnType, Q as HtmlSerializer, x as InferApi, v as InferOptions, i as InferPlugins, y as InferTransforms, U as InjectNodeProps, a0 as LogLevel, J as Parser, $ as PlateError, O as Serializer, F as SlatePluginConfig, h as TSlateEditor, K as TransformOptions, u as WithAnyKey, k as WithSlateOptions, l as createSlateEditor, Y as getCorePlugins, a4 as pluginInjectNodeProps, w as withSlate } from './withSlate-BhSA5OEZ.mjs';
export { nanoid } from 'nanoid';
export { StateActions as ZustandStateActions, StoreApi as ZustandStoreApi, createZustandStore } from 'zustand-x';
import { Modify, OmitFirst, AnyObject } from '@udecode/utils';
import * as _udecode_slate_utils from '@udecode/slate-utils';
import { ReplaceNodeChildrenOptions, toggleMark } from '@udecode/slate-utils';
import * as _udecode_slate from '@udecode/slate';
import { TNode, NodeOf, QueryNodeOptions, TDescendant, ElementOf, GetNodeEntriesOptions, TElement, Value } from '@udecode/slate';
import { Path } from 'slate';
import { KeyboardEventLike } from 'is-hotkey';
export { isHotkey } from 'is-hotkey';

type NoInfer<T> = [T][T extends any ? 0 : never];

type MaybeReturnType<T> = T extends (...args: any) => any ? ReturnType<T> : T;

interface ApplyDeepToNodesOptions<N extends TNode> {
    apply: (node: NodeOf<N>, source: (() => Record<string, any>) | Record<string, any>) => void;
    node: N;
    source: (() => Record<string, any>) | Record<string, any>;
    path?: Path;
    query?: QueryNodeOptions;
}
/** Recursively apply an operation to children nodes with a query. */
declare const applyDeepToNodes: <N extends TNode>({ apply, node, path, query, source, }: ApplyDeepToNodesOptions<N>) => void;

/**
 * Get all plugins having a defined `inject.plugins[plugin.key]`. It includes
 * `plugin` itself.
 */
declare const getInjectedPlugins: (editor: SlateEditor, plugin: AnyEditorPlugin) => Partial<AnyEditorPlugin>[];

/** Get plugin keys by types */
declare const getKeysByTypes: (editor: SlateEditor, types: string[]) => string[];
/** Get plugin key by type */
declare const getKeyByType: (editor: SlateEditor, type: string) => string;

/** Create a platform-aware hotkey checker. */
declare const createHotkey: (key: string) => (event: KeyboardEventLike) => boolean;
declare const Hotkeys: {
    isBold: (event: KeyboardEventLike) => boolean;
    isCompose: (event: KeyboardEventLike) => boolean;
    isDeleteBackward: (event: KeyboardEventLike) => boolean;
    isDeleteForward: (event: KeyboardEventLike) => boolean;
    isDeleteLineBackward: (event: KeyboardEventLike) => boolean;
    isDeleteLineForward: (event: KeyboardEventLike) => boolean;
    isDeleteWordBackward: (event: KeyboardEventLike) => boolean;
    isDeleteWordForward: (event: KeyboardEventLike) => boolean;
    isExtendBackward: (event: KeyboardEventLike) => boolean;
    isExtendForward: (event: KeyboardEventLike) => boolean;
    isExtendLineBackward: (event: KeyboardEventLike) => boolean;
    isExtendLineForward: (event: KeyboardEventLike) => boolean;
    isItalic: (event: KeyboardEventLike) => boolean;
    isMoveBackward: (event: KeyboardEventLike) => boolean;
    isMoveForward: (event: KeyboardEventLike) => boolean;
    isMoveLineBackward: (event: KeyboardEventLike) => boolean;
    isMoveLineForward: (event: KeyboardEventLike) => boolean;
    isMoveWordBackward: (event: KeyboardEventLike) => boolean;
    isMoveWordForward: (event: KeyboardEventLike) => boolean;
    isRedo: (event: KeyboardEventLike) => boolean;
    isSoftBreak: (event: KeyboardEventLike) => boolean;
    isSplitBlock: (event: KeyboardEventLike) => boolean;
    isTransposeCharacter: (event: KeyboardEventLike) => boolean;
    isUndo: (event: KeyboardEventLike) => boolean;
};

/** Recursively merge a source object to children nodes with a query. */
declare const mergeDeepToNodes: <N extends TNode>(options: Omit<ApplyDeepToNodesOptions<N>, "apply">) => void;

/** Normalize the descendants to a valid document fragment. */
declare const normalizeDescendantsToDocumentFragment: (editor: SlateEditor, { descendants }: {
    descendants: TDescendant[];
}) => TDescendant[];

/**
 * Recursive deep merge of each plugin from `override.plugins` into plugin with
 * same key (plugin > plugin.plugins).
 */
declare const overridePluginsByKey: (plugin: AnySlatePlugin, overrideByKey?: Record<string, Partial<AnySlatePlugin>>, nested?: boolean) => AnySlatePlugin;

/** Inject plugin props, editor. */
declare const pipeInjectNodeProps: (editor: SlateEditor, nodeProps: any) => any;

/** Is the plugin disabled by another plugin. */
declare const pipeInsertDataQuery: (editor: SlateEditor, plugins: Partial<AnyEditorPlugin>[], { data, dataTransfer }: ParserOptions) => boolean;

/** Pipe preInsert then insertFragment. */
declare const pipeInsertFragment: (editor: SlateEditor, injectedPlugins: Partial<AnyEditorPlugin>[], { fragment, ...options }: ParserOptions & {
    fragment: TDescendant[];
}) => void;

/** Normalize initial value from editor plugins. Set into plate store if diff. */
declare const pipeNormalizeInitialValue: (editor: SlateEditor) => void;

/** Pipe editor.insertData.transformData */
declare const pipeTransformData: (editor: SlateEditor, plugins: Partial<AnyEditorPlugin>[], { data, dataTransfer }: ParserOptions) => string;

/** Pipe editor.insertData.transformFragment */
declare const pipeTransformFragment: (editor: SlateEditor, plugins: Partial<AnyEditorPlugin>[], { fragment, ...options }: ParserOptions & {
    fragment: TDescendant[];
}) => TDescendant[];

type SlatePluginConfig<K extends string = any, O = {}, A = {}, T = {}> = Omit<Partial<Modify<SlatePlugin<PluginConfig<K, O, A, T>>, {
    node?: Partial<SlatePlugin<PluginConfig<K, O, A, T>>['node']>;
}>>, keyof SlatePluginMethods | 'optionsStore'>;
type TSlatePluginConfig<C extends AnyPluginConfig = PluginConfig> = Omit<Partial<Modify<SlatePlugin<C>, {
    node?: Partial<SlatePlugin<C>['node']>;
}>>, keyof SlatePluginMethods | 'optionsStore'>;
/**
 * Creates a new Plate plugin with the given configuration.
 *
 * @remarks
 *   - The plugin's key is required and specified by the K generic.
 *   - The `__extensions` array stores functions to be applied when `resolvePlugin`
 *       is called with an editor.
 *   - The `extend` method adds new extensions to be applied later.
 *   - The `extendPlugin` method extends an existing plugin (including nested
 *       plugins) or adds a new one if not found.
 *
 * @example
 *   const myPlugin = createSlatePlugin<
 *     'myPlugin',
 *     MyOptions,
 *     MyApi,
 *     MyTransforms
 *   >({
 *     key: 'myPlugin',
 *     options: { someOption: true },
 *     transforms: { someTransform: () => {} },
 *   });
 *
 *   const extendedPlugin = myPlugin.extend({
 *     options: { anotherOption: false },
 *   });
 *
 *   const pluginWithNestedExtension = extendedPlugin.extendPlugin(
 *     nestedPlugin,
 *     {
 *       options: { nestedOption: true },
 *     }
 *   );
 *
 * @template K - The literal type of the plugin key.
 * @template O - The type of the plugin options.
 * @template A - The type of the plugin utilities.
 * @template T - The type of the plugin transforms.
 * @template S - The type of the plugin storage.
 * @param {Partial<SlatePlugin<K, O, A, T>>} config - The configuration object
 *   for the plugin.
 * @returns {SlatePlugin<K, O, A, T>} A new Plate plugin instance with the
 *   following properties and methods:
 *
 *   - All properties from the input config, merged with default values.
 *   - `configure`: A method to create a new plugin instance with updated options.
 *   - `extend`: A method to create a new plugin instance with additional
 *       configuration.
 *   - `extendPlugin`: A method to extend an existing plugin (including nested
 *       plugins) or add a new one if not found.
 */
declare function createSlatePlugin<K extends string = any, O = {}, A = {}, T = {}>(config?: ((editor: SlateEditor) => SlatePluginConfig<K, O, A, T>) | SlatePluginConfig<K, O, A, T>): SlatePlugin<PluginConfig<K, O, A, T>>;
/**
 * Explicitly typed version of `createSlatePlugin`.
 *
 * @remarks
 *   While `createSlatePlugin` uses type inference, this function requires an
 *   explicit type parameter. Use this when you need precise control over the
 *   plugin's type structure or when type inference doesn't provide the desired
 *   result.
 */
declare function createTSlatePlugin<C extends AnyPluginConfig = PluginConfig>(config?: ((editor: SlateEditor) => TSlatePluginConfig<C>) | TSlatePluginConfig<C>): SlatePlugin<C>;

declare const resolvePluginTest: <P extends AnyPluginConfig>(p: P) => any;
declare const resolveCreatePluginTest: typeof createSlatePlugin;

/**
 * Resolves and finalizes a plugin configuration for use in a Plate editor.
 *
 * This function processes a given plugin configuration, applying any extensions
 * and resolving nested plugins. It prepares the plugin for integration into the
 * Plate editor system by:
 *
 * 1. Cloning the plugin to avoid mutating the original
 * 2. Applying all stored extensions to the plugin
 * 3. Clearing the extensions array after application
 *
 * @example
 *   const plugin = createSlatePlugin({ key: 'myPlugin', ...otherOptions }).extend(...);
 *   const resolvedPlugin = resolvePlugin(editor, plugin);
 */
declare const resolvePlugin: <P extends AnySlatePlugin>(editor: SlateEditor, _plugin: P) => P;
declare const validatePlugin: <K extends string = any, O = {}, A = {}, T = {}>(editor: SlateEditor, plugin: SlatePlugin<PluginConfig<K, O, A, T>>) => void;

declare function getEditorPlugin<P extends AnyPluginConfig | SlatePlugin<AnyPluginConfig>>(editor: SlateEditor, p: WithRequiredKey<P>): SlatePluginContext<InferConfig<P> extends never ? P : InferConfig<P>>;

/** Get editor plugin by key or plugin object. */
declare function getSlatePlugin<C extends AnyPluginConfig = PluginConfig>(editor: SlateEditor, p: WithRequiredKey<C>): C extends {
    node: any;
} ? C : SlatePlugin<C>;
/** Get editor plugin type by key or plugin object. */
declare function getPluginType(editor: SlateEditor, plugin: WithRequiredKey): string;
/** Get editor plugin types by key. */
declare const getPluginTypes: (editor: SlateEditor, plugins: WithRequiredKey[]) => string[];

/**
 * Initialize and configure the editor's plugin system. This function sets up
 * the editor's plugins, resolving core and custom plugins, and applying any
 * overrides specified in the plugins.
 */
declare const resolvePlugins: (editor: SlateEditor, plugins?: SlatePlugins) => SlateEditor;
declare const resolveAndSortPlugins: (editor: SlateEditor, plugins: SlatePlugins) => SlatePlugins;
declare const applyPluginsToEditor: (editor: SlateEditor, plugins: SlatePlugins) => void;
declare const resolvePluginOverrides: (editor: SlateEditor) => void;

/**
 * Optionally calls `value` as a function. Otherwise it is returned directly.
 *
 * @param value Function or any value.
 * @param context Optional context to bind to function.
 * @param props Optional props to pass to function.
 */
declare function callOrReturn<T>(value: T, ...props: any[]): MaybeReturnType<T>;

/** Get slate class name: slate-<type> */
declare const getSlateClass: (type: string) => string;

declare function isFunction(value: any): value is Function;

declare function mergeDeep(target: Record<string, any>, source: Record<string, any>): Record<string, any>;

/**
 * Enables support for deserializing inserted content from Slate Ast format to
 * Slate format while apply a small bug fix.
 */
declare const AstPlugin: SlatePlugin<PluginConfig<"ast", {}, {}, {}>>;

/**
 * Placeholder plugin for DOM interaction, that could be replaced with
 * ReactPlugin.
 */
declare const DOMPlugin: SlatePlugin<PluginConfig<"dom", {}, {}, {}>>;

declare const withPlateHistory: ExtendEditor;
/** @see {@link withHistory} */
declare const HistoryPlugin: SlatePlugin<PluginConfig<"history", {}, {}, {}>>;

/**
 * Merge and register all the inline types and void types from the plugins and
 * options, using `editor.isInline`, `editor.markableVoid` and `editor.isVoid`
 */
declare const withInlineVoid: ExtendEditor;
/** @see {@link withInlineVoid} */
declare const InlineVoidPlugin: SlatePlugin<PluginConfig<"inlineVoid", {}, {}, {}>>;

declare const withParser: ExtendEditor;
declare const ParserPlugin: SlatePlugin<PluginConfig<"parser", {}, {}, {}>>;

declare const resetEditor: (editor: SlateEditor) => void;

/** Replace editor children by default block. */
declare const resetEditorChildren: <E extends SlateEditor = SlateEditor>(editor: E, options?: Omit<ReplaceNodeChildrenOptions<ElementOf<E>, E>, "at" | "nodes">) => void;

/**
 * Toggle the type of the selected block. If the block is not of the specified
 * type, it will be changed to that type. Otherwise, it will be changed to the
 * default type.
 */
declare const toggleBlock: <E extends SlateEditor = SlateEditor>(editor: E, options: ToggleBlockOptions, editorNodesOptions?: Omit<GetNodeEntriesOptions<E>, "match">) => void;

type SlateNextConfig = PluginConfig<'slateNext', {}, {
    create: {
        block: (node?: Partial<TElement>, path?: Path) => TElement;
        value: () => Value;
    };
    reset: () => void;
}, {
    toggle: {
        block: OmitFirst<typeof toggleBlock>;
        mark: OmitFirst<typeof toggleMark>;
    };
}>;
declare const withSlateNext: ExtendEditor<SlateNextConfig>;
/** Opinionated extension of slate default behavior. */
declare const SlateNextPlugin: SlatePlugin<PluginConfig<"slateNext", {}, {
    create: {
        value: (() => Value) & (() => Value);
        block: ((node?: Partial<TElement>, _path?: Path) => TElement) & ((node?: Partial<TElement>, path?: Path) => TElement);
    };
    reset: () => void;
}, {
    reset: () => void;
    setValue: <V extends Value>(value?: V | string) => void;
    toggle: {
        block: ((options: ToggleBlockOptions, editorNodesOptions?: Omit<_udecode_slate.GetNodeEntriesOptions<SlateEditor>, "match"> | undefined) => void) & ((options: ToggleBlockOptions, editorNodesOptions?: Omit<_udecode_slate.GetNodeEntriesOptions<SlateEditor>, "match"> | undefined) => void);
        mark: ((args_0: _udecode_slate_utils.ToggleMarkOptions) => void) & ((args_0: _udecode_slate_utils.ToggleMarkOptions) => void);
    };
}>>;

/**
 * Enables support for deserializing inserted content from HTML format to Slate
 * format.
 */
declare const HtmlPlugin: SlatePlugin<PluginConfig<"html", {}, Record<"html", {
    deserialize: (args_0: {
        element: HTMLElement | string;
        collapseWhiteSpace?: boolean;
    }) => _udecode_slate.TDescendant[];
}>, {}>>;

declare const CARRIAGE_RETURN = "\r";
declare const LINE_FEED = "\n";
declare const NO_BREAK_SPACE = "\u00A0";
declare const SPACE = " ";
declare const TAB = "\t";
declare const ZERO_WIDTH_SPACE = "\u200B";

type DeserializeHtmlChildren = ChildNode | TDescendant | string | null;
/** De */
type DeserializeHtmlNodeReturnType = DeserializeHtmlChildren[] | TDescendant | TDescendant[] | string | null;

/** Replace BR elements with line feeds. */
declare const cleanHtmlBrElements: (rootNode: Node) => void;

/** Replace \r\n and \r with \n */
declare const cleanHtmlCrLf: (html: string) => string;

/** Remove empty elements from rootNode. Allowed empty elements: BR, IMG. */
declare const cleanHtmlEmptyElements: (rootNode: Node) => void;

/**
 * Replace FONT elements with SPAN elements if there is textContent (remove
 * otherwise).
 */
declare const cleanHtmlFontElements: (rootNode: Node) => void;

/** Remove fragment hrefs and spans without inner text. */
declare const cleanHtmlLinkElements: (rootNode: Node) => void;

declare const cleanHtmlTextNodes: (rootNode: Node) => void;

/**
 * Set HTML blocks mark styles to a new child span element if any. This allows
 * Plate to use block marks.
 */
declare const copyBlockMarksToSpanChild: (rootNode: Node) => void;

/** Deserialize HTML element to a valid document fragment. */
declare const deserializeHtml: (editor: SlateEditor, { collapseWhiteSpace: shouldCollapseWhiteSpace, element, }: {
    element: HTMLElement | string;
    collapseWhiteSpace?: boolean;
}) => TDescendant[];

/** Deserialize HTML element to fragment. */
declare const deserializeHtmlElement: (editor: SlateEditor, element: HTMLElement) => DeserializeHtmlNodeReturnType;

/** Deserialize HTML element or child node. */
declare const deserializeHtmlNode: (editor: SlateEditor) => (node: ChildNode | HTMLElement) => DeserializeHtmlNodeReturnType;

declare const deserializeHtmlNodeChildren: (editor: SlateEditor, node: ChildNode | HTMLElement) => DeserializeHtmlChildren[];

/**
 * Find the first HTML element that matches the given selector.
 *
 * @param rootNode
 * @param predicate
 */
declare const findHtmlElement: (rootNode: Node, predicate: (node: HTMLElement) => boolean) => null;
declare const someHtmlElement: (rootNode: Node, predicate: (node: HTMLElement) => boolean) => boolean;

declare const getHtmlComments: (node: Node) => string[];

/** Deserialize HTML body element to Fragment. */
declare const htmlBodyToFragment: (editor: SlateEditor, element: HTMLElement) => TDescendant[] | undefined;

/** Deserialize HTML to break line. */
declare const htmlBrToNewLine: (node: ChildNode | HTMLElement) => "\n" | undefined;

/** Deserialize HTML to Element. */
declare const htmlElementToElement: (editor: SlateEditor, element: HTMLElement) => TDescendant | undefined;

/**
 * Deserialize HTML to TDescendant[] with marks on Text. Build the leaf from the
 * leaf deserializers of each plugin.
 */
declare const htmlElementToLeaf: (editor: SlateEditor, element: HTMLElement) => TDescendant[];

/** Convert HTML string into HTML element. */
declare const htmlStringToDOMNode: (rawHtml: string) => HTMLBodyElement;

declare const htmlTextNodeToString: (node: ChildNode | HTMLElement) => string | undefined;

/**
 * # Methodology
 *
 * ## Step 1. Get the list of all standard tag names
 *
 * Go to https://developer.mozilla.org/en-US/docs/Web/HTML/Element and run the
 * following in the console to generate a JSON array of tag names:
 *
 * ```js
 * JSON.stringify(
 *   Array.from(document.querySelectorAll('article table td:first-child'))
 *     .map((td) => {
 *       const body = document.createElement('body');
 *       body.innerHTML = td.textContent;
 *       return body.firstChild?.tagName;
 *     })
 *     .filter((tagName) => tagName)
 * );
 * ```
 *
 * Output (as of 2023-11-06):
 *
 * ```json
 * '["BASE","LINK","META","STYLE","TITLE","ADDRESS","ARTICLE","ASIDE","FOOTER","HEADER","H1","HGROUP","MAIN","NAV","SECTION","SEARCH","BLOCKQUOTE","DD","DIV","DL","DT","FIGCAPTION","FIGURE","HR","LI","MENU","OL","P","PRE","UL","A","ABBR","B","BDI","BDO","BR","CITE","CODE","DATA","DFN","EM","I","KBD","MARK","Q","RP","RT","RUBY","S","SAMP","SMALL","SPAN","STRONG","SUB","SUP","TIME","U","VAR","WBR","AREA","AUDIO","IMG","MAP","TRACK","VIDEO","EMBED","IFRAME","OBJECT","PICTURE","PORTAL","SOURCE","svg","math","CANVAS","NOSCRIPT","SCRIPT","DEL","INS","TABLE","BUTTON","DATALIST","FIELDSET","FORM","INPUT","LABEL","LEGEND","METER","OPTGROUP","OPTION","OUTPUT","PROGRESS","SELECT","TEXTAREA","DETAILS","DIALOG","SUMMARY","SLOT","TEMPLATE","ACRONYM","BIG","CENTER","CONTENT","DIR","FONT","IMG","MARQUEE","MENUITEM","NOBR","NOEMBED","NOFRAMES","PARAM","PLAINTEXT","RB","RTC","SHADOW","STRIKE","TT","XMP"]'
 * ```
 *
 * ## Step 2. For each tag name, determine the default browser style
 *
 * Open an empty HTML file in the browser and run the following in the console:
 *
 * ```js
 * const tagNames = JSON.parse(<JSON string from step 1>);
 *
 * JSON.stringify(
 *   tagNames.filter((tagName) => {
 *     const element = document.createElement(tagName);
 *     document.body.appendChild(element);
 *     const display = window.getComputedStyle(element).display;
 *     element.remove();
 *     return display.startsWith('inline');
 *   })
 * );
 * ```
 *
 * Place the result in the array below (accurate as of 2023-11-06).
 */
declare const inlineTagNames: Set<string>;

declare const isHtmlBlockElement: (node: Node) => boolean;

declare const isHtmlComment: (node: Node) => node is Comment;

declare const isHtmlElement: (node: Node) => node is Element;

/** If href starts with '#'. */
declare const isHtmlFragmentHref: (href: string) => boolean;

declare const isHtmlInlineElement: (node: Node) => boolean;

declare const isHtmlTable: (element: Element) => boolean;

declare const isHtmlText: (node: Node) => node is Text;

declare const isOlSymbol: (symbol: string) => boolean;

declare const parseHtmlDocument: (html: string) => Document;

declare const parseHtmlElement: (html: string) => HTMLElement;

declare const pipeDeserializeHtmlElement: (editor: SlateEditor, element: HTMLElement) => (Nullable<HtmlDeserializer> & {
    node: AnyObject;
}) | undefined;

declare const pipeDeserializeHtmlLeaf: (editor: SlateEditor, element: HTMLElement) => AnyObject;

/** Get a deserializer by type, node names, class names and styles. */
declare const pluginDeserializeHtml: (editor: SlateEditor, plugin: AnyEditorPlugin, { deserializeLeaf, element: el, }: {
    element: HTMLElement;
    deserializeLeaf?: boolean;
}) => (Nullable<HtmlDeserializer> & {
    node: AnyObject;
}) | undefined;

/** Trim the html and remove zero width spaces, then wrap it with a body element. */
declare const postCleanHtml: (html: string) => string;

/** Remove HTML surroundings and clean HTML from CR/LF */
declare const preCleanHtml: (html: string) => string;

/** Removes HTML nodes between HTML comments. */
declare const removeHtmlNodesBetweenComments: (rootNode: Node, start: string, end: string) => void;

/** Remove string before <html and after </html> */
declare const removeHtmlSurroundings: (html: string) => string;

/**
 * Replace `element` tag name by `tagName`. Attributes, innerHTML and parent
 * relationship is kept.
 */
declare const replaceTagName: (element: Element, tagName: string) => Element;

type Callback$3 = (node: Comment) => boolean;
/** Traverse HTML comments. */
declare const traverseHtmlComments: (rootNode: Node, callback: Callback$3) => void;

type Callback$2 = (node: Element) => boolean;
/**
 * Traverse the HTML elements of the given HTML node.
 *
 * @param rootNode The root HTML node to traverse.
 * @param callback The callback to call for each HTML element.
 */
declare const traverseHtmlElements: (rootNode: Node, callback: Callback$2) => void;

type Callback$1 = (node: Node) => boolean;
/**
 * Depth-first pre-order tree traverse the given HTML node and calls the given
 * callback for each node. see:
 * https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)
 *
 * @param callback Returns a boolean indicating whether traversal should be
 *   continued
 */
declare const traverseHtmlNode: (node: Node, callback: Callback$1) => void;

type Callback = (node: Text) => boolean;
declare const traverseHtmlTexts: (rootNode: Node, callback: Callback) => void;

/** Unwrap the given HTML element. */
declare const unwrapHtmlElement: (element: Element) => void;

type WhiteSpaceRule = 'normal' | 'pre' | 'pre-line';
type TrimStartRule = 'all' | 'collapse';
type TrimEndRule = 'collapse' | 'single-newline';
type CollapseWhiteSpaceState = {
    inlineFormattingContext: {
        atStart: boolean;
        lastHasTrailingWhiteSpace: boolean;
    } | null;
    whiteSpaceRule: WhiteSpaceRule;
};

declare const collapseString: (text: string, { shouldCollapseWhiteSpace, trimEnd, trimStart, whiteSpaceIncludesNewlines, }?: {
    shouldCollapseWhiteSpace?: boolean;
    trimEnd?: TrimEndRule;
    trimStart?: TrimStartRule;
    whiteSpaceIncludesNewlines?: boolean;
}) => string;

declare const collapseWhiteSpace: (element: HTMLElement) => HTMLElement;

declare const collapseWhiteSpaceChildren: (node: Node, state: CollapseWhiteSpaceState) => void;

/**
 * Note: We do not want to start an inline formatting context until we encounter
 * a text node.
 */
declare const collapseWhiteSpaceElement: (element: HTMLElement, state: CollapseWhiteSpaceState) => void;

declare const collapseWhiteSpaceNode: (node: Node, state: CollapseWhiteSpaceState) => void;

declare const collapseWhiteSpaceText: (text: Text, state: CollapseWhiteSpaceState) => void;

declare const inferWhiteSpaceRule: (element: HTMLElement) => WhiteSpaceRule | null;

declare const isLastNonEmptyTextOfInlineFormattingContext: (initialText: Text) => boolean;

declare const upsertInlineFormattingContext: (state: CollapseWhiteSpaceState) => void;
declare const endInlineFormattingContext: (state: CollapseWhiteSpaceState) => void;

declare const withLength: ExtendEditor<LengthConfig>;
declare const LengthPlugin: SlatePlugin<LengthConfig>;

type ParagraphConfig = PluginConfig<'p'>;
declare const BaseParagraphPlugin: SlatePlugin<PluginConfig<"p", {}, {}, {}>>;

export { AnyEditorPlugin, AnyPluginConfig, AnySlatePlugin, type ApplyDeepToNodesOptions, AstPlugin, BaseParagraphPlugin, CARRIAGE_RETURN, type CollapseWhiteSpaceState, DOMPlugin, type DeserializeHtmlChildren, type DeserializeHtmlNodeReturnType, ExtendEditor, HistoryPlugin, Hotkeys, HtmlDeserializer, HtmlPlugin, InferConfig, InlineVoidPlugin, LINE_FEED, LengthConfig, LengthPlugin, type MaybeReturnType, NO_BREAK_SPACE, type NoInfer, Nullable, type ParagraphConfig, ParserOptions, ParserPlugin, PluginConfig, SPACE, SlateEditor, type SlateNextConfig, SlateNextPlugin, SlatePlugin, SlatePluginContext, SlatePluginMethods, SlatePlugins, TAB, ToggleBlockOptions, type TrimEndRule, type TrimStartRule, type WhiteSpaceRule, WithRequiredKey, ZERO_WIDTH_SPACE, applyDeepToNodes, applyPluginsToEditor, callOrReturn, cleanHtmlBrElements, cleanHtmlCrLf, cleanHtmlEmptyElements, cleanHtmlFontElements, cleanHtmlLinkElements, cleanHtmlTextNodes, collapseString, collapseWhiteSpace, collapseWhiteSpaceChildren, collapseWhiteSpaceElement, collapseWhiteSpaceNode, collapseWhiteSpaceText, copyBlockMarksToSpanChild, createHotkey, createSlatePlugin, createTSlatePlugin, deserializeHtml, deserializeHtmlElement, deserializeHtmlNode, deserializeHtmlNodeChildren, endInlineFormattingContext, findHtmlElement, getEditorPlugin, getHtmlComments, getInjectedPlugins, getKeyByType, getKeysByTypes, getPluginType, getPluginTypes, getSlateClass, getSlatePlugin, htmlBodyToFragment, htmlBrToNewLine, htmlElementToElement, htmlElementToLeaf, htmlStringToDOMNode, htmlTextNodeToString, inferWhiteSpaceRule, inlineTagNames, isFunction, isHtmlBlockElement, isHtmlComment, isHtmlElement, isHtmlFragmentHref, isHtmlInlineElement, isHtmlTable, isHtmlText, isLastNonEmptyTextOfInlineFormattingContext, isOlSymbol, mergeDeep, mergeDeepToNodes, normalizeDescendantsToDocumentFragment, overridePluginsByKey, parseHtmlDocument, parseHtmlElement, pipeDeserializeHtmlElement, pipeDeserializeHtmlLeaf, pipeInjectNodeProps, pipeInsertDataQuery, pipeInsertFragment, pipeNormalizeInitialValue, pipeTransformData, pipeTransformFragment, pluginDeserializeHtml, postCleanHtml, preCleanHtml, removeHtmlNodesBetweenComments, removeHtmlSurroundings, replaceTagName, resetEditor, resetEditorChildren, resolveAndSortPlugins, resolveCreatePluginTest, resolvePlugin, resolvePluginOverrides, resolvePluginTest, resolvePlugins, someHtmlElement, toggleBlock, traverseHtmlComments, traverseHtmlElements, traverseHtmlNode, traverseHtmlTexts, unwrapHtmlElement, upsertInlineFormattingContext, validatePlugin, withInlineVoid, withLength, withParser, withPlateHistory, withSlateNext };
