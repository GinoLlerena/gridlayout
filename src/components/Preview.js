import React, {useEffect, useReducer} from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { map } from 'lodash/fp'
import  Card from '../components/toolbox/Card'
import {BREAKPOINTS, COLS, MAP_TYPE_ELEMENTS, STATE_PREVIEW} from "../constants/constants";
import Form from "./toolbox/Form";
import CustomImage from "./toolbox/Image";
import Carousel from "./toolbox/Carousel";
import {getBreakpoint} from "./utils/Utils";
const cb = (prevState, nextState) => ({ ...prevState, ...nextState })

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const ElementDictionary = {
    [MAP_TYPE_ELEMENTS.FORM_TYPE]: Form,
    [MAP_TYPE_ELEMENTS.CARD_TYPE]: Card,
    [MAP_TYPE_ELEMENTS.IMAGE_TYPE]: CustomImage,
    [MAP_TYPE_ELEMENTS.CAROUSEL_TYPE]: Carousel
}

function Preview(props){
    const [state, setState] = useReducer( cb, {})
    const { layouts, currentBreakpoint, elements, allowOverlap } = state

    const onBreakpointChange = (breakpoint) => setState({ currentBreakpoint: breakpoint })

    useEffect(()=>{
        const currentState = window.localStorage.getItem(STATE_PREVIEW)
        const previewState = JSON.parse(currentState)
        setState({ ...previewState })
    }, [])

    const generateDOM = () => {
        const layout = getBreakpoint(layouts, BREAKPOINTS, currentBreakpoint)
        return map( l => {
            const currentElement = elements[l.i]
            const Element = currentElement?.type ? ElementDictionary[currentElement.type] : null
            return (
                <div key={l.i} className={"overflow-hidden"} >
                    {Element && <Element />}
                </div>
            );
        })(layout)
    }

    return(
        <div className={'container'}>
            <ResponsiveReactGridLayout
                className={'h-100'}
                layouts={layouts}
                allowOverlap={allowOverlap}
                breakpoints={BREAKPOINTS}
                onBreakpointChange={onBreakpointChange}
                //onLayoutChange={onLayoutChange}
                // WidthProvider option
                measureBeforeMount={false}
                // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                // and set `measureBeforeMount={true}`.
                //useCSSTransforms={mounted}
                cols={COLS}
                compactType={null}
                isDraggable={false}
                isDroppable={false}
                isResizable={false}
                rowHeight={30}
            >
                {generateDOM()}
            </ResponsiveReactGridLayout>
        </div>
    )
}

export default Preview