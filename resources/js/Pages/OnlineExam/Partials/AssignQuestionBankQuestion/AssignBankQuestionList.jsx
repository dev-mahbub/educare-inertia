import React, { useState, useEffect } from "react";
import Checkbox from '@/Components/Checkbox';
import { Link, useForm } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import { Tooltip } from "@mui/material";

const AssignBankQuestionList = ({virtualQuestions, virtualAssignedQusetionsIds}) => {
    const [checkedData, setCheckedData] = useState([]);
    const questionData = virtualQuestions;

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        allow_all_question_id: false,
        questionCheck: [],
    });

    useEffect(() => {
        const filteredData = virtualQuestions.filter(question => 
          virtualAssignedQusetionsIds?.includes(question.id)
        );
        setCheckedData(filteredData);
        setData({
            allow_all_question_id: (virtualQuestions?.length ?? 0) === (virtualAssignedQusetionsIds?.length ?? 0), 
            questionCheck: virtualAssignedQusetionsIds ?? [],
        });
    }, [virtualQuestions, virtualAssignedQusetionsIds]);

    // Handle update question bank questions
    const handleUpdateQuestionBankQuestions = () => {
        put(route('online_exam.update_question_bank_question', route().params.id)); 
    };

    // Handle checkbox selection
    const handleOnlineExamQuestionSelect = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedQuestionIds = [...data.questionCheck];

        if (name === "allow_all_question_id") {
            newFormData.allow_all_question_id = value;

            if (value) {
                newCheckedQuestionIds = questionData.map(item => item.id);
            } else {
                newCheckedQuestionIds = [];
            }

            newFormData.questionCheck = newCheckedQuestionIds;
        } else {
            if (value) {
                newCheckedQuestionIds.push(id);
            } else {
                newCheckedQuestionIds = newCheckedQuestionIds.filter(checkedId => checkedId !== id);
            }

            newFormData.questionCheck = newCheckedQuestionIds;
            newFormData.allow_all_question_id = newCheckedQuestionIds.length === questionData.length;
        };

        const newCheckedData = questionData.filter(item => newCheckedQuestionIds.includes(item.id));

        setData(newFormData);
        setCheckedData(newCheckedData);

    };

    // Handle removing class from checkedData
    const handleCheckQuestion = (name, value, id) => {
        if (!value) {
            const newCheckedData = checkedData.filter(item => item.id !== id);
            setCheckedData(newCheckedData);

            let newCheckedQuestionIds = [...data.questionCheck].filter(checkedId => checkedId !== id);
            setData({
                ...data,
                questionCheck: newCheckedQuestionIds,
                allow_all_question_id: newCheckedQuestionIds.length === checkedData.length
            })
        }
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="flex gap-5 items-center mb-2">
                        <div className="educare-card-title pb-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Select Question
                            </h5>
                        </div>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Question Type</th>
                                        <th>Mark</th>
                                        <th>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="allow_all_question_id"
                                                        checked={data.allow_all_question_id || false}
                                                        onChange={(e) =>
                                                            handleOnlineExamQuestionSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                Select
                                            </div>
                                        </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questionData.length > 0 ? (
                                        questionData.map((item, i) => (
                                            <tr key={i}>
                                                <td dangerouslySetInnerHTML={{ __html: item.question }}></td>
                                                <td>{item.question_type}</td>
                                                <td>{item.mark}</td>
                                                <td>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name={"question_" + item.id}
                                                                checked={data.questionCheck.includes(item.id)}
                                                                onChange={(e) =>
                                                                    handleOnlineExamQuestionSelect(e.target.name, e.target.checked, item.id)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href={route('online_exam.edit_question', item?.id)}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Preview"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href={route('online_exam.preview_question', item?.id)}
                                                                    className="educare-tertiary-btn-sm-fill"
                                                                >
                                                                    <i className="icon-eye"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center">Questions not found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex gap-5 items-center mt-10 mb-4">
                        <div className="educare-card-title pb-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Assigned Questions
                            </h5>
                        </div>
                    </div>
                    <div className='educare-admission-list-inner-wrapper'>
                        <div className="educare-admission-list pb-0">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Question Type</th>
                                        <th>Mark</th>
                                        <th>Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checkedData.length > 0 ? (
                                        checkedData.map((item, i) => (
                                            <tr key={i}>
                                                <td dangerouslySetInnerHTML={{ __html: item.question }}></td>
                                                <td>{item.question_type}</td>
                                                <td>{item.mark}</td>
                                                <td>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name={"question_" + item.id}
                                                                checked={checkedData.some(dataItem => dataItem.id === item.id)}
                                                                onChange={(e) =>
                                                                    handleCheckQuestion(e.target.name, e.target.checked, item.id)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center">Questions not found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                <PrimaryButton
                    onClick={handleUpdateQuestionBankQuestions}
                    className="educare-primary-btn-lg-fill"
                >
                    Save
                </PrimaryButton>
            </div>
        </>
    );
};

export default AssignBankQuestionList;
