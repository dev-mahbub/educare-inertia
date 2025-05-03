import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';

const TeacherTimeTableHeader = ({ data, setData, errors, timeTableData=[], shiftTypes }) => {
    const headerTimeTableData = (e) => {
        e.preventDefault();
    };

    const handleShiftChange = (e) => {
        const updatedData = { ...data, shift_type: e.target.value };
        setData(updatedData);
        router.post(route('teacher.view_teacher_timetable'), updatedData);
    }

    return (
        <form onSubmit={headerTimeTableData}>
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div className='flex items-center gap-5 flex-wrap'>
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Teacher Timetable
                        </h5>
                    </div>
                    <div>
                        <span
                            className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'
                        >
                            Total : {timeTableData.length}
                        </span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-select-field-styles">
                        <SelectInput
                            data_label="Shift"
                            data={shiftTypes}
                            value={data.shift_type}
                            onChange={(e) => handleShiftChange(e)}
                            type="text"
                            className="block"
                        />
                        <InputError
                            message={errors.shift_type}
                            className="mt-2"
                        />
                    </div>
                    <div className='educare-filter-action-btn'>
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
                    </div>
                </div>
            </div>
        </form>
    );
};

export default TeacherTimeTableHeader;