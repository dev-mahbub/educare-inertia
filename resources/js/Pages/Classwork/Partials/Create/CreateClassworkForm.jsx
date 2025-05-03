import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm, router } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import Checkbox from "@/Components/Checkbox";
import TextareaInput from "@/Components/TextareaInput";

export default function CreateClassworkForm({ subjects, classNames, classRoom }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        subject_id: "",
        class_name_id: "",
        title: "",
        description: "",
        start_date_at: "",
        end_date_at: "",
        class_va: "",
        class_vb: "",
        assigned_to_class: "",
        allow_submission: "",
        class_file: "",
        classroom_ids: []
    });

    // handle insert data
    const handleInsert = (e) => {
        e.preventDefault();
        data.start_date_at = startDate;
        data.end_date_at = endDate;
        post(route("classwork.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStartDate(new Date())
                setEndDate(new Date())
            }
        });
    };

    // handle check start
    const handleClassworkClassSelect = (name, value) => {
        let newFormData = { ...data };

        if (name === 'allow_all_class_id') {
            newFormData = {
                ...newFormData,
                [name]: value
            };

            if (value) {
                newFormData.classroom_ids = classRoom.map(classRoom => classRoom.id);
            } else {
                newFormData.classroom_ids = [];
            }
        } else {
            const classWorkId = parseInt(name.split('_').pop(), 10);

            if (value) {
                newFormData.classroom_ids = [...new Set([...data.classroom_ids, classWorkId])];
            } else {
                newFormData.classroom_ids = data.classroom_ids.filter(id => id !== classWorkId);
            }

            const allChecked = classRoom.every(classRoom => newFormData.classroom_ids.includes(classRoom.id));
            newFormData.allow_all_class_id = allChecked;
        }

        setData(newFormData);
    };
    // handle check end

    //repeatable form fields start
    const [formFields, setFormFields] = useState([
        { classwork_subtitle_input_id: "", classwork_subtitle_select_id: "" },
    ]);

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.classwork_subtitle_input_id] =
            event.target.value;
        setFormFields(data);
    };
    const addFields = () => {
        let object = {
            classwork_subtitle_input_id: "",
            classwork_subtitle_select_id: "",
        };
        setFormFields([...formFields, object]);
    };
    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        setFormFields(data);
    };
    //handle class name 
    const handleClassName = (event) => {
        const classNameVal = event.target.value;
        setData("class_name_id", event.target.value)
        router.post(route('classwork.create'), { class_name_id: classNameVal })
    }
    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={handleInsert}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-info"></i>
                                            Create Classwork
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Classwork Title"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="title"
                                                        value={
                                                            data.title
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 xl:col-span-3 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="class_name_id"
                                                                value="Select a class"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="class_name_id"
                                                        data_label="class"
                                                        data={classNames}
                                                        value={
                                                            data.class_name_id
                                                        }
                                                        onChange={(e) => handleClassName(e)}
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.class_name_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-3 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="subject_id"
                                                                value="Select a subject"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="subject_id"
                                                        data_label="Subject"
                                                        data={subjects}
                                                        value={data.subject_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "subject_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.subject_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-3 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel value="Classwork Date" />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) =>
                                                            setStartDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Start date"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.start_date_at
                                                        }
                                                        className="mt-2"
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-3 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel value="Submission Date" />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) =>
                                                            setEndDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="End date"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.end_date_at
                                                        }
                                                        className="mt-2"
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Classwork Details"
                                                    />
                                                    <TextareaInput
                                                        id="description"
                                                        value={
                                                            data.description
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-2 md:col-span-6">
                                                <div className="educare-checkbox-field-styles">
                                                    <InputLabel
                                                        htmlFor="allow_all_class_id"
                                                        value="All Class"
                                                    />
                                                    <Checkbox
                                                        name="allow_all_class_id"
                                                        checked={
                                                            data.allow_all_class_id || false
                                                        }
                                                        onChange={(e) =>
                                                            handleClassworkClassSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-5">
                                                    {
                                                        classRoom.length > 0 ? (
                                                            classRoom.map((classRoom, index) => (
                                                                <div key={index} className="col-span-12 lg:col-span-2 md:col-span-6">
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <InputLabel
                                                                            htmlFor={"class_work_" + classRoom.id}
                                                                            value={classRoom.title}
                                                                        />
                                                                        <Checkbox
                                                                            name={"class_work_" + classRoom.id}
                                                                            checked={data.classroom_ids.includes(classRoom.id)}
                                                                            onChange={(e) =>
                                                                                handleClassworkClassSelect(e.target.name, e.target.checked)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-5">
                                                    <div className="educare-checkbox-field-styles">
                                                        <InputLabel
                                                            htmlFor="assigned_to_class"
                                                            value="Assigned to class"
                                                        />
                                                        <Checkbox
                                                            name="assigned_to_class"
                                                            checked={
                                                                data.assigned_to_class
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "assigned_to_class",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-checkbox-field-styles">
                                                        <InputLabel
                                                            htmlFor="allow_submission"
                                                            value="Allow Submission"
                                                        />
                                                        <Checkbox
                                                            name="allow_submission"
                                                            id="allow_submission"
                                                            checked={
                                                                data.allow_submission
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "allow_submission",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 hidden">
                                                <div className="educare-repeatable-input-field-styles">
                                                    <h6 className="text-[15px] text-headingLight mb-1 font-medium">
                                                        Sub Title
                                                    </h6>
                                                    <div className="flex flex-col gap-4">
                                                        {formFields.map((form, index) => (
                                                            <div
                                                                key={index}
                                                                className="educare-repeatable-input-field-style-single"
                                                            >
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="assessment_subtitle_input_id"
                                                                        name="assessment_subtitle_input_id"
                                                                        onChange={(event) => handleFormChange(event, index, "assessment_subtitle_input_id")}
                                                                        value={form.assessment_subtitle_input_id}
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.assessment_subtitle_input_id
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className="educare-select-field-styles">
                                                                    <SelectInput
                                                                        id="assessment_subtitle_select_id"
                                                                        name="assessment_subtitle_select_id"
                                                                        data_label="Subject"
                                                                        data={[]}
                                                                        onChange={(event) => handleFormChange(event, index, "assessment_subtitle_select_id")}
                                                                        value={form.assessment_subtitle_select_id}
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.assessment_subtitle_select_id
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className="educare-repeatable-input-field-style-single-btn">
                                                                    {index >
                                                                        0 ? (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeFields(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="icon-minus"></i>
                                                                        </button>
                                                                    ) : null}
                                                                    <button
                                                                        className={`${index >
                                                                            0
                                                                            ? "hidden"
                                                                            : "inline-block"
                                                                            }`}
                                                                        type="button"
                                                                        onClick={
                                                                            addFields
                                                                        }
                                                                    >
                                                                        <i className="icon-plus"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Upload Document" />
                                                    <div className="educare-input-type-file-styles">
                                                        <input
                                                            id="class_file"
                                                            type="file"
                                                            name="class_file"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "class_file",
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.class_file
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-6">
                                                <div className="educare-input-field-notes">
                                                    <h6>Note :</h6>
                                                    <ul>
                                                        <li>
                                                            1. File
                                                            format-png,bmp,jpg,jpeg,doc,docx,xlsx,
                                                            Pdf Files allowed.
                                                        </li>
                                                        <li>
                                                            2. Maximum File Size
                                                            15Mb.
                                                        </li>
                                                        <li>
                                                            1. File
                                                            format-png,bmp,jpg,jpeg,doc,docx,xlsx,
                                                            Pdf Files allowed.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* school details form start */}
                        </div>
                    </div>
                </div>
                <div className="educare-button-field-styles mt-2.5 text-end">
                    <PrimaryButton
                        disabled={processing}
                        className="h-12 bg-primary text-white text-[16px] rounded-md font-medium px-6 font-primary inline-block"
                    >
                        Add class work
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
