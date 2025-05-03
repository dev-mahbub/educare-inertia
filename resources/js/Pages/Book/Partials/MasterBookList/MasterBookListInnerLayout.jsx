import React, { useState } from 'react';
import MasterBookListFilter from './MasterBookListFilter';
import MasterBookListTable from './MasterBookListTable';
import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';

const MasterBookListInnerLayout = ({
    bookListData,
    bookCategory,
    classNames,
}) => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LibraryHeaderMenus title="Library Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <MasterBookListFilter
                            bookListCount={bookListData?.length}
                            bookCategory={bookCategory}
                            classNames={classNames}
                            setLoading={setLoading}
                        />
                        <MasterBookListTable
                            bookListData={bookListData}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MasterBookListInnerLayout;
