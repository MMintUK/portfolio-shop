var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/react/components/DefaultLeaf.tsx
import React from "react";
function DefaultLeaf(_a) {
  var _b = _a, {
    attributes,
    children,
    editor,
    leaf,
    nodeProps,
    text
  } = _b, props = __objRest(_b, [
    "attributes",
    "children",
    "editor",
    "leaf",
    "nodeProps",
    "text"
  ]);
  return /* @__PURE__ */ React.createElement("span", __spreadValues(__spreadValues({}, attributes), props), children);
}

// src/react/components/EditorHotkeysEffect.tsx
import React11, { useEffect as useEffect2 } from "react";
import { useHotkeys } from "@udecode/react-hotkeys";
import { isDefined as isDefined4 } from "@udecode/utils";

// src/react/stores/plate/PlateStore.ts
var EXPOSED_STORE_KEYS = [
  "readOnly",
  "onChange",
  "decorate",
  "renderElement",
  "renderLeaf"
];

// src/react/stores/plate/createPlateStore.ts
import React3 from "react";
import { atom as atom3, createStore } from "jotai";

// src/react/libs/jotai.ts
import { atom } from "jotai";
import { createAtomStore } from "jotai-x";

// src/react/stores/plate-controller/plateControllerStore.ts
import React2 from "react";
import { atom as atom2 } from "jotai";
var {
  PlateControllerProvider: PlateController,
  plateControllerStore,
  usePlateControllerStore
} = createAtomStore(
  {
    activeId: atom2(null),
    editorStores: atom2({}),
    primaryEditorIds: atom2([])
  },
  {
    name: "plateController"
  }
);
var usePlateControllerSelectors = () => usePlateControllerStore().get;
var usePlateControllerActions = () => usePlateControllerStore().set;
var usePlateControllerStates = () => usePlateControllerStore().use;
var usePlateControllerExists = () => !!usePlateControllerStore().store({ warnIfNoStore: false });
var usePlateControllerEditorStore = (idProp) => {
  const storeAtom = React2.useMemo(
    () => atom2((get) => {
      const editorStores = get(plateControllerStore.atom.editorStores);
      const forId = (id) => {
        var _a;
        if (!id) return null;
        return (_a = editorStores[id]) != null ? _a : null;
      };
      if (idProp) return forId(idProp);
      const lookupOrder = [
        get(plateControllerStore.atom.activeId),
        ...get(plateControllerStore.atom.primaryEditorIds)
      ];
      for (const id of lookupOrder) {
        const store = forId(id);
        if (store) return store;
      }
      return null;
    }),
    [idProp]
  );
  return usePlateControllerSelectors().atom(storeAtom);
};

// src/react/stores/plate/createPlateStore.ts
var PLATE_SCOPE = "plate";
var GLOBAL_PLATE_SCOPE = Symbol("global-plate");
var createPlateStore = (_a = {}) => {
  var _b = _a, {
    id,
    decorate = null,
    editor,
    isMounted = false,
    primary = true,
    readOnly = null,
    renderElement = null,
    renderLeaf = null,
    versionDecorate = 1,
    versionEditor = 1,
    versionSelection = 1,
    versionValue = 1,
    onChange = null,
    onSelectionChange = null,
    onValueChange = null
  } = _b, state = __objRest(_b, [
    "id",
    "decorate",
    "editor",
    "isMounted",
    "primary",
    "readOnly",
    "renderElement",
    "renderLeaf",
    "versionDecorate",
    "versionEditor",
    "versionSelection",
    "versionValue",
    "onChange",
    "onSelectionChange",
    "onValueChange"
  ]);
  return createAtomStore(
    __spreadValues({
      decorate,
      editor,
      isMounted,
      primary,
      readOnly,
      renderElement,
      renderLeaf,
      versionDecorate,
      versionEditor,
      versionSelection,
      versionValue,
      onChange,
      onSelectionChange,
      onValueChange
    }, state),
    {
      extend: (atoms) => ({
        trackedEditor: atom3((get) => ({
          editor: get(atoms.editor),
          version: get(atoms.versionEditor)
        })),
        trackedSelection: atom3((get) => ({
          selection: get(atoms.editor).selection,
          version: get(atoms.versionSelection)
        })),
        trackedValue: atom3((get) => ({
          value: get(atoms.editor).children,
          version: get(atoms.versionValue)
        }))
      }),
      name: "plate"
    }
  );
};
var {
  PlateProvider: PlateStoreProvider,
  plateStore,
  usePlateStore
} = createPlateStore();
var usePlateEditorStore = (id, { debugHookName = "usePlateEditorStore" } = {}) => {
  var _a;
  const localStore = (_a = usePlateStore(id).store({ warnIfNoStore: false })) != null ? _a : null;
  const [localStoreExists] = React3.useState(!!localStore);
  const store = localStoreExists ? localStore : (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePlateControllerEditorStore(id)
  );
  const plateControllerExists = usePlateControllerExists();
  const fallbackStore = React3.useMemo(() => createStore(), []);
  if (!store) {
    if (plateControllerExists) {
      return fallbackStore;
    }
    throw new Error(
      `${debugHookName} must be used inside a Plate or PlateController`
    );
  }
  return store;
};
var usePlateSelectors = (id, options) => {
  const store = usePlateEditorStore(id, __spreadValues({
    debugHookName: "usePlateSelectors"
  }, options));
  return usePlateStore({ store }).get;
};
var usePlateActions = (id, options) => {
  const store = usePlateEditorStore(id, __spreadValues({
    debugHookName: "usePlateActions"
  }, options));
  return usePlateStore({ store }).set;
};
var usePlateStates = (id, options) => {
  const store = usePlateEditorStore(id, __spreadValues({
    debugHookName: "usePlateStates"
  }, options));
  return usePlateStore({ store }).use;
};

// src/react/stores/plate/actions/useIncrementVersion.ts
import React4 from "react";
var useIncrementVersion = (key, id, options = {}) => {
  const previousVersionRef = React4.useRef(1);
  const set = usePlateActions(id, __spreadValues({
    debugHookName: "useIncrementVersion"
  }, options))[key]();
  return React4.useCallback(() => {
    const nextVersion = previousVersionRef.current + 1;
    set(nextVersion);
    previousVersionRef.current = nextVersion;
  }, [set]);
};

// src/react/stores/plate/actions/useRedecorate.ts
import React5 from "react";
var useRedecorate = (id, options = {}) => {
  const updateDecorate = useIncrementVersion("versionDecorate", id, __spreadValues({
    debugHookName: "useRedecorate"
  }, options));
  return React5.useCallback(() => {
    updateDecorate();
  }, [updateDecorate]);
};

// src/react/stores/plate/selectors/useEditorId.ts
var useEditorId = () => usePlateSelectors(void 0, { debugHookName: "useEditorId" }).editor().id;

// src/react/stores/plate/selectors/useEditorMounted.ts
var useEditorMounted = (id, options = {}) => {
  return !!usePlateSelectors(id, __spreadValues({
    debugHookName: "useEditorMounted"
  }, options)).isMounted();
};

// src/lib/editor/withSlate.ts
import {
  createTEditor,
  getEndPoint,
  getStartPoint,
  normalizeEditor,
  select
} from "@udecode/slate";

// src/internal/mergePlugins.ts
import mergeWith from "lodash/mergeWith.js";
function mergePlugins(basePlugin, ...sourcePlugins) {
  return mergeWith(
    {},
    basePlugin,
    ...sourcePlugins,
    (objValue, srcValue, key) => {
      if (Array.isArray(srcValue)) {
        return srcValue;
      }
      if (key === "options") {
        return __spreadValues(__spreadValues({}, objValue), srcValue);
      }
    }
  );
}

// src/lib/utils/misc/isFunction.ts
function isFunction(value) {
  return typeof value === "function";
}

// src/lib/plugin/createSlatePlugin.ts
function createSlatePlugin(config = {}) {
  var _a;
  let baseConfig;
  let initialExtension;
  if (isFunction(config)) {
    baseConfig = { key: "" };
    initialExtension = (editor) => config(editor);
  } else {
    baseConfig = config;
  }
  const key = (_a = baseConfig.key) != null ? _a : "";
  const plugin = mergePlugins(
    {
      key,
      __apiExtensions: [],
      __configuration: null,
      __extensions: initialExtension ? [initialExtension] : [],
      __optionExtensions: [],
      api: {},
      dependencies: [],
      editor: {},
      inject: {},
      node: { type: key },
      options: {},
      override: {},
      parser: {},
      parsers: {},
      plugins: [],
      priority: 100,
      render: {},
      shortcuts: {},
      transforms: {},
      handlers: {}
    },
    config
  );
  plugin.configure = (config2) => {
    const newPlugin = __spreadValues({}, plugin);
    newPlugin.__configuration = (ctx) => isFunction(config2) ? config2(ctx) : config2;
    return createSlatePlugin(newPlugin);
  };
  plugin.configurePlugin = (p, config2) => {
    const newPlugin = __spreadValues({}, plugin);
    const configureNestedPlugin = (plugins) => {
      let found = false;
      const updatedPlugins = plugins.map((nestedPlugin) => {
        if (nestedPlugin.key === p.key) {
          found = true;
          return createSlatePlugin(__spreadProps(__spreadValues({}, nestedPlugin), {
            __configuration: (ctx) => isFunction(config2) ? config2(ctx) : config2
          }));
        }
        if (nestedPlugin.plugins && nestedPlugin.plugins.length > 0) {
          const result2 = configureNestedPlugin(nestedPlugin.plugins);
          if (result2.found) {
            found = true;
            return __spreadProps(__spreadValues({}, nestedPlugin), {
              plugins: result2.plugins
            });
          }
        }
        return nestedPlugin;
      });
      return { found, plugins: updatedPlugins };
    };
    const result = configureNestedPlugin(newPlugin.plugins);
    newPlugin.plugins = result.plugins;
    return createSlatePlugin(newPlugin);
  };
  plugin.extendEditorApi = (extension) => {
    const newPlugin = __spreadValues({}, plugin);
    newPlugin.__apiExtensions = [
      ...newPlugin.__apiExtensions,
      { extension, isPluginSpecific: false }
    ];
    return createSlatePlugin(newPlugin);
  };
  plugin.extendOptions = (extension) => {
    const newPlugin = __spreadValues({}, plugin);
    newPlugin.__optionExtensions = [
      ...newPlugin.__optionExtensions,
      extension
    ];
    return createSlatePlugin(newPlugin);
  };
  plugin.extendApi = (extension) => {
    const newPlugin = __spreadValues({}, plugin);
    newPlugin.__apiExtensions = [
      ...newPlugin.__apiExtensions,
      { extension, isPluginSpecific: true }
    ];
    return createSlatePlugin(newPlugin);
  };
  plugin.extendEditorTransforms = (extension) => {
    const newPlugin = __spreadValues({}, plugin);
    newPlugin.__apiExtensions = [
      ...newPlugin.__apiExtensions,
      { extension, isPluginSpecific: false, isTransform: true }
    ];
    return createSlatePlugin(newPlugin);
  };
  plugin.extendTransforms = (extension) => {
    const newPlugin = __spreadValues({}, plugin);
    newPlugin.__apiExtensions = [
      ...newPlugin.__apiExtensions,
      { extension, isPluginSpecific: true, isTransform: true }
    ];
    return createSlatePlugin(newPlugin);
  };
  plugin.extend = (extendConfig) => {
    let newPlugin = __spreadValues({}, plugin);
    if (isFunction(extendConfig)) {
      newPlugin.__extensions = [
        ...newPlugin.__extensions,
        extendConfig
      ];
    } else {
      newPlugin = mergePlugins(newPlugin, extendConfig);
    }
    return createSlatePlugin(newPlugin);
  };
  plugin.clone = () => mergePlugins(plugin);
  plugin.extendPlugin = (p, extendConfig) => {
    const newPlugin = __spreadValues({}, plugin);
    const extendNestedPlugin = (plugins) => {
      let found = false;
      const updatedPlugins = plugins.map((nestedPlugin) => {
        if (nestedPlugin.key === p.key) {
          found = true;
          return createSlatePlugin(__spreadProps(__spreadValues({}, nestedPlugin), {
            __extensions: [
              ...nestedPlugin.__extensions,
              (ctx) => isFunction(extendConfig) ? extendConfig(ctx) : extendConfig
            ]
          }));
        }
        if (nestedPlugin.plugins && nestedPlugin.plugins.length > 0) {
          const result2 = extendNestedPlugin(nestedPlugin.plugins);
          if (result2.found) {
            found = true;
            return __spreadProps(__spreadValues({}, nestedPlugin), {
              plugins: result2.plugins
            });
          }
        }
        return nestedPlugin;
      });
      return { found, plugins: updatedPlugins };
    };
    const result = extendNestedPlugin(newPlugin.plugins);
    newPlugin.plugins = result.plugins;
    if (!result.found) {
      newPlugin.plugins.push(
        createSlatePlugin({
          key: p.key,
          __extensions: [
            (ctx) => isFunction(extendConfig) ? extendConfig(ctx) : extendConfig
          ]
        })
      );
    }
    return createSlatePlugin(newPlugin);
  };
  return plugin;
}
function createTSlatePlugin(config = {}) {
  return createSlatePlugin(config);
}

// src/lib/utils/applyDeepToNodes.ts
import {
  isAncestor,
  queryNode
} from "@udecode/slate";
var applyDeepToNodes = ({
  apply,
  node,
  path = [],
  query,
  source
}) => {
  const entry = [node, path];
  if (queryNode(entry, query)) {
    if (source instanceof Function) {
      apply(node, source());
    } else {
      apply(node, source);
    }
  }
  if (!isAncestor(node)) return;
  node.children.forEach((child, index) => {
    applyDeepToNodes({
      apply,
      node: child,
      path: path.concat([index]),
      query,
      source
    });
  });
};

// src/lib/utils/getInjectedPlugins.ts
var getInjectedPlugins = (editor, plugin) => {
  const injectedPlugins = [];
  [...editor.pluginList].reverse().forEach((p) => {
    var _a;
    const injectedPlugin = (_a = p.inject.plugins) == null ? void 0 : _a[plugin.key];
    if (injectedPlugin) injectedPlugins.push(injectedPlugin);
  });
  return [plugin, ...injectedPlugins];
};

// src/lib/utils/getKeysByTypes.ts
var getKeyByType = (editor, type) => {
  var _a;
  const plugin = Object.values(editor.plugins).find(
    (plugin2) => plugin2.node.type === type
  );
  return (_a = plugin == null ? void 0 : plugin.key) != null ? _a : type;
};

