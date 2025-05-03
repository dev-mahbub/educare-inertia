import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import useScrollableFilterBar from '@/Utils/FilterArrow';
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from '@mui/material';
import { useEffect } from 'react';

const StudentDocumentReportFilter = ({ studentCount, setLoading, classrooms, setFilterText }) => {

    const {
        data,
        setData
    } = useForm({
        search_value: '',
        classroom_id: '',
    });

    useEffect(() => {
        setFilterText(data?.search_value ?? "");
    },[data?.search_value]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('student_report.student_document_report'), data);
            setLoading(false);
        }
    }

    const handleReset = () => {
        router.get(route('student_report.student_document_report'));
        setLoading(false);
    }

    //scrollable filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <div>
            <div className='flex justify-between flex-wrap items-center mb-2.5'>
                <div className="educare-card-title mr-auto pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Student Document Report
                    </h5>
                </div>
                {studentCount > 0 &&
                    <div>
                        <Tooltip
                            title="Download Excel"
                            placement="top"
                            arrow
                        >
                            <a
                                target='_blank'
                                href={route('export_excel.student_document_report', {classroom_id: data?.classroom_id ?? ""})}
                                className="educare-success-btn-md-fill"
                            >
                                <i className="icon-FileX"></i>
                            </a>
                        </Tooltip>
                    </div>
                }
            </div>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {studentCount}</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            {/* Replace changeable inputs */}
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search_value"
                                                    value={data.search_value}
                                                    onChange={(e) => setData("search_value", e.target.value)}
                                                    placeHolder="Search"
                                                    type="text"
                                                    className="block"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) =>
                                                        setData("classroom_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                            </div>
                                            {/* Replace changeable inputs */}
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    {/* Replace changeable buttons */}
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
                                                type="button"
                                                onClick={handleSearch}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                className="educare-gray-btn-md-fill"
                                                type="button"
                                                onClick={handleReset}
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    {/* Replace changeable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDocumentReportFilter;
