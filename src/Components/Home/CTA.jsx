import React from 'react';
import { Link } from 'react-router';

const CTA = () => {
    return (
        <div className='text-center my-9 bg-neutral py-9 rounded-2xl'>
            <div>
                <h1 className='text-5xl font-semibold text-white'>
                    Ready to build your circle?
                </h1>
                <p className='my-5 text-zinc-300'>
                    Join thousands of people finding their passion and creating 
                    <br />
                    memories every single day.
                </p>
            </div>
            <div>
                <Link className='btn btn-primary' to={'/login'}>Get Started Now</Link>
            </div>
        </div>
    );
};

export default CTA;