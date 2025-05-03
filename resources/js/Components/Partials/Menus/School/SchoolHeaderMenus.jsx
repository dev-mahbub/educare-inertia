import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import SchoolMobileNavs from './SchoolMobileNavs';

const SchoolHeaderMenus = ({ title }) => {
    title = "CRM MANAGMENT";
    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }
    return (
        <>
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
                                <ul>
                                    <li>
                                        <span className="hidden"><Link className="hidden" href='#'>Social Enquiry generation</Link></span>
                                    </li>
                                    <li>
                                        <Link href="#" >Notification</Link>
                                    </li>
                                    <li>
                                        <Link href={route('school.create')}>Add School</Link>
                                    </li>
                                    <li>
                                        <Link href={route('school.list')}>Schools List</Link>
                                    </li>
                                    <li>
                                        <Link href="#" >Invoice</Link>
                                    </li>
                                    <li>
                                        <Link href="#" >Subscriptions</Link>
                                    </li>
                                    <li>
                                        <Link href="#" >Estimates</Link>
                                    </li>
                                    <li>
                                        <Link href="#" >Payments</Link>
                                    </li>
                                    <li>
                                        <Link href="#" >Service Orders</Link>
                                    </li>
                                    <li>
                                        <Link href="#" >SMS Orders</Link>
                                    </li>
                                    <li>
                                        <Link href="#" >Reports</Link>
                                    </li>
                                </ul>
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
            <SchoolMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default SchoolHeaderMenus;
