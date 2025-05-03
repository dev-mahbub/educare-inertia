import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";

const GeneratedTCReportFilter = ({
    generatedTcLength,
    setLoading,
    classrooms = [],
    academicSession = [],
    statusArr = [],
    setParams
}) => {

    const {
        data,
        setData
    } = useForm({
        search_value: "",
        academic_year_id: "",
        status: "",
        classroom_id: "",
    });

    useEffect(() => {
        setParams({
            search_value: data?.search_value ?? "",
            academic_year_id: data?.academic_year_id ?? "",
            status: data?.status ?? "",
            classroom_id: data?.classroom_id ?? "",
        });
    }, [setParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('student_certificate.generated_tc_report'), data);
            setLoading(false);
        }
    }

    const handleReset = () => {
        router.get(route('student_certificate.generated_tc_report'));
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
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {generatedTcLength}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="search_value"
                                                value={data.search_value}
                                                onChange={(e) => setData("search_value", e.target.value)}
                                                placeHolder="Search here"
                                                type="text"
                                                className="block"
                                            />
                                        </div>

                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="academic_year_id"
                                                data_label="All Session"
                                                data={academicSession}
                                                value={data.academic_year_id}
                                                onChange={(e) =>
                                                    setData("academic_year_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="status"
                                                data_label="Status"
                                                data={statusArr}
                                                value={data.status}
                                                onChange={(e) =>
                                                    setData("status", e.target.value)
                                                }
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
                                {/* Replace changable buttons */}
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
                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GeneratedTCReportFilter;
