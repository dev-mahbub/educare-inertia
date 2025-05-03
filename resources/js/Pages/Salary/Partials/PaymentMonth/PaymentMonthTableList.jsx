import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from 'moment';
import Swal from "sweetalert2";

const PaymentMonthTableList = ({
    setSelectedItem,
    setFormMode,
    paymentMonths
}) => {

    const handleEditData = (itemId) => {
        const selected = paymentMonths?.find(item => item.id === itemId);

        setSelectedItem(selected);
        setFormMode('edit');
    }

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
                router.delete(route('salary.payment_month.delete', id));
            }
        });
    }

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    Payment Months
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentMonths?.length > 0 ? (
                            paymentMonths.map((item, index) =>
                                <tr key={index}>
                                    <td>{item?.title}</td>
                                    <td>{moment(item?.start_date).format("DD-MMM-YYYY")}</td>
                                    <td>{moment(item?.end_date).format("DD-MMM-YYYY")}</td>
                                    <td>
                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        onClick={() => handleEditData(item.id)}
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
        </div>
    );
};

export default PaymentMonthTableList;
