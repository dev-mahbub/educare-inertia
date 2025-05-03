import React from 'react';
import TeacherEditForm from './TeacherEditForm';

const TeacherEditInnerLayout = ({
    teacher,
    userRolls,
    genders,
    teachingTypes,
    states,
    houses,
    categories,
    empCats,
    staffCats,
    religions,
    jobTypes,
    departments,
    designations,
    bloodGroups
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeacherEditForm
                        teacher={teacher}
                        userRolls={userRolls}
                        genders={genders}
                        teachingTypes={teachingTypes}
                        states={states}
                        houses={houses}
                        categories={categories}
                        empCats={empCats}
                        staffCats={staffCats}
                        religions={religions}
                        jobTypes={jobTypes}
                        departments={departments}
                        designations={designations}
                        bloodGroups={bloodGroups}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherEditInnerLayout;
