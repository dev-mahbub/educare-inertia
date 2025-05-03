import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";

const PayScaleForm = ({
    data,
    setData,
    errors
}) => {

    const handleForm = (e) => {
        e.preventDefault();
    };

    // handle change form data start
    const handleChangeFormData = (field, value) => {
        if (field == 'basic_pay' || field == 'grade_pay') {
            if(value == '' || isNaN(value)) {
                value = 0;
            } else if(value?.includes('.')) {
                value = String(value)?.split('.')[0] ?? 0;
            }

            value = parseInt(value);
        }

        setData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    }
    // handle change form data end

    return (
        <>
            <form onSubmit={handleForm}>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-card-title mr-auto pb-none mb-5">
                            <h5>
                                Add Pay Scale
                            </h5>
                        </div>
                        {/* Add PayScale form start */}
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="title"
                                                    value="Pay Scale Title"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <TextInput
                                            id="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                handleChangeFormData(
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
                                            value="Description"
                                        />
                                        <TextareaInput
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                handleChangeFormData(
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

                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="basic_pay"
                                                    value="Basic Pay"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <TextInput
                                            id="basic_pay"
                                            value={data?.basic_pay}
                                            onChange={(e) =>
                                                handleChangeFormData("basic_pay", e.target.value)
                                            }
                                            // type='number'
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.basic_pay}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="grade_pay"
                                                    value="Grade Pay"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <TextInput
                                            id="grade_pay"
                                            value={data.grade_pay}
                                            onChange={(e) =>
                                                handleChangeFormData("grade_pay", e.target.value)
                                            }
                                            // type='number'
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.grade_pay}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                        {/* Add PayScale form end */}

                    </div>
                </div>
            </form>
        </>
    );
};

export default PayScaleForm;
