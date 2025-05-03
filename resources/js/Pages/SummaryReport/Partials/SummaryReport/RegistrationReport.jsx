import React from 'react';
import { useState } from 'react';

const RegistrationReport = () => {
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
                        <i className="icon-CurrencyInr font-semibold"></i>
                        Registration Report
                    </h5>
                    <span onClick={handleToggle} className="cursor-pointer">
                        <i className={`${cardActive ? "icon-minus" : "icon-plus"}`}></i>
                    </span>
                </div>
                <div className={`educare-common-card-wrap-border border-t border-grayLight/20 pt-5 ${cardActive ? "" : "hidden"}`}>
                    <div className="educare-common-card mb-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
                                <div className="educare-update-fee-structure educare-old-student-fee-structure">
                                    <div className="educare-update-fee-structure-heading">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <h5 className='cursor-pointer text-white'>
                                                    <span className='mr-2'> <i className="icon-CurrencyInr font-semibold"></i></span>
                                                    Class Wise Registration
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border border-supportingA/10 border-t-0'>
                                        <ul>
                                            <li>
                                                <span>I</span>
                                                <span>1</span>
                                                <span>500</span>
                                            </li>
                                            <li>
                                                <span>II</span>
                                                <span>2</span>
                                                <span>1000</span>
                                            </li>
                                            <li>
                                                <span>III</span>
                                                <span>3</span>
                                                <span>1500</span>
                                            </li>
                                            <li>
                                                <span>IV</span>
                                                <span>4</span>
                                                <span>2000</span>
                                            </li>
                                            <li>
                                                <span>V</span>
                                                <span>5</span>
                                                <span>1200</span>
                                            </li>

                                        </ul>
                                        <ul className='bg-primary/5'>
                                            <li className='maxXs:flex-wrap maxXs:gap-1.5 maxXs:justify-start'>
                                                <h5> Total Student : 6 </h5>
                                                <h5> Total Fee Collection  :  <i className="icon-CurrencyInr font-semibold"></i> 2500</h5>
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

export default RegistrationReport;