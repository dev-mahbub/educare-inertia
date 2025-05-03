import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const ClassSummaryReportHeader = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_class: "",
        select_subject: "",
    });

    return (

        <>
            <div className='flex justify-between flex-wrap items-start'>
                <div className='grid grid-cols-12 gap-5 pb-4'>
                    <div className='col-span-12 md:col-span-4'>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Class"
                                data={[]}
                                value={
                                    data.select_class
                                }
                                onChange={(e) =>
                                    setData(
                                        "select_class",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.select_class
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Subject"
                                data={[]}
                                value={
                                    data.select_subject
                                }
                                onChange={(e) =>
                                    setData(
                                        "select_subject",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.select_subject
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
                <span className='badge success'>25-Jul-2024</span>
            </div>
        </>
    );
};

export default ClassSummaryReportHeader;
