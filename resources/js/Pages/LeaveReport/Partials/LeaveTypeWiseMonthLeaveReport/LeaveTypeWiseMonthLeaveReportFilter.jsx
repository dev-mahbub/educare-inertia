import React from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from "react";

const multipleSelectorData = [
    { title: 'CL' },
    { title: 'ML' },
    { title: 'EL ' },
    { title: 'LWP' },
];

const LeaveTypeWiseMonthLeaveReportFilter = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelectChange = (event, value) => {
        setSelectedOptions(value);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_field: "",
        select_staff: "",
        select_month: "",
        selcet_option: selectedOptions
    });

    const CommonHeaderFilterData = (e) => {
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
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Leave Type Wise Month Leave Report
                </h5>
            </div>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={CommonHeaderFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: 3</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            {/* Replace changable inputs */}
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search_field"
                                                    value={
                                                        data.search_field
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "search_field",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Search here"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.search_field
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-type-file-styles  max-w-[160px]">
                                                    <Autocomplete
                                                        multiple
                                                        id="tags-outlined"
                                                        options={multipleSelectorData}
                                                        getOptionLabel={(option) => option.title}
                                                        filterSelectedOptions
                                                        value={selectedOptions}
                                                        onChange={handleSelectChange}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label=""
                                                                placeholder="Select Leave Type"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="select_staff"
                                                    data_label="All Staffs"
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
                                            {/* Replace changable inputs */}
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    {/* Replace changable buttons */}
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
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
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
                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveTypeWiseMonthLeaveReportFilter;