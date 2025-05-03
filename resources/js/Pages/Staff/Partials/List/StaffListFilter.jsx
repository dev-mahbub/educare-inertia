import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";


const StaffListFilter = ({ staffs = '', inactiveStaffs = '', designations = '', houses = '', jobTypes = '', departments = '', teachingTypes = '', userRolls = '', staffActive }) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        staff_designation: "",
        staff_house: "",
        staff_search: "",
        staff_type: "",
        staff_department: "",
        staff_job_type: "",
        staff_role_type: "",
    });

    const staffFilterData = (e) => {
        e.preventDefault();
        if(staffActive){
            router.post(route("staff.list"), data);
        }else{
            router.post(route("staff.inactive_list"), data);
        }
    };
     //scrollble filter
     const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    
    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-admission-filtar-bar">
                <div className="educare-admission-filtar-bar-filter">
                    <form>
                        <div className="educare-admission-filtar-bar-count">
                            <span>Total: {staffs && staffs.length} {inactiveStaffs && inactiveStaffs.length}</span>
                        </div>
                        <div className="educare-admission-filtar-bar-filter-fields-wrap relative">
                            <span className="educare-admission-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                            <div className="educare-admission-filtar-bar-filter-fields" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                <div className="educare-select-field-styles">
                                    <InputLabel htmlFor="staff_designation" value="" />
                                    <SelectInput
                                        id="staff_designation"
                                        data_label="Designation"
                                        data={designations}
                                        value={data.staff_designation}
                                        onChange={(e) =>
                                            setData("staff_designation", e.target.value)
                                        }
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.staff_designation}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-select-field-styles">
                                    <InputLabel htmlFor="staff_house" value="" />
                                    <SelectInput
                                        id="staff_house"
                                        data_label="House"
                                        data={houses}
                                        value={data.staff_house}
                                        onChange={(e) =>
                                            setData("staff_house", e.target.value)
                                        }
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.staff_house}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-select-field-styles">
                                    <InputLabel htmlFor="staff_type" value="" />
                                    <SelectInput
                                        id="staff_type"
                                        data_label="Type"
                                        data={teachingTypes}
                                        value={data.staff_type}
                                        onChange={(e) =>
                                            setData("staff_type", e.target.value)
                                        }
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.staff_type}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-select-field-styles">
                                    <InputLabel htmlFor="staff_department" value="" />
                                    <SelectInput
                                        id="staff_department"
                                        data_label="Department"
                                        data={departments}
                                        value={data.staff_department}
                                        onChange={(e) =>
                                            setData("staff_department", e.target.value)
                                        }
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.staff_department}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-select-field-styles">
                                    <InputLabel htmlFor="staff_job_type" value="" />
                                    <SelectInput
                                        id="staff_job_type"
                                        data_label="Job Type"
                                        data={jobTypes}
                                        value={data.staff_job_type}
                                        onChange={(e) =>
                                            setData("staff_job_type", e.target.value)
                                        }
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.staff_job_type}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-select-field-styles">
                                    <InputLabel htmlFor="staff_role_type" value="" />
                                    <SelectInput
                                        id="staff_role_type"
                                        data_label="Role"
                                        data={userRolls}
                                        value={data.staff_role_type}
                                        onChange={(e) =>
                                            setData("staff_role_type", e.target.value)
                                        }
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.staff_role_type}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-input-field-styles">
                                    <InputLabel htmlFor="staff_search" value="" />
                                    <TextInput
                                        id="staff_search"
                                        value={data.staff_search}
                                        onChange={(e) => setData("staff_search", e.target.value)}
                                        placeHolder="Search"
                                        type="text"
                                        className="block"
                                    />
                                    <InputError message={errors.staff_search} className="mt-2" />
                                </div>
                            </div>
                            <span className="educare-admission-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                        </div>
                        <div className="educare-admission-filtar-bar-filter-action educare-filter-action-btn">
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <button
                                        type="button"
                                        className="educare-secondary-btn-md-fill"
                                        onClick={(e) => staffFilterData(e)}
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
                                    as="button"
                                >
                                    <a
                                        { ...staffActive ? {href: route('export_excel.staff_list', data)} : {href: route('export_excel.inactive_staff_list', data)} }
                                        target="_blank"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StaffListFilter;
