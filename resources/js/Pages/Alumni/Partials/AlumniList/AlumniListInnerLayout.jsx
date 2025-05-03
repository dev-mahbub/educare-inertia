import AlumniHeaderMenus from '@/Components/Partials/Menus/Alumni/AlumniHeaderMenus';
import React from 'react';
import AlumniListInnerTableList from './AlumniListInnerTableList';
import AlumniListFilter from './AlumniListFilter';

const AlumniListInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AlumniHeaderMenus title="ALUMNI MANAGEMENT" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AlumniListFilter />
                    <AlumniListInnerTableList />
                </div>
            </div>
        </div>
    );
};

export default AlumniListInnerLayout;