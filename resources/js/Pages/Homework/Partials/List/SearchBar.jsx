import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';
import React from 'react';

const SearchBar = ({ title }) => {
    const handleSearchBar = (e) => {
        e.prevent.default();
    }

    return (
        <div className="educare-header-search-bar-main mb-2.5">
            <div className="educare-header-search-bar-left flex items-center gap-2">
                <Link href={route('homework.create')}
                    className="educare-primary-btn-md-fill leading-10"
                >
                    <i className='icon-PlusCircle'></i> Add Homework
                </Link>
            </div>
            <div className="educare-header-search-bar-right maxXs:flex-grow">
                <div className="educare-header-search-bar-form educare-student-header-search-bar-form">
                    <form onSubmit={handleSearchBar}>
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