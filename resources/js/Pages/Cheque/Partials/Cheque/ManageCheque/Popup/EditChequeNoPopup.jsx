import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditChequeNoPopup({
    modalEditChequeNoOpen,
    setModalEditChequeNoOpen,
    cheque = {},
    filterChequeReports
}) {

    const [chequeDate, setChequeDate] = useState();
    const [customErrors, setCustomErrors] = useState({});

    const {
        data,
        setData,
        errors,
        patch,
        reset,
    } = useForm({
        type: "cheque_no",
        cheque_no: "",
        cheque_date: chequeDate,
    });


    useEffect(() => {
        setData('cheque_date', chequeDate)
    }, [chequeDate]);

    const closeModal = () => {
        setChequeDate(null);
        errors['cheque_no'] = "";
        errors['cheque_date'] = "";
        customErrors['clearance_date'] = "";
        customErrors['clearance_note'] = "";
        setModalEditChequeNoOpen(false);
        reset();
    };


    // handle update succes start
    const handleSuccess = () => {
        setLoading(false);
        filterChequeReports();
        closeModal();
    }
    // handle update succes end

    // handle update cheque no start
    const updateChequeData = (e) => {
        e.preventDefault();

        if (data.cheque_no == "" && data.cheque_date == null) {
            toast.error("Please fill at least one input field", {
                position: 'top-right',
                autoClose: 1500,
            });

            return;
        }

        const form_data = {
            type: "cheque_no",
            cheque_no: data.cheque_no != "" ? data.cheque_no : cheque?.cheque_no,
            cheque_date: data.cheque_date != null ? data.cheque_date : cheque?.cheque_date,
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
    // handle update cheque no start


    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={modalEditChequeNoOpen} onClose={closeModal}>
                <div className="educare-popup-form-wrapper-main p-[30px] pt-2.5">
                    <form onSubmit={updateChequeData}>
                        <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Edit Cheque No</h5>
                            </div>
                            <div className="educare-popup-form pt-2 pb-[12px] maxSm:py-2 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="sm:col-span-6 col-span-12">
                                            <ul>
                                                <li className='mb-2'>
                                                    <span className='text-[16px] font-normal text-headingLightest'>Student Name : </span>
                                                    <span className='text-[16px] font-semibold text-headingLight'>{`${cheque?.student?.first_name} ${cheque?.student?.middle_name} ${cheque?.student?.last_name}`}</span>
                                                </li>
                                                <li className='mb-2'>
                                                    <span className='text-[16px] font-normal text-headingLightest'>Cheque No : </span>
                                                    <span className='text-[16px] font-semibold text-headingLight'>{cheque?.cheque_no}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="educare-input-field-styles mt-1">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="cheque_no"
                                                value={`Current Cheque No - ${cheque?.cheque_no}`}
                                            />
                                        </div>
                                    </div>
                                    <TextInput
                                        id="cheque_no"
                                        value={
                                            data.cheque_no
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "cheque_no",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        placeHolder="Enter new cheque no."
                                    />
                                    <InputError
                                        message={
                                            customErrors.cheque_no
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="educare-popup-form  pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Current Cheque Date - 02/09/2023"
                                            />
                                        </div>
                                    </div>
                                    <DatePicker
                                        selected={chequeDate}
                                        onChange={(date) =>
                                            setChequeDate(date)
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Enter New Cheque Date"
                                        className="w-full"
                                    />
                                    <InputError
                                        message={
                                            customErrors.cheque_date
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
                </div>
            </Modal>
        </section>
    );
}
