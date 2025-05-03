import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SelectFeeTypePopup({
    className = '',
    feeTypePopup,
    setFeeTypePopup,
    feeTypes = [],
    setSelectedExtraFeeTypes,
    selectedExtraFeeTypes,
    feeData,
    formReset = false,
    setSelectedFeeTypeIds,
    selectedFeeTypeIds,
    sendExtraFeeDataToParent
}) {

    const [formFields, setFormFields] = useState([]);
    const [feeTypeAmountArrayData, setFeeTypeAmountArrayData] = useState([]);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        select_all_fee_type: "",
        fee_types: selectedExtraFeeTypes,
        copy_to_all: false,
    });

    // reset selected fee type ids start
    useEffect(() => {
        if (formReset === true) {
            setSelectedFeeTypeIds([]);
        }
    }, [formReset]);
    // reset selected fee type ids start


    // handle form fields data start
    useEffect(() => {
        setFormFields(feeTypes?.map(item => {
            const mathchedItem = feeData?.fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id);

            let result = {
                id: null,
                fee_type_id: item.id,
                title: item.fee_type,
                amount: 0,
                discount_amount: 0,
                fee_id: feeData?.fee?.id,
                payment_status: mathchedItem?.payment_status ?? 'Due',
            }

            return result;
        }));
    }, [feeTypes, selectedExtraFeeTypes]);
    // handle form fields data end

    // store selected fee type data start
    useEffect(() => {
        setFeeTypeAmountArrayData(formFields.filter(item => selectedFeeTypeIds?.includes(item.fee_type_id))?.map(item => {
            const amount = item.amount != null ? parseFloat(item.amount) : 0;
            let discount_amount = item.discount_amount != '' ? parseFloat(item.discount_amount) : 0;

            if (discount_amount > amount) {
                discount_amount = amount;
            }

            const payable_amount = amount - discount_amount;

            const feeType = feeTypes?.find(feeTypeItem => feeTypeItem?.id == item.fee_type_id)

            return {
                id: item?.id ?? null,
                discount_id: item?.discount_id ?? null,
                fee_id: feeData?.fee?.id,
                fee_type_id: item?.fee_type_id,
                fee_type_title: item?.title,
                amount: amount,
                payable_amount: amount,
                paid_amount: 0,
                due_amount: payable_amount,
                discount_amount: discount_amount,
                semester: null,
                fee_installment_type: "ExtraCharge",
                is_extra_charge: true,
                is_fee_special: feeType?.is_fee_special,
                fee_payment_type: 'fee_installment',
                payment_status: item?.payment_status,
                is_new: true,
            }
        }));
    }, [selectedFeeTypeIds, formFields]);
    // store selected fee type data start


    // handle form input change start
    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        updatedFields[index][field] = event.target.value;

        setFormFields(updatedFields);
    }

    const handleChange = () => {
        const emptyFields = feeTypeAmountArrayData?.filter(item => (item?.amount == null || item?.amount == '' || item?.amount <= 0 || Number.isNaN(item?.amount)));

        if (emptyFields?.length <= 0) {
            // setSelectedExtraFeeTypes(feeTypeAmountArrayData?.filter(item => (item?.amount != null || item?.amount != '' || item?.amount > 0 || !Number.isNaN(item?.amount))));
            sendExtraFeeDataToParent(feeTypeAmountArrayData?.filter(item => (item?.amount != null || item?.amount != '' || item?.amount > 0 || !Number.isNaN(item?.amount))))
            closeModal();
        }
        else {
            toast.error("Selected fee type amount can't be empty and must be a valid integer.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    }
    // handle form input change end


    // handle checkbox select start
    const setSelectedFeeTypeId = (id) => {
        if (selectedFeeTypeIds?.includes(id)) {
            setSelectedFeeTypeIds([...selectedFeeTypeIds].filter((item) => item !== id));
        }
        else {
            if (selectedFeeTypeIds?.length > 0) {
                setSelectedFeeTypeIds([
                    ...selectedFeeTypeIds,
                    id,
                ]);
            }
            else {
                setSelectedFeeTypeIds([id]);
            }
        }

        const updateSelectedFeeTypeIds = selectedFeeTypeIds?.length > 0 ? [...selectedFeeTypeIds] : selectedFeeTypeIds;

        setData('fee_type_ids', updateSelectedFeeTypeIds);
    };
    // handle checkbox select end


    const feeTypePopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setSelectedFeeTypeIds([]);
        setFeeTypePopup(false);
        reset();
    };


    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={feeTypePopup} onClose={closeModal}>
                    <form onSubmit={feeTypePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Select Extra Charge</h5>
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
                                                <th className='whitespace-nowrap'>Concession</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formFields?.length > 0 ? (
                                                formFields?.map((form, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-create-school-settings-list-checka width-full">
                                                                <Checkbox
                                                                    id="fee_type_id"
                                                                    name="fee_type_id"
                                                                    checked={
                                                                        selectedFeeTypeIds?.includes(form?.fee_type_id)
                                                                    }
                                                                    onChange={(e) =>
                                                                        setSelectedFeeTypeId(form?.fee_type_id)
                                                                    }
                                                                    value={form?.fee_type_id}
                                                                    className="block"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>{form?.title}</td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    // disabled={
                                                                    //     form?.payment_status === 'Partial' || form?.payment_status === 'Paid' ? true: false
                                                                    // }
                                                                    id="amount"
                                                                    name="amount"
                                                                    onChange={(e) =>
                                                                            handleFormChange(e, index, "amount")
                                                                    }
                                                                    value={form.amount}
                                                                    className={`${form?.payment_status == 'Partial' || form?.payment_status == 'Paid' ? '' : ''}  block`}
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
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    // disabled={
                                                                    //     form?.payment_status === 'Partial' || form?.payment_status === 'Paid' ? true: false
                                                                    // }
                                                                    id="discount_amount"
                                                                    name="discount_amount"
                                                                    onChange={(e) =>
                                                                        handleFormChange(e, index, "discount_amount")
                                                                    }
                                                                    value={form.discount_amount}
                                                                    className={`${form?.payment_status == 'Partial' || form?.payment_status == 'Paid' ? '' : ''}  block`}
                                                                    placeHolder="Concession"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.discount_amount
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className = "text-center text-red-500"colSpan = "7">
                                                        Data not found
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Close</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill" onClick={handleChange}>Save</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
