import React from "react";

function TextInput(props){
    const { placeholder, value, label, onChange, disabled } = props
    return(
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">{label}</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" disabled={disabled} defaultValue={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
        </div>
    )
}

export default TextInput