import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-toastify/dist/ReactToastify.css';

export default function SetClearanceDate({
    className = "",
    modalSetClearanceDateOpen,
    setModalSetClearanceDateOpen,
    cheque = {},
    filterChequeReports
}) {
    const [clearanceDate, setClearanceDate] = useState(null);
    const [customErrors, setCustomErrors] = useState({});

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        patch,
    } = useForm({
        type: 'clearance_date',
        clearance_date: clearanceDate,
        clearance_note: cheque?.cheque_clearance_note ?? "",
    });


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            clearance_date: clearanceDate
        }));
    }, [clearanceDate]);

    useEffect(() => {
        setClearanceDate(cheque?.cheque_clearance_date ? new Date(cheque?.cheque_clearance_date) : null);

        setData((prevData) => ({
            ...prevData,
            clearance_note: cheque?.cheque_clearance_note ?? ""
        }));
    }, [cheque]);


    // handle update succes start
    const handleSuccess = () => {
        setLoading(false);
        filterChequeReports();
        closeModal();
    }
    // handle update succes end


    // handle update cheque data start
    const updateChequeData = (e) => {
        e.preventDefault();

        const form_data = {
            type: "clearance_date",
            clearance_date: data.clearance_date,
            clearance_note: data.clearance_note,
        }

        router.patch(route('cheque_data.update', cheque?.id), form_data, {
            onSuccess: () => {
                handleSuccess();
            },
            onError: (errors) => {
                setCustomErrors(errors)
            }
        });
    };
    // handle update cheque data end

    // handle close modal start
    const closeModal = () => {
        reset();
        setClearanceDate(cheque?.cheque_clearance_date ? new Date(cheque?.cheque_clearance_date) : null);
        setData('clearance_note', cheque?.cheque_clearance_note ?? "");
        errors['clearance_date'] = "";
        errors['clearance_note'] = "";
        customErrors['clearance_date'] = "";
        customErrors['clearance_note'] = "";
        setModalSetClearanceDateOpen(false);
    };
    // handle close modal start


    return (
        <section
            className={`educare-admission-follow-up-area space-y-6 ${className}`}
        >
            <Modal show={modalSetClearanceDateOpen} onClose={closeModal}>
                <form
                    onSubmit={updateChequeData}
                    className="p-[30px] pt-2.5"
                >
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Set Clearance Date</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <div className="grid grid-cols-12 gap-x-5">
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className="mb-2">
                                                <span className="text-[16px] font-normal text-headingLightest">
                                                    Student Name :{" "}
                                                </span>
                                                <span className="text-[16px] font-semibold text-headingLight">
                                                    {`${cheque?.student?.first_name} ${cheque?.student?.middle_name} ${cheque?.student?.last_name}`}
                                                </span>
                                            </li>
                                            <li className="mb-2">
                                                <span className="text-[16px] font-normal text-headingLightest">
                                                    Cheque No :{" "}
                                                </span>
                                                <span className="text-[16px] font-semibold text-headingLight">
                                                    {cheque?.cheque_no}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className="mb-2">
                                                <span className="text-[16px] font-normal text-headingLightest">
                                                    Receipt No :{" "}
                                                </span>
                                                <span className="text-[16px] font-semibold text-headingLight">
                                                    {cheque?.receipt_no}
                                                </span>
                                            </li>
                                            <li className="mb-2">
                                                <span className="text-[16px] font-normal text-headingLightest">
                                                    Cheque Date :{" "}
                                                </span>
                                                <span className="text-[16px] font-semibold text-headingLight">
                                                    {cheque?.cheque_date}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel value="Set Clearance Date" />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <DatePicker
                                    selected={clearanceDate}
                                    onChange={(date) => setClearanceDate(date)}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Cheque Clearance Date"
                                    className="w-full"
                                />
                                <InputError
                                    message={customErrors.clearance_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="clearance_note"
                                            value="Set Clearance Note"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextareaInput
                                    id="clearance_note"
                                    value={data.clearance_note}
                                    onChange={(e) =>
                                        setData(
                                            "clearance_note",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={customErrors.clearance_note}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton
                            className="educare-gray-btn-md-stroke"
                            type="button"
                            onClick={closeModal}
                        >
                            Cancel
                        </PrimaryButton>
                        <PrimaryButton type="submit" className="educare-primary-btn-md-fill">
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
