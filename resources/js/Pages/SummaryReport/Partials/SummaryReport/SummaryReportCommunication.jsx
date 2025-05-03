import React from 'react';
import { useState } from 'react';
import SummaryReportNews from './SummaryReportNews';
import SummaryReportNotices from '../../SummaryReportNotices';

const SummaryReportCommunication = () => {
    //card enable/disable start
    const [cardActive, setCardActive] = useState(true);
    const handleToggle = () => {
        setCardActive(!cardActive);
    };

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[30px] pb-7 pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className={`educare-common-card-title ${cardActive ? "" : "pb-0"}`}>
                        <h5 onClick={handleToggle} className='cursor-pointer'>
                            <i className="icon-UsersThree"></i>
                            Communication
                        </h5>
                        <span onClick={handleToggle} className="cursor-pointer">
                            <i className={`${cardActive ? "icon-minus" : "icon-plus"}`}></i>
                        </span>
                    </div>
                    <div className={`educare-common-card-wrap-border border-t border-grayLight/20 pt-5 ${cardActive ? "" : "hidden"}`}>
                        <div className="educare-common-card mb-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 mb-3">
                                    <div className="educare-update-fee-structure educare-old-student-fee-structure">
                                        <div className="educare-update-fee-structure-heading">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <h5 onClick={handleToggle} className='cursor-pointer text-white'>
                                                        <span className='mr-2'> <i className="icon-event"></i></span>
                                                        Events
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border border-supportingA/10 border-t-0'>
                                            <ul>
                                                <li>
                                                    <span>Makarsakranti</span>
                                                    <span>15-Jan-2024</span>
                                                    <span>15-Jan-2024</span>
                                                </li>
                                                <li>
                                                    <span>new yera 2025</span>
                                                    <span>12-Jan-2024</span>
                                                    <span>15-Jan-2024</span>
                                                </li>
                                                <li>
                                                    <span>Book fair</span>
                                                    <span>08-Jan-2024</span>
                                                    <span>10-Jan-2024</span>
                                                </li>
                                                <li>
                                                    <span>Annual day</span>
                                                    <span>04-Jan-2024</span>
                                                    <span>04-Jan-2024</span>
                                                </li>
                                                <li>
                                                    <span>new yera 2025</span>
                                                    <span>01-Jan-2024</span>
                                                    <span>01-Jan-2024</span>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <SummaryReportNews />
                                <SummaryReportNotices />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SummaryReportCommunication;