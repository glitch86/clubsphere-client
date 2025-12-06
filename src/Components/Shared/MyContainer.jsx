import React from 'react';

const MyContainer = ({children}) => {
    return (
        <div className='container'>
            {children}
        </div>
    );
};

export default MyContainer;