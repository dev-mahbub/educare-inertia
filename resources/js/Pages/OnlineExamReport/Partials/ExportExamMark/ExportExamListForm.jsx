import React from 'react';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

const ExportExamListForm = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_grade: "",
        select_subject: "",
        select_exam_mode: "",
        select_participant_exam: "",
    });

    return (
        <div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className='flex items-end flex-wrap gap-5'>
                        <div className="educare-input-field-styles w-[280px] max-w-[280px]">
                            <InputLabel
                                value="Grade"
                            />
                            <SelectInput
                                data_label="Grade"
                                data={[]}
                                value={
                                    data.select_grade
                                }
                                onChange={(e) =>
                                    setData(
                                        "select_grade",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.select_grade
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles w-[280px] max-w-[280px]">
                            <InputLabel
                                value="Subject"
                            />
                            <SelectInput
                                data_label="Subject"
                                data={[]}
                                value={
                                    data.select_subject
                                }
                                onChange={(e) =>
                                    setData(
                                        "select_subject",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.select_subject
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles w-[280px] max-w-[280px]">
                            <InputLabel
                                value="Exam Mode"
                            />
                            <SelectInput
                                data_label="Mode"
                                data={[]}
                                value={
                                    data.select_exam_mode
                                }
                                onChange={(e) =>
                                    setData(
                                        "select_exam_mode",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.select_exam_mode
                                }
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton
                            // disabled={processing}
                            className="educare-primary-btn-md-fill"
                        >
                            Find Exam
                        </PrimaryButton>
                    </div>
                    <div className="grid grid-cols-12 gap-5 mt-5">
                        <div className="col-span-12 md:col-span-6 xl:col-span-4">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Participated Exam"
                                />
                                <SelectInput
                                    data_label="Exam"
                                    data={[]}
                                    value={
                                        data.select_participant_exam
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "select_participant_exam",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.select_participant_exam
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='educare-exam-info-between mt-5'>
                        <div>
                            <p>Exam Name:
                                <span>Rakib</span>
                            </p>
                            <p>Mode:
                                <span> test exam</span>
                            </p>
                            <p>Start Date:
                                <span> 01-08-2024</span>
                            </p>
                            <p>End Date:
                                <span> 12-08-2024</span>
                            </p>
                        </div>
                        <div>
                            <p>Exam Code:
                                <span> 887676576</span>
                            </p>
                            <p>Class Name:
                                <span> XII</span>
                            </p>
                            <p>Subject:
                                <span> English</span>
                            </p>
                            <p>Pass/Full Marks:
                                <span> 33/100</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportExamListForm;