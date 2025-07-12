import * as _udecode_plate_core from '@udecode/plate-core';
import { T as TMediaElement, M as MediaPluginOptions, E as EmbedUrlData, a as MediaPlaceholder } from './types-B23KLIqT.mjs';
export { b as EmbedUrlParser, P as PlaceholderRule, c as TPlaceholderElement, p as parseMediaUrl } from './types-B23KLIqT.mjs';
import { TEditor, InsertNodesOptions, SlateEditor, PluginConfig, ExtendEditor, SetNodesOptions } from '@udecode/plate-common';

interface InsertMediaOptions<E extends TEditor = TEditor> extends InsertNodesOptions<E> {
    /**
     * Default onClick is getting the image url by calling this promise before
     * inserting the image.
     */
    getUrl?: () => Promise<string>;
    type?: string;
}
declare const insertMedia: <E extends SlateEditor>(editor: E, { getUrl, type, ...options }?: InsertMediaOptions<E>) => Promise<void>;

interface TAudioElement extends TMediaElement {
}
declare const BaseAudioPlugin: _udecode_plate_core.SlatePlugin<_udecode_plate_core.PluginConfig<"audio", {}, {}, {}>>;

interface TFileElement extends TMediaElement {
}
declare const BaseFilePlugin: _udecode_plate_core.SlatePlugin<_udecode_plate_core.PluginConfig<"file", {}, {}, {}>>;

interface TVideoElement extends TMediaElement {
}
declare const BaseVideoPlugin: _udecode_plate_core.SlatePlugin<_udecode_plate_core.PluginConfig<"video", {}, {}, {}>>;

interface TImageElement extends TMediaElement {
}
type ImageConfig = PluginConfig<'img', {
    /**
     * An optional method that will upload the image to a server. The method
     * receives the base64 dataUrl of the uploaded image, and should return the
     * URL of the uploaded image.
     */
    uploadImage?: (dataUrl: ArrayBuffer | string) => ArrayBuffer | Promise<ArrayBuffer | string> | string;
    /** Disable url embed on insert data. */
    disableEmbedInsert?: boolean;
    /** Disable file upload on insert data. */
    disableUploadInsert?: boolean;
} & MediaPluginOptions>;
/** Enables support for images. */
declare const BaseImagePlugin: _udecode_plate_core.SlatePlugin<PluginConfig<"img", {
    /**
     * An optional method that will upload the image to a server. The method
     * receives the base64 dataUrl of the uploaded image, and should return the
     * URL of the uploaded image.
     */
    uploadImage?: (dataUrl: ArrayBuffer | string) => ArrayBuffer | Promise<ArrayBuffer | string> | string;
    /** Disable url embed on insert data. */
    disableEmbedInsert?: boolean;
    /** Disable file upload on insert data. */
    disableUploadInsert?: boolean;
} & MediaPluginOptions, {}, {}>>;

/**
 * @see withImageUpload
 * @see withImageEmbed
 */
declare const withImage: ExtendEditor<ImageConfig>;

/** If inserted text is image url, insert image instead. */
declare const withImageEmbed: ExtendEditor<ImageConfig>;

/**
 * Allows for pasting images from clipboard. Not yet: dragging and dropping
 * images, selecting them through a file system dialog.
 */
declare const withImageUpload: ExtendEditor<ImageConfig>;

declare const insertImage: <E extends SlateEditor>(editor: E, url: ArrayBuffer | string, options?: InsertNodesOptions<E>) => void;

declare const isImageUrl: (url: string) => boolean;

interface TMediaEmbedElement extends TMediaElement {
}
type MediaEmbedConfig = PluginConfig<'media_embed', MediaPluginOptions>;
/**
 * Enables support for embeddable media such as YouTube or Vimeo videos,
 * Instagram posts and tweets or Google Maps.
 */
declare const BaseMediaEmbedPlugin: _udecode_plate_core.SlatePlugin<PluginConfig<"media_embed", MediaPluginOptions, {}, {}>>;

declare const parseIframeUrl: (url: string) => string;

declare const parseTwitterUrl: (url: string) => EmbedUrlData | undefined;

declare const VIDEO_PROVIDERS: string[];
declare const parseVideoUrl: (url: string) => EmbedUrlData | undefined;

declare const insertMediaEmbed: <E extends SlateEditor>(editor: E, { url }: Partial<TMediaEmbedElement>, options?: InsertNodesOptions<E>) => void;

type PlaceholderConfig = PluginConfig<'placeholder', MediaPlaceholder>;
declare const BasePlaceholderPlugin: _udecode_plate_core.SlatePlugin<PlaceholderConfig>;

declare const insertPlaceholder: <E extends SlateEditor>(editor: E, mediaType: string, options?: InsertNodesOptions<E>) => void;
declare const insertImagePlaceholder: <E extends SlateEditor>(editor: E, options?: InsertNodesOptions<E>) => void;
declare const insertVideoPlaceholder: <E extends SlateEditor>(editor: E, options?: InsertNodesOptions<E>) => void;
declare const insertAudioPlaceholder: <E extends SlateEditor>(editor: E, options?: InsertNodesOptions<E>) => void;
declare const insertFilePlaceholder: <E extends SlateEditor>(editor: E, options?: InsertNodesOptions<E>) => void;

type props = {
    type: string;
    url: string;
    isUpload?: boolean;
    name?: string;
    width?: number;
};
declare const setMediaNode: (editor: SlateEditor, props: props, options?: SetNodesOptions) => void;

export { BaseAudioPlugin, BaseFilePlugin, BaseImagePlugin, BaseMediaEmbedPlugin, BasePlaceholderPlugin, BaseVideoPlugin, EmbedUrlData, type ImageConfig, type InsertMediaOptions, type MediaEmbedConfig, MediaPlaceholder, MediaPluginOptions, type PlaceholderConfig, type TAudioElement, type TFileElement, type TImageElement, TMediaElement, type TMediaEmbedElement, type TVideoElement, VIDEO_PROVIDERS, insertAudioPlaceholder, insertFilePlaceholder, insertImage, insertImagePlaceholder, insertMedia, insertMediaEmbed, insertPlaceholder, insertVideoPlaceholder, isImageUrl, parseIframeUrl, parseTwitterUrl, parseVideoUrl, setMediaNode, withImage, withImageEmbed, withImageUpload };
