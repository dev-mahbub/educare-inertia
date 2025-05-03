import AlumniCredentialList from './Partials/AlumniCredentialList';
import ParentsCredentialList from './Partials/ParentsCredentialList';
import StaffCredentialList from './Partials/StaffCredentialList';
import TeacherCredentialList from './Partials/TeacherCredentialList';

const SmsErpCredentialList = ({
    data,
    setData,
    classrooms,
    students,
    teachers,
    boardingTypes,
    alumnies,
    vehicleStaffs
}) => {
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
                data?.audience_type === 'Teachers' ? (
                    <TeacherCredentialList
                        teachers={teachers}
                        data={data}
                        setData={setData}
                    />
                ): (
                    data?.audience_type === 'Parents' ? (
                        <ParentsCredentialList
                            classrooms={classrooms}
                            students={students}
                            boardingTypes={boardingTypes}
                            data={data}
                            setData={setData}
                        />
                    ): (
                        data?.audience_type === 'Alumnies' ? (
                            <AlumniCredentialList
                                alumnies={alumnies}
                                data={data}
                                setData={setData}
                            />
                        ): (
                            data?.audience_type === 'Vehicle Staffs' ? (
                                <StaffCredentialList
                                    vehicleStaffs={vehicleStaffs}
                                    data={data}
                                    setData={setData}
                                />
                            ): ('')
                        )
                    )
                )
            }

        </>
    );
};

export default SmsErpCredentialList;
