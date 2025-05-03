import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
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
    semesters = [],
    selectedFeeTypes,
    feeData = {},
    sendFeeTypeDataToParent,
    formReset = false
}) {

    const [formFields, setFormFields] = useState([]);
    const [selectedFeeTypeIds, setSelectedFeeTypeIds] = useState([]);
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
        monday_id: false,
        tuesday_id: false,
        wednesday_id: false,
        // thursday_id: false,
        // friday_id: false,
        // saturday_id: false,
        // sunday_id: false,
        //
        amount: "",
        semester: "",
        copy_to_all: false,
    });

    useEffect(() => {
        if (formReset === true) {
            setSelectedFeeTypeIds([]);
        }
    }, [formReset])

    useEffect(() => {
        setFormFields(feeTypes?.map(item => {
            let result = {
                fee_type_id: item.id,
                title: item.fee_type,
                amount: (selectedFeeTypes?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount != null ? parseFloat(selectedFeeTypes?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) : selectedFeeTypes?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) ?? null,
                semester: selectedFeeTypes?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.semester != null ? selectedFeeTypes?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.semester : null,
                fee_id: feeData?.id,
                is_admission_installment: feeData?.is_admission_install,
            }

            return result;
        }));
    }, [feeTypes, feeData, selectedFeeTypes]);


    useEffect(() => {
        setFeeTypeAmountArrayData(formFields.filter(item => selectedFeeTypeIds?.includes(item.fee_type_id))?.map(item => ({
            fee_type_id: item.fee_type_id,
            title: item.title,
            amount: item.amount != null ? parseFloat(item.amount) : null,
            semester: item.semester != '' ? item.semester : null,
            fee_id: item.fee_id,
            is_admission_installment: item?.is_admission_installment,
        })));
    }, [selectedFeeTypeIds, formFields]);


    useEffect(() => {
        setSelectedFeeTypeIds(selectedFeeTypes?.map(item => item?.fee_type_id));
    }, [selectedFeeTypes])


    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        updatedFields[index][field] = event.target.value;

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


    const closeModal = () => {
        setSelectedFeeTypeIds([]);
        setFeeTypePopup(false);
        reset();
    };

    const handleChange = () => {
        const emptyFields = feeTypeAmountArrayData?.filter(item => (item?.amount == null || item?.amount == '' || item?.amount <= 0 || Number.isNaN(item?.amount)) || (item?.semester == null || item?.semester == ''));

        if (emptyFields?.length <= 0) {
            sendFeeTypeDataToParent(feeTypeAmountArrayData?.filter(item => (item?.amount != null || item?.amount != '' || item?.amount > 0 || !Number.isNaN(item?.amount)) || (item?.semester != null || item?.semester != '')), data.copy_to_all);
        }
        else {
            toast.error("Selected fee type amount and semester can't be empty and must be a valid integer.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    }


    const feeTypePopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };


    //handle Checkbox start
    const handleCheckboxSelect1 = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_fee_type") {
            newFormData = {
                ...data,
                [name]: value,
                monday_id: value,
                tuesday_id: value,
                wednesday_id: value,
                // thursday_id: value,
                // friday_id: value,
                // saturday_id: value,
                // sunday_id: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.select_all_fee_type = false;
            }
            // after all child checked, then parent will check
              else if ( newFormData.monday_id === true
                        // newFormData.tuesday_id === true &&
                        // newFormData.wednesday_id === true
                        // newFormData.thursday_id === true &&
                        // newFormData.friday_id === true &&
                        // newFormData.saturday_id === true &&
                        // newFormData.sunday_id === true
                ) {
                newFormData.select_all_fee_type = true;
              }
        }

        setData(newFormData);
    };
    //handle Checkbox end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={feeTypePopup} onClose={closeModal}>
                    <form onSubmit={feeTypePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Select Fee Type for ( Admission Fee )</h5>
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
                                                <th className='whitespace-nowrap'>Multiply</th>
                                                <th className='whitespace-nowrap'>Semester</th>
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
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>{form?.title}</td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="amount"
                                                                    value={
                                                                        form.amount
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
                                                        <td><div className='text-center'>X</div></td>
                                                        <td>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="semester"
                                                                    data_label="Semester"
                                                                    data={semesters}
                                                                    value={
                                                                        form.semester
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleFormChange(e, index, "semester")
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.semester
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
                                <div className='flex gap-1.5'>
                                    <div className="educare-create-school-settings-list-checka width-full">
                                        <Checkbox
                                            id="select_all_fee_type"
                                            name="select_all_fee_type"
                                            checked={
                                                data.copy_to_all
                                            }
                                            onChange={(e) =>
                                                setData('copy_to_all', e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="select_all_fee_type"
                                            value="Click to copy to all installment."
                                            className='cursor-pointer'
                                        />
                                    </div>
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
