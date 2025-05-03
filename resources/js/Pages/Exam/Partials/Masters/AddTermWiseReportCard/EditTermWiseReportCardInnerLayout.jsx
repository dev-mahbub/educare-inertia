import React from 'react';
import AcademicsHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsHeaderMenu';
import EditTermWiseReportCard from './EditTermWiseReportCard';

const EditTermWiseReportCardInnerLayout = ({termExams='',termExam=''}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AcademicsHeaderMenu title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditTermWiseReportCard 
                     termExams = {termExams}
                     termExam = {termExam}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditTermWiseReportCardInnerLayout;