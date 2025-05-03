import NewsMenuCategory from '../../NewsMenuCategory';
import NewsForm from './NewsForm';

const NewsFromInnerLayout = ({
    statusArr,
    newsTypes,
    audienceTypes,
    classrooms
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <NewsMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <NewsForm
                        statusArr={statusArr}
                        newsTypes={newsTypes}
                        audienceTypes={audienceTypes}
                        classrooms={classrooms}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewsFromInnerLayout;
