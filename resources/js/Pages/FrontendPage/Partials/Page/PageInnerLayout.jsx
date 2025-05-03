import React from 'react';
import PageContent from './PageContent';

const PageInnerLayout = ({ content }) => {
    return (
        <div className="front-container">
            <div className="educare-dashboard-footer">
                <div className="educare-dashboard-main-content-wrap min-h-[calc(100vh-150px)]">
                    <div className="educare-dashboard-main-content-body">
                        <PageContent content={content} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageInnerLayout;