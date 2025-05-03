import InputError from "@/Components/InputError";
import DatePicker from "react-datepicker";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextareaInput from "@/Components/TextareaInput";

const ReturnBookLeftForm = ({
    bookData = [],
    data,
    setData,
    errors,
    processing,
}) => {

    const handleAccNo = (e) => {
        e.preventDefault();
        router.post(route('book.return'), { acc_no: data?.acc_no });
    }

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-BookBookmark"></i>
                            Book Return
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="acc_no"
                                        value={data.acc_no}
                                        placeHolder="Enter Book No"
                                        onChange={(e) =>
                                            setData(
                                                "acc_no",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                </div>
                            </div>
                            <div className="col-span-8 md:col-span-8 lg:col-span-8 max2Xl:col-span-8 minMaxMd:col-span-8">
                                <div className="educare-input-field-styles">
                                    <button type="button" disabled={processing} onClick={(e) => handleAccNo(e)} className="transition ease-in-out duration-150 undefined educare-success-btn-md-fill">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5 mt-5">
                            <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="issued_date_at"
                                        value="Book Issue Date"
                                    />
                                    <DatePicker
                                        selected={data?.issued_date_at ? new Date(data?.issued_date_at) : null}
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable={false}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Book Issue Date"
                                        className="w-full disabled"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="due_date_at"
                                        value="Book Due Date"
                                    />
                                    <DatePicker
                                        selected={data?.due_date_at ? new Date(data?.due_date_at) : null}
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable={false}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Book Issue Date"
                                        className="w-full disabled"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 md:col-span-4 lg:col-span-4 max2Xl:col-span-4 minMaxMd:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <label for="return_date" className="font-primary">Return Date</label>
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <DatePicker
                                        selected={
                                            data?.return_date
                                            & new Date(data?.return_date)
                                        }
                                        onChange={(date) =>
                                            setData("return_date", date)
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="End date"
                                        className="w-full"
                                        required
                                    />
                                    <InputError message={errors.return_date} className="mt-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                data?.book_item_id
                    ?
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-BookBookmark"></i>
                                    Book detail
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 md:col-span-8 lg:col-span-8 max2Xl:col-span-8 minMaxMd:col-span-8">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="book_title"
                                                value="Book Title"
                                            />
                                            <TextInput
                                                id="book_title"
                                                defaultValue={data?.book_title}
                                                disabled={true}
                                                className="disabled block"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-5 mt-5">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 max2Xl:col-span-6 minMaxMd:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="author"
                                                value="Author"
                                            />
                                            <TextInput
                                                id="author"
                                                defaultValue={data?.author}
                                                disabled={true}
                                                className="disabled block"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 max2Xl:col-span-6 minMaxMd:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="publisher"
                                                value="Publisher"
                                            />
                                            <TextInput
                                                id="publisher"
                                                defaultValue={data.publisher_name}
                                                disabled={true}
                                                className="disabled block"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="book_details"
                                                value="Book Detail"
                                            />
                                            <TextareaInput
                                                id="book_details"
                                                defaultValue={data.description}
                                                disabled={true}
                                                className="disabled block"
                                            />
                                        </div>
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

export default ReturnBookLeftForm;
