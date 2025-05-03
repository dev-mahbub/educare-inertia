import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

export default function GradeScaleList({
    grades,
    data,
    setData,
    handleGrate
 }) {
    const handleDelete = (e, id) => {
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
                router.delete(route("academic_grade.destroy", id));
            }
        });
    };

    return (
        <>
            <div>
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Grade Scale List
                        </h5>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Scale Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades?.length > 0 ? (
                                    grades?.map((item, index) => (
                                        <tr
                                            key={index}
                                            style={{
                                                backgroundColor:
                                                    data?.id === item.id
                                                        ? "rgb(107 156 227 / 56%)"
                                                        : "",
                                            }}
                                        >
                                            <td>{item?.scale_name}</td>
                                            <td>
                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Edit"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={(e) =>
                                                                    handleGrate(
                                                                        e,
                                                                        item
                                                                    )
                                                                }
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
                                                                type="button"
                                                                onClick={(e) =>
                                                                    handleDelete(
                                                                        e,
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="text-center text-red-500"
                                            colSpan="7"
                                        >
                                            Data not found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
