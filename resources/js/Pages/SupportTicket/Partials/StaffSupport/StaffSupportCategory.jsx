import { Link } from '@inertiajs/react';
import React from 'react';
import categoryOne from "../../../../../images/help-desk/category-1.png";
import categoryTwo from "../../../../../images/help-desk/category-2.png";
import categoryThree from "../../../../../images/help-desk/category-3.png";

const StaffSupportCategory = () => {
    return (
        <div className="educare-quick-report-area mb-[55px]">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                    <Link href={route('password.request')}>
                        <div className="educare-quick-mis-report-item">
                            <div className="content">
                                <h4 className="title">
                                    Get User id and Password
                                </h4>
                            </div>
                            <div className="icon min-w-[60px]">
                                <img
                                    className="w-[60px]"
                                    src={categoryOne}
                                    alt="img not found"
                                />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                    <Link href={route('support_ticket.login_request')}>
                        <div className="educare-quick-mis-report-item">
                            <div className="content">
                                <h4 className="title">
                                    Request For Login details 
                                </h4>
                            </div>
                            <div className="icon min-w-[60px]">
                                <img
                                    className="w-[60px]"
                                    src={categoryTwo}
                                    alt="img not found"
                                />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                    <Link href={route('login')}>
                        <div className="educare-quick-mis-report-item">
                            <div className="content">
                                <h4 className="title">
                                    Website Login (Desktop/Laptop)
                                </h4>
                            </div>
                            <div className="icon min-w-[60px]">
                                <img
                                    className="w-[60px]"
                                    src={categoryTwo}
                                    alt="img not found"
                                />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                    <Link href={route('support_ticket.staff_attendance')}>
                        <div className="educare-quick-mis-report-item">
                            <div className="content">
                                <h4 className="title">Take Attedance</h4>
                            </div>
                            <div className="icon min-w-[60px]">
                                <img
                                    className="w-[60px]"
                                    src={categoryThree}
                                    alt="img not found"
                                />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StaffSupportCategory;