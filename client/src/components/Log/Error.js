import React from 'react';

const Error = (props) => {

    console.log('error component')

    return (
        <div className="error">
            <h5>{props.error}</h5>
            <h1>error</h1>
        </div>
    );
};

export default Error;