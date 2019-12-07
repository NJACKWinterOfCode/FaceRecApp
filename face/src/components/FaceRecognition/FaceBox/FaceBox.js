import React from 'react';
import './FaceBox.css';

const faceBox = ({ box }) => {
    return (<div
        className="bounding-box"
        style={{
            top: box.top,
            bottom: box.bottom,
            right: box.right,
            left: box.left
        }}
    ></div>)
}

export default faceBox;