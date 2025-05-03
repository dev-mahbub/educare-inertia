import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import {  useForm } from '@inertiajs/react';
import React from 'react';

const DateWiseClassAttendanceTopFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_month: "",
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
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Staff Day Wise Report
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div className='flex flex-wrap items-center gap-4'>
                        <span className='badge success'>Present : 0</span>
                        <span className='badge danger'>Absent : 0</span>
                        <span className='badge warning'>Half Day : 0</span>
                        <span className='badge primary'>On Leave : 0</span>
                        <span className='badge info'>Weekly Off : 0</span>
                        <span className='badge dark'>Not Marked : 0</span>

                    </div>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            data_label="Month"
                            data={[]}
                            value={
                                data.select_month
                            }
                            onChange={(e) =>
                                setData(
                                    "select_month",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.select_month
                            }
                            className="mt-2"
                        />
                    </div>
                    <PrimaryButton
                        // disabled={processing}
                        className="educare-primary-btn-md-fill"
                    >
                        Update Half Day
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
};

export default DateWiseClassAttendanceTopFilter;