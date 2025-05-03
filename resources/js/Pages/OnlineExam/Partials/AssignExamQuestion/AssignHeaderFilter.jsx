import InputError from "@/Components/InputError";
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const AssignHeaderFilter = ({
    hideQuestion,
    setHideQuestion,
    onlineTopics,
    virtualAssets,
    questionTypes,
    difficultyLevels,
    languages,
    setSearchText,
    virtualExam,
    selectedQuestions
}) => {

    const [assignedQuestionMarks, setAssignedQuestionMarks] = useState(0);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search: "",
        language: "",
        difficulty_level: "",
        question_type: "",
        online_topic_id: "",
        virtual_asset_id: "",
        select_all_question: "",
    });

    useEffect(() => {
        setAssignedQuestionMarks(selectedQuestions?.reduce((total, item) => total + parseInt(item?.mark ?? 0), 0));
    }, [selectedQuestions]);

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();

    };

    //handle show advance search
    const [showAdvanceSearch, setShowAdvanceSearch] = useState(true);
    const handleShowAdvanceSearch = () => {
        setShowAdvanceSearch(!showAdvanceSearch);
    }

    //handle hide question
    const handleHideQuestion = () => {
        setHideQuestion(!hideQuestion)
    }

    // handle search start
    const handleSearch = () => {
        setSearchText(data?.search);
    }
    // handle search end

    // handle change form value start
    const handleChangeFormValue = (field, value) => {
        const form_data = {
            ...data,
            [field]: value
        }

        setData(form_data);

        router.post(route('online_exam.assign_exam_question', virtualExam?.id), form_data);
    }
    // handle change form value end

    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className='flex flex-wrap gap-2.5 justify-end items-center'>
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="search"
                                    value={
                                        data.search
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "search",
                                            e.target.value
                                        )
                                    }
                                    placeHolder="Search here"
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.search
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className='educare-filter-action-btn flex flex-wrap gap-2'>
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={handleSearch}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <PrimaryButton
                                        // disabled={processing}
                                        className="educare-warning-btn-md-fill"
                                        onClick={handleShowAdvanceSearch}
                                    >
                                        <i className={`icon-CaretDown ${showAdvanceSearch ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}></i> Advance Search
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                        {
                            showAdvanceSearch ? (
                                <div className="educare-common-card mt-5">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Language"
                                                        data={languages}
                                                        value={
                                                            data.language
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
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
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Difficulty Level"
                                                        data={difficultyLevels}
                                                        value={
                                                            data.difficulty_level
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
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
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Question Type"
                                                        data={questionTypes}
                                                        value={
                                                            data.question_type
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
                                                                "question_type",
                                                                e.target.value
                                                            )
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
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Topic"
                                                        data={onlineTopics}
                                                        value={
                                                            data.online_topic_id
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
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
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Passage"
                                                        data={virtualAssets}
                                                        value={
                                                            data.virtual_asset_id
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
                                                                "virtual_asset_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.virtual_asset_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2 hidden">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="All Question"
                                                        data={[]}
                                                        value={
                                                            data.select_all_question
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
                                                                "select_all_question",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.select_all_question
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        }
                        <div className="flex justify-between flex-wrap gap-5 items-end">
                            <div className="flex flex-wrap gap-2 mt-7">
                                <div className="educare-common-card-title pb-none">
                                    <h5>
                                        Select Questions
                                    </h5>
                                </div>
                                <button
                                    href="#"
                                    className="educare-primary-btn-md-fill"
                                    onClick={handleHideQuestion}
                                >
                                    <i className={`icon-CaretDown mr-1 ${hideQuestion ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}></i>
                                    Hide Questions
                                </button>
                            </div>
                            <div className="flex items-center gap-5 flex-wrap">
                                <p>Exam Marks: <span className='badge primary'>{parseInt(virtualExam?.total_mark ?? 0)}</span></p>
                                <p>Assigned Ques. Marks: <span className='badge primary'>{assignedQuestionMarks}</span></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignHeaderFilter;
