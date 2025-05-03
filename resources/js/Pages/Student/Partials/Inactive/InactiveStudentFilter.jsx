import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";


const InactiveStudentFilter = ({
    studentLength,
    setLoading,
    classrooms = []
}) => {

    const {
        data,
        setData
    } = useForm({
        classroom_id: "",
        search_value: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('student.inactive_list'), data);
            setLoading(false);
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('student.inactive_list'));
    }


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
                    <form>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {studentLength}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="All"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    setData("classroom_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="search_value"
                                                value={data.search}
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
                                            type="button"
                                            onClick={(e) => handleSearch(e)}
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
                                            onClick={(e) => handleReset(e)}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                {studentLength > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                target="_blank"
                                                href={route('export_excel.student_inactive_list', {
                                                    classroom_id: data?.classroom_id ?? "",
                                                    search: data?.search_value ?? ""
                                                })}
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InactiveStudentFilter;
