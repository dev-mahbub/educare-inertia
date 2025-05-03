import { concatName } from "@/Hooks/GlobalFunction";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const DriverDocumentsTableList = ({
    driverDocuments,
    totalDocumentCount
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Driver Name</th>
                                        <th>Document Name</th>
                                        <th>Document No.</th>
                                        <th>Category</th>
                                        <th>Notes</th>
                                        <th>Issued By</th>
                                        <th>Document Generated For</th>
                                        <th>Issued Date</th>
                                        <th>Uploaded On</th>
                                        {/* <th>Status</th> */}
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalDocumentCount > 0 ?
                                        driverDocuments.map((item, index) => (
                                            <tr key={index}>
                                                <td>{concatName(item?.driver?.first_name, item?.driver?.last_name)}</td>
                                                <td>{item?.document_name}</td>
                                                <td>{item?.document_no}</td>
                                                <td>{item?.document_category?.title}</td>
                                                <td>{item?.notes}</td>
                                                <td>{concatName(item?.issued_by?.first_name, item?.issued_by?.middle_name, item?.issued_by?.last_name)}</td>
                                                <td>{item?.generated_for}</td>
                                                <td>{item?.issued_date}</td>
                                                <td>{item?.uploaded_date}</td>
                                                {/* <td><span className='badge primary'>Pending</span></td> */}
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div className="hidden">
                                                            <Tooltip
                                                                title="Preview"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link type="#"
                                                                    className="educare-tertiary-btn-sm-fill"
                                                                >
                                                                    <i className="icon-eye"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div className="hidden">
                                                            <Tooltip
                                                                title="Download"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href="#"
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-FilePdf"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="11"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DriverDocumentsTableList;
