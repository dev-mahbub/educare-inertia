import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateFeeStructureFilter = ({
    classrooms = [],
    students = [],
    setStudentFeeStructureData,
    setSelectedStudent,
    setLoading,
    student = {},
}) => {

    const [studentsData, setStudentsData] = useState([]);
    const [selectedStudentData, setSelectedStudentData] = useState({});


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
        classroom_id: "",
        student_id: "",
        // select_group: "",
        admission_no: "",
    });


    const studentFilterData = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
        }));

        setStudentsData(students);
        // setStudentsData(students?.sort(customSort)?.filter(item => item?.classroom_id == classroomId)?.map(item => ({
        //     ...item,
        //     title: `${item?.classroom_roll?.roll_no ?? ""} - ${item?.first_name} ${item?.middle_name} ${item?.last_name}`
        // })));
    }, [classroomId, students]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId,
        }));
    }, [studentId])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            admission_no: admissionNo,
        }));
    }, [admissionNo])


    // set selected student data
    useEffect(() => {
        if (student?.id != null) {
            setSelectedStudentData(student)
            setClassroomId(student?.classroom_id);
            setStudentId(student?.id);
            setAdmissionNo(student?.admission_no);
        }
        else {
            setStudentId("");
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

        setSelectedStudent(selectedStudentData);
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
                classroom_id: data?.classroom_id ?? "",
            }

            router.post(route('fee.update_class_fee_structure'), form_data);
        }
    }
    // handle admnission no change end


    //handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setClassroomId(classroom_id);

        setSelectedStudentData({});
        setStudentFeeStructureData([]);

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            student_id: "",
            admission_no: "",
        }));

        const form_data = {
            classroom_id: classroom_id
        }

        router.post(route('fee.update_class_fee_structure'), form_data)
    }
    //handle classroom change end

    //handle student change start
    const handleStudentChange = (e) => {
        const student_id = e.target.value;

        let selectedStudent = null;

        for (const groupedStudents of Object.values(studentsData)) {
            selectedStudent = Object.values(groupedStudents?.options).find(student => student.id === student_id);
            if (selectedStudent) {
                break;
            }
        }

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
    //handle student change end


    // get student fee structure start
    const getFeeStructureByStudent = (e) => {
        e.preventDefault();

        if (data?.student_id == "") {
            toast.error("Please select a student.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else {
            const form_data = {
                // admission_no: data?.admission_no,
                student_id: data?.student_id,
            }

            setLoading(false);

            router.post(route('fee.update_class_fee_structure'), form_data)
        }
    }
    // get student fee structure end


    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    const handleReset = () => {
        setStudentsData({
            active : {
                student_type : 'Active',
                options : []
            },
            inactive : {
                student_type : 'InActive',
                options : []
            },
            tc : {
                student_type : 'TC',
                options : []
            }
        });

        setSelectedStudent({});
        setStudentFeeStructureData([]);
        reset();
    }


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

        <>

            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={studentFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main minMax2Xl:flex-wrap minMax2Xl:justify-end minMaxLg:flex-wrap minMaxLg:justify-end">
                                <div className="educare-card-title leading-none pb-none">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Update Student Fee Structure
                                    </h5>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) => {
                                                        handleClassroomChange(e);
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
                                                {/* <SelectInput
                                                    data_label="Student"
                                                    data={studentsData}
                                                    value={data.student_id}
                                                    onChange={(e) => {
                                                        handleStudentChange(e)
                                                    }
                                                    }
                                                    type="text"
                                                    className="block"
                                                /> */}
                                                <FormControl>
                                                    {data?.student_id == "" &&
                                                        <InputLabel shrink={false}>Select Student</InputLabel>
                                                    }
                                                    <Select
                                                        value={data?.student_id}
                                                        onChange={handleStudentChange}
                                                        id="grouped-select"
                                                        className="w-[160px] h-[40px]"
                                                    >
                                                        <MenuItem value="">
                                                            <em>Select Student</em>
                                                        </MenuItem>
                                                        {Object.values(studentsData)?.map((groupedStudents, index) => [
                                                            <ListSubheader className="material-selet-subheader" key={`header-${index}`}>
                                                                {groupedStudents?.student_type ?? ""}
                                                            </ListSubheader>,
                                                            ...Object.values(groupedStudents?.options)?.sort(customSort).map((option, optionIndex) => (
                                                                <MenuItem
                                                                    key={`option-${index}-${optionIndex}`}
                                                                    value={option.id}
                                                                >
                                                                    {option?.title ?? ""}
                                                                </MenuItem>
                                                            )),
                                                        ])}
                                                    </Select>
                                                </FormControl>
                                                <InputError
                                                    message={errors.student_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={data.admission_no}
                                                    onChange={(e) =>
                                                        handleAdmissionNoChange(e)
                                                    }
                                                    onKeyPress={(e) => {
                                                        handleAdmissionNoKeyPress(e)
                                                    }}
                                                    placeHolder="Admission no"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError message={errors.admission_no} className="mt-2" />
                                            </div>
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn maxXs:flex-wrap">
                                    {/* <div>
                                        <Tooltip
                                            title="Create Structure"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                href="/fee/create-class-fee-structure"
                                                className="educare-primary-btn-md-fill whitespace-nowrap"
                                            >
                                                <i className='icon-PlusCircle'></i> Create Structure
                                            </button>
                                        </Tooltip>
                                    </div> */}
                                    <div>
                                        <Tooltip
                                            title="PDF"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                className="educare-warning-btn-md-fill"
                                            >
                                                <i className="icon-FilePdf"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
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
                                                onClick={getFeeStructureByStudent}
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
                                            {/* <button
                                                type="button"
                                                className="educare-gray-btn-md-fill"
                                                onClick={() => {
                                                    handleReset();
                                                }}
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button> */}
                                            <Link
                                                href={route('fee.update_class_fee_structure')}
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateFeeStructureFilter;