// src/lib/utils/hotkeys.ts
import { IS_APPLE } from "@udecode/utils";
import { isKeyHotkey } from "is-hotkey";
import { isHotkey } from "is-hotkey";
var HOTKEYS = {
  bold: "mod+b",
  compose: ["down", "left", "right", "up", "backspace", "enter"],
  deleteBackward: "shift?+backspace",
  deleteForward: "shift?+delete",
  extendBackward: "shift+left",
  extendForward: "shift+right",
  insertSoftBreak: "shift+enter",
  italic: "mod+i",
  moveBackward: "left",
  moveForward: "right",
  moveWordBackward: "ctrl+left",
  moveWordForward: "ctrl+right",
  splitBlock: "enter",
  tab: "tab",
  undo: "mod+z",
  untab: "shift+tab"
};
var APPLE_HOTKEYS = {
  deleteBackward: ["ctrl+backspace", "ctrl+h"],
  deleteForward: ["ctrl+delete", "ctrl+d"],
  deleteLineBackward: "cmd+shift?+backspace",
  deleteLineForward: ["cmd+shift?+delete", "ctrl+k"],
  deleteWordBackward: "opt+shift?+backspace",
  deleteWordForward: "opt+shift?+delete",
  extendLineBackward: "opt+shift+up",
  extendLineForward: "opt+shift+down",
  moveLineBackward: "opt+up",
  moveLineForward: "opt+down",
  moveWordBackward: "opt+left",
  moveWordForward: "opt+right",
  redo: "cmd+shift+z",
  transposeCharacter: "ctrl+t"
};
var WINDOWS_HOTKEYS = {
  deleteWordBackward: "ctrl+shift?+backspace",
  deleteWordForward: "ctrl+shift?+delete",
  redo: ["ctrl+y", "ctrl+shift+z"]
};
var createHotkey = (key) => {
  const generic = HOTKEYS[key];
  const apple = APPLE_HOTKEYS[key];
  const windows = WINDOWS_HOTKEYS[key];
  const isGeneric = generic && isKeyHotkey(generic);
  const isApple = apple && isKeyHotkey(apple);
  const isWindows = windows && isKeyHotkey(windows);
  return (event) => {
    if (isGeneric == null ? void 0 : isGeneric(event)) return true;
    if (IS_APPLE && (isApple == null ? void 0 : isApple(event))) return true;
    if (!IS_APPLE && (isWindows == null ? void 0 : isWindows(event))) return true;
    return false;
  };
};
var Hotkeys = {
  isBold: createHotkey("bold"),
  isCompose: createHotkey("compose"),
  isDeleteBackward: createHotkey("deleteBackward"),
  isDeleteForward: createHotkey("deleteForward"),
  isDeleteLineBackward: createHotkey("deleteLineBackward"),
  isDeleteLineForward: createHotkey("deleteLineForward"),
  isDeleteWordBackward: createHotkey("deleteWordBackward"),
  isDeleteWordForward: createHotkey("deleteWordForward"),
  isExtendBackward: createHotkey("extendBackward"),
  isExtendForward: createHotkey("extendForward"),
  isExtendLineBackward: createHotkey("extendLineBackward"),
  isExtendLineForward: createHotkey("extendLineForward"),
  isItalic: createHotkey("italic"),
  isMoveBackward: createHotkey("moveBackward"),
  isMoveForward: createHotkey("moveForward"),
  isMoveLineBackward: createHotkey("moveLineBackward"),
  isMoveLineForward: createHotkey("moveLineForward"),
  isMoveWordBackward: createHotkey("moveWordBackward"),
  isMoveWordForward: createHotkey("moveWordForward"),
  isRedo: createHotkey("redo"),
  isSoftBreak: createHotkey("insertSoftBreak"),
  isSplitBlock: createHotkey("splitBlock"),
  isTransposeCharacter: createHotkey("transposeCharacter"),
  isUndo: createHotkey("undo")
};

// src/lib/utils/mergeDeepToNodes.ts
import merge from "lodash/merge.js";
var mergeDeepToNodes = (options) => {
  applyDeepToNodes(__spreadProps(__spreadValues({}, options), { apply: merge }));
};

// src/lib/utils/normalizeDescendantsToDocumentFragment.ts
import {
  isElement as isElement2,
  isText as isText2
} from "@udecode/slate";

// src/lib/plugin/getEditorPlugin.ts
function getEditorPlugin(editor, p) {
  const plugin = editor.getPlugin(p);
  return {
    api: editor.api,
    editor,
    getOption: (key, ...args) => editor.getOption(plugin, key, ...args),
    getOptions: () => editor.getOptions(plugin),
    plugin,
    setOption: (keyOrOptions, value) => editor.setOption(plugin, keyOrOptions, value),
    setOptions: (options) => editor.setOptions(plugin, options),
    tf: editor.transforms,
    type: plugin.node.type
  };
}

// src/lib/plugins/AstPlugin.ts
var AstPlugin = createSlatePlugin({
  key: "ast",
  parser: {
    deserialize: ({ data }) => {
      const decoded = decodeURIComponent(window.atob(data));
      let parsed;
      try {
        parsed = JSON.parse(decoded);
      } catch (e) {
      }
      return parsed;
    },
    format: "application/x-slate-fragment"
  }
});

// src/lib/plugins/DOMPlugin.ts
var DOMPlugin = createSlatePlugin({
  key: "dom"
});

// src/lib/plugins/HistoryPlugin.ts
import { withHistory } from "slate-history";
var withPlateHistory = ({ editor }) => withHistory(editor);
var HistoryPlugin = createSlatePlugin({
  key: "history",
  extendEditor: withPlateHistory
});

// src/lib/plugins/InlineVoidPlugin.ts
var withInlineVoid = ({ editor }) => {
  const { isInline, isVoid, markableVoid } = editor;
  const voidTypes = [];
  const inlineTypes = [];
  const markableVoidTypes = [];
  editor.pluginList.forEach((plugin) => {
    if (plugin.node.isInline) {
      inlineTypes.push(plugin.node.type);
    }
    if (plugin.node.isVoid) {
      voidTypes.push(plugin.node.type);
    }
    if (plugin.node.isMarkableVoid) {
      markableVoidTypes.push(plugin.node.type);
    }
  });
  editor.isInline = (element) => {
    return inlineTypes.includes(element.type) ? true : isInline(element);
  };
  editor.isVoid = (element) => {
    return voidTypes.includes(element.type) ? true : isVoid(element);
  };
  editor.markableVoid = (element) => {
    return markableVoidTypes.includes(element.type) ? true : markableVoid(element);
  };
  return editor;
};
var InlineVoidPlugin = createSlatePlugin({
  key: "inlineVoid",
  extendEditor: withInlineVoid
});

// src/lib/plugins/ParserPlugin.ts
var withParser = ({ editor }) => {
  const { insertData } = editor;
  editor.insertData = (dataTransfer) => {
    const inserted = [...editor.pluginList].reverse().some((plugin) => {
      const parser = plugin.parser;
      if (!parser) return false;
      const injectedPlugins = getInjectedPlugins(editor, plugin);
      const { deserialize, format, mimeTypes } = parser;
      if (!format) return false;
      const formats = Array.isArray(format) ? format : [format];
      const mimeTypeList = mimeTypes || formats.map((fmt) => fmt.includes("/") ? fmt : `text/${fmt}`);
      for (const mimeType of mimeTypeList) {
        let data = dataTransfer.getData(mimeType);
        if (!data) continue;
        if (!pipeInsertDataQuery(editor, injectedPlugins, {
          data,
          dataTransfer
        })) {
          continue;
        }
        data = pipeTransformData(editor, injectedPlugins, {
          data,
          dataTransfer
        });
        let fragment = deserialize == null ? void 0 : deserialize(__spreadProps(__spreadValues({}, getEditorPlugin(editor, plugin)), {
          data,
          dataTransfer
        }));
        if (!(fragment == null ? void 0 : fragment.length)) continue;
        fragment = pipeTransformFragment(editor, injectedPlugins, {
          data,
          dataTransfer,
          fragment
        });
        if (fragment.length === 0) continue;
        pipeInsertFragment(editor, injectedPlugins, {
          data,
          dataTransfer,
          fragment
        });
        return true;
      }
      return false;
    });
    if (inserted) return;
    insertData(dataTransfer);
  };
  return editor;
};
var ParserPlugin = createSlatePlugin({
  key: "parser",
  extendEditor: withParser
});

// src/lib/plugins/debug/DebugPlugin.ts
var PlateError = class extends Error {
  constructor(message, type = "DEFAULT") {
    super(`[${type}] ${message}`);
    this.type = type;
    this.name = "PlateError";
  }
};
var DebugPlugin = createTSlatePlugin({
  key: "debug",
  options: {
    isProduction: process.env.NODE_ENV === "production",
    logLevel: process.env.NODE_ENV === "production" ? "error" : "log",
    logger: {
      error: (message, type, details) => console.error(`${type ? `[${type}] ` : ""}${message}`, details),
      info: (message, type, details) => console.info(`${type ? `[${type}] ` : ""}${message}`, details),
      log: (message, type, details) => console.log(`${type ? `[${type}] ` : ""}${message}`, details),
      warn: (message, type, details) => console.warn(`${type ? `[${type}] ` : ""}${message}`, details)
    },
    throwErrors: true
  }
}).extendEditorApi(({ getOptions }) => {
  const logLevels = ["error", "warn", "info", "log"];
  const log = (level, message, type, details) => {
    var _a, _b;
    const options = getOptions();
    if (options.isProduction && level === "log") return;
    if (logLevels.indexOf(level) <= logLevels.indexOf(options.logLevel)) {
      if (level === "error" && options.throwErrors) {
        const error = message instanceof Error ? message : new PlateError(message, type);
        throw error;
      } else {
        (_b = (_a = options.logger)[level]) == null ? void 0 : _b.call(_a, message, type, details);
      }
    }
  };
  return {
    debug: {
      error: (message, type, details) => log("error", message, type, details),
      info: (message, type, details) => log("info", message, type, details),
      log: (message, type, details) => log("log", message, type, details),
      warn: (message, type, details) => log("warn", message, type, details)
    }
  };
});

// src/lib/plugins/editor-protocol/SlateNextPlugin.ts
import {
  isSelectionAtBlockStart,
  removeSelectionMark,
  replaceNodeChildren as replaceNodeChildren2,
  toggleMark
} from "@udecode/slate-utils";
import { bindFirst } from "@udecode/utils";

// src/lib/transforms/resetEditorChildren.ts
import {
  replaceNodeChildren
} from "@udecode/slate-utils";
var resetEditorChildren = (editor, options) => {
  replaceNodeChildren(editor, __spreadValues({
    at: [],
    nodes: editor.api.create.value()
  }, options));
};

// src/lib/transforms/resetEditor.ts
var resetEditor = (editor) => {
  resetEditorChildren(editor);
  editor.history.undos = [];
  editor.history.redos = [];
  editor.operations = [];
};

// src/lib/transforms/toggleBlock.ts
import {
  someNode
} from "@udecode/slate";
var toggleBlock = (editor, options, editorNodesOptions) => {
  var _a;
  const { defaultType = editor.getType(BaseParagraphPlugin), type } = options;
  const at = (_a = editorNodesOptions == null ? void 0 : editorNodesOptions.at) != null ? _a : editor.selection;
  if (!type || !at) return;
  const isActive = someNode(editor, __spreadProps(__spreadValues({}, editorNodesOptions), {
    match: {
      type
    }
  }));
  if (isActive && type === defaultType) return;
  editor.setNodes(
    {
      type: isActive ? defaultType : type
    },
    { at }
  );
};

// src/lib/plugins/paragraph/BaseParagraphPlugin.ts
var BaseParagraphPlugin = createSlatePlugin({
  key: "p",
  node: { isElement: true },
  parsers: {
    html: {
      deserializer: {
        query: ({ element }) => element.style.fontFamily !== "Consolas",
        rules: [
          {
            validNodeName: "P"
          }
        ]
      }
    }
  }
});

// src/lib/plugins/editor-protocol/SlateNextPlugin.ts
var withSlateNext = ({ editor }) => {
  const { apply, deleteBackward, deleteForward, deleteFragment } = editor;
  editor.prevSelection = null;
  editor.currentKeyboardEvent = null;
  const resetMarks = () => {
    if (isSelectionAtBlockStart(editor)) {
      removeSelectionMark(editor);
    }
  };
  editor.deleteBackward = (unit) => {
    deleteBackward(unit);
    resetMarks();
  };
  editor.deleteForward = (unit) => {
    deleteForward(unit);
    resetMarks();
  };
  editor.deleteFragment = (direction) => {
    deleteFragment(direction);
    resetMarks();
  };
  editor.apply = (operation) => {
    if (operation.type === "set_selection") {
      const { properties } = operation;
      editor.prevSelection = properties;
      apply(operation);
      editor.currentKeyboardEvent = null;
      return;
    }
    apply(operation);
  };
  return editor;
};
var SlateNextPlugin = createTSlatePlugin({
  key: "slateNext",
  extendEditor: withSlateNext
}).extendEditorApi(({ editor }) => ({
  create: {
    /** Default block factory. */
    block: (node, _path) => __spreadValues({
      children: [{ text: "" }],
      type: editor.getType(BaseParagraphPlugin)
    }, node)
  }
})).extendEditorApi(({ api }) => ({
  create: {
    /** Editor children factory. */
    value: () => [api.create.block()]
  }
})).extendEditorTransforms(({ editor }) => ({
  reset: () => {
    resetEditor(editor);
  },
  setValue: (value) => {
    let children = value;
    if (typeof value === "string") {
      children = editor.api.html.deserialize({
        element: value
      });
    } else if (!value || value.length === 0) {
      children = editor.api.create.value();
    }
    replaceNodeChildren2(editor, {
      at: [],
      nodes: children
    });
  },
  toggle: {
    block: bindFirst(toggleBlock, editor),
    mark: bindFirst(toggleMark, editor)
  }
}));

// src/lib/plugins/html/HtmlPlugin.ts
import { bindFirst as bindFirst2 } from "@udecode/utils";

// src/lib/plugins/html/utils/isHtmlElement.ts
var isHtmlElement = (node) => node.nodeType === Node.ELEMENT_NODE;

// src/lib/plugins/html/utils/isHtmlText.ts
var isHtmlText = (node) => node.nodeType === Node.TEXT_NODE;

