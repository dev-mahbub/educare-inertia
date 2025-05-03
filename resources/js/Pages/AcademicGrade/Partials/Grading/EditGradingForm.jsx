
import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";
import GradeScaleList from "./GradeScaleList";
import GradeScaleDetail from "./GradeScaleDetail";

export default function EditGradingForm({ grades = [], grade = [] }) {

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        scale_name: grade?.scale_name,
        scale_description: grade?.scale_description,
    });

    const gradingFormData = (e) => {
        e.preventDefault();
        put(route("academic_grade.update", grade.id), data, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleRest = () => {
        setData({
            scale_name: "",
            scale_description: "",
        })
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="lg:col-span-6 col-span-12">
                        <GradeScaleList
                            grades={grades}
                        />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Grade Scale
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={gradingFormData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="scale_name"
                                                                value="Scale name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="scale_name"
                                                        value={
                                                            data.scale_name
                                                        }
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
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="scale_description"
                                                                value="Scale Description"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="scale_description"
                                                        value={
                                                            data.scale_description
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "scale_description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.scale_description
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
                                                        Update
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <GradeScaleDetail />
                    </div>
                </div>
            </div>
        </>
    );
}
