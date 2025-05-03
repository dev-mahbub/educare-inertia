import LeaveHeaderMenus from '@/Components/Partials/Menus/Leave/LeaveHeaderMenus';
import { useState } from 'react';
import LeaveTypeForm from './LeaveTypeForm';
import LeaveTypeTable from './LeaveTypeTable';

const LeaveTypeInnerLayout = ({
    leaveTypes
}) => {

    const [editableData, setEditableData] = useState({});
    const [formMode, setFormMode] = useState('create');

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LeaveHeaderMenus title="LEAVE MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <div className='educare-parent-montly-income-area'>
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-5 lg:col-span-6">
                                    <LeaveTypeForm
                                        editableData={editableData}
                                        setEditableData={setEditableData}
                                        formMode={formMode}
                                        setFormMode={setFormMode}
                                    />
                                </div>
                                <div className="col-span-12 xl:col-span-7 lg:col-span-6">
                                    <LeaveTypeTable
                                        leaveTypes={leaveTypes}
                                        setEditableData={setEditableData}
                                        setFormMode={setFormMode}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaveTypeInnerLayout;
