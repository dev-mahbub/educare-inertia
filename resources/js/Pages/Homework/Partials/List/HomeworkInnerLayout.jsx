import React from 'react';
import HomeworkList from './HomeworkList';
import HomeworkListFilter from './HomeworkListFilter';
import SearchBar from './SearchBar';

const HomeworkInnerLayout = ({homeWorks}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <SearchBar  />
                    <HomeworkListFilter homeWorks={homeWorks} />
                    <HomeworkList homeWorks={homeWorks} />
                </div>
            </div>
        </div>
    );
};

export default HomeworkInnerLayout;
