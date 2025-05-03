import React from 'react';
import TeamManageTableList from './TeamManageTableList';
import TeamManageTableListFilter from './TeamManageTableListFilter';
import TeamManageForm from './TeamManageForm';

const TeamManageFormTable = () => {
    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-5 md:col-span-12 lg:col-span-5">
                    <TeamManageForm />
                </div>
                <div className="col-span-12 xl:col-span-7 md:col-span-12 lg:col-span-7">
                    <TeamManageTableListFilter />
                    <TeamManageTableList />
                </div>
            </div>
        </div>
    );
};

export default TeamManageFormTable;