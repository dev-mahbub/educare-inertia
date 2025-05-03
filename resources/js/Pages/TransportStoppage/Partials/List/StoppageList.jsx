import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

// const StudentList = ({transports}) => {
export default function StudentList({
    transports
}) {

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
                router.delete(route('transport_stoppage.destroy', id));
            }
        });
    }

    // handle edit start
    const handleEdit = (id) => {
        router.post(route('transport_stoppage.edit'), {id: id});
    }
    // handle edit end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Stoppages List
                        <span>
                            (Total : {transports?.length})
                        </span>
                    </h5>
                </div>
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        {/* <th>SI. No</th> */}
                                        <th>Order List</th>
                                        <th>Stoppage</th>
                                        <th>Area</th>
                                        <th>Pick Price</th>
                                        <th>Drop Price</th>
                                        <th>Pick & Drop Price</th>
                                        <th>Pick up Time(h:m:s)</th>
                                        <th>Drop Time(h:m:s)</th>
                                        <th>Distance(KM)</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transports?.length > 0 ?
                                        transports?.map((item, index) => (
                                            <tr key={index}>
                                                 {/* <td>{index + 1}</td> */}
                                                 <td>{item?.order}</td>
                                                 <td>{item?.stoppage}</td>
                                                 <td>{item?.area_title}</td>
                                                 <td>{item?.pick_price}</td>
                                                 <td>{item?.drop_price}</td>
                                                 <td>{item?.pick_drop_price}</td>
                                                 <td>{item?.pickup_time_at}</td>
                                                 <td>{item?.drop_time_at}</td>
                                                 <td>{item?.distance}</td>
                                                 <td>
                                                    <span className='badge success'>{item?.status}</span>
                                                </td>
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
                                                                        handleEdit(item?.id)
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
                                            <td className="text-center text-red-500" colSpan="13">Data not found</td>
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

// export default StudentList;
