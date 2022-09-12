import {ICON_TYPES} from "../components/icons/Icon";

export const MAP_TYPE_ELEMENTS = {
    CARD_TYPE: 'CARD_TYPE',
    IMAGE_TYPE: 'IMAGE_TYPE',
    CAROUSEL_TYPE: 'CAROUSEL_TYPE',
    FORM_TYPE: 'FORM_TYPE'
}

export const TOOL_BOX_ITEM = {
    [MAP_TYPE_ELEMENTS.IMAGE_TYPE] : { w: 3, h: 6, static: false },
    [MAP_TYPE_ELEMENTS.CAROUSEL_TYPE]: { w: 3, h: 10, static: false },
    [MAP_TYPE_ELEMENTS.CARD_TYPE]: { w: 3, h: 11, static: false },
    [MAP_TYPE_ELEMENTS.FORM_TYPE]: { w: 4, h: 9, static: false }
}

export const TOOL_BOX_LIST = [
    { id: MAP_TYPE_ELEMENTS.IMAGE_TYPE, iconType: ICON_TYPES.IMG, item: TOOL_BOX_ITEM[MAP_TYPE_ELEMENTS.IMAGE_TYPE], title: 'Image' },
    { id: MAP_TYPE_ELEMENTS.CAROUSEL_TYPE, iconType: ICON_TYPES.FILM, item: TOOL_BOX_ITEM[MAP_TYPE_ELEMENTS.CAROUSEL_TYPE], title: 'Carousel' },
    { id: MAP_TYPE_ELEMENTS.CARD_TYPE, iconType: ICON_TYPES.CARD, item: TOOL_BOX_ITEM[MAP_TYPE_ELEMENTS.CARD_TYPE] , title: 'Card' },
    { id: MAP_TYPE_ELEMENTS.FORM_TYPE, iconType: ICON_TYPES.CARD_LIST, item: TOOL_BOX_ITEM[MAP_TYPE_ELEMENTS.FORM_TYPE], title: 'Form' }
]
export const STATE_PREVIEW = 'STATE_PREVIEW'

export const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }

export const COLS = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }