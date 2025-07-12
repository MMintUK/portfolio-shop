import { TElement } from '@udecode/plate-common';

type EmbedUrlData = {
    id?: string;
    provider?: string;
    url?: string;
};
type EmbedUrlParser = (url: string) => EmbedUrlData | undefined;
declare const parseMediaUrl: (url: string, { urlParsers, }: {
    urlParsers: EmbedUrlParser[];
}) => EmbedUrlData | undefined;

interface TMediaElement extends TElement {
    url: string;
    id?: string;
    align?: 'center' | 'left' | 'right';
    isUpload?: boolean;
    name?: string;
}
interface MediaPluginOptions {
    isUrl?: (text: string) => boolean;
    /** Transforms the url. */
    transformUrl?: (url: string) => string;
}

interface TPlaceholderElement extends TElement {
    mediaType: string;
}
interface PlaceholderRule {
    mediaType: string;
}
interface MediaPlaceholder {
    rules?: PlaceholderRule[];
}

export { type EmbedUrlData as E, type MediaPluginOptions as M, type PlaceholderRule as P, type TMediaElement as T, type MediaPlaceholder as a, type EmbedUrlParser as b, type TPlaceholderElement as c, parseMediaUrl as p };
