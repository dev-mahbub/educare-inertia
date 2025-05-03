import PrimaryButton from '@/Components/PrimaryButton';
import React from 'react';
import { useState } from 'react';
import SinglePopup from './SinglePopup'; 

const SinglePopupMain = () => {
    const [singlePopup, setSinglePopup] = useState(false);
    const handleSinglePopupClick = () => { 
        setSinglePopup(!singlePopup);
    };

    return (
        <>
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Single Popup Style</h5>
                <div className='flex flex-wrap gap-4'>
                    <PrimaryButton
                        className="educare-warning-btn-md-fill" onClick={handleSinglePopupClick}
                    >
                        Popup Click Btn
                    </PrimaryButton>
                </div>
            </div>
            <SinglePopup
                singlePopup={singlePopup}
                setSinglePopup={setSinglePopup}
            />
        </>
    );
};

export default SinglePopupMain;