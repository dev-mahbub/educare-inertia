import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateFeeTypePopup({
    className = '',
    updateFeeTypePopup,
    setUpdateFeeTypePopup,
    selectedFeeTypes = [],
    feeTypes = [],
    selectedFeeData = {},
    selectedStudent = {},
}) {

    const [feeTypeAmountArrayData, setFeeTypeAmountArrayData] = useState([]);
    const [formFields, setFormFields] = useState([]);
    const [selectedFeeTypeIds, setSelectedFeeTypeIds] = useState([]);


    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        put,
        errors,
    } = useForm({
        class_name_id: selectedStudent?.class_name_id ?? "",
        student_id: selectedStudent?.id,
        fee_type_amount_array: feeTypeAmountArrayData,
        is_admission_installment: false,
    });



    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: selectedStudent?.id,
            class_name_id: selectedStudent?.class_name_id ?? "",
        }));
    }, [selectedStudent]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            is_admission_installment: selectedFeeData?.is_admission_installment ?? false,
        }));
    }, [selectedFeeData]);


    useEffect(() => {
        setSelectedFeeTypeIds(selectedFeeTypes?.map(item => item?.fee_type_id));
    }, [selectedFeeTypes]);


    useEffect(() => {
        setFormFields(feeTypes?.map(item => ({
            fee_id: selectedFeeData?.id ?? null,
            fee_type_id: item?.id,
            fee_type_title: item?.fee_type,
            is_fee_special: item?.is_fee_special,
            amount: selectedFeeTypes?.find(feeType => item?.id === feeType?.fee_type_id)?.amount ?? null,
        })));
    }, [feeTypes, selectedFeeTypes]);

    useEffect(() => {
        setFeeTypeAmountArrayData(formFields.filter(item => selectedFeeTypeIds?.includes(item.fee_type_id))?.map(item => ({
            fee_id: item?.fee_id,
            fee_type_id: item?.fee_type_id,
            is_fee_special: item?.is_fee_special,
            amount: item?.amount,
        })));
    }, [selectedFeeTypeIds, formFields]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            fee_type_amount_array: feeTypeAmountArrayData?.filter(item => selectedFeeTypeIds?.includes(item.fee_type_id))
        }))
    }, [selectedFeeTypeIds, feeTypeAmountArrayData]);


    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        updatedFields[index][field] = Number.isNaN(parseFloat(event.target.value)) ? '' : parseFloat(event.target.value);

        setFormFields(updatedFields);
    }


    const setSelectedFeeTypeId = (id) => {
        if(selectedFeeTypeIds?.includes(id)){
            setSelectedFeeTypeIds([...selectedFeeTypeIds].filter(item => item !== id));
        }
        else {
            setSelectedFeeTypeIds([...selectedFeeTypeIds, id])
        }
    }

    const handleSuccess = () => {
        const form_data = {
            admission_no: selectedStudent?.admission_no,
            student_id: selectedStudent?.id
        }

        router.post(route('fee.update_class_fee_structure'), form_data)
    }


    const handleError = (errors) => {
        let count = 0;

        for (let key in errors) {
            count++;

            if (key === 'fee_type_amount_array') {
                toast.error(errors[key], {
                    position: 'top-right',
                    autoClose: 1500,
                })
            }

            if (key.split('.')[2] === 'amount') {
                count++;
                toast.error(errors[key], {
                    position: 'top-right',
                    autoClose: 1500,
                })
            }

            if (count >= 1) {
                break;
            }
        }

        const form_data = {
            admission_no: selectedStudent?.admission_no,
            student_id: selectedStudent?.id
        }

        router.post(route('fee.update_class_fee_structure'), form_data)
    }


    const updateFeeTypePopupData = (e) => {
        e.preventDefault();

        put(route('fee.update_class_fee_structure.update'), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                handleSuccess();
                closeModal();
            },
            onError: (errors) => {
                handleError(errors)
            }
        });
    };

    const closeModal = () => {
        setUpdateFeeTypePopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={updateFeeTypePopup} onClose={closeModal}>
                    <form onSubmit={updateFeeTypePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Select Fee Type for ({selectedFeeData?.title})</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] body-bg maxSm:py-4 px-[30px] flex flex-col gap-3">
                                <div className="educare-admission-list table-width-full pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='whitespace-nowrap'>
                                                    Check
                                                </th>
                                                <th className='whitespace-nowrap'>Fee Type</th>
                                                <th className='whitespace-nowrap'>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formFields?.length > 0 ?
                                                formFields?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-create-school-settings-list-checka width-full">
                                                                <Checkbox
                                                                    name="fee_type_id"
                                                                    checked={
                                                                        selectedFeeTypeIds?.includes(item?.fee_type_id)
                                                                    }
                                                                    onChange={(e) =>
                                                                        setSelectedFeeTypeId(item?.fee_type_id)
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>{item?.fee_type_title}</td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="amount"
                                                                    value={
                                                                        item?.amount ?? ''
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleFormChange(e, index, "amount")
                                                                    }
                                                                    className="block"
                                                                    placeHolder="Amount"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.amount
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="7">
                                                        Data not found
                                                    </td>
                                                </tr>
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                className="educare-gray-btn-md-stroke"
                                type="button"
                                onClick={closeModal}
                            >
                                Close
                            </PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                type="submit"
                            >
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
