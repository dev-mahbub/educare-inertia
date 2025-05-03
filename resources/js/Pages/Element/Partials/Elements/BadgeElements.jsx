import React from 'react';

const BadgeElements = () => {
    return (
        <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Badges Style</h5>
            <div className='flex flex-wrap gap-4'>
                <span className='badge primary'>Badge Primary</span>
                <span className='badge success'>Badge Success</span>
                <span className='badge warning'>Badge Warning</span>
                <span className='badge info'>Badge Info</span>
                <span className='badge dark'>Badge Dark</span>
                <span className='badge danger'>Badge Danger</span>
                <span className='badge gray'>Badge Disable</span>
            </div>
        </div>
    );
};

export default BadgeElements;