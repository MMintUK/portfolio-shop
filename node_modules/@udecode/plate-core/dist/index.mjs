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
var getKeysByTypes = (editor, types) => {
  return Object.values(editor.plugins).filter((plugin) => types.includes(plugin.node.type)).map((plugin) => plugin.key);
};
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

// src/lib/plugins/html/constants.ts
var CARRIAGE_RETURN = "\r";
var LINE_FEED = "\n";
var NO_BREAK_SPACE = "\xA0";
var SPACE = " ";
var TAB = "	";
var ZERO_WIDTH_SPACE = "\u200B";

// src/lib/plugins/html/utils/isHtmlElement.ts
var isHtmlElement = (node) => node.nodeType === Node.ELEMENT_NODE;

// src/lib/plugins/html/utils/traverseHtmlNode.ts
var traverseHtmlNode = (node, callback) => {
  const keepTraversing = callback(node);
  if (!keepTraversing) {
    return;
  }
  let child = node.firstChild;
  while (child) {
    const currentChild = child;
    const previousChild = child.previousSibling;
    child = child.nextSibling;
    traverseHtmlNode(currentChild, callback);
    if (
      // An unwrap was made. Need to compute the next child again.
      !currentChild.previousSibling && !currentChild.nextSibling && !currentChild.parentNode && child && previousChild !== child.previousSibling && child.parentNode
    ) {
      child = previousChild ? previousChild.nextSibling : node.firstChild;
    } else if (
      // A list was created. Need to compute the next child again.
      !currentChild.previousSibling && !currentChild.nextSibling && !currentChild.parentNode && child && !child.previousSibling && !child.nextSibling && !child.parentNode
    ) {
      if (previousChild) {
        child = previousChild.nextSibling ? previousChild.nextSibling.nextSibling : null;
      } else if (node.firstChild) {
        child = node.firstChild.nextSibling;
      }
    }
  }
};

// src/lib/plugins/html/utils/traverseHtmlElements.ts
var traverseHtmlElements = (rootNode, callback) => {
  traverseHtmlNode(rootNode, (node) => {
    if (!isHtmlElement(node)) {
      return true;
    }
    return callback(node);
  });
};

// src/lib/plugins/html/utils/cleanHtmlBrElements.ts
var cleanHtmlBrElements = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    if (element.tagName !== "BR") {
      return true;
    }
    const replacementTextNode = document.createTextNode(LINE_FEED);
    if (element.parentElement) {
      element.parentElement.replaceChild(replacementTextNode, element);
    }
    return false;
  });
};

// src/lib/plugins/html/utils/cleanHtmlCrLf.ts
var cleanHtmlCrLf = (html) => {
  return html.replaceAll(/\r\n|\r/g, "\n");
};

// src/lib/plugins/html/utils/cleanHtmlEmptyElements.ts
var ALLOWED_EMPTY_ELEMENTS = /* @__PURE__ */ new Set(["BR", "IMG", "TD", "TH"]);
var isEmpty = (element) => {
  return !ALLOWED_EMPTY_ELEMENTS.has(element.nodeName) && !element.innerHTML.trim();
};
var removeIfEmpty = (element) => {
  if (isEmpty(element)) {
    const { parentElement } = element;
    element.remove();
    if (parentElement) {
      removeIfEmpty(parentElement);
    }
  }
};
var cleanHtmlEmptyElements = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    removeIfEmpty(element);
    return true;
  });
};

// src/lib/plugins/html/utils/replaceTagName.ts
var replaceTagName = (element, tagName) => {
  const newElement = document.createElement(tagName);
  newElement.innerHTML = element.innerHTML;
  for (const { name } of element.attributes) {
    const value = element.getAttribute(name);
    if (value) {
      newElement.setAttribute(name, value);
    }
  }
  if (element.parentNode) {
    element.parentNode.replaceChild(newElement, element);
  }
  return newElement;
};

// src/lib/plugins/html/utils/cleanHtmlFontElements.ts
var cleanHtmlFontElements = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    if (element.tagName === "FONT") {
      if (element.textContent) {
        replaceTagName(element, "span");
      } else {
        element.remove();
      }
    }
    return true;
  });
};

// src/lib/plugins/html/utils/isHtmlFragmentHref.ts
var isHtmlFragmentHref = (href) => href.startsWith("#");

// src/lib/plugins/html/utils/unwrapHtmlElement.ts
var unwrapHtmlElement = (element) => {
  element.outerHTML = element.innerHTML;
};

// src/lib/plugins/html/utils/cleanHtmlLinkElements.ts
var cleanHtmlLinkElements = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    if (element.tagName !== "A") {
      return true;
    }
    const href = element.getAttribute("href");
    if (!href || isHtmlFragmentHref(href)) {
      unwrapHtmlElement(element);
    }
    if (href && element.querySelector("img")) {
      for (const span of element.querySelectorAll("span")) {
        if (!span.textContent) {
          unwrapHtmlElement(span);
        }
      }
    }
    return true;
  });
};

