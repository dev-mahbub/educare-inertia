import React from 'react';
import { Link } from '@inertiajs/react';
import CategoryBirthdayIcon from '../../../../../images/pdf/progress-report-bg-badge.png'

const CertCategory = ({siteData}) => {
    return (
        <div className="educare-academic-category mt-5">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Manage Certificates</h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px]">
                { (siteData?.authModules?.module_certificate || siteData?.isSuperAdmin) && 
                <Link href={route('certificate.cert_template')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBirthdayIcon} alt="category-icon" width="72"/></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Certificates</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
        </div>
    );
};

export default CertCategory;