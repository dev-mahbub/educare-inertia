import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Tooltip } from '@mui/material';

const StudentHostelRequestFilter = ({ students, studentId }) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        student_id: ""
    });

    const homeworkFilterData = (e) => {
        e.preventDefault();
    };

    const studentChange = (e) => {
        const updatedData = { ...data, student_id: e.target.value };
        setData(updatedData);

        router.post(route("student_hostel.list"), updatedData, {
            preserveScroll: true,
        });
    };

    const studentsList = students?.map(student => ({
        id: student.id,
        title: `${student?.first_name} ${student?.middle_name} ${student?.last_name}`,
    })) || [];


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId
        }));
    }, [studentId]);

    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={homeworkFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main minMaxXl:flex-wrap minMaxXl:justify-end minMax2Xl:flex-wrap minMax2Xl:justify-end  minMax3Xl:flex-wrap minMax3Xl:justify-end">
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev"><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap items-center">
                                        <div className="educare-card-title">
                                            <h5>
                                                Dear siblings
                                            </h5>
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Class"
                                                data={studentsList}
                                                value={data.student_id}
                                                onChange={(e) => studentChange(e)}
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.student_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Tooltip title="Submit Your Work" placement="top" arrow>
                                                <Link
                                                    href={route('student_hostel.create_request')}
                                                    className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition" 
                                                >
                                                    Apply Hostel Request
                                                </Link>
                                            </Tooltip>
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

export default StudentHostelRequestFilter;
