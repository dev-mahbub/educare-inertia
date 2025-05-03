import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

const EarningTable = ({
    setSelectedData,
    setFormMode,
    earningTypes
}) => {

    // handle edit data
    const handleEditData = (itemId) => {
        const selectedItem = earningTypes?.find(item => item.id === itemId);

        setSelectedData(selectedItem);
        setFormMode('edit');
    }

    //handle delete data
    const handleDeleteData = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('salary.earning.delete', id));
            }
        });
    }
    return (
        <>

            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Earnings
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {earningTypes?.length > 0 ? (
                            earningTypes.map((item, index) =>
                                <tr key={index}>
                                    <td>{item?.title}</td>
                                    <td>
                                        {item?.is_system_default == false &&
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            onClick={() => handleEditData(item?.id)}
                                                            className="educare-warning-btn-sm-fill"
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="Delete"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            onClick={(e) => handleDeleteData(e, item.id)}
                                                            className="educare-danger-btn-sm-fill"
                                                            as="button"
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            ))
                        :
                            <tr>
                                <td
                                    className="text-center text-red-500"
                                    colSpan="7"
                                >
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EarningTable;
