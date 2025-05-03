import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import AllocationReportModalConfirm from "./AllocationReportModalConfirm";

const AllocationReportTable = ({
    allocationProductReports = [],
    auth = '',
    loading,
    setLoading,
    data
}) => {
    const [allocationReportData, setAllocationReportData] = useState(allocationProductReports)
    const [singlePopup, setSinglePopup] = useState(false);
    const [enqInnerActive, setEnqInnerActive] = useState('');

    useEffect(() => {
        setAllocationReportData(allocationProductReports)
        setLoading(false);
    }, [allocationProductReports])

    const handelCancelAllocationProduct = (id) => {
        let reasonInputValue; // Variable to store the input value

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure to cancel allocated inventory product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Reason",
                    input: "text",
                    inputAttributes: {
                        autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonText: "Confirm",
                    showLoaderOnConfirm: true,
                    preConfirm: (reason) => {
                        reasonInputValue = reason;
                        return reason;
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.patch(route('allocation_product_cancel', id), {cancel_reason: reasonInputValue}, {
                            onSuccess: () => {
                                router.post(route('allocation_report.list'), data);
                            },
                            onError: (errors) => {
                                for (const key in errors) {
                                    if (key == 'cancel_reason') {
                                        toast.error('Reason is required.', {
                                            position: 'top-right',
                                            autoClose: 1500,
                                        });

                                        break;
                                    }
                                }

                                router.post(route('allocation_report.list'), data);
                            }
                        });
                    }
                });
            }
        });
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Staff</th>
                                        <th>Allocated On</th>
                                        <th>Allocated By</th>
                                        <th>Note</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {allocationReportData?.length > 0 ? (
                                            allocationReportData?.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td>
                                                            {++index}{" "}
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() => setEnqInnerActive(enqInnerActive === index ? '' : index)}
                                                            >
                                                                <i className={enqInnerActive === index ? "icon-arrow-up" : "icon-down-arrow"}></i>
                                                            </button>
                                                        </td>
                                                        <td>{concatName(item?.staff_first_name, item?.staff_middle_name, item?.staff_last_name)}</td>
                                                        <td>{moment(item?.date_at).format("DD MMM, YYYY")}</td>
                                                        <td>{concatName(item?.created_by?.first_name, item?.created_by?.middle_name, item?.created_by?.last_name)}</td>
                                                        <td>{item?.description}</td>
                                                        <td>
                                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                <div>
                                                                    <Tooltip title="Delete" placement="top" arrow>
                                                                        <button
                                                                            onClick={() => handelCancelAllocationProduct(item.id)}
                                                                            type="button"
                                                                            className="educare-danger-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className={enqInnerActive === index ? '' : 'hidden'}>
                                                        <td colSpan="6" className="educare-admission-list-enq-inner-wrap">
                                                            <table className="educare-admission-list-enq-inner">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Product name</th>
                                                                        <th>Quantity</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item.product_items?.length > 0 ? (
                                                                        item.product_items.map((productItem, subIndex) => (
                                                                            <tr key={subIndex}>
                                                                                <td>{productItem?.product?.title}</td>
                                                                                <td>{productItem?.allocate_quantity}</td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="2">No product items found</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="6">
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AllocationReportModalConfirm singlePopup={singlePopup} setSinglePopup={setSinglePopup} />
        </>
    );
};

export default AllocationReportTable;