// src/lib/plugins/html/utils/isHtmlText.ts
var isHtmlText = (node) => node.nodeType === Node.TEXT_NODE;

// src/lib/plugins/html/utils/traverseHtmlTexts.ts
var traverseHtmlTexts = (rootNode, callback) => {
  traverseHtmlNode(rootNode, (node) => {
    if (!isHtmlText(node)) {
      return true;
    }
    return callback(node);
  });
};

// src/lib/plugins/html/utils/cleanHtmlTextNodes.ts
var cleanHtmlTextNodes = (rootNode) => {
  traverseHtmlTexts(rootNode, (textNode) => {
    if (/^\n\s*$/.test(textNode.data) && (textNode.previousElementSibling || textNode.nextElementSibling)) {
      textNode.remove();
      return true;
    }
    textNode.data = textNode.data.replaceAll(/\n\s*/g, "\n");
    if (textNode.data.includes(CARRIAGE_RETURN) || textNode.data.includes(LINE_FEED) || textNode.data.includes(NO_BREAK_SPACE)) {
      const hasSpace = textNode.data.includes(SPACE);
      const hasNonWhitespace = /\S/.test(textNode.data);
      const hasLineFeed = textNode.data.includes(LINE_FEED);
      if (!(hasSpace || hasNonWhitespace) && !hasLineFeed) {
        if (textNode.data === NO_BREAK_SPACE) {
          textNode.data = SPACE;
          return true;
        }
        textNode.remove();
        return true;
      }
      if (textNode.previousSibling && textNode.previousSibling.nodeName === "BR" && textNode.parentElement) {
        textNode.previousSibling.remove();
        const matches = /^[\n\r]+/.exec(textNode.data);
        const offset = matches ? matches[0].length : 0;
        textNode.data = textNode.data.slice(Math.max(0, offset)).replaceAll(new RegExp(LINE_FEED, "g"), SPACE).replaceAll(new RegExp(CARRIAGE_RETURN, "g"), SPACE);
        textNode.data = `
${textNode.data}`;
      } else {
        textNode.data = textNode.data.replaceAll(new RegExp(LINE_FEED, "g"), SPACE).replaceAll(new RegExp(CARRIAGE_RETURN, "g"), SPACE);
      }
    }
    return true;
  });
};

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

// src/lib/plugins/html/utils/isHtmlTable.ts
var isHtmlTable = (element) => element.nodeName === "TABLE";

// src/lib/plugins/html/utils/copyBlockMarksToSpanChild.ts
var copyBlockMarksToSpanChild = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    const el = element;
    const styleAttribute = element.getAttribute("style");
    if (!styleAttribute) return true;
    if (isHtmlBlockElement(el) && !isHtmlTable(el)) {
      const {
        style: {
          backgroundColor,
          color,
          fontFamily,
          fontSize,
          fontStyle,
          fontWeight,
          textDecoration
        }
      } = el;
      if (backgroundColor || color || fontFamily || fontSize || fontStyle || fontWeight || textDecoration) {
        const span = document.createElement("span");
        if (!["inherit", "initial"].includes(color)) {
          span.style.color = color;
        }
        span.style.fontFamily = fontFamily;
        span.style.fontSize = fontSize;
        if (!["inherit", "initial", "normal"].includes(color)) {
          span.style.fontStyle = fontStyle;
        }
        if (![400, "normal"].includes(fontWeight)) {
          span.style.fontWeight = fontWeight;
        }
        span.style.textDecoration = textDecoration;
        span.innerHTML = el.innerHTML;
        element.innerHTML = span.outerHTML;
      }
    }
    return true;
  });
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

// src/lib/plugins/html/utils/findHtmlElement.ts
var findHtmlElement = (rootNode, predicate) => {
  let res = null;
  traverseHtmlElements(rootNode, (node) => {
    if (predicate(node)) {
      res = node;
      return false;
    }
    return true;
  });
  return res;
};
var someHtmlElement = (rootNode, predicate) => {
  return !!findHtmlElement(rootNode, predicate);
};

// src/lib/plugins/html/utils/getHtmlComments.ts
var acceptNode = () => NodeFilter.FILTER_ACCEPT;
var getHtmlComments = (node) => {
  const comments = [];
  const iterator = document.createNodeIterator(node, NodeFilter.SHOW_COMMENT, {
    acceptNode
  });
  let currentNode = iterator.nextNode();
  while (currentNode) {
    if (currentNode.nodeValue) {
      comments.push(currentNode.nodeValue);
    }
    currentNode = iterator.nextNode();
  }
  return comments;
};