// src/lib/plugins/html/utils/inlineTagNames.ts
var inlineTagNames = /* @__PURE__ */ new Set([
  "A",
  "ABBR",
  "ACRONYM",
  "B",
  "BDI",
  "BDO",
  "BIG",
  "BR",
  "BUTTON",
  "CANVAS",
  "CITE",
  "CODE",
  "CONTENT",
  "DATA",
  "DEL",
  "DFN",
  "EM",
  "EMBED",
  "FONT",
  "I",
  "IFRAME",
  "IMG",
  "IMG",
  "INPUT",
  "INS",
  "KBD",
  "LABEL",
  "MAP",
  "MARK",
  "MARQUEE",
  "MENUITEM",
  "METER",
  "NOBR",
  "OBJECT",
  "OUTPUT",
  "PICTURE",
  "PORTAL",
  "PROGRESS",
  "Q",
  "S",
  "SAMP",
  "SELECT",
  "SHADOW",
  "SMALL",
  "SOURCE",
  "SPAN",
  "STRIKE",
  "STRONG",
  "SUB",
  "SUP",
  "TEXTAREA",
  "TIME",
  "TRACK",
  "TT",
  "U",
  "VAR",
  "VIDEO",
  "WBR",
  "math",
  "svg"
]);

// src/lib/plugins/html/utils/isHtmlInlineElement.ts
var isHtmlInlineElement = (node) => {
  if (!isHtmlElement(node)) return false;
  const element = node;
  const tagNameIsInline = inlineTagNames.has(element.tagName);
  const displayProperty = element.style.display.split(" ")[0];
  if (displayProperty === "") {
    return tagNameIsInline;
  }
  if (displayProperty.startsWith("inline")) {
    return true;
  }
  if (displayProperty === "inherit" && element.parentElement) {
    return isHtmlInlineElement(element.parentElement);
  }
  if (["contents", "initial", "none", "revert", "revert-layer", "unset"].includes(
    displayProperty
  )) {
    return tagNameIsInline;
  }
  return false;
};

// src/lib/plugins/html/utils/isHtmlBlockElement.ts
var isHtmlBlockElement = (node) => {
  if (!isHtmlElement(node)) return false;
  const element = node;
  return !isHtmlInlineElement(element);
};

// src/lib/plugins/html/utils/collapse-white-space/collapseString.ts
var collapseString = (text, {
  shouldCollapseWhiteSpace = true,
  trimEnd = "collapse",
  trimStart = "collapse",
  whiteSpaceIncludesNewlines = true
} = {}) => {
  if (trimStart === "all") {
    text = text.replace(/^\s+/, "");
  }
  if (trimEnd === "single-newline") {
    text = text.replace(/\n$/, "");
  }
  if (shouldCollapseWhiteSpace) {
    if (whiteSpaceIncludesNewlines) {
      text = text.replaceAll(/\s+/g, " ");
    } else {
      text = text.replaceAll(/[^\S\n\r]+/g, " ");
      text = text.replaceAll(/^[^\S\n\r]+/gm, "");
      text = text.replaceAll(/[^\S\n\r]+$/gm, "");
    }
  }
  return text;
};

// src/lib/plugins/html/utils/collapse-white-space/isLastNonEmptyTextOfInlineFormattingContext.ts
var isLastNonEmptyTextOfInlineFormattingContext = (initialText) => {
  let currentNode = initialText;
  while (true) {
    if (currentNode.nextSibling) {
      currentNode = currentNode.nextSibling;
    } else {
      currentNode = currentNode.parentElement;
      if (currentNode && isHtmlBlockElement(currentNode)) {
        return true;
      }
      currentNode = (currentNode == null ? void 0 : currentNode.nextSibling) || null;
    }
    if (!currentNode) {
      return true;
    }
    if (isHtmlBlockElement(currentNode)) {
      return true;
    }
    if ((currentNode.textContent || "").length > 0) {
      return false;
    }
  }
};

// src/lib/plugins/html/utils/collapse-white-space/stateTransforms.ts
var upsertInlineFormattingContext = (state) => {
  if (state.inlineFormattingContext) {
    state.inlineFormattingContext.atStart = false;
  } else {
    state.inlineFormattingContext = {
      atStart: true,
      lastHasTrailingWhiteSpace: false
    };
  }
};
var endInlineFormattingContext = (state) => {
  state.inlineFormattingContext = null;
};

// src/lib/plugins/html/utils/collapse-white-space/collapseWhiteSpaceText.ts
var collapseWhiteSpaceText = (text, state) => {
  const textContent = text.textContent || "";
  const isWhiteSpaceOnly = textContent.trim() === "";
  if (state.inlineFormattingContext || !isWhiteSpaceOnly) {
    upsertInlineFormattingContext(state);
  }
  const { whiteSpaceRule } = state;
  const trimStart = (() => {
    if (whiteSpaceRule !== "normal") return "collapse";
    if (!state.inlineFormattingContext || state.inlineFormattingContext.atStart || state.inlineFormattingContext.lastHasTrailingWhiteSpace)
      return "all";
    return "collapse";
  })();
  const trimEnd = (() => {
    if (whiteSpaceRule === "normal") return "collapse";
    if (isLastNonEmptyTextOfInlineFormattingContext(text))
      return "single-newline";
    return "collapse";
  })();
  const shouldCollapseWhiteSpace = {
    normal: true,
    pre: false,
    "pre-line": true
  }[whiteSpaceRule];
  const whiteSpaceIncludesNewlines = whiteSpaceRule !== "pre-line";
  const collapsedTextContent = collapseString(textContent || "", {
    shouldCollapseWhiteSpace,
    trimEnd,
    trimStart,
    whiteSpaceIncludesNewlines
  });
  if (state.inlineFormattingContext && shouldCollapseWhiteSpace) {
    state.inlineFormattingContext.lastHasTrailingWhiteSpace = collapsedTextContent.endsWith(" ");
  }
  text.textContent = collapsedTextContent;
};

// src/lib/plugins/html/utils/collapse-white-space/collapseWhiteSpaceNode.ts
var collapseWhiteSpaceNode = (node, state) => {
  if (isHtmlElement(node)) {
    collapseWhiteSpaceElement(node, state);
    return;
  }
  if (isHtmlText(node)) {
    collapseWhiteSpaceText(node, state);
    return;
  }
  collapseWhiteSpaceChildren(node, state);
};

// src/lib/plugins/html/utils/collapse-white-space/collapseWhiteSpaceChildren.ts
var collapseWhiteSpaceChildren = (node, state) => {
  const childNodes = Array.from(node.childNodes);
  for (const childNode of childNodes) {
    collapseWhiteSpaceNode(childNode, state);
  }
};

// src/lib/plugins/html/utils/collapse-white-space/inferWhiteSpaceRule.ts
var inferWhiteSpaceRule = (element) => {
  const whiteSpaceProperty = element.style.whiteSpace;
  switch (whiteSpaceProperty) {
    case "normal":
    case "nowrap": {
      return "normal";
    }
    case "pre":
    case "pre-wrap":
    case "break-spaces": {
      return "pre";
    }
    case "pre-line": {
      return "pre-line";
    }
  }
  if (element.tagName === "PRE") {
    return "pre";
  }
  if (whiteSpaceProperty === "initial") {
    return "normal";
  }
  return null;
};

// src/lib/plugins/html/utils/collapse-white-space/collapseWhiteSpaceElement.ts
var collapseWhiteSpaceElement = (element, state) => {
  const isInlineElement = isHtmlInlineElement(element);
  const previousWhiteSpaceRule = state.whiteSpaceRule;
  const inferredWhiteSpaceRule = inferWhiteSpaceRule(element);
  if (inferredWhiteSpaceRule) {
    state.whiteSpaceRule = inferredWhiteSpaceRule;
  }
  if (!isInlineElement) {
    endInlineFormattingContext(state);
  }
  collapseWhiteSpaceChildren(element, state);
  if (!isInlineElement) {
    endInlineFormattingContext(state);
  }
  state.whiteSpaceRule = previousWhiteSpaceRule;
};

// src/lib/plugins/html/utils/collapse-white-space/collapseWhiteSpace.ts
var collapseWhiteSpace = (element) => {
  const clonedElement = element.cloneNode(true);
  const state = {
    inlineFormattingContext: null,
    whiteSpaceRule: "normal"
  };
  collapseWhiteSpaceElement(clonedElement, state);
  return clonedElement;
};

// src/lib/plugins/html/utils/htmlBodyToFragment.ts
import { jsx } from "slate-hyperscript";

// src/lib/plugins/html/utils/deserializeHtmlNodeChildren.ts
var deserializeHtmlNodeChildren = (editor, node) => Array.from(node.childNodes).flatMap(
  deserializeHtmlNode(editor)
);

// src/lib/plugins/html/utils/htmlBodyToFragment.ts
var htmlBodyToFragment = (editor, element) => {
  if (element.nodeName === "BODY") {
    return jsx(
      "fragment",
      {},
      deserializeHtmlNodeChildren(editor, element)
    );
  }
};

// src/lib/plugins/html/utils/htmlBrToNewLine.ts
var htmlBrToNewLine = (node) => {
  if (node.nodeName === "BR") {
    return "\n";
  }
};

// src/lib/plugins/html/utils/htmlElementToElement.ts
import { jsx as jsx2 } from "slate-hyperscript";

// src/lib/plugins/html/utils/pluginDeserializeHtml.ts
import { isDefined } from "@udecode/utils";
import castArray from "lodash/castArray.js";
var pluginDeserializeHtml = (editor, plugin, {
  deserializeLeaf,
  element: el
}) => {
  var _a, _b;
  const {
    node: { isElement: isElementRoot, isLeaf: isLeafRoot, type },
    parsers
  } = plugin;
  const deserializer = (_a = parsers == null ? void 0 : parsers.html) == null ? void 0 : _a.deserializer;
  if (!deserializer) return;
  const {
    attributeNames,
    isElement: isElementRule,
    isLeaf: isLeafRule,
    query,
    rules
  } = deserializer;
  let { parse } = deserializer;
  const isElement4 = isElementRule || isElementRoot;
  const isLeaf = isLeafRule || isLeafRoot;
  if (!deserializeLeaf && !isElement4) {
    return;
  }
  if (deserializeLeaf && !isLeaf) {
    return;
  }
  if (rules) {
    const isValid = rules.some(
      ({ validAttribute, validClassName, validNodeName = "*", validStyle }) => {
        var _a2;
        if (validNodeName) {
          const validNodeNames = castArray(validNodeName);
          if (validNodeNames.length > 0 && !validNodeNames.includes(el.nodeName) && validNodeName !== "*")
            return false;
        }
        if (validClassName && !el.classList.contains(validClassName))
          return false;
        if (validStyle) {
          for (const [key, value] of Object.entries(validStyle)) {
            const values = castArray(value);
            if (!values.includes(el.style[key]) && value !== "*")
              return;
            if (value === "*" && !el.style[key]) return;
            const defaultNodeValue = (_a2 = plugin.inject.nodeProps) == null ? void 0 : _a2.defaultNodeValue;
            if (defaultNodeValue && defaultNodeValue === el.style[key]) {
              return false;
            }
          }
        }
        if (validAttribute) {
          if (typeof validAttribute === "string") {
            if (!el.getAttributeNames().includes(validAttribute)) return false;
          } else {
            for (const [attributeName, attributeValue] of Object.entries(
              validAttribute
            )) {
              const attributeValues = castArray(attributeValue);
              const elAttribute = el.getAttribute(attributeName);
              if (!isDefined(elAttribute) || !attributeValues.includes(elAttribute))
                return false;
            }
          }
        }
        return true;
      }
    );
    if (!isValid) return;
  }
  if (query && !query(__spreadProps(__spreadValues({}, getEditorPlugin(editor, plugin)), { element: el }))) {
    return;
  }
  if (!parse) {
    if (isElement4) {
      parse = () => ({ type });
    } else if (isLeaf) {
      parse = () => ({ [type]: true });
    } else {
      return;
    }
  }
  let node = (_b = parse(__spreadProps(__spreadValues({}, getEditorPlugin(editor, plugin)), {
    element: el,
    node: {}
  }))) != null ? _b : {};
  if (Object.keys(node).length === 0) return;
  const injectedPlugins = getInjectedPlugins(editor, plugin);
  injectedPlugins.forEach((injectedPlugin) => {
    var _a2, _b2, _c, _d;
    const res = (_d = (_c = (_b2 = (_a2 = injectedPlugin.parsers) == null ? void 0 : _a2.html) == null ? void 0 : _b2.deserializer) == null ? void 0 : _c.parse) == null ? void 0 : _d.call(_c, __spreadProps(__spreadValues({}, getEditorPlugin(editor, plugin)), {
      element: el,
      node
    }));
    if (res) {
      node = __spreadValues(__spreadValues({}, node), res);
    }
  });
  if (attributeNames) {
    const elementAttributes = {};
    const elementAttributeNames = el.getAttributeNames();
    for (const elementAttributeName of elementAttributeNames) {
      if (attributeNames.includes(elementAttributeName)) {
        elementAttributes[elementAttributeName] = el.getAttribute(elementAttributeName);
      }
    }
    if (Object.keys(elementAttributes).length > 0) {
      node.attributes = elementAttributes;
    }
  }
  return __spreadProps(__spreadValues({}, deserializer), { node });
};

// src/lib/plugins/html/utils/pipeDeserializeHtmlElement.ts
var pipeDeserializeHtmlElement = (editor, element) => {
  let result;
  [...editor.pluginList].reverse().some((plugin) => {
    result = pluginDeserializeHtml(editor, plugin, { element });
    return !!result;
  });
  return result;
};

// src/lib/plugins/html/utils/htmlElementToElement.ts
var htmlElementToElement = (editor, element) => {
  var _a;
  const deserialized = pipeDeserializeHtmlElement(editor, element);
  if (deserialized) {
    const { node, withoutChildren } = deserialized;
    let descendants = (_a = node.children) != null ? _a : deserializeHtmlNodeChildren(editor, element);
    if (descendants.length === 0 || withoutChildren) {
      descendants = [{ text: "" }];
    }
    return jsx2("element", node, descendants);
  }
};

// src/lib/plugins/html/utils/htmlElementToLeaf.ts
import { isElement, isText } from "@udecode/slate";
import { jsx as jsx3 } from "slate-hyperscript";

// src/lib/plugins/html/utils/pipeDeserializeHtmlLeaf.ts
var pipeDeserializeHtmlLeaf = (editor, element) => {
  let node = {};
  [...editor.pluginList].reverse().forEach((plugin) => {
    const deserialized = pluginDeserializeHtml(editor, plugin, {
      deserializeLeaf: true,
      element
    });
    if (!deserialized) return;
    node = __spreadValues(__spreadValues({}, node), deserialized.node);
  });
  return node;
};

