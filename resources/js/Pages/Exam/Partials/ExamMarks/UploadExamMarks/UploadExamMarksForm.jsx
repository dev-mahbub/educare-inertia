import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";

export default function UploadExamMarksForm({
    exams = [],
    classrooms = [],
    subjects = [],
}) {

    const [filteredExams, setFilteredExams] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const fileInputRef = useRef(null);

    const { data, setData, errors, post, reset, processing } = useForm({
        classroom_id: "",
        subject_id: "",
        exam_id: "",
        exam_mark_import_file: "",
    });

    // Handle Classroom Changes
    const handleClassroomChange = (id) => {
        setFilteredSubjects(
            subjects?.filter((item) => item?.classroom_id == id)
        );
        setFilteredExams(
            exams?.filter(
                (item) =>
                    item?.classrooms?.find((item) => item?.id == id)?.id == id
            )
        );

        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            subject_id: "",
            exam_id: "",
        }));
    };

    const handleUploadExamMarksData = (e) => {
        e.preventDefault();
    };

    // handle upload exam marks start
    const handleUploadExamMarks = (e) => {
        e.preventDefault();
        
        post(route("import.exam_mark.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                fileInputRef.current.value = '';
            },
        });
    };
    // handle upload exam marks end


    // handle download template start
    const handleDownloadTemplate = () => {
        const params = {
            classroom_id: data?.classroom_id ?? "",
            subject_id: data?.subject_id ?? "",
            exam_id: data?.exam_id ?? "",
        }

        const url = route('export_excel.exam_mark_import_template', params);

        window.location.href = url;
    }
    // handle download template end

    return (
        <>
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Import Subject Marks
                </h5>
            </div>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleUploadExamMarksData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="classroom_id"
                                                                value="Select Class"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={classrooms}
                                                        value={
                                                            data.classroom_id
                                                        }
                                                        onChange={(e) => handleClassroomChange(e.target.value)}
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
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="subject_id"
                                                                value="Select Subject"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Subject"
                                                        data={filteredSubjects}
                                                        value={
                                                            data.subject_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "subject_id",
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
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="exam_id"
                                                                value="Select Scheduled Test"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Scheduled Test"
                                                        data={filteredExams}
                                                        value={
                                                            data.exam_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "exam_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.exam_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Browse for the excel sheet:" />
                                                    <div className="educare-input-type-file-styles">
                                                        <input
                                                            type="file"
                                                            name="exam_mark_import_file"
                                                            ref={fileInputRef}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "exam_mark_import_file",
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                        message={
                                                            errors.exam_mark_import_file
                                                        }
                                                        className="mt-2"
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        type="button"
                                                        onClick={(e) => {
                                                            handleUploadExamMarks(e);
                                                        }}
                                                    >
                                                        Upload Excel
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                        type="button"
                                                        onClick={() => {
                                                            handleDownloadTemplate();
                                                        }}
                                                    >
                                                        Download Template
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-input-field-notes leading-6">
                            <h5 className="text-danger">Important!!</h5>
                            <ul>
                                <li>
                                    <span className="font-bold text-headingLight">
                                        Note :{" "}
                                    </span>
                                    Please read the following instructions:
                                </li>
                                <li>
                                    1) Please don't make any changes in given
                                    template.
                                </li>
                                <li>
                                    2) Only 80 records are accepted in the list
                                    at a time.
                                </li>
                                <li>
                                    3) The data should be in valid format to
                                    upload successfully.
                                </li>
                                <li>
                                    4) For Ispresent column enter 0 for Absent
                                    and 1 for Present.
                                </li>
                                <li>
                                    5) In mark column you can enter mark ,grade
                                    and absent remark
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
