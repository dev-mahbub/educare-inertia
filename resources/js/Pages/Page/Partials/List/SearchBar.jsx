import { Link } from '@inertiajs/react';

const SearchBar = ({title}) => {

    return (
        <div className="educare-header-search-bar-main mb-2.5">
            <div className="educare-header-search-bar-left flex items-center gap-2">
                <Link href={route('page.create')}
                    className="educare-primary-btn-md-fill leading-10"
                >
                    <i className='icon-PlusCircle'></i> Create Page
                </Link>
            </div>
        </div>
    );
};

export default SearchBar;
