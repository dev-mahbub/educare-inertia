import InputError from '@/Components/InputError';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import SelectInput from '@/Components/SelectInput';
import React from 'react';

const StaffWiseAttendanceReportFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_staff: "",
    });
    const headerTopData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.landmarks_id) {
                //     reset("landmarks_id");
                //     landmarksInput.current.focus();
                // }
            },
        });
    };

    return (
        <form onSubmit={headerTopData}>
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div className="educare-card-title pb-none">
                    <h5> Staff Wise Attendance Report </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-select-field-styles">
                        <SelectInput
                            id="select_staff"
                            data_label="Staff"
                            data={[]}
                            value={data.select_staff}
                            onChange={(e) =>
                                setData("select_staff", e.target.value)
                            }
                            type="text"
                            className="block"
                        />
                        <InputError
                            message={errors.select_staff}
                            className="mt-2"
                        />
                    </div>
                    <div className='educare-filter-action-btn flex flex-wrap gap-2'>
                        <div>
                            <Tooltip
                                title="Download"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href="#"
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </Link>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Click To See Calender Report"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href="#"
                                    className="educare-primary-btn-md-fill"
                                >
                                    <i className="icon-calender"></i>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default StaffWiseAttendanceReportFilter;