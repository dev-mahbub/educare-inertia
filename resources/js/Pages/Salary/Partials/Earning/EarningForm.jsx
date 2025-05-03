import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const EarningForm = ({
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
    });

    useEffect(() => {
        if (selectedData?.id != null) {
            setData(prevData => ({
                ...prevData,
                title: selectedData?.title,
                description: selectedData?.description
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                title: "",
                description: ''
            }));
        }
    }, [selectedData]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // handle save earning type start
    const handleSaveEarningType = (e) => {
        e.preventDefault();

        post(route('salary.earning.save'), {
            onSuccess: () => {
                handleReset();
            }
        });
    }
    // handle save earning type end

    // handle update earning type start
    const handleUpdateEarningType = (e) => {
        e.preventDefault();

        put(route('salary.earning.update', selectedData?.id), {
            onSuccess: () => {
                handleReset();
            }
        });
    }
    // handle update earning type end

    // handle reset start
    const handleReset = () => {
        // router.get(route('salary.earning'));

        reset();
        clearErrors();
        setSelectedData({});
        setFormMode('create');
    }
    // handle reset end

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-[11px]">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Add Earning Type
                </h5>
            </div>

            <form onSubmit={handleSubmit}>
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
                                                    value="Earning Type"
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
                                </div>

                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Earning Description"
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
                                                onClick={handleSaveEarningType}
                                            >
                                                Save Earning Type
                                            </PrimaryButton>
                                        }

                                        {formMode == 'edit' &&
                                            <PrimaryButton
                                                className="educare-primary-btn-lg-fill"
                                                type="button"
                                                onClick={handleUpdateEarningType}
                                            >
                                                Update Earning Type
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

export default EarningForm;
