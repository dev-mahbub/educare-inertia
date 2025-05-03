import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';

const ClassTimeTableHeader = ({ data, setData, errors, timeTableData, shiftTypes, classrooms }) => {
    const [params, setParams] = React.useState({});
    const headerTimeTableData = (e) => {
        e.preventDefault();
    };

    const handleShiftChange = (e) => {
        const updatedData = { ...data, shift_type: e.target.value };
        setData(updatedData);
        router.post(route('teacher.view_class_timetable'), updatedData);
    }

    const handleClassChange = (e) => {
        const updatedData = { ...data, classroom_id: e.target.value };
        setData(updatedData);
        router.post(route('teacher.view_class_timetable'), updatedData);
    }

    React.useEffect(() => {
        setParams(() => ({
            classroom_id: data.classroom_id,
            shift_type: data.shift_type
        }));
    }, [data]);
    
    return (
        <form onSubmit={headerTimeTableData}>
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div className='flex items-center gap-5 flex-wrap'>
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Class Timetable
                        </h5>
                    </div>
                    <div>
                        <span
                            className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'
                        >
                            Total : {timeTableData.periods.length}
                        </span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-select-field-styles">
                        <SelectInput
                            data_label="Class"
                            data={classrooms}
                            value={data.classroom_id}
                            onChange={(e) => handleClassChange(e) }
                            type="text"
                            className="block"
                        />
                        <InputError
                            message={errors.classroom_id}
                            className="mt-2"
                        />
                    </div>
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
                                <a
                                    href={route('pdf_generator.print_class_timetable_report', params)}
                                    target='_blank'
                                    className="educare-warning-btn-md-fill"
                                >
                                    <i className="icon-FilePdf"></i>
                                </a>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ClassTimeTableHeader;