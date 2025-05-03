import PrimaryButton from "@/Components/PrimaryButton";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PeriodSecondHalf({
    schoolPeriods,
    handleDeleteSchoolPeriod,
    handleSaveSchoolPeriod,
    handleUpdateSchoolPeriod,
    convertToLocalDate
}) {
    const [periodData, setPeriodData] = useState([]);

    useEffect(() => {
        setPeriodData(schoolPeriods?.filter(item => item?.type == 'Second Half')?.map(item => ({
            id: item?.id,
            start_time: item?.start_time_at ? convertToLocalDate(item?.start_time_at) : '',
            end_time: item?.end_time_at ? convertToLocalDate(item?.end_time_at) : '',
            type: item?.type,
            is_new: false,
            is_selected: false
        })));
    }, [schoolPeriods]);

    // handle change period value start
    const handleChangePeriodValue = (index, field, value) => {
        const updatedData = [...periodData];

        updatedData[index][field] = value;

        setPeriodData(updatedData);
    }
    // handle change period value end

    // handle add period start
    const handleAddPeriod = () => {
        setPeriodData((prevData) => ([
            ...prevData,
            {
                id: null,
                start_time: "",
                end_time: "",
                type: "Second Half",
                is_new: true,
                is_selected: false
            }
        ]));
    }
    // handle add period end

    // handle remove period start
    const handleRemovePeriod = (index) => {
        const updatedData = [...periodData];

        updatedData?.splice(index, 1);

        setPeriodData(updatedData);
    }
    // handle remove period end

    // handle edit period start
    const handleEditPeriod = (index) => {
        const updatedData = [...periodData];

        updatedData[index]['is_selected'] = true;

        setPeriodData(updatedData);
    }
    // handle edit period end

    // handle cancel edit period start
    const handleCancelEditPeriod = (index) => {
        const updatedData = [...periodData];

        updatedData[index]['is_selected'] = false;

        setPeriodData(updatedData);
    }
    // handle cancel edit period end

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="flex justify-between gap-5 mb-2.5">
                <h5 className="text-[18px] font-semibold text-headingLight">
                    Second Half
                </h5>
                <PrimaryButton
                    type="button"
                    onClick={handleAddPeriod}
                    className="bg-primary text-white px-[10px] pt-[4px] pb-[5px] text-[14px] flex items-center gap-[5px] rounded-[5px]"
                >
                    <i className="icon-PlusCircle"></i>
                    Add Period
                </PrimaryButton>
            </div>
            <div className="educare-admission-list pb-0">
                <table>
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {periodData?.length > 0 ?
                            periodData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {item?.is_selected == true || item?.is_new == true ? (
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={item.start_time}
                                                    onChange={(date) =>
                                                        handleChangePeriodValue(
                                                            index,
                                                            'start_time',
                                                            date
                                                        )
                                                    }
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    className="w-full"
                                                />
                                            </div>
                                        ) : (
                                            item?.start_time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        )}
                                    </td>
                                    <td>
                                        {item?.is_selected == true || item?.is_new == true ? (
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={item.end_time}
                                                    onChange={(date) =>
                                                        handleChangePeriodValue(
                                                            index,
                                                            'end_time',
                                                            date
                                                        )
                                                    }
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    className="w-full"
                                                />
                                            </div>
                                        ) : (
                                            item?.end_time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        )}
                                    </td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            {item?.is_selected == false && item?.is_new == false ?
                                                <>
                                                    <Tooltip title="Edit" placement="top" arrow>
                                                        <button
                                                            type="button"
                                                            className="educare-warning-btn-sm-fill"
                                                            onClick={() => handleEditPeriod(index)}
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip title="Delete" placement="top" arrow>
                                                        <button
                                                            type="button"
                                                            className="educare-danger-btn-sm-fill"
                                                            onClick={() => handleDeleteSchoolPeriod(item?.id)}
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
                                                    </Tooltip>
                                                </>
                                                :
                                                item?.is_new == true ?
                                                    <>
                                                        <Tooltip title="Save" placement="top" arrow>
                                                            <button
                                                                type="button"
                                                                className="educare-warning-btn-sm-fill"
                                                                onClick={() =>
                                                                    handleSaveSchoolPeriod(item)
                                                                }
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </Tooltip>
                                                        <Tooltip title="Cancel" placement="top" arrow>
                                                            <button
                                                                type="button"
                                                                className="educare-danger-btn-sm-fill"
                                                                onClick={() => {
                                                                    handleRemovePeriod(index)
                                                                }}
                                                            >
                                                                <i className="icon-cancel"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </>
                                                    :
                                                    <>
                                                        <Tooltip title="Update" placement="top" arrow>
                                                            <button
                                                                type="button"
                                                                className="educare-warning-btn-sm-fill"
                                                                onClick={() =>
                                                                    handleUpdateSchoolPeriod(item)
                                                                }
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </Tooltip>
                                                        <Tooltip title="Cancel" placement="top" arrow>
                                                            <button
                                                                type="button"
                                                                className="educare-danger-btn-sm-fill"
                                                                onClick={() => {
                                                                    handleCancelEditPeriod(index)
                                                                }}
                                                            >
                                                                <i className="icon-cancel"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </>
                                            }

                                        </div>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td
                                    className="text-center text-red-500"
                                    colSpan="4"
                                >
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

