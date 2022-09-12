import React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { map } from 'lodash/fp'
import  Card from '../components/toolbox/Card'
import {BREAKPOINTS, COLS, MAP_TYPE_ELEMENTS} from "../constants/constants";
import Form from "./toolbox/Form";
import CustomImage from "./toolbox/Image";
import Carousel from "./toolbox/Carousel";
import {closest} from "./utils/Utils";

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const ElementDictionary = {
    [MAP_TYPE_ELEMENTS.FORM_TYPE]: Form,
    [MAP_TYPE_ELEMENTS.CARD_TYPE]: Card,
    [MAP_TYPE_ELEMENTS.IMAGE_TYPE]: CustomImage,
    [MAP_TYPE_ELEMENTS.CAROUSEL_TYPE]: Carousel
}

function DynamicGrid(props){
    const { onBreakpointChange, onLayoutChange, onPutItem, layouts, currentBreakpoint, onDrop, elements, allowOverlap, onChange, currentItem } = props

    const generateDOM = () => {
        return map( l => {
            const currentElement = elements[l.i]
            const Element = currentElement?.type ? ElementDictionary[currentElement.type] : null
            return (
                <div key={l.i} data-key={l.i}
                     className={(l.static ? "overflow-hidden static" : "overflow-hidden") + (currentItem === l.i ? " border border-danger" : "") }
                     onClick={onClick}>
                    <div className="hide-button" onClick={() => onPutItem(l)} style={{zIndex: 100}}>
                        &times;
                    </div>
                    {Element && <Element />}
                </div>
            );
        })(layouts[currentBreakpoint])
    }

    const onClick = e => {
        const el = e.target
        const value = closest(el)
        onChange('currentItem', value)
    }

    return(
        <ResponsiveReactGridLayout
            className={'h-100'}
            layouts={layouts}
            allowOverlap={allowOverlap}
            breakpoints={BREAKPOINTS}
            onBreakpointChange={onBreakpointChange}
            onLayoutChange={onLayoutChange}
            measureBeforeMount={false}
            cols={COLS}
            compactType={null}
            onDrop={onDrop}
            isDroppable={true}
            rowHeight={30}
        >
            {generateDOM()}
        </ResponsiveReactGridLayout>
    )
}

export default DynamicGrid