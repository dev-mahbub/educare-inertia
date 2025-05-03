import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

export default function GradeScaleDetail({
    grades,
    data,
    setData,
    errors,
    post,
    processing,
    rows,
    setRows,
    formFields,
    setFormFields,
    selectedGrade,
    setEditableIds,
    editableIds
}) {
    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        updatedFields[index][field] = event.target.value;

        setFormFields(updatedFields);

        setData((prevData) => ({
            ...prevData,
            grade_array: updatedFields,
        }));
    };

    const addFields = (e) => {
        e.preventDefault();
        setFormFields([
            ...formFields,
            {
                id: "",
                title: "",
                min_mark: "",
                max_mark: "",
            },
        ]);
    };

    // new code start

    // handle save grade item start
    const handleEditGradeItem = (e, id) => {
        e.preventDefault();

        let updatedIds = [...editableIds];

        if (editableIds?.includes(id)) {
            updatedIds = editableIds?.filter(item => item != id);
        }
        else {
            updatedIds = [...editableIds, id];
        }

        setEditableIds(updatedIds);
    }
    // handle edit grade item end

    // handle remove grade item start
    const handleRemoveGradeItem = (e, indexToRemove, id) => {
        e.preventDefault();

        if(id != "") {
            const updatedIds = editableIds?.filter(item => item != id);

            setEditableIds(updatedIds);
        }
        else {
            const updatedFormFields = formFields?.filter((item, index) => index != indexToRemove);

            setFormFields(updatedFormFields);
        }
    }
    // handle remove grade item end


    // handle save grade item start
    const handleSaveGradeItem = (e, gradeId, row) => {
        e.preventDefault();
        router.post(route('academic_grade.grade_item.save'), {gradeId, row}, {
            onSuccess: () => {
                setEditableIds([]);
                router.post(route('academic_grade.list'), {gradeId});
            },
            onError: (errors) => {
                for (const key in errors) {
                    toast.error(errors[key], {
                        position: 'top-right',
                        autoClose: 1500,
                    });

                    break;
                }
            }
        });
    }
    // handle save grade item end

    // handle save grade item start
    const handleGradeItemDelete = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('academic_grade.grade_item.delete', id), {
                    onSuccess: () => {
                        setEditableIds([]);
                        router.post(route('academic_grade.list'), {gradeId: selectedGrade?.id});
                    }
                });
            }
        });
    }
    // handle save grade item end

    // new code end

    // old code
    // const handleGradeItem = (e, gradeId, row) => {
    //     e.preventDefault();
    //     router.post(route('academic_grade.list'), {gradeId, row});
    // }

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="flex justify-between gap-5">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Grade Scale Details
                        </h5>
                    </div>
                    {data?.id ? (
                        <PrimaryButton
                            disabled={processing}
                            className="educare-primary-btn-md-fill"
                            onClick={(e) => addFields(e)}
                            type="button"
                        >
                            <i className="icon-plus"></i>
                        </PrimaryButton>
                    ) : (
                        ""
                    )}
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Grade</th>
                                <th>Minimum</th>
                                <th>Maximum</th>
                                {/* <th style={{ textAlign: "center" }}>Minimum</th>
                                <th style={{ textAlign: "center" }}>Maximum</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formFields.map((row, index) => (
                                <tr key={index}>
                                    <td className="w-[30%]">
                                        <div className="educare-input-field-styles-px-8">
                                            <div className="educare-input-field-styles">
                                            {row?.id == "" || editableIds?.includes(row?.id) ?
                                                <TextInput
                                                    value={row.title}
                                                    onChange={(event) =>
                                                        handleFormChange(
                                                            event,
                                                            index,
                                                            "title"
                                                        )
                                                    }
                                                    className="block"
                                                    type="text"
                                                />
                                            :
                                                <div className="w-full block">
                                                    {row.title}
                                                </div>
                                            }
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-[30%]">
                                        <div className="educare-input-field-styles-px-8">
                                            <div className="educare-input-field-styles">
                                                {row?.id == "" || editableIds?.includes(row?.id) ?
                                                    <TextInput
                                                        value={row.min_mark}
                                                        onChange={(event) =>
                                                            handleFormChange(
                                                                event,
                                                                index,
                                                                "min_mark"
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                :
                                                    <div className="w-full block">
                                                        {row.min_mark}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-[30%]">
                                        <div className="educare-input-field-styles-px-8">
                                            <div className="educare-input-field-styles">
                                                {row?.id == "" || editableIds?.includes(row?.id) ?
                                                    <TextInput
                                                        value={row.max_mark}
                                                        onChange={(event) =>
                                                            handleFormChange(
                                                                event,
                                                                index,
                                                                "max_mark"
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                :
                                                    <div className="w-full block">
                                                        {row.max_mark}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            {row?.id == "" || editableIds?.includes(row?.id) ?
                                                <div>
                                                    <Tooltip
                                                        title="Save"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            className="educare-success-btn-sm-fill"
                                                            type="button"
                                                            onClick={(e) => handleSaveGradeItem(e, data?.id, row)}
                                                        >
                                                            <i className="icon-check-1"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            :
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            className="educare-primary-btn-sm-fill"
                                                            type="button"
                                                            onClick={(e) => handleEditGradeItem(e, row?.id)}
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            }

                                        {row?.id != "" && !editableIds?.includes(row?.id) ?
                                            <div>
                                                <Tooltip
                                                    title="Delete"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        className="educare-danger-btn-sm-fill"
                                                        type="button"
                                                        onClick={(e) => handleGradeItemDelete(e, row?.id)}
                                                    >
                                                        <i className="icon-TrashSimple"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        :
                                            <div>
                                                <Tooltip
                                                    title="Cancel"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        className="educare-danger-btn-sm-fill"
                                                        type="button"
                                                        onClick={(e) => handleRemoveGradeItem(e, index, row?.id)}
                                                    >
                                                        X
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        }
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {formFields.length == 0 ? (
                                <tr>
                                    <td
                                        className="text-center text-red-500"
                                        colSpan="7"
                                    >
                                        Data not found
                                    </td>
                                </tr>
                            ) : (
                                ""
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
