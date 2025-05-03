import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";


const StaffEarningDeductionTable = () => {
    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Scale-10K</td>
                            <td>
                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                    <div>
                                        <Tooltip
                                            title="Edit"
                                            placement="top"
                                            arrow
                                        >
                                            <Link
                                                href="#"
                                                className="educare-warning-btn-sm-fill"
                                            >
                                                <i className="icon-editing"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip
                                            title="Delete"
                                            placement="top"
                                            arrow
                                        >
                                            <Link
                                                href="#"
                                                className="educare-danger-btn-sm-fill"
                                                as="button"
                                            >
                                                <i className="icon-TrashSimple"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default StaffEarningDeductionTable;