// src/lib/plugins/html/utils/isHtmlComment.ts
var isHtmlComment = (node) => node.nodeType === Node.COMMENT_NODE;

// src/lib/plugins/html/utils/isOlSymbol.ts
var isOlSymbol = (symbol) => {
  return /[\da-np-z]\S/.test(symbol.toLowerCase());
};

// src/lib/plugins/html/utils/parseHtmlDocument.ts
var parseHtmlDocument = (html) => {
  return new DOMParser().parseFromString(html, "text/html");
};

// src/lib/plugins/html/utils/parseHtmlElement.ts
var parseHtmlElement = (html) => {
  const { body } = parseHtmlDocument(html);
  return body.firstElementChild;
};

// src/lib/plugins/html/utils/postCleanHtml.ts
var postCleanHtml = (html) => {
  const cleanHtml = html.trim().replaceAll(new RegExp(ZERO_WIDTH_SPACE, "g"), "");
  return `<body>${cleanHtml}</body>`;
};

// src/lib/plugins/html/utils/removeHtmlSurroundings.ts
var removeBeforeHtml = (html) => {
  const index = html.indexOf("<html");
  if (index === -1) {
    return html;
  }
  return html.slice(Math.max(0, index));
};
var removeAfterHtml = (html) => {
  const index = html.lastIndexOf("</html>");
  if (index === -1) {
    return html;
  }
  return html.slice(0, Math.max(0, index + "</html>".length));
};
var removeHtmlSurroundings = (html) => {
  return removeBeforeHtml(removeAfterHtml(html));
};

// src/lib/plugins/html/utils/preCleanHtml.ts
var cleaners = [removeHtmlSurroundings, cleanHtmlCrLf];
var preCleanHtml = (html) => {
  return cleaners.reduce((result, clean) => clean(result), html);
};

// src/lib/plugins/html/utils/traverseHtmlComments.ts
var traverseHtmlComments = (rootNode, callback) => {
  traverseHtmlNode(rootNode, (node) => {
    if (!isHtmlComment(node)) {
      return true;
    }
    return callback(node);
  });
};

// src/lib/plugins/html/utils/removeHtmlNodesBetweenComments.ts
var removeHtmlNodesBetweenComments = (rootNode, start, end) => {
  const isClosingComment = (node) => isHtmlComment(node) && node.data === end;
  traverseHtmlComments(rootNode, (comment) => {
    if (comment.data === start) {
      let node = comment.nextSibling;
      comment.remove();
      while (node && !isClosingComment(node)) {
        const { nextSibling } = node;
        node.remove();
        node = nextSibling;
      }
      if (node && isClosingComment(node)) {
        node.remove();
      }
    }
    return true;
  });
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

// src/lib/utils/overridePluginsByKey.ts
import defaultsDeep from "lodash/defaultsDeep.js";
var overridePluginsByKey = (plugin, overrideByKey = {}, nested = false) => {
  if (overrideByKey[plugin.key]) {
    const _a = overrideByKey[plugin.key], {
      __extensions: pluginOverridesExtensions,
      plugins: pluginOverridesPlugins
    } = _a, pluginOverrides = __objRest(_a, [
      "__extensions",
      "plugins"
    ]);
    plugin = defaultsDeep({}, pluginOverrides, plugin);
    if (pluginOverridesExtensions) {
      plugin.__extensions = [
        ...plugin.__extensions || [],
        ...pluginOverridesExtensions
      ];
    }
    if (!nested) {
      pluginOverridesPlugins == null ? void 0 : pluginOverridesPlugins.forEach((pOverrides) => {
        if (!plugin.plugins) plugin.plugins = [];
        const found = plugin.plugins.find((p) => p.key === pOverrides.key);
        if (!found) plugin.plugins.push(pOverrides);
      });
    }
  }
  if (plugin.plugins) {
    plugin.plugins = plugin.plugins.map(
      (p) => overridePluginsByKey(p, overrideByKey, true)
    );
  }
  return plugin;
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

// src/lib/utils/resolveCreatePluginTest.ts
var resolvePluginTest = (p) => {
  const editor = createSlateEditor({
    plugins: [p]
  });
  let key = p.key;
  if (!key) {
    key = resolvePlugin(editor, p).key;
  }
  return editor.plugins[key];
};
var resolveCreatePluginTest = (plugin) => {
  const p = createSlatePlugin(plugin);
  const editor = createSlateEditor({
    plugins: [p]
  });
  let key = p.key;
  if (!key) {
    key = resolvePlugin(editor, p).key;
  }
  return editor.plugins[key];
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

// src/lib/utils/misc/callOrReturn.ts
function callOrReturn(value, ...props) {
  if (isFunction(value)) {
    return value(...props);
  }
  return value;
}

// src/lib/utils/misc/getSlateClass.ts
var getSlateClass = (type) => `slate-${type}`;

// src/lib/utils/misc/mergeDeep.ts
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
function isPlainObject(value) {
  if (getType(value) !== "Object") {
    return false;
  }
  return value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
}
function mergeDeep(target, source) {
  const output = __spreadValues({}, target);
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      output[key] = isPlainObject(source[key]) && isPlainObject(target[key]) ? mergeDeep(target[key], source[key]) : source[key];
    });
  }
  return output;
}

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
var getPluginTypes = (editor, plugins) => plugins.map((plugin) => editor.getType(plugin));

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
var createSlateEditor = (_a = {}) => {
  var _b = _a, {
    editor = createTEditor()
  } = _b, options = __objRest(_b, [
    "editor"
  ]);
  return withSlate(editor, options);
};

