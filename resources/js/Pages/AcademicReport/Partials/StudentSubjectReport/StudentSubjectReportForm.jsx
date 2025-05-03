import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { useForm, router } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { useState } from "react";
import { useEffect } from "react";

export default function StudentSubjectReportForm({
    classrooms,
    students,
    getStudentData,
}) {
    const [filteredStudents, setFilteredStudents] = useState([]);

    const { data, setData, errors, post, reset, processing } = useForm({
        classroom_id: "",
        student_id: "",
    });

    const handleClassroom = (e, classroomId) => {
        e.preventDefault();
        setData({
            ...data,
            classroom_id: classroomId,
            student_id: "",
        });
        router.post(route("academic_report.student_subject_report"), {
            classroom_id: classroomId,
        });
    };

    const handleStudentChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            student_id: event.target.value,
        }));
        const form_data = {
            student_id: event.target.value,
            classroom_id: data.classroom_id,
        };
        router.post(route("academic_report.student_subject_report"), form_data);
    };

    useEffect(() => {
        setFilteredStudents(students);
    }, [students]);

    console.log("getStudentData", getStudentData);

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="flex flex-wrap justify-between gap-5">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Subjects
                                    </h5>
                                </div>
                                <div className="educare-header-filtar-bar-count">
                                    <span>Total: {getStudentData?.length}</span>
                                </div>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>Type</th>
                                            <th>Subject Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getStudentData?.length > 0 ? (
                                            getStudentData?.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <span className="badge info">
                                                                {item.type}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {
                                                                item?.subject
                                                                    ?.title
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="7"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Select class and student
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form>
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel value="Class" />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={classrooms}
                                                        value={
                                                            data.classroom_id
                                                        }
                                                        onChange={(e) =>
                                                            handleClassroom(
                                                                e,
                                                                e.target.value
                                                            )
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
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel value="Student" />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Student"
                                                        data={filteredStudents}
                                                        value={data.student_id}
                                                        onChange={(e) =>
                                                            handleStudentChange(
                                                                e
                                                            )
                                                        }
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
