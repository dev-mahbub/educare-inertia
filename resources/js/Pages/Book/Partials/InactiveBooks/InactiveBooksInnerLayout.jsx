import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';
import React, { useState } from 'react';
import InactiveBooksFilter from './InactiveBooksFilter';
import InactiveBooksTableList from './InactiveBooksTableList';

const InactiveBooksInnerLayout = ({
    inactiveBookList,
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
                        <InactiveBooksFilter
                            setLoading={setLoading}
                            inactiveBookListCount={inactiveBookList?.length}
                        />
                        <InactiveBooksTableList
                            inactiveBookList={inactiveBookList}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default InactiveBooksInnerLayout;