// src/lib/plugins/html/utils/htmlElementToLeaf.ts
var htmlElementToLeaf = (editor, element) => {
  const node = pipeDeserializeHtmlLeaf(editor, element);
  return deserializeHtmlNodeChildren(editor, element).reduce(
    (arr, child) => {
      if (!child) return arr;
      if (isElement(child)) {
        if (Object.keys(node).length > 0) {
          mergeDeepToNodes({
            node: child,
            query: {
              filter: ([n]) => isText(n)
            },
            source: node
          });
        }
        arr.push(child);
      } else {
        const attributes = __spreadValues({}, node);
        if (isText(child) && child.text) {
          Object.keys(attributes).forEach((key) => {
            if (attributes[key] && child[key]) {
              attributes[key] = child[key];
            }
          });
        }
        arr.push(jsx3("text", attributes, child));
      }
      return arr;
    },
    []
  );
};

// src/lib/plugins/html/utils/htmlTextNodeToString.ts
var htmlTextNodeToString = (node) => {
  if (isHtmlText(node)) {
    return node.textContent || "";
  }
};

// src/lib/plugins/html/utils/deserializeHtmlNode.ts
var deserializeHtmlNode = (editor) => (node) => {
  const textNode = htmlTextNodeToString(node);
  if (textNode) return textNode;
  if (!isHtmlElement(node)) return null;
  const breakLine = htmlBrToNewLine(node);
  if (breakLine) return breakLine;
  const fragment = htmlBodyToFragment(editor, node);
  if (fragment) return fragment;
  const element = htmlElementToElement(editor, node);
  if (element) return element;
  return htmlElementToLeaf(editor, node);
};

// src/lib/plugins/html/utils/deserializeHtmlElement.ts
var deserializeHtmlElement = (editor, element) => {
  return deserializeHtmlNode(editor)(element);
};

// src/lib/plugins/html/utils/htmlStringToDOMNode.ts
var htmlStringToDOMNode = (rawHtml) => {
  const node = document.createElement("body");
  node.innerHTML = rawHtml;
  return node;
};

// src/lib/plugins/html/utils/deserializeHtml.ts
var deserializeHtml = (editor, {
  collapseWhiteSpace: shouldCollapseWhiteSpace = true,
  element
}) => {
  if (typeof element === "string") {
    element = htmlStringToDOMNode(element);
  }
  if (shouldCollapseWhiteSpace) {
    element = collapseWhiteSpace(element);
  }
  const fragment = deserializeHtmlElement(editor, element);
  return normalizeDescendantsToDocumentFragment(editor, {
    descendants: fragment
  });
};

// src/lib/plugins/html/utils/parseHtmlDocument.ts
var parseHtmlDocument = (html) => {
  return new DOMParser().parseFromString(html, "text/html");
};

// src/lib/plugins/html/HtmlPlugin.ts
var HtmlPlugin = createSlatePlugin({
  key: "html"
}).extendApi(({ editor }) => ({
  deserialize: bindFirst2(deserializeHtml, editor)
})).extend({
  parser: {
    deserialize: ({ api, data }) => {
      const document2 = parseHtmlDocument(data);
      return api.html.deserialize({
        element: document2.body
      });
    },
    format: "text/html"
  }
});

// src/lib/plugins/length/LengthPlugin.ts
import { getEditorString, withoutNormalizing } from "@udecode/slate";
var withLength = ({
  editor,
  getOptions
}) => {
  const { apply } = editor;
  editor.apply = (operation) => {
    withoutNormalizing(editor, () => {
      apply(operation);
      const options = getOptions();
      if (options.maxLength) {
        const length = getEditorString(editor, []).length;
        if (length > options.maxLength) {
          const overflowLength = length - options.maxLength;
          editor.delete({
            distance: overflowLength,
            reverse: true,
            unit: "character"
          });
        }
      }
    });
  };
  return editor;
};
var LengthPlugin = createTSlatePlugin({
  key: "length",
  extendEditor: withLength
});

// src/lib/plugins/getCorePlugins.ts
var getCorePlugins = ({
  maxLength,
  plugins = []
}) => {
  let corePlugins = [
    DebugPlugin,
    SlateNextPlugin,
    DOMPlugin,
    HistoryPlugin,
    InlineVoidPlugin,
    ParserPlugin,
    maxLength ? LengthPlugin.configure({
      options: { maxLength }
    }) : LengthPlugin,
    HtmlPlugin,
    AstPlugin,
    BaseParagraphPlugin
  ];
  const customPluginsMap = new Map(
    plugins.map((plugin) => [plugin.key, plugin])
  );
  corePlugins = corePlugins.map((corePlugin) => {
    const customPlugin = customPluginsMap.get(corePlugin.key);
    if (customPlugin) {
      const index = plugins.findIndex((p) => p.key === corePlugin.key);
      if (index !== -1) {
        plugins.splice(index, 1);
      }
      return customPlugin;
    }
    return corePlugin;
  });
  return corePlugins;
};

// src/lib/utils/normalizeDescendantsToDocumentFragment.ts
var isInlineNode = (editor) => (node) => isText2(node) || isElement2(node) && editor.isInline(node);
var makeBlockLazy = (type) => () => ({
  children: [],
  type
});
var hasDifferentChildNodes = (descendants, isInline) => {
  return descendants.some((descendant, index, arr) => {
    const prevDescendant = arr[index - 1];
    if (index !== 0) {
      return isInline(descendant) !== isInline(prevDescendant);
    }
    return false;
  });
};
var normalizeDifferentNodeTypes = (descendants, isInline, makeDefaultBlock) => {
  const hasDifferentNodes = hasDifferentChildNodes(descendants, isInline);
  const { fragment } = descendants.reduce(
    (memo, node) => {
      if (hasDifferentNodes && isInline(node)) {
        let block = memo.precedingBlock;
        if (!block) {
          block = makeDefaultBlock();
          memo.precedingBlock = block;
          memo.fragment.push(block);
        }
        block.children.push(node);
      } else {
        memo.fragment.push(node);
        memo.precedingBlock = null;
      }
      return memo;
    },
    {
      fragment: [],
      precedingBlock: null
    }
  );
  return fragment;
};
var normalizeEmptyChildren = (descendants) => {
  if (descendants.length === 0) {
    return [{ text: "" }];
  }
  return descendants;
};
var normalize = (descendants, isInline, makeDefaultBlock) => {
  descendants = normalizeEmptyChildren(descendants);
  descendants = normalizeDifferentNodeTypes(
    descendants,
    isInline,
    makeDefaultBlock
  );
  descendants = descendants.map((node) => {
    if (isElement2(node)) {
      return __spreadProps(__spreadValues({}, node), {
        children: normalize(
          node.children,
          isInline,
          makeDefaultBlock
        )
      });
    }
    return node;
  });
  return descendants;
};
var normalizeDescendantsToDocumentFragment = (editor, { descendants }) => {
  const isInline = isInlineNode(editor);
  const defaultType = editor.getType(BaseParagraphPlugin);
  const makeDefaultBlock = makeBlockLazy(defaultType);
  return normalize(descendants, isInline, makeDefaultBlock);
};

// src/lib/utils/pluginInjectNodeProps.ts
import { isElement as isElement3 } from "@udecode/slate";
import { isDefined as isDefined2 } from "@udecode/utils";
import { clsx } from "clsx";
var pluginInjectNodeProps = (editor, plugin, nodeProps) => {
  var _a, _b, _c, _d;
  const {
    key,
    inject: { nodeProps: injectNodeProps, targetPlugins }
  } = plugin;
  const { className, element, style, text } = nodeProps;
  const node = element != null ? element : text;
  if (!node) return;
  if (!injectNodeProps) return;
  const {
    classNames,
    defaultNodeValue,
    nodeKey = key,
    query,
    styleKey = nodeKey,
    transformClassName,
    transformNodeValue,
    transformProps,
    transformStyle,
    validNodeValues
  } = injectNodeProps;
  const queryResult = query == null ? void 0 : query(__spreadProps(__spreadValues(__spreadValues({}, injectNodeProps), getEditorPlugin(editor, plugin)), {
    nodeProps
  }));
  if (!queryResult && targetPlugins && isElement3(node) && node.type && !targetPlugins.includes(getKeyByType(editor, node.type))) {
    return;
  }
  const nodeValue = node[nodeKey];
  if (!queryResult && (!isDefined2(nodeValue) || validNodeValues && !validNodeValues.includes(nodeValue) || nodeValue === defaultNodeValue)) {
    return;
  }
  const transformOptions = __spreadProps(__spreadValues(__spreadValues({}, nodeProps), getEditorPlugin(editor, plugin)), {
    nodeValue
  });
  const value = (_a = transformNodeValue == null ? void 0 : transformNodeValue(transformOptions)) != null ? _a : nodeValue;
  transformOptions.value = value;
  let res = {};
  if (element) {
    res.className = clsx(className, `slate-${nodeKey}-${nodeValue}`);
  }
  if ((classNames == null ? void 0 : classNames[nodeValue]) || transformClassName) {
    res.className = (_b = transformClassName == null ? void 0 : transformClassName(transformOptions)) != null ? _b : clsx(className, classNames == null ? void 0 : classNames[value]);
  }
  if (styleKey) {
    res.style = (_c = transformStyle == null ? void 0 : transformStyle(transformOptions)) != null ? _c : __spreadProps(__spreadValues({}, style), {
      [styleKey]: value
    });
  }
  if (transformProps) {
    res = (_d = transformProps(__spreadProps(__spreadValues({}, transformOptions), { props: res }))) != null ? _d : res;
  }
  return res;
};

// src/lib/utils/pipeInjectNodeProps.tsx
var pipeInjectNodeProps = (editor, nodeProps) => {
  editor.pluginList.forEach((plugin) => {
    if (plugin.inject.nodeProps) {
      const props = pluginInjectNodeProps(editor, plugin, nodeProps);
      if (props) {
        nodeProps = __spreadValues(__spreadValues({}, nodeProps), props);
      }
    }
  });
  return __spreadProps(__spreadValues({}, nodeProps), { editor });
};

// src/lib/utils/pipeInsertDataQuery.ts
var pipeInsertDataQuery = (editor, plugins, { data, dataTransfer }) => plugins.every((p) => {
  var _a;
  const query = (_a = p.parser) == null ? void 0 : _a.query;
  return !query || query(__spreadProps(__spreadValues({}, getEditorPlugin(editor, p)), {
    data,
    dataTransfer
  }));
});

// src/lib/utils/pipeInsertFragment.ts
import { withoutNormalizing as withoutNormalizing2 } from "@udecode/slate";
var pipeInsertFragment = (editor, injectedPlugins, _a) => {
  var _b = _a, { fragment } = _b, options = __objRest(_b, ["fragment"]);
  withoutNormalizing2(editor, () => {
    injectedPlugins.some((p) => {
      var _a2, _b2;
      return ((_b2 = (_a2 = p.parser) == null ? void 0 : _a2.preInsert) == null ? void 0 : _b2.call(_a2, __spreadValues(__spreadProps(__spreadValues({}, getEditorPlugin(editor, p)), {
        fragment
      }), options))) === true;
    });
    editor.insertFragment(fragment);
  });
};

// src/lib/utils/pipeNormalizeInitialValue.ts
import cloneDeep from "lodash/cloneDeep.js";
import isEqual from "lodash/isEqual.js";
var pipeNormalizeInitialValue = (editor) => {
  const value = editor.children;
  let normalizedValue = cloneDeep(value);
  editor.pluginList.forEach((p) => {
    var _a;
    const _normalizedValue = (_a = p.normalizeInitialValue) == null ? void 0 : _a.call(p, __spreadProps(__spreadValues({}, getEditorPlugin(editor, p)), {
      value: normalizedValue
    }));
    if (_normalizedValue) {
      normalizedValue = _normalizedValue;
    }
  });
  if (!isEqual(value, normalizedValue) && normalizedValue) {
    editor.children = normalizedValue;
  }
};

// src/lib/utils/pipeTransformData.ts
var pipeTransformData = (editor, plugins, { data, dataTransfer }) => {
  plugins.forEach((p) => {
    var _a;
    const transformData = (_a = p.parser) == null ? void 0 : _a.transformData;
    if (!transformData) return;
    data = transformData(__spreadProps(__spreadValues({}, getEditorPlugin(editor, p)), {
      data,
      dataTransfer
    }));
  });
  return data;
};

// src/lib/utils/pipeTransformFragment.ts
var pipeTransformFragment = (editor, plugins, _a) => {
  var _b = _a, { fragment } = _b, options = __objRest(_b, ["fragment"]);
  plugins.forEach((p) => {
    var _a2;
    const transformFragment = (_a2 = p.parser) == null ? void 0 : _a2.transformFragment;
    if (!transformFragment) return;
    fragment = transformFragment(__spreadValues(__spreadValues({
      fragment
    }, options), getEditorPlugin(editor, p)));
  });
  return fragment;
};

// src/lib/utils/resolvePlugin.ts
import merge2 from "lodash/merge.js";
var resolvePlugin = (editor, _plugin) => {
  var _a, _b, _c, _d;
  let plugin = mergePlugins({}, _plugin);
  plugin.__resolved = true;
  if (plugin.__configuration) {
    const configResult = plugin.__configuration(
      getEditorPlugin(editor, plugin)
    );
    plugin = mergePlugins(plugin, configResult);
    delete plugin.__configuration;
  }
  if (plugin.__extensions && plugin.__extensions.length > 0) {
    plugin.__extensions.forEach((extension) => {
      plugin = mergePlugins(
        plugin,
        extension(getEditorPlugin(editor, plugin))
      );
    });
    plugin.__extensions = [];
  }
  const targetPluginToInject = (_a = plugin.inject) == null ? void 0 : _a.targetPluginToInject;
  const targetPlugins = (_b = plugin.inject) == null ? void 0 : _b.targetPlugins;
  if (targetPluginToInject && targetPlugins && targetPlugins.length > 0) {
    plugin.inject = plugin.inject || {};
    plugin.inject.plugins = merge2(
      {},
      plugin.inject.plugins,
      Object.fromEntries(
        targetPlugins.map((targetPlugin) => {
          const injectedPlugin = targetPluginToInject(__spreadProps(__spreadValues({}, getEditorPlugin(editor, plugin)), {
            targetPlugin
          }));
          return [targetPlugin, injectedPlugin];
        })
      )
    );
  }
  if ((_c = plugin.node) == null ? void 0 : _c.component) {
    plugin.render.node = plugin.node.component;
  }
  if ((_d = plugin.render) == null ? void 0 : _d.node) {
    plugin.node.component = plugin.render.node;
  }
  validatePlugin(editor, plugin);
  return plugin;
};
var validatePlugin = (editor, plugin) => {
  if (!plugin.__extensions) {
    editor.api.debug.error(
      `Invalid plugin '${plugin.key}', you should use createSlatePlugin.`,
      "USE_CREATE_PLUGIN"
    );
  }
  if (plugin.node.isElement && plugin.node.isLeaf) {
    editor.api.debug.error(
      `Plugin ${plugin.key} cannot be both an element and a leaf.`,
      "PLUGIN_NODE_TYPE"
    );
  }
};

