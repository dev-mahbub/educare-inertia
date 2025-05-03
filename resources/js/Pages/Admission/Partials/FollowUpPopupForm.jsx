import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export default function FollowUpPopupForm({
    className = "",
    modalFollowUpOpen,
    setModalFollowUpOpen,
    enquiryReportData,
    setEnquiryReportData,
    formData
}) {
    const [activityDate, setActivityDate] = useState(new Date());
    const [followactivityDate, setFollowactivityDate] = useState();
    const [customErrors, setCustomErrors] = useState({});

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        post,
        errors,
    } = useForm({
        activity: "",
        follow_date_at: followactivityDate,
        activity_date_at: activityDate,
        next_action: "",
        is_next_action: false,
        enquiry_id: enquiryReportData?.id,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            enquiry_id: enquiryReportData?.id ?? null
        }));
    },[enquiryReportData]);


    useEffect(() => {
        setData('activity_date_at', activityDate);
    },[activityDate]);

    useEffect(() => {
        setData('follow_date_at', followactivityDate);
    },[followactivityDate]);


    const followUpFormData = (e) => {
        e.preventDefault();

        post(route('enquiryfollows.up'), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                closeModal();

                router.post(route("admission_enquery_reg.enquiry_report"), formData);
            },
            onError: (errors) => {
                setCustomErrors(errors)
            },
        });
    };

    const closeModal = () => {
        setEnquiryReportData({});
        setModalFollowUpOpen(false);
        reset();
        setCustomErrors({});
        setActivityDate(new Date());
        setFollowactivityDate();
    };

    return (
        <section
            className={`educare-admission-follow-up-area space-y-6 ${className}`}
        >
            <Modal show={modalFollowUpOpen} onClose={closeModal}>
                <form onSubmit={followUpFormData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Follow Up</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="activity"
                                    value="Activity*"
                                />

                                <TextInput
                                    id="activity"
                                    value={data.activity}
                                    onChange={(e) =>
                                        setData(
                                            "activity",
                                            e.target.value
                                        )
                                    }
                                    type="text"
                                    className="block"
                                />

                                <InputError
                                    message={customErrors.activity}
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="activity_date_at"
                                    value="Activity Date*"
                                />
                                <DatePicker
                                    selected={activityDate}
                                    onChange={(date) => setActivityDate(date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Start date"
                                />

                                <InputError
                                    message={customErrors.activity_date_at}
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-checkbox-field-styles">
                                <InputLabel
                                    htmlFor="is_next_action"
                                    value="Next Follow Up"
                                    className="block"
                                />
                                <Checkbox
                                    name="is_next_action"
                                    checked={data.is_next_action}
                                    onChange={(e) =>
                                        setData("is_next_action", e.target.checked ? true : false)
                                    }
                                />
                            </div>
                            {data?.is_next_action &&
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="follow_date_at"
                                        value="Follow Date"
                                    />
                                    <DatePicker
                                        selected={followactivityDate}
                                        onChange={(date) => setFollowactivityDate(date)}
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="End date"
                                    />
                                </div>
                            }

                            {data?.is_next_action &&
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="next_action"
                                        value="Next Action"
                                    />

                                    <TextInput
                                        id="next_action"
                                        value={data.next_action}
                                        onChange={(e) =>
                                            setData(
                                                "next_action",
                                                e.target.value
                                            )
                                        }
                                        type="text"
                                        className="block"
                                    />

                                    <InputError
                                        message={customErrors.next_action}
                                        className="mt-2"
                                    />
                                </div>
                            }
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton type="button" onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton
                            type="submit"
                            className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
                            disabled={processing}
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
