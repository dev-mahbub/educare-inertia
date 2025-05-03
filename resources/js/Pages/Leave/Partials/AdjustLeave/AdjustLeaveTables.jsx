import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Tooltip } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
const AdjustLeaveTables = () => {
    const [leaveData, setleaveData] = useState({});
    const [activeForm, setActiveForm] = useState(false);
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_staff: "",
        leave_type: "",
        adjusted_day: "",
        notes: "",
    });

    const headerTopData = (e) => {
        e.preventDefault();
    };

    const demoLeavedata = [
        {
            id: 1,
            name: "Mukesh Kumar",
            leaveData: [
                {
                    leaveType: "Leave Without Pay (LWP)",
                    daysAllocate: 0,
                    consumed: 0,
                    available: 5,
                },
                {
                    leaveType: "Casual Leave (CL)",
                    daysAllocate: 10,
                    consumed: 0,
                    available: 10,
                },
                {
                    leaveType: "Medical Leave (ML)",
                    daysAllocate: 8,
                    consumed: 0,
                    available: 12,
                },
            ],
        },
        {
            id: 2,
            name: "John Doe",
            leaveData: [
                {
                    leaveType: "Leave Without Pay (LWP)",
                    daysAllocate: 0,
                    consumed: 0,
                    available: 7,
                },
                {
                    leaveType: "Casual Leave (CL)",
                    daysAllocate: 12,
                    consumed: 0,
                    available: 8,
                },
                {
                    leaveType: "Medical Leave (ML)",
                    daysAllocate: 6,
                    consumed: 0,
                    available: 14,
                },
            ],
        },
        {
            id: 3,
            name: "Jane Smith",
            leaveData: [
                {
                    leaveType: "Leave Without Pay (LWP)",
                    daysAllocate: 0,
                    consumed: 0,
                    available: 3,
                },
                {
                    leaveType: "Casual Leave (CL)",
                    daysAllocate: 8,
                    consumed: 0,
                    available: 12,
                },
                {
                    leaveType: "Medical Leave (ML)",
                    daysAllocate: 10,
                    consumed: 0,
                    available: 10,
                },
            ],
        },
        {
            id: 4,
            name: "Alice Johnson",
            leaveData: [
                {
                    leaveType: "Leave Without Pay (LWP)",
                    daysAllocate: 0,
                    consumed: 0,
                    available: 8,
                },
                {
                    leaveType: "Casual Leave (CL)",
                    daysAllocate: 15,
                    consumed: 0,
                    available: 5,
                },
                {
                    leaveType: "Medical Leave (ML)",
                    daysAllocate: 5,
                    consumed: 0,
                    available: 15,
                },
            ],
        },
    ];

    return (
        <>
            <div className="educare-card-title pb-none mb-5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Leave Adjustment
                </h5>
            </div>

            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                    {/* search bar */}

                    <form onSubmit={headerTopData}>
                        <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                            <div className="educare-card-title pb-none">
                                <h5>
                                    Staff Details
                                </h5>
                            </div>
                            <div className="flex flex-wrap gap-2.5 items-center">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="search_staff"
                                        value={data.search_staff}
                                        onChange={(e) =>
                                            setData(
                                                "search_staff",
                                                e.target.value
                                            )
                                        }
                                        placeHolder="Search here"
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.search_staff}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-filter-action-btn flex flex-wrap gap-2">
                                    <div>
                                        <Tooltip
                                            title="Search"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                className="educare-secondary-btn-md-fill"
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* end search bar */}

                    {/* table */}

                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <tbody>
                                {demoLeavedata.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    setleaveData(item)
                                                }
                                                className="font-semibold text-primary"
                                            >
                                                {item.name}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-8 lg:col-span-8">
                    <div className="flex justify-between items-center flex-wrap mb-2.5">
                        <div className="educare-card-title pb-none">
                            <h5>
                                {leaveData.name
                                    ? `${leaveData.name}'s Leave Detail`
                                    : "Leave Detail"}
                            </h5>
                        </div>
                        <div>
                            {leaveData?.id && (
                                <div className="">
                                    <button
                                        onClick={() => setActiveForm(true)}
                                        className="educare-success-btn-md-fill"
                                    >
                                        Adjust
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Leave Type</th>
                                    <th>Days Allocated</th>
                                    <th>Consumed</th>
                                    <th>Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {leaveData?.leaveData?.map((item, key) => (
                                        <tr key={key}>
                                            <td>{item.leaveType}</td>
                                            <td>{item.daysAllocate}</td>
                                            <td>{item.consumed}</td>
                                            <td>{item.available}</td>
                                        </tr>
                                    ))}
                                </>
                            </tbody>
                        </table>
                    </div>

                    {/* form */}
                    {activeForm === true && (
                        <div className="educare-common-card mt-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="leave_type"
                                                        value="Leave Type"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="leave_type"
                                                data_label="Class"
                                                data={[]}
                                                value={data.leave_type}
                                                onChange={(e) =>
                                                    setData(
                                                        "leave_type",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.leave_type}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="adjusted_day"
                                                        value="No of Adjusted Days"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextInput
                                                id="adjusted_day"
                                                value={data.adjusted_day}
                                                onChange={(e) =>
                                                    setData(
                                                        "adjusted_day",
                                                        e.target.value
                                                    )
                                                }
                                                placeHolder=""
                                                disabled={true}
                                                className={`block ${
                                                    data.adjusted_day
                                                        ? "enabled"
                                                        : "disabled"
                                                }`}
                                            />
                                            <InputError
                                                message={errors.adjusted_day}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-input-field-notes">
                                            <ul>
                                                 <li> <span className="font-semibold">Note :</span> </li>
                                                <li className="mt-1">To add extra days in [CONSUMED] count: enter as 1,2,... any positive number.</li>
                                                <li className="mt-1">To subtract days from [CONSUMED] count: enter as -1,-2.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="notes"
                                                        value="Notes"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextareaInput
                                                id="notes"
                                                value={data.notes}
                                                onChange={(e) =>
                                                    setData(
                                                        "notes",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.notes}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                            <button type="button" className="educare-danger-btn-md-fill">
                                                X
                                            </button>
                                            <PrimaryButton className="educare-success-btn-md-fill">
                                               <i className="icon-check-1"></i>
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdjustLeaveTables;
