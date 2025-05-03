import React from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextareaInput from "@/Components/TextareaInput";
import PrimaryButton from "@/Components/PrimaryButton";
const ReturnBookRight = ({
    data,
    setData,
    errors,
    processing,
}) => {

    return (
        <>
            {
                data?.book_user_type === 'Student' || data?.book_user_type === 'Teacher'
                    ?
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-BookBookmark"></i>
                                    {data?.book_user_type === 'Student' ? 'Student' : 'Teacher'} Information
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="grid grid-cols-12 gap-5">
                                    {
                                        data?.book_user_type === 'Student'
                                            ?
                                            <>
                                                <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="admission_no"
                                                            value="Admission Number"
                                                        />
                                                        <TextInput
                                                            id="admission_no"
                                                            defaultValue={data?.admission_no}
                                                            className="block disabled"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="roll_no"
                                                            value="Roll no"
                                                        />
                                                        <TextInput
                                                            id="roll_no"
                                                            defaultValue={data?.roll_no}
                                                            className="block disabled"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="classroom_title"
                                                            value="Class Name"
                                                        />
                                                        <TextInput
                                                            id="classroom_title"
                                                            defaultValue={data?.classroom_title}
                                                            className="block disabled"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="student_name"
                                                            value="Student Name"
                                                        />
                                                        <TextInput
                                                            id="student_name"
                                                            defaultValue={data?.student_name}
                                                            className="block disabled"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            ''
                                    }
                                    {
                                        data?.book_user_type === 'Teacher' ?
                                            <>
                                                <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="staff_name"
                                                            value="Teacher name"
                                                        />
                                                        <TextInput
                                                            id="staff_name"
                                                            defaultValue={data?.staff_name}
                                                            className="block disabled"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            ''
                                    }
                                    <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="late_by_day"
                                                value="Late By Day"
                                            />
                                            <TextInput
                                                id="late_by_day"
                                                defaultValue={data.late_by_day}
                                                className="block disabled"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="late_by_fine"
                                                value="Late By Fine"
                                            />
                                            <TextInput
                                                id="late_by_fine"
                                                defaultValue={data.late_by_fine}
                                                className="block disabled"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-12 lg:col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                        <div className="educare-input-field-styles">
                                            <TextareaInput
                                                id="return_note"
                                                value={data.return_note}
                                                placeholder="Enter Return Note"
                                                onChange={(e) =>
                                                    setData(
                                                        "return_note",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.return_note}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="educare-input-field-notes mt-5">
                                    <ul>
                                        <li>
                                            <span className="font-bold text-danger">
                                                Attention !!
                                            </span>
                                        </li>
                                        <li>
                                            <span className="font-bold text-headingLight">
                                                Note :
                                            </span>
                                            To add library fine amount in fee
                                            payment as voucher. please first checked
                                            <span className="font-bold text-headingLight">
                                                Is Add Late Fine In Voucher
                                            </span>
                                            from setting
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-span-12 mt-5">
                                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                        <PrimaryButton disabled={processing} type="submit" className="educare-primary-btn-lg-fill">
                                            Return Book
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    ''
            }
        </>
    );
};

export default ReturnBookRight;
