import React from 'react';
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from 'sweetalert2';


const RoomsTypeTableList = ({
    hostelRoomType = [],
    setHostEditData,
}) => {

    const handleDelete = (e, id) => {
        e.preventDefault();
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
                router.delete(route('hostel_room.destroy', id));
            }
        });
    }

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className="educare-card-title pb-none mb-2.5">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Room Type List
                    </h5>
                </div>
                <div className="educare-header-filtar-bar-count mb-2.5">
                    <span>Total: {hostelRoomType?.length}</span>
                </div>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>No of bed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hostelRoomType?.length > 0 ?
                            hostelRoomType?.map((item, index) => (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.no_of_bed}</td>
                                    <td>
                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        className="educare-warning-btn-sm-fill"
                                                        type="button"
                                                        onClick={(e) => setHostEditData(item)}
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
                                                        type="button"
                                                        onClick={(e) => handleDelete(e, item.id)}
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
                                <td className="text-center text-red-500" colSpan="9">Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomsTypeTableList;
