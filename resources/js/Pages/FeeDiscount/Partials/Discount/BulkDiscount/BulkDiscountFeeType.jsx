import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function BulkDiscountFeeType({ feeTypes = [], selectedDiscount = {}, sendFeeTypeAmountArrayToParent }) {

    const [selectedFeeTypeIds, setSelectedFeeTypeIds] = useState([]);
    const [formFields, setFormFields] = useState([]);
    const [discountType, setDiscountType] = useState(false);
    const [feeTypeAmountArrayData, setFeeTypeAmountArrayData] = useState([]);
    const [selectAllFeeTypeChecked, setSelectAllFeeTypeChecked] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        fee_check_one: "",
        fee_check_two: "",
        fee_value_one: "",
        fee_value_two: "",
        fee_type_ids: selectedFeeTypeIds,

    });

    useEffect(() => {
        setSelectedFeeTypeIds(selectedDiscount?.discount_fee_type_amounts?.map(item => item.fee_type_id));
    }, [selectedDiscount]);


    useEffect(() => {
        setFormFields(feeTypes?.map(item => ({
            fee_type_id: item.id,
            title: item.fee_type,
            amount: (selectedDiscount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount != null ? parseFloat(selectedDiscount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) : selectedDiscount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) ?? null,
        })));
    }, [feeTypes, selectedDiscount]);

    useEffect(() => {
        setDiscountType(selectedDiscount?.is_discount_percentage && selectedDiscount?.is_discount_percentage == true ? true : false);
    }, [selectedDiscount]);

    useEffect(() => {
        setFeeTypeAmountArrayData(formFields.filter(item => selectedFeeTypeIds?.includes(item.fee_type_id))?.map(item => ({
            fee_type_id: item.fee_type_id,
            amount: item.amount != null ? parseFloat(item.amount) : null,
        })));
    }, [selectedFeeTypeIds, formFields]);

    useEffect(() => {
        if (selectedFeeTypeIds?.length <= 0) {
            setSelectAllFeeTypeChecked(false)
        }
        else {
            setSelectAllFeeTypeChecked(selectedFeeTypeIds?.length === feeTypes?.length)
        }

    }, [feeTypes, selectedFeeTypeIds]);

    useEffect(() => {
        sendFeeTypeAmountArrayToParent(feeTypeAmountArrayData);
    }, [feeTypeAmountArrayData]);


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


    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_fee_type_id") {
            if (value === true) {
                setSelectedFeeTypeIds(feeTypes.map((item) => item.id))
            }
            else {
                setSelectedFeeTypeIds([])
            }

            setSelectAllFeeTypeChecked(value);
        }
    };

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        let value = event.target.value;

        if (field === 'amount' && discountType === true) {
            value = value > 100 ? 100 : value;
        }

        updatedFields[index][field] = value;

        setFormFields(updatedFields);
    }


    return (
        <>
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
                                                <div className="educare-input-field-styles  flex items-center">
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
        </>
    );
}
