import React from 'react';
import Aux from '../hoc/hocAux';
import './Spinner.css';
const spinner = () => {
    return (
        <Aux>
            <div className="Backdrop">
                <div className="Modal">
                    <div className="loader">Loading...</div>
                </div>
            </div>

        </Aux>
    );
}
export default spinner;