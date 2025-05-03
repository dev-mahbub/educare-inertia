


import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../ConfigurationContextApi";
import ConfigurationSteFourPopUp from "./ConfigurationSteFourPopUp";

const ConfigurationStepFour = ({ dummyData, subjects }) => {
    //update value with edit start

    const [singlePopup, setSinglePopup] = useState(false);

    const [editedItemId, setEditedItemId] = useState(null);
    // use context api
    const {
        itemValues,
        setItemValues,
        selectedBoard,
        ruleType,
        setRuleType,
        setStepFourFormData

    } = useContext(myContext)





    const handleInputChange = (id, field, value) => {
        setItemValues((prevData) => ({ ...prevData, id, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setItemValues(itemValues);
    };

    const handleEditClick = (id, grade, subject_id, percentage) => {
        setEditedItemId(id);
        setItemValues({ id, grade, subject_id, percentage });
    };

    const handleEditCancel = () => {
        setEditedItemId(null);
        setItemValues({});
    };

    const handleSinglePopupClick = () => {
        setSinglePopup(!singlePopup);
    };

    //update value with edit end

    //// handle Add Input row start
    const [rows, setRows] = useState([]);

    console.log("subject", rows);

    const handleAddInputRow = () => {
        setRows([
            ...rows,
            { display_name: "", subject_id: "", percentage: "", rule_type:ruleType, board: selectedBoard,},
        ]);
    };

    useEffect(() => {
        setStepFourFormData(() => ({
            exam_data_array: rows
        }));
    }, [rows]);

    //handle remove
    const handleRowRemove = (index) => {
        let remaining = rows.filter((item, i) => i !== index);
        setRows(remaining);
    };

    //// handle Add Input row end

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_class: "",
    });
    const headerTopData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.landmarks_id) {
                //     reset("landmarks_id");
                //     landmarksInput.current.focus();
                // }
            },
        });
    };

    return (
        <>
            {/* filter Area */}
            <form onSubmit={headerTopData}>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            Select Subject & Rule Type
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="select_class"
                                data_label="Select Rule Type"
                                data={dummyData}
                                value={data.select_class}
                                onChange={(e) =>
                                    setData("select_class", e.target.value)
                                }
                                className="block"
                            />
                            <InputError
                                message={errors.select_class}
                                className="mt-2"
                            />
                        </div>

                        <div className=" flex flex-wrap gap-2">
                            <div>
                                <button
                                    onClick={handleAddInputRow}
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-PlusCircle mr-1"></i>
                                    Add Subject
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={handleSinglePopupClick}
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-PlusCircle mr-1"></i>
                                    Add Subject Group
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    <div className="educare-admission-list-inner-wrapper bg-supportingA/10">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>DISPLAY NAME</th>
                                        <th>SUBJECT</th>
                                        <th>WEIGHTAGE(%)</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Science</td>
                                        <td>Chemistry + Computer Science +</td>
                                        <td>Chemistry-40 % Half Computer Science-50 %</td>
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
                                                            onClick={handleSinglePopupClick}
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="Remove"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
                                                            className="educare-danger-btn-sm-fill"

                                                        >
                                                            X
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="educare-input-field-styles-px-8">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={
                                                                row.display_name
                                                            }
                                                            onChange={(e) =>
                                                                setRows(
                                                                    (
                                                                        prevRows
                                                                    ) =>
                                                                        prevRows.map(
                                                                            (
                                                                                prevRow,
                                                                                i
                                                                            ) =>
                                                                                i ===
                                                                                    index
                                                                                    ? {
                                                                                        ...prevRow,
                                                                                        display_name:
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                    }
                                                                                    : prevRow
                                                                        )
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="educare-input-field-styles-px-8">
                                                    <div className="educare-input-field-styles">
                                                        <SelectInput
                                                            id="subject_id"
                                                            data_label="Subject"
                                                            data={subjects}
                                                            value={
                                                                row.subject_id
                                                            }
                                                            onChange={(e) =>
                                                                setRows(
                                                                    (
                                                                        prevRows
                                                                    ) =>
                                                                        prevRows.map(
                                                                            (
                                                                                prevRow,
                                                                                i
                                                                            ) =>
                                                                                i ===
                                                                                    index
                                                                                    ? {
                                                                                        ...prevRow,
                                                                                        subject_id:
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                    }
                                                                                    : prevRow
                                                                        )
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                row.subject_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="educare-input-field-styles-px-8">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={
                                                                row.percentage
                                                            }
                                                            onChange={(e) =>
                                                                setRows(
                                                                    (
                                                                        prevRows
                                                                    ) =>
                                                                        prevRows.map(
                                                                            (
                                                                                prevRow,
                                                                                i
                                                                            ) =>
                                                                                i ===
                                                                                    index
                                                                                    ? {
                                                                                        ...prevRow,
                                                                                        percentage:
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                    }
                                                                                    : prevRow
                                                                        )
                                                                )
                                                            }
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
                                                                type="button"
                                                                className="educare-warning-btn-sm-fill"
                                                            >
                                                                <i className="icon-editing"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Remove"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-danger-btn-sm-fill"
                                                                onClick={() =>
                                                                    handleRowRemove(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                X
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
                    </div>
                </>
            </form>

            <ConfigurationSteFourPopUp
                singlePopup={singlePopup}
                setSinglePopup={setSinglePopup}
                subjects = {subjects}
            />

            {/*end filter Area */}
        </>
    );
};

export default ConfigurationStepFour;
