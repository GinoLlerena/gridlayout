import React from "react"

function Card(props){
    return(
        <div className="card">
            <img src="https://media.istockphoto.com/photos/monarch-on-yellow-sunflowers-picture-id1210792722" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                        the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
        </div>
    )
}

export default Card