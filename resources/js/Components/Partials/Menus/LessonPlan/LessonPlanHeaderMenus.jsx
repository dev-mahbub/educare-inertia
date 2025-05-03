import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import LessonPlanMobileNavs from './LessonPlanMobileNavs';

const LessonPlanHeaderMenus = ({ title = '' }) => {
    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }
    return (
        <>
            <div className='educare-mis-report-menu-area hidden sm:inline-block'>
                <div className="educare-mis-report-menu flex-wrap">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className='icon-BookBookmark'></i>
                            <h4>{title && title}</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right flex flex-wrap gap-[8px]">
                        <Link className="educare-primary-btn" href={route('lesson_plan.list')}>Lesson Plans</Link>
                        <a className="educare-primary-btn" href={route('lesson_plan.shared_by_other')}>Share By Others</a>
                        {/* <a className="educare-primary-btn" href="#">reports</a> */}
                        <button
                            className="educare-primary-btn bg-primary"
                            type='button'
                        >
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div
                                        type="button"
                                        className="educare-dropdown-menu inline-flex items-center text-[14px] text-white font-medium cursor-pointer gap-x-2 hover:text-white"
                                    >
                                        Reports
                                        <i className='icon-CaretDown'></i>
                                    </div>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link className="min-w-[150px]" href={route('lesson_plan.teacher_wise_report')} >
                                        Teacher Wise
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('lesson_plan.class_wise_report')}>
                                       Class Wise
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </button>
                        <Link className="educare-primary-btn" href={route('lesson_plan.create')}>Create Lesson Plans</Link>
                    </div>
                    {/* Mobile Navs Activation Start */}
                    <div className="educare-sidebar-navs-btn sm:hidden inline-block">
                        <button type='button' onClick={toggleMobileNavsShow}>Menus <i className='icon-CaretDown'></i></button>
                    </div>
                    {/* Mobile Navs Activation End */}
                </div>

            </div>
            {/* Mobile Navs Component Start */}
            <LessonPlanMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default LessonPlanHeaderMenus;
