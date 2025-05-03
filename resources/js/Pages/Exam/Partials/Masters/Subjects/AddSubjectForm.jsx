import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import AddSubjectList from "./AddSubjectList";
import SelectInput from "@/Components/SelectInput";
import AddSubjectFilter from "./AddSubjectFilter";

export default function AddSubjectForm() {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        subject_name: "",
        select_learnig_subject: "",
        is_it_practical_paper: "",
        is_it_co_scholastic: "",
    });

    const handleAddSubjectFormData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-PlusCircle"></i>
                                        Add Subject
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAddSubjectFormData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Subject Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        value={
                                                            data.subject_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "subject_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.subject_name
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
                                                                value="Link with e-learning subject"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label=""
                                                        data={[]}
                                                        value={
                                                            data.select_learnig_subject
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "select_learnig_subject",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.select_learnig_subject
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Is it a practical paper ?</h6>
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="is_it_practical_paper"
                                                            value="YES"
                                                            checked={data.is_it_practical_paper === "yes"}
                                                            onChange={() => setData("is_it_practical_paper", "yes")}
                                                        />
                                                        <RadioInput
                                                            name="is_it_practical_paper"
                                                            value="NO"
                                                            checked={data.is_it_practical_paper === "no"}
                                                            onChange={() => setData("is_it_practical_paper", "no")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Is it a Co-Scholastic</h6>
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="is_it_co_scholastic"
                                                            value="YES"
                                                            checked={data.is_it_co_scholastic === "yes"}
                                                            onChange={() => setData("is_it_co_scholastic", "yes")}
                                                        />
                                                        <RadioInput
                                                            name="is_it_co_scholastic"
                                                            value="NO"
                                                            checked={data.is_it_co_scholastic === "no"}
                                                            onChange={() => setData("is_it_co_scholastic", "no")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                    >
                                                        Reset
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                    >
                                                        Save
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                        <AddSubjectFilter />
                        <AddSubjectList />
                    </div>
                </div>
            </div>
        </>
    );
}
