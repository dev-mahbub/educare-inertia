import React, { useEffect } from "react";
import Modal from '@/Components/Modal';
import { Tooltip } from "@mui/material";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import { router, useForm, usePage } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

export default function SetupHostelTablePopup({
    className = '',
    listPopup,
    setListPopup,
    hostelStaffArr = [],
    teacherData = [],
    currentLavelId = '',
    hostelStaffDetails = [],
}) {

    const [formFields, setFormFields] = useState(hostelStaffDetails)

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        hostel_infra_level_id: currentLavelId,
        selected_teachers: hostelStaffDetails,
    });

    const handleFormChange = (event, index, field, selectedValue) => {
        const updatedFields = [...formFields];
        if (selectedValue) {
            updatedFields[index][field] = selectedValue;
        }
        else {
            updatedFields[index][field] = event.target.value;
        }
        setData(prevData => ({
            ...prevData,
            selected_teachers: updatedFields,
        }));
    }

    //add field
    const addFields = () => {
        setFormFields([...formFields,
        {
            joining_date_at: "",
            note: "",
            hostel_staff_role: "",
            staff_id: "",
        },
        ]);
    }
    //remove specific field
    const removeFields = (index) => {
        const remainingField = formFields.filter((field, i) => i !== index);
        setFormFields(remainingField)
        setData(prevData => ({
            ...prevData,
            selected_teachers: remainingField,
        }));
    }

    const closeModal = () => {
        setListPopup(false);
        reset();
        setFormFields([]);
    };

    const handleInsertData = (e) => {
        e.preventDefault();
        post(route("hostel.staff_save"), data, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
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
                router.delete(route('hostel.staff_destroy', id));
            }
        });
    }

    useEffect(() => {
        setFormFields(hostelStaffDetails);
    }, [hostelStaffDetails])

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={listPopup} onClose={closeModal} className="educare-xl-width-modal">
                    <form onSubmit={handleInsertData}>
                        <div className="p-[30px] pt-2.5">
                            <div className="educare-popup-form-wrapper mb-5 ">
                                <div className="educare-popup-form-header py-3 flex flex-wrap justify-between gap-4">
                                    <h5>Assign hostel Warden/Supervisor/Coordinator</h5>
                                    <PrimaryButton
                                        disabled={processing}
                                        className="educare-primary-btn-md-fill"
                                        onClick={addFields}
                                        type="button"
                                    >
                                        <i className="icon-PlusCircle mr-1"></i>
                                        Add Hostel Staff
                                    </PrimaryButton>
                                </div>
                                <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                    <div className="educare-admission-list-inner-wrapper">
                                        <div className="educare-admission-list bg-supportingA/10 pb-none">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Role</th>
                                                        <th>Staff</th>
                                                        <th>Date</th>
                                                        <th>Note</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {formFields?.length > 0 ?
                                                        formFields?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="educare-input-field-styles">
                                                                        <SelectInput
                                                                            data_label="Role"
                                                                            data={hostelStaffArr}
                                                                            value={item?.hostel_staff_role}
                                                                            onChange={(event, value) => handleFormChange(event, index, "hostel_staff_role", value)}
                                                                            className="block"
                                                                            required
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors.hostel_staff_role
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="educare-input-field-styles">
                                                                        <SelectInput
                                                                            data_label="Staff"
                                                                            data={teacherData}
                                                                            value={item?.staff_id}
                                                                            onChange={(event, value) => handleFormChange(event, index, "staff_id", value)}
                                                                            className={`block ${item?.id && 'disabled'}`}
                                                                            required
                                                                            disabled={item?.id}
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors.staff_id
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="educare-input-field-styles min-w-[130px] max-w-[150px]">
                                                                        <DatePicker
                                                                            selected={item?.joining_date_at && new Date(item?.joining_date_at)}
                                                                            showYearDropdown
                                                                            showMonthDropdown
                                                                            useShortMonthInDropdown
                                                                            showPopperArrow={false}
                                                                            peekNextMonth
                                                                            dropdownMode="select"
                                                                            isClearable
                                                                            dateFormat="dd/MM/yyyy"
                                                                            className="w-full"
                                                                            onChange={(date) => handleFormChange({ target: { value: date } }, index, "joining_date_at", date)}
                                                                            placeholderText="Issue date"
                                                                            required
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={item?.note}
                                                                                onChange={(event, value) => handleFormChange(event, index, "note", value)}
                                                                                className="block"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                        {item?.id ? <div>
                                                                            <Tooltip
                                                                                title="Delete"
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <button
                                                                                    type="button"
                                                                                    className="educare-danger-btn-sm-fill"
                                                                                    onClick={(e) => handleDelete(e, item?.id)}

                                                                                >
                                                                                    <i className="icon-TrashSimple"></i>
                                                                                </button>
                                                                            </Tooltip>
                                                                        </div> : <div>
                                                                            <Tooltip
                                                                                title="Remove"
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <button
                                                                                    type="button"
                                                                                    className="educare-danger-btn-sm-fill"
                                                                                    onClick={() => removeFields(index)}

                                                                                >
                                                                                    X
                                                                                </button>
                                                                            </Tooltip>
                                                                        </div>}
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
                            </div>

                            <div className="flex flex-wrap justify-end gap-2.5">
                                <PrimaryButton className="educare-gray-btn-md-stroke" disabled={processing} type="button" onClick={closeModal}>Close</PrimaryButton>
                                <PrimaryButton className="educare-primary-btn-md-fill" disabled={processing} type="submit">Assign Hostel Staff</PrimaryButton>
                            </div>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
