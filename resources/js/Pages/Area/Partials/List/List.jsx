import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

const List = ({
    areas
}) => {

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
                router.delete(route('area.destroy', id));
            }
        });
    }

    // handle edit start
    const handleEdit = (id) => {
        router.post(route('area.edit'), { id: id });
    }
    // handle edit end

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Area List
                    <span>
                        (Total : {areas?.length})
                    </span>
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Name</th>
                            <th>Pick Price</th>
                            <th>Drop Price</th>
                            <th>Pick & Drop Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas?.length > 0 ?
                            areas?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.pick_price}</td>
                                    <td>{item?.drop_price}</td>
                                    <td>{item?.pick_drop_price}</td>
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
                                                        onClick={() => {
                                                            handleEdit(item.id)
                                                        }}
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
                                                        className="educare-danger-btn-sm-fill"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        <i className="icon-TrashSimple"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;
