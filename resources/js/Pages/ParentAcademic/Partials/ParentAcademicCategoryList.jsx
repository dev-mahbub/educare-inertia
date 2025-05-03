import React from 'react';
import { Link } from '@inertiajs/react';
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

const ParentAcademicCategoryList = ({siteData}) => {
    console.log(siteData);
    return (
        
        <div className="educare-academic-category">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Manage Academics</h5>
            </div>
         
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] administrative-detail-teacher">
            { (siteData?.authModules?.module_homework || siteData?.isSuperAdmin) && 
            <Link href={route('homework.view')}>
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
            <Link href={route('classwork.view')}>
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
            { (siteData?.authModules?.module_academic || siteData?.isSuperAdmin) &&
            <Link href={route('student_syllabus.list')}>
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
            <Link href={route('assessment.view')}>
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
            { (siteData?.authModules?.module_academic || siteData?.isSuperAdmin) &&
            <Link href={route('student.exam_schedule_list')}>
                <div className="educare-academic-category-item">
                    <div className="educare-academic-category-icon">
                        <span><img src={academicCategoryIconOne} alt="category-icon" /></span>
                    </div>
                    <div className="educare-academic-category-content">
                        <h5>Exam Schedule</h5>
                    </div>
                </div>
            </Link>
            }
            { (siteData?.authModules?.module_time_table || siteData?.isSuperAdmin) && 
            <Link href={route('student_timetable.list')}>
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
            { (true || siteData?.isSuperAdmin) && 
            <Link href={route('student_online_exam.index')}>
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
            <Link href={route('student_attendance_report.attendance_list')}>
                <div className="educare-academic-category-item">
                    <div className="educare-academic-category-icon">
                        <span><img src={academicCategoryIconEight} alt="category-icon" /></span>
                    </div>
                    <div className="educare-academic-category-content">
                        <h5>
                            Attendance
                        </h5>
                    </div>
                </div>
            </Link>
            }
            </div>
        </div>
    );
};

export default ParentAcademicCategoryList;