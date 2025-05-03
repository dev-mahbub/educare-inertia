import Dropdown from '@/Components/Dropdown';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const SearchBar = ({title}) => {

    return (
        <div className="educare-header-search-bar-main mb-2.5">
            <div className="educare-header-search-bar-left flex items-center gap-2">
                <Link href={route('classwork.create')}
                    className="educare-primary-btn-md-fill leading-10"
                >
                    <i className='icon-PlusCircle'></i> Add Classwork
                </Link>
            </div>
            <div className="educare-header-search-bar-right maxXs:flex-grow">
                <div className="educare-header-search-bar-form educare-student-header-search-bar-form">
                    <form onSubmit="#">
                        <TextInput type="text" placeHolder="Search..." />
                        <button type="submit">
                            <i className="icon-search-interface-symbol text-[18px] text-heading"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;