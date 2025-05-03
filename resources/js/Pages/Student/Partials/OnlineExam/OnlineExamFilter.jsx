import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useRef, useState, useEffect } from 'react';

const OnlineExamFilter = ({ students, studentId, virtualExamModes, virtualExamStatus, subjects }) => {
    students = students || [];
    
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        student_id: "",
        exam_mode: "",
        subject_id: "",
        exam_status: "",
    });

    const homeworkFilterData = (e) => {
        e.preventDefault();
    };

    // const studentChange = (e) => {
    //     const updatedData = { ...data, student_id: e.target.value };
    //     setData(updatedData);

    //     router.post(route("student_online_exam.index"), updatedData, {
    //         preserveScroll: true,
    //     });
    // };

    const handleChangeFormValue = (field, value) => {
        const form_data = {
            ...data,
            [field]: value
        }

        setData(form_data);

        router.post(route('student_online_exam.index'), form_data);
    }

    useEffect(() => {
        if (studentId) {
            setData({ ...data, student_id: studentId });
        }
    }, [studentId]);

    const studentsList = students?.map(student => ({
        id: student.id,
        title: `${student?.first_name} ${student?.middle_name} ${student?.last_name}`,
    })) || [];
    
    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={homeworkFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main minMaxXl:flex-wrap minMaxXl:justify-end minMax2Xl:flex-wrap minMax2Xl:justify-end  minMax3Xl:flex-wrap minMax3Xl:justify-end">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <div className="educare-header-filtar-bar-fields-wrap items-center">
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Class"
                                                data={studentsList}
                                                value={data.student_id}
                                                onChange={(e) => handleChangeFormValue("student_id", e.target.value)}
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.student_id}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className='grid grid-cols-12 gap-5'>
                                    <div className="col-span-12 md:col-span-4 xl:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                data_label="Class"
                                                data={virtualExamStatus}
                                                value={
                                                    data.exam_status
                                                }
                                                onChange={(e) =>
                                                    handleChangeFormValue(
                                                        "exam_status",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-4 xl:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                data_label="Subject"
                                                data={subjects}
                                                value={
                                                    data.subject_id
                                                }
                                                onChange={(e) =>
                                                    handleChangeFormValue(
                                                        "subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-4 xl:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                data_label="Exam Mode"
                                                data={virtualExamModes}
                                                value={
                                                    data.exam_mode
                                                }
                                                onChange={(e) =>
                                                    handleChangeFormValue(
                                                        "exam_mode",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OnlineExamFilter;
