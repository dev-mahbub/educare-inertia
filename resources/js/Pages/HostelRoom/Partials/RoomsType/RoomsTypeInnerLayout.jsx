import HostelHeaderMenus from '@/Components/Partials/Menus/Hostel/HostelHeaderMenus';
import React, { useState } from 'react';
import RoomsTypeForm from './RoomsTypeForm';
import RoomsTypeTableList from './RoomsTypeTableList';

const RoomsTypeInnerLayout = ({
    hostelRoomType,
}) => {
    const [hostEditData, setHostEditData] = useState([]);
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <HostelHeaderMenus title="HOSTEL MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <div className='educare-parent-montly-income-area'>
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                                    <RoomsTypeForm
                                        hostEditData={hostEditData}
                                    />
                                </div>
                                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                                    <RoomsTypeTableList
                                        hostelRoomType={hostelRoomType}
                                        hostEditData={hostEditData}
                                        setHostEditData={setHostEditData}
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

export default RoomsTypeInnerLayout;
