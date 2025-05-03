import { Link } from "@inertiajs/react";
import categoryOne from "../../../../../images/help-desk/category-1.png";
import categoryTwo from "../../../../../images/help-desk/category-2.png";
import categoryThree from "../../../../../images/help-desk/category-3.png";
import categoryFour from "../../../../../images/help-desk/category-4.png";
import categoryFive from "../../../../../images/help-desk/category-5.png";
import categorySix from "../../../../../images/help-desk/category-6.png";

const StudentParentsSupportCategory = () => {
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
                                    Request For Login details{" "}
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
                    <Link href={route('login')} >
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
                    <Link href={route('support_ticket.contactus')}>
                        <div className="educare-quick-mis-report-item">
                            <div className="content">
                                <h4 className="title">Conatct Us</h4>
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
                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                    <Link href={ route('support_ticket.enquiry_form') }>
                        <div className="educare-quick-mis-report-item">
                            <div className="content">
                                <h4 className="title">Visitor Entry</h4>
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
                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                    <Link href={route('support_ticket.parent_feedback')}>
                        <div className="educare-quick-mis-report-item">
                            <div className="content">
                                <h4 className="title">Give Feedback</h4>
                            </div>
                            <div className="icon min-w-[60px]">
                                <img
                                    className="w-[60px]"
                                    src={categoryFour}
                                    alt="img not found"
                                />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                    <Link href={route('fee_online_payment.index')}>
                        <div className="educare-quick-mis-report-item">
                            <div className="content">
                                <h4 className="title">Online Fees Payment</h4>
                            </div>
                            <div className="icon min-w-[60px]">
                                <img
                                    className="w-[60px]"
                                    src={categoryFive}
                                    alt="img not found"
                                />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-span-12 lg:col-span-4 md:col-span-6 hidden">
                    <Link href="#">
                        <div className="educare-quick-mis-report-item">
                            <div className="content">
                                <h4 className="title">
                                    Get Transfer Certificate
                                </h4>
                            </div>
                            <div className="icon min-w-[60px]">
                                <img
                                    className="w-[60px]"
                                    src={categorySix}
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

export default StudentParentsSupportCategory;
