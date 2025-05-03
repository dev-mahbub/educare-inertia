import React from 'react';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import SuccessButton from '@/Components/SuccessButton';


const LiveExamList = () => {
    //participated data
    const participatedData = [
        {
            id: 1,
            name: "Shruti Hasan",
            class: 'Ix',
            date: '02-08-2024',
            answer: 'correct answer'

        },
    ];
    //not participated data
    const notParticipatedData = [
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
                    <div className='flex gap-4 flex-wrap'>
                        <a href='#' className='flex gap-1 items-center text-info'>
                            <p>Live Exam</p>
                            <i className='icon-info'></i>
                        </a>
                        <div className="educare-input-field-styles max-w-[250px]">
                            <SelectInput
                                id="select_exam"
                                data_label="Class"
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
                        <SuccessButton
                            // disabled={processing}
                            className="educare-secondary-btn-md-fill"
                        >
                            Refresh
                        </SuccessButton>
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
            {/*Participated Students list start*/}
            <div className='mt-10'>
                <div className='flex justify-between items-end mb-2 flex-wrap'>
                    <div className="educare-card-title gap-1 pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Participated Students
                        </h5>
                    </div>
                    <div className="educare-header-filtar-bar-count">
                        <span>Total: {participatedData.length}</span>
                    </div>
                </div>
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list max-h-[400px] overflow-y-scroll pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Launch Date</th>
                                    <th>Question Answered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    participatedData.length > 0 ? (
                                        participatedData.map((participate, index) => <tr key={index}>
                                            <td>{participate.name}</td>
                                            <td>{participate.class}</td>
                                            <td>{participate.date}</td>
                                            <td>{participate.answer}</td>
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
            {/*Participated Students list end*/}
            {/*Not Participated Students list start*/}
            <div className='mt-10'>
                <div className='flex justify-between gap-1 items-end mb-2 flex-wrap'>
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Not participated Students
                        </h5>
                    </div>
                    <div className="educare-header-filtar-bar-count">
                        <span>Total: {notParticipatedData.length}</span>
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
                                    notParticipatedData.length > 0 ? (
                                        notParticipatedData.map((notParticipate, index) => <tr key={index}>
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

export default LiveExamList;