// src/lib/utils/resolvePlugins.ts
import { isDefined as isDefined3 } from "@udecode/utils";
import merge3 from "lodash/merge.js";
import { createZustandStore } from "zustand-x";
var resolvePlugins = (editor, plugins = []) => {
  editor.pluginList = [];
  editor.plugins = {};
  editor.api = {};
  editor.transforms = {};
  editor.tf = editor.transforms;
  editor.shortcuts = {};
  const resolvedPlugins = resolveAndSortPlugins(editor, plugins);
  applyPluginsToEditor(editor, resolvedPlugins);
  resolvePluginOverrides(editor);
  resolvePluginStores(editor);
  resolvePluginApis(editor);
  editor.pluginList.forEach((plugin) => {
    if (plugin.extendEditor) {
      editor = plugin.extendEditor(getEditorPlugin(editor, plugin));
    }
  });
  return editor;
};
var resolvePluginStores = (editor) => {
  editor.pluginList.forEach((plugin) => {
    let store = createZustandStore(plugin.key)(plugin.options, {
      immer: {
        enableMapSet: true
      }
    });
    if (plugin.__optionExtensions && plugin.__optionExtensions.length > 0) {
      plugin.__optionExtensions.forEach((extension) => {
        const extendedOptions = extension(getEditorPlugin(editor, plugin));
        store = store.extendSelectors(() => extendedOptions);
      });
    }
    plugin.optionsStore = store;
  });
};
var resolvePluginApis = (editor) => {
  const shortcutsByPriority = [];
  editor.pluginList.forEach((plugin) => {
    Object.entries(plugin.api).forEach(([apiKey, apiFunction]) => {
      editor.api[apiKey] = apiFunction;
    });
    if (plugin.__apiExtensions && plugin.__apiExtensions.length > 0) {
      plugin.__apiExtensions.forEach(
        ({ extension, isPluginSpecific, isTransform }) => {
          const newExtensions = extension(
            getEditorPlugin(editor, plugin)
          );
          if (isTransform) {
            if (isPluginSpecific) {
              if (!editor.transforms[plugin.key]) {
                editor.transforms[plugin.key] = {};
              }
              if (!plugin.transforms[plugin.key]) {
                plugin.transforms[plugin.key] = {};
              }
              merge3(editor.transforms[plugin.key], newExtensions);
              merge3(plugin.transforms[plugin.key], newExtensions);
            } else {
              merge3(editor.transforms, newExtensions);
              merge3(plugin.transforms, newExtensions);
            }
          } else {
            if (isPluginSpecific) {
              if (!editor.api[plugin.key]) {
                editor.api[plugin.key] = {};
              }
              if (!plugin.api[plugin.key]) {
                plugin.api[plugin.key] = {};
              }
              merge3(editor.api[plugin.key], newExtensions);
              merge3(plugin.api[plugin.key], newExtensions);
            } else {
              merge3(editor.api, newExtensions);
              merge3(plugin.api, newExtensions);
            }
          }
        }
      );
      delete plugin.__apiExtensions;
    }
    Object.entries(plugin.shortcuts).forEach(([key, hotkey]) => {
      var _a;
      if (hotkey === null) {
        const index = shortcutsByPriority.findIndex((item) => item.key === key);
        if (index !== -1) {
          shortcutsByPriority.splice(index, 1);
        }
      } else {
        const priority = (_a = hotkey.priority) != null ? _a : plugin.priority;
        const existingIndex = shortcutsByPriority.findIndex(
          (item) => item.key === key
        );
        if (existingIndex === -1 || priority >= shortcutsByPriority[existingIndex].priority) {
          if (existingIndex !== -1) {
            shortcutsByPriority.splice(existingIndex, 1);
          }
          shortcutsByPriority.push({ key, hotkey, priority });
        }
      }
    });
  });
  shortcutsByPriority.sort((a, b) => b.hotkey.priority - a.hotkey.priority);
  editor.shortcuts = Object.fromEntries(
    shortcutsByPriority.map(({ key, hotkey }) => {
      const _a = hotkey, { priority } = _a, hotkeyWithoutPriority = __objRest(_a, ["priority"]);
      return [key, hotkeyWithoutPriority];
    })
  );
};
var flattenAndResolvePlugins = (editor, plugins) => {
  const pluginMap = /* @__PURE__ */ new Map();
  const processPlugin = (plugin) => {
    const resolvedPlugin = resolvePlugin(editor, plugin);
    const existingPlugin = pluginMap.get(resolvedPlugin.key);
    if (existingPlugin) {
      pluginMap.set(
        resolvedPlugin.key,
        mergePlugins(existingPlugin, resolvedPlugin)
      );
    } else {
      pluginMap.set(resolvedPlugin.key, resolvedPlugin);
    }
    if (resolvedPlugin.plugins && resolvedPlugin.plugins.length > 0) {
      resolvedPlugin.plugins.forEach(processPlugin);
    }
  };
  plugins.forEach(processPlugin);
  return pluginMap;
};
var resolveAndSortPlugins = (editor, plugins) => {
  const pluginMap = flattenAndResolvePlugins(editor, plugins);
  const enabledPlugins = Array.from(pluginMap.values()).filter(
    (plugin) => plugin.enabled !== false
  );
  enabledPlugins.sort((a, b) => b.priority - a.priority);
  const orderedPlugins = [];
  const visited = /* @__PURE__ */ new Set();
  const visit = (plugin) => {
    var _a;
    if (visited.has(plugin.key)) return;
    visited.add(plugin.key);
    (_a = plugin.dependencies) == null ? void 0 : _a.forEach((depKey) => {
      const depPlugin = pluginMap.get(depKey);
      if (depPlugin) {
        visit(depPlugin);
      } else {
        editor.api.debug.warn(
          `Plugin "${plugin.key}" depends on missing plugin "${depKey}"`,
          "PLUGIN_DEPENDENCY_MISSING"
        );
      }
    });
    orderedPlugins.push(plugin);
  };
  enabledPlugins.forEach(visit);
  return orderedPlugins;
};
var applyPluginsToEditor = (editor, plugins) => {
  editor.pluginList = plugins;
  editor.plugins = Object.fromEntries(
    plugins.map((plugin) => [plugin.key, plugin])
  );
};
var resolvePluginOverrides = (editor) => {
  const applyOverrides = (plugins) => {
    let overriddenPlugins = [...plugins];
    const enabledOverrides = {};
    const componentOverrides = {};
    const pluginOverrides = {};
    for (const plugin of plugins) {
      if (plugin.override.enabled) {
        Object.assign(enabledOverrides, plugin.override.enabled);
      }
      if (plugin.override.components) {
        Object.entries(plugin.override.components).forEach(
          ([key, component]) => {
            if (!componentOverrides[key] || plugin.priority > componentOverrides[key].priority) {
              componentOverrides[key] = {
                component,
                priority: plugin.priority
              };
            }
          }
        );
      }
      if (plugin.override.plugins) {
        Object.entries(plugin.override.plugins).forEach(([key, value]) => {
          pluginOverrides[key] = mergePlugins(pluginOverrides[key], value);
          if (value.enabled !== void 0) {
            enabledOverrides[key] = value.enabled;
          }
        });
      }
    }
    overriddenPlugins = overriddenPlugins.map((p) => {
      var _a;
      let updatedPlugin = __spreadValues({}, p);
      if (pluginOverrides[p.key]) {
        updatedPlugin = mergePlugins(updatedPlugin, pluginOverrides[p.key]);
      }
      if (componentOverrides[p.key] && (!p.render.node && !p.node.component || componentOverrides[p.key].priority > p.priority)) {
        updatedPlugin.render.node = componentOverrides[p.key].component;
        updatedPlugin.node.component = componentOverrides[p.key].component;
      }
      const enabled = (_a = enabledOverrides[p.key]) != null ? _a : updatedPlugin.enabled;
      if (isDefined3(enabled)) {
        updatedPlugin.enabled = enabled;
      }
      return updatedPlugin;
    });
    return overriddenPlugins.filter((p) => p.enabled !== false).map((plugin) => __spreadProps(__spreadValues({}, plugin), {
      plugins: applyOverrides(plugin.plugins || [])
    }));
  };
  editor.pluginList = applyOverrides(editor.pluginList);
  editor.plugins = Object.fromEntries(
    editor.pluginList.map((plugin) => [plugin.key, plugin])
  );
};

// src/lib/utils/misc/getSlateClass.ts
var getSlateClass = (type) => `slate-${type}`;

// src/lib/plugin/getSlatePlugin.ts
function getSlatePlugin(editor, p) {
  let plugin = p;
  const editorPlugin = editor.plugins[p.key];
  if (!editorPlugin) {
    if (!plugin.node) {
      plugin = createSlatePlugin(plugin);
    }
    return plugin.__resolved ? plugin : resolvePlugin(editor, plugin);
  }
  return editorPlugin;
}
function getPluginType(editor, plugin) {
  var _a, _b;
  const p = editor.getPlugin(plugin);
  return (_b = (_a = p.node.type) != null ? _a : p.key) != null ? _b : "";
}

// src/lib/editor/withSlate.ts
var withSlate = (e, _a = {}) => {
  var _b = _a, {
    id,
    autoSelect,
    maxLength,
    plugins = [],
    rootPlugin,
    selection,
    shouldNormalizeEditor,
    value
  } = _b, pluginConfig = __objRest(_b, [
    "id",
    "autoSelect",
    "maxLength",
    "plugins",
    "rootPlugin",
    "selection",
    "shouldNormalizeEditor",
    "value"
  ]);
  var _a2, _b2;
  const editor = e;
  editor.id = id != null ? id : editor.id;
  editor.key = (_a2 = editor.key) != null ? _a2 : Math.random();
  editor.isFallback = false;
  editor.getApi = () => editor.api;
  editor.getTransforms = () => editor.transforms;
  editor.getPlugin = (plugin) => getSlatePlugin(editor, plugin);
  editor.getType = (plugin) => getPluginType(editor, plugin);
  editor.getInjectProps = (plugin) => {
    var _a3, _b3;
    return (_b3 = (_a3 = editor.getPlugin(plugin).inject) == null ? void 0 : _a3.nodeProps) != null ? _b3 : {};
  };
  editor.getOptionsStore = (plugin) => {
    return editor.getPlugin(plugin).optionsStore;
  };
  editor.getOptions = (plugin) => {
    const store = editor.getOptionsStore(plugin);
    if (!store) return editor.getPlugin(plugin).options;
    return editor.getOptionsStore(plugin).get.state();
  };
  editor.getOption = (plugin, key, ...args) => {
    const store = editor.getOptionsStore(plugin);
    if (!store) return editor.getPlugin(plugin).options[key];
    const getter = store.get[key];
    if (getter) {
      return getter(...args);
    }
    editor.api.debug.error(
      `editor.getOption: ${key} option is not defined in plugin ${plugin.key}.`,
      "OPTION_UNDEFINED"
    );
  };
  editor.setOption = (plugin, key, value2) => {
    const store = editor.getOptionsStore(plugin);
    if (!store) return;
    const setter = store.set[key];
    if (setter) {
      setter(value2);
    } else {
      editor.api.debug.error(
        `editor.setOption: ${key} option is not defined in plugin ${plugin.key}.`,
        "OPTION_UNDEFINED"
      );
    }
  };
  editor.setOptions = (plugin, options) => {
    const store = editor.getOptionsStore(plugin);
    if (!store) return;
    if (typeof options === "object") {
      store.set.mergeState(options);
    } else if (typeof options === "function") {
      store.set.state(options);
    }
  };
  const corePlugins = getCorePlugins({
    maxLength,
    plugins
  });
  let rootPluginInstance = createSlatePlugin(__spreadProps(__spreadValues({
    key: "root",
    priority: 1e4
  }, pluginConfig), {
    plugins: [...corePlugins, ...plugins]
  }));
  if (rootPlugin) {
    rootPluginInstance = rootPlugin(rootPluginInstance);
  }
  resolvePlugins(editor, [rootPluginInstance]);
  if (typeof value === "string") {
    editor.children = editor.api.html.deserialize({ element: value });
  } else if (value) {
    editor.children = value;
  }
  if (((_b2 = editor.children) == null ? void 0 : _b2.length) === 0) {
    editor.children = editor.api.create.value();
  }
  if (selection) {
    editor.selection = selection;
  } else if (autoSelect) {
    const edge = autoSelect === "start" ? "start" : "end";
    const target = edge === "start" ? getStartPoint(editor, []) : getEndPoint(editor, []);
    select(editor, target);
  }
  if (value) {
    pipeNormalizeInitialValue(editor);
  }
  if (shouldNormalizeEditor) {
    normalizeEditor(editor, { force: true });
  }
  return editor;
};

// src/lib/libs/zustand.ts
import { createZustandStore as createZustandStore2 } from "zustand-x";

// src/react/plugin/toPlatePlugin.ts
var methodsToWrap = [
  "configure",
  "configurePlugin",
  "extendEditorApi",
  "extendApi",
  "extendEditorTransforms",
  "extend",
  "extendPlugin"
];
function toPlatePlugin(basePlugin, extendConfig) {
  const plugin = __spreadValues({}, basePlugin);
  methodsToWrap.forEach((method) => {
    const originalMethod = plugin[method];
    plugin[method] = (...args) => {
      const slatePlugin = originalMethod(...args);
      return toPlatePlugin(slatePlugin);
    };
  });
  plugin.withComponent = (component) => {
    return plugin.extend({
      node: { component },
      render: { node: component }
    });
  };
  if (!extendConfig) return plugin;
  const extendedPlugin = plugin.extend(extendConfig);
  return extendedPlugin;
}
function toTPlatePlugin(basePlugin, extendConfig) {
  return toPlatePlugin(basePlugin, extendConfig);
}

