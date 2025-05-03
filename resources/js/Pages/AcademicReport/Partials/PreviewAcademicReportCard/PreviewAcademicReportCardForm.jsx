import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import { useEffect, useState } from "react";

export default function PreviewAcademicReportCardForm({
    classrooms = [],
    students = [],
    student
}) {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [customErrors, setCustomErrors] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [studentIds, setStudentIds] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        admission_no: "",
        classroom_id: "",
        student_id: "",
        student_ids: [],
        rank_classroom_id: "",
    });

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        setFilteredStudents(students?.sort(customSort));
    }, [students]);


    useEffect(() => {
        if (selectedStudent?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: selectedStudent?.admission_no ?? "",
                classroom_id: selectedStudent?.classroom_id ?? "",
                student_id: selectedStudent?.id ?? "",
            }));

            setFilteredStudents(students?.filter(item => item?.classroom_id == selectedStudent?.classroom_id)?.sort(customSort));

            setSelectedOptions(students?.filter(item => item?.id == selectedStudent?.id));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: selectedStudent?.id ?? "",
            }));
        }
    }, [selectedStudent]);

    useEffect(() => {
        setStudentIds(selectedOptions?.map(item => item?.id));
    }, [selectedOptions]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_ids: studentIds,
        }));
    }, [studentIds]);

    // handle select student start
    const handleSelectStudent = (event, value) => {
        setSelectedOptions(value);
    };
    // handle select student end

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

            setFilteredStudents([]);

            const form_data = {
                classroom_id: data?.classroom_id,
                admission_no: data?.admission_no
            }

            router.post(route('academic_report.preview_report_card'), form_data);
        }
    }
    // handle admission no change end


    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setFilteredStudents([]);

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: classroom_id,
            student_id: "",
        }));

        const form_data = {
            classroom_id: classroom_id
        }

        router.post(route('academic_report.preview_report_card'), form_data);
    }
    // handle classroom change end


    // handle student change start
    const handleStudentChange = (e) => {
        const student_id = e.target.value;
        const selected_student = students?.find(item => item?.id == student_id);

        setSelectedStudent(selected_student);

        setData((prevData) => ({
            ...prevData,
            admission_no: selected_student?.admission_no ?? "",
            student_id: selected_student?.id ?? "",
        }));
    }
    // handle student change end


    // handle print class progress report start
    const handleClassProgressReport = () => {
        const params = {
            classroom_id: data?.classroom_id ?? ""
        }

        let url = route('pdf_generator.print_academic_progress_report_3', params);

        window.open(url);
    }
    // handle print class progress report end

    // handle print student progress report start
    const handleStudentProgressReport = () => {
        const params = {
            // student_id: data?.student_id ?? ""
            student_ids: JSON.stringify(data?.student_ids ?? [])
        }

        let url = route('pdf_generator.print_academic_student_progress_report', params);

        window.open(url);
    }
    // handle print student progress report end


    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };

    // handle generate rank start
    const handleGenerateRank = (e) => {
        e.preventDefault();

        const form_data = {
            classroom_id: data?.rank_classroom_id
        }

        router.post(route('academic_report.generate_student_academic_rank'), form_data, {
            onError: (errors) => {
                setCustomErrors(errors);
            }
        });
    }
    // handle generate rank end


    // sort students by classroom roll start
    const customSort = (a, b) => {
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
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-12 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Download Report Card
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionSourceData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 lg:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Adm No."
                                                            />
                                                        </div>
                                                    </div>
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
                                                        placeHolder="Adm No"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.admission_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        value="Class"
                                                    />
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={classrooms}
                                                        value={
                                                            data.classroom_id
                                                        }
                                                        onChange={(e) =>
                                                            handleClassroomChange(e)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.classroom_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    {/* <InputLabel
                                                        value="Student"
                                                    />
                                                    <SelectInput
                                                        multiple
                                                        data_label="Student"
                                                        data={filteredStudents}
                                                        value={
                                                            data.student_id
                                                        }
                                                        onChange={(e) =>
                                                            handleStudentChange(e)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_id
                                                        }
                                                        className="mt-2"
                                                    /> */}
                                                    <InputLabel
                                                        value="Student"
                                                    />
                                                    <div className="educare-input-type-file-styles">
                                                        <Autocomplete
                                                            multiple
                                                            id="checkboxes-tags-demo"
                                                            options={filteredStudents}
                                                            value={selectedOptions}
                                                            onChange={handleSelectStudent}
                                                            disableCloseOnSelect
                                                            getOptionLabel={(option) => option.title}
                                                            renderOption={(props, option, { selected }) => (
                                                                <li {...props}>
                                                                    <CheckboxA
                                                                        icon={icon}
                                                                        checkedIcon={checkedIcon}
                                                                        style={{ marginRight: 8 }}
                                                                        checked={studentIds?.includes(option.id)}
                                                                    />
                                                                    {option.title}
                                                                </li>
                                                            )}
                                                            renderInput={(params) => (
                                                                <TextField {...params} placeholder="Classes" />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    {data?.classroom_id != "" &&
                                                        <PrimaryButton
                                                            className="educare-secondary-btn-md-fill"
                                                            onClick={(e) => {
                                                                handleClassProgressReport()
                                                            }}
                                                        >
                                                            Download Class Report Card
                                                        </PrimaryButton>
                                                    }

                                                    {data?.student_ids?.length > 0 &&
                                                    // {data.student_id != "" &&
                                                        <PrimaryButton
                                                            className="educare-primary-btn-md-fill"
                                                            onClick={(e) => {
                                                                handleStudentProgressReport()
                                                            }}
                                                        >
                                                            View Student's Report Card
                                                        </PrimaryButton>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionSourceData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 lg:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        value="Class"
                                                    />
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={classrooms}
                                                        value={
                                                            data.rank_classroom_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "rank_classroom_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            customErrors?.classroom_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-primary-btn-md-fill"
                                                        onClick={(e) => {
                                                            handleGenerateRank(e)
                                                        }}
                                                    >
                                                        Generate Rank
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
