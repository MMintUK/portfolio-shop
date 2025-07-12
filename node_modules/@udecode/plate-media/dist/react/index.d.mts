import * as _udecode_plate_core_react from '@udecode/plate-core/react';
import * as _udecode_plate_core from '@udecode/plate-core';
import { M as MediaPluginOptions, T as TMediaElement, b as EmbedUrlParser, E as EmbedUrlData, a as MediaPlaceholder, c as TPlaceholderElement } from '../types-B23KLIqT.mjs';
import * as zustand_x from 'zustand-x';
import { SlateEditor, WithRequiredKey } from '@udecode/plate-common';
import * as React$1 from 'react';
import React__default from 'react';
import * as jotai_x from 'jotai-x';
import * as _udecode_slate from '@udecode/slate';

declare const ImagePlugin: _udecode_plate_core_react.PlatePlugin<_udecode_plate_core.PluginConfig<"img", {
    uploadImage?: (dataUrl: ArrayBuffer | string) => ArrayBuffer | Promise<ArrayBuffer | string> | string;
    disableEmbedInsert?: boolean;
    disableUploadInsert?: boolean;
} & MediaPluginOptions, {}, {}>>;
declare const MediaEmbedPlugin: _udecode_plate_core_react.PlatePlugin<_udecode_plate_core.PluginConfig<"media_embed", MediaPluginOptions, {}, {}>>;
declare const AudioPlugin: _udecode_plate_core_react.PlatePlugin<_udecode_plate_core.PluginConfig<"audio", {}, {}, {}>>;
declare const FilePlugin: _udecode_plate_core_react.PlatePlugin<_udecode_plate_core.PluginConfig<"file", {}, {}, {}>>;
declare const VideoPlugin: _udecode_plate_core_react.PlatePlugin<_udecode_plate_core.PluginConfig<"video", {}, {}, {}>>;

interface PreviewItem {
    url: string;
    id?: string;
}
declare const ImagePreviewStore: zustand_x.StoreApi<"imagePreview", {
    boundingClientRect: DOMRect;
    currentPreview: PreviewItem | null;
    isEditingScale: boolean;
    openEditorId: string | null;
    previewList: PreviewItem[];
    scale: number;
    translate: {
        x: number;
        y: number;
    };
}, zustand_x.SetRecord<{
    boundingClientRect: DOMRect;
    currentPreview: PreviewItem | null;
    isEditingScale: boolean;
    openEditorId: string | null;
    previewList: PreviewItem[];
    scale: number;
    translate: {
        x: number;
        y: number;
    };
}> & {
    state: zustand_x.SetImmerState<{
        boundingClientRect: DOMRect;
        currentPreview: PreviewItem | null;
        isEditingScale: boolean;
        openEditorId: string | null;
        previewList: PreviewItem[];
        scale: number;
        translate: {
            x: number;
            y: number;
        };
    }>;
    mergeState: zustand_x.MergeState<{
        boundingClientRect: DOMRect;
        currentPreview: PreviewItem | null;
        isEditingScale: boolean;
        openEditorId: string | null;
        previewList: PreviewItem[];
        scale: number;
        translate: {
            x: number;
            y: number;
        };
    }>;
} & {
    close: () => void;
}, {
    isOpen: (editorId: string) => boolean;
}>;
declare const imagePreviewActions: zustand_x.SetRecord<{
    boundingClientRect: DOMRect;
    currentPreview: PreviewItem | null;
    isEditingScale: boolean;
    openEditorId: string | null;
    previewList: PreviewItem[];
    scale: number;
    translate: {
        x: number;
        y: number;
    };
}> & {
    state: zustand_x.SetImmerState<{
        boundingClientRect: DOMRect;
        currentPreview: PreviewItem | null;
        isEditingScale: boolean;
        openEditorId: string | null;
        previewList: PreviewItem[];
        scale: number;
        translate: {
            x: number;
            y: number;
        };
    }>;
    mergeState: zustand_x.MergeState<{
        boundingClientRect: DOMRect;
        currentPreview: PreviewItem | null;
        isEditingScale: boolean;
        openEditorId: string | null;
        previewList: PreviewItem[];
        scale: number;
        translate: {
            x: number;
            y: number;
        };
    }>;
} & {
    close: () => void;
};
declare const imagePreviewSelectors: zustand_x.StoreApiGet<{
    boundingClientRect: DOMRect;
    currentPreview: PreviewItem | null;
    isEditingScale: boolean;
    openEditorId: string | null;
    previewList: PreviewItem[];
    scale: number;
    translate: {
        x: number;
        y: number;
    };
}, {
    isOpen: (editorId: string) => boolean;
}>;
declare const useImagePreviewSelectors: () => zustand_x.StoreApiUse<{
    boundingClientRect: DOMRect;
    currentPreview: PreviewItem | null;
    isEditingScale: boolean;
    openEditorId: string | null;
    previewList: PreviewItem[];
    scale: number;
    translate: {
        x: number;
        y: number;
    };
}, {
    isOpen: (editorId: string) => boolean;
}>;

