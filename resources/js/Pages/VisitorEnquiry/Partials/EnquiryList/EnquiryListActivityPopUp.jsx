import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import SelectInput from "@/Components/SelectInput";
const EnquiryListActivityPopUp = ({
    activeId,
    className = "",
    activityPopUp,
    setaAtivityPopUp,
    visitorEnquiryDetailType
}) => {
    const closeModal = () => {
        setaAtivityPopUp(false);
        reset();
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
        visitor_enquiry_id: activeId || "",
        title: "",
        activity_date: "",
        follow_date: "",
        status: "",
    });

    useEffect(() => {
        setData("visitor_enquiry_id", activeId);
    }, [activeId]);



    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("visitor_enquiry.activity_save"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={activityPopUp} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3 mb-2.5">
                                <h5>Add Activity</h5>
                            </div>

                            {/* form */}
                            <form onSubmit={handleSubmit}>
                                <div className="educare-common-card">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12 md:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="title"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="title"
                                                        value={data.title}
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel value="Activity Date" />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <DatePicker
                                                            selected={
                                                                data?.activity_date
                                                                    ? new Date(
                                                                          data?.activity_date
                                                                      )
                                                                    : new Date()
                                                            }
                                                            onChange={(date) =>
                                                                setData(
                                                                    "activity_date",
                                                                    date
                                                                )
                                                            }
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={
                                                                false
                                                            }
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="Activity date"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel value="Follow Date" />
                                                        <DatePicker
                                                            selected={
                                                                data.follow_date &&
                                                                new Date(
                                                                    data.follow_date
                                                                )
                                                            }
                                                            onChange={(date) =>
                                                                setData(
                                                                    "follow_date",
                                                                    date
                                                                )
                                                            }
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={
                                                                false
                                                            }
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="Follow date"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="status"
                                                            value="Select Status"
                                                        />
                                                    </div>
                                                    <SelectInput
                                                        id="status"
                                                        data={visitorEnquiryDetailType}
                                                        value={
                                                            data.status
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "status",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.status
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-end gap-2.5">
                                        <PrimaryButton
                                            type="button"
                                            className="educare-gray-btn-md-stroke"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </PrimaryButton>
                                        <PrimaryButton
                                            className="educare-primary-btn-md-fill"
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>

                            {/*end form */}
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
};

export default EnquiryListActivityPopUp;
