import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NullifyPopup from "./NullifyPopup/NullifyPopup";

const NullifyFeesFilter = ({ classrooms = [], students = [], student, setStudentFeeStructureData, setLoading, nullifyFeeIds = [], setFeeNullifiedStatus, setSelectedStudent }) => {
    const [nullifyPopup, setNullifyPopup] = useState(false);

    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudentData, setSelectedStudentData] = useState({});
    const [selectedFeeIds, setSelectedFeeIds] = useState([]);

    const handleNullifyModalClick = () => {
        if (nullifyFeeIds?.length > 0) {
            setNullifyPopup(!nullifyPopup);
        }
        else {
            toast.error("Please select at least one fee type.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    };

    const [classroomId, setClassroomId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [admissionNo, setAdmissionNo] = useState("");

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        admission_no: "",
        classroom_id: "",
        student_id: "",
        fee_ids: selectedFeeIds
    });

    useEffect(() => {
        setFilteredStudents(students.sort(customSort));
    }, [students]);

    // set fee_ids data start
    useEffect(() => {
        setSelectedStudent(selectedStudentData);
    }, [selectedStudentData]);

    // set fee_ids data start
    useEffect(() => {
        setSelectedFeeIds(nullifyFeeIds);
    }, [nullifyFeeIds]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            fee_ids: selectedFeeIds
        }));
    }, [selectedFeeIds]);
    // set fee_ids data end

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
        }));
    }, [classroomId])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId,
        }));
    }, [studentId]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            admission_no: admissionNo,
        }));
    }, [admissionNo]);

    // set selected student data
    useEffect(() => {
        if (student?.id != null) {
            setSelectedStudentData(student)
            setClassroomId(student?.classroom_id);
            setStudentId(student?.id);
            setAdmissionNo(student?.admission_no);
        }
    }, [student])
    // end set selected student data


    // update form data if selected student data is changed
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            admission_no: selectedStudentData?.admission_no ?? "",
            classroom_id: selectedStudentData?.classroom_id ?? data?.classroom_id,
            student_id: selectedStudentData?.id ?? "",
        }))
    }, [selectedStudentData, data?.classroom_id])
    // end update form data if selected student data is changed


    // handle admnission no change start
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

            const form_data = {
                admission_no: data?.admission_no,
            }

            router.post(route('fee_refund.fee_nullify'), form_data);
        }
    }
    // handle admnission no change end


    // handle classroom change
    const handleClassroomChange = (event) => {
        setSelectedStudentData({});

        setClassroomId(event.target.value);

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: event.target.value,
            student_id: "",
        }));

        const form_data = {
            classroom_id: event.target.value,
        }

        router.post(route('fee_refund.fee_nullify'), form_data);
    }
    // end handle classroom change



    // handle student change
    const handleStudentChange = (event) => {
        const selectedStudent = filteredStudents?.find(item => item?.id == event.target.value)

        if (selectedStudent?.id != null) {
            setSelectedStudentData(selectedStudent);
        }
        else {
            setSelectedStudentData({});
        }

        setStudentId(selectedStudent?.id);
        setAdmissionNo(selectedStudent?.admission_no);

        setData((prevData) => ({
            ...prevData,
            admission_no: selectedStudent?.admission_no ?? "",
            student_id: selectedStudent?.id ?? "",
        }));
    }
    // end handle student change



    // handle form reset
    const handleReset = () => {
        setStudentFeeStructureData([]);
        setFilteredStudents([]);
        setSelectedStudentData({});
        reset();
    }
    // end handle form reset



    // get student fee structure
    const getStudentFeeStructure = (e) => {
        e.preventDefault();

        if (data?.student_id == "") {
            toast.error("Please select a student.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else {
            setLoading(false);

            router.post(route('fee_refund.fee_nullify'), data);
        }

    }
    // get student fee structure


    // handle nullify form submit start
    const handleNullifyFee = (e) => {
        e.preventDefault();
    };
    // handle nullify form submit end



    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.roll_no != "" && b.roll_no != "") {
            return a.roll_no - b.roll_no;
        } else if (a.roll_no == "") {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the start of the sorted array
        }
    }
    // sort students by classroom roll end


    return (
        <>

            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={handleNullifyFee}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-card-title leading-none pb-none">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Student Fee Structure
                                    </h5>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.admission_no
                                                    }
                                                    onChange={(e) =>
                                                        handleAdmissionNoChange(e)
                                                    }
                                                    onKeyPress={(e) => {
                                                        handleAdmissionNoKeyPress(e)
                                                    }}
                                                    className="block"
                                                    placeHolder="Admission No."
                                                />
                                                <InputError
                                                    message={
                                                        errors.admission_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
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
                                                onClick={(e) => {
                                                    getStudentFeeStructure(e)
                                                }}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
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
                                                className="educare-gray-btn-md-fill"
                                                onClick={(e) => {
                                                    handleReset()
                                                }}
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <PrimaryButton
                                            // disabled={processing}
                                            className="educare-primary-btn-md-fill"
                                            onClick={handleNullifyModalClick}
                                        >
                                            <i className='icon-ArrowCircleUp'></i> Nullify fee Structure

                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <NullifyPopup
                nullifyPopup={nullifyPopup}
                setNullifyPopup={setNullifyPopup}
                formData={data}
                setSelectedFeeIds={setSelectedFeeIds}
                setFeeNullifiedStatus={setFeeNullifiedStatus}
            />
        </>
    );
};

export default NullifyFeesFilter;
