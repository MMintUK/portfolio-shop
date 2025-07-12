"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  AudioPlugin: () => AudioPlugin,
  FilePlugin: () => FilePlugin,
  FloatingMedia: () => FloatingMedia,
  FloatingMediaEditButton: () => FloatingMediaEditButton,
  FloatingMediaStore: () => FloatingMediaStore,
  FloatingMediaUrlInput: () => FloatingMediaUrlInput,
  Image: () => Image,
  ImagePlugin: () => ImagePlugin,
  ImagePreviewStore: () => ImagePreviewStore,
  MediaEmbedPlugin: () => MediaEmbedPlugin,
  MediaProvider: () => MediaProvider,
  PlaceholderPlugin: () => PlaceholderPlugin,
  PlaceholderProvider: () => PlaceholderProvider,
  PreviewImage: () => PreviewImage,
  VideoPlugin: () => VideoPlugin,
  floatingMediaActions: () => floatingMediaActions,
  floatingMediaSelectors: () => floatingMediaSelectors,
  imagePreviewActions: () => imagePreviewActions,
  imagePreviewSelectors: () => imagePreviewSelectors,
  mediaStore: () => mediaStore,
  openImagePreview: () => openImagePreview,
  placeholderStore: () => placeholderStore,
  submitFloatingMedia: () => submitFloatingMedia,
  useFloatingMediaEditButton: () => useFloatingMediaEditButton,
  useFloatingMediaSelectors: () => useFloatingMediaSelectors,
  useFloatingMediaUrlInput: () => useFloatingMediaUrlInput,
  useFloatingMediaUrlInputState: () => useFloatingMediaUrlInputState,
  useImage: () => useImage,
  useImagePreview: () => useImagePreview,
  useImagePreviewSelectors: () => useImagePreviewSelectors,
  useImagePreviewState: () => useImagePreviewState,
  useMediaController: () => useMediaController,
  useMediaControllerDropDownMenu: () => useMediaControllerDropDownMenu,
  useMediaControllerState: () => useMediaControllerState,
  useMediaState: () => useMediaState,
  useMediaStore: () => useMediaStore,
  useMediaToolbarButton: () => useMediaToolbarButton,
  usePlaceholderElementState: () => usePlaceholderElementState,
  usePlaceholderPopoverState: () => usePlaceholderPopoverState,
  usePlaceholderStore: () => usePlaceholderStore,
  usePreviewImage: () => usePreviewImage,
  usePreviewImageState: () => usePreviewImageState,
  useScaleInput: () => useScaleInput,
  useScaleInputState: () => useScaleInputState,
  useZoom: () => useZoom
});
module.exports = __toCommonJS(react_exports);

// src/react/plugins.ts
var import_react = require("@udecode/plate-common/react");

// src/lib/BaseAudioPlugin.ts
var import_plate_common = require("@udecode/plate-common");
var BaseAudioPlugin = (0, import_plate_common.createSlatePlugin)({
  key: "audio",
  node: { isElement: true, isVoid: true }
});

// src/lib/BaseFilePlugin.ts
var import_plate_common2 = require("@udecode/plate-common");
var BaseFilePlugin = (0, import_plate_common2.createSlatePlugin)({
  key: "file",
  node: { isElement: true, isVoid: true }
});

// src/lib/BaseVideoPlugin.ts
var import_plate_common3 = require("@udecode/plate-common");
var BaseVideoPlugin = (0, import_plate_common3.createSlatePlugin)({
  key: "video",
  node: {
    dangerouslyAllowAttributes: ["width", "height"],
    isElement: true,
    isVoid: true
  }
});

// src/lib/image/BaseImagePlugin.ts
var import_plate_common7 = require("@udecode/plate-common");

// src/lib/image/transforms/insertImage.ts
var import_plate_common4 = require("@udecode/plate-common");
var insertImage = (editor, url, options = {}) => {
  const text = { text: "" };
  const image = {
    children: [text],
    type: editor.getType(BaseImagePlugin),
    url
  };
  (0, import_plate_common4.insertNodes)(editor, image, __spreadValues({
    nextBlock: true
  }, options));
};

