import React from 'react';
import FaceBox from './FaceBox/FaceBox';
import './FaceRecognition.css';

const faceRecognition = (props) => {
    const boxes = props.box;
    const faceBox = boxes.map((box, i) => {
        return (
            <FaceBox className="bounding-box" key={i} box={box} />
        );
    });
    return (
        <div className="center">
            <div className="absolute mt-2">
                <img id="inputimage" src={props.url} alt="" height="auto" width="500px" />
                {faceBox}
            </div>
        </div>
    )
}

export default faceRecognition;