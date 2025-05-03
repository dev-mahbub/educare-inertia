import RadioInput from '@/Components/RadioInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';

const HeaderFilterTopbar = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        staffType: "",
    });

    const CommonHeaderFilterTopData = (e) => {
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
        <>
            <form onSubmit={CommonHeaderFilterTopData} className='mb-2.5'>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Admission Source
                        </h5>
                    </div>
                    <div className='ml-auto whitespace-nowrap'>
                        <div className="educare-create-school-settings-list-check">
                            <div className="educare-radio-field-styles flex gap-3">
                                <RadioInput
                                    name="staffType"
                                    value="Teaching"
                                    checked={data.staffType === "teaching"}
                                    onChange={() => setData("staffType", "teaching")}
                                />
                                <RadioInput
                                    name="staffType"
                                    value="Non Teaching"
                                    checked={data.staffType === "non_teaching"}
                                    onChange={() => setData("staffType", "non_teaching")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}
                        <div>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Excel Sheet"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Import"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-dark-btn-md-fill"
                                >
                                    <i className="icon-upload"></i>
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button type='button'
                                    className="educare-gray-btn-md-fill"
                                >
                                    <i className="icon-ArrowsClockwise"></i>
                                </button>
                            </Tooltip>
                        </div>
                        {/* Replace changable buttons */}
                    </div>
                </div>
            </form>
            <div className='mb-5'></div>
        </>
    );
};

export default HeaderFilterTopbar;