// src/lib/image/utils/isImageUrl.ts
var import_plate_common5 = require("@udecode/plate-common");
var imageExtensions = /* @__PURE__ */ new Set([
  "3dv",
  "PI1",
  "PI2",
  "PI3",
  "ai",
  "amf",
  "art",
  "art",
  "ase",
  "awg",
  "blp",
  "bmp",
  "bw",
  "bw",
  "cd5",
  "cdr",
  "cgm",
  "cit",
  "cmx",
  "cpt",
  "cr2",
  "cur",
  "cut",
  "dds",
  "dib",
  "djvu",
  "dxf",
  "e2d",
  "ecw",
  "egt",
  "egt",
  "emf",
  "eps",
  "exif",
  "fs",
  "gbr",
  "gif",
  "gpl",
  "grf",
  "hdp",
  "icns",
  "ico",
  "iff",
  "iff",
  "int",
  "int",
  "inta",
  "jfif",
  "jng",
  "jp2",
  "jpeg",
  "jpg",
  "jps",
  "jxr",
  "lbm",
  "lbm",
  "liff",
  "max",
  "miff",
  "mng",
  "msp",
  "nitf",
  "nrrd",
  "odg",
  "ota",
  "pam",
  "pbm",
  "pc1",
  "pc2",
  "pc3",
  "pcf",
  "pct",
  "pcx",
  "pcx",
  "pdd",
  "pdn",
  "pgf",
  "pgm",
  "pict",
  "png",
  "pnm",
  "pns",
  "ppm",
  "psb",
  "psd",
  "psp",
  "px",
  "pxm",
  "pxr",
  "qfx",
  "ras",
  "raw",
  "rgb",
  "rgb",
  "rgba",
  "rle",
  "sct",
  "sgi",
  "sgi",
  "sid",
  "stl",
  "sun",
  "svg",
  "sxd",
  "tga",
  "tga",
  "tif",
  "tiff",
  "v2d",
  "vnd",
  "vrml",
  "vtf",
  "wdp",
  "webp",
  "wmf",
  "x3d",
  "xar",
  "xbm",
  "xcf",
  "xpm"
]);
var isImageUrl = (url) => {
  if (!(0, import_plate_common5.isUrl)(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.has(ext);
};

// src/lib/image/withImageEmbed.ts
var withImageEmbed = ({
  editor,
  getOptions
}) => {
  const { insertData } = editor;
  editor.insertData = (dataTransfer) => {
    if (getOptions().disableEmbedInsert) {
      return insertData(dataTransfer);
    }
    const text = dataTransfer.getData("text/plain");
    if (isImageUrl(text)) {
      insertImage(editor, text);
      return;
    }
    insertData(dataTransfer);
  };
  return editor;
};

// src/lib/image/withImageUpload.ts
var import_plate_common6 = require("@udecode/plate-common");
var withImageUpload = ({
  editor,
  getOptions,
  plugin
}) => {
  const { insertData } = editor;
  editor.insertData = (dataTransfer) => {
    if (getOptions().disableUploadInsert) {
      return insertData(dataTransfer);
    }
    const text = dataTransfer.getData("text/plain");
    const { files } = dataTransfer;
    if (!text && files && files.length > 0) {
      const injectedPlugins = (0, import_plate_common6.getInjectedPlugins)(editor, plugin);
      if (!(0, import_plate_common6.pipeInsertDataQuery)(editor, injectedPlugins, {
        data: text,
        dataTransfer
      })) {
        return insertData(dataTransfer);
      }
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");
        if (mime === "image") {
          reader.addEventListener("load", async () => {
            if (!reader.result) {
              return;
            }
            const uploadImage = getOptions().uploadImage;
            const uploadedUrl = uploadImage ? await uploadImage(reader.result) : reader.result;
            insertImage(editor, uploadedUrl);
          });
          reader.readAsDataURL(file);
        }
      }
    } else {
      insertData(dataTransfer);
    }
  };
  return editor;
};

// src/lib/image/withImage.ts
var withImage = (_a) => {
  var _b = _a, { editor } = _b, ctx = __objRest(_b, ["editor"]);
  editor = withImageUpload(__spreadValues({ editor }, ctx));
  editor = withImageEmbed(__spreadValues({ editor }, ctx));
  return editor;
};

// src/lib/image/BaseImagePlugin.ts
var BaseImagePlugin = (0, import_plate_common7.createTSlatePlugin)({
  key: "img",
  extendEditor: withImage,
  node: {
    dangerouslyAllowAttributes: ["alt", "width", "height"],
    isElement: true,
    isVoid: true
  }
}).extend(({ plugin }) => ({
  parsers: {
    html: {
      deserializer: {
        parse: ({ element }) => ({
          type: plugin.node.type,
          url: element.getAttribute("src")
        }),
        rules: [
          {
            validNodeName: "IMG"
          }
        ]
      }
    }
  }
}));

// src/lib/media/insertMedia.ts
var insertMedia = async (editor, _a = {}) => {
  var _b = _a, {
    getUrl,
    type = editor.getType(BaseImagePlugin)
  } = _b, options = __objRest(_b, [
    "getUrl",
    "type"
  ]);
  const url = getUrl ? await getUrl() : window.prompt(
    `Enter the URL of the ${type === BaseImagePlugin.key ? BaseImagePlugin.key : BaseMediaEmbedPlugin.key}`
  );
  if (!url) return;
  if (type === editor.getType(BaseImagePlugin)) {
    insertImage(editor, url, options);
  } else {
    insertMediaEmbed(editor, { url }, options);
  }
};

// src/lib/media/parseMediaUrl.ts
var allowedProtocols = /* @__PURE__ */ new Set(["http:", "https:"]);
var parseMediaUrl = (url, {
  urlParsers
}) => {
  const embed = (() => {
    for (const parser of urlParsers) {
      const data = parser(url);
      if (data) {
        return data;
      }
    }
  })();
  if (embed == null ? void 0 : embed.url) {
    try {
      const { protocol } = new URL(embed.url);
      if (!allowedProtocols.has(protocol)) {
        return void 0;
      }
    } catch (e) {
      console.warn("Could not parse URL: " + embed.url);
      return void 0;
    }
  }
  return embed;
};

// src/lib/media-embed/BaseMediaEmbedPlugin.ts
var import_plate_common8 = require("@udecode/plate-common");

// src/lib/media-embed/parseIframeUrl.ts
var parseIframeUrl = (url) => {
  var _a, _b;
  if (!url.startsWith("http")) {
    const regexMatchSrc = /src=".*?"/;
    const regexGroupQuotes = /"([^"]*)"/;
    const src = (_a = regexMatchSrc.exec(url)) == null ? void 0 : _a[0];
    const returnString = (_b = src == null ? void 0 : src.match(regexGroupQuotes)) == null ? void 0 : _b[1];
    if (returnString) {
      url = returnString;
    }
  }
  return url;
};

