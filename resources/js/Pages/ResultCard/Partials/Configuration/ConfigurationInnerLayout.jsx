// import AcademicsHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsHeaderMenu';
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';
import ConfigurationSteps from './ConfigurationSteps';

const ConfigurationInnerLayout = ({
    dummyData,
    classNames,
    exams,
    subjects,
    resultCardConfigurationLists,
    boards,
    resultCardConfigurationClassNameIds,
    ruleTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                        <AcademicsExamHeaderMenu title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ConfigurationSteps
                        dummyData = {dummyData}
                        classNames = {classNames}
                        exams = {exams}
                        subjects = {subjects}
                        resultCardConfigurationLists={resultCardConfigurationLists}
                        boards={boards}
                        resultCardConfigurationClassNameIds={resultCardConfigurationClassNameIds}
                        ruleTypes={ruleTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfigurationInnerLayout;
