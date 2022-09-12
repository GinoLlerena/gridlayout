import React from 'react'
import SingleCheck from "./misc/SingleCheck";
import TextInput from "./misc/TextInput";
import {getOr} from "lodash/fp"


function ConfigItemForm(props) {
    const { onChange, values = {} } = props
    return(
       <div>
           <TextInput label={'ID'} value={values?.['i']} disabled={true} />
           <SingleCheck label={'Static'} value={getOr(false, 'static')(values)} onChange={value => onChange('static', value)} />
           <SingleCheck label={'Draggable'} value={getOr(false, 'isDraggable')(values)} onChange={value => onChange('isDraggable', value)} />
           <SingleCheck label={'Resizable'} value={getOr(true, 'isResizable')(values)} onChange={value => onChange('isResizable', value)} />
       </div>
    )
}

export default ConfigItemForm