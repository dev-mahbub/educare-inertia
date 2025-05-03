import React from 'react';
import EditJobForm from './EditJobForm';
import JobHeaderMenus from '@/Components/Partials/Menus/Job/JobHeaderMenus';

const EditJobInnerLayout = ({ job, genders, statues }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header">
                    <div className="educare-bottom-header-middle bg-white">
                        <JobHeaderMenus title="Edit a job" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditJobForm
                        job={job}
                        genders={genders}
                        statues={statues}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditJobInnerLayout;
