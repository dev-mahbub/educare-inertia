import { useState } from "react";

const StatusSummaryList = ({
    admissionStatusSummaryReport
}) => {
    const [filteredData, setFilteredData] = useState([]);

    // handle filter summary data start
    const handleFilterSummaryData = (enquiriesData) => {
        setFilteredData(enquiriesData);
    }
    // handle filter summary data end

    return (
        <div className='educare-summary-table-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-4">
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-card-title leading-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Admission Summary
                            </h5>
                        </div>
                        <div className="educare-default-table row-has-hover xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Enquiry Status</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(admissionStatusSummaryReport)?.length > 0 &&
                                        Object.values(admissionStatusSummaryReport)?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.enquiry_status}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="cursor-pointer text-primary"
                                                        onClick={() => {
                                                            handleFilterSummaryData(item?.enquiries ?? [])
                                                        }}
                                                    >
                                                        {item?.total_enquiry ?? 0}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-8">
                    <div className="educare-card-title leading-none">
                        <h5>
                            <i className="icon-UsersFour"></i>
                            Students
                        </h5>
                    </div>
                    <div className="educare-admission-list-area">
                        <div className="educare-admission-list-inner">
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Enq No</th>
                                                <th>Student Name</th>
                                                <th>Class</th>
                                                <th>Reg. No</th>
                                                <th>Reg. Date</th>
                                                <th>Father Name</th>
                                                <th>Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(filteredData)?.length > 0 &&
                                                Object.values(filteredData)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.student_name}</td>
                                                        <td>{item?.class_title}</td>
                                                        <td>{item?.registration_no}</td>
                                                        <td>{item?.registration_date}</td>
                                                        <td>{item?.father_name}</td>
                                                        <td>{item?.father_mobile}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusSummaryList;
