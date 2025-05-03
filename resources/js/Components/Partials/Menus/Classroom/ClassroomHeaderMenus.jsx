import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ClassroomMobileNavs from './ClassroomMobileNavs';

const ClassroomHeaderMenus = ({ title }) => {
    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }
    return (
        <>
            <div className='educare-mis-report-menu-area bg-white'>
                <div className="educare-mis-report-menu">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className='icon-cap'></i>
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap">
                                <ul>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Live Classes
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href="/online-class/create"
                                                >
                                                    Schedule Class
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/online-classes"
                                                >
                                                    Scheduled Class
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="/online-class/today"
                                                >
                                                    Today's Classes
                                                </Dropdown.Link>

                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('online_class.attendance')}>Attendance</Link>
                                    </li>
                                    <li>
                                        <Link href={route('classroom_discussion.list')}>Discussion</Link>
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
            <ClassroomMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default ClassroomHeaderMenus;
