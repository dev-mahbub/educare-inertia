import HeaderSeacrhBar from '@/Components/Partials/Header/HeaderSeacrhBar';
import React from 'react';
import AcademicCategoryList from './AcademicCategoryList';
import AcademicCategoryTag from './AcademicCategoryTag';
import MisReportMenu from '@/Components/Partials/Header/MisReportMenu';

const CategoryList = ({siteData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <MisReportMenu />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AcademicCategoryTag />
                    <AcademicCategoryList siteData={siteData} />
                </div>
            </div>
        </div>
    );
};

export default CategoryList;