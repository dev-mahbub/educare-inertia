import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect, useState } from 'react';
import FirstPopupAbsentSummery from './FirstPopupAbsentSummery';
import LeaveTypePopup from './LeaveTypePopup';

export default function LeaveDetailFirstPopup({
    className = '',
    leaveFirstPopup,
    setLeavFirstPopup,
    staffLeaves,
    dayTypes,
    staffAttendanceSummary,
    data,
    setData,
    errors,
    setAttendanceDeductionData
}) {

    const [selectedLeave, setSelectedLeave] = useState({});
    const [tempAttendanceDeductionData, setTempAttendanceDeductionData] = useState(staffAttendanceSummary?.map(item => ({
        ...item,
        attendances: item?.attendances ? item?.attendances?.map(attendance => ({
            ...attendance,
            payment_month_id: item?.payment_month_id,
            // is_selected: false
        })) : [],
        // is_selected: false
    })));

    useEffect(() => {
        setTempAttendanceDeductionData(staffAttendanceSummary?.map(item => ({
            ...item,
            attendances: item?.attendances ? item?.attendances?.map(attendance => ({
                ...attendance,
                payment_month_id: item?.payment_month_id,
                // is_selected: false
            })) : [],
            // is_selected: false
        })));
    }, [staffAttendanceSummary]);

    //casual Leave Popup
    const [leaveTypePopup, setLeaveTypePopup] = useState(false);
    const handleLeaveTypePopupClick = (item) => {
        setLeaveTypePopup(!leaveTypePopup);

        setSelectedLeave(item);
    };

    const leaveFirstPopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setLeavFirstPopup(false);
    };

    // handle apply deduction start
    const handleApplyDeduction = (e) => {
        e.preventDefault();

        setAttendanceDeductionData(tempAttendanceDeductionData?.flatMap(item => {
            return item?.attendances?.filter(attendance => attendance?.is_selected == true && attendance?.is_disabled == false) || []
        }));
    }
    // handle apply deduction end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={leaveFirstPopup} className="educare-xl-width-modal">
                    <form onSubmit={leaveFirstPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Leave Detail</h5>
                            </div>
                            {/*leave table start*/}
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-admission-list-area">
                                    <div className="educare-admission-list-inner">
                                        <div className="educare-admission-list-inner-wrapper">
                                            <div className="educare-admission-list bg-supportingA/10 pb-none">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Sr.
                                                            </th>
                                                            <th>Leave Type</th>
                                                            <th>Leave Available</th>
                                                            <th>Leave Consumed</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {staffLeaves?.length > 0 &&
                                                            staffLeaves.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{index+1}</td>
                                                                    <td>
                                                                        <button
                                                                            className='text-primary'
                                                                            onClick={() => {
                                                                                handleLeaveTypePopupClick(item)
                                                                            }}
                                                                        >
                                                                            {item?.leave_type_title}
                                                                        </button>
                                                                    </td>
                                                                    <td>{item?.available_days}</td>
                                                                    <td>{item?.consumed_days}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <h5 className='font-bold text-headingLight'>Total</h5>
                                                            </td>
                                                            <td>
                                                                <h5 className='font-bold text-headingLight'>{staffLeaves?.reduce((total, item) => total + parseInt(item?.available_days ?? 0), 0)}</h5>
                                                            </td>
                                                            <td>
                                                                <h5 className='font-bold text-headingLight'>{staffLeaves?.reduce((total, item) => total + parseInt(item?.consumed_days ?? 0), 0)}</h5>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*leave table end*/}
                        </div>
                    </form>

                    <div className="px-[30px] pb-5">
                        {/*Staff absent summery start*/}
                        <FirstPopupAbsentSummery
                            dayTypes={dayTypes}
                            staffAttendanceSummary={staffAttendanceSummary}
                            data={data}
                            setData={setData}
                            errors={errors}
                            tempAttendanceDeductionData={tempAttendanceDeductionData}
                            setTempAttendanceDeductionData={setTempAttendanceDeductionData}
                        />
                        {/*Staff absent summery end*/}

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                className="educare-gray-btn-md-stroke"
                                type="button"
                                onClick={closeModal}
                             >
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                type="button"
                                onClick={handleApplyDeduction}
                            >
                                Apply Deduction
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </section>

            <LeaveTypePopup
                leaveTypePopup={leaveTypePopup}
                setLeaveTypePopup={setLeaveTypePopup}
                selectedLeave={selectedLeave}
                setSelectedLeave={setSelectedLeave}
            />
        </>
    );
}
