import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import SelectInput from "@/Components/SelectInput";
import { useState } from "react";
import { concatName } from "@/Hooks/GlobalFunction";

export default function OptionalSubjectReportForm({
    subjects,
    classrooms,
    getStudentData,
}) {
    const [filteredSubjects, setFilteredSubjects] = useState([]);

    const { data, setData, errors } = useForm({
        classroom_id: "",
        subject_id: "",
    });

    // Handle Classroom Changes
    const handleClassroomChange = (id) => {
        setFilteredSubjects(
            subjects?.filter((item) => item?.classroom_id == id)
        );
        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            subject_id: "",
        }));
    };

    const handleSubjectChange = (subjectId) => {
        setData((prevData) => ({
            ...prevData,
            subject_id: subjectId,
        }));
        const form_data = {
            subject_id: subjectId,
            classroom_id: data?.classroom_id,
        };
        router.post(route("academic_report.optional_subject"), form_data);
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title flex flex-wrap gap-2.5 justify-between items-center">
                                <div className="flex flex-wrap gap-2.5 items-center">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Students
                                    </h5>
                                    <div className="educare-header-filtar-bar-count">
                                        <span>
                                            Total: {getStudentData?.length ? getStudentData?.length : 0}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Download Excel"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <a
                                            href={route('export_excel.optional_subject', data)}
                                            target="_blank"
                                            className="educare-success-btn-md-fill"
                                        >
                                            <i className="icon-FileX"></i>
                                        </a>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>Admission Number</th>
                                            <th>Student Name</th>
                                            <th>Father Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getStudentData?.length > 0 ? (
                                            getStudentData?.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {item.admission_no}
                                                        </td>
                                                        <td>
                                                            {concatName(
                                                                item.first_name,
                                                                item.middle_name,
                                                                item.last_name
                                                            )}
                                                        </td>
                                                        <td>
                                                            {concatName(
                                                                item?.father?.first_name,
                                                                item?.father?.middle_name,
                                                                item?.father?.last_name
                                                            )}
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
                    </div>
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Select class and subject
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
                                                            handleClassroomChange(
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
                                                            <InputLabel value="Subject" />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Subject"
                                                        data={filteredSubjects}
                                                        value={data.subject_id}
                                                        onChange={(e) =>
                                                            handleSubjectChange(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.subject_id
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
