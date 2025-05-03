import TextInput from "@/Components/TextInput";
import { useState } from "react";
import ExtraDutyPopup from "./ExtraDutyPopup/ExtraDutyPopup";
import LeaveDetailFirstPopup from "./LeaveDetailDoublePopup/LeaveDetailFirstPopup";

const LeaveDetail = ({
    data,
    setData,
    errors,
    totalLeaves,
    staffLeaves,
    dayTypes,
    staffAttendanceSummary,
    setAttendanceDeductionData,
    totalAbsentDeduction,
    totalAbsent,
    totalExtraDuty,
    totalPaidExtraDuty,
    staffExtraDutyData,
    setStaffExtraDutyData,
    previousExtraDutyCount,
    previousAbsentDeductedCount,
    leaveBalance
}) => {

    //leave first popup
    const [leaveFirstPopup, setLeavFirstPopup] = useState(false);
    const handleFirstPopupClick = () => {
        setLeavFirstPopup(!leaveFirstPopup);
    };

    //extra duty popup
    const [extraDutyPopup, setExtraDutyPopup] = useState(false);
    const handleExtraDuty = () => {
        setExtraDutyPopup(!extraDutyPopup);
    };

    return (
        <>
            <div className="educare-admission-list-area mb-5">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={2} className="text-center">
                                            Leave Detail
                                        </th>
                                        <th colSpan={2}>
                                            <button
                                                onClick={handleFirstPopupClick}
                                                className='badge warning px-2 py-1 text-[14px]'
                                            >
                                                Total Absent : {totalAbsent}
                                            </button>
                                            <span ></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <button
                                                className="text-primary"
                                                onClick={handleFirstPopupClick}
                                            >
                                                Total Absents
                                            </button>
                                        </td>
                                        <td>{totalAbsent}</td>
                                        <td>Already Deducted</td>
                                        <td>{previousAbsentDeductedCount}</td>
                                    </tr>
                                    <tr>
                                        <td>Leave entitled in a year</td>
                                        <td>{totalLeaves}</td>
                                        <td>Deducted In Current Month</td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={
                                                            totalAbsentDeduction
                                                        }
                                                        className="block"
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button
                                                className="text-primary"
                                                onClick={handleExtraDuty}
                                            >
                                                Extra Duty
                                            </button>
                                        </td>
                                        <td>{totalExtraDuty}</td>
                                        <td>Already Paid Day</td>
                                        <td>
                                            {previousExtraDutyCount}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Extra Duty day</td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={
                                                            totalPaidExtraDuty
                                                        }
                                                        className="block"
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Balance Leaves</td>
                                        {/* <td>{(totalLeaves + totalAbsentDeduction + totalExtraDuty + previousAbsentDeductedCount) - (totalAbsent + totalPaidExtraDuty + previousExtraDutyCount)}</td> */}
                                        <td>{leaveBalance}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <LeaveDetailFirstPopup
                leaveFirstPopup={leaveFirstPopup}
                setLeavFirstPopup={setLeavFirstPopup}
                staffLeaves={staffLeaves}
                dayTypes={dayTypes}
                staffAttendanceSummary={staffAttendanceSummary}
                data={data}
                setData={setData}
                errors={errors}
                setAttendanceDeductionData={setAttendanceDeductionData}
            />
            <ExtraDutyPopup
                extraDutyPopup={extraDutyPopup}
                setExtraDutyPopup={setExtraDutyPopup}
                staffExtraDutyData={staffExtraDutyData}
                setStaffExtraDutyData={setStaffExtraDutyData}
            />
        </>
    );
};

export default LeaveDetail;
