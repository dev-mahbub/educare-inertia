import Dropdown from "@/Components/Dropdown";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const StudentClassWiseReportLeftTable = ({
    selectValue,
    studentDocumentReports
}) => {
    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(Array(studentDocumentReports?.document_submitted?.length).fill(false));
    const handleEnqToggle = (index) => {
        setEnqInnerActive((prevState) => {
            const newState = prevState.map((value, i) =>
                i === index ? !value : false
            );
            return newState;
        });
    };

    useEffect(() => {
        setEnqInnerActive(Array(studentDocumentReports?.document_submitted?.length).fill(false))
    }, [studentDocumentReports]);
    //table inner toggle collapse end

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        {selectValue} submitted
                    </h5>
                </div>

                <div className="educare-header-filtar-bar-count">
                    <span>Count: {studentDocumentReports?.document_submitted?.length ?? 0}</span>
                </div>
            </div>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Student</th>
                                        <th>Admission No.</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {studentDocumentReports?.document_submitted?.length > 0 ?
                                    <>
                                      <tbody>
                                            {studentDocumentReports?.document_submitted?.map((item, index) => (
                                                <>
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>{item?.first_name} {item?.middle_name} {item?.last_name}</td>
                                                        <td>{item?.admission_no}</td>
                                                            <td>
                                                                <button
                                                                    type="button"
                                                                    className="educare-enq-arrow"
                                                                    onClick={() =>
                                                                        handleEnqToggle(index)
                                                                    }
                                                                >
                                                                    <i
                                                                        className={`${enqInnerActive[index]
                                                                                ? "icon-arrow-up"
                                                                                : "icon-down-arrow"
                                                                            }`}
                                                                    ></i>
                                                                </button>
                                                            </td>
                                                    </tr>
                                                    <tr className={`${enqInnerActive[index] ? "" : "hidden"}`}>
                                                        <td
                                                            colSpan="12"
                                                            className="educare-admission-list-enq-inner-wrap"
                                                        >
                                                            <table className="educare-admission-list-enq-inner">
                                                                <tbody>
                                                                    {item?.student_documents?.length > 0 &&
                                                                        item?.student_documents.map((document, innerIndex) => (
                                                                            <tr key={innerIndex}>
                                                                                <td>{innerIndex+1}</td>
                                                                                <td>{document?.document_name}</td>
                                                                                <td>
                                                                                    {document?.file &&
                                                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                                            <div>
                                                                                                <Tooltip
                                                                                                    title="View"
                                                                                                    placement="top"
                                                                                                    arrow
                                                                                                >
                                                                                                    <a
                                                                                                        href={document?.file?.path}
                                                                                                        target="_blank"
                                                                                                        className="educare-tertiary-btn-sm-fill"
                                                                                                    >
                                                                                                        <i className="icon-eye"></i>
                                                                                                    </a>
                                                                                                </Tooltip>
                                                                                            </div>

                                                                                            <div className="relative">
                                                                                                <Dropdown>
                                                                                                    <Dropdown.Trigger>
                                                                                                        <div className="educare-dropdown-menu">
                                                                                                            <button
                                                                                                                type="button"
                                                                                                                className="educare-dark-btn-sm-fill"
                                                                                                            >
                                                                                                                <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </Dropdown.Trigger>
                                                                                                    <Dropdown.Content>
                                                                                                        <a
                                                                                                            href={route('document.download_file', document?.file?.id)}
                                                                                                            target="_blank"
                                                                                                        >
                                                                                                            <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                                            Download
                                                                                                        </a>
                                                                                                    </Dropdown.Content>
                                                                                                </Dropdown>
                                                                                            </div>
                                                                                        </div>
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
                                            ))}
                                    </tbody>
                                    </>
                                :
                                    <>
                                        <tbody>
                                            <tr>
                                                <td colSpan="10" >
                                                    <p className="text-center">Data not found</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </>
                                }

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentClassWiseReportLeftTable;
