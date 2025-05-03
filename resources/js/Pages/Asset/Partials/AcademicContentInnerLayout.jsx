import AcademicContentForm from './AcademicContentForm';
import AcademicContentManagement from './AcademicContentManagement';

const AcademicContentInnerLayout = ({
    classNames,
    subjects,
    learningMaterialGroups,
    user,
    onlineTopics,
    resourceTypes,
    studentClassNames,
    classrooms,
    classSubjects,
    shareLearningMaterialGroups
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                    <div className="col-span-12">
                        <AcademicContentManagement />
                    </div>
                    <div className="col-span-12">
                        <AcademicContentForm
                            classNames={classNames}
                            subjects={subjects}
                            learningMaterialGroups={learningMaterialGroups}
                            user={user}
                            onlineTopics={onlineTopics}
                            resourceTypes={resourceTypes}
                            studentClassNames={studentClassNames}
                            classrooms={classrooms}
                            classSubjects={classSubjects}
                            shareLearningMaterialGroups={shareLearningMaterialGroups}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicContentInnerLayout;
