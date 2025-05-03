import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';
import { useRef } from 'react';
import DatePicker from "react-datepicker";

const CreateExamForm = ({
    virtualExamModes,
    classNames,
    subjects,
    virtualExam
}) => {

    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        title: virtualExam?.title ?? "",
        exam_code: virtualExam?.exam_code ?? "",
        exam_mode: virtualExam?.exam_mode ?? "",
        class_name_id: virtualExam?.class_name_id ?? "",
        subject_id: virtualExam?.subject_id ?? "",
        start_date_at: virtualExam?.start_date_at ? new Date(virtualExam.start_date_at) : "",
        end_date_at: virtualExam?.end_date_at ? new Date(virtualExam.end_date_at) : "",
        start_time_at: virtualExam?.start_time_at ? moment(virtualExam?.start_time_at, "HH:mm:ss").toDate() : "",
        end_time_at: virtualExam?.end_time_at ? moment(virtualExam?.end_time_at, "HH:mm:ss").toDate() : "",
        duration_hour: virtualExam?.duration_hour ?? "",
        duration_minute: virtualExam?.duration_minute ?? "",
        instruction_hour: virtualExam?.instruction_hour ?? "",
        instruction_minute: virtualExam?.instruction_minute ?? "",
        total_mark: virtualExam?.total_mark ?? "",
        pass_mark: virtualExam?.pass_mark ?? "",
        is_shuffle_question: virtualExam?.is_shuffle_question ?? "",
        live_link: virtualExam?.live_link ?? "",
        instruction_details: virtualExam?.instruction_details ?? ""
    });

    //for textarea
    const editorRef = useRef(null);

    // handle editor change start
    const handleEditorChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            instruction_details: e.target.getContent()
        }));
    }
    // handle editor change end

    //handle duration start
    const handleDurationTime = (field, value) => {
        if (field === "duration_hour") {
            if (value < 10 && value > -1) {
                setData((prevData) => ({
                    ...prevData,
                    "duration_hour": value
                }))
            } else {
                return data;
            }

        } else if (field === 'duration_minute') {
            if (value < 60 && value > -1) {
                setData((prevData) => ({
                    ...prevData,
                    "duration_minute": value
                }))
            } else {
                return data;
            }
        } else if (field === 'instruction_hour') {
            if (value < 10 && value > -1) {
                setData((prevData) => ({
                    ...prevData,
                    "instruction_hour": value
                }))
            } else {
                return data;
            }
        } else if (field === 'instruction_minute') {
            if (value < 60 && value > -1) {
                setData((prevData) => ({
                    ...prevData,
                    "instruction_minute": value
                }))
            } else {
                return data;
            }
        }
    }
    //handle duration end

    const handleTotalPassMarks = (name, value) => {
        if (name === 'total_mark') {

            if (value.length <= 3) {
                setData((prevData) => ({
                    ...prevData,
                    total_mark: value,
                }));

                //reset
                if (data.pass_mark && Number(value) <= Number(data.pass_mark)) {
                    setData((prevData) => ({
                        ...prevData,
                        pass_mark: "",
                    }));
                }
            }
        } else if (name === 'pass_mark') {
            const totalMarks = data.total_mark;

            if (Number(value) < Number(totalMarks)) {
                setData((prevData) => ({
                    ...prevData,
                    pass_mark: value,
                }));
            }
        }
    }

    // handle insert data start
    const handleInsert = (e) => {
        e.preventDefault();

        if(virtualExam?.id != null) {
            put(route("online_exam.update_exam", virtualExam?.id), {
                preserveScroll: true,
                onSuccess: () => {
                }
            });
        } else {
            post(route("online_exam.save_exam"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                }
            });
        }
    }
    // handle insert data end

    // handle change class start
    const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: value,
            subject_id: ""
        }));

        const form_data = {
            class_name_id: value
        }

        let url = route('online_exam.create_exam');

        if(virtualExam?.id != null) {
            url = route('online_exam.create_exam', {id: virtualExam.id});
        }

        router.post(url, form_data);
    }
    // handle change class end

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        Create Exam
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                    <form onSubmit={handleInsert}>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Name"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
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
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Code"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        value={
                                            data.exam_code
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "exam_code",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.exam_code
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Exam Mode"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Mode"
                                        data={virtualExamModes}
                                        value={
                                            data.exam_mode
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "exam_mode",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.exam_mode
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Class"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Class"
                                        data={classNames}
                                        value={
                                            data.class_name_id
                                        }
                                        onChange={(e) =>
                                            handleChangeClass(e.target.value)
                                        }
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
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Subject"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Subject"
                                        data={subjects}
                                        value={
                                            data.subject_id
                                        }
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
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Start Date"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <DatePicker
                                        selected={
                                            data?.start_date_at
                                        }
                                        onChange={(date) =>
                                            setData("start_date_at", date)
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
                                        className="w-full"
                                    />
                                    <InputError
                                        message={
                                            errors.start_date_at
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="End Date"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <DatePicker
                                        selected={
                                            data?.end_date_at
                                        }
                                        onChange={(date) =>
                                            setData("end_date_at", date)
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
                                        className="w-full"
                                    />
                                    <InputError
                                        message={
                                            errors.end_date_at
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Start Time"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <DatePicker
                                        selected={
                                            data?.start_time_at
                                        }
                                        onChange={(date) =>
                                            setData("start_time_at", date)
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={1}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Start time"
                                        className="w-full"
                                    />
                                    <InputError
                                        message={
                                            errors.start_time_at
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="End Time"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <DatePicker
                                        selected={
                                            data?.end_time_at
                                        }
                                        onChange={(date) =>
                                            setData("end_time_at", date)
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={1}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="End Time"
                                        className="w-full"
                                    />
                                    <InputError
                                        message={
                                            errors.end_time_at
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className='col-span-12'>
                                <div className='flex items-center'>
                                    <p>Duration</p>
                                    <span className='text-danger'>*</span>
                                    <i className='icon-info text-info ml-1'></i>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Hour"
                                    />
                                    <TextInput
                                        type='number'
                                        value={
                                            data.duration_hour
                                        }
                                        onChange={(event) => handleDurationTime('duration_hour', event.target.value)}
                                        className="block"
                                        placeHolder="0"
                                    />
                                    <InputError
                                        message={
                                            errors.duration_hour
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Minute"
                                    />
                                    <TextInput
                                        type='number'
                                        value={
                                            data.duration_minute
                                        }
                                        onChange={(event) => handleDurationTime('duration_minute', event.target.value)}
                                        className="block"
                                        placeHolder="0"
                                    />
                                    <InputError
                                        message={
                                            errors.duration_minute
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className='col-span-12'>
                                <div className='flex items-center'>
                                    <p>Instruction Time</p>
                                    <span className='text-danger'>*</span>
                                    <i className='icon-info text-info ml-1'></i>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Hour"
                                    />
                                    <TextInput
                                        type='number'
                                        value={
                                            data.instruction_hour
                                        }
                                        onChange={(event) => handleDurationTime('instruction_hour', event.target.value)}
                                        className="block"
                                        placeHolder="0"
                                    />
                                    <InputError
                                        message={
                                            errors.instruction_hour
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Minute"
                                    />
                                    <TextInput
                                        type='number'
                                        value={
                                            data.instruction_minute
                                        }
                                        onChange={(event) => handleDurationTime('instruction_minute', event.target.value)}
                                        className="block"
                                        placeHolder="0"
                                    />
                                    <InputError
                                        message={
                                            errors.instruction_minute
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className='col-span-12'>
                                <h3>Insturction</h3>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-styles">
                                    <Editor
                                        apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        // initialValue="<p>This is the initial content of the editor.</p>"
                                        value={data?.instruction_details}
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
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                        onChange={handleEditorChange}
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Total Marks"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        type='number'
                                        value={
                                            data.total_mark
                                        }
                                        onChange={(e) => handleTotalPassMarks('total_mark', e.target.value)}
                                        className="block"
                                        placeHolder="Total Marks"
                                    />
                                    <InputError
                                        message={
                                            errors.total_mark
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Pass Marks"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        type='number'
                                        value={
                                            data.pass_mark
                                        }
                                        onChange={(e) => handleTotalPassMarks('pass_mark', e.target.value)}
                                        className="block"
                                        placeHolder="Pass Marks"
                                    />
                                    <InputError
                                        message={
                                            errors.pass_mark
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="is_shuffle_question"
                                            name="is_shuffle_question"
                                            checked={
                                                data.is_shuffle_question
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "is_shuffle_question",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="is_shuffle_question"
                                            value="Shuffle question order"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Exam Live Monitoring Link"
                                            />
                                            {/* <sup>*</sup> */}
                                        </div>
                                    </div>
                                    <TextInput
                                        value={
                                            data.live_link
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "live_link",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        placeHolder="Enter Zoom/Google meating link so student can join live monitoring"
                                    />
                                    <InputError
                                        message={
                                            errors.live_link
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2.5 mt-5 justify-end">
                            {virtualExam?.id != null ?
                                <Link
                                    className="educare-gray-btn-lg-stroke"
                                    href={route('online_exam.create_exam', { id: virtualExam?.id })}
                                >
                                    Reset
                                </Link>
                            :
                                <Link
                                    className="educare-gray-btn-lg-stroke"
                                    href={route('online_exam.create_exam')}
                                >
                                    Reset
                                </Link>
                            }
                            <PrimaryButton
                                disabled={processing}
                                className="h-12 bg-primary text-white text-[16px] rounded-md font-medium px-6 font-primary inline-block">
                                Next
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateExamForm;
