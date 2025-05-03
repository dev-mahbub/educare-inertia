import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
const FeeCancellationReportFilter = ({
    classrooms = [],
    students = [],
    setLoading,
    student,
    cancellationReports = []
}) => {
    const [selectedStudent, setSelectedStudent] = useState({});
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [params, setParams] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
        student_id: "",
        admission_no: "",
    });

    useEffect(() => {
        setParams({
            classroom_id: data?.classroom_id ?? "",
            student_id: data?.student_id ?? "",
            admission_no: data?.admission_no ?? "",
        });
    }, [data]);

    useEffect(() => {
        setFilteredStudents(students?.sort(customSort));
    }, [students]);

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        if (selectedStudent?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: selectedStudent?.admission_no ?? "",
                classroom_id: selectedStudent?.classroom_id ?? "",
                student_id: selectedStudent?.id ?? "",
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: selectedStudent?.id ?? "",
            }));
        }
    }, [selectedStudent]);


    // handle admission no change start
    const handleAdmissionNoChange = (e) => {
        const admission_no = e.target.value;

        setData((prevData) => ({
            ...prevData,
            admission_no: admission_no
        }));
    }

    const handleAdmissionNoKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            const selected_student = filteredStudents?.find(item => item?.admission_no == data?.admission_no);

            setSelectedStudent(selected_student);

            const form_data = {
                classroom_id: selected_student?.classroom_id ?? data?.classroom_id,
                admission_no: data?.admission_no ?? "",
            }

            handleCancellationReportFilter(form_data);
        }
    }
    // handle admission no change end


    // handle classroom change start
    const handleClassroomChange = (e) => {
        e.preventDefault();

        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: classroom_id,
            student_id: "",
        }));

        const form_data = {
            classroom_id: classroom_id,
        }

        handleCancellationReportFilter(form_data);
    }
    // handle classroom change end


    // handle student change start
    const handleStudentChange = (e) => {
        e.preventDefault();

        const student_id = e.target.value;
        const selected_student = filteredStudents?.find(item => item?.id == student_id);

        setSelectedStudent(selected_student);

        setData((prevData) => ({
            ...prevData,
            admission_no: selected_student?.admission_no ?? "",
            student_id: selected_student?.id ?? "",
        }));

        const form_data = {
            classroom_id: selected_student?.classroom_id ?? data?.classroom_id,
            student_id: selected_student?.id ?? "",
        }

        handleCancellationReportFilter(form_data);
    }
    // handle student change end


    // handle cancellation report filter start
    const handleCancellationReportFilter = (form_data) => {
        setLoading(false);

        router.post(route('fee_report.fee_cancellation_report'), form_data)
    }
    // handle cancellation report filter end

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here


    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.classroom_roll && b.classroom_roll && a.classroom_roll.roll_no != null && b.classroom_roll.roll_no != null) {
            return a.classroom_roll.roll_no - b.classroom_roll.roll_no;
        } else if (!a.classroom_roll || a.classroom_roll.roll_no == null) {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the end of the sorted array
        }
    }
    // sort students by classroom roll end

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData} className="mb-2.5">
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-card-title mr-auto pb-none">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Cancelled Payments Report
                                </h5>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span
                                        className="educare-header-filter-prev"
                                        onClick={handlePrevClick}
                                    >
                                        <i className="icon-left-chevron"></i>
                                    </span>
                                    <div
                                        className="educare-header-filtar-bar-fields-wrap"
                                        ref={listRef}
                                        style={{
                                            transform: `translateX(-${
                                                currentIndex * 120
                                            }px)`,
                                        }}
                                    >
                                        {/* Replace changable inputs */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    handleClassroomChange(e)
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
                                                data={filteredStudents}
                                                value={data.student_id}
                                                onChange={(e) =>
                                                    handleStudentChange(e)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.student_id}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="admission_no"
                                                value={data.admission_no}
                                                onChange={(e) =>
                                                    handleAdmissionNoChange(e)
                                                }
                                                onKeyPress={(e) => {
                                                    handleAdmissionNoKeyPress(e)
                                                }}
                                                placeHolder="Admission No"
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.admission_no
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Replace changable inputs */}
                                    </div>
                                    <span
                                        className="educare-header-filter-next"
                                        onClick={handleNextClick}
                                    >
                                        <i className="icon-chevron"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                {/* Replace changable buttons */}

                                {/* <div>
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
                                </div> */}
                                {Object.keys(cancellationReports)?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Pdf"
                                            placement="top"
                                            arrow
                                        >
                                            <a
                                                target="_blank"
                                                href={route('pdf_fee_demand_slip.fee_cancellation_report', params)}
                                                className="educare-warning-btn-md-fill"
                                            >
                                                <i className="icon-FilePdf"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }

                                {Object.keys(cancellationReports)?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                        >
                                            <a
                                                target="_blank"
                                                href={route('export_excel.fee_cancellation_report', params)}
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }

                                {/* <div>
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
                                </div> */}

                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeeCancellationReportFilter;
