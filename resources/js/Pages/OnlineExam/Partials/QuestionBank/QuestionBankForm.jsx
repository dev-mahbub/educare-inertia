import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import CreateQuestionBankPopup from './QuestionBankPopup/CreateQuestionBankPopup';

const QuestionBankForm = () => {
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
    });

    const handleSearch = (e) => {
        e.preventDefault();

        post(route("online_exam.question_bank"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    //create question popup
    const [createQuestionBank, setCreateQuestionBank] = useState(false);
    const createHandleQuestionBankClick = () => {
        setCreateQuestionBank(!createQuestionBank);
    };

    return (
        <>
            <div className="educare-common-card-title">
                <h5>
                    Question bank is a group of questions as per your need. You can share a question bank with students
                </h5>
            </div>
            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                <div className='flex justify-end mb-4'>
                    <PrimaryButton
                        // disabled={processing}
                        className="educare-primary-btn-md-fill"
                        onClick={createHandleQuestionBankClick}
                    >
                        <i className='icon-PlusCircle'></i> Create a new question bank
                    </PrimaryButton>
                </div>
                <form onSubmit={handleSearch}>
                    <div className='flex justify-end gap-2'>
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search_id"
                                value={
                                    data.search
                                }
                                onChange={(e) =>
                                    setData(
                                        "search",
                                        e.target.value
                                    )
                                }
                                className="block"
                                placeHolder='Search Question Bank'
                            />
                            <InputError
                                message={
                                    errors.search
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className='educare-filter-action-btn'>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button
                                    type='submit'
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </form>
            </div>
            <CreateQuestionBankPopup
                createQuestionBank={createQuestionBank}
                setCreateQuestionBank={setCreateQuestionBank}
            />
        </>
    );
};

export default QuestionBankForm;