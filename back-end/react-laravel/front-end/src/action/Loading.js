import React from "react";


let Loading = () => {
    return (
        <div className="container mt-5">
            <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> <span>Loading Data Please wait...</span>
        </div>
    )
}

export default Loading;