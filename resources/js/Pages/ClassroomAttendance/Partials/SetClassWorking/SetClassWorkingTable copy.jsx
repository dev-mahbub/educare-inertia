import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import SetClassWorkingPopUp from "./SetClassWorkingPopUp";

const SetClassWorkingTable = ({ classNames }) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        working_days: "",
        working_day_id: "",
        bonus_days: "",
        bonus_day_id: "",
    });

    //dummy data
    const dummyTableData = [{ id: 1, class: "Nursary" }, { id: 2, class: "I" }, { id: 3, class: "II" }, { id: 4, class: "IX" },];

    //working day and bonus day array
    const [workingDaysArray, setWorkingDaysArray] = useState(dummyTableData.map(() => data.working_days));
    const [bonusDaysArray, setBonusDaysArray] = useState(dummyTableData.map(() => data.bonus_days));

    //modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (id) => {
        if (id) {
            setOpenModal(!openModal);
        }
    };


    const handleData = () => {
        // Update the 'working_days' value in the 'data' state
        const updatedData = {
            ...data,
            working_days: data.working_days,
        };
        // Update the 'workingDaysArray' with the 'working_days' value for all items
        const updatedWorkingDaysArray = dummyTableData.map(() => data.working_days);

        // Set the updated data and workingDaysArray states
        setData(updatedData);
        setWorkingDaysArray(updatedWorkingDaysArray);
    };

    const handleBonusDay = () => {
        // Update the 'bonus_days' value in the 'data' state
        const updatedData = {
            ...data,
            bonus_days: data.bonus_days,
        };

        // Update the 'bonusDaysArray' with the 'bonus_days' value for all items
        const updateBonusDaysArray = dummyTableData.map(() => data.bonus_days);

        // Set the updated data and workingDaysArray states
        setData(updatedData);
        setBonusDaysArray(updateBonusDaysArray)
    };

    return (
        <>
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

                                        <InputError
                                            message={errors.working_days}
                                            className="mt-2"
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
                                        <InputError
                                            message={errors.bonus_days}
                                            className="mt-2"
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

                        {dummyTableData.map((item, index) => (
                            <tr key={item.id}>
                                <td> {item.class} </td>
                                <td>
                                    <div className="flex items-center">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id={`working_day_id_${index}`}
                                                value={workingDaysArray[index]}
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
                                                    onClick={() =>
                                                        handleOpenModal(item.id)
                                                    }
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

            <SetClassWorkingPopUp openModal={openModal} setOpenModal={setOpenModal} />
        </>
    );
};

export default SetClassWorkingTable;
