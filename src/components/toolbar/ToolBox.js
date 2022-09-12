import React from 'react'
import { map } from 'lodash/fp'
import ToolBoxItem from "./ToolBoxItem";
import {TOOL_BOX_LIST} from "../../constants/constants";

function ToolBox(props){
    const items = map((box) => <ToolBoxItem key={box.id} box={box} />)(TOOL_BOX_LIST)
    return(
        <div className="row row-cols-auto">
            {items}
        </div>)
}

export default ToolBox