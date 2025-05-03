import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import DatePicker from "react-datepicker";
import TextInput from '@/Components/TextInput';
import React from 'react';

const SmsDeliverySummaryFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_audience: "",
        select_context: "",
        search_id: "",
        start_date: new Date(),
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
                        <i className="icon-ChatCenteredDots"></i>
                        Sent SMS delivery report
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div>
                        <span
                            className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'
                        >
                            Total SMS : 10
                        </span>
                    </div>
                    <div>
                        <span
                            className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'
                        >
                            Total Row's : 10
                        </span>
                    </div>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            data_label="Audience"
                            data={[]}
                            value={
                                data.select_audience
                            }
                            onChange={(e) =>
                                setData(
                                    "select_audience",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.select_audience
                            }
                            className="mt-2"
                        />
                    </div>
                    <div className="educare-input-field-styles">
                        <DatePicker
                            selected={
                                data?.start_date && new Date(data?.start_date)
                            }
                            onChange={(date) =>
                                setData("start_date", date)
                            }
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                            showPopperArrow={false}
                            peekNextMonth
                            dropdownMode="select"
                            isClearable
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Start date"
                            className="w-full"
                        />
                    </div>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            data_label="Context"
                            data={[]}
                            value={
                                data.select_context
                            }
                            onChange={(e) =>
                                setData(
                                    "select_context",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.select_context
                            }
                            className="mt-2"
                        />
                    </div>
                    <div className="educare-input-field-styles">
                        <TextInput
                            value={
                                data.search_id
                            }
                            onChange={(e) =>
                                setData(
                                    "search_id",
                                    e.target.value
                                )
                            }
                            placeHolder="Search here"
                            className="block"
                        />
                        <InputError
                            message={
                                errors.search_id
                            }
                            className="mt-2"
                        />
                    </div>
                    <div className='educare-filter-action-btn flex flex-wrap gap-2'>
                        <div>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href="#"
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </Link>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href="#"
                                    className="educare-gray-btn-md-fill"
                                >
                                    <i className="icon-ArrowsClockwise"></i>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SmsDeliverySummaryFilter;