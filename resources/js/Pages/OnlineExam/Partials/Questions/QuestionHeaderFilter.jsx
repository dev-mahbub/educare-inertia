import InputError from "@/Components/InputError";
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionHeaderFilter = ({
    subjects,
    classNames,
    onlineTopics,
    questionTypes,
    difficultyLevels,
    languages,
    virtualAssets,
    statusTypes,
    publishStatusTypes,
    setSearchText,
    data,
    setData,
    errors
}) => {

    // handle change form value start
    const handleChangeFormValue = (field, value) => {
        let newData;

        if(field == 'class_name_id') {
            newData = {
                class_name_id: value,
                subject_id: "",
                online_topic_id: "",
                virtual_asset_id: ""
            }
        }
        else if(field == 'subject_id') {
            newData = {
                subject_id: value,
                online_topic_id: "",
                virtual_asset_id: ""
            }
        } else {
            newData = {
                [field]: value
            }
        }

        const updatedData = { ...data, ...newData }

        setData(updatedData);

        router.post(route('online_exam.question_list'), updatedData);
    }
    // handle change form value end

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };

    //handle show advance search
    const [showAdvanceSearch, setShowAdvanceSearch] = useState(true);
    const handleShowAdvanceSearch = () => {
        setShowAdvanceSearch(!showAdvanceSearch);
    }

    // handle search start
    const handleSearch = (e) => {
        e.preventDefault();

        setSearchText(data?.search ?? "");
    }
    // handle search end

    // handle bulk update status start
    const handleBulkUpdateStatus = (e) => {
        e.preventDefault();

        if(data?.class_name_id == "" || data?.status_type == "") {
            toast.error('Class and type is required', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                class_name_id: data.class_name_id,
                subject_id: data.subject_id,
                status: data.status_type
            }

            router.put(route('online_exam.update_bulk_question_status'), form_data, {
                onSuccess: () => {
                    router.post(route('online_exam.question_list'), data);
                },
                onError: (errors) => {
                    for (const key in errors) {
                        if (key == 'class_name_id' || key == 'status') {
                            toast.error('Class and type is required', {
                                position: 'top-right',
                                autoClose: 1500,
                            });

                            break;
                        }
                    }

                    router.post(route('online_exam.question_list'), data);
                }
            });
        }
    }
    // handle bulk update status end


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
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('online_exam.question_list')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <PrimaryButton
                                        // disabled={processing}
                                        className="educare-warning-btn-md-fill"
                                        onClick={handleShowAdvanceSearch}
                                        type="button"
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
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={classNames}
                                                        value={
                                                            data.class_name_id
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
                                                                "class_name_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Subject"
                                                        data={subjects}
                                                        value={
                                                            data.subject_id
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
                                                                "subject_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
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
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Publish"
                                                        data={publishStatusTypes}
                                                        value={
                                                            data.publish_status
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
                                                                "publish_status",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4 xxxl:col-span-2">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Status"
                                                        data={statusTypes}
                                                        value={
                                                            data.status
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
                                                                "status",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
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
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        }
                        <div className="flex justify-end flex-wrap gap-2 mt-5">
                            <div className="educare-input-field-styles w-[230px]">
                                <SelectInput
                                    data_label="Type"
                                    data={statusTypes}
                                    value={
                                        data.status_type
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "status_type",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.status_type
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton
                                className="educare-success-btn-md-fill"
                                type="button"
                                onClick={handleBulkUpdateStatus}
                            >
                                Bulk Operation
                            </PrimaryButton>
                            <Link
                                href={route('online_exam.create_question')}
                                className="educare-primary-btn-md-fill"
                            >
                                <i className='icon-PlusCircle'></i> Add a Question
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuestionHeaderFilter;
