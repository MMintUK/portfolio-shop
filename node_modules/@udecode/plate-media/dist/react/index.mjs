var __defProp = Object.defineProperty;
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

// src/react/plugins.ts
import { toPlatePlugin } from "@udecode/plate-common/react";

// src/lib/BaseAudioPlugin.ts
import { createSlatePlugin } from "@udecode/plate-common";
var BaseAudioPlugin = createSlatePlugin({
  key: "audio",
  node: { isElement: true, isVoid: true }
});

// src/lib/BaseFilePlugin.ts
import { createSlatePlugin as createSlatePlugin2 } from "@udecode/plate-common";
var BaseFilePlugin = createSlatePlugin2({
  key: "file",
  node: { isElement: true, isVoid: true }
});

// src/lib/BaseVideoPlugin.ts
import { createSlatePlugin as createSlatePlugin3 } from "@udecode/plate-common";
var BaseVideoPlugin = createSlatePlugin3({
  key: "video",
  node: {
    dangerouslyAllowAttributes: ["width", "height"],
    isElement: true,
    isVoid: true
  }
});

// src/lib/image/BaseImagePlugin.ts
import { createTSlatePlugin } from "@udecode/plate-common";

// src/lib/image/transforms/insertImage.ts
import {
  insertNodes
} from "@udecode/plate-common";
var insertImage = (editor, url, options = {}) => {
  const text = { text: "" };
  const image = {
    children: [text],
    type: editor.getType(BaseImagePlugin),
    url
  };
  insertNodes(editor, image, __spreadValues({
    nextBlock: true
  }, options));
};

