import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import SelectInput from "@/Components/SelectInput";

const SetSectionWorkingTable = ({
    workingClassroom = [],
    academicSession = [],
    monthArr = [],
    academicYearId = '',
    monthId = '',
    classId = '',
    classNames = [],
}) => {

    const {
        data,
        setData,
        post,
        errors,
    } = useForm({
        is_show_list: true,
        classroom_id: "",
        working_days: "",
        bonus_days: "",
        class_name_id: "",
        academic_year_id: academicYearId,
        month_id: monthId,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('classroom_attendance.set_section_working_save'), data, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handelSearch = (e) => {
        e.preventDefault();
        setData({
            ...data,
            working_days: "",
            bonus_days: "",
        });
        router.post(route('classroom_attendance.set_section_working'), data);
    }

    const handelReset = (e) => {
        e.preventDefault();
        setData('');
        router.get(route('classroom_attendance.set_section_working'));
    }

    useEffect(() => {
        setData({
            ...data,
            is_show_list: true,
            class_name_id: classId,
            academic_year_id: academicYearId,
            month_id: monthId,
        });
    }, [workingClassroom]);


    console.log('data', data);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-WarningCircle"></i>
                            Set class section wise working days
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="month_id"
                                data_label="Month"
                                data={monthArr}
                                value={data.month_id}
                                onChange={(e) =>
                                    setData("month_id", e.target.value)
                                }
                                className="block"
                            />
                            <InputError
                                message={errors.month_id}
                                className="mt-2"
                            />
                        </div>

                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="academic_year_id"
                                data_label="Year"
                                data={academicSession}
                                value={data.academic_year_id}
                                onChange={(e) =>
                                    setData("academic_year_id", e.target.value)
                                }
                                className="block"
                            />
                            <InputError
                                message={errors.academic_year_id}
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="class_name_id"
                                data_label="Class"
                                data={classNames}
                                value={data.class_name_id}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        "class_name_id": e.target.value,
                                        "is_show_list": false,
                                    })
                                }
                                }
                                className="block"
                            />
                            <InputError
                                message={errors.class_name_id}
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
                                        type="button"
                                        onClick={(e) => handelSearch(e)}
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </Link>
                                </Tooltip>
                            </div>

                            <div>
                                <Tooltip
                                    title="Reset"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-gray-btn-md-fill"
                                        type="button"
                                        onClick={(e) => handelReset(e)}
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Section Name</th>
                                <th>Total Working Days</th>
                                <th>Bonus Days</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workingClassroom?.length && data?.is_show_list ? (
                                workingClassroom?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.classroom_title}</td>
                                        <td>
                                            <div className="educare-input-field-styles">
                                                {item?.classroom_id === data?.classroom_id ?
                                                    <>
                                                        <TextInput
                                                            id="working_days"
                                                            defaultValue={item?.working_days}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "working_days",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                            type="number"
                                                        />
                                                        <InputError
                                                            message={errors.working_days}
                                                            className="mt-2"
                                                        />
                                                    </>
                                                    :
                                                    <TextInput
                                                        id="working_days"
                                                        defaultValue={item?.working_days}
                                                        disabled={true}
                                                        onChange={(e) =>
                                                            setData(
                                                                "working_days",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block disabled"
                                                    />
                                                }


                                            </div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles">
                                                {item?.classroom_id === data?.classroom_id ?
                                                    <>
                                                        <TextInput
                                                            id="bonus_days"
                                                            defaultValue={item?.bonus_days}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "bonus_days",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                            type="number"
                                                        />
                                                        <InputError
                                                            message={errors.bonus_days}
                                                            className="mt-2"
                                                        />
                                                    </>
                                                    :
                                                    <TextInput
                                                        id="bonus_days"
                                                        defaultValue={item?.bonus_days}
                                                        disabled={true}
                                                        onChange={(e) =>
                                                            setData(
                                                                "bonus_days",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block disabled"
                                                    />
                                                }

                                            </div>
                                        </td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                {item?.classroom_id === data?.classroom_id ? (
                                                    <>
                                                        <div>
                                                            <Tooltip
                                                                title="Remove"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={(e) => {
                                                                        setData({
                                                                            ...data,
                                                                            classroom_id: "",
                                                                            working_days: "",
                                                                            bonus_days: "",
                                                                        })
                                                                    }
                                                                    }
                                                                >
                                                                    X
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Save"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    className="educare-success-btn-sm-fill"
                                                                    type="submit"
                                                                // onClick={(e) => handleSubmit(e)}
                                                                >
                                                                    <i className="icon-check-1"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    onClick={(e) => {
                                                                        setData({
                                                                            ...data,
                                                                            classroom_id: item?.classroom_id,
                                                                            working_days: item?.working_days,
                                                                            bonus_days: item?.bonus_days,
                                                                        })
                                                                    }
                                                                    }
                                                                    className="educare-warning-btn-sm-fill"
                                                                    type="button"
                                                                >
                                                                    <i className="icon-pen"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center text-red-500" colSpan="12">
                                        Data not found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </form>
        </>
    );
};

export default SetSectionWorkingTable;
