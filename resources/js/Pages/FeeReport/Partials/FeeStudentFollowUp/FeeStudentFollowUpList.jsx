import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import FeeStudentFollowPopup from "./FeeStudentFollowPopup/FeeStudentFollowPopup";

const FeeStudentFollowUpList = ({
    followUpReports,
    setLoading,
    loading,
}) => {
    const [studentFollowPopup, setstudentFollowPopup] = useState(false);
    const [studentFollowUpData, setStudentFollowUpData] = useState({});

    const handlePopupClick = (studentId) => {
        setstudentFollowPopup(!studentFollowPopup);
        setStudentFollowUpData(Object.values(followUpReports)?.filter(item => item?.student_id == studentId));
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>

                                        <th>Adm. No.</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Roll No.</th>
                                        <th>Father Name</th>
                                        <th>Phone</th>
                                        <th>Note</th>
                                        <th>Due</th>
                                        <th>Follow Up Date</th>
                                        <th>Activity Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    Object.keys(followUpReports)?.length > 0 ?
                                        Object.values(followUpReports)?.map((item, index) => (
                                            <tbody>
                                                <tr key={index}>
                                                    <td>{item?.student?.admission_no}</td>
                                                    <td>
                                                        {`${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`}
                                                    </td>
                                                    <td>{item?.student?.classroom?.title ?? ""}</td>
                                                    <td>{item?.student?.classroom_roll?.roll_no ?? ""}</td>
                                                    <td>
                                                        {`${item?.student?.father?.first_name ?? ""} ${item?.student?.father?.middle_name ?? ""} ${item?.student?.father?.last_name ?? ""}`}
                                                    </td>
                                                    <td>{item?.student?.father?.phone ?? ""}</td>
                                                    <td className="break-all">{item?.note}</td>
                                                    <td>{parseFloat(item?.due_amount ?? 0)}</td>
                                                    <td>{item?.formatted_commitment_date}</td>
                                                    <td>{item?.activity_date}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        onClick={() => {
                                                                            handlePopupClick(item?.student_id)
                                                                        }}
                                                                        className="educare-warning-btn-sm-fill">
                                                                        <i className="icon-editing"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    :
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="11">Data not found</td>
                                    </tr>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <FeeStudentFollowPopup
                studentFollowPopup={studentFollowPopup}
                setstudentFollowPopup={setstudentFollowPopup}
                handlePopupClick={handlePopupClick}
                studentFollowUpData={studentFollowUpData}
                setStudentFollowUpData={setStudentFollowUpData}
            />
        </>
    );
};

export default FeeStudentFollowUpList;
