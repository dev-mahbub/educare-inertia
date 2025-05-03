import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import AddDueFollowUpPopup from "./Popup/AddDueFollowUpPopup";

const CompleteOutstandingDuesList = ({
    loading,
    completeOutstandingDueReports,
    filterFormData,
    setLoading
}) => {
    const [showStudentFollowUpPopup, setShowStudentFollowUpPopup] = useState(false);
    const [followUpData, setFollowUpData] = useState({});

    // handle due follow up popup start
    const handleFollowUpPopup = () => {
        setShowStudentFollowUpPopup(true)
    }
    // handle due follow up popup end

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

        // if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
        //     return parseFloat(num).toFixed(2);
        // } else {
        //     return num.toString();
        // }
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
                                        <th>Roll No.</th>
                                        <th>Adm. No.</th>
                                        <th>Student Name</th>
                                        <th>Father Name</th>
                                        <th>Class</th>
                                        <th>Mobile No</th>
                                        <th>Address</th>
                                        <th>Amount</th>
                                        <th>Follow Up</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(completeOutstandingDueReports)?.length > 0 ?
                                            Object.values(completeOutstandingDueReports)?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.roll_no}</td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.father_name}</td>
                                                    <td>{item?.classroom_title}</td>
                                                    <td>{item?.sms_phone}</td>
                                                    <td>{item?.present_address}</td>
                                                    <td>{formatNumber(item?.total_due_amount)}</td>
                                                    <td>{item?.due_follow_ups?.length}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="educare-warning-btn-sm-fill"
                                                                        onClick={() => {
                                                                            setFollowUpData(item)
                                                                            handleFollowUpPopup()
                                                                        }}
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="12">
                                                    Data not found
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddDueFollowUpPopup
                followUpData={followUpData}
                setShowStudentFollowUpPopup={setShowStudentFollowUpPopup}
                showStudentFollowUpPopup={showStudentFollowUpPopup}
                setFollowUpData={setFollowUpData}
                filterFormData={filterFormData}
                setLoading={setLoading}
            />
        </>
    );
};

export default CompleteOutstandingDuesList;
