import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import RadioInput from '@/Components/RadioInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

const TakeSurveyPreviewList = ({ survey }) => {

    const [responseData, setResponseData] = useState(
        survey?.survey_questions?.map(question => ({
            survey_question_id: question?.id,
            question_type: question?.question_type,
            is_required_field: question?.is_required_field,
            answer: "",
        }))
    );

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        response: responseData,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            response: responseData,
        }));
    }, [responseData]);

    //handle multi check start
    const handleCheckboxChange = (questionId, optionValue, checked) => {
        setResponseData((prevResponseData) =>
            prevResponseData.map((response) => {
                if (response.survey_question_id === questionId) {
                    let answerArray = response.answer ? response.answer.split(',') : [];
                    if (checked) {
                        answerArray.push(optionValue)
                    } else {
                        answerArray = answerArray.filter(item => item !== optionValue);
                    }
                    return { ...response, answer: answerArray.join(',') }
                }
                return response;
            })
        )
    };
    //handle multi check end


    const dummyData = (e) => {
        e.preventDefault();
    };

    return (
        <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
            <div className='flex justify-center items-center'>
                <h3 className='text-[24px] text-heading font-semibold'>{survey.title}</h3>
            </div>
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Answer The Question ?</h5>
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-6">
                        {survey.survey_questions.length > 0 ? (
                            survey.survey_questions.map((survQuestion, index) => (
                                <div key={index} className="grid grid-cols-12 gap-5">
                                    {survQuestion.question_type.toLowerCase() === 'text' &&
                                        <div className="col-span-12 mb-4">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value={`${index + 1}. ${survQuestion?.title}`}
                                                />
                                                <TextInput
                                                    value={
                                                        data.response.find(ob => ob.survey_question_id === survQuestion.id)?.answer || ""
                                                    }
                                                    onChange={(e) =>
                                                        setResponseData(prevResponseData =>
                                                            prevResponseData.map(response =>
                                                                response.survey_question_id === survQuestion.id ?
                                                                    { ...response, answer: e.target.value } : response
                                                            )
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Textbox"
                                                />
                                                <InputError
                                                    message={
                                                        errors.take_feedback_survey_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    }

                                    {survQuestion.question_type.toLowerCase() === 'paragraph' &&
                                        <div className="col-span-12 ">
                                            <div className="educare-input-field-styles mb-4">
                                                <InputLabel
                                                    value={`${index + 1}. ${survQuestion?.title}`}
                                                />
                                                <TextareaInput
                                                    id="take_technology_survey_id"
                                                    value={
                                                        data.response.find(ob => ob.survey_question_id === survQuestion.id)?.answer || ""
                                                    }
                                                    onChange={(e) =>
                                                        setResponseData((prevResponseData) =>
                                                            prevResponseData.map((response) =>
                                                                response.survey_question_id === survQuestion.id ?
                                                                    { ...response, answer: e.target.value } : response
                                                            )
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.take_technology_survey_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    }

                                    {survQuestion.question_type.toLowerCase() === 'date' &&
                                        <div className="col-span-12 md:col-span-6 mb-4">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value={`${index + 1}. ${survQuestion?.title}`}
                                                />
                                                <DatePicker
                                                    selected={
                                                        data.response.find(ob => ob.survey_question_id === survQuestion.id)?.answer
                                                            ? new Date(data.response.find(r => r.survey_question_id === survQuestion.id)?.answer)
                                                            : null
                                                    }
                                                    onChange={(date) =>
                                                        setResponseData(prevResponseData =>
                                                            prevResponseData.map(response =>
                                                                response.survey_question_id === survQuestion.id ?
                                                                    { ...response, answer: date } : response
                                                            )
                                                        )

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
                                            </div>
                                        </div>
                                    }

                                    {survQuestion.question_type.toLowerCase() === 'range' &&
                                        <div className="col-span-12 mb-4">
                                            <div className='educare-input-field-styles'>
                                                <InputLabel
                                                    value={`${index + 1}. ${survQuestion?.title}`}
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-check min-width-full border rounded-md bg-white py-2 px-5">
                                                <div className="educare-radio-field-styles flex gap-5">
                                                    {survQuestion.options.length && (
                                                        survQuestion.options.map((option, index) => <RadioInput key={index}
                                                            name="question_type"
                                                            value={option.label ? option.label : option.value}
                                                            checked={data.response.find(r => r.survey_question_id === survQuestion.id)?.answer === option.value}
                                                            onChange={() => setResponseData(prevResponseData =>
                                                                prevResponseData.map(response =>
                                                                    response.survey_question_id === survQuestion.id
                                                                        ? { ...response, answer: option.value }
                                                                        : response
                                                                )
                                                            )}
                                                        />)
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    {survQuestion.question_type.toLowerCase() === 'multiple choice' &&
                                        <div className="col-span-12 mb-1">
                                            <div className='educare-input-field-styles'>
                                                <InputLabel
                                                    value={`${index + 1}. ${survQuestion?.title}`}
                                                />
                                            </div>
                                            {survQuestion.options.length && (
                                                survQuestion.options.map((multiQuestion, index) => <div key={index} className="educare-create-school-settings-list-check min-width-full border mb-3 rounded-md bg-white py-2 px-5">
                                                    <div className="educare-radio-field-styles flex gap-5">
                                                        <RadioInput
                                                            name="multi_question_type"
                                                            value={multiQuestion.label ? multiQuestion.label : multiQuestion.value}
                                                            checked={data.response.find(r => r.survey_question_id === survQuestion.id)?.answer === multiQuestion.value}
                                                            onChange={() => setResponseData(prevResponseData =>
                                                                prevResponseData.map(response =>
                                                                    response.survey_question_id === survQuestion.id
                                                                        ? { ...response, answer: multiQuestion.value }
                                                                        : response
                                                                )
                                                            )}
                                                        />
                                                    </div>
                                                </div>)
                                            )}
                                        </div>
                                    }

                                    {survQuestion.question_type.toLowerCase() === 'checkbox' &&
                                        <div className="col-span-12">
                                            <div className='educare-input-field-styles'>
                                                <InputLabel
                                                    value={`${index + 1}. ${survQuestion?.title}`}
                                                />
                                            </div>
                                            {survQuestion.options.length && (
                                                survQuestion.options.map((multiCheck, index) => <div key={index} className="educare-create-school-settings-list educare-create-school-settings-list-document check-large-width w-full mb-3 border rounded-md bg-white py-2 px-5">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id={multiCheck.label ? multiCheck.label : multiCheck.value}
                                                            name={multiCheck.label ? multiCheck.label : multiCheck.value}
                                                            checked={
                                                                data.response.find(r => r.survey_question_id === survQuestion.id)?.answer.split(',').includes(multiCheck.label)
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxChange(survQuestion.id, multiCheck.label, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor={multiCheck.label ? multiCheck.label : multiCheck.value}
                                                            value={multiCheck.label ? multiCheck.label : multiCheck.value}
                                                        />
                                                    </div>
                                                </div>)
                                            )}
                                        </div>
                                    }
                                </div>
                            ))
                        ) : ''}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TakeSurveyPreviewList;
