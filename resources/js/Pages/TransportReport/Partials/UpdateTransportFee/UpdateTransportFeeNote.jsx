import React from 'react';

const UpdateTransportFeeNote = () => {
    return (
        <div className="educare-input-field-notes mb-5">
            <span className='text-danger text-[16px] font-semibold'>Important!!</span>
            <p className='text-[14px] text-headingLight'>Use this option , if you have updated the transport fee amount of any Stoppage or/and any Area and it is not being reflected in the student's current transport fee or in its fee structure!.</p>
            <p className='text-[14px] text-headingLight'>Please note that it will override the previous fee with the most recent fee set by you for all the students availing the transport facility. If you don't want this to happen then please update individual student's fee from Route Allocation screen.</p>
        </div>
    );
};

export default UpdateTransportFeeNote;