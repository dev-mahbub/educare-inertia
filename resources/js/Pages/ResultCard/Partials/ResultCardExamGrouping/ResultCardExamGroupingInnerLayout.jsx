// import AcademicsHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsHeaderMenu';
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';
import ResultCardExamGroupingForm from './ResultCardExamGroupingForm';

const ResultCardExamGroupingInnerLayout = ({
    exams,
    groupingTypes,
    conversionType,
    calculationType,
    calculationPerform,
    reportCardTypes,
    examGroups
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
                    <ResultCardExamGroupingForm
                        exams = {exams}
                        groupingTypes = {groupingTypes}
                        conversionType = {conversionType}
                        calculationType = {calculationType}
                        calculationPerform = {calculationPerform}
                        reportCardTypes = {reportCardTypes}
                        examGroups = {examGroups}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResultCardExamGroupingInnerLayout;
