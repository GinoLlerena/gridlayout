import React, {useReducer} from 'react'
import DynamicGrid from "./DynamicGrid"
import ToolBox from "./toolbar/ToolBox"
import { v4 as uuidv4 } from 'uuid'
import { map, omit, cloneDeep, flow } from 'lodash/fp'
import {BREAKPOINTS, STATE_PREVIEW, TOOL_BOX_ITEM} from "../constants/constants";
import Dropdown from "./misc/Dropdown";
import {getCurrentItem, getWidthByBreakpoint, objectToArray, transformToOptions} from "./utils/Utils";
import { findIndex} from "lodash";
import ConfigItemForm from "./ConfigItemForm";
import SingleCheck from "./misc/SingleCheck";

const cb = (prevState, nextState) => ({ ...prevState, ...nextState })

const transformTo = data => key => ({ value: key, label: key })

const defaultStyle = {
    height: '100vh',
    width: 1400
}

const defaultState = {
    layouts: { 'lg': [] },
    currentBreakpoint: 'lg',
    elements: {},
    allowOverlap: false,
    style: defaultStyle,
    options: transformToOptions(BREAKPOINTS),
    currentItem: null,
    display: 'lg'
}

function Layout(props){
    const [state, setState] = useReducer(cb, defaultState)
    const { currentBreakpoint, layouts, elements, style, options, allowOverlap, currentItem, display } = state

    const onChange = (key, value) => {
        setState({[key]: value})
    }

    const onChangeItem = (key, value) => {
        const clonedLayout = cloneDeep(layouts)
        const index = findIndex(clonedLayout[currentBreakpoint], item => item.i === currentItem)
        if(index !== -1) {
            clonedLayout[currentBreakpoint][index][key] = value
            setState({layouts: clonedLayout})
        }
    }

    const onBreakpointChange = (breakpoint) => setState({ currentBreakpoint: breakpoint })

    const onLayoutChange = (layout, layouts) => {
        setState({ layouts });
    }

    const onPutItem = (item) => {
        setState({
            layouts: {
                ...layouts,
                [currentBreakpoint]: layouts[currentBreakpoint].filter(({ i }) => i !== item.i)
            },
            elements: omit([item.i])(elements),
            currentItem: (currentItem === item.i ? null : currentItem)
        })
    }

    const onDrop = (layout, layoutItem, event) => {
        const id = event.dataTransfer.getData("text")
        onInsert(layout, layoutItem, id)
    }

    const onInsert = (layout, layoutItem, id) => {
        const newItem = { ...layoutItem, i: uuidv4(), ...TOOL_BOX_ITEM[id] }
        const items = map( item => (item.i === layoutItem.i ? newItem: item) )(layout)
        const element = { [newItem.i] : { id: newItem.i, type: id } }
        setState({
            layouts:{
                ...layouts, ...{ [currentBreakpoint]: items }
            },
            elements: { ...elements, ...element }
        })
    }

    const onSave = (e) => {
        const currentState = flow(
            cloneDeep,
            omit(['style', 'options', 'currentItem'])
        )(state)
        window.localStorage.setItem(STATE_PREVIEW, JSON.stringify(currentState))

        const w =  getWidthByBreakpoint(BREAKPOINTS, display)

        const h = 800

        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const left = ((width / 2) - (w / 2)) + dualScreenLeft
        const top = ((height / 2) - (h / 2)) + dualScreenTop

        window.open('preview',"", `width=${w},height=${h},top=${top},left=${left}`);

    }

    return(<>
        <div className="text-center">
            <h1>Dynamic Dashboard</h1>
        </div>
        <div className={'container'}>
            <div className="row">
                <div className="col">
                    <ToolBox />
                </div>
                <div className="col">
                    <Dropdown label={'Breakpoint'} selectedValue={BREAKPOINTS[currentBreakpoint]} options={options}/>
                    <SingleCheck label={'Allow overlap'} value={allowOverlap} onChange={(value) => onChange('allowOverlap', value)} />
                </div>
                <div className="col">
                   <ConfigItemForm onChange={onChangeItem} values={getCurrentItem(layouts?.[currentBreakpoint], currentItem)} />
                </div>
                <div className={"col-1"}>
                    <Dropdown label={'Display:'} selectedValue={display} options={objectToArray(BREAKPOINTS, transformTo)} onChange={(value) => onChange('display', value)}/>
                    <button type="button" className="btn btn-primary" onClick={(e) => onSave()}>Preview</button>
                </div>
            </div>
        </div>
        <div className={'container'} style={style} >
            <DynamicGrid
                currentItem={currentItem}
                onChange={onChange}
                allowOverlap={allowOverlap}
                onLayoutChange={onLayoutChange}
                elements={elements}
                onBreakpointChange={onBreakpointChange}
                layouts={layouts}
                currentBreakpoint={currentBreakpoint}
                onPutItem={onPutItem}
                onDrop={onDrop} />
        </div>
    </>)
}

export default Layout