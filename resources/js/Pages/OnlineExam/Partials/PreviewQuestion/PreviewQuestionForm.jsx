import { concatName } from '@/Hooks/GlobalFunction';
import { Link } from '@inertiajs/react';
import React from 'react';

const PreviewQuestionForm = ({
    virtualQuestion
}) => {
    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <h5 className='text-headingLight font-medium'>This page shows you the information of the question, answers and other basic details in different question languages seperated as tabs.</h5>
                </div>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <div className='online-exam-question-wrapper'>
                            <div className="question-wrapper">
                                <i className='icon-Question'></i>
                                <h4 className='text-heading text-[20px]'>Question:</h4>
                            </div>
                            <span className='question-title' dangerouslySetInnerHTML={{ __html: virtualQuestion?.question}}></span>
                        </div>
                        <div className='online-exam-answer-wrapper mt-5 border-b border-border pb-[40px]'>
                            <div className="answer-wrapper">
                                <i className='icon-Lightbulb'></i>
                                <h4 className='text-heading text-[20px]'>Answers:</h4>
                            </div>

                            {virtualQuestion?.question_type != 'Descriptive' && virtualQuestion?.answer_options?.length > 0 &&
                                virtualQuestion.answer_options.map((item, index) => (
                                    <div
                                        key={index}
                                        className='multiple-answer'
                                    >
                                        <div className='answer-title !block'>
                                            <p className='answer'>
                                                {`${index+1}.${item?.answer}`}
                                                {item?.is_correct == true &&
                                                    <i className='icon-check-1'></i>
                                                }
                                            </p>

                                            {item?.alternate_answers?.length > 0 &&
                                                item?.alternate_answers?.map((alternateAnswer, innerIndex) => (
                                                    <p
                                                        key={innerIndex}
                                                        className='descriptive-answer'
                                                    >
                                                        <i className='icon-ArrowRight !text-black'></i>
                                                        <span>{alternateAnswer?.answer}</span>
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className="exam-summary">
                            <div className='flex justify-end mt-2.5'>
                                <Link
                                    href={route('online_exam.edit_question', virtualQuestion?.id)}
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className='icon-NotePencil'></i> Edit
                                </Link>
                            </div>
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 lg:col-span-6">
                                    <div className="summary-list">
                                        <ul>
                                            <li>
                                                <span className='summary-title'>Subject:</span>
                                                <span className='summary-value'>{virtualQuestion?.subject?.title}</span>
                                            </li>
                                            <li>
                                                <span className='summary-title'>Mark:</span>
                                                <span className='summary-value'>{parseInt(virtualQuestion?.mark ?? 0)}</span>
                                            </li>
                                            <li>
                                                <span className='summary-title'>Hint:</span>
                                                <span className='summary-value'>{virtualQuestion?.answer_explanation}</span>
                                            </li>
                                            <li>
                                                <span className='summary-title'>Question Bank:</span>
                                                <span className='summary-value'></span>
                                            </li>
                                            <li>
                                                <span className='summary-title'>Created By:</span>
                                                <span className='summary-value'>
                                                    {concatName(virtualQuestion?.created_by?.first_name, virtualQuestion?.created_by?.middle_name, virtualQuestion?.created_by?.last_name)} on {virtualQuestion?.created_on}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-6">
                                    <div className="summary-list">
                                        <ul>
                                            <li>
                                                <span className='summary-title'>Class:</span>
                                                <span className='summary-value'>{virtualQuestion?.class_name?.title}</span>
                                            </li>
                                            <li>
                                                <span className='summary-title'>Question Type:</span>
                                                <span className='summary-value'>{virtualQuestion?.question_type}</span>
                                            </li>
                                            <li>
                                                <span className='summary-title'>Difficulty Level:</span>
                                                <span className='summary-value'>{virtualQuestion?.difficulty_level}</span>
                                            </li>
                                            <li>
                                                <span className='summary-title'>Published:</span>
                                                <span className='summary-value'>{virtualQuestion?.is_published ? 'Yes' : 'No'}</span>
                                            </li>
                                            <li>
                                                <span className='summary-title'>Last Modified By:</span>
                                                {virtualQuestion?.updated_by != null &&
                                                    <span className='summary-value'>
                                                        {concatName(virtualQuestion?.updated_by?.first_name, virtualQuestion?.updated_by?.middle_name, virtualQuestion?.updated_by?.last_name)} on {virtualQuestion?.updated_on}
                                                    </span>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PreviewQuestionForm;
