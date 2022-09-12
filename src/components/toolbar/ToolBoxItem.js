import React from 'react'
import Icon from "../icons/Icon";

function ToolBoxItem(props){
    const { box } = props
    const onDragStart = e => {
        e.dataTransfer.setData("text/plain", box.id)
    }

    return(
        <div className="col" draggable={true} onDragStart={onDragStart}>
            <button type="button" className="btn btn-outline-secondary btn-lg"  title={box.title} >
                <Icon {...box} />
            </button>
        </div>
    )
}

export default ToolBoxItem
