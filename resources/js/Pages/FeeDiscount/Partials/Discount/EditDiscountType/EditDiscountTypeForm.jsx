import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

export default function EditDiscountTypeForm({ feeTypes = [], discounts = [], discount= {} }) {

    const [selectedFeeTypeIds, setSelectedFeeTypeIds] = useState(discount?.discount_fee_type_amounts?.map(item => item.fee_type_id));
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    const [formFields, setFormFields] = useState(feeTypes?.map(item => ({
            fee_type_id: item.id,
            title: item.fee_type,
            amount: (discount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount != null ? parseFloat(discount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) : discount?.discount_fee_type_amounts?.find(feeTypeAmount => feeTypeAmount.fee_type_id === item.id)?.amount) ?? null,
        })));

    const [feeTypeAmountArrayData, setFeeTypeAmountArrayData] = useState([]);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        title: discount?.title,
        description: discount?.description,
        is_discount_percentage: discount?.is_discount_percentage,
        amount: "",
        select_all_fee_type_id: "",
        fee_type_amount_array: feeTypeAmountArrayData,
        fee_type_ids: selectedFeeTypeIds,
    });

    useEffect(() => {
        setData('fee_type_amount_array', feeTypeAmountArrayData);
    }, [feeTypeAmountArrayData]);

    useEffect(() => {
        setData('fee_type_ids', selectedFeeTypeIds);
    }, [selectedFeeTypeIds]);

    useEffect(() => {
        setFeeTypeAmountArrayData(formFields.filter(item => selectedFeeTypeIds.includes(item.fee_type_id))?.map(item => ({
            fee_type_id: item.fee_type_id,
            amount: parseInt(item.amount),
        })));
    }, [selectedFeeTypeIds, formFields]);


    useEffect(() => {
        if (selectedFeeTypeIds?.length <= 0) {
            setSelectAllChecked(false)
        }
        else {
            setSelectAllChecked(selectedFeeTypeIds?.length === feeTypes?.length)
        }

    }, [feeTypes, selectedFeeTypeIds]);

    useEffect(() => {
        let value = data.amount;

        if (value > 100 && data.is_discount_percentage) {
            value = 100;
        }

        setData('amount', value)
    }, [data.amount, data.is_discount_percentage])

    //handle Checkbox start
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
    //handle Checkbox end

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        let value = event.target.value;

        if (field === 'amount' && data.is_discount_percentage) {
            value = value > 100 ? 100 : value;
        }

        updatedFields[index][field] = value;

        setFormFields(updatedFields);
    }


    const setSelectedFeeTypeId = (id) => {
        if ([...selectedFeeTypeIds]?.includes(id)) {
            setSelectedFeeTypeIds([...selectedFeeTypeIds].filter((item) => item !== id));
            console.log(selectedFeeTypeIds)
        }
        else {
            setSelectedFeeTypeIds([
                ...selectedFeeTypeIds,
                id,
            ]);
        }

        const updateSelectedFeeTypeIds = [...selectedFeeTypeIds];

        setData('fee_type_ids', updateSelectedFeeTypeIds);
    };


    const handleFormReset = () => {
        reset();

        setSelectedFeeTypeIds([]);

        setFormFields(feeTypes?.map(item => ({
            fee_type_id: item.id,
            title: item.fee_type,
            amount: null,
        })));

        setFeeTypeAmountArrayData([]);
    }


    const handleDiscountTypeChange = (e) => {
        if (e.target.checked) {
            if (data.amount > 100) {
                setData('amount', 100)
            }
        }

        setFormFields(formFields.map(item => {
            if (e.target.checked) {
                item.amount = item.amount > 100 ? 100 : item.amount;
            }

            return item;
        }));
    }


    const handleClickCopy = () => {
        setFormFields(formFields.map(item => {
            item.amount = data.amount;

            return item;
        }));
    }

    const upateDiscountData = (e) => {
        e.preventDefault();
        put(route("fee_discount.update", discount?.id), {
            preserveScroll: true,
            onSuccess: () => handleFormReset(),
            onError: (errors) => {
                let count = 0;

                for(let key in errors) {
                    if (key === 'fee_type_amount_array') {
                        toast.error('Please select at least one fee type.', {
                            position: 'top-right',
                            autoClose: 1500,
                        })
                    }

                    if (key.split('.')[2] === 'amount') {
                        count++;

                        toast.error('Discount amount is required.', {
                            position: 'top-right',
                            autoClose: 1500,
                        })
                    }

                    if (count >= 1) {
                        break;
                    }
                }
            }
        });
    };

    const handleDiscountDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('fee_discount.destroy', id));
            }
        });
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <form onSubmit={upateDiscountData}>
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Edit Discount Type
                                        </h5>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] mb-[20px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Title"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="title"
                                                        value={
                                                            data.title
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Description"
                                                    />
                                                    <TextareaInput
                                                        id="description"
                                                        value={
                                                            data.description
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="is_discount_percentage"
                                                            name="is_discount_percentage"
                                                            checked={
                                                                data.is_discount_percentage
                                                            }
                                                            onChange={(e) => {
                                                                setData(
                                                                    "is_discount_percentage",
                                                                    e.target.checked
                                                                )
                                                                handleDiscountTypeChange(e)
                                                            }

                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="is_discount_percentage"
                                                            value="Is Discount in percentage?"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 lg:col-span-12 xl:col-span-6 flex gap-5">
                                                <div className="educare-input-field-styles">
                                                    {
                                                        data.is_discount_percentage !== true ?
                                                            <>
                                                                <TextInput
                                                                    id="amount"
                                                                    value={
                                                                        data.amount
                                                                    }
                                                                    onChange={(e) => {
                                                                        setData("amount", e.target.value)
                                                                    }

                                                                    }
                                                                    className="block"
                                                                    placeHolder="Enter Amount"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.amount
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </>
                                                            :
                                                            <>
                                                                <TextInput
                                                                    value={
                                                                        data.amount
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "amount",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="Enter Percentage"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.amount
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </>
                                                    }
                                                </div>
                                                <SuccessButton
                                                    // disabled={processing}
                                                    className="educare-secondary-btn-md-fill"
                                                    type="button"
                                                    onClick={(e) => {
                                                        handleClickCopy();
                                                    }}
                                                >
                                                    Copy
                                                </SuccessButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*discount list start*/}
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name="select_all_fee_type_id"
                                                                checked={
                                                                    selectAllChecked
                                                                }
                                                                onChange={(e) =>
                                                                    handleCheckboxSelect(e.target.name, e.target.checked)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Fee Type</th>
                                                {
                                                    data.is_discount_percentage !== true ?
                                                        <th>Discount Amount</th>
                                                        : <th>Discount Percentage</th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formFields?.length > 0 ?
                                                formFields?.map((form, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="fee_type_id"
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
                                                                </div>
                                                            </td>
                                                            <td>{form?.title}</td>
                                                            <td>
                                                                <div className="educare-input-field-styles-px-8 max-w-[200px]">
                                                                    <div className="educare-input-field-styles">
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
                                                                        <InputError
                                                                            message={
                                                                                errors.discount_amount_one
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/*discount list end*/}
                            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                <PrimaryButton
                                    type="button"
                                    className="educare-gray-btn-lg-stroke"
                                    onClick={() => {
                                        handleFormReset()
                                    }}
                                >
                                    Reset
                                </PrimaryButton>
                                <PrimaryButton
                                    className="educare-primary-btn-lg-fill"
                                    type="submit"
                                >
                                    Save Discount
                                </PrimaryButton>
                            </div>
                        </ form>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Discounts
                                    <span>
                                        ({discounts?.length})
                                    </span>
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Discount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {discounts?.length > 0 ?
                                        discounts?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.title}</td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href={route('fee_discount.edit', item?.id)}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    as="button"
                                                                    onClick={(e) => {
                                                                        handleDiscountDelete(item?.id)
                                                                    }}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        )):
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="7"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
