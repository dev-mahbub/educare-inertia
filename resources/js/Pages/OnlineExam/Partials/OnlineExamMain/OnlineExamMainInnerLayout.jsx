import React from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';

const OnlineExamMainInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Dashboard" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[10px] pt-[10px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="bg-primary/70 px-5 py-3 rounded-md">
                                <h5 className='text-white text-[22px]'>
                                    DASHBOARD
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border pb-0 md:pb-6 pt-4 md:pt-8 ">
                                <div className='flex bg-slate-200 p-[40px] rounded-md justify-center mx-0 md:mx-6'>
                                    <div className='flex flex-col items-start sm:items-center'>
                                        <p className='text-[20px] text-heading mb-1'>Welcome to</p>
                                        <h3 className='text-[30px] text-primary/70'>Online Exam Management</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineExamMainInnerLayout;