import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import infoIcon from "../../../../../../../resources/images/icon/info.png";

export default function EditFeePDCList({ classrooms = [], students = [], cheques = [], banks = [], cheque = {} }) {

    const [chequeDate, setChequeDate] = useState(new Date());

    const [formFields, setFormFields] = useState([
        {
            cheque_no: cheque.cheque_no,
            amount: parseInt(cheque.amount),
            bank_id: cheque.bank_id,
            branch: cheque.branch,
            cheque_date: chequeDate,
        },
    ])

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        // for input field
        // admission_no: "",
        // student_id: cheque.student_id,
        // classroom_id: "",
        cheque_array: formFields,
        // cheque_no: cheque.cheque_no,
        // cheque_date: cheque.cheque_date,
        // amount: cheque.amount,
        // bank_id: cheque.bank_id,
        // branch: cheque.branch,

    });


    useEffect(() => {
        setData('cheque_array', formFields);
    }, [formFields])


    useEffect(() => {
        setChequeDate(new Date(cheque?.cheque_date));
    }, [cheque]);


    //repeatable form fields start
    const [fieldCount, setFieldCount] = useState(1); // Initialize count to 1
    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        if (event.target.type === 'date') {
            updatedFields[index][field] = event.target.valueAsDate; // Use valueAsDate for the date field
        }
        else {
            updatedFields[index][field] = event.target.value;
        }
        setFormFields(updatedFields);

        setData(prevData => ({
            ...prevData,
            [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        }));
    }
    // const addFields = () => {
    //     setFormFields([...formFields,
    //     {
    //         cheque_no: "",
    //         amount: "",
    //         bank_id: "",
    //         branch: "",
    //         cheque_date: "",
    //     },
    //     ]);
    //     setFieldCount(prevCount => prevCount + 1); // Increase count
    // }
    // const removeFields = (index) => {
    //     let updatedFormFields = [...formFields];
    //     updatedFormFields.splice(index, 1);
    //     setFormFields(updatedFormFields);
    //     setFieldCount(prevCount => prevCount - 1); // Decrease count
    // }
    //repeatable form fields end



    const handleChequeFormDataUpdate = (e) => {
        e.preventDefault();

        put(route("cheque.pdc.update", cheque?.id), data, {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // console.log(errors);
            },
        });
    };


    const handleChequeDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('cheque.pdc.delete', id));
            }
        });
    };


    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-6">
                <div className="educare-design-survey-area">
                    <form onSubmit={handleChequeFormDataUpdate}>
                        <div className="grid grid-cols-12 sm:gap-[20px]">
                            <div className="col-span-12">
                                <div className="educare-create-school-details">
                                    <div className="educare-create-school-details-form-wrap">
                                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                            <div className="educare-school-form-action-title">
                                                <h5><img src={infoIcon} alt="" />Update Cheque</h5>
                                            </div>
                                            {/* <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={
                                                                data.admission_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "admission_no",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                            placeHolder="Admissoin No"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.admission_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="Class"
                                                            data={classrooms}
                                                            value={
                                                                data.classroom_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "classroom_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.classroom_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            data_label="Student"
                                                            data={students}
                                                            value={
                                                                data.student_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "student_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.student_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="educare-survey-timeline-area mt-[30px]">
                                                <div className="educare-survey-timeline-question">
                                                    <div className="grid grid-cols-12 gap-5">
                                                        {/* <div className="col-span-12 md:col-span-6">
                                                            <div className="educare-add-question-counter flex h-full items-center justify-start">
                                                                <Tooltip
                                                                    title="Cheque Added"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button type="button" className="educare-secondary-btn-md-fill">{fieldCount}</button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="educare-add-question-counter flex h-full items-center justify-end">
                                                                <button
                                                                    type="button"
                                                                    className="educare-success-btn-md-fill transition ease-in-out duration-150 bg-success"
                                                                    onClick={addFields}
                                                                >
                                                                    <i className="icon-PlusCircle"></i> Add Another Cheque
                                                                </button>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>


                                                <div className={`educare-survey-timeline-wrapper font-primary ${fieldCount === 0 ? 'mt-0' : 'mt-[30px]'}`}>
                                                    {formFields.map((form, index) => (
                                                        <div className="educare-survey-timeline-entry" key={index}>
                                                            {/* <div className="timeline-icon bg-success">
                                                                <span className="count">{index + 1}</span>
                                                            </div> */}
                                                            <div className="educare-survey-timeline-item mb-5">
                                                                <div className="educare-survey-input-timeline-box bg-supportingA/5 px-5 py-5">
                                                                    {/* <div className="z-[1] survey-timeline-close-btn">
                                                                        <button
                                                                            type="button"
                                                                            className="educare-danger-btn-xs-fill cursor-pointer transition ease-in-out rounded duration-150 bg-danger/80"
                                                                            onClick={() => removeFields(index)}
                                                                        >
                                                                            <i className='icon-MinusCircle'></i>Close
                                                                        </button>
                                                                    </div> */}
                                                                    <div className="grid grid-cols-12 gap-5 pt-5">
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    name="cheque_no"
                                                                                    onChange={(event) => handleFormChange(event, index, "cheque_no")}
                                                                                    value={form.cheque_no}
                                                                                    className="block"
                                                                                    placeHolder="ChequeNo"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors[`cheque_array.${index}.cheque_no`]
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <div className="educare-input-field-styles">
                                                                                    <DatePicker
                                                                                        selected={formFields[index].cheque_date}
                                                                                        name="cheque_date"
                                                                                        onChange={(date) => handleFormChange({ target: { value: date } }, index, 'cheque_date')}
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
                                                                                    />
                                                                                    <InputError
                                                                                        message={
                                                                                            errors[`cheque_array.${index}.cheque_date`]
                                                                                        }
                                                                                        className="mt-2"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    name="amount"
                                                                                    onChange={(event) => handleFormChange(event, index, "amount")}
                                                                                    value={form.amount}
                                                                                    className="block"
                                                                                    placeHolder="Amount"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors[`cheque_array.${index}.amount`]
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <SelectInput
                                                                                    data_label="Bank Name"
                                                                                    data={banks}
                                                                                    onChange={(event) => handleFormChange(event, index, "bank_id")}
                                                                                    value={form.bank_id}
                                                                                    className="block"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors[`cheque_array.${index}.bank_id`]
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-12">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    name="branch"
                                                                                    onChange={(event) => handleFormChange(event, index, "branch")}
                                                                                    value={form.branch}
                                                                                    className="block"
                                                                                    placeHolder="Branch"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors[`cheque_array.${index}.branch`]
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {/* {fieldCount === 0 ?
                                                        '' :
                                                        <div className="educare-survey-timeline-add inline-block">
                                                            <SuccessButton
                                                                disabled={processing}
                                                                className="timeline-icon border bg-white text-heading hover:bg-success hover:text-white"
                                                            >
                                                                <i className='icon-PlusCircle'></i>
                                                            </SuccessButton>
                                                        </div>
                                                    } */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* school details form start */}
                                </div>
                            </div>
                        </div>
                        <div className="educare-button-field-styles mt-2.5 text-end">
                            <div className="educare-classroom-button-wrapper">
                                <div className="flex justify-end gap-[15px]">
                                    <Link
                                        href={route("cheque.pdc")}
                                        className="educare-gray-btn-lg-stroke"
                                    > Cancel
                                    </Link>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Cancel</p>
                                    </Transition>
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="submit"
                                    >
                                        Save
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Save</p>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-span-12 md:col-span-6">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Cheque's List
                            <span>
                                (Total : {cheques?.length})
                            </span>
                        </h5>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Bank Name</th>
                                    <th>Branch</th>
                                    <th>Cheque No</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {cheques?.length > 0 ? (
                                    cheques?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.bank?.name}</td>
                                            <td>{item?.branch}</td>
                                            <td>{item?.cheque_no}</td>
                                            <td>{item?.cheque_date}</td>
                                            <td>
                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                    <div>
                                                        <Tooltip
                                                            title="Edit"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <Link
                                                                href={route(
                                                                    "cheque.pdc.edit",
                                                                    item?.id
                                                                )}
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
                                                                className="educare-danger-btn-sm-fill"
                                                                onClick={() =>
                                                                    handleChequeDelete(
                                                                        item?.id
                                                                    )
                                                                }
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="text-center text-red-500"
                                            colSpan="7"
                                        >
                                            Data not found
                                        </td>
                                    </tr>
                                )}




                                {/* <tr>
                                    <td>2</td>
                                    <td>Asia Bank</td>
                                    <td>Asia</td>
                                    <td>43566</td>
                                    <td>April 17</td>
                                    <td>
                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <Link
                                                        href="#"
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
                                                    <Link
                                                        href="#"
                                                        className="educare-danger-btn-sm-fill"
                                                        as="button"
                                                    >
                                                        <i className="icon-TrashSimple"></i>
                                                    </Link>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    );
}
