import { Tooltip } from "@mui/material";

const TeacherDocumentsTableList = ({
    documents
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
                                        <th>Teacher Name</th>
                                        <th>Document Name</th>
                                        <th>Document No.</th>
                                        <th>Category</th>
                                        <th>Notes</th>
                                        <th>Issued By</th>
                                        <th>Document Generated For</th>
                                        <th>Issued Date</th>
                                        <th>Uploaded On</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents?.length > 0 ?
                                        documents?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.staff?.first_name} {item?.staff?.middle_name} {item?.staff?.last_name}</td>
                                                <td>{item?.document_name}</td>
                                                <td>{item?.document_no}</td>
                                                <td>{item?.document_category?.title}</td>
                                                <td>{item?.notes}</td>
                                                <td>{item?.issued_by?.first_name} {item?.issued_by?.middle_name} {item?.issued_by?.last_name}</td>
                                                <td>{item?.generated_for}</td>
                                                <td>{item?.issued_date}</td>
                                                <td>{item?.uploaded_date}</td>
                                                <td>
                                                    {/* <span className='badge primary'>Pending</span> */}
                                                </td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        {item?.file &&
                                                            <div>
                                                                <Tooltip
                                                                    title="Preview"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <a
                                                                        href={item?.file?.path}
                                                                        target="_blank"
                                                                        className="educare-tertiary-btn-sm-fill cursor-pointer"
                                                                    >
                                                                        <i className="icon-eye"></i>
                                                                    </a>
                                                                </Tooltip>
                                                            </div>
                                                        }

                                                        {item?.file &&
                                                            <div>
                                                                <Tooltip
                                                                    title="Download"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <a
                                                                        href={route('document.download_file', item?.file?.id)}
                                                                        target="_blank"
                                                                        className="educare-warning-btn-sm-fill cursor-pointer"
                                                                    >
                                                                        <i className="icon-FilePdf"></i>
                                                                    </a>
                                                                </Tooltip>
                                                            </div>
                                                        }

                                                        {/* <div>
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    className="educare-danger-btn-sm-fill"
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="10"
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

export default TeacherDocumentsTableList;
