import TextInput from '@/Components/TextInput';
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignSelectedQuestionList = ({
    selectedQuestions,
    setSelectedQuestions,
    virtualExam
}) => {

    const {
        data,
        setData,
        put
    } = useForm({
        questions: [],
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            questions: selectedQuestions?.map(item => ({
                virtual_question_id: item?.id,
                mark: item?.mark,
                display_order: item?.display_order
            }))
        }));
    }, [selectedQuestions]);

    // Handle Order Input Change
    const handleOrderChange = (itemId, newOrderValue) => {
        const remainingQuestion = selectedQuestions.map(item =>
            item.id === itemId ? { ...item, display_order: newOrderValue } : item
        );

        setSelectedQuestions(remainingQuestion);
    }

    // Handle Remove Row
    const handleRemoveRow = (itemId) => {
        const remainingRows = selectedQuestions.filter(item => item.id !== itemId);

        setSelectedQuestions(remainingRows);
    };

    // handle save assign question start
    const handleAssignQuestionSave = (e) => {
        e.preventDefault();

        if(data?.questions?.length == 0) {
            toast.error("Please select at least one question.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            put(route('online_exam.save_assign_exam_question', virtualExam?.id))
        }
    }
    // handle save assign question end

    return (
        <>
            <div className="educare-admission-list-area mt-10">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Selected Questions - Set Order
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Question Type</th>
                                        <th>Marks</th>
                                        <th>Grade/Sub.</th>
                                        <th>Order</th>
                                        <th>Difficulty</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedQuestions.length > 0 ? (
                                            selectedQuestions.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <span
                                                            dangerouslySetInnerHTML={{ __html: item.question }}
                                                        >

                                                        </span>
                                                    </td>
                                                    <td>{item.question_type}</td>
                                                    <td>{item.mark}</td>
                                                    <td>{item.class_subject}</td>
                                                    <td>
                                                        <div className="educare-input-field-styles w-[120px]">
                                                            <TextInput
                                                                value={item.display_order || ""}
                                                                onChange={(e) =>
                                                                    handleOrderChange(item.id, isNaN(e.target.value) ? '' : parseInt(e.target.value))
                                                                }
                                                                className="block"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{item.difficulty_level}</td>
                                                    <td>
                                                        <div className="educare-list-action-btn">
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={() => handleRemoveRow(item.id)}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : <tr>
                                            <td colSpan={7} className="text-center">No questions selected</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                <Link
                    href={route('online_exam.create_exam', { id: virtualExam ?.id})}
                    className="educare-gray-btn-lg-stroke"
                >
                    Back
                </Link>
                <button
                    type="button"
                    className="educare-primary-btn-lg-fill"
                    onClick={handleAssignQuestionSave}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default AssignSelectedQuestionList;
