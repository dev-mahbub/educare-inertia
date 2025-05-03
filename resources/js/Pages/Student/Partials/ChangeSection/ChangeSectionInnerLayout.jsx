import React from 'react';
import ChangeSectionList from './ChangeSectionList';
import StudentHeaderMenus from '../../../../Components/Partials/Menus/Student/StudentHeaderMenus';

const ChangeSectionInnerLayout = ({
    changeStudents,
    classrooms,
    session_year,
    classroom_id,
    selectedStudent,
    searchValue,
    sections,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Change in section" />
                    </div>
                </div>

                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="educare-card-title">
                        <ChangeSectionList
                            changeStudents={changeStudents}
                            classrooms={classrooms}
                            session_year={session_year}
                            classroom_id={classroom_id}
                            selectedStudent={selectedStudent}
                            searchValue={searchValue}
                            sections={sections}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeSectionInnerLayout;
