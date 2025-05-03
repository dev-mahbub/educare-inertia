import TextInput from '@/Components/TextInput';
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link } from '@inertiajs/react';
import { Tooltip } from '@mui/material';


const SummaryFilter = ({
    data = '',
    setData = '',
    studentCount = '',
    maleStudents = '',
    femaleStudents = '',
    otherStudents = '',
}) => {

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={studentCount}>
                        <div className=" educare-header-filtar-bar-inner-main ">
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {studentCount}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-filter-attendances">
                                            <ul>
                                                <li>
                                                    <Tooltip
                                                        title="Total Male Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>M</button>
                                                            <span>{maleStudents}</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                                <li>
                                                    <Tooltip
                                                        title="Total Female Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>F</button>
                                                            <span>{femaleStudents}</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                                <li>
                                                    <Tooltip
                                                        title="Total Other Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>O</button>
                                                            <span>{otherStudents}</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                                <li>
                                                    <Tooltip
                                                        title="Total New Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>N</button>
                                                            <span>04</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                                <li>
                                                    <Tooltip
                                                        title="Total Promoted Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>P</button>
                                                            <span>06</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="search_value"
                                                value={data?.search}
                                                onChange={(e) => setData("search_value", e.target.value)}
                                                placeHolder="Search"
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-secondary-btn-md-fill"
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Download Excel"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-success-btn-md-fill"
                                            as='button'
                                        >
                                            <i className="icon-FileX"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Download PDF"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-warning-btn-md-fill"
                                            as='button'
                                        >
                                            <i className="icon-FilePdf"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SummaryFilter;
