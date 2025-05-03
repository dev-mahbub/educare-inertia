import React from 'react';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';

const HeaderSeacrhBar = ({ schools = '' }) => {
    return (
        <div className="educare-header-search-bar-main mb-2.5">
            <div className="educare-header-search-bar-left flex items-center gap-2">
               
            </div>
            <div className="educare-header-search-bar-right maxXs:flex-grow">
                <div className="educare-header-search-bar-form educare-student-header-search-bar-form">
                    <form>
                        <TextInput type="text" placeHolder="Search ... " />
                        <button type="submit">
                            <i className="icon-search-interface-symbol text-[18px] text-heading"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HeaderSeacrhBar;
