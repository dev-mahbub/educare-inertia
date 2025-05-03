import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../ConfigurationContextApi";
import ConfigurationStepThreePopUp from "./ConfigurationStepThreePopUp";
const ConfigurationStepThree = ({
    exams,
    ruleTypes
}) => {

    // use context api
    const {
        selectedBoard,
        setStepThreeFormData,
        ruleType,
        setRuleType,
        selectedRuleType
    } = useContext(myContext)

    //update value with edit start

    const [singlePopup, setSinglePopup] = useState(false);



    const [examGroupRows, setExamGroupRows] = useState([]);

    const [editedItemId, setEditedItemId] = useState(null);
    const [itemValues, setItemValues] = useState({

        display_name: "",
        exam_id: "",
        percentage: "",
        board: selectedBoard,
    });

    const handleInputChange = (id, field, value) => {
        setItemValues((prevData) => ({ ...prevData, id, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setItemValues(itemValues);
    };

    const handleEditClick = (id, grade, exam_id, percentage) => {
        setEditedItemId(id);
        setItemValues({ id, grade, exam_id, percentage });
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

    const handleAddInputRow = () => {
        setRows((prevRows) => [
            ...prevRows,
            {
                rule_type: data.rule_type,
                display_name: "",
                exam_id: "",
                percentage: "",
                board: selectedBoard,
            },
        ]);
    };




    useEffect(() => {
        setStepThreeFormData(() => ({
            exam_data_array: rows
        }));
    }, [rows]);

    // console.log("stepThreeFormData",rows);

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
        rule_type: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            rule_type: selectedRuleType
        }))
    }, [selectedRuleType]);

    // Set Rule Type ID
    useEffect(() => {
        setRuleType(data.rule_type);
    }, [data.rule_type]);

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
                            Select Exam & Rule Type
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="rule_type"
                                data_label="Select Rule Type"
                                data={ruleTypes}
                                value={data.rule_type}
                                onChange={(e) => {
                                    setData("rule_type", selectedRuleType)
                                }
                                }
                                className="block"
                            />
                            <InputError
                                message={errors.rule_type}
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
                                    Add Exam
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={handleSinglePopupClick}
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-PlusCircle mr-1"></i>

                                    Add Exam Group
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
                                        <th>SCHEDULE TEST</th>
                                        <th>PERCENTAGE(%)</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {examGroupRows.map((single, index) => ( */}
                                    <tr>
                                        <td>
                                            {examGroupRows[0]?.display_name}
                                        </td>
                                        <td>Annual Exam + Half Yearly</td>
                                        {/* <td>Annual Exam-40 % Half Yearly-50 %</td> */}
                                        <td>
                                            {examGroupRows.map((single, index) => (
                                                <span key={index}>
                                                    <span>
                                                        {single.exam_id} - {single.persentance}%
                                                    </span>
                                                    <span>+</span>
                                                </span>
                                            ))}
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
                                                            id="exam_id"
                                                            data_label="Schedule Type"
                                                            data={exams}
                                                            value={
                                                                row.exam_id
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
                                                                                        exam_id:
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
                                                                row.exam_id
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

            <ConfigurationStepThreePopUp
                singlePopup={singlePopup}
                setSinglePopup={setSinglePopup}
                exams={exams}
                ruleType = {ruleType}
                examGroupRows={examGroupRows}
                setExamGroupRows={setExamGroupRows}
            />

            {/*end filter Area */}
        </>
    );
};

export default ConfigurationStepThree;
