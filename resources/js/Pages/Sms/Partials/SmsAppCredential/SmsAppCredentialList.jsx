import React from 'react';
import TeacherCredentialList from './Partials/TeacherCredentialList';
import ParentsCredentialList from './Partials/ParentsCredentialList';
import AlumniCredentialList from './Partials/AlumniCredentialList';
import StaffCredentialList from './Partials/StaffCredentialList';

const SmsAppCredentialList = ({data}) => {
    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="flex justify-between gap-5 flex-wrap">
                        <div className="flex gap-5">
                            <div className='flex gap-1 items-center text-headingLight text-[16px]'>
                                <i className='icon-PaperPlaneTilt'></i>
                                <span className='text-[14px]'>Send To</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                data?.select_audience === 'teachers' ? (<TeacherCredentialList />): (
                    data?.select_audience === 'parents' ? (<ParentsCredentialList />): (
                        data?.select_audience === 'alumni' ? (<AlumniCredentialList />): (
                            data?.select_audience === 'staff' ? (<StaffCredentialList />): ('')
                        )
                    )
                )
            }
            
        </>
    );
};

export default SmsAppCredentialList;
