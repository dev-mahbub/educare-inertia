import InputLabel from '@/Components/InputLabel';
import React from 'react';
import { useState } from 'react';

const SummaryReportForm = () => {
    //card enable/disable start
    const [cardActive, setCardActive] = useState(true);
    const handleToggle = () => {
        setCardActive(!cardActive);
    };

    return (

        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[30px] pb-7 pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className={`educare-common-card-title ${cardActive ? "" : "pb-0"}`}>
                    <h5 onClick={handleToggle} className='cursor-pointer'>
                        <i className="icon-user"></i>
                        Teacher Attendance Report
                    </h5>
                    <span onClick={handleToggle} className="cursor-pointer">
                        <i className={`${cardActive ? "icon-minus" : "icon-plus"}`}></i>
                    </span>
                </div>
                <div className={`educare-common-card-wrap-border border-t border-grayLight/20 pt-5 ${cardActive ? "" : "hidden"}`}>
                    <div className="educare-common-card mb-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                <div className="educare-update-fee-structure educare-old-student-fee-structure">
                                    <div className="educare-update-fee-structure-heading">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="fee_structure_old_1"
                                                    value="TEACHER ON LEAVE"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border border-supportingA/10 border-t-0'>
                                        <ul>
                                            <li>
                                                <span>Mukesh Kumar</span>
                                                <span>Teacher</span>
                                            </li>
                                            <li>
                                                <span>John Smith</span>
                                                <span>Engineer</span>
                                            </li>
                                            <li>
                                                <span>Alice Johnson</span>
                                                <span>Doctor</span>
                                            </li>
                                            <li>
                                                <span>Rajesh Sharma</span>
                                                <span>Manager</span>
                                            </li>
                                            <li>
                                                <span>Emily Davis</span>
                                                <span>Artist</span>
                                            </li>

                                        </ul>
                                        <ul className='bg-primary/5'>
                                            <li>
                                                <h5>Total : </h5>
                                                <h5>5</h5>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                <div className="educare-update-fee-structure educare-old-student-fee-structure">
                                    <div className="educare-update-fee-structure-heading">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="fee_structure_old_1"
                                                    value="ABSENT TEACHER"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border border-supportingA/10 border-t-0'>
                                        <ul>
                                            <li>
                                                <span>Mukesh Kumar</span>
                                                <span>Teacher</span>
                                            </li>
                                            <li>
                                                <span>John Smith</span>
                                                <span>Engineer</span>
                                            </li>
                                            <li>
                                                <span>Alice Johnson</span>
                                                <span>Doctor</span>
                                            </li>
                                            <li>
                                                <span>Rajesh Sharma</span>
                                                <span>Manager</span>
                                            </li>
                                            <li>
                                                <span>Emily Davis</span>
                                                <span>Artist</span>
                                            </li>
                                        </ul>
                                        <ul className='bg-primary/5'>
                                            <li>
                                                <h5>Total : </h5>
                                                <h5>5</h5>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                <div className="educare-update-fee-structure educare-old-student-fee-structure">
                                    <div className="educare-update-fee-structure-heading">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="fee_structure_old_1"
                                                    value="TEACHER ON HALF DAY"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border border-supportingA/10 border-t-0'>
                                        <div className='text-center py-1'>
                                            <p className='border border-red-100 bg-red-200 border-dashed py-3 text-red-400'>
                                                <i className="icon-warning-1"></i> No Record Exist!</p>
                                        </div>
                                        <ul className='bg-primary/5'>
                                            <li>
                                                <h5>Total : </h5>
                                                <h5>5</h5>
                                            </li>
                                        </ul>
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

export default SummaryReportForm;