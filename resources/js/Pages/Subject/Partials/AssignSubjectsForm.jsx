import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function AssignSubjectsForm({
    dataArray,
    subjects,
    assignedSubjects,
    classId,
    classSubjectTypes,
    academic_grade_data,
    classrooms,
}) {
    const { data, setData, errors, post, reset, processing } = useForm({
        id: "",
        classroom_id: classId,
        subject_id: "",
        type: "",
        academic_grade_id: "",
        display_order: "",
        is_marking: "",
    });

    useEffect(() => {
        setData({
            ...data,
            classroom_id: classId,
        });
    }, [classId]);

    // handle filter data start
    const filterData = () => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classId
        }));

        router.post(route("subject.assign_to_class"), {
            classroom_id: classId,
        });
    }
    // handle filter data end

    const handleFormDataInsert = (e) => {
        e.preventDefault();

        post(route("subject.assign_to_class_save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();

                filterData();
            },
            onError: () => {
                filterData()
            },
        });
    };

    const handleEditData = (e, item) => {
        e.preventDefault();
        setData({
            ...data,
            id: item?.id,
            classroom_id: classId,
            subject_id: item?.subject_id,
            type: item?.type,
            academic_grade_id: item?.academic_grade_id,
            display_order: item?.display_order,
            is_marking: item?.is_marking,
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
                router.delete(route("subject.assign_to_class.destroy", id), {
                    onSuccess: () => filterData(),
                    onError: () => filterData(),
                });
            }
        });
    };

    const permissionFilterData = (e) => {
        e.preventDefault();
        router.post(route("subject.assign_to_class"), {
            classroom_id: data?.classroom_id,
        });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        router.post(route("subject.assign_to_class_update"), data, {
            onSuccess: () => filterData(),
            onError: () => filterData(),
        });
    };

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="educare-permission-filtar-bar-area z-[4] relative">
                    <div className=" educare-permission-filtar-bar">
                        <div className="educare-permission-filtar-bar-filter">
                            <div className="flex justify-between items-center gap-2.5 maxMd:gap-2.5 maxSm:flex-wrap">
                                <div>
                                    <div className="educare-card-title leading-none">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Assign section subject
                                        </h5>
                                    </div>
                                </div>
                                <div className="educare-permission-filtar-bar-filter-fields-wrap flex items-end gap-2.5 maxMd:gap-2.5 maxXs:flex-wrap">
                                    <div className="educare-permission-filtar-bar-filter-fields flex gap-2.5">
                                        <div
                                            className={`educare-select-field-styles ${data.check_user}`}
                                        >
                                            <SelectInput
                                                id="class"
                                                data_label="Class"
                                                data={classrooms}
                                                value={data?.classroom_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "classroom_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block w-[200px]"
                                            />
                                            <InputError
                                                message={errors.classroom_id}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-permission-filtar-bar-filter-btn">
                                        <PrimaryButton
                                            type="button"
                                            onClick={(e) =>
                                                permissionFilterData(e)
                                            }
                                            className="educare-primary-btn-md-fill"
                                        >
                                            Check Subjects
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="educare-classroom-form-area mt-5">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-6 xl:col-span-8 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-card-title">
                                    <h5>&nbsp;</h5>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sl. No.</th>
                                                <th>Name</th>
                                                <th>Grade</th>
                                                <th>Type</th>
                                                <th>Is Marking</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {assignedSubjects?.length > 0 ? (
                                                assignedSubjects?.map(
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
                                                            <td>
                                                                {item?.title}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item
                                                                        ?.academic_grade
                                                                        ?.scale_name
                                                                }
                                                            </td>
                                                            <td>
                                                                {item?.type}
                                                            </td>
                                                            <td>
                                                                {item?.is_marking ==
                                                                    1
                                                                    ? "Yes"
                                                                    : "No"}
                                                            </td>
                                                            <td>
                                                                <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                                    <div className="educare-button-field-styles">
                                                                        <PrimaryButton
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                handleEditData(
                                                                                    e,
                                                                                    item
                                                                                )
                                                                            }
                                                                            className="bg-warning/80 "
                                                                        >
                                                                            <i className="icon-pen"></i>
                                                                        </PrimaryButton>
                                                                    </div>
                                                                    <div className="educare-button-field-styles">
                                                                        <PrimaryButton
                                                                         type="button"
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            className="bg-danger/80 "
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </PrimaryButton>
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
                                                        Subjects not found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 xl:col-span-4 col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Assign Subject to Class
                                        </h5>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <TextInput
                                            id="classroom_id"
                                            value={classId}
                                            type="hidden"
                                            className="block"
                                        />

                                        {/* Start Field  */}
                                        <div className="col-span-12 mt-4">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="subject_id"
                                                    value="Subject*"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
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
                                                    className="mt-1 block w-full"
                                                    required
                                                />
                                                <InputError
                                                    message={errors?.subject_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-12 mt-4">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="type"
                                                    value="Type*"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="type"
                                                    data_label="Subject"
                                                    data={classSubjectTypes}
                                                    value={data.type}
                                                    onChange={(e) =>
                                                        setData(
                                                            "type",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full"
                                                    required
                                                />
                                                <InputError
                                                    message={errors?.type}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-12 mt-4">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="academic_grade_id"
                                                    value="Grade"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="academic_grade_id"
                                                    data_label="grade"
                                                    data={academic_grade_data}
                                                    value={
                                                        data.academic_grade_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "academic_grade_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError
                                                    message={
                                                        errors?.academic_grade_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        {/* Start Field  */}

                                        <div className="col-span-12 mt-4 mb-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="display_order"
                                                    value="Display Order"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="display_order"
                                                    value={data?.display_order}
                                                    onChange={(e) =>
                                                        setData(
                                                            "display_order",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="number"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors?.display_order
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-12 mt-4 mb-6">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="is_marking"
                                                        name="is_marking"
                                                        checked={
                                                            data.is_marking
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "is_marking",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="is_marking"
                                                        value="Is marking"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex gap-[15px]">
                                                {data?.id ? (
                                                    <PrimaryButton
                                                        className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                        type="button"
                                                        onClick={(e) =>
                                                            handleUpdateSubmit(
                                                                e
                                                            )
                                                        }
                                                    >
                                                        Update
                                                    </PrimaryButton>
                                                ) : (
                                                    <PrimaryButton
                                                        className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                        disabled={processing}
                                                        type="submit"
                                                    >
                                                        Save
                                                    </PrimaryButton>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
