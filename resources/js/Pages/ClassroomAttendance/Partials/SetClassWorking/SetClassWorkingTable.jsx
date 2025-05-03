import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import SetClassWorkingPopUp from "./SetClassWorkingPopUp";
import SelectInput from "@/Components/SelectInput";
import Swal from "sweetalert2";

const SetClassWorkingTable = ({
    classNames = [],
    academicSession = [],
    monthArr = [],
    academicYearId = '',
    monthId = '',
}) => {
    const {
        data,
        setData,
        errors,
    } = useForm({
        working_days: "",
        working_day_id: "",
        bonus_days: "",
        bonus_day_id: "",

        // data submit
        class_name_id: "",
        item_working_day: "",
        item_bonus_day: "",
        academic_year_id: "",
        month_id: "",
    });

    const [selectData, setSelectData] = useState({
        academic_year_id: data?.academic_year_id,
        month_id: data?.month_id,
    });


    //working day and bonus day array
    const [workingDaysArray, setWorkingDaysArray] = useState(classNames.map((item) => item.working_days));
    const [bonusDaysArray, setBonusDaysArray] = useState(classNames.map((item) => item.bonus_days));

    const handleData = () => {
        const updatedData = {
            ...data,
            working_days: data.working_days,
        };
        const updatedWorkingDaysArray = classNames.map((item) => data.working_days);
        setData(updatedData);
        setWorkingDaysArray(updatedWorkingDaysArray);
    };

    const handleBonusDay = () => {
        const updatedData = {
            ...data,
            bonus_days: data.bonus_days,
        };
        const updateBonusDaysArray = classNames.map((item) => data.bonus_days);
        setData(updatedData);
        setBonusDaysArray(updateBonusDaysArray)
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('classroom_attendance.set_class_working'), { 'academic_year_id': data?.academic_year_id, 'month_id': data?.month_id });
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('classroom_attendance.set_class_working'));
    }

    const getSubmitValue = (classNameId, index) => {
        const workingDay = workingDaysArray[index];
        const bonusDay = bonusDaysArray[index];

        setData({
            ...data,
            class_name_id: classNameId,
            item_working_day: workingDay,
            item_bonus_day: bonusDay,
        });

        const data2 = {
            academic_year_id: data?.academic_year_id,
            month_id: data?.month_id,
            class_name_id: classNameId,
            working_day: workingDay,
            bonus_day: bonusDay,
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure to make changes in bonus/working days? It will reflect in all section and students of selected class!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, change it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('classroom_attendance.set_class_working_save'), data2);
            }
        });

    }

    useEffect(() => {
        setWorkingDaysArray(classNames.map((item) => item.working_days));
        setBonusDaysArray(classNames.map((item) => item.bonus_days));
        setData({
            ...data,
            academic_year_id: academicYearId,
            month_id: monthId,
        })
    }, [classNames]);


    return (
        <>
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-WarningCircle"></i>
                        Set class wise working days.
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
                    <div className="educare-filter-action-btn flex flex-wrap gap-2">
                        <div>
                            <button
                                className="educare-secondary-btn-md-fill"
                                type="button"
                                onClick={(e) => handleSearch(e)}
                            >
                                <i className="icon-search-interface-symbol"></i>
                            </button>
                        </div>

                        <div>
                            <button
                                className="educare-gray-btn-md-fill"
                                type="button"
                                onClick={(e) => handleReset(e)}
                            >
                                <i className="icon-ArrowsClockwise"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Total Working Days</th>
                            <th>Bonus Days</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <div className="flex items-center">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="working_days"
                                            value={data.working_days}
                                            onChange={(e) =>
                                                setData(
                                                    "working_days",
                                                    e.target.value.slice(0, 2)
                                                )
                                            }
                                            className="block"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleData}
                                            className="educare-success-btn-md-fill ml-2"
                                        >
                                            C
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="bonus_days"
                                            value={data.bonus_days}
                                            onChange={(e) =>
                                                setData(
                                                    "bonus_days",
                                                    e.target.value.slice(0, 2)
                                                )
                                            }
                                            className="block"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleBonusDay}
                                            className="educare-success-btn-md-fill ml-2"
                                        >
                                            C
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td></td>
                        </tr>

                        {classNames.map((item, index) => (
                            <tr key={index}>
                                <td> {item?.class_name} </td>
                                <td>
                                    <div className="flex items-center">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id={`working_day_id_${index}`}
                                                value={ workingDaysArray[index] && workingDaysArray[index]}
                                                onChange={(e) => setWorkingDaysArray((prev) => {
                                                    const newValue = e.target.value.slice(0, 2);
                                                    const newArr = [...prev];
                                                    newArr[index] = newValue;
                                                    return newArr;
                                                })}
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.working_day_id}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id={`bonus_day_id_${index}`}
                                                value={bonusDaysArray[index]}
                                                onChange={(e) => setBonusDaysArray((prev) => {
                                                    const newValue = e.target.value.slice(0, 2);
                                                    const newArr = [...prev];
                                                    newArr[index] = newValue;
                                                    return newArr;
                                                })}
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.bonus_day}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                        <div>
                                            <Tooltip
                                                title="Save"
                                                placement="top"
                                                arrow
                                            >
                                                <button
                                                    onClick={(e) => getSubmitValue(item?.class_name_id, index)}
                                                    type="button"
                                                    className="educare-success-btn-sm-fill"
                                                >
                                                    <i className="icon-check-1"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SetClassWorkingTable;
