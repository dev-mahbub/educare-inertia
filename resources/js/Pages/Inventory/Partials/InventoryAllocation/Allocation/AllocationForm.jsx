import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const AllocationForm = ({
    staffNames = [],
    products = [],
}) => {

    const [accountGroupSelect, setAccountGroupSelect] = useState(null);
    const [formFields, setFormFields] = useState([
        // {
        //     product_id: "",
        //     label: "",
        //     available_quantity: "",
        //     allocate_quantity: "",
        //     description: "",
        // },
    ]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        date_at: new Date(),
        staff_id: "",
        description: "",
        items: formFields,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            items: formFields
        }));
    }, [formFields]);

    const handleAccountGroupTitle = (event, value) => {
        if (value) {
            setData(prevData => ({
                ...prevData,
                staff_id: value.id
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                staff_id: ""
            }));
        }
        setAccountGroupSelect(value);
    };


    const handleFormChange = (event, index, field, selectedValue) => {
        const updatedFields = [...formFields];
        if (field == 'product') {
            updatedFields[index]['product_id'] = selectedValue?.id ?? null;
            updatedFields[index]['label'] = selectedValue?.label ?? '';
            updatedFields[index]['available_quantity'] = selectedValue?.available_quantity ?? null;
        } else {
            updatedFields[index][field] = field == 'allocate_quantity' && event.target.value > updatedFields[index]['available_quantity'] ? 0 : event.target.value;
        }

        setData((prevData) => ({
            ...prevData,
            items: updatedFields,
        }));
    }

    const addFields = () => {
        setFormFields([...formFields,
        {
            product_id: "",
            label: "",
            available_quantity: "",
            allocate_quantity: "",
            description: "",
        },
        ]);
    }

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];
        updatedFormFields.splice(index, 1);
        setFormFields(updatedFormFields);

        setData((prevData) => ({
            ...prevData,
            items: updatedFormFields,
        }));

    }
    //repeatable form fields end

    const handelReset = () => {
        setFormFields([
            // {
            //     product_id: "",
            //     label: "",
            //     available_quantity: "",
            //     allocate_quantity: "",
            //     description: "",
            // },
        ]);

        // Reset data state
        setData({
            date_at: "",
            staff_id: "",
            description: "",
            items: [],
        });

        setAccountGroupSelect(null);
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("product_staff_allocation.save"), {
            preserveScroll: true,
            onSuccess: () => {
                handelReset();
                reset();
            },
        });
    };

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="educare-common-card mb-10">
                    <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel value="Allocation Date" />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={data?.date_at && new Date(data?.date_at)}
                                            onChange={(date) => setData("date_at", date)}
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
                                            required
                                        />
                                        <InputError
                                            message={errors.date_at}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
                                    <div className="lg:col-span-6 maxMd:col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        value="Staff"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <div className="educare-input-type-file-styles">
                                                <Autocomplete
                                                    disablePortal
                                                    options={staffNames}
                                                    value={accountGroupSelect}
                                                    onChange={handleAccountGroupTitle}
                                                    required
                                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select staff' />}
                                                />
                                                <InputError
                                                    message={errors?.staff_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="description"
                                                    value="Description"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
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
                        </div>
                    </div>
                </div>
                <div className="educare-classroom-form-area mb-10">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className='educare-admission-filtar-bar-area z-[4] relative'>
                                    <div className="py-3 pt-0 educare-admission-filtar-bar">
                                        <div className="educare-admission-filtar-bar-filter justify-between">
                                            <div className="educare-card-title">
                                                <h5>
                                                    <i className="icon-ListBullets"></i>
                                                    Products
                                                </h5>
                                            </div>
                                            <div className="educare-admission-filtar-bar-filter-fields-wrap relative">
                                                <div className="educare-admission-filtar-bar-filter-fields">
                                                    <div className="educare-classroom-button-wrapper">
                                                        <div className="flex">
                                                            <PrimaryButton
                                                                type="button"
                                                                className="educare-dark-btn-md-fill"
                                                                onClick={addFields}
                                                            >
                                                                <i className="icon-PlusCircle"></i> Add product
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="educare-admission-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            Product
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Description</th>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            Available Qty
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            Allocate Qty
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formFields?.length > 0 ?
                                                formFields?.map((item, index) => (
                                                    <tr key={index} className="align-top">
                                                        <td>
                                                            <div className="educare-input-type-file-styles min-w-[300px] mb-2">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    options={products}
                                                                    value={item?.label}
                                                                    required
                                                                    onChange={(event, value) => handleFormChange(event, index, "product", value)}
                                                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select product' />}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`items.${index}.product_id`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-2">
                                                                <TextInput
                                                                    id="description"
                                                                    onChange={(event) => handleFormChange(event, index, "description")}
                                                                    value={item?.description}
                                                                    className="block"
                                                                    type="text"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`items.${index}.description`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-2">
                                                                <TextInput
                                                                    id="available_quantity"
                                                                    value={item.available_quantity ?? ''}
                                                                    className="block disabled"
                                                                    type="number"
                                                                    required={true}
                                                                    disabled={true}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`items.${index}.available_quantity`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-2">
                                                                <TextInput
                                                                    id="allocate_quantity"
                                                                    onChange={(event) => handleFormChange(event, index, "allocate_quantity")}
                                                                    value={item?.allocate_quantity}
                                                                    className="block"
                                                                    type="number"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`items.${index}.allocate_quantity`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='educare-list-action-btn mb-2'>
                                                                <Tooltip
                                                                    title="Remove"
                                                                    placement="top"
                                                                    arrow
                                                                    as="button"
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeFields(index)}
                                                                        className="educare-danger-btn-sm-fill"
                                                                    >
                                                                        X
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan="10">
                                                    <div className='flex flex-wrap justify-end pr-5'>
                                                        <PrimaryButton
                                                            className="educare-primary-btn-md-fill hidden mr-5"
                                                            type="submit"
                                                            disabled={processing}
                                                        >
                                                            Allocate product to staff
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            className="educare-gray-btn-md-stroke"
                                                            type="button"
                                                            onClick={handelReset}
                                                            disabled={processing}
                                                        >
                                                            Reset
                                                        </PrimaryButton>
                                                    </div>
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AllocationForm;
