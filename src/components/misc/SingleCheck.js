import React from 'react'

function SingleCheck(props) {
    const { value, label, onChange } = props
    return(
        <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={value} id="flexCheckDefault" onChange={e=> onChange(e.target.checked) }/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                {label}
            </label>
        </div>
    )
}

export default SingleCheck