import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import { useState } from 'react';

const FirstPopupAbsentSummery = ({
    dayTypes,
    staffAttendanceSummary,
    data,
    setData,
    errors,
    tempAttendanceDeductionData,
    setTempAttendanceDeductionData
}) => {

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(Array(tempAttendanceDeductionData?.length).fill(false));
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    const AdmissionListData = (e) => {
        e.preventDefault();
    };
    //form validation end

    //handle Checkbox start
    const handleCheckboxSelect = (parentIndex, field, value, childIndex) => {
        const updatedData = [...tempAttendanceDeductionData];

        if (field == 'select_all') {
            updatedData[parentIndex]['is_selected'] = value == true;

            updatedData[parentIndex]['attendances'] = updatedData[parentIndex]['attendances']?.map((item, index) => ({
                ...item,
                is_selected: item?.is_disabled == true ? item?.is_selected : value == true
            }));
        } else {
            updatedData[parentIndex]['attendances'][childIndex][field] = value == true;

            const total_selected = updatedData[parentIndex]['attendances']?.filter(item => item?.is_selected == true && item?.is_disabled == false)?.length;

            updatedData[parentIndex]['is_selected'] = total_selected == updatedData[parentIndex]['attendances']?.filter(item => item?.is_disabled == false)?.length;
        }

        setTempAttendanceDeductionData(updatedData);
    };
    //handle Checkbox end

    // handle change form data start
    const handleChangeFormValue = (parentIndex, childIndex, field, value) => {
        const updatedData = [...tempAttendanceDeductionData];

        if(field == 'day_type') {
            if (value != '') {
                updatedData[parentIndex]['attendances'][childIndex][field] = value;
            }
        } else {
            updatedData[parentIndex]['attendances'][childIndex][field] = value;
        }

        setTempAttendanceDeductionData(updatedData);
    }
    // handle change form data end

    // helper method to capitalize word
    const capitalizeWords = (string) => {
        return string.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <>
            <div className="educare-admission-list-area mb-5">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={AdmissionListData}>
                            <div className="educare-admission-list bg-supportingA/10 pb-none">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Day</th>
                                            <th>School Holiday</th>
                                            <th>Attendance</th>
                                            <th>Day Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tempAttendanceDeductionData?.length > 0 &&
                                            tempAttendanceDeductionData.map((item, index) => (
                                                <>
                                                    <tr>
                                                        <td>{item?.payment_month_title}</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-check width-full ">
                                                                    <Checkbox
                                                                        id="select_all"
                                                                        name="select_all"
                                                                        checked={
                                                                            item?.is_selected
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleCheckboxSelect(index, 'select_all', e.target.checked)
                                                                        }
                                                                        disabled={item?.is_disabled}
                                                                    />
                                                                </div>
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <InputLabel
                                                                        htmlFor="select_all"
                                                                        value="All"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {" "}
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() =>
                                                                    handleEnqToggle(index)
                                                                }
                                                            >
                                                                <i
                                                                    className={`${enqInnerActive[index]
                                                                        ? "icon-arrow-up"
                                                                        : "icon-down-arrow"
                                                                        }`}
                                                                ></i>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    <tr
                                                        className={`${enqInnerActive[index]
                                                            ? ""
                                                            : "hidden"
                                                            }`}
                                                    >
                                                        <td
                                                            colSpan="12"
                                                            className="educare-admission-list-enq-inner-wrap"
                                                        >
                                                            <table className="educare-admission-list-enq-inner">
                                                                <thead>
                                                                    <tr>
                                                                        <th>
                                                                            Month
                                                                        </th>
                                                                        <th>
                                                                            Day
                                                                        </th>
                                                                        <th>
                                                                            School Holiday
                                                                        </th>
                                                                        <th>
                                                                            Attendance
                                                                        </th>
                                                                        <th>
                                                                            Day Type
                                                                        </th>
                                                                        <th>
                                                                            Action
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.attendances?.length > 0 &&
                                                                        item.attendances.map((attendance, innerIndex) => (
                                                                            <tr key={innerIndex}>
                                                                                <td>
                                                                                    {attendance?.attendance_formatted_date}
                                                                                </td>
                                                                                <td>
                                                                                    {attendance?.attendance_day}
                                                                                </td>
                                                                                <td>
                                                                                    {attendance?.school_holiday != '' &&
                                                                                        <span className='badge info'>
                                                                                            {attendance?.school_holiday}
                                                                                        </span>
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {attendance?.attendance_type != '' &&
                                                                                        <span
                                                                                            className={`badge ${attendance?.attendance_type == 'present' ? 'success' : attendance?.attendance_type == 'absent' ? 'danger' : attendance?.attendance_type == 'halfday' ? 'warning' : 'gray'}`}
                                                                                        >
                                                                                            {capitalizeWords(attendance?.attendance_type)}
                                                                                        </span>
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    <div className="educare-input-field-styles">
                                                                                        <SelectInput
                                                                                            data_label="Day"
                                                                                            data={dayTypes}
                                                                                            value={
                                                                                                attendance?.day_type
                                                                                            }
                                                                                            onChange={(e) =>
                                                                                                handleChangeFormValue(
                                                                                                    index,
                                                                                                    innerIndex,
                                                                                                    "day_type",
                                                                                                    e.target.value
                                                                                                )
                                                                                            }
                                                                                            className={`block ${attendance?.attendance_type != '' ? 'cursor-not-allowed' : ''}`}
                                                                                            disabled={attendance?.attendance_type != ''}
                                                                                        />
                                                                                        <InputError
                                                                                            message={
                                                                                                errors.select_day_one_id
                                                                                            }
                                                                                            className="mt-2"
                                                                                        />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                                        <div className="educare-create-school-settings-list-check width-full">
                                                                                            <Checkbox
                                                                                                id="monday_august_id"
                                                                                                name="monday_august_id"
                                                                                                checked={
                                                                                                    attendance?.is_selected
                                                                                                }
                                                                                                onChange={(e) =>
                                                                                                    handleCheckboxSelect(index, 'is_selected', e.target.checked, innerIndex)
                                                                                                }
                                                                                                disabled={attendance?.is_disabled}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="educare-input-field-styles mt-4">
                                <InputLabel
                                    value="Deduction Message : "
                                />
                                <TextareaInput
                                    value={
                                        data?.deduction_message
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "deduction_message",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.deduction_message
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FirstPopupAbsentSummery;
