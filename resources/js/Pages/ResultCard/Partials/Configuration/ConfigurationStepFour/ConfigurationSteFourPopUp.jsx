import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../ConfigurationContextApi";

const ConfigurationSteFourPopUp = ({
    className = "",
    singlePopup,
    setSinglePopup,
    subjects
}) => {
    const [editedItemId, setEditedItemId] = useState(null);
    const [itemValues, setItemValues] = useState({
        subject_id: "",
        percentage: "",
    });

    const {
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

    const [stepFourPopUpFormData, setFourStepData] = useState({});

    const handleSaveSubjectGroupData = (e) => {
        router.post(route('result_card.step_four.save'), stepFourPopUpFormData);
    };


    //// handle Add Input row start
    const [rows, setRows] = useState([]);

    const handleAddInputRow = () => {
        setRows([...rows, { subject_id: "", percentage: "", display_name: data.display_name, board:selectedBoard, rule_type:ruleType }]);
    };

    //handle remove
    // useEffect(() => {
    //     setStepFourPopUpFormData(() => ({
    //         exam_data_array: rows
    //     }));
    // }, [rows]);

    useEffect(() =>{
        setFourStepData(() => ({
            exam_data_array: rows,
        }))
    },[rows])

    console.log("Field Data",rows);

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
    } = useForm({});

    const singlePopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setSinglePopup(false);
        reset();
    };

    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={singlePopup} onClose={closeModal}>
                    <form
                        onSubmit={singlePopupData}
                        className="p-[30px] pt-2.5"
                    >
                        <div className="educare-popup-form-wrapper">
                            <div className="educare-popup-form-header py-3">
                                <div className="mb-2.5">
                                    <div className="educare-card-title ">
                                        <h5>
                                            Add Group of Subject
                                        </h5>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5 items-center">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="display_name"
                                                value={data.display_name}
                                                placeHolder="Display Name"
                                                onChange={(e) =>
                                                    setData(
                                                        "display_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.display_name}
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
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-classroom-table-wrapper bg-supportingA/10">
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>SUBJECT</th>
                                                    <th>WEIGHTAGE(%)</th>
                                                    <th>ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((row, index) => (
                                                    <tr key={index}>
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
                                                                        onChange={(
                                                                            e
                                                                        ) =>
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
                                                                        onChange={(
                                                                            e
                                                                        ) =>
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
                                                                            onClick={handleAddInputRow}
                                                                            type="button"
                                                                            className="educare-primary-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-plus"></i>
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
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                            className="educare-primary-btn-md-fill"
                            type="button"
                            onClick={() => {
                                // singlePopupData();
                                handleSaveSubjectGroupData();
                            }}

                            >Add Subject Group</PrimaryButton>
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>

                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
};

export default ConfigurationSteFourPopUp;
