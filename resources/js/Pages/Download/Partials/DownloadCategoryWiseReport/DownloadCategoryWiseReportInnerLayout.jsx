import DownloadHeaderMenus from '@/Components/Partials/Menus/Download/DownloadHeaderMenus';
import React from 'react';
import DownloadCategoryWiseForm from './DownloadCategoryWiseForm';

const DownloadCategoryWiseReportInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <DownloadHeaderMenus title="Download Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <DownloadCategoryWiseForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DownloadCategoryWiseReportInnerLayout;