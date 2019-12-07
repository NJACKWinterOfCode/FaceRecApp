import React from 'react';
import Aux from '../hoc/hocAux';

const navigation = (props) => {
    var display = null;
    if (props.isSigned) {
        display =
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => props.routeChanger('signIn')} className="f3 link dim black pa3 pointer">Sign Out</p>
            </nav>;
    }
    return (
        <Aux>
            {display}
        </Aux>
    );
}

export default navigation;