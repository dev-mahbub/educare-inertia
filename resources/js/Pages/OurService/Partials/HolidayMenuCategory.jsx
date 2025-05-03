import { Link } from '@inertiajs/react';
import React from 'react';

const HolidayMenuCategory = ({title}) => {
    return (
        <div className='educare-mis-report-menu-area bg-white'>
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className='icon-cap'></i>
                        <h4>{`${title ? title : "Holidays"}`}</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className="educare-mis-report-category-wrap">
                            <ul>
                                <li>
                                    <Link href="#"><i className="icon-PlusCircle"></i> Add/Edit Class</Link>
                                </li>
                                <li>
                                    <Link href="#">Assign Class Teachers</Link>
                                </li>
                                <li>
                                    <Link href="#">Assign Display Order</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HolidayMenuCategory;