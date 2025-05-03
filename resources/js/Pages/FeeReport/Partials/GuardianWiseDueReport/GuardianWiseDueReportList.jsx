import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import GuardianWiseDuePopup from "./GuardianWiseDueReport/GuardianWiseDuePopup";

const GuardianWiseDueReportList = ({
    guardianWiseReport,
    loading,
    params
}) => {
    const [GuardianWisePopup, setGuardianWisePopup] = useState(false);
    const [studentsData, setStudentsData] = useState({});
    const [selectedStudentData, setSelectedStudentData] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedGuardianId, setSelectedGuardianId] = useState(null);

    const handlePopupClick = (guardianId, studentId) => {
        setSelectedStudentId(studentId)
        setSelectedGuardianId(guardianId);
        setGuardianWisePopup(!GuardianWisePopup);
    };
    // const handlePopupClick = (guardianData, studentData) => {
    //     setStudentsData(guardianData)
    //     setSelectedStudentData(studentData);
    //     setGuardianWisePopup(!GuardianWisePopup);
    // };


    useEffect(() => {
        if (Object.keys(guardianWiseReport)?.length > 0 && selectedGuardianId != null) {
            const guardian_data = Object.values(guardianWiseReport)?.find(item => item?.guardian_id == selectedGuardianId);
            let student_data = {};

            if (Object.keys(guardian_data)?.length > 0 && guardian_data?.student_data && Object.keys(guardian_data?.student_data)?.length > 0) {
                student_data = Object.values(guardian_data?.student_data)?.find(item => item?.id == selectedStudentId);
            }

            setStudentsData(guardian_data);
            setSelectedStudentData(student_data);
        }
        else {
            // setStudentsData({});
            // setSelectedStudentData({});
        }
    }, [selectedStudentId, selectedGuardianId, guardianWiseReport]);

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="!w-[5%]">Sr. No.</th>
                                        <th className="!w-[10%]">{params?.guardian_type == 'guardian' ? 'Guardian' : 'Father'}</th>
                                        <th className="!w-[6%]">Phone</th>
                                        <th className="!w-[11.6%]">Student</th>
                                        <th className="!w-[6.3%]">Adm.No</th>
                                        <th className="!w-[6.2%]">Roll No</th>
                                        <th className="!w-[6.2%]">Class</th>
                                        <th className="!w-[7.8%]">Village/City</th>
                                        <th className="!w-[7.8%]">Total Fee</th>
                                        <th className="!w-[7.7%]">Concession</th>
                                        <th className="!w-[7.8%]">Payable</th>
                                        <th className="!w-[7.6%]">Paid</th>
                                        <th className="!w-[6.2%]">Due</th>
                                        <th className="!min-w-[60px]">Action</th>
                                    </tr>
                                </thead>
                            </table>
                            <table>
                                {loading ?
                                    <Loader></Loader>
                                    :
                                    <tbody>
                                        {Object.keys(guardianWiseReport)?.length > 0 ?
                                            Object.values(guardianWiseReport)?.map((guardianData, parentIndex) => (
                                                <tr key={parentIndex}>
                                                    <td className="!w-[5%]">{parentIndex + 1}</td>
                                                    <td className="!w-[10%]">{guardianData?.guardian_name}</td>
                                                    <td className="!w-[6%]">{guardianData?.guardian_phone}</td>
                                                    <td colSpan={11} className="!p-0 !w-[79%]">
                                                        <table className="!min-w-0">
                                                            <tbody>
                                                                {guardianData['student_data'] && Object.keys(guardianData['student_data'])?.length > 0 &&
                                                                    Object.values(guardianData['student_data'])?.map((item, index) => (
                                                                        <tr key={index}>
                                                                            {/* <td>{parentIndex+1}</td>
                                                                            <td>{guardianData?.guardian_name}</td>
                                                                            <td>{guardianData?.guardian_phone}</td> */}
                                                                            <td className="!w-[15%]">{item?.name}</td>
                                                                            <td className="!w-[8%]">{item?.admission_no}</td>
                                                                            <td className="!w-[8%]">{item?.roll_no}</td>
                                                                            <td className="!w-[8%]">{item?.classroom_title}</td>
                                                                            <td className="!w-[10%]">{item?.address}</td>
                                                                            <td className="!w-[10%]">{formatNumber(item?.total_amount ?? 0)}</td>
                                                                            <td className="!w-[10%]">{formatNumber(item?.total_discount ?? 0)}</td>
                                                                            <td className="!w-[10%]">{formatNumber(item?.total_payable ?? 0)}</td>
                                                                            <td className="!w-[10%]">{formatNumber(item?.total_paid ?? 0)}</td>
                                                                            <td className="!w-[8.1%]">{formatNumber(item?.total_due ?? 0)}</td>
                                                                            <td className="!min-w-[60px]">
                                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                                    <div>
                                                                                        <Tooltip
                                                                                            title="Edit"
                                                                                            placement="top"
                                                                                            arrow
                                                                                        >
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    handlePopupClick(guardianData?.guardian_id, item?.id)
                                                                                                }}
                                                                                                className="educare-warning-btn-sm-fill">
                                                                                                <i className="icon-editing"></i>
                                                                                            </button>
                                                                                        </Tooltip>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>

                                                                    ))

                                                                }
                                                                <tr>
                                                                    <td colSpan={5}><h5 className="font-bold text-headingLight">Total :</h5></td>
                                                                    <td>
                                                                        <h5 className="font-bold text-headingLight">
                                                                            {formatNumber(guardianData?.total_amount ?? 0)}
                                                                        </h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5 className="font-bold text-headingLight">
                                                                            {formatNumber(guardianData?.total_discount ?? 0)}
                                                                        </h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5 className="font-bold text-headingLight">
                                                                            {formatNumber(guardianData?.total_payable ?? 0)}
                                                                        </h5>
                                                                    </td>
                                                                    <td>
                                                                        <h5 className="font-bold text-headingLight">
                                                                            {formatNumber(guardianData?.total_paid ?? 0)}
                                                                        </h5>
                                                                    </td>
                                                                    <td colSpan={2} className="!min-w-0">
                                                                        <h5 className="font-bold text-headingLight">
                                                                            {formatNumber(guardianData?.total_due ?? 0)}
                                                                        </h5>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="14">Data not found</td>
                                            </tr>
                                        }

                                        {/* <tr>
                                            <td>2</td>
                                            <td>Sumaiya</td>
                                            <td>01888888888</td>
                                            <td>Rakib</td>
                                            <td>345g</td>
                                            <td>543</td>
                                            <td>I X</td>
                                            <td>Rajesthan</td>
                                            <td>10500</td>
                                            <td>5464</td>
                                            <td>4564</td>
                                            <td>3456</td>
                                            <td>9456</td>
                                            <td>
                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                    <div>
                                                        <Tooltip
                                                            title="Edit"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                onClick={handlePopupClick}
                                                                className="educare-warning-btn-sm-fill">
                                                                <i className="icon-editing"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> */}

                                        {/* <tr>
                                            <td colSpan={8}><h5 className="font-bold text-headingLight">Total :</h5></td>
                                            <td><h5 className="font-bold text-headingLight">45676754</h5></td>
                                            <td><h5 className="font-bold text-headingLight">657556</h5></td>
                                            <td><h5 className="font-bold text-headingLight">567656</h5></td>
                                            <td><h5 className="font-bold text-headingLight">546765</h5></td>
                                            <td><h5 className="font-bold text-headingLight">546545</h5></td>
                                            <td></td>
                                        </tr> */}
                                    </tbody>
                                }

                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <GuardianWiseDuePopup
                GuardianWisePopup={GuardianWisePopup}
                setGuardianWisePopup={setGuardianWisePopup}
                studentsData={studentsData}
                setStudentsData={setStudentsData}
                selectedStudentData={selectedStudentData}
                setSelectedStudentData={setSelectedStudentData}
                params={params}
            />
        </>
    );
};

export default GuardianWiseDueReportList;
