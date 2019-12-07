import React from 'react';



const imageLinkForm = ({ onChangeEvent, onClickEvent }) => {
    return (
        <div className="ma4 mt0">
            <p className="f3">
                {"This Magic Brain Will detect faces in your pictures !"}
            </p>
            <div className="center">
                <div className="pattern pa4 br3 shadow-4 center">
                    <input onChange={onChangeEvent} className="w-70 f4 pa2 center" type="text" />
                    <button onClick={onClickEvent} className="btn w-3- grow f4 link ph3 pv2 dib white bg-green white">Detect</button>
                </div>
            </div>
        </div >
    )
}

export default imageLinkForm;