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

// src/lib/media-embed/parseTwitterUrl.ts
var twitterRegex = (
  // eslint-disable-next-line regexp/no-unused-capturing-group
  /^https?:\/\/(?:twitter|x)\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/
);
var parseTwitterUrl = (url) => {
  var _a, _b;
  if (twitterRegex.exec(url)) {
    return {
      id: (_b = (_a = twitterRegex.exec(url)) == null ? void 0 : _a.groups) == null ? void 0 : _b.id,
      provider: "twitter",
      url
    };
  }
};

// src/lib/media-embed/parseVideoUrl.ts
import { isUrl as isUrl2 } from "@udecode/plate-common";
import videoParser from "js-video-url-parser";
var YOUTUBE_PREFIX = "https://www.youtube.com/embed/";
var VIMEO_PREFIX = "https://player.vimeo.com/video/";
var DAILYMOTION_PREFIX = "https://www.dailymotion.com/embed/video/";
var YOUKU_PREFIX = "https://player.youku.com/embed/";
var COUB_PREFIX = "https://coub.com/embed/";
var VIDEO_PROVIDERS = [
  "youtube",
  "vimeo",
  "dailymotion",
  "youku",
  "coub"
];
var parseVideoUrl = (url) => {
  if (!isUrl2(url)) return;
  const videoData = videoParser.parse(url);
  if ((videoData == null ? void 0 : videoData.provider) && videoData.id) {
    const { id, provider } = videoData;
    const providerUrls = {
      coub: `${COUB_PREFIX}${id}`,
      dailymotion: `${DAILYMOTION_PREFIX}${id}`,
      vimeo: `${VIMEO_PREFIX}${id}`,
      youku: `${YOUKU_PREFIX}${id}`,
      youtube: `${YOUTUBE_PREFIX}${id}`
    };
    return {
      id,
      provider,
      url: providerUrls[provider]
    };
  }
};

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

// src/lib/placeholder/transforms/insertPlaceholder.ts
import {
  insertNodes as insertNodes3,
  withoutNormalizing
} from "@udecode/plate-common";
var insertPlaceholder = (editor, mediaType, options) => {
  withoutNormalizing(
    editor,
    () => insertNodes3(
      editor,
      {
        children: [{ text: "" }],
        mediaType,
        type: editor.getType(BasePlaceholderPlugin)
      },
      options
    )
  );
};
var insertImagePlaceholder = (editor, options) => insertPlaceholder(editor, BaseImagePlugin.key, options);
var insertVideoPlaceholder = (editor, options) => insertPlaceholder(editor, BaseVideoPlugin.key, options);
var insertAudioPlaceholder = (editor, options) => insertPlaceholder(editor, BaseAudioPlugin.key, options);
var insertFilePlaceholder = (editor, options) => insertPlaceholder(editor, BaseFilePlugin.key, options);

// src/lib/placeholder/transforms/setMediaNode.ts
import {
  setNodes
} from "@udecode/plate-common";
var setMediaNode = (editor, props, options) => setNodes(editor, props, options);
export {
  BaseAudioPlugin,
  BaseFilePlugin,
  BaseImagePlugin,
  BaseMediaEmbedPlugin,
  BasePlaceholderPlugin,
  BaseVideoPlugin,
  VIDEO_PROVIDERS,
  insertAudioPlaceholder,
  insertFilePlaceholder,
  insertImage,
  insertImagePlaceholder,
  insertMedia,
  insertMediaEmbed,
  insertPlaceholder,
  insertVideoPlaceholder,
  isImageUrl,
  parseIframeUrl,
  parseMediaUrl,
  parseTwitterUrl,
  parseVideoUrl,
  setMediaNode,
  withImage,
  withImageEmbed,
  withImageUpload
};
//# sourceMappingURL=index.mjs.map