declare const openImagePreview: (editor: SlateEditor, element: TMediaElement) => void;

declare const useImagePreviewState: ({ scrollSpeed, }: {
    scrollSpeed: number;
}) => {
    boundingClientRect: DOMRect;
    currentPreview: PreviewItem | null;
    editor: _udecode_plate_core_react.PlateEditor;
    isEditingScale: boolean;
    isOpen: boolean;
    previewList: PreviewItem[];
    scale: number;
    scrollSpeed: number;
    setCurrentPreView: (value: PreviewItem | null) => void;
    setIsEditingScale: (value: boolean) => void;
    setTranslate: (value: {
        x: number;
        y: number;
    }) => void;
    translate: {
        x: number;
        y: number;
    };
};
declare const useImagePreview: ({ boundingClientRect, currentPreview, isOpen, previewList, scale, scrollSpeed, setCurrentPreView, setIsEditingScale, setTranslate, translate, }: ReturnType<typeof useImagePreviewState>) => {
    closeProps: {
        onClick: () => void;
    };
    currentUrlIndex: number | null;
    maskLayerProps: {
        onClick: () => void;
    };
    nextDisabled: boolean;
    nextProps: {
        disabled: boolean;
        onClick: () => void;
    };
    prevDisabled: boolean;
    prevProps: {
        disabled: boolean;
        onClick: () => void;
    };
    scaleTextProps: {
        onClick: () => void;
    };
    zommOutProps: {
        disabled: boolean;
        onClick: () => void;
    };
    zoomInDisabled: boolean;
    zoomInProps: {
        disabled: boolean;
        onClick: () => void;
    };
    zoomOutDisabled: boolean;
};

declare const useZoom: () => {
    zoomIn: () => void;
    zoomOut: () => void;
};

