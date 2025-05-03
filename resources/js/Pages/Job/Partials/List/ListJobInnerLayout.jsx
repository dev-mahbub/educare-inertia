import React from 'react';
import JobPostList from './JobPostList';
import JobListFilter from '../JobListFilter';
import JobHeaderMenus from '@/Components/Partials/Menus/Job/JobHeaderMenus';

const ListJobInnerLayout = ({ jobs }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header">
                    <div className="educare-bottom-header-middle bg-white">
                        <JobHeaderMenus title="Job list" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <JobListFilter jobs={jobs} />
                    <JobPostList
                        jobs={jobs}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListJobInnerLayout;
