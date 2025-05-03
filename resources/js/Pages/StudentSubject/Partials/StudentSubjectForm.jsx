import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function StudentSubjectForm({
    studentData = [],
    classrooms = [],
    studentNames = [],
    studentSubjects = [],
    selected_subject_ids = [],
    subject_numbers = [],
    students = [],
}) {
    const studentModeData = [
        {
            id: "Individual",
            title: "Individual",
        },
        {
            id: "Multiple",
            title: "Multiple",
        },
    ];

    const [studentNamesData, setStudentNameData] = useState([]);
    const [classroomIdData, setClassroomIdData] = useState("");
    const [studentIdData, setStudentIdData] = useState("");

    const { data, setData, errors, post, reset, processing } = useForm({
        student_mode: "Individual",
        admission_no: "",
        classroom_id: "",
        student_id: "",
        selected_subject_ids: selected_subject_ids,
        selected_student_ids: [],
        subject_numbers: subject_numbers,
        subject_all: false,
        student_all: false,
    });

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
        if (data.student_mode === 'Individual'){
            const form_data = {
                student_id: studentIdData,
                classroom_id: classroomIdData,
                selected_subject_ids: data?.selected_subject_ids,
                subject_numbers: data?.subject_numbers,
            };
            router.post(route("student_subject.save"), form_data);
        }else if(data.student_mode === 'Multiple'){
            const form_data = {
                classroom_id: classroomIdData,
                selected_student_ids: data?.selected_student_ids,
                subject_numbers: data?.subject_numbers,
                selected_subject_ids: data?.selected_subject_ids,
            };
            router.post(route("multiple_student_subject.save"), form_data);
        }
    };

    const handleAdmissionNoKeyPress = (e) => {
        const key = e.key;
        if (key == "Enter") {
            e.preventDefault();
            const form_data = {
                admission_no: data.admission_no,
                student_mode: data.student_mode,
                request_type: "admission_no",
            };
            router.post(route("student_subject.list"), form_data);
        }
    };

    const handleClassroom = (classroomId, mode_type) => {
        setClassroomIdData(classroomId);
        setData({
            ...data,
            admission_no: "",
            classroom_id: classroomId,
            student_id: "",
        });
        if (mode_type === "Individual") {
            router.post(route("student_subject.list"), {
                classroom_id: classroomId,
            });
        } else if (mode_type === "Multiple") {
            router.post(route("student_subject.list"), {
                classroom_id: classroomId,
                student_mode: mode_type,
            });
        }
    };

    const handleStudent = (studentId) => {
        setStudentIdData(studentId);
        const admission_no = studentNames?.find(
            (item) => item?.id == studentId
        );
        setData({
            ...data,
            admission_no: admission_no?.admission_no,
            student_id: studentId,
        });

        router.post(route("student_subject.list"), {
            classroom_id: classroomIdData,
            student_id: studentId,
            student_mode: data.student_mode,
        });
    };

    useEffect(() => {
        setData({
            ...data,
            admission_no: studentData?.admission_no,
            classroom_id: studentData?.classroom_id,
            student_id: studentData?.id,
        });
    }, [studentData]);

    useEffect(() => {
        setData({
            ...data,
            admission_no: studentData?.admission_no,
            classroom_id: studentData?.classroom_id,
            student_id: studentData?.id,
        });
    }, [studentSubjects]);

    useEffect(() => {
        setData({
            ...data,
            selected_subject_ids: selected_subject_ids,
            subject_numbers: subject_numbers,
        });
    }, [selected_subject_ids, subject_numbers]);

    useEffect(() => {
        setStudentNameData(studentNames);
    }, [studentNames]);

    const handleFee = (subject_id) => {
        const isSelected = data.selected_subject_ids.some(
            (subject) => subject.subject_id === subject_id
        );
        const updatedSelectedSubjects = isSelected
            ? data.selected_subject_ids.filter(
                  (subject) => subject.subject_id !== subject_id
              )
            : [...data.selected_subject_ids, { subject_id: subject_id }];

        setData({
            ...data,
            selected_subject_ids: updatedSelectedSubjects,
            subject_all: false,
        });
    };

    const handleCheckedStudent = (student_id) => {
        const isSelected = data.selected_student_ids.some(
            (student) => student.student_id === student_id
        );
        const updatedSelectedStudents = isSelected
            ? data.selected_student_ids.filter(
                  (student) => student.student_id !== student_id
              )
            : [...data.selected_student_ids, { student_id: student_id }];

        setData({
            ...data,
            selected_student_ids: updatedSelectedStudents,
            student_all: false,
        });
    };

    const handleAllStudent = (isChecked) => {
        if (isChecked) {
            const allSubjectIds = students.map((item) => item.student_id);
            const updatedSelectedStudents = allSubjectIds.map((student_id) => ({
                student_id,
            }));
            setData({
                ...data,
                selected_student_ids: updatedSelectedStudents,
                student_all: true,
            });
        } else {
            setData({ ...data, selected_student_ids: [], student_all: false });
        }
    };

    const handleSubjectNumber = (subject_id, number) => {
        const isSelected = data.subject_numbers.some(
            (subject) => subject.subject_id === subject_id
        );

        const updatedSelectedSubjectNumbers = isSelected
            ? data.subject_numbers.map((subject) =>
                  subject.subject_id === subject_id
                      ? { ...subject, subject_number: number } // Update the subject number if the subject exists
                      : subject
              )
            : [
                  ...data.subject_numbers,
                  { subject_id: subject_id, subject_number: number }, // Add new subject with its number
              ];

        setData({
            ...data,
            subject_numbers: updatedSelectedSubjectNumbers,
            subject_all: false,
        });
    };

    const handleAllFee = (isChecked) => {
        if (isChecked) {
            const allSubjectIds = studentSubjects.map(
                (item) => item.subject_id
            );
            const updatedSelectedSubjects = allSubjectIds.map((subject_id) => ({
                subject_id,
            }));
            setData({
                ...data,
                selected_subject_ids: updatedSelectedSubjects,
                subject_all: true,
            });
        } else {
            setData({ ...data, selected_subject_ids: [], subject_all: false });
        }
    };

    return (
        <>
            <form onSubmit={handleAdmissionSourceData}>
                <div className="educare-classroom-form-area">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Subjects
                                        <span>
                                            (Total :{" "}
                                            {studentSubjects?.length > 0
                                                ? studentSubjects?.length
                                                : 0}
                                            )
                                        </span>
                                    </h5>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-create-school-settings-list-check min-width-full">
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id="subject_all"
                                                                    name="subject_all"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleAllFee(
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        )
                                                                    }
                                                                    checked={
                                                                        data.subject_all
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Subject</th>
                                                <th>Subject Code</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentSubjects?.length ? (
                                                studentSubjects?.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list-check min-width-full">
                                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                        <div className="educare-create-school-settings-list-check width-full">
                                                                            <Checkbox
                                                                                id={`type_${index}`}
                                                                                name={`type_${index}`}
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleFee(
                                                                                        item?.subject_id
                                                                                    )
                                                                                }
                                                                                checked={data.selected_subject_ids.some(
                                                                                    (
                                                                                        subject
                                                                                    ) =>
                                                                                        subject.subject_id ===
                                                                                        item.subject_id
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {item.title}
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id={`student_subject_${index}`}
                                                                        value={parseInt(
                                                                            data.subject_numbers.find(
                                                                                (
                                                                                    subject
                                                                                ) =>
                                                                                    subject.subject_id ===
                                                                                    item.subject_id
                                                                            )
                                                                                ?.subject_number ??
                                                                                ""
                                                                        )}
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleSubjectNumber(
                                                                                item.subject_id,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="block"
                                                                        type="number"
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        className="text-center text-red-500"
                                                        colSpan="10"
                                                    >
                                                        Data not found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        {studentSubjects?.length > 0 ? (
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={3}>
                                                        <div className="flex flex-wrap gap-2.5 justify-end pt-2 pb-2 mr-5">
                                                            {/* <PrimaryButton className="educare-gray-btn-lg-stroke">
                                                                Reset
                                                            </PrimaryButton> */}
                                                            <PrimaryButton className="educare-primary-btn-lg-fill">
                                                                Save
                                                            </PrimaryButton>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        ) : (
                                            ""
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Assign subjects to student
                                        </h5>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6 mb-4">
                                                <div className="educare-input-field-styles max-w-[300px]">
                                                    <InputLabel
                                                        htmlFor="student_mode"
                                                        value="Select Mode"
                                                    />
                                                    <SelectInput
                                                        id="student_mode"
                                                        data_label="mode"
                                                        data={studentModeData}
                                                        value={
                                                            data.student_mode
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_mode",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_mode
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {data.student_mode ===
                                                "Individual" && (
                                                <>
                                                    <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="admission_no"
                                                                value="Admission No"
                                                            />
                                                            <TextInput
                                                                id="admission_no"
                                                                value={
                                                                    data.admission_no
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "admission_no",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                onKeyPress={(
                                                                    e
                                                                ) => {
                                                                    handleAdmissionNoKeyPress(
                                                                        e
                                                                    );
                                                                }}
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.admission_no
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {data.student_mode === "Individual" && (
                                            <div className="text-center">
                                                Or
                                            </div>
                                        )}

                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles max-w-[300px]">
                                                    <InputLabel
                                                        htmlFor="classroom_id"
                                                        value="Class"
                                                    />
                                                    <SelectInput
                                                        id="classroom_id"
                                                        data_label="class"
                                                        data={classrooms}
                                                        value={
                                                            data.classroom_id
                                                        }
                                                        onChange={(e) => {
                                                            handleClassroom(
                                                                e.target.value,
                                                                data?.student_mode
                                                            );
                                                        }}
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
                                            {data.student_mode ===
                                                "Individual" && (
                                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                    <div className="educare-input-field-styles max-w-[300px]">
                                                        <InputLabel
                                                            htmlFor="student_id"
                                                            value="Student"
                                                        />
                                                        <SelectInput
                                                            id="student_id"
                                                            data_label="student"
                                                            data={
                                                                studentNamesData
                                                            }
                                                            value={
                                                                data.student_id
                                                            }
                                                            onChange={(e) => {
                                                                handleStudent(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.student_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {students?.length > 0 && (
                                <div className="educare-classroom-table-wrapper mt-7">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Students
                                            <span>
                                                (Total :{" "}
                                                {students?.length > 0
                                                    ? students?.length
                                                    : 0}
                                                )
                                            </span>
                                        </h5>
                                    </div>
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div className="educare-create-school-settings-list-check min-width-full">
                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        id="student_all"
                                                                        name="student_all"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleAllStudent(
                                                                                e
                                                                                    .target
                                                                                    .checked
                                                                            )
                                                                        }
                                                                        checked={
                                                                            data.student_all
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th>Roll No</th>
                                                    <th>Admission no</th>
                                                    <th>Student Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {students?.length ? (
                                                    students?.map(
                                                        (item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="educare-create-school-settings-list-check min-width-full">
                                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                                <Checkbox
                                                                                    id={`type_${index}`}
                                                                                    name={`type_${index}`}
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleCheckedStudent(
                                                                                            item?.student_id
                                                                                        )
                                                                                    }
                                                                                    checked={data.selected_student_ids.some(
                                                                                        (
                                                                                            student
                                                                                        ) =>
                                                                                            student.student_id ===
                                                                                            item.student_id
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.roll_no
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.admission_no
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.student_name
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            className="text-center text-red-500"
                                                            colSpan="10"
                                                        >
                                                            Data not found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
