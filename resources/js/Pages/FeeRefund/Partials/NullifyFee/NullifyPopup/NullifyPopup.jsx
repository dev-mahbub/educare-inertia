import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NullifyPopup({ className = '', nullifyPopup, setNullifyPopup, formData = {}, setSelectedFeeIds, setFeeNullifiedStatus }) {
    const [nullifyDate, setNullifyDate] = useState(null)

    const {
        data,
        setData,
        delete: destroy,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        nullify_date: nullifyDate,
        nullify_reason: "",
    });


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            nullify_date: nullifyDate
        }))
    },[nullifyDate]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
           ...formData
        }))
    }, [formData]);


    const handleNullifySuccess = () => {
        setFeeNullifiedStatus(true)
        setSelectedFeeIds([]);
        closeModal();
        getStudentFeeStructure();
    }

    const getStudentFeeStructure = () => {
        router.post(route('fee_refund.fee_nullify'), formData);
    }

    const handleNullifyData = (e) => {
        e.preventDefault();

        if(data?.nullify_date != "" && data?.nullify_reason != "") {
            post(route("fee_refund.fee_nullify.save"), {
                preserveScroll: true,
                onSuccess: () => handleNullifySuccess(),
                onError: (errors) => {
                    let count = 0;

                    for (let key in errors) {
                        count++;

                        if (key === 'fee_ids' || key.split('.')[0] === 'fee_ids' || key === 'student_id') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            })
                        }

                        if (count >= 1) {
                            break;
                        }
                    }

                    getStudentFeeStructure();
                },
            });
        }
        else {
            toast.error("Nullify date and reason is required", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
    };


    const closeModal = () => {
        setNullifyPopup(false);
        setNullifyDate(null);
        reset();
    };

    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={nullifyPopup} onClose={closeModal}>
                <form onSubmit={handleNullifyData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Nullify Student Structure</h5>
                        </div>
                        <div className="educare-input-field-styles pt-5 w-full md:w-[300px]">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        value="Date"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <DatePicker
                                selected={nullifyDate}
                                onChange={(date) =>
                                    setNullifyDate(date)
                                }
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
                            />
                            <InputError
                                message={
                                    errors.nullify_date
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="nullify_reason"
                                            value="Reason"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextareaInput
                                    id="nullify_reason"
                                    value={
                                        data.nullify_reason
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "nullify_reason",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.nullify_reason
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton className="educare-gray-btn-md-stroke" type="button" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton className="educare-primary-btn-md-fill" type="submit">Save</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
