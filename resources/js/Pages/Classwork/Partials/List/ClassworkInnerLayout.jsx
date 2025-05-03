import React from 'react';
import ClassworkListFilter from './ClassworkListFilter';
import ClassworkList from './ClassworkList';
import SearchBar from './SearchBar';

const ClassworkInnerLayout = ({classWorks, classrooms, subjects}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SearchBar />
                    <ClassworkListFilter classWorks={classWorks} classrooms={classrooms} subjects={subjects} />
                    <ClassworkList classWorks={classWorks} />
                </div>
            </div>
        </div>
    );
};

export default ClassworkInnerLayout;
