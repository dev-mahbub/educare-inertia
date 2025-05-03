import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function SetExamRoasterForm({
    classNames = [],
    exams = [],
    classroomExamRoasterData = [],
}) {
    const [filteredExams, setFilteredExams] = useState([]);
    const [selectedClassName, setSelectedClassName] = useState({});
    const [formFields, setFormFields] = useState({});
    const [loading, setLoading] = useState(false);

    const { data, setData, errors, post, reset, processing } = useForm({
        class_name_id: "",
        exam_id: "",
        classroom_ids: [],
        full_mark: "",
        pass_mark: "",
        converted_mark: "",
        is_marking: "",
        classroom_exam_date_array: formFields,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_exam_date_array: formFields,
        }));
    }, [formFields]);

    useEffect(() => {
        setFormFields(
            Object.values(classroomExamRoasterData)?.map((item) => ({
                id: item.id,
                classroom_id: item.classroom_id,
                subject_id: item.subject_id,
                classroom_subject_id: item.classroom_subject_id,
                exam_id: item.exam_id,
                subject_title: item.subject_title,
                full_mark: item.full_mark,
                pass_mark: item.pass_mark,
                converted_mark: item.converted_mark,
                is_marking: item.is_marking,
                classroom_section_title: item.classroom_section_title,
            }))
        );
    }, [classroomExamRoasterData]);

    const handleClassNameChange = (event) => {
        const selectedClass = Object.values(classNames)?.find(
            (item) => item?.id == event.target.value
        );
        setSelectedClassName(selectedClass);
        setFilteredExams(
            exams?.filter((item) => selectedClass?.exam_ids?.includes(item?.id))
        );
        setData((prevData) => ({
            ...prevData,
            class_name_id: event.target.value,
        }));
    };

    const handleExamChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            exam_id: event.target.value,
        }));
        const form_data = {
            exam_id: event.target.value,
            class_name_id: selectedClassName?.id,
            classroom_ids: selectedClassName?.classroom_ids,
        };
        setFormFields([]);
        router.post(route("exam_roaster.list"), form_data);
        setLoading(false);
    };

    const handleFormChange = (index, value, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = value;
        setFormFields(updatedFields);
    };

    const handleCopy = (field, value) => {
        const updatedFields = formFields.map((item) => {
            if (item.is_marking !== 0) {
                return {
                    ...item,
                    [field]: value,
                };
            }
            return item;
        });
        setFormFields(updatedFields);
    };

    // hale
    const handlesetFormFields = (e) => {
        e.preventDefault();
        post(route("exam_roaster.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFormFields([]);
                setFilteredExams(null);
            },
        });
    };

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route("exam_roaster.list"));
        setLoading(false);
    };

    useEffect(() => {
        setLoading(false);
    }, [classroomExamRoasterData]);

    return (
        <>
            <div className="educare-classroom-form-area">
                <form onSubmit={handlesetFormFields}>
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-3 col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Assign marks to class
                                        </h5>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="class_name_id"
                                                                value="Class"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={Object.values(
                                                            classNames
                                                        )}
                                                        value={
                                                            data.class_name_id
                                                        }
                                                        onChange={(e) =>
                                                            handleClassNameChange(
                                                                e
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.class_name_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="exam_id"
                                                                value="Exam"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Exam"
                                                        data={filteredExams}
                                                        value={data.exam_id}
                                                        onChange={(e) =>
                                                            handleExamChange(e)
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={errors.exam_id}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {Object.keys(classroomExamRoasterData).length >
                                            0 ? (
                                                <div className="col-span-12">
                                                    <div className="flex flex-wrap gap-2.5 mt-2">
                                                        <PrimaryButton
                                                            className="educare-gray-btn-lg-stroke"
                                                            type="button"
                                                            disabled={
                                                                processing
                                                            }
                                                            onClick={(e) =>
                                                                handleReset(e)
                                                            }
                                                        >
                                                            Reset
                                                        </PrimaryButton>

                                                        <PrimaryButton
                                                            className="educare-primary-btn-lg-fill"
                                                            type="submit"
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            Save
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-9 col-span-12">
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Marks Criteria
                                        </h5>
                                    </div>
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Subject Name </th>
                                                    <th>Full Marks</th>
                                                    <th>Pass Marks</th>
                                                    <th>Converted To</th>
                                                </tr>
                                            </thead>
                                            {loading ? (
                                                <Loader></Loader>
                                            ) : (
                                                <tbody>
                                                    {formFields?.length > 0 ? (
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div className="inline-flex">
                                                                    <div className="educare-input-field-styles-px-8 max-w-[60px]">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    data.full_mark
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "full_mark",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                className="block"
                                                                                type="number"
                                                                            />
                                                                            <InputError
                                                                                message={
                                                                                    errors.full_mark
                                                                                }
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <SuccessButton
                                                                            // disabled={processing}
                                                                            type="button"
                                                                            className="educare-secondary-btn-md-fill"
                                                                            onClick={() => {
                                                                                handleCopy(
                                                                                    "full_mark",
                                                                                    data.full_mark
                                                                                );
                                                                            }}
                                                                        >
                                                                            C
                                                                        </SuccessButton>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="inline-flex">
                                                                    <div className="educare-input-field-styles-px-8 max-w-[60px]">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    data.pass_mark
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "pass_mark",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                className="block"
                                                                                type="number"
                                                                            />
                                                                            <InputError
                                                                                message={
                                                                                    errors.pass_mark
                                                                                }
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <SuccessButton
                                                                            // disabled={processing}
                                                                            type="button"
                                                                            className="educare-secondary-btn-md-fill"
                                                                            onClick={() => {
                                                                                handleCopy(
                                                                                    "pass_mark",
                                                                                    data.pass_mark
                                                                                );
                                                                            }}
                                                                        >
                                                                            C
                                                                        </SuccessButton>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="inline-flex">
                                                                    <div className="educare-input-field-styles-px-8 max-w-[60px]">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    data.converted_mark
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "converted_mark",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                className="block"
                                                                                type="number"
                                                                            />
                                                                            <InputError
                                                                                message={
                                                                                    errors.converted_mark
                                                                                }
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <SuccessButton
                                                                            // disabled={processing}
                                                                            type="button"
                                                                            className="educare-secondary-btn-md-fill"
                                                                            onClick={() => {
                                                                                handleCopy(
                                                                                    "converted_mark",
                                                                                    data.converted_mark
                                                                                );
                                                                            }}
                                                                        >
                                                                            C
                                                                        </SuccessButton>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        ""
                                                    )}

                                                    {formFields?.length > 0 ? (
                                                        formFields.map(
                                                            (item, index) => (
                                                                <tr
                                                                    key={index}
                                                                    className="cursor-not-allowed"
                                                                    style={{
                                                                        backgroundColor:
                                                                            item?.is_marking ==
                                                                            0
                                                                                ? "rgb(107 156 227 / 56%)"
                                                                                : "",
                                                                    }}
                                                                    disabled={
                                                                        item?.is_marking ==
                                                                        0
                                                                            ? true
                                                                            : false
                                                                    }
                                                                >
                                                                    <td>
                                                                        {
                                                                            item?.is_marking == 0 ? `${item?.subject_title} - ( ${item?.classroom_section_title} )` : item.subject_title
                                                                        }
                                                                        {"  "}
                                                                        {item?.is_marking ==
                                                                        0 ? (
                                                                            <span className="text-danger text-bold">
                                                                                Non
                                                                                Marking
                                                                            </span>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <div className="educare-input-field-styles-px-8 max-w-[120px]">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={
                                                                                        item.full_mark
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleFormChange(
                                                                                            index,
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                            "full_mark"
                                                                                        )
                                                                                    }
                                                                                    className="block"
                                                                                    type="number"
                                                                                    disabled={
                                                                                        item?.is_marking ==
                                                                                        0
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.full_mark
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="educare-input-field-styles-px-8 max-w-[120px]">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={
                                                                                        item.pass_mark
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleFormChange(
                                                                                            index,
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                            "pass_mark"
                                                                                        )
                                                                                    }
                                                                                    className="block"
                                                                                    type="number"
                                                                                    disabled={
                                                                                        item?.is_marking ==
                                                                                        0
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.pass_mark
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="educare-input-field-styles-px-8 max-w-[120px]">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={
                                                                                        item.converted_mark
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleFormChange(
                                                                                            index,
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                            "converted_mark"
                                                                                        )
                                                                                    }
                                                                                    className="block"
                                                                                    type="number"
                                                                                    disabled={
                                                                                        item?.is_marking ==
                                                                                        0
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.converted_mark
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
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
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
