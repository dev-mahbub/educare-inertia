import React from 'react';
import SchoolFilter from './SchoolFilter';

const SchoolFilterBar = ({}) => {
    return (
        <div className='educare-admission-filtar-bar-area'>
            <div className="py-3 pt-[9px] educare-admission-filtar-bar">
                <div className="educare-admission-filtar-bar-count">
                    <span>Total: 8</span>
                </div>
                <SchoolFilter />
            </div>
        </div>
    );
};

export default SchoolFilterBar;