import { useEffect, useState } from 'react';

const RegSourceReportList = ({
    registrationByReport,
    sourceByReport
 }) => {

    const [totalRegistrationBy, setTotalRegistrationBy] = useState(0);
    const [totalSourceBy, setTotalSourceBy] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setTotalRegistrationBy(Object.values(registrationByReport)?.reduce((total, item) => total + item?.total_registration, 0));
        setTotalSourceBy(Object.values(sourceByReport)?.reduce((total, item) => total + item?.total_registration, 0));
    }, [registrationByReport]);

    // handle filter summary data start
    const handleFilterSummaryData = (registrationData) => {
        setFilteredData(registrationData);
    }
    // handle filter summary data end


    return (
        <div className='educare-summary-table-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-4">
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-card-title leading-none flex flex-wrap justify-between items-center gap-2">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Registration By
                            </h5>
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {totalRegistrationBy}</span>
                            </div>
                        </div>
                        <div className="educare-default-table row-has-hover xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Assign Name</th>
                                        <th>Total Enquiry</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(registrationByReport)?.length > 0 &&
                                        Object.values(registrationByReport)?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.user_name}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="cursor-pointer text-primary"
                                                        onClick={() => {
                                                            handleFilterSummaryData(item?.registrations ?? [])
                                                        }}
                                                    >
                                                        {item?.total_registration ?? 0}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="educare-classroom-table-wrapper mt-8">
                        <div className="educare-card-title leading-none flex flex-wrap justify-between items-center gap-2">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Source By
                            </h5>
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {totalSourceBy}</span>
                            </div>
                        </div>
                        <div className="educare-default-table row-has-hover xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(sourceByReport)?.length > 0 &&
                                        Object.values(sourceByReport)?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.source_title}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="cursor-pointer text-primary"
                                                        onClick={() => {
                                                            handleFilterSummaryData(item?.registrations ?? [])
                                                        }}
                                                    >
                                                        {item?.total_registration ?? 0}
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
                    <div className="educare-admission-list-area mt-2">
                        <div className="educare-admission-list-inner">
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>Registration No.</th>
                                                <th>Student Name</th>
                                                <th>Class</th>
                                                <th>Father Name</th>
                                                <th>Mobile No.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(filteredData)?.length > 0 &&
                                                Object.values(filteredData)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.registration_status}</td>
                                                        <td>{item?.registration_no}</td>
                                                        <td>{item?.student_name}</td>
                                                        <td>{item?.class_title}</td>
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

export default RegSourceReportList;