// src/react/plugin/createPlatePlugin.ts
var createPlatePlugin = (config = {}) => {
  const plugin = createSlatePlugin(config);
  return toPlatePlugin(plugin);
};
function createTPlatePlugin(config = {}) {
  return createPlatePlugin(config);
}

// src/react/plugin/getEditorPlugin.ts
function getEditorPlugin2(editor, plugin) {
  return __spreadProps(__spreadValues({}, getEditorPlugin(editor, plugin)), {
    useOption: (key, ...args) => editor.useOption(plugin, key, ...args)
  });
}

// src/react/plugin/getPlugin.ts
function getPlugin(editor, plugin) {
  var _a;
  return (_a = editor.plugins[plugin.key]) != null ? _a : createPlatePlugin({ key: plugin.key });
}

// src/react/plugin/omitPluginContext.ts
var omitPluginContext = (ctx) => {
  const _a = ctx, {
    api,
    editor,
    getOption,
    getOptions,
    plugin,
    setOption,
    setOptions,
    tf,
    type,
    useOption
  } = _a, rest = __objRest(_a, [
    "api",
    "editor",
    "getOption",
    "getOptions",
    "plugin",
    "setOption",
    "setOptions",
    "tf",
    "type",
    "useOption"
  ]);
  return rest;
};

// src/react/editor/withPlate.ts
import { createTEditor as createTEditor2 } from "@udecode/slate";

// src/react/plugins/PlateApiPlugin.ts
var PlateApiPlugin = createTPlatePlugin({
  key: "plateApi",
  dependencies: ["debug"]
}).extendEditorApi(({ editor }) => ({
  redecorate: () => {
    editor.api.debug.warn(
      `The method editor.api.redecorate() has not been overridden. This may cause unexpected behavior. Please ensure that all required editor methods are properly defined.`,
      "OVERRIDE_MISSING"
    );
  }
}));

// src/react/plugins/SlateReactNextPlugin.ts
var SlateReactNextPlugin = toPlatePlugin(SlateNextPlugin, {
  handlers: {
    onKeyDown: ({ editor, event }) => {
      event.persist();
      editor.currentKeyboardEvent = event;
    }
  }
});

// src/react/plugins/event-editor/EventEditorStore.ts
var EventEditorStore = createZustandStore2("event-editor")({
  blur: null,
  focus: null,
  last: null
});
var eventEditorActions = EventEditorStore.set;
var eventEditorSelectors = EventEditorStore.get;
var useEventEditorSelectors = EventEditorStore.use;

// src/react/plugins/event-editor/useFocusEditorEvents.ts
import { useEffect } from "react";
var FOCUS_EDITOR_EVENT = "focus-editor-event";
var BLUR_EDITOR_EVENT = "blur-editor-event";
var useFocusEditorEvents = ({
  editorRef,
  onEditorBlur,
  onEditorFocus
}) => {
  useEffect(() => {
    const onFocusEditor = (event) => {
      const id = event.detail.id;
      if (!!onEditorFocus && editorRef && editorRef.id === id) {
        onEditorFocus();
      }
    };
    const onBlurEditor = (event) => {
      const id = event.detail.id;
      if (!!onEditorBlur && editorRef && editorRef.id === id) {
        onEditorBlur();
      }
    };
    document.addEventListener(FOCUS_EDITOR_EVENT, onFocusEditor);
    document.addEventListener(BLUR_EDITOR_EVENT, onBlurEditor);
    return () => {
      document.removeEventListener(FOCUS_EDITOR_EVENT, onFocusEditor);
      document.removeEventListener(BLUR_EDITOR_EVENT, onBlurEditor);
    };
  }, [editorRef, onEditorBlur, onEditorFocus]);
};

// src/react/plugins/event-editor/EventEditorPlugin.ts
var EventEditorPlugin = createPlatePlugin({
  key: "eventEditor",
  handlers: {
    onBlur: ({ editor }) => {
      const focus = eventEditorSelectors.focus();
      if (focus === editor.id) {
        eventEditorActions.focus(null);
      }
      eventEditorActions.blur(editor.id);
      document.dispatchEvent(
        new CustomEvent(BLUR_EDITOR_EVENT, {
          detail: { id: editor.id }
        })
      );
    },
    onFocus: ({ editor }) => {
      eventEditorActions.focus(editor.id);
      document.dispatchEvent(
        new CustomEvent(FOCUS_EDITOR_EVENT, {
          detail: { id: editor.id }
        })
      );
    }
  }
});

// src/react/plugins/event-editor/getEventPlateId.ts
var getEventPlateId = (id) => {
  var _a;
  if (id) return id;
  const focus = eventEditorSelectors.focus();
  if (focus) return focus;
  const blur = eventEditorSelectors.blur();
  if (blur) return blur;
  return (_a = eventEditorSelectors.last()) != null ? _a : "plate";
};

// src/react/plugins/paragraph/ParagraphPlugin.tsx
import { Key } from "@udecode/react-hotkeys";
var ParagraphPlugin = toPlatePlugin(
  BaseParagraphPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleParagraph: {
        keys: [
          [Key.Mod, Key.Alt, "0"],
          [Key.Mod, Key.Shift, "0"]
        ],
        preventDefault: true,
        handler: () => {
          editor.tf.toggle.block({ type });
        }
      }
    }
  })
);

// src/react/plugins/react/ReactPlugin.ts
import { focusEditorEdge, isEditorFocused } from "@udecode/slate-react";

// src/react/plugins/react/withPlateReact.ts
import { withReact } from "slate-react";
var withPlateReact = ({ editor }) => {
  return withReact(editor);
};

// src/react/plugins/react/ReactPlugin.ts
var ReactPlugin = createSlatePlugin({
  key: "dom",
  extendEditor: withPlateReact
}).extendEditorTransforms(({ editor }) => {
  const { reset } = editor.tf;
  return {
    reset: () => {
      const isFocused = isEditorFocused(editor);
      reset();
      if (isFocused) {
        focusEditorEdge(editor, { edge: "start" });
      }
    }
  };
});

// src/react/editor/getPlateCorePlugins.ts
var getPlateCorePlugins = () => [
  SlateReactNextPlugin,
  ReactPlugin,
  EventEditorPlugin,
  PlateApiPlugin,
  ParagraphPlugin
];

// src/react/editor/withPlate.ts
var withPlate = (e, _a = {}) => {
  var _b = _a, { plugins = [] } = _b, options = __objRest(_b, ["plugins"]);
  const editor = withSlate(e, __spreadProps(__spreadValues({}, options), {
    plugins: [...getPlateCorePlugins(), ...plugins]
  }));
  editor.useOptions = (plugin, selector, equalityFn) => {
    const store = editor.getOptionsStore(plugin);
    if (!store) {
      editor.api.debug.error(
        `editor.useOptions: ${plugin.key} plugin is missing`,
        "PLUGIN_MISSING"
      );
    }
    return store.useStore(selector, equalityFn);
  };
  editor.useOption = (plugin, key, ...args) => {
    const store = editor.getOptionsStore(plugin);
    if (!store) {
      editor.api.debug.error(
        `editor.useOption: ${plugin.key} plugin is missing`,
        "PLUGIN_MISSING"
      );
    }
    const useState = store == null ? void 0 : store.use[key];
    if (useState) {
      return useState(...args);
    }
    editor.api.debug.error(
      `editor.useOption: ${key} option is not defined in plugin ${plugin.key}`,
      "OPTION_UNDEFINED"
    );
  };
  return editor;
};
var createPlateEditor = (_a = {}) => {
  var _b = _a, {
    editor = createTEditor2()
  } = _b, options = __objRest(_b, [
    "editor"
  ]);
  return withPlate(editor, options);
};

// src/react/utils/createPlateFallbackEditor.ts
var createPlateFallbackEditor = (options = {}) => {
  const editor = createPlateEditor(options);
  editor.isFallback = true;
  editor.apply = () => {
    throw new Error(
      "Cannot apply operations on the fallback editor. The fallback editor is used when a hook that depends on the Plate store was unable to locate a valid store. If you are using PlateController, use `useEditorMounted(id?: string)` or `!editor.isFallback` to ensure that a valid Plate store is available before attempting to call operations on the editor."
    );
  };
  return editor;
};

// src/react/utils/dom-attributes.ts
var DOM_HANDLERS = [
  // Clipboard Events
  "onCopy",
  "onCopyCapture",
  "onCut",
  "onCutCapture",
  "onPaste",
  "onPasteCapture",
  // Composition Events
  "onCompositionEnd",
  "onCompositionEndCapture",
  "onCompositionStart",
  "onCompositionStartCapture",
  "onCompositionUpdate",
  "onCompositionUpdateCapture",
  // Focus Events
  "onFocus",
  "onFocusCapture",
  "onBlur",
  "onBlurCapture",
  // Form Events
  "onDOMBeforeInput",
  "onBeforeInput",
  "onBeforeInputCapture",
  "onInput",
  "onInputCapture",
  "onReset",
  "onResetCapture",
  "onSubmit",
  "onSubmitCapture",
  "onInvalid",
  "onInvalidCapture",
  // Image Events
  "onLoad",
  "onLoadCapture",
  // Keyboard Events
  "onKeyDown",
  "onKeyDownCapture",
  "onKeyPress",
  "onKeyPressCapture",
  "onKeyUp",
  "onKeyUpCapture",
  // Media Events
  "onAbort",
  "onAbortCapture",
  "onCanPlay",
  "onCanPlayCapture",
  "onCanPlayThrough",
  "onCanPlayThroughCapture",
  "onDurationChange",
  "onDurationChangeCapture",
  "onEmptied",
  "onEmptiedCapture",
  "onEncrypted",
  "onEncryptedCapture",
  "onEnded",
  "onEndedCapture",
  "onLoadedData",
  "onLoadedDataCapture",
  "onLoadedMetadata",
  "onLoadedMetadataCapture",
  "onLoadStart",
  "onLoadStartCapture",
  "onPause",
  "onPauseCapture",
  "onPlay",
  "onPlayCapture",
  "onPlaying",
  "onPlayingCapture",
  "onProgress",
  "onProgressCapture",
  "onRateChange",
  "onRateChangeCapture",
  "onSeeked",
  "onSeekedCapture",
  "onSeeking",
  "onSeekingCapture",
  "onStalled",
  "onStalledCapture",
  "onSuspend",
  "onSuspendCapture",
  "onTimeUpdate",
  "onTimeUpdateCapture",
  "onVolumeChange",
  "onVolumeChangeCapture",
  "onWaiting",
  "onWaitingCapture",
  // MouseEvents
  "onAuxClick",
  "onAuxClickCapture",
  "onClick",
  "onClickCapture",
  "onContextMenu",
  "onContextMenuCapture",
  "onDoubleClick",
  "onDoubleClickCapture",
  "onDrag",
  "onDragCapture",
  "onDragEnd",
  "onDragEndCapture",
  "onDragEnter",
  "onDragEnterCapture",
  "onDragExit",
  "onDragExitCapture",
  "onDragLeave",
  "onDragLeaveCapture",
  "onDragOver",
  "onDragOverCapture",
  "onDragStart",
  "onDragStartCapture",
  "onDrop",
  "onDropCapture",
  "onMouseDown",
  "onMouseDownCapture",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseMoveCapture",
  "onMouseOut",
  "onMouseOutCapture",
  "onMouseOver",
  "onMouseOverCapture",
  "onMouseUp",
  "onMouseUpCapture",
  // Selection Events
  "onSelect",
  "onSelectCapture",
  // Touch Events
  "onTouchCancel",
  "onTouchCancelCapture",
  "onTouchEnd",
  "onTouchEndCapture",
  "onTouchMove",
  "onTouchMoveCapture",
  "onTouchStart",
  "onTouchStartCapture",
  // Pointer Events
  "onPointerDown",
  "onPointerDownCapture",
  "onPointerMove",
  "onPointerUp",
  "onPointerUpCapture",
  "onPointerCancel",
  "onPointerCancelCapture",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOverCapture",
  "onPointerOut",
  "onPointerOutCapture",
  "onGotPointerCapture",
  "onGotPointerCaptureCapture",
  "onLostPointerCapture",
  "onLostPointerCaptureCapture",
  // UI Events
  "onScroll",
  "onScrollCapture",
  // Wheel Events
  "onWheel",
  "onWheelCapture",
  // Animation Events
  "onAnimationStart",
  "onAnimationStartCapture",
  "onAnimationEnd",
  "onAnimationEndCapture",
  "onAnimationIteration",
  "onAnimationIterationCapture",
  // Transition Events
  "onTransitionEnd",
  "onTransitionEndCapture"
];

// src/react/utils/getRenderNodeProps.ts
import { clsx as clsx2 } from "clsx";
import pick from "lodash/pick.js";
var getRenderNodeProps = ({
  attributes,
  editor,
  plugin,
  props
}) => {
  var _a, _b;
  let newProps = {};
  if (plugin.node.props) {
    newProps = (_a = typeof plugin.node.props === "function" ? plugin.node.props(props) : plugin.node.props) != null ? _a : {};
  }
  if (!newProps.nodeProps && attributes) {
    newProps.nodeProps = pick(
      attributes,
      (_b = plugin.node.dangerouslyAllowAttributes) != null ? _b : []
    );
  }
  props = __spreadValues(__spreadValues({}, props), newProps);
  if (props.nodeProps) {
    Object.keys(props.nodeProps).forEach((key) => {
      var _a2, _b2;
      if (((_a2 = props.nodeProps) == null ? void 0 : _a2[key]) === void 0) {
        (_b2 = props.nodeProps) == null ? true : delete _b2[key];
      }
    });
  }
  const { className } = props;
  return __spreadValues(__spreadProps(__spreadValues({}, props), {
    className: clsx2(getSlateClass(plugin.node.type), className)
  }), getEditorPlugin2(editor, plugin));
};

// src/react/utils/hotkeys.ts
import { isComposing } from "@udecode/slate-react";
var createComposing = (key) => (editor, event, {
  composing
} = {}) => {
  if (!createHotkey(key)(event)) return false;
  if (!!composing !== isComposing(editor)) return false;
  return true;
};
var Hotkeys2 = __spreadProps(__spreadValues({}, Hotkeys), {
  isTab: createComposing("tab"),
  isUntab: createComposing("untab")
});

