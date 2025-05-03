import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from '@/Components/RadioInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

const OnlineExamAttempteList = ({ students, virtualExam, studentId }) => {

    const dummyData = (e) => {
        e.preventDefault();
    };

     // Initialize response data from exam questions
     const [responseData, setResponseData] = useState(() => {
        if (!virtualExam?.loadedQuestions) return [];
        
        return virtualExam.loadedQuestions.map(question => ({
            question_id: question?.id || '',
            question_type: question?.question_type || '',
            is_required_field: question?.is_required_field || false,
            answer: "",
        }));
    });

    // Initialize form with useForm hook
    const form = useForm({
        question_type: virtualExam?.question_type,
        virtual_exam_id: virtualExam?.id,
        student_id: studentId,
        attempt_number: virtualExam?.attempt_count + 1 || 1,
        answers: responseData
    });

    useEffect(() => {
        form.setData('student_id', studentId);
    }, [studentId]);

    // Update form data when responseData changes
    useEffect(() => {
        if (responseData) {
            form.setData('answers', responseData);
        }
    }, [responseData]);

    // Handle checkbox changes for multiple choice questions
    const handleCheckboxChange = (questionId, optionValue, checked) => {
        setResponseData(prevResponseData =>
            prevResponseData.map(response => {
                if (response.question_id === questionId) {
                    const answerArray = response.answer ? response.answer.split(',') : [];
                    
                    if (checked) {
                        answerArray.push(optionValue);
                    } else {
                        const index = answerArray.indexOf(optionValue);
                        if (index > -1) {
                            answerArray.splice(index, 1);
                        }
                    }
                    
                    return { ...response, answer: answerArray.join(',') };
                }
                return response;
            })
        );
    };

    // Handle single input changes
    const handleInputChange = (questionId, value) => {
        setResponseData(prevResponseData =>
            prevResponseData.map(response => {
                if (response.question_id === questionId) {
                    return { ...response, answer: value };
                }
                return response;
            })
        );
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        form.post(route('student_online_exam.store'), {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success - you can add success notifications here
            },
            onError: () => {
                // Handle errors - you can add error notifications here
            }
        });
    };

    return (
        <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
             {/* Display form errors if any */}
             {Object.keys(form.errors).length > 0 && (
                <div className="error-messages">
                    {Object.entries(form.errors).map(([key, error]) => (
                        <div key={key} className="error-message">{error}</div>
                    ))}
                </div>
            )}
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Answer The Question ?</h5>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-6">
                        {virtualExam?.loadedQuestions?.length > 0 ? (
                            virtualExam?.loadedQuestions?.map((virtualExamQuestion, index) => (
                                <div key={index} className="grid grid-cols-12 gap-5">
                                    {virtualExamQuestion.question_type.toLowerCase() === 'multiple choice' && (
                                        <div className="col-span-12 mb-6">
                                            <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                                                {/* Question Header */}
                                                <div className="flex items-start gap-3 mb-4">
                                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div 
                                                            className="prose max-w-none mb-4"
                                                            dangerouslySetInnerHTML={{
                                                                __html: virtualExamQuestion?.question
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Options Section */}
                                                <div className="space-y-3">
                                                    {(virtualExamQuestion?.answer_options || []).map((option, optionIndex) => (
                                                        <div 
                                                            key={optionIndex} 
                                                            className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                                        >
                                                            <RadioInput
                                                                name={`question_${virtualExamQuestion.id}`}
                                                                value={option.answer}
                                                                checked={
                                                                    responseData.find(r => 
                                                                        r.question_id === virtualExamQuestion.id
                                                                    )?.answer === option.answer
                                                                }
                                                                onChange={() => {
                                                                    const newResponseData = responseData.map(response =>
                                                                        response.question_id === virtualExamQuestion.id
                                                                            ? { ...response, answer: option.answer }
                                                                            : response
                                                                    );
                                                                    
                                                                    setResponseData(newResponseData);
                                                                    form?.setData('response', newResponseData);
                                                                }}
                                                                className="mr-3"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {virtualExamQuestion.question_type.toLowerCase() === 'short answer' && (
                                        <div className="col-span-12 mb-6">
                                            <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                                                {/* Question Header */}
                                                <div className="flex items-start gap-3 mb-4">
                                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div 
                                                            className="prose max-w-none mb-4"
                                                            dangerouslySetInnerHTML={{
                                                                __html: virtualExamQuestion?.question
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Short Answer Input */}
                                                <div className="relative">
                                                    <TextInput
                                                        type="text"
                                                        value={
                                                            responseData.find(r => 
                                                                r.question_id === virtualExamQuestion.id
                                                            )?.answer || ''
                                                        }
                                                        onChange={(e) => {
                                                            const newResponseData = responseData.map(response =>
                                                                response.question_id === virtualExamQuestion.id
                                                                    ? { ...response, answer: e.target.value }
                                                                    : response
                                                            );
                                                            
                                                            setResponseData(newResponseData);
                                                            form?.setData('response', newResponseData);
                                                        }}
                                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                                        placeholder="Type your answer here..."
                                                        maxLength={200}
                                                    />
                                                    
                                                    {/* Character Counter */}
                                                    <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                                                        {responseData.find(r => r.question_id === virtualExamQuestion.id)?.answer?.length || 0}/200
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {virtualExamQuestion.question_type.toLowerCase() === 'fill in the blanks' && (
                                        <div className="col-span-12 mb-6">
                                            <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                                                {/* Question Header */}
                                                <div className="flex items-start gap-3 mb-4">
                                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div 
                                                            className="prose max-w-none mb-4"
                                                            dangerouslySetInnerHTML={{
                                                                __html: virtualExamQuestion?.question
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Blanks Section */}
                                                <div className="space-y-4">
                                                    {(virtualExamQuestion?.answer_options || []).map((option, optionIndex) => (
                                                        <div 
                                                            key={optionIndex} 
                                                            className="flex flex-col space-y-2"
                                                        >
                                                            <label className="text-sm font-medium text-gray-700">
                                                                Blank #{optionIndex + 1}
                                                            </label>
                                                            <TextInput
                                                                type="text"
                                                                placeholder="Type your answer here"
                                                                value={
                                                                    responseData.find(r => 
                                                                        r.question_id === virtualExamQuestion.id
                                                                    )?.answer?.split(',')[optionIndex] || ''
                                                                }
                                                                onChange={(e) => {
                                                                    const currentAnswers = responseData
                                                                        .find(r => r.question_id === virtualExamQuestion.id)
                                                                        ?.answer?.split(',') || [];
                                                                    currentAnswers[optionIndex] = e.target.value;
                                                                    
                                                                    const newResponseData = responseData.map(response =>
                                                                        response.question_id === virtualExamQuestion.id
                                                                            ? { ...response, answer: currentAnswers.join(',') }
                                                                            : response
                                                                    );
                                                                    
                                                                    setResponseData(newResponseData);
                                                                    form?.setData('response', newResponseData);
                                                                }}
                                                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {virtualExamQuestion.question_type.toLowerCase() === 'multiple selection' && (
                                        <div className="col-span-12 mb-6">
                                            <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                                                {/* Question Header */}
                                                <div className="flex items-start gap-3 mb-4">
                                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div 
                                                            className="prose max-w-none mb-4"
                                                            dangerouslySetInnerHTML={{
                                                                __html: virtualExamQuestion?.question
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Options Section */}
                                                <div className="space-y-3">
                                                    {(virtualExamQuestion?.answer_options || []).map((option, optionIndex) => (
                                                        <div 
                                                            key={optionIndex} 
                                                            className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Checkbox
                                                                id={`question_${virtualExamQuestion.id}_${optionIndex}`}
                                                                name={`question_${virtualExamQuestion.id}`}
                                                                value={option.answer}
                                                                checked={
                                                                    responseData.find(r => 
                                                                        r.question_id === virtualExamQuestion.id
                                                                    )?.answer?.split(',').includes(option.answer)
                                                                }
                                                                onChange={(e) => {
                                                                    const currentAnswers = responseData
                                                                        .find(r => r.question_id === virtualExamQuestion.id)
                                                                        ?.answer?.split(',').filter(Boolean) || [];
                                                                    
                                                                    const newAnswers = e.target.checked
                                                                        ? [...currentAnswers, option.answer]
                                                                        : currentAnswers.filter(ans => ans !== option.answer);
                                                                    
                                                                    const newResponseData = responseData.map(response =>
                                                                        response.question_id === virtualExamQuestion.id
                                                                            ? { ...response, answer: newAnswers.join(',') }
                                                                            : response
                                                                    );
                                                                    
                                                                    setResponseData(newResponseData);
                                                                    form?.setData('response', newResponseData);
                                                                }}
                                                                className="mr-3"
                                                            />
                                                            <label 
                                                                htmlFor={`question_${virtualExamQuestion.id}_${optionIndex}`}
                                                                className="flex-1 cursor-pointer"
                                                            >
                                                                {option.answer}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {virtualExamQuestion.question_type.toLowerCase() === 'yes/no' && (
                                        <div className="col-span-12 mb-6">
                                            <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                                                {/* Question Header */}
                                                <div className="flex items-start gap-3 mb-4">
                                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div 
                                                            className="prose max-w-none mb-4"
                                                            dangerouslySetInnerHTML={{
                                                                __html: virtualExamQuestion?.question
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Yes/No Options */}
                                                <div className="flex gap-4">
                                                    {['Yes', 'No'].map((option, optionIndex) => (
                                                        <div 
                                                            key={optionIndex} 
                                                            className="flex-1"
                                                        >
                                                            <label 
                                                                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                                                htmlFor={`question_${virtualExamQuestion.id}_${option}`}
                                                            >
                                                                <RadioInput
                                                                    id={`question_${virtualExamQuestion.id}_${option}`}
                                                                    name={`question_${virtualExamQuestion.id}`}
                                                                    value={option}
                                                                    checked={
                                                                        responseData.find(r => 
                                                                            r.question_id === virtualExamQuestion.id
                                                                        )?.answer === option
                                                                    }
                                                                    onChange={() => {
                                                                        const newResponseData = responseData.map(response =>
                                                                            response.question_id === virtualExamQuestion.id
                                                                                ? { ...response, answer: option }
                                                                                : response
                                                                        );
                                                                        
                                                                        setResponseData(newResponseData);
                                                                        form?.setData('response', newResponseData);
                                                                    }}
                                                                    className="mr-3"
                                                                />
                                                                <span className="text-gray-700">{option}</span>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {virtualExamQuestion.question_type.toLowerCase() === 'descriptive' && (
                                        <div className="col-span-12 mb-6">
                                            <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                                                {/* Question Header */}
                                                <div className="flex items-start gap-3 mb-4">
                                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div 
                                                            className="prose max-w-none mb-4"
                                                            dangerouslySetInnerHTML={{
                                                                __html: virtualExamQuestion?.question
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Answer Section */}
                                                <div className="relative">
                                                <TextareaInput
                                                    value={responseData.find(ob => ob.question_id === virtualExamQuestion.id)?.answer || ""}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        const newResponseData = responseData.map(response => 
                                                            response.question_id === virtualExamQuestion.id
                                                                ? { ...response, answer: newValue }
                                                                : response
                                                        );
                                                        
                                                        // Update both states synchronously
                                                        setResponseData(newResponseData);
                                                        form?.setData('response', newResponseData); // Assuming useForm's setData accepts field name and value
                                                    }}
                                                    className="w-full min-h-[200px] p-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-y"
                                                    placeholder="Type your answer here..."
                                                />
                                                    
                                                    {/* Character count and status indicators */}
                                                    <div className="absolute bottom-4 right-4 flex items-center gap-3 text-sm text-gray-500">
                                                        <span>
                                                            {(form?.data?.response || []).find(ob => ob.question_id === virtualExamQuestion.id)?.answer?.length || 0} characters
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : ''}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2.5 mt-5 justify-end">
                    <PrimaryButton
                        className="educare-primary-btn-lg-fill"
                        type="submit" 
                        disabled={form.processing}
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default OnlineExamAttempteList;
