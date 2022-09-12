import React from "react"

function Form(props){

    return(
        <form className="m-3">
            <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" name="name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Lastname:</label>
                <input type="text" className="form-control" id="lastname" placeholder="Enter lastname" name="lastname"/>
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"/>
            </div>
            <button type="button" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Form