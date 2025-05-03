import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import GradeScaleDetail from "./GradeScaleDetail";
import GradeScaleList from "./GradeScaleList";

export default function GradingForm({ grades, grade }) {
    const [rows, setRows] = useState();
    const [formFields, setFormFields] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState({});
    const [editableIds, setEditableIds] = useState([]);

    const { data, setData, errors, post, reset, processing } = useForm({
        id: "",
        scale_name: "",
        grade_array: rows,
    });

    // new code start
    useEffect(() => {
        setSelectedGrade(grade ?? {});
    }, [grade]);

    useEffect(() => {
        setData({
            id: selectedGrade?.id,
            scale_name: selectedGrade?.scale_name,
        });

        setFormFields(selectedGrade?.academic_grade_items ?? []);
    }, [selectedGrade]);
    // new code end

    const handleGrate = (e, item) => {
        e.preventDefault();

        setSelectedGrade(item);

        // old code
        // setData({
        //     id: item?.id,
        //     scale_name: item?.scale_name,
        //     scale_description: item?.scale_description,
        // });
        // setFormFields(item?.academic_grade_items);
    };

    const gradingFormData = (e) => {
        e.preventDefault();
        post(route("academic_grade.save"), {
            preserveScroll: true,
            onSuccess: () => handleRest(),
        });
    };

    // old code
    // const { flash } = usePage().props;

    // useEffect(() => {
    //     if (flash.message) {
    //         handleRest();
    //     }
    // }, [flash]);

    const handleRest = () => {
        reset();
        setFormFields([]);
        setSelectedGrade({});
        setEditableIds([]);
    };

    return (
        <>
            <form onSubmit={gradingFormData}>
                <div className="educare-classroom-form-area">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="lg:col-span-6 col-span-12">
                            <GradeScaleList
                                grades={grades}
                                data={data}
                                setData={setData}
                                handleGrate={handleGrate}
                            />
                        </div>
                        <div className="lg:col-span-6 col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            {data?.id ? "Update" : "Add"} Grade
                                            Scale
                                        </h5>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="scale_name"
                                                                value="Scale Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="scale_name"
                                                        value={data.scale_name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "scale_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.scale_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        type="button"
                                                        disabled={processing}
                                                        onClick={handleRest}
                                                    >
                                                        Reset
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                        type="submit"
                                                        disabled={processing}
                                                    >
                                                        {data?.id
                                                            ? "Update"
                                                            : "Save"}
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <GradeScaleDetail
                                grades={grades}
                                data={data}
                                setData={setData}
                                errors={errors}
                                post={post}
                                processing={processing}
                                rows={rows}
                                setRows={setRows}
                                formFields={formFields}
                                setFormFields={setFormFields}
                                selectedGrade={selectedGrade}
                                setEditableIds={setEditableIds}
                                editableIds={editableIds}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