// src/react/utils/pipeDecorate.ts
var pipeDecorate = (editor, decorateProp) => {
  const relevantPlugins = editor.pluginList.filter((plugin) => plugin.decorate);
  if (relevantPlugins.length === 0 && !decorateProp) return;
  return (entry) => {
    let ranges = [];
    const addRanges = (newRanges) => {
      if (newRanges == null ? void 0 : newRanges.length) ranges = [...ranges, ...newRanges];
    };
    relevantPlugins.forEach((plugin) => {
      addRanges(
        plugin.decorate(__spreadProps(__spreadValues({}, getEditorPlugin2(editor, plugin)), {
          entry
        }))
      );
    });
    if (decorateProp) {
      addRanges(
        decorateProp({
          editor,
          entry
        })
      );
    }
    return ranges;
  };
};

// src/react/utils/pipeHandler.ts
var convertDomEventToSyntheticEvent = (domEvent) => {
  let propagationStopped = false;
  return __spreadProps(__spreadValues({}, domEvent), {
    bubbles: domEvent.bubbles,
    cancelable: domEvent.cancelable,
    currentTarget: domEvent.currentTarget,
    defaultPrevented: domEvent.defaultPrevented,
    eventPhase: domEvent.eventPhase,
    isDefaultPrevented: () => domEvent.defaultPrevented,
    isPropagationStopped: () => propagationStopped,
    isTrusted: domEvent.isTrusted,
    nativeEvent: domEvent,
    persist: () => {
      throw new Error(
        "persist is not implemented for synthetic events created using convertDomEventToSyntheticEvent"
      );
    },
    preventDefault: () => domEvent.preventDefault(),
    stopPropagation: () => {
      propagationStopped = true;
      domEvent.stopPropagation();
    },
    target: domEvent.target,
    timeStamp: domEvent.timeStamp,
    type: domEvent.type
  });
};
var isEventHandled = (event, handler) => {
  if (!handler) {
    return false;
  }
  const shouldTreatEventAsHandled = handler(event);
  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled;
  }
  return event.isPropagationStopped();
};
var pipeHandler = (editor, {
  editableProps,
  handlerKey
}) => {
  const propsHandler = editableProps == null ? void 0 : editableProps[handlerKey];
  const relevantPlugins = editor.pluginList.filter(
    (plugin) => {
      var _a;
      return (_a = plugin.handlers) == null ? void 0 : _a[handlerKey];
    }
  );
  if (relevantPlugins.length === 0 && !propsHandler) return;
  return (event) => {
    const isDomEvent = event instanceof Event;
    const handledEvent = isDomEvent ? convertDomEventToSyntheticEvent(event) : event;
    const eventIsHandled = relevantPlugins.some((plugin) => {
      const pluginHandler = plugin.handlers[handlerKey];
      const shouldTreatEventAsHandled = pluginHandler(__spreadProps(__spreadValues({}, getEditorPlugin2(editor, plugin)), {
        event: handledEvent
      }));
      if (shouldTreatEventAsHandled != null) {
        return shouldTreatEventAsHandled;
      }
      return false;
    });
    if (eventIsHandled) return true;
    return isEventHandled(handledEvent, propsHandler);
  };
};

// src/react/utils/pipeOnChange.ts
var pipeOnChange = (editor, value) => {
  return editor.pluginList.some((plugin) => {
    const handler = plugin.handlers.onChange;
    if (!handler) {
      return false;
    }
    const shouldTreatEventAsHandled = handler(__spreadProps(__spreadValues({}, getEditorPlugin2(editor, plugin)), {
      value
    }));
    if (shouldTreatEventAsHandled != null) {
      return shouldTreatEventAsHandled;
    }
    return false;
  });
};

// src/react/utils/pipeRenderElement.tsx
import React7 from "react";
import { DefaultElement as DefaultElement2 } from "slate-react";

// src/react/utils/pluginRenderElement.tsx
import React6 from "react";
import { DefaultElement } from "slate-react";

// src/react/stores/element/useElementStore.ts
var SCOPE_ELEMENT = "element";
var initialState = {
  element: null
};
var { ElementProvider, useElementStore } = createAtomStore(
  initialState,
  { name: "element" }
);

// src/react/utils/pluginRenderElement.tsx
var pluginRenderElement = (editor, plugin) => function render(nodeProps) {
  const {
    key,
    render: { node }
  } = plugin;
  const { children: _children, element } = nodeProps;
  if (element.type === plugin.node.type) {
    const Element = node != null ? node : DefaultElement;
    const aboveNodes = editor.pluginList.flatMap(
      (o) => {
        var _a, _b;
        return (_b = (_a = o.render) == null ? void 0 : _a.aboveNodes) != null ? _b : [];
      }
    );
    const belowNodes = editor.pluginList.flatMap(
      (o) => {
        var _a, _b;
        return (_b = (_a = o.render) == null ? void 0 : _a.belowNodes) != null ? _b : [];
      }
    );
    nodeProps = getRenderNodeProps({
      attributes: element.attributes,
      editor,
      plugin,
      props: nodeProps
    });
    let children = _children;
    belowNodes.forEach((withHOC2) => {
      const hoc = withHOC2(__spreadProps(__spreadValues({}, nodeProps), { key }));
      if (hoc) {
        children = hoc(__spreadProps(__spreadValues({}, nodeProps), { children }));
      }
    });
    let component = /* @__PURE__ */ React6.createElement(Element, __spreadValues({}, nodeProps), children);
    aboveNodes.forEach((withHOC2) => {
      const hoc = withHOC2(__spreadProps(__spreadValues({}, nodeProps), { key }));
      if (hoc) {
        component = hoc(__spreadProps(__spreadValues({}, nodeProps), { children: component }));
      }
    });
    return /* @__PURE__ */ React6.createElement(ElementProvider, { element, scope: key }, component);
  }
};

// src/react/utils/pipeRenderElement.tsx
var pipeRenderElement = (editor, renderElementProp) => {
  const renderElements = [];
  editor.pluginList.forEach((plugin) => {
    if (plugin.node.isElement) {
      renderElements.push(pluginRenderElement(editor, plugin));
    }
  });
  return function render(nodeProps) {
    const props = pipeInjectNodeProps(editor, nodeProps);
    let element;
    renderElements.some((renderElement) => {
      element = renderElement(props);
      return !!element;
    });
    if (element) return element;
    if (renderElementProp) {
      return renderElementProp(props);
    }
    return /* @__PURE__ */ React7.createElement(DefaultElement2, __spreadValues({}, props));
  };
};

// src/react/utils/pipeRenderLeaf.tsx
import React9 from "react";

// src/react/utils/pluginRenderLeaf.tsx
import React8 from "react";
var pluginRenderLeaf = (editor, plugin) => function render(nodeProps) {
  var _a;
  const {
    render: { node }
  } = plugin;
  const { children, leaf } = nodeProps;
  if (leaf[(_a = plugin.node.type) != null ? _a : plugin.key]) {
    const Leaf = node != null ? node : DefaultLeaf;
    const ctxProps = getRenderNodeProps({
      attributes: leaf.attributes,
      editor,
      plugin,
      props: nodeProps
    });
    return /* @__PURE__ */ React8.createElement(Leaf, __spreadValues({}, ctxProps), children);
  }
  return children;
};

// src/react/utils/pipeRenderLeaf.tsx
var pipeRenderLeaf = (editor, renderLeafProp) => {
  const renderLeafs = [];
  editor.pluginList.forEach((plugin) => {
    if (plugin.node.isLeaf && plugin.key) {
      renderLeafs.push(pluginRenderLeaf(editor, plugin));
    }
  });
  return function render(nodeProps) {
    const props = pipeInjectNodeProps(
      editor,
      nodeProps
    );
    renderLeafs.forEach((renderLeaf) => {
      const newChildren = renderLeaf(props);
      if (newChildren !== void 0) {
        props.children = newChildren;
      }
    });
    if (renderLeafProp) {
      return renderLeafProp(props);
    }
    return /* @__PURE__ */ React9.createElement(DefaultLeaf, __spreadValues({}, props));
  };
};

// src/react/stores/plate/selectors/useEditorRef.ts
var useEditorRef = (id, options = {}) => {
  var _a;
  return (_a = usePlateSelectors(id, __spreadValues({
    debugHookName: "useEditorRef"
  }, options)).editor()) != null ? _a : createPlateFallbackEditor();
};

// src/react/stores/plate/selectors/useEditorPlugin.ts
function useEditorPlugin(p, id) {
  const editor = useEditorRef(id);
  return getEditorPlugin2(editor, p);
}

// src/react/stores/plate/selectors/useEditorReadOnly.ts
var useEditorReadOnly = (id, options = {}) => {
  return !!usePlateSelectors(id, __spreadValues({
    debugHookName: "useEditorReadOnly"
  }, options)).readOnly();
};

// src/react/stores/plate/selectors/useEditorSelection.ts
var useEditorSelection = (id, options = {}) => usePlateSelectors(id, __spreadValues({
  debugHookName: "useEditorSelection"
}, options)).trackedSelection().selection;

