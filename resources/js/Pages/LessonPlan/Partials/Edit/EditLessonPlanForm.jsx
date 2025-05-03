import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShareLessonPopup from './Popup/ShareLessonPopup';

// import categoryCalendarIcon from '../../../../../images/administrator/calendar.png';
// import LessonPlanFormActive from '../../../../../images/category/active.png';
// import LessonPlanFormMethodology from '../../../../../images/category/methodology.png';

const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EditLessonPlanForm({
    subjects,
    classNames,
    classrooms,
    teachers,
    lessonPlan
 }) {
    const [formFields, setFormFields] = useState(lessonPlan?.methodology ?? [
        { title: "", description: "" },
    ]);

    const [startDate, setStartDate] = useState(lessonPlan?.start_date_at ? new Date(lessonPlan?.start_date_at) : null);
    const [endDate, setEndDate] = useState(lessonPlan?.end_date_at ? new Date(lessonPlan?.end_date_at) : null);

    const [classroomIds, setClassroomIds] = useState([]);
    const [teacherIds, setTeacherIds] = useState([]);
    const [tempTeacherIds, setTempTeacherIds] = useState([]);
    const [checkAllClassroom, setCheckAllClassroom] = useState(false);
    const [shareLessonPopup, setShareLessonPopup] = useState(false);
    const [selectedTeachers, setSelectedTeachers] = useState([]);

    const {
        data,
        setData,
        errors,
        put,
        post,
        reset
    } = useForm({
        subject_id: lessonPlan?.subject_id,
        class_name_id: lessonPlan?.class_name_id,
        title: lessonPlan?.title,
        lesson_topic: lessonPlan?.lesson_topic,
        description: lessonPlan?.description,
        start_date_at: lessonPlan?.start_date_at,
        end_date_at: lessonPlan?.end_date_at,
        methodology: formFields,
        check_all: lessonPlan?.is_lesson_va && lessonPlan?.is_lesson_vb,
        is_lesson_va: lessonPlan?.is_lesson_va,
        is_lesson_vb: lessonPlan?.is_lesson_vb,
        is_notification_teacher: lessonPlan?.is_notification_teacher,
        is_mail_teacher: lessonPlan?.is_mail_teacher,
        lesson_file: lessonPlan?.lesson_file,
        classroom_ids: [],
        teacher_ids: [],
        remark: "",
    });

    useEffect(() => {
        const teacher_ids = lessonPlan?.lesson_plan_teachers?.map((item) => item?.teacher_id) ?? [];

        setTeacherIds(teacher_ids);
        setTempTeacherIds(teacher_ids);
        setClassroomIds(lessonPlan?.lesson_plan_classrooms?.map((item) => item?.classroom_id) ?? []);
    }, [lessonPlan])


    useEffect(() => {
        setSelectedTeachers(teachers?.filter(item => teacherIds?.includes(item?.id)));
    }, [teacherIds]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date_at: startDate
        }));
    }, [startDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_date_at: endDate
        }));
    }, [endDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_ids: classroomIds
        }));
    }, [classroomIds]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            teacher_ids: teacherIds
        }));
    }, [teacherIds]);

    // handle Classroom Checkbox start
    useEffect(() => {
        if (classroomIds?.length <= 0) {
            setCheckAllClassroom(false);
        }
        else {
            setCheckAllClassroom(classroomIds?.length === classrooms?.length);
        }
    }, [classroomIds, classrooms]);

    const handleCheckboxSelect = (name, value) => {
        let updatedClassroomIds = [...classroomIds];

        if (name === "check_all") {
            if (value == true) {
                updatedClassroomIds = classrooms?.map(item => item?.id);
            } else {
                updatedClassroomIds = [];
            }
        } else {

            if (classroomIds?.includes(value)) {
                updatedClassroomIds = updatedClassroomIds?.filter(item => item != value);
            }
            else {
                updatedClassroomIds = [...updatedClassroomIds, value];
            }
        }

        setClassroomIds(updatedClassroomIds)
    };
    // handle Classroom Checkbox end


    // Function to handle changes in form fields
    const handleFormChange = (event, index, field) => {
        const newFormFields = [...formFields];
        newFormFields[index][field] = event.target.value;
        setFormFields(newFormFields);
        setData("methodology", newFormFields);
    };

    const addFields = () => {
        setFormFields([...formFields, { methodology_01: "", methodology_02: "" }]);
    };

    const removeFields = (index) => {
        const newFormFields = [...formFields];
        newFormFields.splice(index, 1);
        setFormFields(newFormFields);
        setData("methodology", newFormFields);
    };

    // handle class name change start
    const handleClassNameChange = (e) => {
        const class_name_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
            subject_id: "",
        }));

        setClassroomIds([]);

        const form_data = {
            class_name_id: class_name_id
        }

        router.post(route('lesson_plan.edit', lessonPlan?.id), form_data);
    }
    // handle class name change end

    // handle share lession popup start
    const handleShareLessonPopup = () => {
        setShareLessonPopup(!shareLessonPopup)
    }
    // handle share lession popup end

    const parentIdsFromChild = (ids) => {
        setTeacherIds(ids);
    }

    // handle remove teacher start
    const handleRemoveTeacher = (id) => {
        const updatedIds = tempTeacherIds?.filter(teacherId => teacherId != id);

        setTempTeacherIds(updatedIds);
        setTeacherIds(updatedIds);
    }
    // handle remove teacher end

    // handle update data start
    const handleUpdate = (e) => {
        e.preventDefault();

        if (data?.class_name_id == "" || data?.subject_id == "" || data?.start_date_at == "" || data?.end_date_at == "" || data?.title == "") {
            toast.error("Required fields cannot be empty.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (data?.classroom_ids?.length == 0) {
            toast.error("Please select at least one class.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            put(route("lesson_plan.update", lessonPlan.id), data, {
                preserveScroll: true,
                onerror: () => {
                    for (const key in errors) {
                        if (key == 'classroom_ids') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            });
                            break;
                        }
                    }

                    if (data?.class_name_id != "") {
                        const form_data = {
                            class_name_id: data?.class_name_id
                        }

                        router.post(route('lesson_plan.edit', lessonPlan?.id), form_data);
                    }
                }
            });
        }
    };
    // handle update data end

    //handle download file start
    const handleDownloadFile = (id) => {
        const url = route('lesson_plan.file.download', id);

        window.open(url);
    }
    //handle download file end


    // handle post remark  start
    const handlePostRemark = (e) => {
        e.preventDefault();

        if(data?.remark == "") {
            toast.error("Remarks is required.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            data['lesson_plan_id'] = lessonPlan?.id;

            post(route('lesson_plan.remarks.save'), {
                onSuccess: () => {
                    setData((prevData) => ({
                        ...prevData,
                        remark: ""
                    }));

                    if (data?.class_name_id != "") {
                        const form_data = {
                            class_name_id: data?.class_name_id
                        }

                        router.post(route('lesson_plan.edit', lessonPlan?.id), form_data);
                    }
                },
                onError: () => {
                    if (data?.class_name_id != "") {
                        const form_data = {
                            class_name_id: data?.class_name_id
                        }

                        router.post(route('lesson_plan.edit', lessonPlan?.id), form_data);
                    }
                }
            });
        }
    }
    // handle post remark  end

    return (
        <>
            <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="col-span-12 xl:col-span-8">
                            <form onSubmit={handleUpdate}>
                                <div className="grid grid-cols-12 gap-[20px]">
                                    <div className="col-span-12 xl:col-span-6 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="class_name_id"
                                                        value="Class name"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="class_name_id"
                                                data_label="Class"
                                                data={classNames}
                                                value={data?.class_name_id}
                                                onChange={(e) =>
                                                    handleClassNameChange(e)
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors?.class_name_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-6 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="subject_id"
                                                        value="Subject name"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="subject_id"
                                                data_label="Subject"
                                                data={subjects}
                                                value={data?.subject_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors?.subject_id}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-checkbox-list">
                                            {classrooms?.length > 0 &&
                                                <ul>
                                                    <li>
                                                        <div className="educare-single-role-checkbox">
                                                            <div className="educare-checkbox-field-styles">
                                                                <Checkbox
                                                                    id="check_all"
                                                                    name="check_all"
                                                                    checked={
                                                                        checkAllClassroom
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleCheckboxSelect(e.target.name, e.target.checked)
                                                                    }
                                                                />
                                                            </div>
                                                            <label htmlFor="check_all">
                                                                All
                                                            </label>
                                                        </div>
                                                    </li>
                                                    {classrooms?.map((item, index) => (
                                                        <li key={index}>
                                                            <div className="educare-single-role-checkbox">
                                                                <div className="educare-checkbox-field-styles">
                                                                    <Checkbox
                                                                        id={`classroom_id_${item?.id}`}
                                                                        name={`classroom_id_${item?.id}`}
                                                                        checked={
                                                                            classroomIds?.includes(item?.id)
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleCheckboxSelect(e.target.name, item?.id)
                                                                        }
                                                                    />
                                                                </div>
                                                                <label htmlFor={`classroom_id_${item?.id}`}>
                                                                    {item?.title}
                                                                </label>
                                                            </div>
                                                        </li>
                                                    ))
                                                    }
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-6 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="lesson_plan_class_start_date"
                                                        value="Lesson Start Date"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Start date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-6 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="lesson_plan_class_end_date"
                                                        value="Lesson End Date"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Start date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-6 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="title"
                                                        value="Plan title"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextInput
                                                id="title"
                                                value={data?.title}
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
                                                    errors?.title
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-6 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="lesson_topic"
                                                value="Topic"
                                            />
                                            <TextInput
                                                id="lesson_topic"
                                                value={data?.lesson_topic}
                                                onChange={(e) =>
                                                    setData(
                                                        "lesson_topic",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors?.lesson_topic
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="lesson-plan-textarea">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="description"
                                                    value="Description"
                                                />
                                                <TextareaInput
                                                    id="description"
                                                    value={data?.description}
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
                                                        errors?.description
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="lesson-plan-description-form">
                                            <div className="educare-repeatable-input-field-styles">
                                                <h6 className="text-[15px] text-headingLight mb-1 font-medium">
                                                    Methodology
                                                </h6>
                                                <div className="flex flex-col gap-4">
                                                    {formFields?.map(
                                                        (form, index) => (
                                                            <div
                                                                key={index}
                                                                className="educare-repeatable-input-field-style-single gap-2"
                                                            >
                                                                <div className="educare-input-field-styles">
                                                                    <TextareaInput
                                                                        id="title"
                                                                        name="title[]"
                                                                        onChange={(event) => handleFormChange(event, index, "title")}
                                                                        value={form.title}
                                                                        className="block"
                                                                    />
                                                                </div>
                                                                <div className="educare-input-field-styles">
                                                                    <TextareaInput
                                                                        id="description"
                                                                        name="description[]"
                                                                        placeholder="Description"
                                                                        onChange={(event) => handleFormChange(event, index, "description")}
                                                                        value={form.description}
                                                                        className="block"
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
                                    </div>
                                    <div className="col-span-12 xxxl:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel value="Upload Document" />
                                            <div className="educare-input-type-file-styles">
                                                <input
                                                    id="lesson_file"
                                                    type="file"
                                                    name="lesson_file"
                                                    onChange={(e) =>
                                                        setData("lesson_file", e.target.files)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 xxxl:col-span-6">
                                        <div className="educare-input-field-notes">
                                            <h6>Note :</h6>
                                            <ul>
                                                <li>
                                                    1. File format-png,jpg,jpeg,doc,docx,pdf files allowed.
                                                </li>
                                                <li>
                                                    2. Maximum file size 20Mb.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {lessonPlan?.files?.length > 0 &&
                                        <div className="col-span-12 xxxl:col-span-6">
                                            <div>
                                                <h6 className="border-b border-gray-300 mb-2 font-bold text-sm">Uploaded Files :</h6>
                                                <ul>
                                                    {lessonPlan?.files?.map((item, index) => (
                                                        <li className="my-3" key={index}>
                                                            <span
                                                                className="mr-2 w-[50%] inline-block"
                                                            >
                                                                {item?.file_name}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="h-[25px] px-[10px] bg-info text-white text-[14px] rounded-sm font-medium font-primary inline-block"
                                                                onClick={() => {
                                                                    handleDownloadFile(item?.id)
                                                                }}
                                                            >
                                                                Download
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                    <div className="col-span-12">
                                        <div className="lesson-plan-checkbox-share-wrapper">
                                            <div className="lesson-plan-checkbox-share mb-[10px]">
                                                <div className="flex justify-between">
                                                    <div
                                                        className="w-[40%]"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="text-info"
                                                            onClick={handleShareLessonPopup}
                                                        >
                                                            Share your lesson plan with teachers
                                                        </button>
                                                    </div>
                                                    <div
                                                        className="w-[60%]"
                                                    >
                                                        {selectedTeachers?.length > 0 &&
                                                            selectedTeachers?.map((item, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="badge primary mx-1"
                                                                >
                                                                    {item?.first_name} {item?.middle_name} {item?.last_name}
                                                                    <span
                                                                        className="ml-1 font-bold text-[14px] cursor-pointer"
                                                                        onClick={() => {
                                                                            handleRemoveTeacher(item?.id)
                                                                        }}
                                                                    >
                                                                        x
                                                                    </span>
                                                                </span>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="educare-checkbox-list mb-[10px]">
                                                <ul>
                                                    <li>
                                                        <div className="educare-single-role-checkbox">
                                                            <div className="educare-checkbox-field-styles">
                                                                <Checkbox
                                                                    id="is_notification_teacher"
                                                                    name="is_notification_teacher"
                                                                    checked={
                                                                        data?.is_notification_teacher
                                                                    }
                                                                    onChange={(e) => setData(e.target.name, e.target.checked)}
                                                                />
                                                            </div>
                                                            <label htmlFor="is_notification_teacher">
                                                                Send notifications to shared teachers
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="educare-single-role-checkbox">
                                                            <div className="educare-checkbox-field-styles">
                                                                <Checkbox
                                                                    id="is_mail_teacher"
                                                                    name="is_mail_teacher"
                                                                    checked={data?.is_mail_teacher}
                                                                    onChange={(e) => setData(e.target.name, e.target.checked)}
                                                                />
                                                            </div>
                                                            <label htmlFor="is_mail_teacher">
                                                                Send mail to shared teachers
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="lesson-plan-checkbox-button flex justify-end gap-[15px]">
                                                <PrimaryButton
                                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                >
                                                    Update Lesson Plan
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    className="h-[35px] px-[10px] border-[1px] border-border text-[14px] rounded-md font-medium font-primary inline-block"
                                                >
                                                    Cancel
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-12 xl:col-span-4">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ChatCircle"></i>
                                    Remarks
                                </h5>
                            </div>
                            <div className="educare-input-field-style">
                                <TextInput
                                    id="remark"
                                    value={
                                        data.remark
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "remark",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                    placeholder="Enter your remarks here"
                                    // disabled

                                />
                                <InputError
                                    message={
                                        errors.remark
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="lesson-plan-checkbox-button flex justify-end mt-2">
                                <PrimaryButton
                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-sm font-medium font-primary inline-block"
                                    type="button"
                                    onClick={(e) => {
                                        handlePostRemark(e)
                                    }}
                                >
                                    Post
                                </PrimaryButton>
                            </div>
                            <div className="flex justify-start mt-4">
                                <ul>
                                    {lessonPlan?.lesson_plan_remarks?.length > 0 &&
                                        lessonPlan?.lesson_plan_remarks?.map((item, index) => (
                                            <li className="flex justify-start items-center" key={index}>
                                                <div className="w-[50px]">
                                                    <div className="h-[40px] w-[40px] rounded-full bg-primary text-white flex justify-center items-center">
                                                        <span className="font-bold">
                                                            {item?.teacher?.first_name?.toLowerCase()?.substring(0, 2)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <p><strong>{item?.teacher?.first_name} {item?.teacher?.middle_name} {item?.teacher?.last_name}</strong> <span className="ml-1 text-sm">{item?.remark_date}</span></p>
                                                    <p>{item?.remark}</p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* do not remove */}
                {/* <div className="lesson-plan-calendar-area mt-[60px]">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="col-span-12 xl:col-span-6">
                            <div className="lesson-plan-calendar-item-box">
                                <h2 className="lesson-plan-calendar-title">
                                    <img className="max-w-[30px]" src={categoryCalendarIcon} alt="category-icon" />
                                    <span><strong>October :</strong>1st week</span>
                                </h2>
                                <div className="lesson-plan-calendar-content mb-[15px]">
                                    <p>Lesson Dates: 02-Oct-2023 to 05-Oct-2023</p>
                                    <p>For: VI B , Mathematics , Created on:29-Sep-2023 3:53 PM</p>
                                    <p>Created by schoolAdmin Admin and shared with 0 staff</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-[20px]">
                                    <div className="lesson-plan-calendar-box p-2 bg-supportingA/10 min-h-[100px]">
                                        <h2 className="font-semibold">Title</h2>
                                        <p>Matrix</p>
                                    </div>
                                    <div className="lesson-plan-calendar-box p-2 bg-supportingA/10 min-h-[100px]">
                                        <h2 className="font-semibold">Topic</h2>
                                        <p>Course Objectives</p>
                                    </div>
                                </div>
                                <div className="lesson-plan-calendar-box-list-item mb-[15px]">
                                    <div className="lesson-plan-calendar-box-list-title">
                                        <div className="flex items-center gap-[10px]">
                                            <div className="icon">
                                                <span>
                                                    <img className="max-w-[30px]" src={LessonPlanFormActive} alt="LessonPlanFormActive-icon" />
                                                </span>
                                            </div>
                                            <div className="content">
                                                <h3 className="text-[18px] font-semibold">Methodology</h3>
                                            </div>
                                        </div>
                                        <span className="h-[1px] w-full bg-border/50"></span>
                                    </div>
                                    <div className="lesson-plan-calendar-box-list">
                                        <ul>
                                            <li><strong>Backward Design:</strong>Start with the desired learning outcomes and work backward to plan activities and assessments that will help student
                                                s achieve those outcomes.</li>
                                            <li><strong>Project-Based Learning:</strong>Students work on long-term projects that require them to apply knowledge and skills to real-world situations.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="lesson-plan-calendar-box-list-item">
                                    <div className="lesson-plan-calendar-box-list-title">
                                        <div className="flex items-center gap-[10px]">
                                            <div className="icon">
                                                <span><img className="max-w-[30px]" src={LessonPlanFormMethodology} alt="LessonPlanFormMethodology-icon" /> </span>
                                            </div>
                                            <div className="content">
                                                <h3 className="text-[18px] font-semibold">Activity</h3>
                                            </div>
                                        </div>
                                        <span className="h-[1px] w-full bg-border/50"></span>
                                    </div>
                                    <div className="lesson-plan-calendar-box-list">
                                        <ul>
                                            <li><strong>Backward Design:</strong>Start with the desired learning outcomes and work backward to plan activities and assessments that will help students achieve those outcomes.</li>
                                            <li><strong>Project-Based Learning:</strong>Students work on long-term projects that require them to apply knowledge and skills to real-world situations.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-6">
                            <div className="lesson-plan-calendar-item-box">
                                <h2 className="lesson-plan-calendar-title">
                                    <img className="max-w-[30px]" src={categoryCalendarIcon} alt="category-icon" />
                                    <span><strong>October :</strong>1st week</span>
                                </h2>
                                <div className="lesson-plan-calendar-content mb-[15px]">
                                    <p>Lesson Dates: 02-Oct-2023 to 05-Oct-2023</p>
                                    <p>For: VI B , Mathematics , Created on:29-Sep-2023 3:53 PM</p>
                                    <p>Created by schoolAdmin Admin and shared with 0 staff</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-[20px]">
                                    <div className="lesson-plan-calendar-box p-2 bg-supportingA/10 min-h-[100px]">
                                        <h2 className="font-semibold">Title</h2>
                                        <p>Matrix</p>
                                    </div>
                                    <div className="lesson-plan-calendar-box p-2 bg-supportingA/10 min-h-[100px]">
                                        <h2 className="font-semibold">Topic</h2>
                                        <p>Course Objectives</p>
                                    </div>
                                </div>
                                <div className="lesson-plan-calendar-box-list-item mb-[15px]">
                                    <div className="lesson-plan-calendar-box-list-title">
                                        <div className="flex items-center gap-[10px]">
                                            <div className="icon">
                                                <span>
                                                    <img className="max-w-[30px]" src={LessonPlanFormActive} alt="LessonPlanFormActive-icon" />
                                                </span>
                                            </div>
                                            <div className="content">
                                                <h3 className="text-[18px] font-semibold">Methodology</h3>
                                            </div>
                                        </div>
                                        <span className="h-[1px] w-full bg-border/50"></span>
                                    </div>
                                    <div className="lesson-plan-calendar-box-list">
                                        <ul>
                                            <li><strong>Backward Design:</strong>Start with the desired learning outcomes and work backward to plan activities and assessments that will help student
                                                s achieve those outcomes.</li>
                                            <li><strong>Project-Based Learning:</strong>Students work on long-term projects that require them to apply knowledge and skills to real-world situations.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="lesson-plan-calendar-box-list-item">
                                    <div className="lesson-plan-calendar-box-list-title">
                                        <div className="flex items-center gap-[10px]">
                                            <div className="icon">
                                                <span><img className="max-w-[30px]" src={LessonPlanFormMethodology} alt="LessonPlanFormMethodology-icon" /> </span>
                                            </div>
                                            <div className="content">
                                                <h3 className="text-[18px] font-semibold">Activity</h3>
                                            </div>
                                        </div>
                                        <span className="h-[1px] w-full bg-border/50"></span>
                                    </div>
                                    <div className="lesson-plan-calendar-box-list">
                                        <ul>
                                            <li><strong>Backward Design:</strong>Start with the desired learning outcomes and work backward to plan activities and assessments that will help students achieve those outcomes.</li>
                                            <li><strong>Project-Based Learning:</strong>Students work on long-term projects that require them to apply knowledge and skills to real-world situations.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* do not remove */}
                {/* <div className="lesson-plan-report-area mt-[60px]">
                    <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Teacher</th>
                                    <th>Lesson Plan Create</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Computer Science
                                    </td>
                                    <td>
                                        Shamim Ahamed
                                    </td>
                                    <td>
                                        0
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Shamim Ahamed
                                    </td>
                                    <td>
                                        Shamim Ahamed
                                    </td>
                                    <td>
                                        0
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Mathematics
                                    </td>
                                    <td>
                                        Shamim Ahamed
                                    </td>
                                    <td>
                                        0
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Agricultural Science
                                    </td>
                                    <td>
                                        Shamim Ahamed
                                    </td>
                                    <td>
                                        0
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Health Education
                                    </td>
                                    <td>
                                        Shamim Ahamed
                                    </td>
                                    <td>
                                        0
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </div>
            <ShareLessonPopup
                setShareLessonPopup={setShareLessonPopup}
                shareLessonPopup={shareLessonPopup}
                sendTeacherIdsToParent={parentIdsFromChild}
                teachers={teachers}
                teacherIds={tempTeacherIds}
                setTeacherIds={setTempTeacherIds}
            />
        </>
    );
}
