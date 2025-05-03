import PrimaryButton from '@/Components/PrimaryButton';
import React from 'react'; 
import { useState } from 'react'; 
import ListPopup from './ListPopup'; 

const ListPopupMain = () => {
    const [listPopup, setListPopup] = useState(false);
    const handleListPopupClick = () => {
        setListPopup(!listPopup);
    };
 
    return (
        <>
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>List Popup Style</h5>
                <div className='flex flex-wrap gap-4'>
                    <PrimaryButton
                        className="educare-warning-btn-md-fill" onClick={handleListPopupClick}
                    >
                        Popup Click Btn
                    </PrimaryButton>
                </div>
            </div>
            <ListPopup
                listPopup={listPopup}
                setListPopup={setListPopup}
            />
        </>
    );
};

export default ListPopupMain;