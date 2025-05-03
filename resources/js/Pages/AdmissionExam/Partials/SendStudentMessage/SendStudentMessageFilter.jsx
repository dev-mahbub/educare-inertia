import React from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import PrimaryButton from "@/Components/PrimaryButton";
import SendStudentMessagePopup from "./SendStudentMessagePopup/SendStudentMessagePopup";
import { useState } from "react";

const SendStudentMessageFilter = ({ academicYear, classRoomName, enquiryStatus, statusPrimary }) => {
    const [messagePopup, setMessagePopup] = useState(false);
    const handlemessagePopupClick = () => {
        setMessagePopup(!messagePopup);
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
        type_to_search: "",
        academic_year_id: "",
        classroom_id: "",
        registration_status_id: "",
        exam_status: "",
    });

    const handleFielter = (e) => {
        e.preventDefault

        router.post(route('admission_exam.send_student_message'), data)
    }

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
        <>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={CommonHeaderFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: 10</span>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={data.type_to_search}
                                                    onChange={(e) => setData("type_to_search", e.target.value)}
                                                    placeHolder="Type to search"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError message={errors.type_to_search} className="mt-2" />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Select Year"
                                                    data={academicYear}
                                                    value={data.academic_year_id}
                                                    onChange={(e) =>
                                                        setData("academic_year_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.academic_year_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="All Class"
                                                    data={classRoomName}
                                                    value={data.classroom_id}
                                                    onChange={(e) =>
                                                        setData("classroom_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.classroom_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Registration Status"
                                                    data={statusPrimary}
                                                    value={data.registration_status_id}
                                                    onChange={(e) =>
                                                        setData("registration_status_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.registration_status_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Exam Status"
                                                    data={enquiryStatus}
                                                    value={data.exam_status}
                                                    onChange={(e) =>
                                                        setData("exam_status", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.exam_status}
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
                                            <button
                                                type="button"
                                                href="#"
                                                className="educare-secondary-btn-md-fill"
                                                onClick={(e) => {
                                                    handleFielter(e)
                                                }}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
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
                                            <Link
                                                href="#"
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    <PrimaryButton
                                        // disabled={processing}
                                        className="educare-primary-btn-md-fill"
                                        onClick={handlemessagePopupClick}
                                    >
                                        <i className="icon-email mr-1"></i>
                                        Compose
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SendStudentMessagePopup
                messagePopup={messagePopup}
                setMessagePopup={setMessagePopup}
            />
        </>
    );
};

export default SendStudentMessageFilter;
