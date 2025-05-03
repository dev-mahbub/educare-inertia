import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import TextInput from "@/Components/TextInput";
import DatePicker from "react-datepicker";
import { Tooltip } from "@mui/material";
import SuccessButton from "@/Components/SuccessButton";
import SelectInput2 from "@/Components/SelectInput2";
import useScrollableFilterBar from "@/Utils/FilterArrow";

export default function ChangeClassFilter({
    classrooms = '',
    studentLength = '',
    session_year = '',
    classroom_id = '',
}
) {

    const examStatusInput = useRef();

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

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    const handleClassRoom = (classRoomId) => {
        if (classRoomId === 'Select Class') {
            router.get(route('student.change_class'));
        } else if (!isNaN(parseInt(classRoomId))) {
            router.get('/student/change-class?class_room_id=' + classRoomId);
        }
    }

    const handleChangeClass = (e) => {
        e.preventDefault();
        router.put(route('student.change_class_update'), data);
    };

    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={handleChangeClass}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {studentLength && studentLength}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-select-field-styles">
                                            <SelectInput2
                                                id="classroom_id"
                                                data_label="Class"
                                                data={classrooms}
                                                value={classrooms.classroom_id}
                                                selectedData={classroom_id}
                                                onChange={(e) =>
                                                    handleClassRoom(e.target.value)
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.reg_mode}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="registration_search"
                                                value={data.registration_search}
                                                onChange={(e) => setData("registration_search", e.target.value)}
                                                placeHolder="Search"
                                                type="text"
                                                className="block"
                                            />
                                            <InputError message={errors.registration_search} className="mt-2" />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <div
                                                className="educare-secondary-btn-md-stroke"
                                            >
                                                {session_year}
                                            </div>
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
                                <div className="educare-input-field-styles">
                                    <PrimaryButton
                                        onClick={handleChangeClass}
                                        type="button"
                                        className="educare-primary-btn-md-fill"
                                    >
                                        Change class
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
