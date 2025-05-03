import ListViewFilter from './ListViewFilter';
import ListViewList from './ListViewList';

const ListViewInnerLayout = ({
    exams,
    events,
    holidays,
    siteData
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ListViewFilter
                        siteData={siteData}
                    />
                    <ListViewList
                        exams={exams}
                        events={events}
                        holidays={holidays}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListViewInnerLayout;