declare const useImage: () => {
    props: {
        draggable: boolean;
        src: string;
        onDoubleClickCapture: () => void;
    };
};
declare const Image: React$1.ForwardRefExoticComponent<{
    as?: React.ElementType;
    asChild?: boolean;
    className?: string;
    options?: any;
    setProps?: ((hookProps: {
        draggable: boolean;
        src: string;
        onDoubleClickCapture: () => void;
    }) => Omit<React$1.DetailedHTMLProps<React$1.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">) | undefined;
    state?: undefined;
    style?: React.CSSProperties;
} & Omit<React$1.DetailedHTMLProps<React$1.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref"> & React$1.RefAttributes<any>>;

declare const usePreviewImageState: () => {
    currentPreview: PreviewItem | null;
    imageRef: React__default.RefObject<HTMLImageElement>;
    scale: number;
    setBoundingClientRect: (value: DOMRect) => void;
    translate: {
        x: number;
        y: number;
    };
};
declare const usePreviewImage: ({ currentPreview, imageRef, scale, setBoundingClientRect, translate, }: ReturnType<typeof usePreviewImageState>) => {
    props: {
        draggable: boolean;
        ref: React__default.RefObject<HTMLImageElement>;
        src: string | undefined;
        style: {
            cursor: string;
            transform: string;
        };
        onClick: (e: React__default.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };
};
declare const PreviewImage: React__default.ForwardRefExoticComponent<{
    as?: React__default.ElementType;
    asChild?: boolean;
    className?: string;
    options?: undefined;
    setProps?: ((hookProps: {
        draggable: boolean;
        ref: React__default.RefObject<HTMLImageElement>;
        src: string | undefined;
        style: {
            cursor: string;
            transform: string;
        };
        onClick: (e: React__default.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    }) => Omit<React__default.DetailedHTMLProps<React__default.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">) | undefined;
    state?: {
        currentPreview: PreviewItem | null;
        imageRef: React__default.RefObject<HTMLImageElement>;
        scale: number;
        setBoundingClientRect: (value: DOMRect) => void;
        translate: {
            x: number;
            y: number;
        };
    } | undefined;
    style?: React__default.CSSProperties;
} & Omit<React__default.DetailedHTMLProps<React__default.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref"> & React__default.RefAttributes<any>>;

declare const useScaleInputState: () => {
    inputRef: React$1.MutableRefObject<HTMLInputElement | undefined>;
    isEditingScale: boolean;
    setIsEditingScale: (value: boolean) => void;
    setScale: (value: number) => void;
    setValue: React$1.Dispatch<React$1.SetStateAction<string>>;
    value: string;
};
declare const useScaleInput: ({ inputRef, isEditingScale, setIsEditingScale, setScale, setValue, value, }: ReturnType<typeof useScaleInputState>) => {
    props: {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    };
    ref: React$1.MutableRefObject<HTMLInputElement | undefined>;
};

interface MediaStore {
    showCaption: boolean;
}
declare const MediaProvider: React$1.FC<jotai_x.ProviderProps<{
    showCaption: boolean;
}>>;
declare const mediaStore: jotai_x.StoreApi<MediaStore, object, "media">;
declare const useMediaStore: jotai_x.UseStoreApi<MediaStore, object>;

declare const useMediaControllerState: () => {
    alignOpen: boolean;
    setAlignOpen: React__default.Dispatch<React__default.SetStateAction<boolean>>;
};
declare const useMediaController: ({ setAlignOpen, }: ReturnType<typeof useMediaControllerState>) => {
    MediaControllerDropDownMenuProps: {
        setAlignOpen: React__default.Dispatch<React__default.SetStateAction<boolean>>;
    };
};
declare const useMediaControllerDropDownMenu: (props: {
    openState: {
        open: boolean;
        onOpenChange: (_value?: boolean) => void;
    };
    setAlignOpen: React__default.Dispatch<React__default.SetStateAction<boolean>>;
}) => void;

declare const useMediaState: ({ urlParsers, }?: {
    urlParsers?: EmbedUrlParser[];
}) => {
    id: string | undefined;
    align: "center" | "left" | "right" | undefined;
    embed: EmbedUrlData | undefined;
    focused: boolean;
    isTweet: boolean;
    isUpload: boolean | undefined;
    isVideo: boolean;
    isYoutube: boolean;
    name: string | undefined;
    readOnly: boolean;
    selected: boolean;
    unsafeUrl: string;
};

declare const useMediaToolbarButton: ({ nodeType, }?: {
    nodeType?: string;
}) => {
    props: {
        onClick: () => Promise<void>;
        onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
    };
};

declare const FloatingMedia: {
    EditButton: React$1.ForwardRefExoticComponent<{
        as?: React.ElementType;
        asChild?: boolean;
        className?: string;
        options?: any;
        setProps?: ((hookProps: {
            onClick: () => void;
        }) => Omit<React$1.DetailedHTMLProps<React$1.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
        state?: undefined;
        style?: React.CSSProperties;
    } & Omit<React$1.DetailedHTMLProps<React$1.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React$1.RefAttributes<any>>;
    UrlInput: React$1.ForwardRefExoticComponent<{
        as?: React.ElementType;
        asChild?: boolean;
        className?: string;
        options?: {
            plugin: _udecode_plate_core.WithRequiredKey;
        } | undefined;
        setProps?: ((hookProps: {
            autoFocus: boolean;
            defaultValue: string;
            onChange: React$1.ChangeEventHandler<HTMLInputElement>;
        }) => Omit<React$1.DetailedHTMLProps<React$1.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">) | undefined;
        state?: {
            defaultValue: string;
        } | undefined;
        style?: React.CSSProperties;
    } & Omit<React$1.DetailedHTMLProps<React$1.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React$1.RefAttributes<any>>;
};

declare const useFloatingMediaEditButton: () => {
    props: {
        onClick: () => void;
    };
};
declare const FloatingMediaEditButton: React__default.ForwardRefExoticComponent<{
    as?: React__default.ElementType;
    asChild?: boolean;
    className?: string;
    options?: any;
    setProps?: ((hookProps: {
        onClick: () => void;
    }) => Omit<React__default.DetailedHTMLProps<React__default.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">) | undefined;
    state?: undefined;
    style?: React__default.CSSProperties;
} & Omit<React__default.DetailedHTMLProps<React__default.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React__default.RefAttributes<any>>;

declare const FloatingMediaStore: zustand_x.StoreApi<"floatingMedia", {
    isEditing: boolean;
    url: string;
}, zustand_x.SetRecord<{
    isEditing: boolean;
    url: string;
}> & {
    state: zustand_x.SetImmerState<{
        isEditing: boolean;
        url: string;
    }>;
    mergeState: zustand_x.MergeState<{
        isEditing: boolean;
        url: string;
    }>;
} & {
    reset: () => void;
}, {}>;
declare const floatingMediaActions: zustand_x.SetRecord<{
    isEditing: boolean;
    url: string;
}> & {
    state: zustand_x.SetImmerState<{
        isEditing: boolean;
        url: string;
    }>;
    mergeState: zustand_x.MergeState<{
        isEditing: boolean;
        url: string;
    }>;
} & {
    reset: () => void;
};
declare const floatingMediaSelectors: zustand_x.StoreApiGet<{
    isEditing: boolean;
    url: string;
}, {}>;
declare const useFloatingMediaSelectors: () => zustand_x.GetRecord<{
    isEditing: boolean;
    url: string;
}>;

declare const useFloatingMediaUrlInputState: ({ plugin, }: {
    plugin: WithRequiredKey;
}) => {
    defaultValue: string;
};
declare const useFloatingMediaUrlInput: ({ defaultValue, }: ReturnType<typeof useFloatingMediaUrlInputState>) => {
    props: {
        autoFocus: boolean;
        defaultValue: string;
        onChange: React__default.ChangeEventHandler<HTMLInputElement>;
    };
};
declare const FloatingMediaUrlInput: React__default.ForwardRefExoticComponent<{
    as?: React__default.ElementType;
    asChild?: boolean;
    className?: string;
    options?: {
        plugin: WithRequiredKey;
    } | undefined;
    setProps?: ((hookProps: {
        autoFocus: boolean;
        defaultValue: string;
        onChange: React__default.ChangeEventHandler<HTMLInputElement>;
    }) => Omit<React__default.DetailedHTMLProps<React__default.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">) | undefined;
    state?: {
        defaultValue: string;
    } | undefined;
    style?: React__default.CSSProperties;
} & Omit<React__default.DetailedHTMLProps<React__default.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React__default.RefAttributes<any>>;

declare const submitFloatingMedia: (editor: SlateEditor, { element, plugin, }: {
    element: TMediaElement;
    plugin: WithRequiredKey;
}) => true | undefined;

declare const PlaceholderPlugin: _udecode_plate_core_react.PlatePlugin<_udecode_plate_core.PluginConfig<"placeholder", MediaPlaceholder, {}, {}>>;

type Progresses = Record<string, number>;
interface PlaceholderStore {
    isUploading: boolean;
    progresses: Progresses;
    updatedFiles: File[];
}
declare const PlaceholderProvider: React$1.FC<jotai_x.ProviderProps<{
    isUploading: boolean;
    progresses: Progresses;
    updatedFiles: File[];
}>>;
declare const placeholderStore: jotai_x.StoreApi<PlaceholderStore, object, "placeholder">;
declare const usePlaceholderStore: jotai_x.UseStoreApi<PlaceholderStore, object>;

declare const usePlaceholderElementState: () => {
    editor: _udecode_plate_core_react.PlateEditor;
    element: _udecode_slate.TElement;
    focused: boolean;
    isUploading: boolean;
    mediaType: string;
    progresses: {
        [x: string]: number;
    };
    progressing: boolean;
    readOnly: boolean;
    selected: boolean;
    updatedFiles: File[];
};

declare const usePlaceholderPopoverState: () => {
    id: unknown;
    editor: _udecode_plate_core_react.PlateEditor;
    element: TPlaceholderElement;
    focused: boolean;
    mediaType: string;
    readOnly: boolean;
    selected: boolean;
    selectionCollapsed: boolean;
    setIsUploading: (args_0: boolean) => void;
    setProgresses: (args_0: {
        [x: string]: number;
    }) => void;
    setUpdatedFiles: (args_0: File[]) => void;
};

export { AudioPlugin, FilePlugin, FloatingMedia, FloatingMediaEditButton, FloatingMediaStore, FloatingMediaUrlInput, Image, ImagePlugin, ImagePreviewStore, MediaEmbedPlugin, MediaProvider, PlaceholderPlugin, PlaceholderProvider, PreviewImage, type PreviewItem, VideoPlugin, floatingMediaActions, floatingMediaSelectors, imagePreviewActions, imagePreviewSelectors, mediaStore, openImagePreview, placeholderStore, submitFloatingMedia, useFloatingMediaEditButton, useFloatingMediaSelectors, useFloatingMediaUrlInput, useFloatingMediaUrlInputState, useImage, useImagePreview, useImagePreviewSelectors, useImagePreviewState, useMediaController, useMediaControllerDropDownMenu, useMediaControllerState, useMediaState, useMediaStore, useMediaToolbarButton, usePlaceholderElementState, usePlaceholderPopoverState, usePlaceholderStore, usePreviewImage, usePreviewImageState, useScaleInput, useScaleInputState, useZoom };
