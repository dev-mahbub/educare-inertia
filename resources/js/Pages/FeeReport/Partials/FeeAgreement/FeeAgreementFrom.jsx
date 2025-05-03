import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import FormControl from '@mui/material/FormControl';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeeAgreementFrom = ({
    classrooms = [],
    students = [],
    student,
    student_status_array = [],
    guardian_array = []
}) => {
    const [selectDate, setSelectDate] = useState(new Date());
    const [selectedStudent, setSelectedStudent] = useState({});
    const [filteredStudents, setFilteredStudents] = useState([]);
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
        guardian: "",
        student_status: "",
    });

    useEffect(() => {
        setFilteredStudents(students);
    }, [students]);

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            select_date: selectDate
        }));
    }, [selectDate]);

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

            const form_data = {
                admission_no: data?.admission_no
            }

            router.post(route('fee_report.fee_agreement'), form_data);
        }
    }
    // handle admission no change end


    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: classroom_id,
            student_id: "",
        }));

        const form_data = {
            classroom_id: classroom_id
        }

        router.post(route('fee_report.fee_agreement'), form_data);
    }
    // handle classroom change end


    // handle student change start
    const handleStudentChange = (e) => {
        const student_id = e.target.value;
        // const selected_student = students?.find(item => item?.id == student_id);

        // setSelectedStudent(selected_student);

        let selected_student = null;

        for (const groupedStudents of Object.values(filteredStudents)) {
            selected_student = Object.values(groupedStudents?.options).find(student => student.id === student_id);

            if (selected_student) {
                break;
            }
        }

        if (selected_student?.id != null) {
            setSelectedStudent(selected_student);
        }
        else {
            setSelectedStudent({});
        }

        setData((prevData) => ({
            ...prevData,
            admission_no: selected_student?.admission_no ?? "",
            student_id: selected_student?.id ?? "",
        }));
    }
    // handle student change end

    // handle download student fee agreement start
    const handleDownloadStudentFeeAgreement = (e) => {
        e.preventDefault();

        if (data?.guardian == "") {
            toast.error("Please select guardian.", {
                position: 'top-right',
                autoClose: 1500,
            });

            return;
        }
        else if (data?.classroom_id == "") {
            toast.error("Please select class.", {
                position: 'top-right',
                autoClose: 1500,
            });

            return;
        }
        else if (data?.student_id == "") {
            toast.error("Please select student.", {
                position: 'top-right',
                autoClose: 1500,
            });

            return;
        }

        const params = {
            classroom_id: data?.classroom_id,
            student_id: data?.student_id,
            guardian: data?.guardian,
            date: selectDate,
            student_status: data?.student_status,
        }

        let url = route('pdf_fee.student_fee_agreement', params);;

        if(data?.guardian == 'student') {
            url = route('pdf_fee.student_fee_details', params);
        }

        window.open(url);
    }
    // handle download student fee agreement end


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
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Fee Agreement
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel value="Select Date" />
                                <DatePicker
                                    selected={selectDate}
                                    onChange={(date) => setSelectDate(date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select Date"
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-select-field-styles">
                                <InputLabel
                                    value="Guardian"
                                />
                                <SelectInput
                                    data_label=""
                                    data={guardian_array}
                                    value={data.guardian}
                                    onChange={(e) =>
                                        setData("guardian", e.target.value)
                                    }
                                    type="text"
                                    className="block"
                                />
                                <InputError
                                    message={errors.guardian}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Adm No."
                                />
                                <TextInput
                                    value={data.admission_no}
                                    onChange={(e) =>
                                        handleAdmissionNoChange(e)
                                    }
                                    onKeyPress={(e) => {
                                        handleAdmissionNoKeyPress(e)
                                    }}
                                    placeHolder="Adm No."
                                    type="text"
                                    className="block"
                                />
                                <InputError message={errors.admission_no} className="mt-2" />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-select-field-styles">
                                <InputLabel
                                    value="Class"
                                />
                                <SelectInput
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
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-select-field-styles">
                                <InputLabel
                                    value="Student"
                                />
                                {/* <SelectInput
                                    data_label="Student"
                                    data={filteredStudents}
                                    value={data.student_id}
                                    onChange={(e) =>
                                        handleStudentChange(e)
                                    }
                                    type="text"
                                    className="block"
                                /> */}
                                <FormControl className="w-full">
                                    <Select
                                        value={data?.student_id}
                                        onChange={handleStudentChange}
                                        id="grouped-select"
                                        className="h-[40px]"
                                    >
                                        <MenuItem value="">
                                            <em>Select Student</em>
                                        </MenuItem>
                                        {Object.values(filteredStudents)?.map((groupedStudents, index) => [
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
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-select-field-styles">
                                <InputLabel
                                    value="All"
                                />
                                <SelectInput
                                    data_label="All"
                                    data={student_status_array}
                                    value={data.student_status}
                                    onChange={(e) =>
                                        setData("student_status", e.target.value)
                                    }
                                    type="text"
                                    className="block"
                                />
                                <InputError
                                    message={errors.student_status}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6"></div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton
                                    className="educare-primary-btn-lg-fill"
                                    type="button"
                                    onClick={(e) => {
                                        handleDownloadStudentFeeAgreement(e);
                                    }}
                                >
                                    Download Agreement
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeeAgreementFrom;
