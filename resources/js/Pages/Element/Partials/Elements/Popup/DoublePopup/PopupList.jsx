import PrimaryButton from '@/Components/PrimaryButton';
import React from 'react';
import FirstPopup from './FirstPopup';
import { useState } from 'react';

const PopupList = () => {
    const [firstPopup, setFirstPopup] = useState(false);
    const handleFirstPopupClick = () => {
        setFirstPopup(!firstPopup);
    }; 

    return (
        <>
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Double Popup Style</h5>
                <div className='flex flex-wrap gap-4'>
                    <PrimaryButton
                        className="educare-warning-btn-md-fill" onClick={handleFirstPopupClick}
                    >
                        Popup Click Btn
                    </PrimaryButton>
                </div>
            </div>
            <FirstPopup
                firstPopup={firstPopup}
                setFirstPopup={setFirstPopup}
            />
        </>
    );
};

export default PopupList;