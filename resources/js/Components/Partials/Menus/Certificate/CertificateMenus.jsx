import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import CertificateMobileNavs from './CertificateMobileNavs'

const CertificateMenus = ({ title = '' }) => {
    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }
    return (
        <>
            {/* // <div className='educare-mis-report-menu-area'>
        //     <div className="educare-mis-report-menu">
        //         <div className="educare-mis-report-menu-left">
        //             <div className="educare-mis-report-menu-left-inner">
        //                 <i className='icon-cap'></i>
        //                 <h4>{title}</h4>
        //             </div>
        //         </div>
        //         <div className="educare-mis-report-menu-right">
        //             <div className="educare-mis-report-category">
        //                 <div className="educare-mis-report-category-wrap">
        //                     <ul>
        //                         <li>
        //                             <Link href={route('certificate.cert_template')}>Create Template</Link>
        //                             <Link href={route('student_certificate.student_certificate')}>Student</Link>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div> */}

            <div className='educare-mis-report-menu-area'>
                <div className="educare-mis-report-menu">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className='icon-cap'></i>
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                        
                            </div>
                            {/* Mobile Navs Activation Start */}
                            <div className="educare-sidebar-navs-btn sm:hidden inline-block">
                                <button type='button' onClick={toggleMobileNavsShow}>Menus <i className='icon-CaretDown'></i></button>
                            </div>
                            {/* Mobile Navs Activation End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Navs Component Start */}
            <CertificateMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>

    );
};

export default CertificateMenus;

