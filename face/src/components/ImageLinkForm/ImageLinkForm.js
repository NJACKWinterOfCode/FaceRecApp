import React from 'react';
import "./ImageLinkform.css"


const imageLinkForm = ({ onChangeEvent, onClickEvent }) => {
    return (
        <div className="image-form">
            <p className="headline">
                {"This Magic Brain Will detect faces in your pictures !"}
            </p>
            <div className="center">
                    <input onChange={onChangeEvent} className="input-area" type="text" placeholder="Type Image URL" />
                    <button onClick={onClickEvent} className="detectbtn">Detect</button>
            </div>
        </div >
    )
}

export default imageLinkForm;