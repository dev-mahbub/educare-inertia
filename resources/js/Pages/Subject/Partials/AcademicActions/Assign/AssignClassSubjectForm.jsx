import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm, usePage } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AssignClassSubjectPopup from "../Assign/Popup/AssignClassSubjectPopup";

export default function AssignClassSubjectForm({
    subjects,
    classSubjectTypes,
    grades,
    classSubjects,
    classnames = [],
    subjectGroup = [],
    classNameId,
}) {
    const [assignClassPopupOpen, setAssignClassPopupOpen] = useState(false);
    const [subjectsData, setSubjectsData] = useState([]);

    const { data, setData, errors, post, reset, processing } = useForm({
        id: "",
        class_name_id: "",
        display_order: "",
        subject_id: "",
        type: "",
        subject_group_id: "",
        academic_grade_id: "",
        is_marking: "",
        subject_ids: [],
        subject_all: false,
        class_name_ids: [],
        class_name_all: false,
    });

    useEffect(() => {
        setData({
            ...data,
            class_name_id: classNameId,
        });
    }, [classNameId]);


    useEffect(() => {
        setSubjectsData(classSubjects?.map((item) => ({
            id: item?.subject_id,
            title: item?.title,
        })));
    }, [classSubjects]);

    const assignClassSubjectData = (e) => {
        e.preventDefault();

        resetErrors();

        post(route("subject.assign_to_class_new_design.save"), {
            preserveScroll: true,
            // preserveState: true,
            onSuccess: () => {
                reset();

                setData({
                    ...data,
                    class_name_id: classNameId,
                });

                router.post(route("subject.assign_to_class_new_design"), {
                    class_name_id: classNameId,
                });
            },
            onError: (errors) => {
                setData({
                    ...data,
                    class_name_id: classNameId,
                });

                router.post(route("subject.assign_to_class_new_design"), {
                    class_name_id: classNameId,
                });
            }
        });
    };

    const handleEdit = (e, item) => {
        e.preventDefault();

        setData({
            ...data,
            id: item.id,
            display_order: item.display_order,
            subject_id: item.subject_id,
            type: item.type,
            subject_group_id: item.subject_group_id,
            academic_grade_id: item.academic_grade_id,
            is_marking: item.is_marking,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        resetErrors();

        router.post(route("subject.assign_to_class_new_design.update"), data, {
            preserveScroll: true,
            // preserveState: true,
            onSuccess: () => {
                reset();

                setData({
                    ...data,
                    class_name_id: classNameId,
                });

                router.post(route("subject.assign_to_class_new_design"), {
                    class_name_id: classNameId,
                });
            },
            onError: (errors) => {
                setData({
                    ...data,
                    class_name_id: classNameId,
                });

                router.post(route("subject.assign_to_class_new_design"), {
                    class_name_id: classNameId,
                });
            }
        });
    };

    const handleClass = (e) => {
        e.preventDefault();

        resetErrors();

        router.post(route("subject.assign_to_class_new_design"), {
            class_name_id: data?.class_name_id,
        });
    };

    const handleDelete = (id) => {
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
                resetErrors();

                router.delete(route("subject.assign_to_class_new_design.delete", id), {
                    onSuccess: () => {
                        reset();

                        setData({
                            ...data,
                            class_name_id: classNameId,
                        });

                        router.post(route("subject.assign_to_class_new_design"), {
                            class_name_id: classNameId,
                        });
                    }
                });
            }
        });
    };

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.message) {
            setData({
                ...data,
                id: "",
                display_order: "",
                subject_id: "",
                type: "",
                subject_group_id: "",
                academic_grade_id: "",
                is_marking: "",
            });
        }
    }, [flash]);

    // update
    const handleEditPopup = (e) => {
        e.preventDefault();
        setAssignClassPopupOpen(!assignClassPopupOpen);
    };


    // reset errors start
    const resetErrors = () => {
        for (const key in errors) {
            errors[key] = "";
        }
    }
    // reset errors end


    return (
        <>
            <div className="flex flex-wrap justify-between gap-1 mb-5">
                <form className="flex flex-wrap gap-1">
                    <div className="educare-select-field-styles">
                        <SelectInput
                            id="class_name_id"
                            data_label="Class"
                            data={classnames}
                            value={data.class_name_id}
                            onChange={(e) =>
                                setData("class_name_id", e.target.value)
                            }
                            type="text"
                            className="block"
                        />
                        <InputError
                            message={errors.class_name_id}
                            className="mt-2"
                        />
                    </div>
                    <div className="educare-admission-filtar-bar-filter-action educare-filter-action-btn">
                        <div>
                            <button
                                type="button"
                                className="educare-secondary-btn-md-fill"
                                onClick={(e) => handleClass(e)}
                            >
                                <i className="icon-search-interface-symbol"></i>
                            </button>
                        </div>
                    </div>
                </form>
                {data?.class_name_id && classSubjects?.length > 0 ? (
                    <div>
                        <PrimaryButton
                            className="educare-primary-btn-md-fill"
                            type="button"
                            onClick={(e) => handleEditPopup(e)}
                        >
                            <i className="icon-PlusCircle"></i> Copy Subject to
                            other class
                        </PrimaryButton>
                    </div>
                ) : (
                    ""
                )}
            </div>

            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12 order-1 maxMd:order-2">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Class subject
                                    <span>({classSubjects?.length})</span>
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No.</th>
                                            <th>Subject</th>
                                            <th>Type</th>
                                            <th>Parent Subject</th>
                                            <th>Grade Scale</th>
                                            <th>Is Marking</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classSubjects?.length > 0 ? (
                                            classSubjects?.map(
                                                (item, index) => (
                                                    <tr
                                                        style={{
                                                            backgroundColor:
                                                                data?.id ==
                                                                item?.id
                                                                    ? "rgb(107 156 227 / 56%)"
                                                                    : "",
                                                        }}
                                                        key={index}
                                                    >
                                                        <td>
                                                            {
                                                                // item?.display_order
                                                                index+1
                                                            }
                                                        </td>
                                                        <td>{item?.title}</td>
                                                        <td>{item?.type}</td>
                                                        <td>
                                                            {
                                                                item
                                                                    ?.subject_group
                                                                    ?.name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item?.grade
                                                                    ?.scale_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {item?.is_marking ==
                                                            1
                                                                ? "Yes"
                                                                : "No"}
                                                        </td>
                                                        <td>
                                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleEdit(
                                                                                e,
                                                                                item
                                                                            )
                                                                        }
                                                                        className="educare-warning-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Delete"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <button
                                                                            className="educare-danger-btn-sm-fill"
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="7"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12 order-2 maxMd:order-1">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        {data?.id
                                            ? "Update Assign Subject"
                                            : "Assign New Subject"}
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] pt-5 maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={assignClassSubjectData}>
                                        <div className="educare-input-field-styles mb-3">
                                            <InputLabel
                                                htmlFor="display_order"
                                                value="Order"
                                            />
                                            <TextInput
                                                id="display_order"
                                                value={data.display_order}
                                                onChange={(e) =>
                                                    setData(
                                                        "display_order",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                type="number"
                                            />
                                            <InputError
                                                message={errors.display_order}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles mb-3">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="subject_id"
                                                        value="Subject"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="subject_id"
                                                data_label="Subject"
                                                data={subjects}
                                                value={data.subject_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.subject_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles mb-3">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="type"
                                                        value="Type"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="type"
                                                data_label="Type"
                                                data={classSubjectTypes}
                                                value={data.type}
                                                onChange={(e) =>
                                                    setData(
                                                        "type",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.type}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles mb-3">
                                            <InputLabel
                                                htmlFor="subject_group_id"
                                                value="Parent Subject"
                                            />
                                            <SelectInput
                                                id="subject_group_id"
                                                data_label="Parent Subject"
                                                data={subjectGroup}
                                                value={data.subject_group_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "subject_group_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.subject_group_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles mb-3">
                                            <InputLabel
                                                htmlFor="academic_grade_id"
                                                value="Grade Scale"
                                            />
                                            <SelectInput
                                                id="academic_grade_id"
                                                data_label="Grade Scale"
                                                data={grades}
                                                value={data.academic_grade_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "academic_grade_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.academic_grade_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-checkbox-field-styles mb-4">
                                            <InputLabel
                                                htmlFor="is_marking"
                                                value="Is Marking"
                                            />
                                            <Checkbox
                                                name="is_marking"
                                                checked={data.is_marking}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_marking",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        {data?.id ? (
                                            <div>
                                                <PrimaryButton
                                                    className="educare-primary-btn-lg-fill"
                                                    type="button"
                                                    disabled={processing}
                                                    onClick={(e) =>
                                                        handleEditSubmit(e)
                                                    }
                                                >
                                                    Update Assign Subject
                                                </PrimaryButton>
                                            </div>
                                        ) : (
                                            <div>
                                                <PrimaryButton
                                                    className="educare-primary-btn-lg-fill"
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    {data?.id ? "Update" : ""}{" "}
                                                    Assign Subject
                                                </PrimaryButton>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AssignClassSubjectPopup
                assignClassPopupOpen={assignClassPopupOpen}
                setAssignClassPopupOpen={setAssignClassPopupOpen}
                data={data}
                setData={setData}
                reset={reset}
                // subjects={subjects}
                subjects={subjectsData}
                classnames={classnames}
            ></AssignClassSubjectPopup>
        </>
    );
}
