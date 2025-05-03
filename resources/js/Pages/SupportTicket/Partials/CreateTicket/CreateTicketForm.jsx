import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import React from "react";

const CreateTicketForm = ({contactReasons, classrooms, students, teachers}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        request_type: "",
        classroom_id: "",
        student_id: "",
        assigned_to: "",
        details: "",
    });
    
    teachers = teachers.map((teacher) => ({
        id: teacher?.id,
        title: `${teacher?.first_name} ${teacher?.middle_name} ${teacher?.last_name}`,
    }));
    
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;
        setData((preData) => ({
            ...preData,
            classroom_id: classroom_id,
        }));

        router.post(route('support_ticket.create'), {classroom_id: classroom_id});
    }

    const handleTicketSubmit = (e) => {
        e.preventDefault();
        post(route("support_ticket.save") , {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    }
    
    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Add A Ticket
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                    <form onSubmit={handleTicketSubmit}>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 md:col-span-3 lg:col-span-3 sm:col-span-6 max2Xl:col-span-12 minMaxMd:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="request_type"
                                                value="Request Type"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="request_type"
                                        data_label="Request Type"
                                        data={contactReasons}
                                        value={data.request_type}
                                        onChange={(e) =>
                                            setData("request_type", e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.request_type}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-3 lg:col-span-3 sm:col-span-6 max2Xl:col-span-12 minMaxMd:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="classroom_id"
                                                value="Class"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="classroom_id"
                                        data_label="Class"
                                        data={classrooms}
                                        value={data.classroom_id}
                                        onChange={(e) => handleClassroomChange(e)}
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.classroom_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-3 lg:col-span-3 sm:col-span-6 max2Xl:col-span-12 minMaxMd:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="student_id"
                                                value="Student - Admission No"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="student_id"
                                        data_label="Adm. No"
                                        data={students}
                                        value={data.student_id}
                                        onChange={(e) =>
                                            setData(
                                                "student_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.student_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-3 lg:col-span-3 sm:col-span-6 max2Xl:col-span-12 minMaxMd:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="assigned_to"
                                                value="Assign to"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="assigned_to"
                                        data_label="Staff"
                                        data={teachers}
                                        value={data.assigned_to}
                                        onChange={(e) =>
                                            setData("assigned_to", e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.assigned_to}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="details"
                                                value="Comment"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextareaInput
                                        id="details"
                                        value={data.details}
                                        onChange={(e) =>
                                            setData(
                                                "details",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.details}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <PrimaryButton className="educare-gray-btn-lg-stroke" 
                                        type="button"
                                        onClick={reset}
                                    >
                                        Reset
                                    </PrimaryButton>
                                    <PrimaryButton className="educare-primary-btn-lg-fill" 
                                        type="submit"
                                        processing={processing}
                                        disabled={processing}
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
    );
};

export default CreateTicketForm;
