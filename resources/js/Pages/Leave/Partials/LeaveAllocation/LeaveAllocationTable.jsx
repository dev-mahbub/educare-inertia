import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const LeaveAllocationTable = ({
    staffLeaveAllocations,
    leaveTypes
}) => {

    const [leaveTypeData, setLeaveTypeData] = useState([]);
    const [formFields, setFormFields] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        staff_leave_allocations: []
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            staff_leave_allocations: formFields?.map((item) => ({
                staff_id: item?.staff_id,
                leave_allocations: item?.leave_allocations?.map(item => ({
                    leave_type_id: item?.leave_type_id,
                    days: item?.days
                }))
            }))
        }));
    }, [formFields]);

    useEffect(() => {
        setLeaveTypeData(leaveTypes?.map((item) => ({
            ...item,
            days: null
        })));
    }, [leaveTypes]);

    useEffect(() => {
        setFormFields(staffLeaveAllocations);
    }, [staffLeaveAllocations]);

    // handle change leave type value start
    const handleChangeLeaveTypeValue = (id, value) => {
        const days  = isNaN(value) ? '' : value;

        const updatedData = leaveTypeData?.map(item => ({
            ...item,
            days: id == item?.id ? days : item?.days
        }));

        setLeaveTypeData(updatedData);
    }
    // handle change leave type value end

    // handle change form data start
    const handleChangeFormData = (index, leaveTypeId, value) => {
        const days  = isNaN(value) ? '' : value;

        const updatedFormFields = [...formFields];

        const updatedLeaveAllocation = updatedFormFields[index]?.leave_allocations?.map(item => ({
            ...item,
            days: item?.leave_type_id == leaveTypeId ? days : item?.days
        }));

        updatedFormFields[index]['leave_allocations'] = updatedLeaveAllocation;

        setFormFields(updatedFormFields);
    }
    // handle change form data end

    // handle copy start
    const handleCopy = (leaveTypeId) => {
        const days = leaveTypeData?.find(item => item?.id == leaveTypeId)?.days;

        const updatedFormFields = formFields?.map(item => ({
            ...item,
            leave_allocations: item?.leave_allocations?.map(allocation => ({
                ...allocation,
                days: allocation?.leave_type_id == leaveTypeId ? days : allocation?.days
            }))
        }));

        setFormFields(updatedFormFields);
    }
    // handle copy end

    // handle save leave allocation start
    const handleSaveLeaveAllocation = (e, staffId) => {
        e.preventDefault();

        const form_data = data?.staff_leave_allocations?.find(item => item?.staff_id == staffId);

        router.post(route('leave.save_allocation'), form_data, {
            onSuccess: () => {
                setLeaveTypeData(leaveTypes?.map((item) => ({
                    ...item,
                    days: null
                })));

                reset();
            }
        });
    }
    // handle save leave allocation end

    // handle save bulk leave allocation start
    const handleSaveBulkLeaveAllocation = (e) => {
        e.preventDefault();

        post(route('leave.save_bulk_allocation'), {
            onSuccess: () => {
                setLeaveTypeData(leaveTypes?.map((item) => ({
                    ...item,
                    days: null
                })));

                reset();
            }
        })
    }
    // handle save bulk leave allocation end


    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Emp Id</th>
                                <th>Staff</th>
                                <th>Designation</th>
                                {leaveTypeData?.length > 0 &&
                                    leaveTypeData.map((item, index) => (
                                        <th key={index}>
                                            {item?.acronym}
                                            <div className="flex items-center copy-input-value-style">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="pl"
                                                        value={item?.days}
                                                        onChange={(e) =>
                                                            handleChangeLeaveTypeValue(item?.id, e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.pl}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => {
                                                            handleCopy(item?.id)
                                                        }}
                                                    >
                                                        C
                                                    </button>
                                                </div>
                                            </div>
                                        </th>
                                    ))
                                }
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formFields?.length > 0 &&
                                formFields.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.employee_id} </td>
                                        <td>{item?.staff_name}</td>
                                        <td>{item?.staff_designation}</td>
                                        {leaveTypeData?.length > 0 &&
                                            leaveTypeData.map((leaveType, leaveTypeIndex) => (
                                                <td key={leaveTypeIndex}>
                                                    <div className="flex items-center">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                id={leaveType?.leave_type}
                                                                value={item?.leave_allocations?.find(allocation => allocation?.leave_type_id == leaveType?.id)?.days}
                                                                onChange={(e) => {
                                                                    handleChangeFormData(index, leaveType?.id, e.target.value)
                                                                }}
                                                                className="block"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            ))
                                        }
                                        <td>
                                            <button
                                                className="educare-success-btn-sm-fill"
                                                onClick={(e) => {
                                                    handleSaveLeaveAllocation(e, item?.staff_id)
                                                }}
                                            >
                                                <i className="icon-check-1"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="col-span-12 mb-2.5">
                        <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                            {formFields?.length > 0 &&
                                <PrimaryButton
                                    className="educare-primary-btn-lg-fill"
                                    onClick={(e) => {
                                        handleSaveBulkLeaveAllocation(e)
                                    }}
                                >
                                    Save
                                </PrimaryButton>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveAllocationTable;
