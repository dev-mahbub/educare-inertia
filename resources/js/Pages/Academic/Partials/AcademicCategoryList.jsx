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
import classroomIcon from "../../../../images/category/teacher/classroom.png"
import { Link } from '@inertiajs/react';

const AcademicCategoryList = ({siteData}) => {

    return (
        <div className="educare-academic-category">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Academic Modules</h5>
            </div>
            { (siteData?.authRoles.indexOf("Super Admin") > -1 || siteData?.authRoles.indexOf("Admin") > -1) &&
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] administrative-detail-teacher">
                { (siteData?.authModules?.module_academic || siteData?.isSuperAdmin) &&
                <Link href={route('exam.add')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconOne} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Exams</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_assessment || siteData?.isSuperAdmin) && 
                <Link href={route('assessment.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconTwo} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Assessment</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_online_class || siteData?.isSuperAdmin) && 
                <Link href={route('online_class.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconThree} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Virtual Classes</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_classwork || siteData?.isSuperAdmin) && 
                <Link href={route('classwork.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconFour} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Classwork</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_homework || siteData?.isSuperAdmin) && 
                <Link href={route('homework.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconFive} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Homework</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_lesson_plan || siteData?.isSuperAdmin) && 
                <Link href={route('lesson_plan.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconSix} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Academic Planner</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_online_exam || siteData?.isSuperAdmin) && 
                <Link href={route('online_exam.index')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconSeven} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Virtual Examination</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_academic_content || siteData?.isSuperAdmin) && 
                <Link href={route('asset.create')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconEight} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>E-Learning Material</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_time_table || siteData?.isSuperAdmin) && 
                <Link href={route('school_shift.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconNine} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>School Timetable</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_syllabus || siteData?.isSuperAdmin) &&
                <Link href={route('academic_syllabus.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconOne} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Syllabus</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
            }

            { (siteData?.authRoles.indexOf("Teacher") > -1) &&
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] administrative-detail-teacher">
                { (siteData?.authModules?.module_homework || siteData?.isSuperAdmin) && 
                <Link href={route('homework.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconFive} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Homework</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_classwork || siteData?.isSuperAdmin) && 
                <Link href={route('classwork.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconFour} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Classwork</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_syllabus || siteData?.isSuperAdmin) &&
                <Link href={route('academic_syllabus.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconOne} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Syllabus</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_assessment || siteData?.isSuperAdmin) && 
                <Link href={route('assessment.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconTwo} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Assessment</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_lesson_plan || siteData?.isSuperAdmin) && 
                <Link href={route('lesson_plan.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconSix} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Academic Planner</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_academic || siteData?.isSuperAdmin) &&
                <Link href={route('exam.add')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconOne} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Exams</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_time_table || siteData?.isSuperAdmin) && 
                <Link href={route('exam.send_exam_marks')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconSeven} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Teacher Timetable</h5>
                        </div>
                    </div>
                </Link>
                }
                 { (siteData?.authModules?.module_time_table || siteData?.isSuperAdmin) && 
                <Link href={route('school_shift.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconNine} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Class Timetable</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_online_exam || siteData?.isSuperAdmin) && 
                <Link href={route('school_shift.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconOne} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Online Exam</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_academic_content || siteData?.isSuperAdmin) && 
                <Link href={route('asset.create')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconEight} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>E-Learning Material</h5>
                        </div>
                    </div>
                </Link>
                }
               { (siteData?.authModules?.module_online_class || siteData?.isSuperAdmin) && 
                <Link href={route('asset.create')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={classroomIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Classroom</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
            }
        </div>
    );
};

export default AcademicCategoryList;

