import React from 'react';


const rank = ({ user }) => {
    return (
        <div>
            <div className="white f3">
                {`${user.name} your rank is #${user.entries}`}
            </div>
        </div>
    )
}

export default rank;