import { ClientRectObject } from '@floating-ui/core';
import * as _floating_ui_react from '@floating-ui/react';
import { VirtualElement, UseFloatingOptions, ReferenceType, UseFloatingReturn } from '@floating-ui/react';
export { AlignedPlacement, AutoUpdateOptions, Axis, Boundary, ClientRectObject, ComputePositionConfig, ComputePositionReturn, ContextData, Coords, DetectOverflowOptions, Dimensions, ElementContext, ElementProps, ElementRects, Elements, ExtendedRefs, FloatingArrow, FloatingContext, FloatingDelayGroup, FloatingElement, FloatingEvents, FloatingFocusManager, FloatingNode, FloatingNodeType, FloatingOverlay, FloatingPortal, FloatingTree, FloatingTreeType, Length, Middleware, MiddlewareData, MiddlewareReturn, NodeScroll, Padding, Placement, Platform, Rect, ReferenceElement, ReferenceType, RootBoundary, Side, SideObject, SizeOptions, Strategy, UseFloatingData, UseFloatingOptions, UseFloatingReturn, VirtualElement, arrow, autoPlacement, autoUpdate, computePosition, detectOverflow, flip, getOverflowAncestors, hide, inline, limitShift, offset, safePolygon, shift, size, useClick, useDelayGroup, useDelayGroupContext, useDismiss, useFloating, useFloatingNodeId, useFloatingParentNodeId, useFloatingPortalNode, useFloatingTree, useFocus, useHover, useId, useInteractions, useListNavigation, useRole, useTypeahead } from '@floating-ui/react';
import React from 'react';
import { TEditor } from '@udecode/plate-common';
import { Location, Range } from 'slate';

declare const getDefaultBoundingClientRect: () => ClientRectObject;
declare const createVirtualElement: () => VirtualElement;

interface UseVirtualFloatingOptions extends Partial<UseFloatingOptions> {
    getBoundingClientRect?: () => ClientRectObject;
    open?: boolean;
}
interface UseVirtualFloatingReturn<RT extends ReferenceType = ReferenceType> extends UseFloatingReturn<RT> {
    style: React.CSSProperties;
    virtualElementRef: React.MutableRefObject<VirtualElement>;
}
/**
 * `useFloating` with a controlled virtual element. Used to follow cursor
 * position.
 *
 * Default options:
 *
 * - `whileElementsMounted: autoUpdate`
 *
 * Additional options:
 *
 * - `getBoundingClientRect` to get the bounding client rect.
 * - `hidden` to hide the floating element
 *
 * Additional returns:
 *
 * - `style` to apply to the floating element
 * - `virtualElementRef`
 *
 * @see useFloating
 * @see https://floating-ui.com/docs/react-dom#virtual-element
 */
declare const useVirtualFloating: <RT extends ReferenceType = ReferenceType>({ getBoundingClientRect, ...floatingOptions }: UseVirtualFloatingOptions) => UseVirtualFloatingReturn<RT>;

type FloatingToolbarState = {
    floatingOptions?: UseVirtualFloatingOptions;
    hideToolbar?: boolean;
    showWhenReadOnly?: boolean;
};
declare const useFloatingToolbarState: ({ editorId, floatingOptions, focusedEditorId, hideToolbar, showWhenReadOnly, }: {
    editorId: string;
    focusedEditorId: string | null;
} & FloatingToolbarState) => {
    editorId: string;
    floating: UseVirtualFloatingReturn<_floating_ui_react.ReferenceType>;
    focused: boolean;
    focusedEditorId: string | null;
    hideToolbar: boolean | undefined;
    mousedown: boolean;
    open: boolean;
    readOnly: boolean;
    selectionExpanded: boolean;
    selectionText: string;
    setMousedown: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setWaitForCollapsedSelection: React.Dispatch<React.SetStateAction<boolean>>;
    showWhenReadOnly: boolean | undefined;
    waitForCollapsedSelection: boolean;
};
declare const useFloatingToolbar: ({ editorId, floating, focusedEditorId, hideToolbar, mousedown, open, readOnly, selectionExpanded, selectionText, setMousedown, setOpen, setWaitForCollapsedSelection, showWhenReadOnly, waitForCollapsedSelection, }: ReturnType<typeof useFloatingToolbarState>) => {
    hidden: boolean;
    props: {
        style: React.CSSProperties;
    };
    ref: ((node: HTMLElement | null) => void) & ((node: HTMLElement | null) => void);
};

type VirtualRef = React.RefObject<Pick<HTMLElement, 'getBoundingClientRect'>>;
declare const createVirtualRef: (editor: TEditor, at?: Location | Location[], { fallbackRect, }?: {
    fallbackRect?: ClientRect;
}) => VirtualRef;

declare const getBoundingClientRect: (editor: TEditor, at?: Location | Location[]) => DOMRect | undefined;

/** Get bounding client rect by slate range */
declare const getRangeBoundingClientRect: (editor: TEditor, at: Range | null) => ClientRectObject;

/** Get bounding client rect of the window selection */
declare const getSelectionBoundingClientRect: () => ClientRectObject;

declare const makeClientRect: ({ bottom, left, right, top, }: {
    bottom: number;
    left: number;
    right: number;
    top: number;
}) => DOMRect;

declare const mergeClientRects: (clientRects: DOMRect[]) => DOMRect;

export { type FloatingToolbarState, type UseVirtualFloatingOptions, type UseVirtualFloatingReturn, type VirtualRef, createVirtualElement, createVirtualRef, getBoundingClientRect, getDefaultBoundingClientRect, getRangeBoundingClientRect, getSelectionBoundingClientRect, makeClientRect, mergeClientRects, useFloatingToolbar, useFloatingToolbarState, useVirtualFloating };