// src/react/stores/plate/selectors/useEditorSelector.ts
import React10 from "react";
import { selectAtom } from "jotai/utils";
var useEditorSelector = (selector, deps, _a = {}) => {
  var _b = _a, {
    id,
    equalityFn = (a, b) => a === b
  } = _b, storeOptions = __objRest(_b, [
    "id",
    "equalityFn"
  ]);
  const selectorAtom = React10.useMemo(
    () => selectAtom(
      plateStore.atom.trackedEditor,
      ({ editor }, prev) => selector(editor, prev),
      equalityFn
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
  return usePlateSelectors(id, __spreadValues({
    debugHookName: "useEditorSelector"
  }, storeOptions)).atom(selectorAtom);
};

// src/react/stores/plate/selectors/useEditorState.ts
var useEditorState = (id, options = {}) => {
  return usePlateSelectors(id, __spreadValues({
    debugHookName: "useEditorState"
  }, options)).trackedEditor().editor;
};

// src/react/stores/plate/selectors/useEditorValue.ts
var useEditorValue = (id, options = {}) => usePlateSelectors(id, __spreadValues({
  debugHookName: "useEditorValue"
}, options)).trackedValue().value;

// src/react/stores/plate/selectors/useEditorVersion.ts
var useEditorVersion = (id, options = {}) => {
  return usePlateSelectors(id, __spreadValues({
    debugHookName: "useEditorVersion"
  }, options)).versionEditor();
};

// src/react/stores/plate/selectors/useSelectionVersion.ts
var useSelectionVersion = (id, options = {}) => {
  return usePlateSelectors(id, __spreadValues({
    debugHookName: "useSelectionVersion"
  }, options)).versionSelection();
};

// src/react/stores/plate/selectors/useValueVersion.ts
var useValueVersion = (id, options = {}) => {
  return usePlateSelectors(id, __spreadValues({
    debugHookName: "useValueVersion"
  }, options)).versionValue();
};

// src/react/stores/element/useElement.ts
var useElement = (pluginKey = SCOPE_ELEMENT) => {
  const editor = useEditorRef();
  const value = useElementStore(pluginKey).get.element();
  if (!value) {
    editor.api.debug.warn(
      `useElement(${pluginKey}) hook must be used inside the node component's context`,
      "USE_ELEMENT_CONTEXT"
    );
    return {};
  }
  return value;
};

// src/react/stores/event-editor/useEventPlateId.ts
var useEventPlateId = (id) => {
  var _a;
  const focus = useEventEditorSelectors.focus();
  const blur = useEventEditorSelectors.blur();
  const last = useEventEditorSelectors.last();
  const providerId = usePlateSelectors().editor().id;
  if (id) return id;
  if (focus) return focus;
  if (blur) return blur;
  return (_a = last != null ? last : providerId) != null ? _a : PLATE_SCOPE;
};

// src/react/components/EditorHotkeysEffect.tsx
function EditorHotkeysEffect({
  id,
  editableRef
}) {
  const editor = useEditorRef(id);
  return /* @__PURE__ */ React11.createElement(React11.Fragment, null, Object.entries(editor.shortcuts).map(([hotkeyString, hotkeyConfig]) => {
    if (!hotkeyConfig || !isDefined4(hotkeyConfig.keys) || !hotkeyConfig.handler) {
      return null;
    }
    return /* @__PURE__ */ React11.createElement(
      HotkeyEffect,
      {
        id,
        key: hotkeyString,
        editableRef,
        hotkeyConfig
      }
    );
  }));
}
function HotkeyEffect({
  id,
  editableRef,
  hotkeyConfig
}) {
  const editor = useEditorRef(id);
  const _a = hotkeyConfig, { keys, handler } = _a, options = __objRest(_a, ["keys", "handler"]);
  const setHotkeyRef = useHotkeys(
    keys,
    (event, eventDetails) => {
      handler({
        editor,
        event,
        eventDetails
      });
    },
    __spreadValues({
      enableOnContentEditable: true
    }, options),
    []
  );
  useEffect2(() => {
    if (editableRef.current) {
      setHotkeyRef(editableRef.current);
    }
  }, [setHotkeyRef, editableRef]);
  return null;
}

// src/react/components/EditorMethodsEffect.ts
import React12 from "react";
var EditorMethodsEffect = ({ id }) => {
  const editor = useEditorRef(id);
  const redecorate = useRedecorate(id);
  const plateStore2 = usePlateStore(id);
  const storeSetters = Object.fromEntries(
    EXPOSED_STORE_KEYS.map((key) => [key, plateStore2.set[key]()])
  );
  const memorizedStoreSetters = React12.useMemo(
    () => storeSetters,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  React12.useEffect(() => {
    editor.api.redecorate = redecorate;
    editor.setPlateState = (optionKey, value) => {
      var _a;
      const setter = memorizedStoreSetters;
      (_a = setter[optionKey]) == null ? void 0 : _a.call(setter, value);
    };
  }, [editor, redecorate, memorizedStoreSetters]);
  return null;
};

// src/react/components/EditorRefEffect.tsx
import React13 from "react";
function EditorRefPluginEffect({
  id,
  plugin
}) {
  var _a;
  const editor = useEditorRef(id);
  (_a = plugin.useHooks) == null ? void 0 : _a.call(plugin, getEditorPlugin2(editor, plugin));
  return null;
}
function EditorRefEffect({ id }) {
  const editor = usePlateSelectors(id).editor();
  const setIsMounted = usePlateActions(id).isMounted();
  React13.useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, [setIsMounted]);
  return /* @__PURE__ */ React13.createElement(React13.Fragment, null, editor.pluginList.map((plugin) => /* @__PURE__ */ React13.createElement(EditorRefPluginEffect, { id, key: plugin.key, plugin })));
}

// src/react/components/EditorStateEffect.tsx
import React14 from "react";
import { Range } from "slate";
import { useSlate } from "slate-react";
var EditorStateEffect = React14.memo(({ id }) => {
  const editorState = useSlate();
  const updateVersionEditor = useIncrementVersion("versionEditor", id);
  React14.useEffect(() => {
    updateVersionEditor();
  });
  const updateVersionSelection = useIncrementVersion("versionSelection", id);
  const prevSelectionRef = React14.useRef(editorState.selection);
  const sameSelection = isSelectionEqual(
    prevSelectionRef.current,
    editorState.selection
  );
  React14.useEffect(() => {
    if (!sameSelection) {
      updateVersionSelection();
    }
    prevSelectionRef.current = editorState.selection;
  }, [editorState.selection, sameSelection, updateVersionSelection]);
  return null;
});
var isSelectionEqual = (a, b) => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return Range.equals(a, b);
};

// src/react/components/Plate.tsx
import React15 from "react";
function PlateInner({
  children,
  decorate,
  editor,
  primary,
  readOnly,
  renderElement,
  renderLeaf,
  onChange,
  onSelectionChange,
  onValueChange
}) {
  return /* @__PURE__ */ React15.createElement(
    PlateStoreProvider,
    {
      readOnly,
      onChange,
      onSelectionChange,
      onValueChange,
      decorate,
      editor,
      primary,
      renderElement,
      renderLeaf,
      scope: editor.id
    },
    children
  );
}
function Plate(props) {
  if (!props.editor) return null;
  return /* @__PURE__ */ React15.createElement(PlateInner, __spreadValues({ key: props.editor.key }, props));
}

// src/react/components/PlateContent.tsx
import React20, { useRef } from "react";
import { useComposedRef } from "@udecode/react-utils";
import { Editable } from "slate-react";

// src/react/hooks/useEditableProps.ts
import React16 from "react";
import { isDefined as isDefined5 } from "@udecode/utils";
import omit from "lodash/omit.js";
import { useDeepCompareMemo } from "use-deep-compare";
var useEditableProps = (editableProps = {}) => {
  const { id } = editableProps;
  const editor = useEditorRef(id);
  const selectors = usePlateSelectors(id);
  const versionDecorate = selectors.versionDecorate();
  const readOnly = selectors.readOnly();
  const storeDecorate = selectors.decorate();
  const storeRenderLeaf = selectors.renderLeaf();
  const storeRenderElement = selectors.renderElement();
  const decorateMemo = React16.useMemo(() => {
    return pipeDecorate(editor, storeDecorate != null ? storeDecorate : editableProps == null ? void 0 : editableProps.decorate);
  }, [editableProps == null ? void 0 : editableProps.decorate, editor, storeDecorate]);
  const decorate = React16.useMemo(() => {
    if (!versionDecorate || !decorateMemo) return;
    return (entry) => decorateMemo(entry);
  }, [decorateMemo, versionDecorate]);
  const renderElement = React16.useMemo(() => {
    return pipeRenderElement(
      editor,
      storeRenderElement != null ? storeRenderElement : editableProps == null ? void 0 : editableProps.renderElement
    );
  }, [editableProps == null ? void 0 : editableProps.renderElement, editor, storeRenderElement]);
  const renderLeaf = React16.useMemo(() => {
    return pipeRenderLeaf(editor, storeRenderLeaf != null ? storeRenderLeaf : editableProps == null ? void 0 : editableProps.renderLeaf);
  }, [editableProps == null ? void 0 : editableProps.renderLeaf, editor, storeRenderLeaf]);
  const props = useDeepCompareMemo(() => {
    const _props = {
      decorate,
      renderElement,
      renderLeaf
    };
    if (isDefined5(readOnly)) {
      _props.readOnly = readOnly;
    }
    DOM_HANDLERS.forEach((handlerKey) => {
      const handler = pipeHandler(editor, {
        editableProps,
        handlerKey
      });
      if (handler) {
        _props[handlerKey] = handler;
      }
    });
    return _props;
  }, [decorate, editableProps, renderElement, renderLeaf, readOnly]);
  return useDeepCompareMemo(
    () => __spreadValues(__spreadValues({}, omit(editableProps, [
      ...DOM_HANDLERS,
      "renderElement",
      "renderLeaf",
      "decorate"
    ])), props),
    [editableProps, props]
  );
};

// src/react/hooks/useSlateProps.ts
import React17 from "react";
var useSlateProps = ({
  id
}) => {
  const editor = useEditorRef(id);
  const onChangeProp = usePlateSelectors(id).onChange();
  const onValueChangeProp = usePlateSelectors(id).onValueChange();
  const onSelectionChangeProp = usePlateSelectors(id).onSelectionChange();
  const onChange = React17.useCallback(
    (newValue) => {
      const eventIsHandled = pipeOnChange(editor, newValue);
      if (!eventIsHandled) {
        onChangeProp == null ? void 0 : onChangeProp({ editor, value: newValue });
      }
    },
    [editor, onChangeProp]
  );
  const onValueChange = React17.useMemo(
    () => (value) => {
      onValueChangeProp == null ? void 0 : onValueChangeProp({ editor, value });
    },
    [editor, onValueChangeProp]
  );
  const onSelectionChange = React17.useMemo(
    () => (selection) => {
      onSelectionChangeProp == null ? void 0 : onSelectionChangeProp({ editor, selection });
    },
    [editor, onSelectionChangeProp]
  );
  return React17.useMemo(() => {
    return {
      key: editor.key,
      editor,
      initialValue: editor.children,
      value: editor.children,
      onChange,
      onSelectionChange,
      onValueChange
    };
  }, [editor, onChange, onSelectionChange, onValueChange]);
};

// src/react/components/PlateControllerEffect.ts
import React18 from "react";
import { focusAtom } from "jotai-optics";
import { useFocused } from "slate-react";
var PlateControllerEffect = ({
  id: idProp
}) => {
  const idFromStore = useEditorId();
  const id = idProp != null ? idProp : idFromStore;
  const currentStoreAtom = React18.useMemo(
    () => focusAtom(
      plateControllerStore.atom.editorStores,
      (optic) => optic.prop(id)
    ),
    [id]
  );
  const setCurrentStore = usePlateControllerActions().atom(currentStoreAtom, {
    warnIfNoStore: false
  });
  const store = usePlateStore(id).store();
  const primary = usePlateSelectors(id).primary();
  const setPrimaryEditorIds = usePlateControllerActions().primaryEditorIds({
    warnIfNoStore: false
  });
  const focused = useFocused();
  const setActiveId = usePlateControllerActions().activeId({
    warnIfNoStore: false
  });
  React18.useEffect(() => {
    setCurrentStore(store != null ? store : null);
    return () => {
      setCurrentStore(null);
      setActiveId((activeId) => activeId === id ? null : activeId);
    };
  }, [store, setCurrentStore, setActiveId, id]);
  React18.useEffect(() => {
    if (primary) {
      setPrimaryEditorIds((ids) => [...ids, id]);
      return () => {
        setPrimaryEditorIds((ids) => ids.filter((i) => i !== id));
      };
    }
  }, [id, primary, setPrimaryEditorIds]);
  React18.useEffect(() => {
    if (id && focused) {
      setActiveId(id);
    }
  }, [id, focused, setActiveId]);
  return null;
};

// src/react/components/PlateSlate.tsx
import React19 from "react";
import { Slate } from "slate-react";
function PlateSlate({
  id,
  children
}) {
  var _a;
  const slateProps = useSlateProps({ id });
  const editor = useEditorRef(id);
  let aboveSlate = /* @__PURE__ */ React19.createElement(Slate, __spreadValues({}, slateProps), children);
  (_a = editor.pluginList) == null ? void 0 : _a.forEach((plugin) => {
    const {
      render: { aboveSlate: AboveSlate }
    } = plugin;
    if (AboveSlate) aboveSlate = /* @__PURE__ */ React19.createElement(AboveSlate, null, aboveSlate);
  });
  return aboveSlate;
}

// src/react/components/PlateContent.tsx
var PlateContent = React20.forwardRef(
  (_a, ref) => {
    var _b = _a, { renderEditable } = _b, props = __objRest(_b, ["renderEditable"]);
    const { id } = props;
    const editor = useEditorRef(id);
    if (!editor) {
      throw new Error(
        "Editor not found. Please ensure that PlateContent is rendered below Plate."
      );
    }
    const editableProps = useEditableProps(props);
    const editableRef = useRef(null);
    const combinedRef = useComposedRef(ref, editableRef);
    const editable = /* @__PURE__ */ React20.createElement(Editable, __spreadValues({ ref: combinedRef }, editableProps));
    let afterEditable = null;
    let beforeEditable = null;
    editor.pluginList.forEach((plugin) => {
      const {
        render: {
          afterEditable: AfterEditable,
          beforeEditable: BeforeEditable
        }
      } = plugin;
      if (AfterEditable) {
        afterEditable = /* @__PURE__ */ React20.createElement(React20.Fragment, null, afterEditable, /* @__PURE__ */ React20.createElement(AfterEditable, __spreadValues({}, editableProps)));
      }
      if (BeforeEditable) {
        beforeEditable = /* @__PURE__ */ React20.createElement(React20.Fragment, null, beforeEditable, /* @__PURE__ */ React20.createElement(BeforeEditable, __spreadValues({}, editableProps)));
      }
    });
    let aboveEditable = /* @__PURE__ */ React20.createElement(React20.Fragment, null, beforeEditable, renderEditable ? renderEditable(editable) : editable, /* @__PURE__ */ React20.createElement(EditorMethodsEffect, { id }), /* @__PURE__ */ React20.createElement(EditorHotkeysEffect, { id, editableRef }), /* @__PURE__ */ React20.createElement(EditorStateEffect, { id }), /* @__PURE__ */ React20.createElement(EditorRefEffect, { id }), /* @__PURE__ */ React20.createElement(PlateControllerEffect, { id }), afterEditable);
    editor.pluginList.forEach((plugin) => {
      const {
        render: { aboveEditable: AboveEditable }
      } = plugin;
      if (AboveEditable)
        aboveEditable = /* @__PURE__ */ React20.createElement(AboveEditable, null, aboveEditable);
    });
    return /* @__PURE__ */ React20.createElement(PlateSlate, { id }, aboveEditable);
  }
);
PlateContent.displayName = "PlateContent";

// src/react/components/PlateTest.tsx
import React22 from "react";

// src/react/editor/usePlateEditor.ts
import React21 from "react";
function usePlateEditor(options = {}, deps = []) {
  return React21.useMemo(
    () => {
      if (options.enabled === false) return null;
      const editor = createPlateEditor(options);
      return editor;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.id, options.enabled, ...deps]
  );
}

// src/react/components/PlateTest.tsx
function PlateTest(_a) {
  var _b = _a, {
    editableProps,
    shouldNormalizeEditor,
    variant = "wordProcessor"
  } = _b, props = __objRest(_b, [
    "editableProps",
    "shouldNormalizeEditor",
    "variant"
  ]);
  const { id, editor: _editor, plugins } = props;
  let editor = _editor;
  if (editor && !editor.pluginList) {
    editor = createPlateEditor({
      id,
      editor,
      plugins,
      shouldNormalizeEditor
    });
  }
  return /* @__PURE__ */ React22.createElement(Plate, __spreadProps(__spreadValues({}, props), { editor }), /* @__PURE__ */ React22.createElement(
    PlateContent,
    __spreadValues({
      "data-testid": "slate-content-editable",
      "data-variant": variant,
      autoFocus: true
    }, editableProps)
  ));
}

// src/react/components/withHOC.tsx
import React23 from "react";
var withHOC = (HOC, Component, hocProps, hocRef) => React23.forwardRef((props, componentRef) => /* @__PURE__ */ React23.createElement(HOC, __spreadProps(__spreadValues({}, hocProps), { ref: hocRef }), /* @__PURE__ */ React23.createElement(Component, __spreadProps(__spreadValues({}, props), { ref: componentRef }))));
export {
  BLUR_EDITOR_EVENT,
  DOM_HANDLERS,
  DefaultLeaf,
  EXPOSED_STORE_KEYS,
  EditorHotkeysEffect,
  EditorMethodsEffect,
  EditorRefEffect,
  EditorRefPluginEffect,
  EditorStateEffect,
  ElementProvider,
  EventEditorPlugin,
  EventEditorStore,
  FOCUS_EDITOR_EVENT,
  GLOBAL_PLATE_SCOPE,
  Hotkeys2 as Hotkeys,
  PLATE_SCOPE,
  ParagraphPlugin,
  Plate,
  PlateApiPlugin,
  PlateContent,
  PlateController,
  PlateControllerEffect,
  PlateSlate,
  PlateStoreProvider,
  PlateTest,
  ReactPlugin,
  SCOPE_ELEMENT,
  SlateReactNextPlugin,
  atom,
  convertDomEventToSyntheticEvent,
  createAtomStore,
  createPlateEditor,
  createPlateFallbackEditor,
  createPlatePlugin,
  createPlateStore,
  createTPlatePlugin,
  eventEditorActions,
  eventEditorSelectors,
  getEditorPlugin2 as getEditorPlugin,
  getEventPlateId,
  getPlateCorePlugins,
  getPlugin,
  getRenderNodeProps,
  isEventHandled,
  omitPluginContext,
  pipeDecorate,
  pipeHandler,
  pipeOnChange,
  pipeRenderElement,
  pipeRenderLeaf,
  plateControllerStore,
  plateStore,
  pluginRenderElement,
  pluginRenderLeaf,
  toPlatePlugin,
  toTPlatePlugin,
  useEditableProps,
  useEditorId,
  useEditorMounted,
  useEditorPlugin,
  useEditorReadOnly,
  useEditorRef,
  useEditorSelection,
  useEditorSelector,
  useEditorState,
  useEditorValue,
  useEditorVersion,
  useElement,
  useElementStore,
  useEventEditorSelectors,
  useEventPlateId,
  useFocusEditorEvents,
  useIncrementVersion,
  usePlateActions,
  usePlateControllerActions,
  usePlateControllerEditorStore,
  usePlateControllerExists,
  usePlateControllerSelectors,
  usePlateControllerStates,
  usePlateControllerStore,
  usePlateEditor,
  usePlateEditorStore,
  usePlateSelectors,
  usePlateStates,
  usePlateStore,
  useRedecorate,
  useSelectionVersion,
  useSlateProps,
  useValueVersion,
  withHOC,
  withPlate,
  withPlateReact
};
//# sourceMappingURL=index.mjs.map