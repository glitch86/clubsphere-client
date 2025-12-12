import React from 'react';
import { Link } from 'react-router';

const ManageClubs = () => {
    return (
        <div>
            manage
            <Link to={'/dashboard/add-clubs'} className='btns'>add</Link>
        </div>
    );
};

export default ManageClubs;