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

const SetupSchoolCategoryTag = () => {
    return (
        <div className="academic-category-tag-wrap hidden mb-[30px] mt-[15px]">
            <div className="educare-academic-category-tag">
                <a href="#">
                    <div className="educare-academic-category-tag">
                        <span><img src={academicCategoryIconOne} alt="sidebar logo" /></span>
                        <h6>Leave</h6>
                    </div>
                </a>
            </div>
            <div className="educare-academic-category-tag">
                <a href="#">
                    <div className="educare-academic-category-tag">
                        <span><img src={academicCategoryIconTwo} alt="sidebar logo" /></span>
                        <h6>Configuration</h6>
                    </div>
                </a>
            </div>
            <div className="educare-academic-category-tag">
                <a href="#">
                    <div className="educare-academic-category-tag">
                        <span><img src={academicCategoryIconThree} alt="sidebar logo" /></span>
                        <h6>Salary</h6>
                    </div>
                </a>
            </div>
            <div className="educare-academic-category-tag">
                <a href="#">
                    <div className="educare-academic-category-tag">
                        <span><img src={academicCategoryIconOne} alt="sidebar logo" /></span>
                        <h6>Student</h6>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default SetupSchoolCategoryTag;