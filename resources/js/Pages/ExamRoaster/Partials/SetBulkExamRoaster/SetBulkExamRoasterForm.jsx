import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function SetBulkExamRoasterForm({
    bulkExamRoaster = [],
    exams,
    classnames,
    examRoasterData
}) {

    const [formField, setFormField] = useState([]);
    const [classIds, setClassIds] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        exam_id: "",
        full_mark: "",
        pass_mark: "",
        converted_mark: "",
        biology_full_mark: "",
        biology_pass_mark: "",
        biology_converted_mark: "",
        checkbox_x: "",
        checkbox_xi: "",
        checkbox_vii: "",
        classroom_ids: [],
        classroom_exam_date_array: formField,
    });

    const handleFormChange = (index, value, field) => {
        const updateField = [...formField]
        updateField[index][field] = value;
        setFormField(updateField);
    }

    const handleCopy = (field, value) => {
        const updateField = [...formField]

        if (field == 'full_mark') {
            setFormField(updateField?.map((item) => ({
                ...item,
                full_mark: value
            })))
        }

        if (field == 'pass_mark') {
            setFormField(updateField?.map((item) => ({
                ...item,
                pass_mark: value
            })))
        }

        if (field == 'converted_mark') {
            setFormField(updateField?.map((item) => ({
                ...item,
                converted_mark: value
            })))
        }
    }

    const setClassId = (id) => {
        if (classIds?.includes(id)) {
            setClassIds(classIds?.filter(item => item != id));
        }
        else {
            setClassIds([...classIds, id]);
        }
    }

    const handleSubjectChange = (event) => {
        event.preventDefault();
        const form_data = {
            exam_id: data?.exam_id,
            class_name_ids: classIds,
        }
        setLoading(false);
        router.post(route('exam_roaster.set_bulk'), form_data)
    }

    // console.log(classIds);

    const handleSetExamRoasterData = (e) => {
        e.preventDefault();
        post(route("exam_roaster.set_bulk.saveData"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleExam = (id) => {
        setClassIds([]);
        router.post(route('exam_roaster.set_bulk'), { exam_id: id });
    }

    const handleReset = (e) => {
        e.preventDefault();
        setLoading(false);
        router.get(route('exam_roaster.set_bulk'));
    }

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_exam_date_array: formField
        }));
    }, [formField]);

    useEffect(() => {
        setFormField(Object.values(examRoasterData)?.map((item, index) => ({
            id: item.id,
            classroom_subject_id: item.classroom_subject_id,
            exam_id: item.exam_id,
            subject_id: item.subject_id,
            classroom_ids: item.classroom_ids,
            subject_title: item.subject_title,
            full_mark: item.full_mark,
            pass_mark: item.pass_mark,
            converted_mark: item.converted_mark,
        })))
        setLoading(false);
    }, [examRoasterData]);


    return (
        <>
            <div className="educare-classroom-form-area">
                <form onSubmit={handleSetExamRoasterData}>
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-4 col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Set Exam Marks
                                        </h5>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="exam_id"
                                                                value="Exams"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Exam"
                                                        data={exams}
                                                        value={
                                                            data.exam_id
                                                        }
                                                        onChange={(e) => {
                                                            setData(
                                                                "exam_id",
                                                                e.target.value
                                                            )
                                                            handleExam(e.target.value);
                                                        }

                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.exam_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            {Object.keys(classnames)?.length > 0 &&
                                                <div className="col-span-12">
                                                    <div>
                                                        <h6 className="font-semibold text-headingLight">
                                                            SELECT CLASS
                                                        </h6>
                                                    </div>

                                                    <div className="grid grid-cols-12 gap-5 py-3">
                                                        {
                                                            Object.values(classnames)?.map((item, index) => (
                                                                <div className="col-span-4" key={index}>
                                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                        <div className="educare-create-school-settings-list-check width-full">
                                                                            <Checkbox
                                                                                id="checkbox_x"
                                                                                name="checkbox_x"
                                                                                checked={
                                                                                    classIds?.includes(item?.id)
                                                                                }
                                                                                onChange={(e) =>
                                                                                    setClassId(item?.id)
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="educare-create-school-settings-list-title width-full">
                                                                            <InputLabel
                                                                                htmlFor="checkbox_x"
                                                                                value={item.title}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>


                                                    <div className="col-span-12">
                                                        <div className="flex flex-wrap gap-2.5 mt-2">
                                                            <PrimaryButton
                                                                className="educare-gray-btn-lg-stroke"
                                                                type="button"
                                                                onClick={(e) =>
                                                                    handleReset(e)
                                                                }
                                                                disabled={processing}
                                                            >
                                                                Reset
                                                            </PrimaryButton>
                                                            <PrimaryButton
                                                                type="button"
                                                                className="educare-primary-btn-lg-fill"
                                                                onClick={(e) =>
                                                                    handleSubjectChange(e)
                                                                }
                                                                disabled={processing}
                                                            >
                                                                Get Subject
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>

                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 col-span-12">
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="flex justify-between mb-2">
                                        <div className="educare-card-title">
                                            <h5>
                                                <i className="icon-ListBullets"></i>
                                                Subject List
                                            </h5>
                                        </div>
                                        {formField?.length > 0 ? <PrimaryButton
                                            disabled={processing}
                                            className="educare-primary-btn-md-fill"
                                            type="submit"
                                        >
                                            Save Roaster
                                        </PrimaryButton> : ''}
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
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "full_mark",
                                                                                    e.target.value
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
                                                                        type="button"
                                                                        className="educare-secondary-btn-md-fill"
                                                                        onClick={() => (
                                                                            handleCopy('full_mark', data.full_mark)
                                                                        )}
                                                                        disabled={processing}
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
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "pass_mark",
                                                                                    e.target.value
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
                                                                        type="button"
                                                                        className="educare-secondary-btn-md-fill"
                                                                        onClick={() => (
                                                                            handleCopy('pass_mark', data.pass_mark)
                                                                        )}
                                                                        disabled={processing}
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
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "converted_mark",
                                                                                    e.target.value
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
                                                                        type="button"
                                                                        className="educare-secondary-btn-md-fill"
                                                                        onClick={() => (
                                                                            handleCopy('converted_mark', data.converted_mark)
                                                                        )}
                                                                        disabled={processing}

                                                                    >
                                                                        C
                                                                    </SuccessButton>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4}>
                                                            <h5 className="font-bold text-headingLight">
                                                                Common Subject
                                                            </h5>
                                                        </td>
                                                    </tr>
                                                    {formField?.length > 0 ?
                                                        formField?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.subject_title}</td>
                                                                <td>
                                                                    <div className="educare-input-field-styles-px-8 max-w-[120px]">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    item.full_mark
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleFormChange(index, e.target.value, 'full_mark')
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
                                                                </td>
                                                                <td>
                                                                    <div className="educare-input-field-styles-px-8 max-w-[120px]">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    item.pass_mark
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleFormChange(index, e.target.value, 'pass_mark')
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
                                                                </td>
                                                                <td>
                                                                    <div className="educare-input-field-styles-px-8 max-w-[120px]">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    item.converted_mark
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleFormChange(index, e.target.value, 'converted_mark')
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
                                                                </td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr>
                                                            <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                                        </tr>
                                                    }
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
