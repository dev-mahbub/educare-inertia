import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';

const DownloadTcFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_name: "",
        select_academic_year: "",
        select_class: "",

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
                        <i className="icon-DownloadSimple"></i>
                        Download TC
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div>
                        <span className='min-h-[30px] inline-block border px-4 leading-7
                         border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total : 03</span>
                    </div>
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_name"
                            value={
                                data.search_name
                            }
                            onChange={(e) =>
                                setData(
                                    "search_name",
                                    e.target.value
                                )
                            }
                            placeHolder="Search"
                            className="block"
                        />
                        <InputError
                            message={
                                errors.search_name
                            }
                            className="mt-2"
                        />
                    </div>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="select_academic_year"
                            data_label="Academic Year"
                            data={[]}
                            value={
                                data.select_academic_year
                            }
                            onChange={(e) =>
                                setData(
                                    "select_academic_year",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.select_academic_year
                            }
                            className="mt-2"
                        />
                    </div>

                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="select_class"
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
            </div>
        </form>
    );
};

export default DownloadTcFilter;