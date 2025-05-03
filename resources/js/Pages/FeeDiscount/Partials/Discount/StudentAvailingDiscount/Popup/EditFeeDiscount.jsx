import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditFeeDiscount({
    className = '',
    editFeeDiscountPopup,
    setEditFeeDiscountPopup,
    feeTypes = [],
    feeData = [],
    isDiscountPercentage = false,
    sendFeeTypeAmountDataToParent,
    student_id = null,
    discount_id = null,
}) {

    const [selectedFeeTypeIds, setSelectedFeeTypeIds] = useState([]);
    const [formFields, setFormFields] = useState([]);
    const [feeTypeAmountArrayData, setFeeTypeAmountArrayData] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [discountId, setDiscountId] = useState(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        put,
        errors,
    } = useForm({
        student_id: studentId,
        discount_id: discountId,
        fee_id: feeData?.fee?.id,
        is_discount_percentage: isDiscountPercentage,
        fee_type_amount_array: feeTypeAmountArrayData,
        fee_type_ids: selectedFeeTypeIds,
    });

    useEffect(() => {
        setFormFields(feeTypes?.map(item => ({
            fee_type_id: item.id,
            title: item.fee_type,
            amount: (feeData?.fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount != null ? parseFloat(feeData?.fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) : feeData?.fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) ?? null,
            fee_id: feeData?.fee?.id,
        })));
    }, [feeTypes, feeData]);


    useEffect(() => {
        setSelectedFeeTypeIds(feeData?.fee_type_amounts?.map(item => item.fee_type_id));
    }, [feeData]);

    useEffect(() => {
        setStudentId(student_id);
    }, [student_id]);

    useEffect(() => {
        setDiscountId(discount_id);
    }, [discount_id]);

    useEffect(() => {
        setData('student_id', studentId);
    }, [studentId]);

    useEffect(() => {
        setData('discount_id', discountId);
    }, [discountId]);


    useEffect(() => {
        setData('fee_id', feeData?.fee?.id ?? null);
    }, [feeData]);


    useEffect(() => {
        setData('is_discount_percentage', isDiscountPercentage);
    }, [isDiscountPercentage]);

    useEffect(() => {
        setData('fee_type_amount_array', feeTypeAmountArrayData);
    }, [feeTypeAmountArrayData]);


    useEffect(() => {
        setData('fee_type_ids', selectedFeeTypeIds);
    }, [selectedFeeTypeIds]);


    useEffect(() => {
        if (selectedFeeTypeIds?.length <= 0) {
            setSelectAllChecked(false)
        }
        else {
            setSelectAllChecked(selectedFeeTypeIds?.length === feeTypes?.length)
        }

    }, [feeTypes, selectedFeeTypeIds]);


    useEffect(() => {
        setFeeTypeAmountArrayData(formFields.filter(item => selectedFeeTypeIds?.includes(item.fee_type_id))?.map(item => ({
            fee_type_id: item.fee_type_id,
            amount: item.amount != null ? parseFloat(item.amount) : null,
            fee_id: item.fee_id,
            title: item.title,
        })));
    }, [selectedFeeTypeIds, formFields]);


    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_fee_type_id") {
            if (value === true) {
                setSelectedFeeTypeIds(feeTypes.map((item) => item.id))
            }
            else {
                setSelectedFeeTypeIds([])
            }

            setSelectAllChecked(value);
        }
    };


    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        let value = event.target.value;

        if (field === 'amount' && isDiscountPercentage) {
            value = value > 100 ? 100 : value;
        }

        updatedFields[index][field] = value;

        setFormFields(updatedFields);
    }


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


    const updateFeeTypePopupData = (e) => {
        e.preventDefault();

        data.student_id = studentId;

        put(route('fee_discount.student.update'), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                closeModal()
                sendFeeTypeAmountDataToParent(feeTypeAmountArrayData);
            },
            onError: (errors) => {
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
            },
        });

        console.log(data);
    };

    const closeModal = () => {
        setEditFeeDiscountPopup(false);
        setSelectedFeeTypeIds(feeData?.fee_type_amounts?.map(item => item.fee_type_id));
        reset();
    };



    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={editFeeDiscountPopup} onClose={closeModal}>
                    <form onSubmit={updateFeeTypePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Select Fee Type for (April Fee)</h5>
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
                                                formFields?.map((form, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-create-school-settings-list-checka width-full">
                                                                <Checkbox
                                                                    name="fee_type"
                                                                    checked={
                                                                        selectedFeeTypeIds?.includes(form?.fee_type_id)
                                                                    }
                                                                    onChange={(e) => {
                                                                        handleCheckboxSelect(e.target.name, e.target.checked);
                                                                        setSelectedFeeTypeId(form?.fee_type_id)
                                                                    }
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>{form?.title}</td>
                                                        <td>
                                                            <div className="educare-input-field-styles flex items-center">
                                                                <TextInput
                                                                    value={
                                                                        form?.amount ?? ''
                                                                    }
                                                                    onChange={(e) => {
                                                                        handleFormChange(e, index, "amount")
                                                                    }

                                                                    }
                                                                    className="block"
                                                                />
                                                                <span className="ml-1">
                                                                    {isDiscountPercentage ? '%' : ''}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton type="button" className="educare-gray-btn-md-stroke" onClick={closeModal}>Close</PrimaryButton>
                            <PrimaryButton type="submit" className="educare-primary-btn-md-fill">Save</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
