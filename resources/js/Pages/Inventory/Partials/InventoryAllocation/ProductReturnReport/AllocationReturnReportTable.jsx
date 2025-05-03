import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

const AllocationReturnReportTable = ({
    allocationReturnProducts = [],
    loading,
    setLoading,
}) => {
    const [allocationReturnReportData, setAllocationReturnReportData] = useState(allocationReturnProducts)
    const [enqInnerActive, setEnqInnerActive] = useState('');

    useEffect(() => {
        setAllocationReturnReportData(allocationReturnProducts)
        setLoading(false);
    }, [allocationReturnProducts])

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
                                        <th>Return Date</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>

                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {allocationReturnReportData?.length > 0 ? (
                                            allocationReturnReportData?.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td>
                                                            {++index}
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() => setEnqInnerActive(enqInnerActive === index ? '' : index)}
                                                            >
                                                                <i className={enqInnerActive === index ? "icon-arrow-up" : "icon-down-arrow"}></i>
                                                            </button>
                                                        </td>
                                                        <td>{concatName(item?.staff_first_name, item?.staff_middle_name, item?.staff_last_name)}</td>
                                                        <td>{moment(item?.return_date_at).format("DD MMM, YYYY")}</td>
                                                        <td>{item?.description}</td>
                                                    </tr>
                                                    <tr className={enqInnerActive === index ? '' : 'hidden'}>
                                                        <td colSpan="4" className="educare-admission-list-enq-inner-wrap">
                                                            <table className="educare-admission-list-enq-inner">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Product name</th>
                                                                        <th>Quantity</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item.product_return_items?.length > 0 ? (
                                                                        item.product_return_items.map((productItem, subIndex) => (
                                                                            <>
                                                                                <tr key={subIndex}>
                                                                                    <td>{productItem?.product?.title}</td>
                                                                                    <td>{productItem?.return_quantity}</td>
                                                                                </tr>
                                                                            </>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="2">No product items found</td>
                                                                        </tr>
                                                                    )}
                                                                    <tr>
                                                                        <td><strong className="flex justify-end mr-4">Total return quantity</strong></td>
                                                                        <td>
                                                                            {item.product_return_items?.length > 0 ? (
                                                                                item.product_return_items.reduce((total, productItem) => total + productItem.return_quantity, 0)
                                                                            ) : (
                                                                                0
                                                                            )}
                                                                        </td>
                                                                    </tr>
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
        </>
    );
};

export default AllocationReturnReportTable;
