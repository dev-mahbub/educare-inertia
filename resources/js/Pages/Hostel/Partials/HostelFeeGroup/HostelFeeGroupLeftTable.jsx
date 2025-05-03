import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
const HostelFeeGroupLeftTable = ({
    feeTypeData = [],
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        title: "",
        description: "",
        hostel_fee_types: "",
        total: 0,
    });

    const [formFields, setFormFields] = useState([
        {
            fee_type_id: "",
            amount: 0,
        },
    ]);

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = event.target.value;

        setFormFields(updatedFields);

        const total = updatedFields.reduce((sum, item) => {
            return sum + parseFloat(item.amount) || 0;
        }, 0);

        setData(prevData => ({
            ...prevData,
            hostel_fee_types: updatedFields,
            total: total,
        }));
    }

    const addFields = () => {
        setFormFields([...formFields,
        {
            fee_type_id: "",
            amount: 0,
        },
        ]);
    }

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];
        updatedFormFields.splice(index, 1);
        setFormFields(updatedFormFields);

        const total = updatedFormFields.reduce((sum, item) => {
            return sum + parseFloat(item.amount) || 0;
        }, 0);

        setData((prevData) => ({
            ...prevData,
            hostel_fee_types: updatedFormFields,
            total: total,
        }));

    }
    //repeatable form fields end

    const handelReset = (e) => {
        router.get(route('hostel.fee_group'));
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("hostel.fee_group_save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFormFields(
                    [
                        {
                            fee_type_id: "",
                            amount: 0,
                        },
                    ]
                )
            },
        });
    };

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="grid grid-cols-12 gap-5 bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="col-span-12">
                        <h5 className="text-[16px] text-headingLight font-primary font-semibold">
                            Hostel Fee Group
                        </h5>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel htmlFor="title" value="Title" />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <TextInput
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="block"
                                required
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <TextareaInput
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="block"
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                {/* repeatable table */}

                <div className="educare-classroom-table-wrapper">
                    <div className="flex justify-end gap-5 mb-2.5">
                        <button
                            type="button"
                            disabled={processing}
                            className="educare-secondary-btn-md-fill"
                            onClick={addFields}
                        >
                            <i className="icon-PlusCircle"></i>
                            Add Fee Type
                        </button>
                    </div>
                    <>
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    Fee Type
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    Amount
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                        </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formFields.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="educare-input-field-styles-px-8">
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            id="fee_type"
                                                            data_label="Fee Type"
                                                            data={feeTypeData}
                                                            value={row.fee_type}
                                                            onChange={(event) => handleFormChange(event, index, "fee_type_id")}
                                                            className="block"
                                                            required
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.hostel_fee_types &&
                                                                errors.hostel_fee_types[index] &&
                                                                errors.hostel_fee_types[index]
                                                                    .fee_type_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="educare-input-field-styles-px-8">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={row.amount}
                                                            onChange={(event) => handleFormChange(event, index, "amount")}
                                                            required
                                                            className="block"
                                                            type="number"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.hostel_fee_types &&
                                                                errors.hostel_fee_types[index] &&
                                                                errors.hostel_fee_types[index]
                                                                    .amount
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Remove"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-danger-btn-sm-fill"
                                                                onClick={() =>
                                                                    removeFields(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                X
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {
                                        formFields.length ?
                                            <tr>
                                                <th colSpan={2}>Total</th>
                                                <td>{Number(data?.total).toFixed(2)}</td>
                                            </tr>
                                            :
                                            ''
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="col-span-12 mt-5">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <button
                                    disabled={processing}
                                    type="button"
                                    onClick={(e) => handelReset(e)}
                                    className="educare-gray-btn-lg-stroke">
                                    Reset
                                </button>
                                <PrimaryButton
                                    disabled={processing}
                                    type="submit"
                                    className="educare-primary-btn-lg-fill">
                                    Save Free Group
                                </PrimaryButton>
                            </div>
                        </div>
                    </>
                </div>
            </form>
        </>
    );
};

export default HostelFeeGroupLeftTable;
