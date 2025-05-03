import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import SelectInput2 from "@/Components/SelectInput2";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResultCardExamGroupingList from "./ResultCardExamGroupingList";

export default function ResultCardExamGroupingForm({
    exams,
    groupingTypes,
    conversionType,
    calculationType,
    calculationPerform,
    reportCardTypes,
    examGroups
}) {
    const [editableData, setEditableData] = useState({})
    const [mode, setMode] = useState('create')

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        id: "",
        report_card_type: "",
        parent: "",
        title: "",
        display_order: "",
        is_exam: false,
        exam_id: "",
        is_grand_total_row_to_be_show: false,
        is_grand_percentage_row_to_be_show: false,
        is_grand_grade_row_to_be_show: false,
        is_exam_marks_to_be_added_in_grand_total: false,
        show_total: false,
        show_affiliation_no: false,
        show_school_code: false,
        show_date_of_birth: false,
        show_print_date: false,
        show_cbse_logo: false,
        show_icse_logo: false,
        show_grading_scale: false,
        grouping_type: "",
        conversion_type: "",
        calculation_perform: "",
        calculation_type: "",
        weightage: "",
        affiliated_title: "",
        show_children: false,
        is_rank_given: "",
        cbse_image: "",
        icse_image: "",
        show_optional_subject: false
    });


    // handle editable data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            id:editableData.id ?? "",
            report_card_type: editableData.result_card_configuration_id ?? "",
            parent: editableData.parent ?? "",
            title: editableData.title ?? "",
            display_order: editableData.display_order ?? "",
            grouping_type: editableData.grouping_type ?? "",
            calculation_perform: editableData.calculation_perform ?? "",
            calculation_type: editableData.calculation_type ?? "",
            weightage: editableData.weightage ?? "",
            affiliated_title: editableData.affiliated_title ?? "",
            conversion_type: editableData.conversion_type ?? "",
            is_exam: editableData.is_exam ?? false,
            exam_id: editableData?.exam_id ?? "",
            is_grand_total_row_to_be_show: editableData.is_grand_total_row_to_be_show ?? false,
            is_grand_percentage_row_to_be_show: editableData.is_grand_percentage_row_to_be_show ?? false,
            is_grand_grade_row_to_be_show: editableData.is_grand_grade_row_to_be_show ?? false,
            show_children: editableData.show_children ?? false,
            is_rank_given: editableData.is_rank_given ?? false,
            show_total: editableData?.show_total ?? false,
            show_affiliation_no: editableData?.show_affiliation_no ?? false,
            show_school_code: editableData?.show_school_code ?? false,
            show_date_of_birth: editableData?.show_date_of_birth ?? false,
            show_print_date: editableData?.show_print_date ?? false,
            show_cbse_logo: editableData?.show_cbse_logo ?? false,
            show_icse_logo: editableData?.show_icse_logo ?? false,
            show_grading_scale: editableData?.show_grading_scale ?? false,
            show_optional_subject: editableData?.show_optional_subject ?? false,
        }));
    }, [editableData]);
    // handle editable data end


    // hanlde report card type change start
    const handleReportCardTypeChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            report_card_type: e.target.value
        }));

        handleFilterExamGroup(e)
    }
    // hanlde report card type change end


    // handle form submit start
    const handleExamGroupingData = (e) => {
        e.preventDefault();

        if (mode == 'edit') {
            if (data && data.id) {
                post(route('result_card.exam_group_update', { id: data.id }), {
                    onSuccess: () => {
                        reset();
                        setEditableData({});
                    }
                });
            } else {
                console.error("Missing 'id' property in data for update");
            }
        } else {
            post(route('result_card.exam_group_save'),{
                onSuccess: () => {
                    reset();
                    setEditableData({});
                }
            });
        }
    };
    // handle form submit end


    // handle filter exam groups by report card type start
    const handleFilterExamGroup = (e) => {
        e.preventDefault();

        const form_data = {
            report_card_type: e.target.value
        }

        router.post(route('result_card.exam_grouping'), form_data)
    }
    // handle filter exam groups by report card type end

    // handle reset form data start
    const handleReset = (e) => {
        e.preventDefault();

        reset();

        setEditableData({});
    }
    // handle reset form data end

    // handle upload image start
    const handleUploadImage = (e, name, image) => {
        e.preventDefault();

        if (data.report_card_type == "") {
            toast.error('Please select report card', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if(image == "") {
            toast.error('Image cannot be empty', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                result_card_configuration_id: data.report_card_type,
                name: name,
                image: image
            }

            router.post(route('result_card.exam_group_board_logo_save'), form_data, {
                onSuccess: () => {
                    const form_data = {
                        report_card_type: data?.report_card_type
                    }

                    router.post(route('result_card.exam_grouping'), form_data);
                },
                onError: () => {
                    const form_data = {
                        report_card_type: data?.report_card_type
                    }

                    router.post(route('result_card.exam_grouping'), form_data);
                }
            });
        }
    }
    // handle upload image end


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        Report Card Grouping
                                    </h5>
                                    <div className="text-danger flex">
                                        <p className="mr-1"><small>Note: </small></p>
                                        <p>
                                            <small> (1) The "Total Marks" group's exam marks will be calculated for the Total Marks.</small>
                                            <br />
                                            <small>(2) The "Max Marks" will show full marks of the exams</small>
                                        </p>
                                    </div>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleExamGroupingData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap" data-id={editableData?.report_card_type}>
                                                        <div className="educare-input-field-styles-label" >
                                                            <InputLabel
                                                                htmlFor="report_card_type"
                                                                value="Report Card Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="report_card_type"
                                                        data_label="Report Card"
                                                        // data={reportCardData}
                                                        data={reportCardTypes}
                                                        value={data?.report_card_type}
                                                        onChange={(e) =>
                                                            handleReportCardTypeChange(e)
                                                        }
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.report_card_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap" data-id={editableData?.parent}>
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="parent"
                                                                value="Parent"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput2
                                                        id="parent"
                                                        data_label="Parent"
                                                        data={examGroups}
                                                        selectedData={data?.parent}
                                                        onChange={(e) =>
                                                            setData(
                                                                "parent",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.parent
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Title"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="title"
                                                        value={
                                                            data?.title || ""
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
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="display_order"
                                                        value="Display Order"
                                                    />
                                                    <TextInput
                                                        id="display_order"
                                                        value={
                                                            data?.display_order || ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "display_order",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.display_order
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="grid grid-cols-12 gap-4">
                                                    <div className="col-span-12 md:col-span-6">
                                                        <div className="grid grid-cols-12 gap-4">
                                                            <div className="col-span-12">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Is Exam</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="is_exam"
                                                                            value="Yes"
                                                                            checked={data.is_exam == true}
                                                                            onChange={() => setData("is_exam", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="is_exam"
                                                                            value="No"
                                                                            checked={data.is_exam == false}
                                                                            onChange={() => setData("is_exam", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Is Grand Total Row To Be Show</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="is_grand_total_row_to_be_show"
                                                                            value="Yes"
                                                                            checked={data.is_grand_total_row_to_be_show == true}
                                                                            onChange={() => setData("is_grand_total_row_to_be_show", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="is_grand_total_row_to_be_show"
                                                                            value="No"
                                                                            checked={data.is_grand_total_row_to_be_show == false}
                                                                            onChange={() => setData("is_grand_total_row_to_be_show", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Is Grand Percentage To Be Show</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="is_grand_percentage_row_to_be_show"
                                                                            value="Yes"
                                                                            checked={data.is_grand_percentage_row_to_be_show == true}
                                                                            onChange={() => setData("is_grand_percentage_row_to_be_show", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="is_grand_percentage_row_to_be_show"
                                                                            value="No"
                                                                            checked={data.is_grand_percentage_row_to_be_show == false}
                                                                            onChange={() => setData("is_grand_percentage_row_to_be_show", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Is Grand Grade To Be Show</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="is_grand_grade_row_to_be_show"
                                                                            value="Yes"
                                                                            checked={data.is_grand_grade_row_to_be_show == true}
                                                                            onChange={() => setData("is_grand_grade_row_to_be_show", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="is_grand_grade_row_to_be_show"
                                                                            value="No"
                                                                            checked={data.is_grand_grade_row_to_be_show == false}
                                                                            onChange={() => setData("is_grand_grade_row_to_be_show", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Total (Report Card)</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="show_total"
                                                                            value="Yes"
                                                                            checked={data.show_total == true}
                                                                            onChange={() => setData("show_total", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="show_total"
                                                                            value="No"
                                                                            checked={data.show_total == false}
                                                                            onChange={() => setData("show_total", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Optional Subjects (Report Card)</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="show_optional_subject"
                                                                            value="Yes"
                                                                            checked={data.show_optional_subject == true}
                                                                            onChange={() => setData("show_optional_subject", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="show_optional_subject"
                                                                            value="No"
                                                                            checked={data.show_optional_subject == false}
                                                                            onChange={() => setData("show_optional_subject", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <div className="grid grid-cols-12 gap-4">
                                                            <div className="col-span-12">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Affiliation No (Report Card)</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="show_affiliation_no"
                                                                            value="Yes"
                                                                            checked={data.show_affiliation_no == true}
                                                                            onChange={() => setData("show_affiliation_no", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="show_affiliation_no"
                                                                            value="No"
                                                                            checked={data.show_affiliation_no == false}
                                                                            onChange={() => setData("show_affiliation_no", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>School Code (Report Card)</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="show_school_code"
                                                                            value="Yes"
                                                                            checked={data.show_school_code == true}
                                                                            onChange={() => setData("show_school_code", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="show_school_code"
                                                                            value="No"
                                                                            checked={data.show_school_code == false}
                                                                            onChange={() => setData("show_school_code", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Date Of Birth (Report Card)</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="show_date_of_birth"
                                                                            value="Yes"
                                                                            checked={data.show_date_of_birth == true}
                                                                            onChange={() => setData("show_date_of_birth", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="show_date_of_birth"
                                                                            value="No"
                                                                            checked={data.show_date_of_birth == false}
                                                                            onChange={() => setData("show_date_of_birth", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Print Date (Report Card)</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="show_print_date"
                                                                            value="Yes"
                                                                            checked={data.show_print_date == true}
                                                                            onChange={() => setData("show_print_date", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="show_print_date"
                                                                            value="No"
                                                                            checked={data.show_print_date == false}
                                                                            onChange={() => setData("show_print_date", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>CBSE Logo (Report Card)</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="show_cbse_logo"
                                                                            value="Yes"
                                                                            checked={data.show_cbse_logo == true}
                                                                            onChange={() => setData("show_cbse_logo", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="show_cbse_logo"
                                                                            value="No"
                                                                            checked={data.show_cbse_logo == false}
                                                                            onChange={() => setData("show_cbse_logo", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <div className="educare-input-field-styles">
                                                                        <div className="educare-input-type-file-styles">
                                                                            <input
                                                                                id="cbse_image"
                                                                                type="file"
                                                                                name="cbse_image"
                                                                                accept="image/*"
                                                                                onChange={(e) => {
                                                                                    setData("cbse_image", e.target.files[0]);
                                                                                }
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="educare-list-action-btn my-5 text-end">
                                                                        <button
                                                                            className="educare-success-btn-sm-fill"
                                                                            onClick={(e) => handleUploadImage(e, 'cbse_image', data?.cbse_image)}
                                                                            type="button"
                                                                        >
                                                                            <i className="icon-check-1"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 ">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>ICSE Logo (Report Card)</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="show_icse_logo"
                                                                            value="Yes"
                                                                            checked={data.show_icse_logo == true}
                                                                            onChange={() => setData("show_icse_logo", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="show_icse_logo"
                                                                            value="No"
                                                                            checked={data.show_icse_logo == false}
                                                                            onChange={() => setData("show_icse_logo", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <div className="educare-input-field-styles">
                                                                        <div className="educare-input-type-file-styles">
                                                                            <input
                                                                                id="icse_image"
                                                                                type="file"
                                                                                name="icse_image"
                                                                                accept="image/*"
                                                                                onChange={(e) => {
                                                                                    setData("icse_image", e.target.files[0]);
                                                                                }
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="educare-list-action-btn my-5 text-end">
                                                                        <button
                                                                            className="educare-success-btn-sm-fill"
                                                                            onClick={(e) => handleUploadImage(e, 'icse_image', data?.icse_image)}
                                                                            type="button"
                                                                        >
                                                                            <i className="icon-check-1"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12">
                                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Grading Scale (Report Card)</h6>
                                                                <div className="educare-create-school-settings-list-check">
                                                                    <div className="educare-radio-field-styles flex gap-3">
                                                                        <RadioInput
                                                                            name="show_grading_scale"
                                                                            value="Yes"
                                                                            checked={data.show_grading_scale == true}
                                                                            onChange={() => setData("show_grading_scale", true)}
                                                                        />
                                                                        <RadioInput
                                                                            name="show_grading_scale"
                                                                            value="No"
                                                                            checked={data.show_grading_scale == false}
                                                                            onChange={() => setData("show_grading_scale", false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                data.is_exam == true &&
                                                <>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap" data-id={editableData?.exam_id}>
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="exam_id"
                                                                        value="Exam"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <SelectInput
                                                                id="exam_id"
                                                                data_label="Exam"
                                                                data={exams}
                                                                value={
                                                                    data?.exam_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "exam_id",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.exam_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                </>

                                            }
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap" data-id={editableData?.grouping_type}>
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Grouping Type"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput2
                                                        data_label=""
                                                        data={groupingTypes}
                                                        selectedData={data?.grouping_type}
                                                        onChange={(e) =>
                                                            setData(
                                                                "grouping_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.grouping_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Conversion Type"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput2
                                                        data_label=""
                                                        data={conversionType}
                                                        selectedData={data?.conversion_type}
                                                        onChange={(e) =>
                                                            setData(
                                                                "conversion_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.conversion_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Calculation Perform"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput2
                                                        data_label=""
                                                        data={calculationPerform}
                                                        selectedData={data?.calculation_perform}
                                                        onChange={(e) =>
                                                            setData(
                                                                "calculation_perform",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.calculation_perform
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Calculation Type"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput2
                                                        data_label=""
                                                        data={calculationType}
                                                        selectedData={data?.calculation_type}
                                                        onChange={(e) =>
                                                            setData(
                                                                "calculation_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.calculation_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Weightage %"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        value={
                                                            data?.weightage || ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "weightage",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.weightage
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Affiliated to CBSE Title"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        value={
                                                            data?.affiliated_title || ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "affiliated_title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.affiliated_title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Show Children</h6>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="show_children"
                                                            value="Yes"
                                                            checked={data.show_children == true}
                                                            onChange={() => setData("show_children", true)}
                                                        />
                                                        <RadioInput
                                                            name="show_children"
                                                            value="No"
                                                            checked={data.show_children == false}
                                                            onChange={() => setData("show_children", false)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Is Rank to be Given</h6>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="is_rank_given"
                                                            value="Yes"
                                                            checked={data.is_rank_given == true}
                                                            onChange={() => setData("is_rank_given", true)}
                                                        />
                                                        <RadioInput
                                                            name="is_rank_given"
                                                            value="No"
                                                            checked={data.is_rank_given == false}
                                                            onChange={() => setData("is_rank_given", false)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        type="button"
                                                        className="educare-gray-btn-lg-stroke"
                                                        onClick = {(e) => {
                                                            handleReset(e);
                                                        }}
                                                    >
                                                        Reset
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        type="submit"
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
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <ResultCardExamGroupingList
                            setEditableData={setEditableData}
                            setMode={setMode}
                            examGroups={examGroups}
                            resetFormData={reset}
                            data={data}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