// src/lib/image/utils/isImageUrl.ts
import { isUrl } from "@udecode/plate-common";
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
  if (!isUrl(url)) return false;
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
import {
  getInjectedPlugins,
  pipeInsertDataQuery
} from "@udecode/plate-common";
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
      const injectedPlugins = getInjectedPlugins(editor, plugin);
      if (!pipeInsertDataQuery(editor, injectedPlugins, {
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
var BaseImagePlugin = createTSlatePlugin({
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
import { createTSlatePlugin as createTSlatePlugin2 } from "@udecode/plate-common";

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
var BaseMediaEmbedPlugin = createTSlatePlugin2({
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
import { isUrl as isUrl2 } from "@udecode/plate-common";
import videoParser from "js-video-url-parser";
var VIDEO_PROVIDERS = [
  "youtube",
  "vimeo",
  "dailymotion",
  "youku",
  "coub"
];

// src/lib/media-embed/transforms/insertMediaEmbed.ts
import {
  getParentNode,
  insertNodes as insertNodes2
} from "@udecode/plate-common";
var insertMediaEmbed = (editor, { url = "" }, options = {}) => {
  if (!editor.selection) return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  insertNodes2(
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
import { createTSlatePlugin as createTSlatePlugin3 } from "@udecode/plate-common";
var BasePlaceholderPlugin = createTSlatePlugin3({
  key: "placeholder",
  node: { isElement: true, isVoid: true }
});

// src/react/plugins.ts
var ImagePlugin = toPlatePlugin(BaseImagePlugin);
var MediaEmbedPlugin = toPlatePlugin(BaseMediaEmbedPlugin);
var AudioPlugin = toPlatePlugin(BaseAudioPlugin);
var FilePlugin = toPlatePlugin(BaseFilePlugin);
var VideoPlugin = toPlatePlugin(BaseVideoPlugin);

// src/react/image/ImagePreviewStore.ts
import { createZustandStore } from "@udecode/plate-common";
var ImagePreviewStore = createZustandStore("imagePreview")({
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
import { getNodeEntries } from "@udecode/plate-common";
var getUrlList = (editor) => {
  const enties = getNodeEntries(editor, {
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
import { useCallback as useCallback2, useEffect, useMemo } from "react";
import { isHotkey } from "@udecode/plate-common";
import { useEditorRef } from "@udecode/plate-common/react";

// src/react/image/useZoom.ts
import { useCallback } from "react";
var useZoom = () => {
  const scale = useImagePreviewSelectors().scale();
  const setScale = imagePreviewActions.scale;
  const setTranslate = imagePreviewActions.translate;
  const zoomIn = useCallback(() => {
    if (scale >= 2) return;
    const targets = [0, 0.5, 1, 1.5, 2];
    const nextScale = targets.find((target) => scale < target);
    nextScale && setScale(nextScale);
  }, [scale]);
  const zoomOut = useCallback(() => {
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
  const editor = useEditorRef();
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
  useEffect(() => {
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
  const currentPreviewIndex = useMemo(() => {
    if (!currentPreview) return null;
    return previewList.findIndex(
      (item) => item.url === currentPreview.url && item.id === currentPreview.id
    );
  }, [currentPreview]);
  const onClose = useCallback2(() => {
    imagePreviewActions.close();
    document.documentElement.style.overflowY = "scroll";
  }, []);
  const [prevDisabled, nextDisabled] = useMemo(
    () => [
      currentPreviewIndex === 0,
      currentPreviewIndex === previewList.length - 1
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPreviewIndex]
  );
  const [zoomOutDisabled, zoomInDisabled] = useMemo(
    () => [scale <= 0.5, scale >= 2],
    [scale]
  );
  useEffect(() => {
    const keydown = (e) => {
      if (isHotkey("escape")(e)) {
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
import {
  createPrimitiveComponent,
  useEditorRef as useEditorRef2,
  useElement
} from "@udecode/plate-common/react";
var useImage = () => {
  const element = useElement();
  const editor = useEditorRef2();
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
var Image = createPrimitiveComponent("img")({
  propsHook: useImage
});

// src/react/image/components/PreviewImage.tsx
import React, { useEffect as useEffect2, useMemo as useMemo2 } from "react";
import { createPrimitiveComponent as createPrimitiveComponent2 } from "@udecode/plate-common/react";
var usePreviewImageState = () => {
  const currentPreview = useImagePreviewSelectors().currentPreview();
  const translate = useImagePreviewSelectors().translate();
  const scale = useImagePreviewSelectors().scale();
  const imageRef = React.useRef(null);
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
  const isZoomIn = useMemo2(() => scale <= 1, [scale]);
  const { zoomIn, zoomOut } = useZoom();
  useEffect2(() => {
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
var PreviewImage = createPrimitiveComponent2("img")({
  propsHook: usePreviewImage,
  stateHook: usePreviewImageState
});

// src/react/image/components/ScaleInput.tsx
import { useEffect as useEffect3, useRef, useState } from "react";
import { isHotkey as isHotkey2 } from "@udecode/plate-common";
var useScaleInputState = () => {
  const scale = useImagePreviewSelectors().scale();
  const setScale = imagePreviewActions.scale;
  const isEditingScale = useImagePreviewSelectors().isEditingScale();
  const setIsEditingScale = imagePreviewActions.isEditingScale;
  const [value, setValue] = useState(scale * 100 + "");
  const inputRef = useRef();
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
  useEffect3(() => {
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
        if (isHotkey2("enter")(e)) {
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
import { createAtomStore } from "@udecode/plate-common/react";
var { MediaProvider, mediaStore, useMediaStore } = createAtomStore(
  {
    showCaption: false
  },
  { name: "media" }
);

// src/react/media/useMediaController.ts
import React2 from "react";
var useMediaControllerState = () => {
  const [alignOpen, setAlignOpen] = React2.useState(false);
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
  React2.useEffect(
    () => props.setAlignOpen(props.openState.open),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.openState.open]
  );
};

// src/react/media/useMediaState.ts
import React3 from "react";
import { useEditorRef as useEditorRef3, useElement as useElement2 } from "@udecode/plate-common/react";
import { useFocused, useReadOnly, useSelected } from "slate-react";
var useMediaState = ({
  urlParsers
} = {}) => {
  const editor = useEditorRef3();
  const element = useElement2();
  const focused = useFocused();
  const selected = useSelected();
  const readOnly = useReadOnly();
  const { id, align, isUpload, name, type, url } = element;
  const embed = React3.useMemo(() => {
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
import { useEditorRef as useEditorRef4 } from "@udecode/plate-common/react";
var useMediaToolbarButton = ({
  nodeType
} = {}) => {
  const editor = useEditorRef4();
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
import React4 from "react";
import {
  createPrimitiveComponent as createPrimitiveComponent3,
  useElement as useElement3
} from "@udecode/plate-common/react";

// src/react/media/FloatingMedia/FloatingMediaStore.ts
import { createZustandStore as createZustandStore2 } from "@udecode/plate-common";
var FloatingMediaStore = createZustandStore2("floatingMedia")({
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
  const element = useElement3();
  return {
    props: {
      onClick: React4.useCallback(() => {
        floatingMediaActions.url(element.url);
        floatingMediaActions.isEditing(true);
      }, [element.url])
    }
  };
};
var FloatingMediaEditButton = createPrimitiveComponent3("button")({
  propsHook: useFloatingMediaEditButton
});

// src/react/media/FloatingMedia/FloatingMediaUrlInput.tsx
import React5 from "react";
import {
  createPrimitiveComponent as createPrimitiveComponent4,
  focusEditor as focusEditor2,
  useEditorRef as useEditorRef5,
  useElement as useElement4,
  useHotkeys
} from "@udecode/plate-common/react";

// src/react/media/FloatingMedia/submitFloatingMedia.ts
import {
  isUrl as isUrl3,
  setNodes
} from "@udecode/plate-common";
import { focusEditor } from "@udecode/plate-common/react";
var submitFloatingMedia = (editor, {
  element,
  plugin
}) => {
  let url = floatingMediaSelectors.url();
  if (url === element.url) {
    floatingMediaActions.reset();
    return true;
  }
  const { isUrl: _isUrl = isUrl3, transformUrl } = editor.getOptions(plugin);
  const isValid = _isUrl(url);
  if (!isValid) return;
  if (transformUrl) {
    url = transformUrl(url);
  }
  setNodes(editor, {
    url
  });
  floatingMediaActions.reset();
  focusEditor(editor, editor.selection);
  return true;
};

// src/react/media/FloatingMedia/FloatingMediaUrlInput.tsx
var useFloatingMediaUrlInputState = ({
  plugin
}) => {
  const editor = useEditorRef5();
  const element = useElement4();
  useHotkeys(
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
  useHotkeys(
    "escape",
    () => {
      if (floatingMediaSelectors.isEditing()) {
        floatingMediaActions.reset();
        focusEditor2(editor, editor.selection);
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
  const onChange = React5.useCallback((e) => {
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
var FloatingMediaUrlInput = createPrimitiveComponent4("input")({
  propsHook: useFloatingMediaUrlInput,
  stateHook: useFloatingMediaUrlInputState
});

// src/react/media/FloatingMedia/FloatingMedia.tsx
var FloatingMedia = {
  EditButton: FloatingMediaEditButton,
  UrlInput: FloatingMediaUrlInput
};

// src/react/placeholder/PlaceholderPlugin.tsx
import { isHotkey as isHotkey3 } from "@udecode/plate-common";
import { blurEditor, toPlatePlugin as toPlatePlugin2 } from "@udecode/plate-common/react";
var PlaceholderPlugin = toPlatePlugin2(BasePlaceholderPlugin, {
  handlers: {
    onKeyDown: ({ editor, event }) => {
      if (isHotkey3("escape")(event)) {
        blurEditor(editor);
      }
    }
  }
});

// src/react/placeholder/placeholderStore.ts
import { createAtomStore as createAtomStore2 } from "@udecode/plate-common/react";
var { PlaceholderProvider, placeholderStore, usePlaceholderStore } = createAtomStore2(
  {
    isUploading: false,
    progresses: {},
    updatedFiles: []
  },
  { name: "placeholder" }
);

// src/react/placeholder/usePlaceholderElement.ts
import { useEditorRef as useEditorRef6, useElement as useElement5 } from "@udecode/plate-common/react";
import { useFocused as useFocused2, useReadOnly as useReadOnly2, useSelected as useSelected2 } from "slate-react";
var usePlaceholderElementState = () => {
  const element = useElement5();
  const editor = useEditorRef6();
  const focused = useFocused2();
  const readOnly = useReadOnly2();
  const selected = useSelected2();
  const progresses = usePlaceholderStore().get.progresses();
  const isUploading = usePlaceholderStore().get.isUploading();
  const updatedFiles = usePlaceholderStore().get.updatedFiles();
  const { mediaType } = useElement5(
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
import { isSelectionExpanded } from "@udecode/plate-common";
import {
  useEditorRef as useEditorRef7,
  useEditorSelector,
  useElement as useElement6
} from "@udecode/plate-common/react";
import { useFocused as useFocused3, useReadOnly as useReadOnly3, useSelected as useSelected3 } from "slate-react";
var usePlaceholderPopoverState = () => {
  const editor = useEditorRef7();
  const readOnly = useReadOnly3();
  const selected = useSelected3();
  const focused = useFocused3();
  const selectionCollapsed = useEditorSelector(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (editor2) => !isSelectionExpanded(editor2),
    []
  );
  const element = useElement6(BasePlaceholderPlugin.key);
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
export {
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
};
//# sourceMappingURL=index.mjs.map