import React from 'react';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import SuccessButton from '@/Components/SuccessButton';
import InputLabel from '@/Components/InputLabel';


const TakenExamList = () => {
    //participated data
    const examTakenData = [
        {
            id: 1,
            name: "Shruti Hasan",
            class: 'Ix',
            roll: '',
            launchDate: '',
            obtMarks: '',
            rightWrong: '',
            question: '',
            result: '',
            retake: '',

        },
    ];
    //not participated data
    const examNotTakenData = [
        {
            id: 1,
            name: "Rakib Hasan",
            class: 'Ix',

        },
    ];

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_exam: "",
    });

    return (
        <div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-4">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Participated Exam"
                                />
                                <SelectInput
                                    data_label="Exam"
                                    data={[]}
                                    value={
                                        data.select_exam
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "select_exam",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.select_exam
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
                            <p>Total Pass/Fail:
                                <span> 0/0</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/*Exam Taken list start*/}
            <div className='mt-10'>
                <div className='flex justify-between items-end mb-2 flex-wrap'>
                    <div className="educare-card-title gap-1 pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Exam Taken
                        </h5>
                    </div>
                    <div className="educare-header-filtar-bar-count">
                        <span>Total: {examTakenData.length}</span>
                    </div>
                </div>
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list max-h-[400px] overflow-y-scroll pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Roll</th>
                                    <th>Launch Date</th>
                                    <th>Obt./Tot. Marks</th>
                                    <th>Right/Wrong</th>
                                    <th>Question</th>
                                    <th>Result</th>
                                    <th>Retake</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    examTakenData.length > 0 ? (
                                        examTakenData.map((participate, index) => <tr key={index}>
                                            <td>{participate.name}</td>
                                            <td>{participate.class}</td>
                                            <td>{participate.roll}</td>
                                            <td>{participate.launchDate}</td>
                                            <td>{participate.obtMarks}</td>
                                            <td>{participate.rightWrong}</td>
                                            <td>{participate.question}</td>
                                            <td>{participate.result}</td>
                                            <td>{participate.retake}</td>
                                        </tr>)
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className='text-center'>Please select exam</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*Participated Students list end*/}
            {/*Not Participated Students list start*/}
            <div className='mt-10'>
                <div className='flex justify-between gap-1 items-end mb-2 flex-wrap'>
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Exam Not Taken
                        </h5>
                    </div>
                    <div className="educare-header-filtar-bar-count">
                        <span>Total: {examNotTakenData.length}</span>
                    </div>
                </div>
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list max-h-[400px] overflow-y-scroll pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    examNotTakenData.length > 0 ? (
                                        examNotTakenData.map((notParticipate, index) => <tr key={index}>
                                            <td>{notParticipate.name}</td>
                                            <td>{notParticipate.class}</td>
                                        </tr>)
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className='text-center'>Please select exam</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*Not participated Students list end*/}
        </div>
    );
};

export default TakenExamList;