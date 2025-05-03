import RadioInput from "@/Components/RadioInput";
import React from "react";
import { useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
const RegistrationFormTable = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_class: "",
        select_individual: "",
        staffType: "class_wise",
    });

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-user"></i>
                    Generate Student Registration Form
                </h5>
            </div>

            <div className="grid grid-cols-12 gap-5 mb-2.5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <RadioInput
                        name="staffType"
                        value="Class wise"
                        checked={data.staffType === "class_wise"}
                        onChange={() => setData("staffType", "class_wise")}
                    />
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <RadioInput
                        name="staffType"
                        value="Individual"
                        checked={data.staffType === "individual"}
                        onChange={() => setData("staffType", "individual")}
                    />
                </div>
            </div>
            {/* form ==== */}

            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="select_class"
                            data_label="Class"
                            data={[]}
                            value={data.select_class}
                            onChange={(e) =>
                                setData("select_class", e.target.value)
                            }
                            className="block"
                        />
                        <InputError
                            message={errors.select_class}
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    {data.staffType === "individual" && (
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="select_individual"
                                data_label="Individual"
                                data={[]}
                                value={data.select_individual}
                                onChange={(e) =>
                                    setData("select_individual", e.target.value)
                                }
                                className="block"
                            />
                            <InputError
                                message={errors.select_individual}
                                className="mt-2"
                            />
                        </div>
                    )}
                </div>

                <div className="col-span-12">
                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                        <PrimaryButton className="educare-primary-btn-lg-fill">
                            View
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegistrationFormTable;
