import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const DeductionForm = ({
    selectedData,
    setSelectedData,
    formMode,
    setFormMode
}) => {
    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        clearErrors,
        processing,
        recentlySuccessful,
    } = useForm({
        title: "",
        description: "",
        is_pf: false,
        is_esi: false,
        apply_absent_deduction: false
    });

    useEffect(() => {
        if (selectedData?.id != null) {
            setData(prevData => ({
                ...prevData,
                title: selectedData?.title,
                description: selectedData?.description,
                is_pf: selectedData?.is_pf ?? false,
                is_esi: selectedData?.is_esi ?? false,
                apply_absent_deduction: selectedData?.apply_absent_deduction ?? false
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                title: "",
                description: '',
                is_pf: false,
                is_esi: false,
                apply_absent_deduction: false
            }));
        }
    }, [selectedData]);

    const handleSubmitData = (e) => {
        e.preventDefault();
    };

    // handle save deduction type start
    const handleSaveDeductionType = (e) => {
        e.preventDefault();

        post(route('salary.deduction.save'), {
            onSuccess: () => {
                handleReset();
            }
        });
    }
    // handle save deduction type end

    // handle update deduction type start
    const handleUpdateDeductionType = (e) => {
        e.preventDefault();

        put(route('salary.deduction.update', selectedData?.id), {
            onSuccess: () => {
                handleReset();
            }
        });
    }
    // handle update deduction type end

    // handle reset start
    const handleReset = () => {
        // router.get(route('salary.deduction'));

        reset();
        clearErrors();
        setSelectedData({});
        setFormMode('create');
    }
    // handle reset end


    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Add Deduction Type
                </h5>
            </div>

            <form onSubmit={handleSubmitData}>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="title"
                                                    value="Deducation Type"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="title"
                                            value={data.title || ''}
                                            onChange={(e) =>
                                                setData(
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* {
                                        (data.title === 'Absent Deduction' && data.apply_absent_deduction === true) &&
                                        <p className="text-danger">This earning already exits!</p>
                                    } */}
                                </div>

                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Deducation Description"
                                        />
                                        <TextareaInput
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <div className="flex flex-wrap gap-5">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="is_pf"
                                                    name="is_pf"
                                                    checked={
                                                        data.is_pf
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "is_pf",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="is_pf"
                                                    value="is PF?"
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="is_esi"
                                                    name="is_esi"
                                                    checked={
                                                        data.is_esi
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "is_esi",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="is_esi"
                                                    value="is ESI?"
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="apply_absent_deduction"
                                                    name="apply_absent_deduction"
                                                    checked={
                                                        data.apply_absent_deduction
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "apply_absent_deduction",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="apply_absent_deduction"
                                                    value="Apply Absent Deduction"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                        <PrimaryButton
                                            className="educare-gray-btn-lg-stroke"
                                            type="button"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </PrimaryButton>

                                        {formMode == 'create' &&
                                            <PrimaryButton
                                                className="educare-primary-btn-lg-fill"
                                                type="button"
                                                onClick={handleSaveDeductionType}
                                            >
                                                Save Deduction Type
                                            </PrimaryButton>
                                        }

                                        {formMode == 'edit' &&
                                            <PrimaryButton
                                                className="educare-primary-btn-lg-fill"
                                                type="button"
                                                onClick={handleUpdateDeductionType}
                                            >
                                                Update Deduction Type
                                            </PrimaryButton>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default DeductionForm;
