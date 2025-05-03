import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

const SmscircularList = ({
    smsCirculars,
    setSelectedSmsCircular,
    setFormMode
}) => {

    // handle edit sms circular start
    const handleEditSmsCircular = (id) => {
        setSelectedSmsCircular(smsCirculars?.find(item => item?.id == id) ?? {});
        setFormMode('edit');
    }
    // handle edit sms circular end

    // handle delete sms circular start
    const handleDeleteSmsCircular = (id) => {
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
                router.delete(route('sms.circular.delete', id));
            }
        });
    }
    // handle delete sms circular end

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        School Circular
                    </h5>
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Circular</th>
                                <th>Audience</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {smsCirculars?.length > 0 ?
                                smsCirculars.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.title}</td>
                                        <td>{item?.audience_type}</td>
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
                                                                handleEditSmsCircular(item?.id)
                                                            }}
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="Preview"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <a
                                                            target="_blank"
                                                            href={route('sms_pdf.preview_circular', {circular_id: item?.id})}
                                                            className="educare-tertiary-btn-sm-fill"
                                                        >
                                                            <i className="icon-eye"></i>
                                                        </a>
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
                                                                handleDeleteSmsCircular(item?.id)
                                                            }}
                                                        >
                                                            <i className="icon-TrashSimple"></i>
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
                    </table>
                </div>
            </div>
        </>
    );
};

export default SmscircularList;
