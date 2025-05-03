import React from 'react';
import TextInput from '@/Components/TextInput';

const HeaderSection = ({title = 'Title'}) => {
    return (
        <div className='educare-header-search-bar-main'>
            <div className="educare-header-search-bar-left flex items-center gap-2">
                <i className="icon-info text-[18px]"></i>
                <h5 className='text-[18px] font-semibold text-headingLight'>{title}</h5>
            </div>
        </div>
    );
};

export default HeaderSection;