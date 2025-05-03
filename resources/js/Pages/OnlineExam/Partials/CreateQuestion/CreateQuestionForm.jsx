import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import AddNewTopicPopup from './popup/AddNewTopicPopup';
import AddPassagePopup from './popup/AddPassagePopup';

const CreateQuestionForm = ({
    subjects,
    classNames,
    onlineTopics,
    questionTypes,
    difficultyLevels,
    languages,
    virtualAssets,
    shareAudienceTypes
}) => {

    // answer options
    const [answerOptions, setAnswerOptions] = useState([]);

    // selected asset
    const [selectedVirtualAsset, setSelectedVirtualAsset] = useState({});

    //add new topic popup
    const [addNewTopic, setAddNewTopic] = useState(false);

    //add passage popup
    const [addPassage, setAddPassage] = useState(false);

    //handle form with useform start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        class_name_id: "",
        subject_id: "",
        language: "English",
        question_type: "",
        difficulty_level: "",
        online_topic_id: "",
        virtual_asset_id: "",
        question: "",
        answer_options: answerOptions,
        answer_explanation: "",
        mark: "",
        share_with: "",
        is_published: "",
    });
    //handle form with useform end

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            answer_options: answerOptions
        }));
    }, [answerOptions]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            virtual_asset_id: selectedVirtualAsset?.id ?? ''
        }));
    }, [selectedVirtualAsset]);


    // handle change class start
    const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: value,
            subject_id: "",
            virtual_asset_id: "",
            online_topic_id: ""
        }));

        setSelectedVirtualAsset({});

        const form_data = {
            class_name_id: value
        }

        router.post(route('online_exam.create_question'), form_data);
    }
    // handle change class end

    // handle change subject start
    const handleChangeSubject = (value) => {
        setData((prevData) => ({
            ...prevData,
            subject_id: value,
            virtual_asset_id: "",
            online_topic_id: ""
        }));

        setSelectedVirtualAsset({});

        const form_data = {
            class_name_id: data?.class_name_id,
            subject_id: value
        }

        router.post(route('online_exam.create_question'), form_data);
    }
    // handle change subject end

    // handle change question type start
    const handleChangeQuestionType = (value) => {
        setData((prevData) => ({
            ...prevData,
            question_type: value
        }));

        if (value == 'Multiple Choice' || value == 'Multiple Selection' || value == 'Fill in the blanks' || value == 'Yes/No') {
            setAnswerOptions([
                {
                    is_correct: false,
                    answer: '',
                    alternate_answers: []
                },
                {
                    is_correct: false,
                    answer: '',
                    alternate_answers: []
                }
            ]);
        }
        else if (value == 'Short Answer') {
            setAnswerOptions([
                {
                    is_correct: false,
                    answer: '',
                    alternate_answers: []
                }
            ]);
        } else {
            setAnswerOptions([]);
        }
    }
    // handle change question type end

    // add answer option field start
    const addAnswerOptionFields = () => {
        setAnswerOptions([
            ...answerOptions,
            {
                is_correct: false,
                answer: '',
                alternate_answers: []
            }
        ]);
    };
    // add answer option field start

    // remove answer option field end
    const removeAnswerOptionFields = (index) => {
        const updatedAnswerOptions = [...answerOptions];

        updatedAnswerOptions.splice(index, 1);

        setAnswerOptions(updatedAnswerOptions);
    };
    // remove answer option field end

    // add alternate fileds start
    const addAlternateAnswerFields = (index) => {
        const updatedAnswerOptions = [...answerOptions];

        updatedAnswerOptions[index].alternate_answers.push({answer: ''});

        setAnswerOptions(updatedAnswerOptions);
    };
    // add alternate fileds end

    // remove alternate fileds start
    const removeAlternateAnswerFields = (index, altIndex) => {
        const updatedAnswerOptions = [...answerOptions];

        updatedAnswerOptions[index].alternate_answers.splice(altIndex, 1);

        setAnswerOptions(updatedAnswerOptions);
    };
    // remove alternate fileds end

    // handle form change start
    const handleFormChange = (event, index, field, type, altIndex) => {
        const updatedAnswerOptions = [...answerOptions];

        if (type === "Multiple Choice" || type === "Yes/No") {
            if (field === "is_correct") {
                updatedAnswerOptions.forEach((item) => {
                    item.is_correct = false;
                });

                updatedAnswerOptions[index].is_correct = true;
            } else {
                updatedAnswerOptions[index][field] = event.target.value;
            }
        } else if (type === "Multiple Selection") {
            const updatedAnswerOptions = [...answerOptions];

            if (field === "is_correct") {
                updatedAnswerOptions[index].is_correct = event.target.checked;
            } else {
                updatedAnswerOptions[index][field] = event.target.value;
            }
        }
        else if (type === "Fill in the blanks" || type === "Short Answer") {
            const updatedAnswerOptions = [...answerOptions];

            if (field === "answer") {
                updatedAnswerOptions[index][field] = event.target.value;
            } else if (field === "alternate_answer") {
                updatedAnswerOptions[index].alternate_answers[altIndex]['answer'] = event.target.value;
            }
        }

        setAnswerOptions(updatedAnswerOptions);
    }
    // handle form change end

    //for textarea
    const editorRef = useRef(null);

    // handle editor change start
    const handleEditorChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            question: e.target.getContent()
        }));
    }
    // handle editor change end

    //handle add topic start
    const handleAddTopic = () => {
        setAddNewTopic(!addNewTopic);
    }
    //handle add topic end

    //handle add passage start
    const handleAddPassagePopup = () => {
        setAddPassage(!addPassage);
    }
    //handle add passage end

    //handle remove passage start
    const handleRemovePassage = () => {
        setSelectedVirtualAsset({});
    }
    //handle remove passage end

    // handle save question start
    const handleSaveQuestion = (e) => {
        e.preventDefault();

        post(route('online_exam.save_question'), {
            onSuccess: () => {
                reset();
                setAnswerOptions([]);
                setSelectedVirtualAsset({});
            },
            onError: () => {

            }
        });
    }
    // handle save question end

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-info"></i>
                            Create Question
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
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
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
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
                                            handleChangeSubject(e.target.value)
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
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Language"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Language"
                                        data={languages}
                                        value={
                                            data.language
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "language",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.language
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Question Type"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Type"
                                        data={questionTypes}
                                        value={
                                            data.question_type
                                        }
                                        onChange={(e) =>
                                            handleChangeQuestionType(e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.question_type
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Difficulty Level"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Level"
                                        data={difficultyLevels}
                                        value={
                                            data.difficulty_level
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "difficulty_level",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.difficulty_level
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Topic"
                                            />
                                        </div>
                                        {
                                            data?.subject_id !== '' && (
                                                <button
                                                    className="educare-secondary-btn-sm-stroke"
                                                    onClick={handleAddTopic}
                                                >
                                                    <i className="icon-PlusCircle"></i>{" "}
                                                    Add
                                                </button>
                                            )
                                        }
                                    </div>
                                    <SelectInput
                                        data_label="Topic"
                                        data={onlineTopics}
                                        value={
                                            data.online_topic_id
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "online_topic_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.online_topic_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            {
                                data?.subject_id !== '' && (
                                    <div className='col-span-4'>
                                        <PrimaryButton
                                            // disabled={processing}
                                            className="educare-secondary-btn-md-fill"
                                            type="button"
                                            onClick={handleAddPassagePopup}
                                        >
                                            <i className='icon-PlusCircle'></i> Link Passage
                                        </PrimaryButton>
                                    </div>
                                )
                            }

                            {selectedVirtualAsset?.id != null &&
                                <>
                                    <div className='col-span-8 text-right'>
                                        <PrimaryButton
                                            className="educare-danger-btn-md-fill"
                                            type="button"
                                            onClick={handleRemovePassage}
                                        >
                                            Remove
                                        </PrimaryButton>
                                    </div>

                                    <div className="col-span-12">
                                        <div>
                                            <h3
                                                className="mb-2"
                                            >
                                                {selectedVirtualAsset?.title}
                                            </h3>

                                            <div
                                            dangerouslySetInnerHTML={{ __html: selectedVirtualAsset?.description }}
                                            >

                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                            <div className="col-span-12">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            value="Question"
                                        />
                                        <sup>*</sup>
                                        <span className=''>
                                            <i className='icon-info text-[18px] ml-[4px] text-info flex items-center'></i>
                                        </span>
                                        <span>
                                            {
                                                data?.question_type === 'Multiple Choice' ? (
                                                    <span className='text-danger ml-1 text-[16px]'>1 Right Answer</span>
                                                ) : (data?.question_type === "Multiple Selection" ? (
                                                    <span className='text-danger ml-1 text-[16px]'>Multiple Right Answer</span>
                                                ) : (data?.question_type === "Fill in the blanks" ? (
                                                    <span className='text-danger ml-1 text-[16px]'>Use one underscore( _ ) for blank</span>
                                                ) : (data?.question_type === "Yes/No" ? (
                                                    <span className='text-danger ml-1 text-[16px]'>1 Right Answer</span>
                                                ) : (data?.question_type === "Descriptive" ? (
                                                    <span className='text-danger ml-1 text-[16px]'>Students can upload image with text</span>
                                                ) : (data?.question_type === "Short Answer" ? (
                                                    <span className='text-danger ml-1 text-[16px]'>Suitable for 1 word answer</span>
                                                ) : ('')))))
                                                )
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="educare-input-field-styles mt-1">
                                    <Editor
                                        apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        // initialValue="<p>This is the initial content of the editor.</p>"
                                        value={data?.question}
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
                                    <InputError
                                        message={
                                            errors.question
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Answer Explanation"
                                    />
                                    <TextareaInput
                                        value={
                                            data.answer_explanation
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "answer_explanation",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        placeholder="Answer explanation will be displayed after you declare exam or in Practice/Revision exams."
                                    />
                                    <InputError
                                        message={
                                            errors.answer_explanation
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className='col-span-12'>
                                <div className='flex justify-between flex-wrap items-end mb-5'>
                                    <h3 className='mb-2'>Answer Options</h3>
                                    {/* Add multiple choice field */}
                                    {
                                        data?.question_type === 'Multiple Choice' && (
                                            <PrimaryButton
                                                className="educare-primary-btn-md-fill"
                                                onClick={addAnswerOptionFields}
                                            >
                                                <i className='icon-PlusCircle'></i> Add Multiple Choice Option
                                            </PrimaryButton>
                                        )
                                    }
                                    {/* Add multiple selection field */}
                                    {
                                        data?.question_type === "Multiple Selection" && (
                                            <PrimaryButton
                                                className="educare-primary-btn-md-fill"
                                                onClick={addAnswerOptionFields}
                                            >
                                                <i className='icon-PlusCircle'></i> Add Multiple Selection Option
                                            </PrimaryButton>
                                        )
                                    }
                                    {/* Add Fill Blanks field */}
                                    {
                                        data?.question_type === 'Fill in the blanks' && (
                                            <PrimaryButton
                                                className="educare-primary-btn-md-fill"
                                                onClick={addAnswerOptionFields}
                                            >
                                                <i className='icon-PlusCircle'></i> Add Answer Option
                                            </PrimaryButton>
                                        )
                                    }
                                </div>

                                {/* Multiple Choice Fields start*/}
                                {
                                    data?.question_type === 'Multiple Choice' && (
                                        <>
                                            {
                                                answerOptions?.length >= 0 && (
                                                    answerOptions.map((item, index) => (
                                                        <div key={index}>
                                                            <div className='flex gap-5 mb-4'>
                                                                <div className="educare-radio-field-styles">
                                                                    <RadioInput
                                                                        name={`is_correct_${index}`}
                                                                        checked={item.is_correct}
                                                                        onChange={(event) => handleFormChange(event, index, "is_correct", "Multiple Choice")}
                                                                    />
                                                                </div>
                                                                <div className="educare-input-field-styles w-[100%]">
                                                                    <TextareaInput
                                                                        value={item.answer}
                                                                        onChange={(event) => handleFormChange(event, index, "answer", "Multiple Choice")}
                                                                        className="block"
                                                                        placeholder="Answer"
                                                                    />
                                                                    <InputError
                                                                        message={errors[`answer_options.${index}.answer`]}
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className='educare-list-action-btn'>
                                                                    <button
                                                                        type="button"
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => removeAnswerOptionFields(index)}
                                                                        disabled={answerOptions.length <= 2}
                                                                    >
                                                                        X
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                            }
                                        </>
                                    )
                                }
                                {/* Multiple Choice Fields end*/}

                                {/* Multiple Selection Fields start*/}
                                {
                                    data?.question_type === "Multiple Selection" && (
                                        <>
                                            {
                                                answerOptions?.length >= 0 && (
                                                    answerOptions.map((item, index) => (
                                                        <div key={index}>
                                                            <div className='flex gap-5 mb-4'>
                                                                <div className="educare-checkbox-field-styles">
                                                                    <Checkbox
                                                                        name={`is_correct_${index}`}
                                                                        checked={item.is_correct}
                                                                        onChange={(event) => handleFormChange(event, index, "is_correct", "Multiple Selection")}
                                                                    />
                                                                </div>
                                                                <div className="educare-input-field-styles w-[100%]">
                                                                    <TextareaInput
                                                                        value={item.answer}
                                                                        onChange={(event) => handleFormChange(event, index, "answer", "Multiple Selection")}
                                                                        className="block"
                                                                        placeholder="Answer"
                                                                    />
                                                                    <InputError
                                                                        message={errors[`answer_options.${index}.answer`]}
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className='educare-list-action-btn'>
                                                                    <button
                                                                        type="button"
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => removeAnswerOptionFields(index)}
                                                                        disabled={answerOptions?.length <= 2}
                                                                    >
                                                                        X
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                            }
                                        </>
                                    )
                                }

                                {/* Multiple Selection Fields end*/}

                                {/* Fill Blanks Fields start*/}
                                {
                                    data?.question_type === 'Fill in the blanks' && (
                                        <>
                                            {
                                                answerOptions?.length >= 0 && (
                                                    answerOptions.map((item, index) => (
                                                        <div key={index}>
                                                            <div className='mb-4'>
                                                                <div className='flex gap-5'>
                                                                    <div className="educare-input-field-styles w-[100%]">
                                                                        <TextareaInput
                                                                            value={item.answer}
                                                                            onChange={(event) => handleFormChange(event, index, "answer", "Fill in the blanks")}
                                                                            className="block"
                                                                            placeholder="Answer"
                                                                        />
                                                                        <InputError
                                                                            message={errors[`answer_options.${index}.answer`]}
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                    <div className='educare-list-action-btn'>
                                                                        <button
                                                                            type="button"
                                                                            className="educare-danger-btn-sm-fill"
                                                                            onClick={() => removeAnswerOptionFields(index)}
                                                                            disabled={answerOptions.length <= 1}
                                                                        >
                                                                            X
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                {item?.alternate_answers?.length > 0 && (
                                                                    item.alternate_answers.map((altAnswer, altIndex) => (
                                                                        <div className='flex justify-end gap-5 mt-2' key={altIndex}>
                                                                            <div className="educare-input-field-styles w-[90%]">
                                                                                <TextareaInput
                                                                                    value={altAnswer?.answer}
                                                                                    onChange={(event) => handleFormChange(event, index, "alternate_answer", "Fill in the blanks", altIndex)}
                                                                                    className="block"
                                                                                    placeholder="Alternate Answer"
                                                                                />
                                                                                <InputError
                                                                                    message={errors.alternate_answer}
                                                                                    className="mt-2"
                                                                                />
                                                                                <InputError
                                                                                    message={errors[`answer_options.${index}.alternate_answers.${altIndex}.answer`]}
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                            <div className='educare-list-action-btn'>
                                                                                <button
                                                                                    type="button"
                                                                                    className="educare-danger-btn-sm-fill"
                                                                                    onClick={() => removeAlternateAnswerFields(index, altIndex)}
                                                                                >
                                                                                    X
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                )}

                                                                <div className='flex justify-end mr-10'>
                                                                    <PrimaryButton
                                                                        className="educare-secondary-btn-md-fill w-[280px] mt-2"
                                                                        onClick={() => addAlternateAnswerFields(index)}
                                                                    >
                                                                        <i className='icon-PlusCircle'></i> Add Alternate Answer
                                                                    </PrimaryButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                            }
                                        </>
                                    )
                                }

                                {/* Fill Blanks Fields end*/}

                                {/*true false field start*/}
                                {
                                    data.question_type === 'Yes/No' && (
                                        <div>
                                            {
                                                answerOptions?.length > 0 && (
                                                    answerOptions?.map((item, index) => <div key={index} className='flex gap-5 mb-4'>
                                                        <div className="educare-radio-field-styles">
                                                            <RadioInput
                                                                name={`is_correct_${index}`}
                                                                checked={item.is_correct}
                                                                onChange={(event) => handleFormChange(event, index, "is_correct", "Yes/No")}
                                                            />
                                                        </div>
                                                        <div className="educare-input-field-styles w-[100%]">
                                                            <TextareaInput
                                                                value={item.answer}
                                                                onChange={(event) => handleFormChange(event, index, "answer", "Yes/No")}
                                                                className="block"
                                                                placeholder="Yes/True or No/False"
                                                            />
                                                            <InputError
                                                                message={errors[`answer_options.${index}.answer`]}
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>)
                                                )
                                            }
                                        </div>
                                    )
                                }

                                {/*short question field start*/}
                                {
                                    data?.question_type === "Short Answer" && (
                                        <>
                                            {
                                                answerOptions?.length > 0 && (
                                                    answerOptions.map((item, index) => (
                                                        <div key={index}>
                                                            <div className='mb-4'>
                                                                <div className='flex gap-5'>
                                                                    <div className="educare-input-field-styles w-[100%]">
                                                                        <TextareaInput
                                                                            value={item.answer}
                                                                            onChange={(event) => handleFormChange(event, index, "answer", "Short Answer")}
                                                                            className="block"
                                                                            placeholder="Answer"
                                                                        />
                                                                        <InputError
                                                                            message={errors[`answer_options.${index}.answer`]}
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {item?.alternate_answers?.length > 0 && (
                                                                    item.alternate_answers.map((altAnswer, altIndex) => (
                                                                        <div className='flex justify-end gap-5 mt-2' key={altIndex}>
                                                                            <div className="educare-input-field-styles w-[90%]">
                                                                                <TextareaInput
                                                                                    value={altAnswer?.answer}
                                                                                    onChange={(event) => handleFormChange(event, index, "alternate_answer", "Short Answer", altIndex)}
                                                                                    className="block"
                                                                                    placeholder="Alternate Answer"
                                                                                />
                                                                                <InputError
                                                                                    message={errors[`answer_options.${index}.alternate_answers.${altIndex}.answer`]}
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                            <div className='educare-list-action-btn'>
                                                                                <button
                                                                                    type="button"
                                                                                    className="educare-danger-btn-sm-fill"
                                                                                    onClick={() => removeAlternateAnswerFields(index, altIndex)}
                                                                                >
                                                                                    X
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                )}

                                                                <div className='flex justify-end mr-10'>
                                                                    <PrimaryButton
                                                                        className="educare-secondary-btn-md-fill w-[280px] mt-2"
                                                                        onClick={() => addAlternateAnswerFields(index)}
                                                                    >
                                                                        <i className='icon-PlusCircle'></i> Add Alternate Answer
                                                                    </PrimaryButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                            }
                                        </>
                                    )
                                }
                                {/*short question field end*/}
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Mark"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        value={
                                            data.mark
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "mark",
                                                isNaN(e.target.value) ? '' : parseInt(e.target.value)
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.mark
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Share With"
                                    />
                                    <SelectInput
                                        data_label="Share"
                                        data={shareAudienceTypes}
                                        value={
                                            data.share_with
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "share_with",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.share_with
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="is_published"
                                            name="is_published"
                                            checked={
                                                data.is_published
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "is_published",
                                                    e.target
                                                        .checked
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="is_published"
                                            value="Publish"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-[14px] text-headingLightest'>You need to publish this question, if you want to assign it to an exam.</p>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <Link
                                        className="educare-gray-btn-lg-stroke"
                                        href={route('online_exam.create_question')}
                                    >
                                        Reset
                                    </Link>
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type='button'
                                        onClick={handleSaveQuestion}
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddNewTopicPopup
                addNewTopic={addNewTopic}
                setAddNewTopic={setAddNewTopic}
                formData={data}
            />

            <AddPassagePopup
                addPassage={addPassage}
                setAddPassage={setAddPassage}
                virtualAssets={virtualAssets}
                setSelectedVirtualAsset={setSelectedVirtualAsset}
            />
        </>
    );
};

export default CreateQuestionForm;
