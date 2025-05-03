import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import React from "react";
import { router, useForm } from "@inertiajs/react";
const SettingForm = ({
    librarySiteSettings = [],
}) => {
    const {
        data,
        setData,
        errors,
    } = useForm({
        student_book_limit: librarySiteSettings?.student_book_limit,
        staff_book_limit: librarySiteSettings?.staff_book_limit,
    });

    const handelChecked = (type, key, value) => {
        const sendData = { type, key, value }
        router.post(route('account_setting_create_update'), sendData);
    }

    console.log(data);

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Set Library Setting
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 sm:col-span-6 xl:col-span-7  lg:col-span-7">
                            <p>Student Book Limit</p>
                        </div>
                        <div className="col-span-3 sm:col-span-3 xl:col-span-3  lg:col-span-3">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="student_book_limit"
                                    value={data.student_book_limit}
                                    onChange={(e) =>
                                        setData(
                                            "student_book_limit",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                    type="number"
                                />
                                <InputError
                                    message={errors.student_book_limit}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 sm:col-span-3 xl:col-span-2  lg:col-span-2">
                            <button
                                className="educare-success-btn-md-fill"
                                onClick={(e) => handelChecked('Library', 'student_book_limit', data?.student_book_limit)}
                                type="button"
                            >
                                <i className="icon-check-1"></i>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5 mt-5">
                        <div className="col-span-6 sm:col-span-6 xl:col-span-7 lg:col-span-7">
                            <p>Staff Book Limit</p>
                        </div>
                        <div className="col-span-3 sm:col-span-3 xl:col-span-3 lg:col-span-3">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="staff_book_limit"
                                    value={data.staff_book_limit}
                                    onChange={(e) =>
                                        setData(
                                            "staff_book_limit",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                    type="number"
                                />
                                <InputError
                                    message={errors.staff_book_limit}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 sm:col-span-3 xl:col-span-2 lg:col-span-2">
                            <button
                                className="educare-success-btn-md-fill"
                                onClick={(e) => handelChecked('Library', 'staff_book_limit', data?.staff_book_limit)}
                                type="button"
                            >
                                <i className="icon-check-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingForm;
