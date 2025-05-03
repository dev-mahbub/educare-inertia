import { Link } from '@inertiajs/react';

const ExamFinish = ({
    virtualExam
}) => {
    return (
        <div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[10px] pt-[10px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border pb-0 md:pb-6 pt-4 md:pt-8 ">
                        <div className='flex bg-slate-200 p-[40px] rounded-md justify-center mx-0 md:mx-6'>
                            <div className='flex flex-col items-start sm:items-center'>
                                <p className='text-[20px] text-center leading-8 text-heading mb-1'>Class assigned successfully, Publish your exam in exam listing so students can participate. You can also download as PDF file to crosscheck your exam.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                <Link
                    href={route('online_exam.assign_exam_grade', virtualExam?.id)}
                    className="educare-gray-btn-lg-stroke"
                >
                    Back
                </Link>
                <Link
                    href={route('online_exam.exam_list')}
                    className="educare-primary-btn-lg-fill"
                >
                    Finish
                </Link>
            </div>
        </div>
    );
};

export default ExamFinish;
