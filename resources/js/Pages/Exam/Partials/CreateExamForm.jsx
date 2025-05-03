import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import DatePicker from "react-datepicker";
import { Editor } from "@tinymce/tinymce-react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import Dropdown from "@/Components/Dropdown";
import ToggleCheckboxInput from "@/Components/ToggleCheckboxInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";


export default function CreateExamForm({ className = "" }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        create_exam_name_id: "",
        create_exam_code_id: "",
        create_exam_mode_id: "",
        create_exam_grade_id: "",
        create_exam_subject_id: "",
        create_exam_total_marks_id: "",
        create_exam_pass_marks_id: "",
        create_exam_hour_id: "",
        create_exam_minute_id: "",
        shuffle_question_order: "",
        display_result_on_submit_exam: "",
        end_exam_on_time: "",
        exam_live_monitoring_Link: "",
        // filter
        question_search: "",
        exam_language_id: "",
        difficulty_level_id: "",
        question_type_id: "",
        question_topic_id: "",
        question_passage_id: "",
        all_question_id: "",
        //checkbox
        exam_check_id_parent: false,
        exam_check_id_2: false,
        exam_check_id_3: false,
        //order
        question_order_a: "",
        question_order_b: "",
        assign_check_yes_id_1: "",
        assign_check_yes_id_2: "",
        assign_question_check_id_1: "",
        assign_question_check_id_2: "",

    });

    //for textarea
    const editorRef = useRef(null);

    const createExamData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.school_name) {
                //     reset("school_name");
                //     titleInput.current.focus();
                // }
            },
        });
    };

    //stepper function start
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        if (activeStep < 3) {
            // Limit to 3 steps
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    //stepper function end

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    //handle checkbox start
    const handleCheckboxChange = (name, value) => {
        let newFormData;

        if (name === 'exam_check_id_parent') {
            newFormData = {
                ...data,
                [name]: value,
                exam_check_id_2: value,
                exam_check_id_3: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            if (value === false) {
                newFormData.exam_check_id_parent = false;
            } else if (
                Object.values(newFormData).slice(1).every(Boolean) &&
                !newFormData.exam_check_id_parent
            ) {
                newFormData.exam_check_id_parent = true;
            }
        }

        setData(newFormData);
    };
    //handle checkbox end

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={createExamData}>
                <div className="educare-stepper-area">
                    <Box sx={{ width: "100%" }}>
                        <div className="educare-exam-stepper-label mb-5">
                            <Stepper activeStep={activeStep}>
                                <Step>
                                    <StepLabel>Create Exam</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Assign Questions</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Assigns Grades</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Finished</StepLabel>
                                </Step>
                            </Stepper>
                        </div>

                        {activeStep === 0 && (
                            <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                                <div className="lg:col-span-12 col-span-12">
                                    <div className="educare-create-school-settings educare-exam-create-form">
                                        <div className="educare-create-school-settings-form-wrap">
                                            <div className="educare-create-school-settings-wrap bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pb-[26px] pt-[24px] maxXs:p-[15px] rounded-lg">
                                                <div className="educare-create-school-settings flex flex-col gap-y-6">
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Name
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        data.create_exam_name_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "create_exam_name_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.create_exam_name_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Code
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        data.create_exam_code_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "create_exam_code_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.create_exam_code_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Exam Mode
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput
                                                                    data_label="exam mode"
                                                                    data={[]}
                                                                    value={
                                                                        data.create_exam_mode_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "create_exam_mode_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                />

                                                                <InputError
                                                                    message={
                                                                        errors.create_exam_mode_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Grade
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput
                                                                    data_label="grade"
                                                                    data={[]}
                                                                    value={
                                                                        data.create_exam_grade_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "create_exam_grade_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                />

                                                                <InputError
                                                                    message={
                                                                        errors.create_exam_grade_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Subject
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput
                                                                    data_label="subject"
                                                                    data={[]}
                                                                    value={
                                                                        data.create_exam_subject_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "create_exam_subject_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                />

                                                                <InputError
                                                                    message={
                                                                        errors.create_exam_subject_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Start Time
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <DatePicker
                                                                    selected={
                                                                        startDate
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) =>
                                                                        setStartDate(
                                                                            date
                                                                        )
                                                                    }
                                                                    closeOnScroll={
                                                                        true
                                                                    }
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    placeholderText="Start date"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                End Time
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <DatePicker
                                                                    selected={
                                                                        endDate
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) =>
                                                                        setEndDate(
                                                                            date
                                                                        )
                                                                    }
                                                                    closeOnScroll={
                                                                        true
                                                                    }
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    placeholderText="End date"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Instruction Time
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="grid grid-cols-12 gap-y-6">
                                                                <div className="col-span-12">
                                                                    <div className="educare-input-field-styles">
                                                                        <TextInput
                                                                            value={
                                                                                data.create_exam_hour_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "create_exam_hour_id",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            type="text"
                                                                            className="block"
                                                                            placeHolder="Hour"
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors.create_exam_hour_id
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-12">
                                                                    <div className="educare-input-field-styles">
                                                                        <TextInput
                                                                            value={
                                                                                data.create_exam_minute_id
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "create_exam_minute_id",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            type="text"
                                                                            className="block"
                                                                            placeHolder="Minute"
                                                                        />
                                                                        <InputError
                                                                            message={
                                                                                errors.create_exam_minute_id
                                                                            }
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list font-primary">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Instructions
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <Editor apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou' onInit={(evt,
                                                                    editor) => editorRef.current = editor}
                                                                    initialValue="<p>This is the initial content of the editor.</p>"
                                                                    init={{
                                                                        height: 500,
                                                                        menubar: true,
                                                                        plugins: [
                                                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                                        ],
                                                                        toolbar: 'undo redo | blocks | ' +
                                                                            'bold italic forecolor | alignleft aligncenter ' +
                                                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                            'removeformat | help',
                                                                        content_style: 'body { font-family: "Inter", sans-serif; font-size:14px }'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Total Marks
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        data.create_exam_total_marks_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "create_exam_total_marks_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.create_exam_total_marks_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Pass Marks
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        data.create_exam_pass_marks_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "create_exam_pass_marks_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.create_exam_pass_marks_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Shuffle question
                                                                order
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <label className="inline-block">
                                                                <Checkbox
                                                                    name="shuffle_question_order"
                                                                    checked={
                                                                        data.shuffle_question_order
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "shuffle_question_order",
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        )
                                                                    }
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Display result
                                                                on submit exam
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <label className="inline-block">
                                                                <Checkbox
                                                                    name="display_result_on_submit_exam"
                                                                    checked={
                                                                        data.display_result_on_submit_exam
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "display_result_on_submit_exam",
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        )
                                                                    }
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                End exam on time
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <label className="inline-block">
                                                                <Checkbox
                                                                    name="end_exam_on_time"
                                                                    checked={
                                                                        data.end_exam_on_time
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "end_exam_on_time",
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        )
                                                                    }
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list">
                                                        <div className="educare-create-school-settings-list-title">
                                                            <h6>
                                                                Exam live
                                                                monitoring Link
                                                            </h6>
                                                        </div>
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        data.exam_live_monitoring_Link
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "exam_live_monitoring_Link",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.exam_live_monitoring_Link
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] py-[26px] rounded-lg">
                                <div className="educare-header-search-bar-main">
                                    <div className="educare-header-search-bar-left flex items-center gap-2">
                                        <i className="icon-info text-[18px]"></i>
                                        <h5 className="text-[18px] font-semibold text-headingLight">
                                            Search Questions
                                        </h5>
                                    </div>
                                    <div className="educare-header-search-bar-right maxXs:flex-grow">
                                        <div className="educare-header-search-bar-form">
                                            <div className="educare-header-search-form-box">
                                                <TextInput
                                                    value={
                                                        data.search
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "question_search",
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                    placeHolder="Search Questions"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.question_search
                                                    }
                                                    className="mt-2"
                                                />
                                                <button type="submit">
                                                    <i className="icon-search-interface-symbol text-[18px] text-heading"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/******************* filter start************************/}
                                <div className="educare-admission-filtar-bar-area z-[4] relative">
                                    <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                                        <div className="educare-header-filtar-bar-main">
                                            <form>
                                                <div className=" educare-header-filtar-bar-inner-main">
                                                    <div className="educare-admission-filtar-bar-count">
                                                        <span>Total: 8</span>
                                                    </div>
                                                    <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                                        <div className="educare-header-filtar-bar-fields-area relative">
                                                            <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                                            <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                                                <div className="educare-select-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="exam_language_id"
                                                                        value=""
                                                                    />
                                                                    <SelectInput
                                                                        data_label="Language"
                                                                        data={[]}
                                                                        value={
                                                                            data.exam_language_id
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "exam_language_id",
                                                                                e.target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        type="text"
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.exam_language_id
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className="educare-select-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="difficulty_level_id"
                                                                        value=""
                                                                    />
                                                                    <SelectInput
                                                                        data_label="Level"
                                                                        data={[]}
                                                                        value={
                                                                            data.difficulty_level_id
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "difficulty_level_id",
                                                                                e.target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        type="text"
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.difficulty_level_id
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className="educare-input-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="question_type_id"
                                                                        value=""
                                                                    />
                                                                    <SelectInput
                                                                        data_label="Question Type"
                                                                        data={[]}
                                                                        value={
                                                                            data.question_type_id
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "question_type_id",
                                                                                e.target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        type="text"
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.question_type_id
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className="educare-select-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="question_topic_id"
                                                                        value=""
                                                                    />
                                                                    <SelectInput
                                                                        id="question_topic_id"
                                                                        data_label="Topic"
                                                                        data={[]}
                                                                        value={
                                                                            data.topic
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "question_topic_id",
                                                                                e.target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        type="text"
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.question_topic_id
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className="educare-select-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="question_passage_id"
                                                                        value=""
                                                                    />
                                                                    <NativeSelectInput
                                                                        data_label="Passage"
                                                                        data={[]}
                                                                        value={
                                                                            data.passage
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "question_passage_id",
                                                                                e.target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        type="text"
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.question_passage_id
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className="educare-select-field-styles">
                                                                    <InputLabel
                                                                        htmlFor="all_question_id"
                                                                        value=""
                                                                    />
                                                                    <SelectInput
                                                                        id="all_question_id"
                                                                        data_label="All Question"
                                                                        data={[]}
                                                                        value={
                                                                            data.all_question_id
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "all_question_id",
                                                                                e.target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        type="text"
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.all_question_id
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                                        </div>
                                                    </div>
                                                    <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                                        
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/******************* filter end************************/}
                                <div className="educare-admission-list-area">
                                    <div className="educare-admission-list-inner">
                                        <div className="educare-admission-list-inner-wrapper">
                                            <div className="educare-admission-list educare-stepper-exam-list">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <div className="educare-checkbox-styles">
                                                                    <label className="inline-block">
                                                                        <Checkbox
                                                                            name="exam_check_id_parent"
                                                                            checked={
                                                                                data.exam_check_id_parent
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleCheckboxChange(
                                                                                    e.target
                                                                                        .name,
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </th>
                                                            <th>Question</th>
                                                            <th>Question Type</th>
                                                            <th>Marks</th>
                                                            <th>Grade/Sub.</th>
                                                            <th>Order</th>
                                                            <th>Difficulty</th>
                                                            <th>Assign</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="educare-checkbox-styles">
                                                                    <label className="inline-block">
                                                                        <Checkbox
                                                                            name="exam_check_id_2"
                                                                            checked={
                                                                                data.exam_check_id_2
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleCheckboxChange(
                                                                                    e.target
                                                                                        .name,
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                2 Comes after 5
                                                            </td>
                                                            <td>
                                                                Yes/No or True/False
                                                            </td>
                                                            <td>2</td>
                                                            <td>V/English</td>
                                                            <td>
                                                                <div className="educare-input-field-styles educare-exam-field-order">
                                                                    <TextInput
                                                                        value={data.question_order_a}
                                                                        onChange={(e) => setData("question_order_a", e.target.value)}
                                                                        placeHolder="0"
                                                                        type="text"
                                                                        className="block"
                                                                    />
                                                                    <InputError message={errors.question_order_a} className="mt-2" />
                                                                </div>
                                                            </td>
                                                            <td>Easy</td>
                                                            <td>
                                                                <div className="educare-toggle-checkbox-button-styles">
                                                                    <ToggleCheckboxInput
                                                                        id="assign_check_yes_id_1"
                                                                        name="assign_check_yes_id_1"
                                                                        checked={
                                                                            data.assign_check_yes_id_1
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "assign_check_yes_id_1",
                                                                                e.target
                                                                                    .checked
                                                                            )
                                                                        }
                                                                    />
                                                                    <label htmlFor="assign_check_yes_id_1">
                                                                        <span className="on">Yes</span>
                                                                        <span className="off">No</span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="educare-admission-list-action-btn">
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Dropdown>
                                                                            <Dropdown.Trigger>
                                                                                <div
                                                                                    type="button"
                                                                                    className="educare-dropdown-menu"
                                                                                >
                                                                                    <PrimaryButton className="bg-dark/80 inline-block">
                                                                                        <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                    </PrimaryButton>
                                                                                </div>
                                                                            </Dropdown.Trigger>

                                                                            <Dropdown.Content>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-FilePlus text-[20px] text-supportingA"></i>{" "}
                                                                                    Push To Registration
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-ChartBarHorizontal text-[20px] text-supportingA"></i>{" "}
                                                                                    Follow Up
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-TrashSimple text-[20px] text-supportingA"></i>{" "}
                                                                                    Delete Enquiry
                                                                                </Dropdown.Link>
                                                                            </Dropdown.Content>
                                                                        </Dropdown>
                                                                    </div>
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Link href="#" className="bg-danger/80 inline-block">
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="educare-checkbox-styles">
                                                                    <label className="inline-block">
                                                                        <Checkbox
                                                                            name="exam_check_id_3"
                                                                            checked={
                                                                                data.exam_check_id_3
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleCheckboxChange(
                                                                                    e.target
                                                                                        .name,
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                10
                                                            </td>
                                                            <td>
                                                                Peter
                                                            </td>
                                                            <td>Jhon</td>
                                                            <td>XI</td>
                                                            <td>
                                                                <div className="educare-input-field-styles educare-exam-field-order">
                                                                    <TextInput
                                                                        id="question_order_b"
                                                                        value={data.question_order_b}
                                                                        onChange={(e) => setData("question_order_b", e.target.value)}
                                                                        placeHolder="0"
                                                                        type="text"
                                                                        className="block"
                                                                    />
                                                                    <InputError message={errors.question_order_b} className="mt-2" />
                                                                </div>
                                                            </td>
                                                            <td>004658744</td>
                                                            <td>
                                                                <div className="educare-toggle-checkbox-button-styles">
                                                                    <ToggleCheckboxInput
                                                                        id="assign_check_yes_id_2"
                                                                        name="assign_check_yes_id_2"
                                                                        checked={
                                                                            data.assign_check_yes_id_2
                                                                        }
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "assign_check_yes_id_2",
                                                                                e.target
                                                                                    .checked
                                                                            )
                                                                        }
                                                                    />
                                                                    <label htmlFor="assign_check_yes_id_2">
                                                                        <span className="on">Yes</span>
                                                                        <span className="off">No</span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="educare-admission-list-action-btn">
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Dropdown>
                                                                            <Dropdown.Trigger>
                                                                                <div
                                                                                    type="button"
                                                                                    className="educare-dropdown-menu"
                                                                                >
                                                                                    <PrimaryButton className="bg-dark/80 inline-block">
                                                                                        <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                    </PrimaryButton>
                                                                                </div>
                                                                            </Dropdown.Trigger>

                                                                            <Dropdown.Content>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-FilePlus text-[20px] text-supportingA"></i>{" "}
                                                                                    Push To Registration
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-ChartBarHorizontal text-[20px] text-supportingA"></i>{" "}
                                                                                    Follow Up
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-TrashSimple text-[20px] text-supportingA"></i>{" "}
                                                                                    Delete Enquiry
                                                                                </Dropdown.Link>
                                                                            </Dropdown.Content>
                                                                        </Dropdown>
                                                                    </div>
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Link href="#" className="bg-danger/80 inline-block">
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeStep === 2 && (
                            <div className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] py-[26px] rounded-lg">
                                <div className="educare-admission-list-area">
                                    <div className="educare-admission-list-inner">
                                        <div className="educare-admission-list-inner-wrapper">
                                            <div className="educare-admission-list educare-stepper-assign-grade-list">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Class</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                Class Pr 1
                                                            </td>
                                                            <td>
                                                                <div className="educare-checkbox-styles">
                                                                    <label className="inline-block">
                                                                        <Checkbox
                                                                            name="assign_question_check_id_1"
                                                                            checked={
                                                                                data.assign_question_check_id_1
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "assign_question_check_id_1",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Class Pr 2
                                                            </td>
                                                            <td>
                                                                <div className="educare-checkbox-styles">
                                                                    <label className="inline-block">
                                                                        <Checkbox
                                                                            name="assign_question_check_id_2"
                                                                            checked={
                                                                                data.assign_question_check_id_2
                                                                            }
                                                                            onChange={(e) =>
                                                                                setData(
                                                                                    "assign_question_check_id_2",
                                                                                    e.target
                                                                                        .checked
                                                                                )
                                                                            }
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 3 && (
                            <div className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] py-[26px] maxXs:p-[15px] rounded-lg">
                                <p className="text-[16px] text-headingLight">Class assigned successfully, Publish your exam in exam listing so students can participate. You can also download as PDF file to crosscheck your exam.</p>
                            </div>
                        )}

                        <div className="educare-exam-stepper-btn mt-5 bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] maxXs:p-[15px] rounded-lg">
                            <SecondaryButton
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </SecondaryButton>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(activeStep) && (
                                <SecondaryButton
                                    className="mr-4"
                                    onClick={handleSkip}
                                    sx={{ mr: 1 }}
                                >
                                    Skip
                                </SecondaryButton>
                            )}

                            {activeStep === 3 ? (
                                <PrimaryButton
                                    className="inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
                                    onClick={handleReset}
                                >
                                    Finish
                                </PrimaryButton>
                            ) : (
                                <PrimaryButton
                                    className="inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
                                    onClick={handleNext}
                                >
                                    {activeStep === 3 ? "Finish" : "Next"}
                                </PrimaryButton>
                            )}
                        </div>
                    </Box>
                </div>
            </form>
        </div>
    );
}
