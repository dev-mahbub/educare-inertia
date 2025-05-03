import React from 'react';
import { Link } from '@inertiajs/react';
import CategoryBirthdayIcon from '../../../../images/category/homework.png'
import CategoryEventIcon from '../../../../images/category/upload.png'
import CategoryNewsIcon from '../../../../images/category/config.png'
import CategoryNoticeIcon from '../../../../images/category/assessment.png'

const SurveyFeedback = ({siteData}) => {
    return (
        <div className="educare-academic-category mt-5">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Manage Feedback</h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px]">
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBirthdayIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Go Feedback</h5>
                        </div>
                    </div>
                </Link>
                <Link href={route('survey.create')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryEventIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Create Feedback</h5>
                        </div>
                    </div>
                </Link>
                <Link href={route('survey.design')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNewsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Feedback Form Design</h5>
                        </div>
                    </div>
                </Link>
                <Link href={route('survey.audiencewise_report')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNoticeIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Reports</h5>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default SurveyFeedback;