import { Link } from '@inertiajs/react';
// import logo from '../../../../../../images/logo/logo-thumb.png';
import PrimaryButton from '@/Components/PrimaryButton';
import { concatName } from "@/Hooks/GlobalFunction";
import { useState } from 'react';
import OnlineFeeReceiptList from './OnlineFeeReceiptList';
import StudentOnlinePaymentlist from './StudentOnlinePaymentlist';

const OnlinePaymentSchoolInfo = ({
    student,
    school,
    siteData,
    studentFeeInstallments,
    studentFeeVouchers,
    studentFeePaymentReports
}) => {

    const [activeBtn, setActiveBtn] = useState('online fee');
    const handleFeeReceiptList = (infobtn) => {
        setActiveBtn(infobtn)
    }

    return (
        <>
            <div className="online-payment-top-header">
                <div className="front-container">
                    <ul>
                        <li>
                            <Link href="#">
                                <i className="icon-Question"></i>
                                <span>Help Desk</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('login')}>
                                <i className="icon-LockSimple"></i>
                                <span>parent Login</span>
                            </Link>
                        </li>
                        <li>
                            <i className="icon-email"></i>
                            <span>Email : {school?.mail}</span>
                        </li>
                        <li>
                            <i className="icon-PhoneCall"></i>
                            <span>Call Us: {school?.phone}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="educare-common-card relative">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px]">
                    <div className="front-container relative">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-2 hidden lg:block">
                                <div className="school-logo h-[80px] w-[80px]">
                                    <img className='max-w-full' src={siteData?.schoolLogo ?? ''} alt="" />
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-8">
                                <div className="flex justify-center items-center flex-col">
                                    <h2 className="text-[30px] font-semibold text-center">{school?.title}</h2>
                                    <p>{school?.street_address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="school-status-badge hidden lg:block">
                            ONLINE FEE PAYMENT
                        </div>
                    </div>

                </div>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] flex justify-center">
                    <div className='front-container'>
                        <div className="grid grid-cols-12 gap-5 border-b border-border pb-[20px]">
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className='flex items-center gap-2'>
                                    <span className='text-headingLight'>Admission Number : </span>
                                    <p className='text-heading'>{student?.admission_no}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-headingLight'>Class : </span>
                                    <p className='text-heading'>{student?.classroom?.title}</p>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className='flex items-center gap-2'>
                                    <span className='text-headingLight'>Student Name : </span>
                                    <p className='text-heading'>{concatName(student?.first_name, student?.middle_name, student?.last_name)}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-headingLight'>Father Mob. No. : </span>
                                    <p className='text-heading'>{student?.father?.phone}</p>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className='flex items-center gap-2'>
                                    <span className='text-headingLight'>Father Name : </span>
                                    <p className='text-heading'>{concatName(student?.father?.first_name, student?.father?.middle_name, student?.father?.last_name)}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-headingLight'>Father Email : </span>
                                    <p className='text-heading'>{student?.father?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className="educare-input-field-notes my-2">
                                <ul>
                                    <li>Note: Please do not refresh the page </li>
                                </ul>
                            </div>
                            <div className="educare-input-field-notes my-2">
                                <ul>
                                    <li>Report the related issue </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex gap-2.5 mb-2.5 mt-7">
                            <PrimaryButton
                                className="educare-secondary-btn-md-fill"
                                onClick={() => handleFeeReceiptList('online fee')}
                            >
                                <i className="icon-internet"></i> Online Fee
                            </PrimaryButton>
                            <PrimaryButton
                                className="educare-warning-btn-md-fill"
                                onClick={() => handleFeeReceiptList('receipt')}
                            >
                                <i className="icon-bill"></i> Receipt
                            </PrimaryButton>
                        </div>
                        <div>
                            {
                                activeBtn === 'online fee' ? (<StudentOnlinePaymentlist
                                    studentFeeInstallments={studentFeeInstallments}
                                    studentFeeVouchers={studentFeeVouchers}
                                    school={school}
                                    student={student}
                                />) : (
                                    activeBtn === 'receipt' &&
                                    <OnlineFeeReceiptList
                                        studentFeePaymentReports={studentFeePaymentReports}
                                    />
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OnlinePaymentSchoolInfo;
