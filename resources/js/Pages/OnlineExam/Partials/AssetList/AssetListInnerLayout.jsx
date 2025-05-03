import { useForm } from '@inertiajs/react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import AssetFilter from './AssetFilter';
import AssetList from './AssetList';

const AssetListInnerLayout = ({
    subjects,
    classNames,
    onlineTopics,
    examAssets
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        class_name_id: "",
        subject_id: "",
        online_topic_id: ""
    });

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Questions" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AssetFilter
                        subjects={subjects}
                        classNames={classNames}
                        onlineTopics={onlineTopics}
                        data={data}
                        setData={setData}
                    />
                    <AssetList
                        examAssets={examAssets}
                        formData={data}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssetListInnerLayout;
