import InputLabel from '@/Components/InputLabel';
import React from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { useForm } from '@inertiajs/react';

const AmountCollectionReport = () => {
    //card enable/disable start
    const [cardActive, setCardActive] = useState(true);
    const handleToggle = () => {
        setCardActive(!cardActive);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_date: new Date(),
    });

    const selectDateData = (e) => {
        e.preventDefault();
    };

    return (

        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[30px] pb-7 pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className={`educare-common-card-title ${cardActive ? "" : "pb-0"}`}>
                    <h5 onClick={handleToggle} className='cursor-pointer'>
                        <i className="icon-CurrencyInr font-semibold"></i>
                        Amount Collection Report
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
                                                    value="CLASS STRENGTH"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border border-supportingA/10 border-t-0'>
                                        <ul className='overflow-auto'>
                                            <li>
                                                <span>KG 1 A</span>
                                                <span>0</span>
                                            </li>
                                            <li>
                                                <span>KG 1 B</span>
                                                <span>0</span>
                                            </li>
                                            <li>
                                                <span>I A</span>
                                                <span>4</span>
                                            </li>
                                            <li>
                                                <span>I B</span>
                                                <span>4</span>
                                            </li>
                                            <li>
                                                <span>I C</span>
                                                <span>2</span>
                                            </li>
                                            <li>
                                                <span>II A</span>
                                                <span>7</span>
                                            </li>
                                            <li>
                                                <span>III A</span>
                                                <span>9</span>
                                            </li>
                                        </ul>
                                        <ul className='bg-primary/5'>
                                            <li>
                                                <h5>Total Student : </h5>
                                                <h5>54</h5>
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
                                                    value="MONTH WISE COLLECTION"
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
                                                <span>2000</span>
                                            </li>
                                            <li>
                                                <span>Alice Johnson</span>
                                                <span>1000</span>
                                            </li>
                                            <li>
                                                <span>Rajesh Sharma</span>
                                                <span>800</span>
                                            </li>
                                            <li>
                                                <span>Emily Davis</span>
                                                <span>500</span>
                                            </li>
                                            <li>
                                                <span>Alice Johnson</span>
                                                <span>1200</span>
                                            </li>
                                            <li>
                                                <span>Emily Davis</span>
                                                <span>1700</span>
                                            </li>
                                        </ul>
                                        <ul className='bg-primary/5'>
                                            <li>
                                                <h5>Total Collection : </h5>
                                                <h5>22000</h5>
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
                                                    value="CLASS WISE COLLECTION"
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
                                                <span>2000</span>
                                            </li>
                                            <li>
                                                <span>Alice Johnson</span>
                                                <span>1000</span>
                                            </li>
                                            <li>
                                                <span>Rajesh Sharma</span>
                                                <span>800</span>
                                            </li>
                                            <li>
                                                <span>Emily Davis</span>
                                                <span>500</span>
                                            </li>
                                            <li>
                                                <span>Alice Johnson</span>
                                                <span>1200</span>
                                            </li>
                                            <li>
                                                <span>Emily Davis</span>
                                                <span>1700</span>
                                            </li>
                                        </ul>
                                        <ul className='bg-primary/5'>
                                            <li>
                                                <h5>Total Collection : </h5>
                                                <h5>18000</h5>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-update-fee-structure educare-old-student-fee-structure">
                                    <div className="educare-update-fee-structure-heading maxXs:py-1.5">
                                        <div className="flex flex-wrap justify-between gap-2 items-center w-full">
                                            <div>
                                                <h5 className='text-white text-medium'>TODAY'S COLLECTION</h5>
                                            </div>
                                            <div>
                                                <form onSubmit={selectDateData}>
                                                    <div className="educare-input-field-styles">
                                                        <DatePicker
                                                            selected={
                                                                data?.select_date && new Date(data?.select_date) 
                                                            }
                                                            onChange={(date) =>
                                                                setData("select_date", date)
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
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border border-supportingA/10 border-t-0 large-structure'>
                                        <ul>
                                            <li>
                                                <span>2023/423</span>
                                                <span>Mukesh Kumar</span>
                                                <span>X A</span>
                                                <span>9057</span>
                                                <span>01-09-23 09:15 AM</span>
                                                <span>Cash</span>
                                            </li>
                                            <li>
                                                <span>2023/425</span>
                                                <span>Mukesh Kumar</span>
                                                <span>X B</span>
                                                <span>9057</span>
                                                <span>01-11-23 09:25 AM</span>
                                                <span>Cash</span>
                                            </li>
                                            <li>
                                                <span>2023/428</span>
                                                <span>Mukesh Kumar</span>
                                                <span>X C</span>
                                                <span>9057</span>
                                                <span>01-13-23 09:30 AM</span>
                                                <span>Cash</span>
                                            </li>
                                        </ul>
                                        <ul className='bg-primary/5'>
                                            <li>
                                                <h5>Total Collection : </h5>
                                                <h5>18000</h5>
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

export default AmountCollectionReport;