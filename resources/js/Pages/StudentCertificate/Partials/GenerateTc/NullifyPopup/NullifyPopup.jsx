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

export default function NullifyPopup({
    className = '',
    nullifyPopup,
    setNullifyPopup,
    formData = {},
    setSelectedFeeIds,
    setStudentFeeData
}) {
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
        status_date_at: nullifyDate,
        reason: ""
    });


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            ...formData
        }))
    }, [formData]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            status_date_at: nullifyDate
        }))
    },[nullifyDate]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
           ...formData
        }))
    }, [formData]);


    const handleNullifyData = (e) => {
        e.preventDefault();

        if (data?.fee_ids?.length == 0) {
            toast.error("Please select at least one fee installment.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (data?.status_date_at == "") {
            toast.error("Date field is required.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if (data?.reason == "") {
            toast.error("Reason field is required.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            post(route('student_certificate.nullify_fee'), {
                onSuccess: ({ props }) => {
                    const form_data = {
                        classroom_id: data?.classroom_id ?? classroomId,
                        student_id: data?.student_id,
                    }

                    setStudentFeeData([]);
                    setSelectedFeeIds([]);
                    closeModal();

                    router.post(route('student_certificate.generate_tc'), form_data);
                },
                onError: (errors) => {
                    for (const key in errors) {
                        if (key == 'fee_ids') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            });
                        }

                        break;
                    }

                    setStudentFeeData([]);

                    const form_data = {
                        classroom_id: data?.classroom_id ?? classroomId,
                        student_id: data?.student_id,
                    }

                    router.post(route('student_certificate.generate_tc'), form_data);
                },
            });
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
                                    errors.status_date_at
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="reason"
                                            value="Reason"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextareaInput
                                    id="reason"
                                    value={
                                        data.reason
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "reason",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.reason
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
