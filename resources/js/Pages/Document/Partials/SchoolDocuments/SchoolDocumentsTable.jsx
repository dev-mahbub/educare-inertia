import Dropdown from "@/Components/Dropdown";
import { concatName } from "@/Hooks/GlobalFunction";
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

const SchoolDocumentsTable = ({
    schoolDocuments,
    totalDocumentCount
}) => {

    // handle delete document start
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('document.school_document.delete', id));
            }
        });
    }
    // handle delete document end

    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Issue Date</th>
                                <th>Issue To</th>
                                <th>Letter No</th>
                                <th>Subject</th>
                                <th>Attachment (if any)</th>
                                <th>Issued By</th>
                                <th>Uploded By</th>
                                <th>User Type</th>
                                <th>Uploaded On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalDocumentCount > 0 ?
                                schoolDocuments.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.issued_date}</td>
                                        <td>{item?.generated_for}</td>
                                        <td>{item?.document_no}</td>
                                        <td>{item?.notes}</td>
                                        <td>{item?.document_name}</td>
                                        <td>{concatName(item?.issued_by?.first_name, item?.issued_by?.middle_name, item?.issued_by?.last_name)}</td>
                                        <td>{concatName(item?.created_by?.first_name, item?.created_by?.middle_name, item?.created_by?.last_name)}</td>
                                        <td>{item?.audience_type}</td>
                                        <td>{item?.uploaded_date}</td>
                                        <td>
                                            {" "}
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div className="hidden">
                                                    <Tooltip
                                                        title="View"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Link
                                                            href="#"
                                                            className="educare-tertiary-btn-sm-fill"
                                                        >
                                                            <i className="icon-eye"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="Delete"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
                                                            className="educare-danger-btn-sm-fill"
                                                            onClick={() => {
                                                                handleDelete(item?.id)
                                                            }}
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div className="relative hidden">
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
                                                            <Dropdown.Link href="#">
                                                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                Download
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </div>
                                            </div>{" "}
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
        </>
    );
};

export default SchoolDocumentsTable;
