import React from 'react';
import academicCategoryIconOne from '../../../../images/category/academic.png'
import academicCategoryIconTwo from '../../../../images/category/assessment.png'
import academicCategoryIconThree from '../../../../images/category/online-class.png'
import academicCategoryIconFour from '../../../../images/category/class-work.png'
import academicCategoryIconFive from '../../../../images/category/homework.png'
import academicCategoryIconSix from '../../../../images/category/lesson-plan.png'
import academicCategoryIconSeven from '../../../../images/category/online-exam.png'
import academicCategoryIconEight from '../../../../images/category/academic-content.png'
import academicCategoryIconNine from '../../../../images/category/time-table.png'
import { Link } from '@inertiajs/react';

const ConfigurationCategoryList = ({ siteData }) => {
    return (
        
        <div className="educare-academic-category">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Manage Configuration</h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px]">
                { (siteData?.authModules?.module_emergency_contacts || siteData?.isSuperAdmin) && 
                <Link href={route('emergency_contact.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconOne} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Emergency Contact</h5>
                        </div>
                    </div>
                </Link> 
                }
                { (siteData?.authModules?.module_occupations || siteData?.isSuperAdmin) && 
                <Link href={route('occupation.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconTwo} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Occupation</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_holidays || siteData?.isSuperAdmin) && 
                <Link href={route('holiday.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconThree} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Holiday</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_holiday_policies || siteData?.isSuperAdmin) && 
                <Link href={route('holiday_policy.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconFour} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Holiday Policy</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_class_groups || siteData?.isSuperAdmin) && 
                <Link href={route('classroom_group.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconFive} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Class Group</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_departments || siteData?.isSuperAdmin) && 
                <Link href={route('department.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconSix} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Department</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_designations || siteData?.isSuperAdmin) && 
                <Link href={route('designation.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconSeven} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Designation</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_houses || siteData?.isSuperAdmin) && 
                <Link href={route('house.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconSeven} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>House</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_categories || siteData?.isSuperAdmin) && 
                <Link href={route('category_caste.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconEight} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Category</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_religions || siteData?.isSuperAdmin) && 
                <Link href={route('religion.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconNine} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Religion</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_blood_groups || siteData?.isSuperAdmin) && 
                <Link href={route('blood_group.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconOne} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Blood Group</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_custom_fields || siteData?.isSuperAdmin) && 
                <Link href={route('custom_field.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconTwo} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Custom Field</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_categories || siteData?.isSuperAdmin) && 
                <Link href={route('category.employment_create_list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconThree} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Employment Category</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_categories || siteData?.isSuperAdmin) && 
                <Link href={route('category.staff_create_list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconFour} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Staff Category</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_timezones || siteData?.isSuperAdmin) && 
                <Link href={route('timezone.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconFive} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>TimeZone</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_school_settings || siteData?.isSuperAdmin) && 
                <Link href={route('school.setting')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconSix} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>School Setting</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_sms_settings || siteData?.isSuperAdmin) && 
                <Link href={route('sms_setting.setting')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconSeven} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>SMS Setting</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_social_shares || siteData?.isSuperAdmin) && 
                <Link href={route('social_share.create')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconEight} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Social Share</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_improve_presence_on_internet || siteData?.isSuperAdmin) && 
                <Link href={route('mail_setting.improve_presence')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconNine} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Improve presence on internet</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_mail_settings || siteData?.isSuperAdmin) && 
                <Link href={route('mail_setting.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconNine} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Auto Sms/Email Setting</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_academic_years || siteData?.isSuperAdmin) && 
                <Link href={route('academic_year.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconEight} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Academic Year</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_school_export || siteData?.isSuperAdmin) && 
                <Link href={route('export_excel.export_old_academic_year')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconNine} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Export Data From Old Academic Year</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
        </div>
    );
};

export default ConfigurationCategoryList;