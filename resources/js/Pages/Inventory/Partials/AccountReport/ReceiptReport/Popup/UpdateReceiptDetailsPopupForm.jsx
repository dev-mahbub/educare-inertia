import InputError from "@/Components/InputError";
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export default function UpdateReceiptDetailsPopupForm({
    editPopupOpen,
    setEditPopupOpen,
    receiptData,
    setReceiptData,
    formData,
    receiptType,
    setReceiptType
}) {

    const [customErrors, setCustomErrors] = useState({});

    const {
        data,
        setData,
        patch,
        reset
    } = useForm({
        description: "",
        receipt_date: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            description: receiptData.description ?? "",
            // receipt_date: receiptData.receipt_date_at ? new Date(receiptData.receipt_date_at) : "",
            receipt_date: receiptData.receipt_date ? new Date(receiptData.receipt_date) : "",
        }));
    }, [receiptData]);


    // handle update receipt details start
    const handleUpdateReceiptDetails = (e) => {
        e.preventDefault();

        let url = route('ledger_receipt.update_details', receiptData?.id);

        if (receiptType == 'sale_ledger_payment') {
            url = route("sale_due_payment.update_details", receiptData?.id);
        }

        patch(url, {
            onSuccess: () => {
                closeModal();
                router.post(route('ledger_receipt_report.list'), formData);
            },
            onError: (errors) => {
                setCustomErrors(errors);
                router.post(route('ledger_receipt_report.list'), formData);
            }
        });
    };
    // handle update receipt details end

    const closeModal = () => {
        setEditPopupOpen(false);
        setReceiptData({});
        setCustomErrors({});
        reset();
        setReceiptType("");
    };

    return (
        <section className='educare-admission-follow-up-area space-y-6'>
            <Modal show={editPopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdateReceiptDetails} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Update Details</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Narration"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={customErrors?.description}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel value="Payment Date" />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={data?.receipt_date}
                                            onChange={(date) => setData('receipt_date', date)}
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Select Date"
                                            className="w-full"
                                            required
                                        />
                                        <InputError
                                            message={customErrors?.receipt_date}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                            Update
                        </PrimaryButton>
                        <SecondaryButton className="ml-3" onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
