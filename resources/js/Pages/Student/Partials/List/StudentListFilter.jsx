import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { concatName } from "@/Hooks/GlobalFunction";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const StudentListFilter = ({
    students = [],
    classrooms = [],
    boardingType = [],
    data,
    setData,
    studentData,
    setStudentData,
}) => {

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('student.list'), data);
    };

    const handleSearchRest = (e) => {
        e.preventDefault();
        router.get(route('student.list'));
    };

    const handleDownloadExcel = (e) => {
        window.open(route('export_excel.download_student_excel', {classroom_id: data?.classroom_id, boarding_type: data?.boarding_type, student_search: data?.student_search}));
    };


    const handleStudentSearch = (value) => {
        const searchTerms = value?.toLowerCase().split(" ").filter(term => term.trim() !== "");
        const filteredData = students.filter(student => {
            for (const term of searchTerms) {
                if (!(
                    concatName(student?.first_name, student?.middle_name, student?.last_name).toLowerCase().includes(term) ||
                    concatName(student?.fatherFirstName, student?.fatherMiddleName, student?.fatherLastName).toLowerCase().includes(term) ||
                    concatName(fatherPhone).toLowerCase().includes(term) ||
                    concatName(admission_no).toLowerCase().includes(term)
                )) {
                    return false;
                }
            }
            return true;
        });
        setStudentData(filteredData);
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
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {students?.length}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="student_custom_field_id"
                                                data_label="Custom Field"
                                                data={[]}
                                                value={data.student_custom_field_id}
                                                onChange={(e) =>
                                                    setData("student_custom_field_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.student_custom_field_id}
                                                className="mt-2"
                                            />
                                        </div> */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="All Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    setData("classroom_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="boarding_type"
                                                data_label="All"
                                                data={boardingType}
                                                value={data.boarding_type}
                                                onChange={(e) =>
                                                    setData("boarding_type", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="student_search"
                                                value={data.search}
                                                onChange={(e) => {
                                                    setData("student_search", e.target.value);
                                                   // handleStudentSearch(e.target.value);
                                                }
                                                }
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
                                        <button
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => handleSearch(e)}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Excel Sheet"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            className="educare-success-btn-md-fill"
                                            onClick={(e) => handleDownloadExcel(e)}
                                        >
                                            <i className="icon-FileX"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Import"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            href="/import/student"
                                            className="educare-dark-btn-md-fill"
                                        >
                                            <i className="icon-upload"></i>
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
                                        <button
                                            type="button"
                                            onClick={(e) => handleSearchRest(e)}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button>
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

export default StudentListFilter;
