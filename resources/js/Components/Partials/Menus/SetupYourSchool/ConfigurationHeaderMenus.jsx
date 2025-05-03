import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import SetupYourSchooldMobileNavs from './SetupYourSchooldMobileNavs'

const ConfigurationHeaderMenus = ({ title }) => {

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
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                                <ul>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2" >
                                                    Masters <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('emergency_contact.list')}>Emergency Contact</Dropdown.Link>
                                                <Dropdown.Link href={route('occupation.list')}>Occupation</Dropdown.Link>
                                                <Dropdown.Link href={route('holiday.list')}>Holiday</Dropdown.Link>
                                                <Dropdown.Link href={route('holiday_policy.list')}>Holiday Policy </Dropdown.Link>
                                                <Dropdown.Link href={route('classroom_group.list')}>Class Group</Dropdown.Link>
                                                <Dropdown.Link href={route('department.list')}>Department</Dropdown.Link>
                                                <Dropdown.Link href={route('designation.list')}>Designation</Dropdown.Link>
                                                <Dropdown.Link href={route('house.list')}>House</Dropdown.Link>
                                                <Dropdown.Link href={route('category_caste.list')}>Category</Dropdown.Link>
                                                <Dropdown.Link href={route('religion.list')}>Religion</Dropdown.Link>
                                                <Dropdown.Link href={route('blood_group.list')}>Blood Group</Dropdown.Link>
                                                <Dropdown.Link href={route('custom_field.list')}>Custom Field</Dropdown.Link>
                                                <Dropdown.Link href={route('category.employment_create_list')}>Employment Category</Dropdown.Link>
                                                <Dropdown.Link href={route('category.staff_create_list')}>Staff Category</Dropdown.Link>
                                                <Dropdown.Link href={route('subject.assign_to_class')}>Assign Subjects to Class</Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2" >
                                                    Setting <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('school.setting')}>School Setting</Dropdown.Link>
                                                <Dropdown.Link href={route('sms_setting.setting')}>SMS Setting</Dropdown.Link>
                                                <Dropdown.Link href={route('social_share.create')}>Social Share</Dropdown.Link>
                                                <Dropdown.Link href={route('mail_setting.list')}>Automation Setting</Dropdown.Link>
                                                <Dropdown.Link href={route('mail_setting.improve_presence')}>Improve Presence on Internet</Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link href={route('academic_year.list')}> Academic Year</Link>
                                    </li>
                                    <li>
                                        <Link href={route('export_excel.export_old_academic_year')}>Export Data From Old Academic Year</Link>
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
            <SetupYourSchooldMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default ConfigurationHeaderMenus;