// src/lib/media-embed/BaseMediaEmbedPlugin.ts
var BaseMediaEmbedPlugin = (0, import_plate_common8.createTSlatePlugin)({
  key: "media_embed",
  node: { isElement: true, isVoid: true },
  options: {
    transformUrl: parseIframeUrl
  }
}).extend(({ type }) => ({
  parsers: {
    html: {
      deserializer: {
        parse: ({ element }) => {
          const url = element.getAttribute("src");
          if (url) {
            return {
              type,
              url
            };
          }
        },
        rules: [
          {
            validNodeName: "IFRAME"
          }
        ]
      }
    }
  }
}));

// src/lib/media-embed/parseVideoUrl.ts
var import_plate_common9 = require("@udecode/plate-common");
var import_js_video_url_parser = __toESM(require("js-video-url-parser"));
var VIDEO_PROVIDERS = [
  "youtube",
  "vimeo",
  "dailymotion",
  "youku",
  "coub"
];

// src/lib/media-embed/transforms/insertMediaEmbed.ts
var import_plate_common10 = require("@udecode/plate-common");
var insertMediaEmbed = (editor, { url = "" }, options = {}) => {
  if (!editor.selection) return;
  const selectionParentEntry = (0, import_plate_common10.getParentNode)(editor, editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  (0, import_plate_common10.insertNodes)(
    editor,
    {
      children: [{ text: "" }],
      type: editor.getType(BaseMediaEmbedPlugin),
      url
    },
    __spreadValues({
      at: path,
      nextBlock: true
    }, options)
  );
};

// src/lib/placeholder/BasePlaceholderPlugin.ts
var import_plate_common11 = require("@udecode/plate-common");
var BasePlaceholderPlugin = (0, import_plate_common11.createTSlatePlugin)({
  key: "placeholder",
  node: { isElement: true, isVoid: true }
});

// src/react/plugins.ts
var ImagePlugin = (0, import_react.toPlatePlugin)(BaseImagePlugin);
var MediaEmbedPlugin = (0, import_react.toPlatePlugin)(BaseMediaEmbedPlugin);
var AudioPlugin = (0, import_react.toPlatePlugin)(BaseAudioPlugin);
var FilePlugin = (0, import_react.toPlatePlugin)(BaseFilePlugin);
var VideoPlugin = (0, import_react.toPlatePlugin)(BaseVideoPlugin);

// src/react/image/ImagePreviewStore.ts
var import_plate_common12 = require("@udecode/plate-common");
var ImagePreviewStore = (0, import_plate_common12.createZustandStore)("imagePreview")({
  boundingClientRect: {},
  currentPreview: null,
  isEditingScale: false,
  openEditorId: null,
  previewList: [],
  scale: 1,
  translate: { x: 0, y: 0 }
}).extendActions((set) => ({
  close: () => {
    set.currentPreview(null);
    set.previewList([]);
    set.openEditorId(null);
    set.scale(1);
    set.translate({ x: 0, y: 0 });
    set.isEditingScale(false);
  }
})).extendSelectors((state) => ({
  isOpen: (editorId) => state.openEditorId === editorId
}));
var imagePreviewActions = ImagePreviewStore.set;
var imagePreviewSelectors = ImagePreviewStore.get;
var useImagePreviewSelectors = () => ImagePreviewStore.use;

// src/react/image/openImagePreview.ts
var import_plate_common13 = require("@udecode/plate-common");
var getUrlList = (editor) => {
  const enties = (0, import_plate_common13.getNodeEntries)(editor, {
    at: [],
    match: (n) => n.type === BaseImagePlugin.key
  });
  return Array.from(enties, (item) => ({
    id: item[0].id,
    url: item[0].url
  }));
};
var openImagePreview = (editor, element) => {
  const { id, url } = element;
  const urlList = getUrlList(editor);
  document.documentElement.style.overflowY = "hidden";
  imagePreviewActions.openEditorId(editor.id);
  imagePreviewActions.currentPreview({ id, url });
  imagePreviewActions.previewList(urlList);
};

// src/react/image/useImagePreview.ts
var import_react3 = require("react");
var import_plate_common14 = require("@udecode/plate-common");
var import_react4 = require("@udecode/plate-common/react");

// src/react/image/useZoom.ts
var import_react2 = require("react");
var useZoom = () => {
  const scale = useImagePreviewSelectors().scale();
  const setScale = imagePreviewActions.scale;
  const setTranslate = imagePreviewActions.translate;
  const zoomIn = (0, import_react2.useCallback)(() => {
    if (scale >= 2) return;
    const targets = [0, 0.5, 1, 1.5, 2];
    const nextScale = targets.find((target) => scale < target);
    nextScale && setScale(nextScale);
  }, [scale]);
  const zoomOut = (0, import_react2.useCallback)(() => {
    if (scale <= 0) return;
    const targets = [0, 0.5, 1, 1.5, 2];
    const previousScale = [...targets].reverse().find((target) => scale > target);
    if (previousScale === 1) setTranslate({ x: 0, y: 0 });
    previousScale && setScale(previousScale);
  }, [scale]);
  return { zoomIn, zoomOut };
};

// src/react/image/useImagePreview.ts
var useImagePreviewState = ({
  scrollSpeed
}) => {
  const editor = (0, import_react4.useEditorRef)();
  const isOpen = useImagePreviewSelectors().isOpen(editor.id);
  const scale = useImagePreviewSelectors().scale();
  const translate = useImagePreviewSelectors().translate();
  const setTranslate = imagePreviewActions.translate;
  const boundingClientRect = useImagePreviewSelectors().boundingClientRect();
  const currentPreview = useImagePreviewSelectors().currentPreview();
  const setCurrentPreView = imagePreviewActions.currentPreview;
  const previewList = useImagePreviewSelectors().previewList();
  const isEditingScale = useImagePreviewSelectors().isEditingScale();
  const setIsEditingScale = imagePreviewActions.isEditingScale;
  return {
    boundingClientRect,
    currentPreview,
    editor,
    isEditingScale,
    isOpen,
    previewList,
    scale,
    scrollSpeed,
    setCurrentPreView,
    setIsEditingScale,
    setTranslate,
    translate
  };
};
var useImagePreview = ({
  boundingClientRect,
  currentPreview,
  isOpen,
  previewList,
  scale,
  scrollSpeed,
  setCurrentPreView,
  setIsEditingScale,
  setTranslate,
  translate
}) => {
  (0, import_react3.useEffect)(() => {
    const wheel = (e) => {
      if (scale <= 1) return;
      const { deltaX, deltaY } = e;
      const { x, y } = translate;
      const { bottom, left, right, top } = boundingClientRect;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      let leftOffset = x - deltaX / scrollSpeed;
      let topOffset = y - deltaY / scrollSpeed;
      if (left - deltaX / scrollSpeed > windowWidth / 2 && deltaX < 0) {
        leftOffset = x;
      }
      if (right - deltaX / scrollSpeed < windowWidth / 2 && deltaX > 0) {
        leftOffset = x;
      }
      if (top - deltaY / scrollSpeed > windowHeight / 2 && deltaY < 0) {
        topOffset = y;
      }
      if (bottom - deltaY / scrollSpeed < windowHeight / 2 && deltaY > 0) {
        topOffset = y;
      }
      setTranslate({
        x: leftOffset,
        y: topOffset
      });
    };
    if (!isOpen) return document.removeEventListener("wheel", wheel);
    document.addEventListener("wheel", wheel);
    return () => {
      document.removeEventListener("wheel", wheel);
    };
  }, [isOpen, translate, scale]);
  const { zoomIn, zoomOut } = useZoom();
  const currentPreviewIndex = (0, import_react3.useMemo)(() => {
    if (!currentPreview) return null;
    return previewList.findIndex(
      (item) => item.url === currentPreview.url && item.id === currentPreview.id
    );
  }, [currentPreview]);
  const onClose = (0, import_react3.useCallback)(() => {
    imagePreviewActions.close();
    document.documentElement.style.overflowY = "scroll";
  }, []);
  const [prevDisabled, nextDisabled] = (0, import_react3.useMemo)(
    () => [
      currentPreviewIndex === 0,
      currentPreviewIndex === previewList.length - 1
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPreviewIndex]
  );
  const [zoomOutDisabled, zoomInDisabled] = (0, import_react3.useMemo)(
    () => [scale <= 0.5, scale >= 2],
    [scale]
  );
  (0, import_react3.useEffect)(() => {
    const keydown = (e) => {
      if ((0, import_plate_common14.isHotkey)("escape")(e)) {
        e.stopPropagation();
        onClose();
      }
    };
    if (!isOpen) return document.removeEventListener("keydown", keydown);
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [isOpen]);
  return {
    closeProps: {
      onClick: () => onClose()
    },
    currentUrlIndex: currentPreviewIndex,
    maskLayerProps: {
      onClick: () => onClose()
    },
    nextDisabled,
    nextProps: {
      disabled: nextDisabled,
      onClick: () => {
        if (typeof currentPreviewIndex !== "number") return;
        setCurrentPreView(previewList[currentPreviewIndex + 1]);
      }
    },
    prevDisabled,
    prevProps: {
      disabled: prevDisabled,
      onClick: () => {
        if (typeof currentPreviewIndex !== "number") return;
        setCurrentPreView(previewList[currentPreviewIndex - 1]);
      }
    },
    scaleTextProps: {
      onClick: () => setIsEditingScale(true)
    },
    zommOutProps: {
      disabled: zoomOutDisabled,
      onClick: () => zoomOut()
    },
    zoomInDisabled,
    zoomInProps: {
      disabled: zoomInDisabled,
      onClick: () => zoomIn()
    },
    zoomOutDisabled
  };
};

// src/react/image/components/Image.tsx
var import_react5 = require("@udecode/plate-common/react");
var useImage = () => {
  const element = (0, import_react5.useElement)();
  const editor = (0, import_react5.useEditorRef)();
  return {
    props: {
      draggable: true,
      src: element.url,
      onDoubleClickCapture: () => {
        openImagePreview(editor, element);
      }
    }
  };
};
var Image = (0, import_react5.createPrimitiveComponent)("img")({
  propsHook: useImage
});

// src/react/image/components/PreviewImage.tsx
var import_react6 = __toESM(require("react"));
var import_react7 = require("@udecode/plate-common/react");
var usePreviewImageState = () => {
  const currentPreview = useImagePreviewSelectors().currentPreview();
  const translate = useImagePreviewSelectors().translate();
  const scale = useImagePreviewSelectors().scale();
  const imageRef = import_react6.default.useRef(null);
  const setBoundingClientRect = imagePreviewActions.boundingClientRect;
  return {
    currentPreview,
    imageRef,
    scale,
    setBoundingClientRect,
    translate
  };
};
var usePreviewImage = ({
  currentPreview,
  imageRef,
  scale,
  setBoundingClientRect,
  translate
}) => {
  const isZoomIn = (0, import_react6.useMemo)(() => scale <= 1, [scale]);
  const { zoomIn, zoomOut } = useZoom();
  (0, import_react6.useEffect)(() => {
    var _a;
    if (scale <= 1) return;
    const boundingClientRect = (_a = imageRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!boundingClientRect) return;
    setBoundingClientRect(boundingClientRect);
  }, [translate.x, translate.y, scale]);
  return {
    props: {
      draggable: false,
      ref: imageRef,
      src: currentPreview == null ? void 0 : currentPreview.url,
      style: {
        cursor: isZoomIn ? "zoom-in" : "zoom-out",
        transform: `scale(${scale}) translate(${translate.x + "px"}, ${translate.y + "px"})`
      },
      onClick: (e) => {
        e.stopPropagation();
        isZoomIn ? zoomIn() : zoomOut();
      }
    }
  };
};
var PreviewImage = (0, import_react7.createPrimitiveComponent)("img")({
  propsHook: usePreviewImage,
  stateHook: usePreviewImageState
});

// src/react/image/components/ScaleInput.tsx
var import_react8 = require("react");
var import_plate_common15 = require("@udecode/plate-common");
var useScaleInputState = () => {
  const scale = useImagePreviewSelectors().scale();
  const setScale = imagePreviewActions.scale;
  const isEditingScale = useImagePreviewSelectors().isEditingScale();
  const setIsEditingScale = imagePreviewActions.isEditingScale;
  const [value, setValue] = (0, import_react8.useState)(scale * 100 + "");
  const inputRef = (0, import_react8.useRef)();
  return {
    inputRef,
    isEditingScale,
    setIsEditingScale,
    setScale,
    setValue,
    value
  };
};
var useScaleInput = ({
  inputRef,
  isEditingScale,
  setIsEditingScale,
  setScale,
  setValue,
  value
}) => {
  (0, import_react8.useEffect)(() => {
    if (!isEditingScale) return;
    setTimeout(() => {
      var _a, _b;
      (_a = inputRef.current) == null ? void 0 : _a.focus();
      (_b = inputRef.current) == null ? void 0 : _b.select();
    }, 0);
  }, [isEditingScale]);
  return {
    props: {
      value,
      onChange: (e) => {
        setValue(e.target.value);
      },
      onKeyDown: (e) => {
        if ((0, import_plate_common15.isHotkey)("enter")(e)) {
          if (Number(value) <= 50) {
            setScale(0.5);
            setIsEditingScale(false);
            return;
          }
          if (Number(value) >= 200) {
            setScale(2);
            setIsEditingScale(false);
            return;
          }
          setScale(Number((Number(value) / 100).toFixed(2)));
          setIsEditingScale(false);
        }
      }
    },
    ref: inputRef
  };
};

// src/react/media/mediaStore.ts
var import_react9 = require("@udecode/plate-common/react");
var { MediaProvider, mediaStore, useMediaStore } = (0, import_react9.createAtomStore)(
  {
    showCaption: false
  },
  { name: "media" }
);

// src/react/media/useMediaController.ts
var import_react10 = __toESM(require("react"));
var useMediaControllerState = () => {
  const [alignOpen, setAlignOpen] = import_react10.default.useState(false);
  return {
    alignOpen,
    setAlignOpen
  };
};
var useMediaController = ({
  setAlignOpen
}) => {
  return {
    MediaControllerDropDownMenuProps: {
      setAlignOpen
    }
  };
};
var useMediaControllerDropDownMenu = (props) => {
  import_react10.default.useEffect(
    () => props.setAlignOpen(props.openState.open),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.openState.open]
  );
};

// src/react/media/useMediaState.ts
var import_react11 = __toESM(require("react"));
var import_react12 = require("@udecode/plate-common/react");
var import_slate_react = require("slate-react");
var useMediaState = ({
  urlParsers
} = {}) => {
  const editor = (0, import_react12.useEditorRef)();
  const element = (0, import_react12.useElement)();
  const focused = (0, import_slate_react.useFocused)();
  const selected = (0, import_slate_react.useSelected)();
  const readOnly = (0, import_slate_react.useReadOnly)();
  const { id, align, isUpload, name, type, url } = element;
  const embed = import_react11.default.useMemo(() => {
    if (!urlParsers || type !== editor.getType(BaseVideoPlugin) && type !== editor.getType(BaseMediaEmbedPlugin))
      return;
    return parseMediaUrl(url, { urlParsers });
  }, [urlParsers, url]);
  const isTweet = (embed == null ? void 0 : embed.provider) === "twitter";
  const isVideo = !!(embed == null ? void 0 : embed.provider) && VIDEO_PROVIDERS.includes(embed.provider);
  const isYoutube = (embed == null ? void 0 : embed.provider) === "youtube";
  return {
    id,
    align,
    embed,
    focused,
    isTweet,
    isUpload,
    isVideo,
    isYoutube,
    name,
    readOnly,
    selected,
    unsafeUrl: url
  };
};

// src/react/media/useMediaToolbarButton.ts
var import_react13 = require("@udecode/plate-common/react");
var useMediaToolbarButton = ({
  nodeType
} = {}) => {
  const editor = (0, import_react13.useEditorRef)();
  return {
    props: {
      onClick: async () => {
        await insertMedia(editor, { type: nodeType });
      },
      onMouseDown: (e) => {
        e.preventDefault();
      }
    }
  };
};

// src/react/media/FloatingMedia/FloatingMediaEditButton.tsx
var import_react14 = __toESM(require("react"));
var import_react15 = require("@udecode/plate-common/react");

// src/react/media/FloatingMedia/FloatingMediaStore.ts
var import_plate_common16 = require("@udecode/plate-common");
var FloatingMediaStore = (0, import_plate_common16.createZustandStore)("floatingMedia")({
  isEditing: false,
  url: ""
}).extendActions((set) => ({
  reset: () => {
    set.url("");
    set.isEditing(false);
  }
}));
var floatingMediaActions = FloatingMediaStore.set;
var floatingMediaSelectors = FloatingMediaStore.get;
var useFloatingMediaSelectors = () => FloatingMediaStore.use;

// src/react/media/FloatingMedia/FloatingMediaEditButton.tsx
var useFloatingMediaEditButton = () => {
  const element = (0, import_react15.useElement)();
  return {
    props: {
      onClick: import_react14.default.useCallback(() => {
        floatingMediaActions.url(element.url);
        floatingMediaActions.isEditing(true);
      }, [element.url])
    }
  };
};
var FloatingMediaEditButton = (0, import_react15.createPrimitiveComponent)("button")({
  propsHook: useFloatingMediaEditButton
});

// src/react/media/FloatingMedia/FloatingMediaUrlInput.tsx
var import_react17 = __toESM(require("react"));
var import_react18 = require("@udecode/plate-common/react");

// src/react/media/FloatingMedia/submitFloatingMedia.ts
var import_plate_common17 = require("@udecode/plate-common");
var import_react16 = require("@udecode/plate-common/react");
var submitFloatingMedia = (editor, {
  element,
  plugin
}) => {
  let url = floatingMediaSelectors.url();
  if (url === element.url) {
    floatingMediaActions.reset();
    return true;
  }
  const { isUrl: _isUrl = import_plate_common17.isUrl, transformUrl } = editor.getOptions(plugin);
  const isValid = _isUrl(url);
  if (!isValid) return;
  if (transformUrl) {
    url = transformUrl(url);
  }
  (0, import_plate_common17.setNodes)(editor, {
    url
  });
  floatingMediaActions.reset();
  (0, import_react16.focusEditor)(editor, editor.selection);
  return true;
};

// src/react/media/FloatingMedia/FloatingMediaUrlInput.tsx
var useFloatingMediaUrlInputState = ({
  plugin
}) => {
  const editor = (0, import_react18.useEditorRef)();
  const element = (0, import_react18.useElement)();
  (0, import_react18.useHotkeys)(
    "enter",
    (e) => {
      if (submitFloatingMedia(editor, { element, plugin })) {
        e.preventDefault();
      }
    },
    {
      enableOnFormTags: ["INPUT"]
    },
    []
  );
  (0, import_react18.useHotkeys)(
    "escape",
    () => {
      if (floatingMediaSelectors.isEditing()) {
        floatingMediaActions.reset();
        (0, import_react18.focusEditor)(editor, editor.selection);
      }
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: ["INPUT"]
    },
    []
  );
  return {
    defaultValue: floatingMediaSelectors.url()
  };
};
var useFloatingMediaUrlInput = ({
  defaultValue
}) => {
  const onChange = import_react17.default.useCallback((e) => {
    floatingMediaActions.url(e.target.value);
  }, []);
  return {
    props: {
      autoFocus: true,
      defaultValue,
      onChange
    }
  };
};
var FloatingMediaUrlInput = (0, import_react18.createPrimitiveComponent)("input")({
  propsHook: useFloatingMediaUrlInput,
  stateHook: useFloatingMediaUrlInputState
});

// src/react/media/FloatingMedia/FloatingMedia.tsx
var FloatingMedia = {
  EditButton: FloatingMediaEditButton,
  UrlInput: FloatingMediaUrlInput
};

// src/react/placeholder/PlaceholderPlugin.tsx
var import_plate_common18 = require("@udecode/plate-common");
var import_react19 = require("@udecode/plate-common/react");
var PlaceholderPlugin = (0, import_react19.toPlatePlugin)(BasePlaceholderPlugin, {
  handlers: {
    onKeyDown: ({ editor, event }) => {
      if ((0, import_plate_common18.isHotkey)("escape")(event)) {
        (0, import_react19.blurEditor)(editor);
      }
    }
  }
});

// src/react/placeholder/placeholderStore.ts
var import_react20 = require("@udecode/plate-common/react");
var { PlaceholderProvider, placeholderStore, usePlaceholderStore } = (0, import_react20.createAtomStore)(
  {
    isUploading: false,
    progresses: {},
    updatedFiles: []
  },
  { name: "placeholder" }
);

// src/react/placeholder/usePlaceholderElement.ts
var import_react21 = require("@udecode/plate-common/react");
var import_slate_react2 = require("slate-react");
var usePlaceholderElementState = () => {
  const element = (0, import_react21.useElement)();
  const editor = (0, import_react21.useEditorRef)();
  const focused = (0, import_slate_react2.useFocused)();
  const readOnly = (0, import_slate_react2.useReadOnly)();
  const selected = (0, import_slate_react2.useSelected)();
  const progresses = usePlaceholderStore().get.progresses();
  const isUploading = usePlaceholderStore().get.isUploading();
  const updatedFiles = usePlaceholderStore().get.updatedFiles();
  const { mediaType } = (0, import_react21.useElement)(
    BasePlaceholderPlugin.key
  );
  const progressing = updatedFiles.length > 0 && isUploading;
  return {
    editor,
    element,
    focused,
    isUploading,
    mediaType,
    progresses,
    progressing,
    readOnly,
    selected,
    updatedFiles
  };
};

// src/react/placeholder/usePlaceholderPopover.ts
var import_plate_common19 = require("@udecode/plate-common");
var import_react22 = require("@udecode/plate-common/react");
var import_slate_react3 = require("slate-react");
var usePlaceholderPopoverState = () => {
  const editor = (0, import_react22.useEditorRef)();
  const readOnly = (0, import_slate_react3.useReadOnly)();
  const selected = (0, import_slate_react3.useSelected)();
  const focused = (0, import_slate_react3.useFocused)();
  const selectionCollapsed = (0, import_react22.useEditorSelector)(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (editor2) => !(0, import_plate_common19.isSelectionExpanded)(editor2),
    []
  );
  const element = (0, import_react22.useElement)(BasePlaceholderPlugin.key);
  const { id, mediaType } = element;
  const setProgresses = usePlaceholderStore().set.progresses();
  const setIsUploading = usePlaceholderStore().set.isUploading();
  const setUpdatedFiles = usePlaceholderStore().set.updatedFiles();
  return {
    id,
    editor,
    element,
    focused,
    mediaType,
    readOnly,
    selected,
    selectionCollapsed,
    setIsUploading,
    setProgresses,
    setUpdatedFiles
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioPlugin,
  FilePlugin,
  FloatingMedia,
  FloatingMediaEditButton,
  FloatingMediaStore,
  FloatingMediaUrlInput,
  Image,
  ImagePlugin,
  ImagePreviewStore,
  MediaEmbedPlugin,
  MediaProvider,
  PlaceholderPlugin,
  PlaceholderProvider,
  PreviewImage,
  VideoPlugin,
  floatingMediaActions,
  floatingMediaSelectors,
  imagePreviewActions,
  imagePreviewSelectors,
  mediaStore,
  openImagePreview,
  placeholderStore,
  submitFloatingMedia,
  useFloatingMediaEditButton,
  useFloatingMediaSelectors,
  useFloatingMediaUrlInput,
  useFloatingMediaUrlInputState,
  useImage,
  useImagePreview,
  useImagePreviewSelectors,
  useImagePreviewState,
  useMediaController,
  useMediaControllerDropDownMenu,
  useMediaControllerState,
  useMediaState,
  useMediaStore,
  useMediaToolbarButton,
  usePlaceholderElementState,
  usePlaceholderPopoverState,
  usePlaceholderStore,
  usePreviewImage,
  usePreviewImageState,
  useScaleInput,
  useScaleInputState,
  useZoom
});
//# sourceMappingURL=index.js.map