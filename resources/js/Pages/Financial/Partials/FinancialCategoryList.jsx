import React from 'react';
import { Link } from '@inertiajs/react';
import CategoryBirthdayIcon from '../../../../images/category/birthday.png'
import CategoryEventIcon from '../../../../images/category/event.png'
import CategoryNewsIcon from '../../../../images/category/news.png'
import CategoryNoticeIcon from '../../../../images/category/notice.png'
import CategoryMessageIcon from '../../../../images/category/message.png'
import CategoryBroadcastIcon from '../../../../images/category/broadcast.png'

const FinancialCategoryList = ({siteData}) => {
    return (
        
        <div className="educare-academic-category mt-5">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Manage Income & Expenses of Your School</h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px]">
                { (siteData?.authModules?.module_admission || siteData?.isSuperAdmin) && 
                <Link href={route('admission.mis_report')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBirthdayIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Enrollment</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_salary || siteData?.isSuperAdmin) && 
                <Link href={route('salary.process')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryEventIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>HR Management</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_accounts || siteData?.isSuperAdmin) && 
                <Link href={route('inventory.mis_report')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNewsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Accountancy</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_fees || siteData?.isSuperAdmin) && 
                <Link href={route('fee.mis_report')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNoticeIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Fees</h5>
                        </div>
                    </div>
                </Link>
                } 
            </div>
        </div>
    );
};

export default FinancialCategoryList;