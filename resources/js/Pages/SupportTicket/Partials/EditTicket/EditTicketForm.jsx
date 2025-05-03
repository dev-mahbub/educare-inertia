import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import SelectInput from "@/Components/SelectInput";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

export default function EditTicketForm({ supportTicket, teachers, status, requestTypeTickets}) {

    const { data, setData, errors, post, reset, processing } = useForm({
        solution_note: supportTicket?.solution_note,
        assigned_to: supportTicket?.assigned_to?.id,
        solution_status: supportTicket?.solution_status,
        follow_up_date: "",
    });

    let supportTickets = requestTypeTickets ?? [];

    const handleEditTicketData = (e) => {
        e.preventDefault();

        data['_method'] = 'put';

        post(route("support_ticket.update", { id: supportTicket.id }), {
            preserveScroll: true
        });
    };

    teachers = teachers.map((teacher) => ({
        id: teacher?.id,
        title: `${teacher?.first_name} ${teacher?.middle_name} ${teacher?.last_name}`,
    }));

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Update Support Ticket
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleEditTicketData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="request_type"
                                                                value="Request Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="request_type"
                                                        disabled
                                                        value={
                                                            supportTicket?.request_type
                                                        }
                                                        className="block cursor-not-allowed"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.request_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="student_name"
                                                                value="Student Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="student_name"
                                                        disabled
                                                        value={
                                                            `${supportTicket?.student?.first_name ?? ''} ${supportTicket?.student?.last_name ?? ''}`
                                                        }
                                                        className="block cursor-not-allowed"
                                                        placeHolder="student"
                                                    />
                                                    <InputError
                                                        message={errors.title}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="class"
                                                                value="Class"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="class"
                                                        disabled
                                                        value={
                                                            `${supportTicket?.classroom?.title ?? ''}`
                                                        }

                                                        className="block cursor-not-allowed"
                                                    />
                                                    <InputError
                                                        message={errors.title}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="father_name"
                                                                value="Father Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="father_name"
                                                        disabled
                                                        value={
                                                            `${supportTicket?.student?.father?.first_name ?? ''} ${supportTicket?.student?.father?.middle_name ?? ''} ${supportTicket?.student?.father?.last_name ?? ''}`
                                                        }
                                                        className="block cursor-not-allowed"
                                                        placeHolder="student"
                                                    />
                                                    <InputError
                                                        message={errors.title}
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
                                                        disabled
                                                        value={`${supportTicket?.details ?? ''}`}
                                                        className="block cursor-not-allowed"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6 lg:col-span-6 sm:col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="assigned_to"
                                                                value="Assign to"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="assigned_to"
                                                        data_label="Staff"
                                                        data={teachers}
                                                        value={data.assigned_to}
                                                        onChange={(e) =>
                                                            setData("assigned_to", e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.assigned_to}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6 lg:col-span-6 sm:col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="status"
                                                                value="Status"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="status"
                                                        data_label="Status"
                                                        data={status}
                                                        value={data.solution_status}
                                                        onChange={(e) =>
                                                            setData("solution_status", e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.solution_status}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6 xl:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="follow_up_date"
                                                        value="Follow Up Date"
                                                    />
                                                    <DatePicker
                                                        selected={
                                                            data?.follow_up_date
                                                                ? new Date(
                                                                    data?.follow_up_date
                                                                )
                                                                : new Date()
                                                        }
                                                        onChange={(date) =>
                                                            setData("follow_up_date", date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="End date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="solution_note"
                                                        value="Solution Note"
                                                    />
                                                    <TextareaInput
                                                        id="solution_note"
                                                        value={data.solution_note}
                                                        onChange={(e) =>
                                                            setData('solution_note', e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.solution_note
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        type="submit"
                                                        className="educare-primary-btn-lg-fill"
                                                    >
                                                        Save
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        type="button"
                                                        className="educare-gray-btn-lg-stroke"
                                                        onClick={() => reset()}
                                                    >
                                                        Reset
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-12 xl:col-span-6  col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Parent Support Ticket List
                                    <span>(Total :  Ticket List, {supportTickets?.length})</span>
                                </h5>
                            </div>
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="educare-admission-list-inner-wrapper">
                                        <div className="educare-admission-list pb-none">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Req. Type</th>
                                                        <th>Student Details</th>
                                                        <th>Father</th>
                                                        <th>Assign to</th>
                                                        <th>Solution Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {supportTickets?.length > 0 && supportTickets.map((ticket, index) => (
                                                        <tr key={index}>
                                                            <td>{ticket?.request_type}</td>
                                                            <td>
                                                                <div>
                                                                    <p>
                                                                        <span className="font-semibold mr-1">
                                                                            Name:
                                                                        </span>
                                                                        {ticket.student_name ?
                                                                            ticket.student_name :
                                                                            (ticket.student?.first_name || ticket.student?.last_name ?
                                                                                `${ticket.student?.first_name ?? ''} ${ticket.student?.last_name ?? ''}` :
                                                                                ''
                                                                            )
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-semibold mr-1">
                                                                            Class:
                                                                        </span>
                                                                        {ticket?.classroom?.title}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {ticket.parent_name ?
                                                                    ticket.parent_name :
                                                                    (ticket.student?.father?.first_name || ticket.student?.father?.middle_name || ticket.student?.father?.last_name ?
                                                                        `${ticket.student?.father?.first_name ?? ''} ${ticket.student?.father?.middle_name ?? ''} ${ticket.student?.father?.last_name ?? ''}` :
                                                                        ''
                                                                    )
                                                                }
                                                            </td>
                                                            <td>
                                                                {`${ticket?.assigned_to?.first_name ?? ''}
                                                                    ${ticket?.assigned_to?.middle_name ?? ''} 
                                                                    ${ticket?.assigned_to?.last_name ?? ''}`}
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${ticket?.solution_status === 'Pending' ? 'warning' : 'success'}`}>
                                                                    {ticket?.solution_status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Edit"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <Link
                                                                                href={route('support_ticket.edit', { id: ticket.id })}
                                                                                className="educare-warning-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
