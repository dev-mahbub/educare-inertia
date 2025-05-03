import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";

const StudentWiseAttendanceFilter = ({
    classrooms = [],
    students = [],
    setLoading = false,
    attendanceCount = 0,
}) => {
    const [studentData, setStudentData] = useState('');
    const {
        data,
        setData,
        errors,
    } = useForm({
        admission_no: "",
        classroom_id: "",
        student_id: "",
    });

    const handleClassroom = (id) => {
        const filteredStudent = students?.filter((item) => item?.classroom_id == id);
        setStudentData(filteredStudent);
    }

    const handleAdmissionNo = (id) => {
        const singleStudent = studentData?.find((item) => item?.id == id);
        setData({
            ...data,
            'student_id' : id,
            'admission_no' : singleStudent?.admission_no,
        })
    }

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('classroom_attendance_report.studentwise_attendance'), data);
        setLoading(false);
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
        <>
            <div className="educare-input-field-notes mb-2.5">
                <ul>
                    <li>
                        <span className="mr-1"> <i className="icon-info"></i></span>
                        Please make sure you have entered - "Total working days" and "bonus days" in menu - Set Working and Bonus days.
                    </li>
                </ul>
            </div>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {attendanceCount}</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            {/* Replace changable inputs */}
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="admission_no"
                                                    value={data?.admission_no}
                                                    onChange={(e) => setData("admission_no", e.target.value)}
                                                    placeHolder="Admission No."
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError message={errors.admission_no} className="mt-2" />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) => {
                                                        setData("classroom_id", e.target.value)
                                                        handleClassroom(e.target.value)
                                                    }
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.classroom_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="student_id"
                                                    data_label="Student"
                                                    data={studentData}
                                                    value={data.student_id}
                                                    onChange={(e) => {
                                                        handleAdmissionNo(e.target.value)
                                                    }
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.student_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            {/* Replace changable inputs */}
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
        </>

    );
};

export default StudentWiseAttendanceFilter;
