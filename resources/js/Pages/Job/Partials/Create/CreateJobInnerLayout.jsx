import React from 'react';
import CreateJobForm from './CreateJobForm';
import JobHeaderMenus from '@/Components/Partials/Menus/Job/JobHeaderMenus';

const CreateJobInnerLayout = ({ genders, statues }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header">
                    <div className="educare-bottom-header-middle bg-white">
                        <JobHeaderMenus title="Create a job" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateJobForm
                        genders={genders}
                        statues={statues}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateJobInnerLayout;
