import React from 'react'
import map from 'lodash/fp/map'

const Option = (props) => {
    const { option } = props
    return(<option value={option.value}>{option.label}</option>)
}

function Dropdown(props){
    const { label, options, onChange, selectedValue } = props
    return(
        <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">{label}</label>
            <select value={selectedValue} className="form-select" aria-label={label} onChange={(e)=> onChange(e.currentTarget.value)}>
                {map(option => <Option key={option.value} option={option} /> )(options)}
            </select>
        </div>
    )
}

export default Dropdown