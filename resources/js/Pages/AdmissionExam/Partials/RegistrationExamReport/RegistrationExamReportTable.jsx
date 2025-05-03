import { useEffect, useState } from "react";

const RegistrationExamReportTable = ({
    registrationExamReport
 }) => {
    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(Array(Object.keys(registrationExamReport)?.length).fill(false))
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };

    useEffect(() => {
        setEnqInnerActive(Array(Object.keys(registrationExamReport)?.length).fill(false));
    }, [registrationExamReport]);
    //table inner toggle collapse end

    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Status</th>
                                <th>Student Name</th>
                                <th>Test Date</th>
                                <th>Registration Number</th>
                                <th>Parent Name</th>
                                <th>Contact No.</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(registrationExamReport)?.length > 0 ?
                                Object.values(registrationExamReport)?.map((item, parentIndex) =>(
                                    <>
                                        <tr>
                                            <td>
                                                <strong className='text-[15px] block max-w-[220px]'>
                                                    <button
                                                        type="button"
                                                        className="educare-enq-arrow"
                                                        onClick={() => handleEnqToggle(parentIndex)}
                                                    >
                                                        <i
                                                            className={`${enqInnerActive[parentIndex]
                                                                ? "icon-arrow-up"
                                                                : "icon-down-arrow"}`}
                                                        ></i>
                                                    </button>
                                                </strong>{" "}
                                            </td>
                                            <td>
                                                {(item?.registration_status == 'Registration Rejected' || item?.registration_status == 'Cancelled') &&
                                                    <span className="badge danger"> {item?.registration_status}</span>
                                                }

                                                {item?.registration_status == 'New' &&
                                                    <span className="badge warning"> {item?.registration_status}</span>
                                                }

                                                {item?.registration_status == 'Admission Taken' &&
                                                    <span className="badge info"> {item?.registration_status}</span>
                                                }

                                                {item?.registration_status == 'On Hold' &&
                                                    <span className="badge primary"> {item?.registration_status}</span>
                                                }
                                            </td>
                                            <td>{item?.student_name}</td>
                                            <td>{item?.test_date}</td>
                                            <td>{item?.registration_no}</td>
                                            <td>{item?.parent_name}</td>
                                            <td>{item?.contact_no}</td>
                                            <td>{item?.percentage}</td>
                                        </tr>
                                        <tr className={`${enqInnerActive[parentIndex] ? "" : "hidden"}`}>
                                            <td colSpan={8} className="educare-admission-list-enq-inner-wrap">
                                                <table className="educare-admission-list-enq-inner">
                                                    <thead>
                                                        <tr>
                                                            <th>Subject Name</th>
                                                            <th>Full Marks</th>
                                                            <th>Pass Marks</th>
                                                            <th>Otained Marks</th>
                                                            <th>Result</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {item?.marks && Object.keys(item?.marks)?.length > 0 &&
                                                            Object.values(item?.marks)?.map((markItem, index) => (
                                                                <tr key={index}>
                                                                    <td>{markItem?.subject_title}</td>
                                                                    <td>{markItem?.full_mark}</td>
                                                                    <td>{markItem?.pass_mark}</td>
                                                                    <td>{markItem?.obtained_mark}</td>
                                                                    <td>
                                                                        {markItem?.result &&
                                                                            <span
                                                                                className={`badge ${markItem?.result == 'Pass' ? 'success' : 'danger'}`}
                                                                            >
                                                                                {markItem?.result}
                                                                            </span>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            :
                                <tr>
                                    <td className="text-center text-red-500" colSpan="8">
                                        Data not found
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default RegistrationExamReportTable;
