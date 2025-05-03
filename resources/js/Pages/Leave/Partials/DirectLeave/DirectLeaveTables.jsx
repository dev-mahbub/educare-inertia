import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';

const DirectLeaveTables = ({
    staffs,
    leaves,
    leaveTypes,
    leaveShifts,
    dayTypes,
    staffLeaveAllocations,
    staff
}) => {

    const [selectedStaff, setSelectedStaff] = useState({});
    const [leaveDays, setLeaveDays] = useState([]);
    const [totalLeave, setTotalLeave] = useState(0);
    const [formMode, setFormMode] = useState('create');
    const [selectedLeave, setSelectedLeave] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        employee_id: "",
        staff_id: selectedStaff?.id ?? "",
        leave_type_id: "",
        format_no: "",
        start_date: "",
        end_date: "",
        leave_reason: "",
        leave_days: [],
    });

    useEffect(() => {
        setSelectedStaff(staff ?? {});
    }, [staff]);

    useEffect(() => {
        setLeaveDays([]);
        reset();

        if (selectedStaff?.id != null) {
            setData((prevData) => ({
                ...prevData,
                employee_id: selectedStaff?.employee_id ?? '',
                staff_id: selectedStaff?.id ?? ''
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                staff_id: ''
            }));
        }
    }, [selectedStaff]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: selectedLeave?.start_date_at ? new Date(selectedLeave?.start_date_at) : "",
            end_date: selectedLeave?.end_date_at ? new Date(selectedLeave?.end_date_at) : "",
            leave_type_id: selectedLeave?.leave_type_id ?? "",
            leave_reason: selectedLeave?.leave_reason ?? "",
            format_no: selectedLeave?.format_no ?? "",
        }));
    }, [selectedLeave]);

    useEffect(() => {
        let leave_days = [];

        if (data?.start_date && data?.end_date) {
            const start_date = new Date(data?.start_date);
            const end_date = new Date(data?.end_date);
            let date = new Date(data?.start_date);
            let count = 0;

            while (start_date <= end_date) {
                let dayOfWeek = start_date.toLocaleString('default', { weekday: 'long' });
                let day = start_date.getDate();
                let month = start_date.toLocaleString('default', { month: 'short' });
                let year = start_date.getFullYear();

                // Add the formatted date to the array
                leave_days.push({
                    date: date,
                    formatted_date: `${day}-${month}-${year}`,
                    day: dayOfWeek,
                    day_type: 'Full Day',
                    shift: '',
                });

                // Increment the date by one day
                date = new Date(date?.setDate(data?.start_date?.getDate() + count));
                start_date.setDate(start_date.getDate() + 1);

                count++;
            }
        }

        setLeaveDays(leave_days);
    }, [data.start_date, data.end_date]);

    useEffect(() => {
        const total_leave = leaveDays?.reduce((total, item) => item?.day_type == 'Half Day' ? total + 0.5 : total + 1, 0);

        setTotalLeave(total_leave);

        setData((prevData) => ({
            ...prevData,
            leave_days: leaveDays
        }));
    }, [leaveDays]);

    // handle employee id change start
    const handleEmployeeIdChange = (e) => {
        const employee_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            employee_id: employee_id
        }));
    }

    const handleEmployeeIdKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            setFormMode('create');
            setSelectedLeave({});

            const form_data = {
                employee_id: data?.employee_id,
            }

            router.post(route('leave.direct'), form_data);
        }
    }
    // handle employee id change end

    // handle change staff start
    const handleChangeStaff = (e) => {
        const staff_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            employee_id: '',
            staff_id: staff_id
        }));

        setFormMode('create');
        setSelectedLeave({});

        const form_data = {
            staff_id: staff_id,
        }

        router.post(route('leave.direct'), form_data);
    }
    // handle change staff end

    // handle change leave days data start
    const handleChangeLeaveDaysData = (index, field, value) => {
        const updatedData = [...leaveDays];

        updatedData[index][field] = value;

        if (field == 'day_type' && value == 'Full Day') {
            updatedData[index]['shift'] = '';
        } else if (field == 'day_type' && value == 'Half Day') {
            updatedData[index]['shift'] = '1st Half';
        }

        setLeaveDays(updatedData);
    }
    // handle change leave days data end

    // handle save direct leave start
    const handleSaveDirectLeave = (e) => {
        e.preventDefault();

        post(route('leave.direct.save'), {
            onSuccess: () => {
                handleFilterData();
            },
            onError: () => {
                handleFilterData();
            }
        });
    }
    // handle save direct leave end

    // handle filter data start
    const handleFilterData = () => {
        setFormMode('create');
        setSelectedLeave({});

        const form_data = {
            staff_id: data?.staff_id,
        }

        router.post(route('leave.direct'), form_data);
    }
    // handle filter data end

    // handle edit leave start
    const handleEditLeave = (id) => {
        const selected_leave = leaves?.find((item) => item?.id == id);

        setSelectedLeave(selected_leave ?? {});

        if(selected_leave?.id != null) {
            setFormMode('edit');
        }
    }
    // handle edit leave end

    // handle update leave request start
    const handleUpdateLeaveRequest = (e) => {
        e.preventDefault();

        put(route('leave.direct.update', selectedLeave?.id), {
            onSuccess: () => {
                handleFilterData();
            },
            onError: () => {
                handleFilterData();
            }
        });
    }
    // handle update leave request end

    // handle cancel leave request start
    const handleCancelLeaveRequest = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(route('leave.cancel_request', id), {}, {
                    onSuccess: () => {
                        setFormMode('create');
                        setSelectedLeave({});
                        handleFilterData();
                    }
                });
            }
        });
    }
    // handle cancel leave request end

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    {/* left table */}
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="employee_id"
                                            value="Search Emp. Id"
                                        />
                                        <TextInput
                                            id="employee_id"
                                            value={data.employee_id}
                                            onChange={(e) =>
                                                handleEmployeeIdChange(e)
                                            }
                                            onKeyPress={(e) => {
                                                handleEmployeeIdKeyPress(e)
                                            }}
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.employee_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="staff_id"
                                            value="Staff"
                                        />
                                        <SelectInput
                                            id="staff_id"
                                            data_label="Staff"
                                            data={staffs}
                                            value={data.staff_id}
                                            onChange={(e) =>
                                                handleChangeStaff(e)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.staff_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="designation"
                                            value="Designation"
                                        />
                                        <TextInput
                                            id="designation"
                                            value={selectedStaff?.designation?.name ?? ''}
                                            placeHolder=""
                                            disabled={true}
                                            className={`block ${"disabled"}`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-5 mt-2.5">
                                <div className="col-span-12">
                                    <InputLabel value="Leave Incurred" />
                                </div>
                                {staffLeaveAllocations?.length > 0 &&
                                    staffLeaveAllocations?.map((item, index) => (
                                        <div key={index} className="col-span-12 md:col-span-3">
                                            <div className="flex items-center justify-between badge bg-info">
                                                <span>{item?.leave_type?.acronym}</span>
                                                <span>{item?.consumed_days}/{item?.days}</span>
                                            </div>
                                        </div>
                                    ))
                                }

                                <div className="col-span-12 md:col-span-3">
                                    <div className="flex items-center justify-between badge bg-info">
                                        <span>Leave Taken</span>
                                        <span>{totalLeave}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-5 mt-5">
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="leave_type_id"
                                            data_label="Level Type"
                                            data={leaveTypes}
                                            value={data.leave_type_id}
                                            onChange={(e) =>
                                                setData(
                                                    "leave_type_id",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.leave_type_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="format_no"
                                            value={data.format_no}
                                            placeHolder="Format No"
                                            onChange={(e) =>
                                                setData(
                                                    "format_no",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.format_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel value="Leave From (Select Date)" />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <DatePicker
                                            selected={
                                                data.start_date &&
                                                new Date(data.start_date)
                                            }
                                            onChange={(date) =>
                                                setData("start_date", date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Start date"
                                            className="w-full"
                                        />
                                        <InputError
                                            message={errors.start_date}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel value="Leave To (Select Date)" />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <DatePicker
                                            selected={
                                                data.end_date &&
                                                new Date(data.end_date)
                                            }
                                            onChange={(date) =>
                                                setData("end_date", date)
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
                                        <InputError
                                            message={errors.end_date}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <TextareaInput
                                            id="leave_reason"
                                            value={data.leave_reason}
                                            placeholder="Leave Reason"
                                            onChange={(e) =>
                                                setData(
                                                    "leave_reason",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.leave_reason}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 mt-5">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <Link
                                        href={route('leave.direct')}
                                        className=" educare-gray-btn-lg-stroke"
                                    >
                                        Reset
                                    </Link>

                                    {formMode == 'create' &&
                                        <PrimaryButton
                                            className="educare-primary-btn-lg-fill"
                                            type="button"
                                            onClick={handleSaveDirectLeave}
                                        >
                                            Apply
                                        </PrimaryButton>
                                    }

                                    {(formMode == 'edit' && selectedLeave?.is_cancelled == false) &&
                                        <>
                                            <PrimaryButton
                                                className="educare-primary-btn-lg-fill"
                                                type="button"
                                                onClick={handleUpdateLeaveRequest}
                                            >
                                                Update
                                            </PrimaryButton>
                                            <PrimaryButton
                                                className="educare-danger-btn-lg-fill"
                                                type="button"
                                                onClick={() => {
                                                    handleCancelLeaveRequest(selectedLeave?.id)
                                                }}
                                            >
                                                Cancel
                                            </PrimaryButton>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    {/* right table */}
                    {/* first table */}

                    <div className="mb-2.5 pb-none">
                        <div className="educare-card-title mr-auto pb-none mb-2.5">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Request/Log Leave
                            </h5>
                        </div>
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list pb-none">
                                <table>
                                    <tbody>
                                        {leaves?.length > 0 &&
                                            leaves.map((item, index) => (
                                                <tr key={index} className={selectedLeave?.id == item?.id ? 'bg-success' : ''}>
                                                    <td>
                                                        <span className="badge info">
                                                            {item?.leave_type}
                                                        </span>
                                                    </td>
                                                    <td>{item?.start_date}</td>
                                                    <td>{`${item?.end_date} ${item?.no_of_days > 0 ? '(' + item?.no_of_days + ')' : ''} `}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className={`badge ${item?.is_cancelled ? 'danger' : (item?.is_approved ? 'success' : 'warning')}`}
                                                        >
                                                            {item?.is_cancelled ? 'Cancelled' : (item?.is_approved ? 'Approved' : 'Pending')}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="educare-warning-btn-sm-fill"
                                                                        onClick={() => {
                                                                            handleEditLeave(item?.id)
                                                                        }}
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-card-title mr-auto pb-none mb-2.5">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Select Leave Days
                            </h5>
                        </div>
                        {leaveDays?.length > 0 ?
                            leaveDays?.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-5 mb-2">
                                    <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="start_leave"
                                                value={item?.formatted_date}
                                                placeHolder="11-Jan-2024"
                                                disabled={true}
                                                className={`block ${data.start_leave
                                                        ? "enabled"
                                                        : "disabled"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-6 sm:col-span-6 md:col-span-2 lg:col-span-2">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="leave_day"
                                                value={item?.day}
                                                placeHolder="Thursday"
                                                disabled={true}
                                                className={`block ${data.leave_day
                                                        ? "enabled"
                                                        : "disabled"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="day_type"
                                                data_label="Day Type"
                                                data={dayTypes}
                                                value={item?.day_type}
                                                onChange={(e) =>
                                                    handleChangeLeaveDaysData(index, 'day_type', e.target.value)
                                                }
                                                className="block"
                                            />
                                        </div>
                                    </div>
                                    {item?.day_type == 'Half Day' &&
                                        <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="shift"
                                                    data_label="Shift"
                                                    data={leaveShifts}
                                                    value={item?.shift}
                                                    onChange={(e) =>
                                                        handleChangeLeaveDaysData(index, 'shift', e.target.value)
                                                    }
                                                    className="block"
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))
                            :
                            <div>
                                <p className="text-danger">Please select date first</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default DirectLeaveTables;
