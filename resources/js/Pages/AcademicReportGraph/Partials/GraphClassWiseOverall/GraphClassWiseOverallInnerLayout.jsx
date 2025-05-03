// import AcademicsHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsHeaderMenu';
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';
import GraphClassWiseOverallFilter from './GraphClassWiseOverallFilter';
import GraphClassWiseOverallList from './GraphClassWiseOverallList';

const GraphClassWiseOverallInnerLayout = ({
    classrooms,
    ranges = [],
    classWiseOverallReport
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
                    <GraphClassWiseOverallFilter
                        classrooms = {classrooms}
                    />
                    <GraphClassWiseOverallList
                        ranges={ranges}
                        classWiseOverallReport={classWiseOverallReport}
                    />
                </div>
            </div>
        </div>
    );
};

export default GraphClassWiseOverallInnerLayout;