// src/lib/libs/nanoid.ts
import { nanoid } from "nanoid";

// src/lib/libs/zustand.ts
import { createZustandStore as createZustandStore2 } from "zustand-x";
export {
  AstPlugin,
  BaseParagraphPlugin,
  CARRIAGE_RETURN,
  DOMPlugin,
  DebugPlugin,
  HistoryPlugin,
  Hotkeys,
  HtmlPlugin,
  InlineVoidPlugin,
  LINE_FEED,
  LengthPlugin,
  NO_BREAK_SPACE,
  ParserPlugin,
  PlateError,
  SPACE,
  SlateNextPlugin,
  TAB,
  ZERO_WIDTH_SPACE,
  applyDeepToNodes,
  applyPluginsToEditor,
  callOrReturn,
  cleanHtmlBrElements,
  cleanHtmlCrLf,
  cleanHtmlEmptyElements,
  cleanHtmlFontElements,
  cleanHtmlLinkElements,
  cleanHtmlTextNodes,
  collapseString,
  collapseWhiteSpace,
  collapseWhiteSpaceChildren,
  collapseWhiteSpaceElement,
  collapseWhiteSpaceNode,
  collapseWhiteSpaceText,
  copyBlockMarksToSpanChild,
  createHotkey,
  createSlateEditor,
  createSlatePlugin,
  createTSlatePlugin,
  createZustandStore2 as createZustandStore,
  deserializeHtml,
  deserializeHtmlElement,
  deserializeHtmlNode,
  deserializeHtmlNodeChildren,
  endInlineFormattingContext,
  findHtmlElement,
  getCorePlugins,
  getEditorPlugin,
  getHtmlComments,
  getInjectedPlugins,
  getKeyByType,
  getKeysByTypes,
  getPluginType,
  getPluginTypes,
  getSlateClass,
  getSlatePlugin,
  htmlBodyToFragment,
  htmlBrToNewLine,
  htmlElementToElement,
  htmlElementToLeaf,
  htmlStringToDOMNode,
  htmlTextNodeToString,
  inferWhiteSpaceRule,
  inlineTagNames,
  isFunction,
  isHotkey,
  isHtmlBlockElement,
  isHtmlComment,
  isHtmlElement,
  isHtmlFragmentHref,
  isHtmlInlineElement,
  isHtmlTable,
  isHtmlText,
  isLastNonEmptyTextOfInlineFormattingContext,
  isOlSymbol,
  mergeDeep,
  mergeDeepToNodes,
  nanoid,
  normalizeDescendantsToDocumentFragment,
  overridePluginsByKey,
  parseHtmlDocument,
  parseHtmlElement,
  pipeDeserializeHtmlElement,
  pipeDeserializeHtmlLeaf,
  pipeInjectNodeProps,
  pipeInsertDataQuery,
  pipeInsertFragment,
  pipeNormalizeInitialValue,
  pipeTransformData,
  pipeTransformFragment,
  pluginDeserializeHtml,
  pluginInjectNodeProps,
  postCleanHtml,
  preCleanHtml,
  removeHtmlNodesBetweenComments,
  removeHtmlSurroundings,
  replaceTagName,
  resetEditor,
  resetEditorChildren,
  resolveAndSortPlugins,
  resolveCreatePluginTest,
  resolvePlugin,
  resolvePluginOverrides,
  resolvePluginTest,
  resolvePlugins,
  someHtmlElement,
  toggleBlock,
  traverseHtmlComments,
  traverseHtmlElements,
  traverseHtmlNode,
  traverseHtmlTexts,
  unwrapHtmlElement,
  upsertInlineFormattingContext,
  validatePlugin,
  withInlineVoid,
  withLength,
  withParser,
  withPlateHistory,
  withSlate,
  withSlateNext
};
//# sourceMappingURL=index.mjs.map