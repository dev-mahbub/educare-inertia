import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import TextInput from "@/Components/TextInput";
import DatePicker from "react-datepicker";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";


export default function UpdateFilter({ students = '' }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const examStatusInput = useRef();
    const ewsInput = useRef();
    const registrationSearchInput = useRef();
    const specialChildInput = useRef();
    const yearInput = useRef();
    const classInput = useRef();
    const regStatusInput = useRef();
    const regModeInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        exam_status: "",
        ews_id: "",
        registration_search: "",
        special_child: "",
        year_id: "",
        class_id: "",
        reg_status: "",
        reg_mode: "",
    });

    const registrationFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.exam_status) {
                    reset("exam_status");
                    examStatusInput.current.focus();
                }
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
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {students && students?.length}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="registration_search"
                                                ref={registrationSearchInput}
                                                value={data.registration_search}
                                                onChange={(e) => setData("registration_search", e.target.value)}
                                                placeHolder="Search"
                                                type="text"
                                                className="block"
                                            />
                                            <InputError message={errors.registration_search} className="mt-2" />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="section_id"
                                                data_label="Section"
                                                data={[]}
                                                ref={regModeInput}
                                                value={data.reg_mode}
                                                onChange={(e) =>
                                                    setData("reg_mode", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.reg_mode}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="class_id"
                                                data_label="Class"
                                                data={[]}
                                                ref={regModeInput}
                                                value={data.reg_mode}
                                                onChange={(e) =>
                                                    setData("reg_mode", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.reg_mode}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
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
                                        title="Excel Sheet"
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
                    </form>
                </div>
            </div>
        </div>
    );
};
