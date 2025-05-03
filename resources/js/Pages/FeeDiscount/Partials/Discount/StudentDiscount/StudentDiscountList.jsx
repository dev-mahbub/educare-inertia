import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentDiscountList({
    feeTypes = [],
    selectedDiscount,
    unpaidFees = [],
    selectedStudent,
    setSelectedStudent,
    setSelectedDiscount,
    setDiscountAddStatus
}) {

    const [selectedFeeTypeIds, setSelectedFeeTypeIds] = useState([]);
    const [selectedFeeIds, setSelectedFeeIds] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [selectAllFeeChecked, setSelectAllFeeChecked] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [discountType, setDiscountType] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [feeTypeAmountArrayData, setFeeTypeAmountArrayData] = useState([]);


    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        select_all_fee_id: "",
        student_id: studentId,
        discount_id: "",
        is_discount_percentage: discountType,
        fee_type_amount_array: feeTypeAmountArrayData,
        fee_type_ids: selectedFeeTypeIds,
        fee_ids: selectedFeeIds,
    });


    useEffect(() => {
        if (selectedStudent?.id != null) {
            setStudentId(selectedStudent?.id);
        }
        else {
            setStudentId(null)
        }
    }, [selectedStudent]);

    // useEffect(() => {
    //     setFormFields(feeTypes?.map(item => ({
    //         fee_type_id: item.id,
    //         title: item.fee_type,
    //         amount: (selectedDiscount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount != null ? parseFloat(selectedDiscount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) : selectedDiscount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) ?? null,
    //     })));
    // }, [feeTypes, selectedDiscount]);

    useEffect(() => {
        if (selectedDiscount?.id != null){
            setDiscountType(selectedDiscount?.is_discount_percentage == true ? true : false);
            setSelectedFeeTypeIds(selectedDiscount?.discount_fee_type_amounts?.map(item => item.fee_type_id));

            setFormFields(feeTypes?.map(item => ({
                fee_type_id: item.id,
                title: item.fee_type,
                amount: (selectedDiscount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount != null ? parseFloat(selectedDiscount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) : selectedDiscount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) ?? null,
            })));

            setData((prevData) => ({
                ...prevData,
                discount_id: selectedDiscount?.id,
            }));
        }
        else {
            setDiscountType(false);
            setSelectedFeeTypeIds([]);

            setFormFields(feeTypes?.map(item => ({
                fee_type_id: item.id,
                title: item.fee_type,
                amount: null,
            })));

            setData((prevData) => ({
                ...prevData,
                discount_id: "",
            }));
        }
    }, [feeTypes, selectedDiscount]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId,
            is_discount_percentage: discountType,
            fee_type_amount_array: feeTypeAmountArrayData,
            fee_type_ids: selectedFeeTypeIds,
            fee_ids: selectedFeeIds
        }));
    }, [studentId, discountType, feeTypeAmountArrayData, selectedFeeTypeIds, selectedFeeIds]);


    useEffect(() => {
        if (selectedFeeTypeIds?.length <= 0) {
            setSelectAllChecked(false)
        }
        else {
            setSelectAllChecked(selectedFeeTypeIds?.length === feeTypes?.length)
        }
    }, [feeTypes, selectedFeeTypeIds]);


    useEffect(() => {
        if (selectedFeeIds?.length <= 0) {
            setSelectAllFeeChecked(false)
        }
        else {
            setSelectAllFeeChecked(selectedFeeIds?.length === unpaidFees?.length)
        }
    }, [unpaidFees, selectedFeeIds]);


    useEffect(() => {
        setFeeTypeAmountArrayData(formFields.filter(item => selectedFeeTypeIds?.includes(item.fee_type_id))?.map(item => ({
            fee_type_id: item.fee_type_id,
            amount: item.amount != null ? parseFloat(item.amount) : null,
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

        if (name === "select_all_fee_id") {
            if (value === true) {
                setSelectedFeeIds(unpaidFees.map((item) => item.id))
            }
            else {
                setSelectedFeeIds([])
            }

            setSelectAllFeeChecked(value);
        }
    };
    //handle Checkbox end


    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        let value = event.target.value;

        if (field === 'amount' && discountType === true) {
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


    const setSelectedFeeId = (id) => {
        if ([...selectedFeeIds]?.includes(id)) {
            setSelectedFeeIds([...selectedFeeIds].filter((item) => item !== id));
        }
        else {
            setSelectedFeeIds([
                ...selectedFeeIds,
                id,
            ]);
        }

        const updateSelectedFeeIds = [...selectedFeeIds];

        setData('fee_ids', updateSelectedFeeIds);
    };


    const handleFormReset = () => {
        setSelectedFeeTypeIds([])
        setSelectedFeeIds([])
        setSelectedDiscount({})
        setSelectedStudent({})
    }


    const handleFeeDiscountData = (e) => {
        e.preventDefault();

        post(route('fee_discount.student.save'), {
            onSuccess: ({ props }) => {
                setDiscountAddStatus(true)
                handleFormReset();
            },
            onError: (errors) => {
                let count = 0;

                for (let key in errors) {
                    count++;
                    toast.error(errors[key], {
                        position: 'top-right',
                        autoClose: 1500,
                    })

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
            }
        })
    }



    return (
        <>
            <div className="educare-classroom-form-area">
                <form onSubmit={handleFeeDiscountData}>
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Check
                                                </th>
                                                <th>Fee Type</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {formFields?.length > 0 ?
                                                formFields?.map((form, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    name="fee_type_id"
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
                                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
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
                                                                        {selectedDiscount?.is_discount_percentage ? '%' : ''}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="select_all_fee_id"
                                                                name="select_all_fee_id"
                                                                checked={
                                                                    selectAllFeeChecked
                                                                }
                                                                onChange={(e) =>
                                                                    handleCheckboxSelect(e.target.name, e.target.checked)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="select_all_fee_id"
                                                            />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>All</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {unpaidFees?.length > 0 ?
                                                unpaidFees?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        id={`fee_id_${item?.id}`}
                                                                        name="fee_id"
                                                                        checked={
                                                                            selectedFeeIds?.includes(item?.id)
                                                                        }
                                                                        onChange={(e) => {
                                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                                            setSelectedFeeId(item?.id)
                                                                        }

                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <InputLabel
                                                                        htmlFor={`fee_id_${item?.id}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{item?.title}</td>
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
                            <div className="flex flex-wrap gap-2.5 mt-5 justify-end">
                                <Link
                                    href={route('fee_discount.student')}
                                    className="educare-gray-btn-lg-fill"
                                >
                                    Reset
                                </Link>
                                <PrimaryButton
                                    className="educare-primary-btn-lg-fill"
                                    type="submit"
                                >
                                    Save
                                </PrimaryButton>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
