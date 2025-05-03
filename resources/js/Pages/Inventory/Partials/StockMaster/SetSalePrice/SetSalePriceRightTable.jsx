import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CostPriceEditPopupForm from "./CostPriceEditPopupForm";
import SalePriceEditPopupForm from "./SalePriceEditPopupForm";

const SetSalePriceRightTable = ({
    productNames,
    product,
    username,
    salePriceProduct
}) => {
    const [saleProductData, setSaleProductData] = useState(salePriceProduct);
    const [productData, setProductData] = useState(salePriceProduct);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editPopupOpen2, setEditPopupOpen2] = useState(false);
    const [editData, setEditData] = useState([]);
    const [editData2, setEditData2] = useState([]);

    // handleEditPopup
    const handleEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

    const handleEditPopup2 = (editData2) => {
        setEditData2(editData2);
        setEditPopupOpen2(!editPopupOpen2);
    };

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
                router.delete(route('sale_price.delete', id));
            }
        });
    }

    useEffect(() => {
        setSaleProductData(salePriceProduct)
        setProductData(product)
    }, [salePriceProduct, product]);

    return (
        <>
            {/* table one  */}

            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Sale Price
                </h5>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Price(Rs)</th>
                            <th>Applied On</th>
                            <th>Applied By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleProductData?.length > 0 ?
                            saleProductData?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.sale_price}</td>
                                    <td>{moment(item?.applied_date_at).format("DD MMM, YYYY")}</td>
                                    <td>{item.applied_by != null && `${item?.applied_by?.first_name ?? ''} ${item?.applied_by?.middle_name ?? ''} ${item?.applied_by?.last_name ?? ''}`}</td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <button
                                                        type="button"
                                                        className="educare-warning-btn-sm-fill"
                                                        onClick={() => handleEditPopup(item)}
                                                    >
                                                        <i className="icon-pen"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip
                                                    title="Delete"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <button
                                                        type="button"
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
                                <td className="text-center text-red-500" colSpan="12">
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            {/* table Two  */}


            <div className="educare-card-title mr-auto pb-none mb-2.5 mt-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Cost Price
                </h5>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Price(Rs)</th>
                            <th>Purchase On</th>
                            <th>Purchase By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData ? (
                            <tr>
                                <td>{productData?.rate_per_product}</td>
                                <td>{moment(productData?.purchase_date_at).format("DD MMM, YYYY")}</td>
                                <td>{productData?.purchased_by != null && `${productData.purchased_by?.first_name ?? ''} ${productData.purchased_by?.middle_name ?? ''} ${productData.purchased_by?.last_name ?? ''}`}</td>
                                <td>
                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                        <div>
                                            <Tooltip
                                                title="Edit"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    type="button"
                                                    className="educare-warning-btn-sm-fill"
                                                    onClick={() => handleEditPopup2(productData)}
                                                >
                                                    <i className="icon-pen"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                        {/* <div>
                                            <Tooltip
                                                title="Delete"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    type="button"
                                                    className="educare-danger-btn-sm-fill"
                                                >
                                                    <i className="icon-TrashSimple"></i>
                                                </button>
                                            </Tooltip>
                                        </div> */}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td className="text-center text-red-500" colSpan="12">
                                    Data not found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <SalePriceEditPopupForm
                editPopupOpen={editPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                editData={editData}
            />
            <CostPriceEditPopupForm
                editPopupOpen2={editPopupOpen2}
                setEditPopupOpen2={setEditPopupOpen2}
                editData2={editData2}
            />
        </>
    );
};

export default SetSalePriceRightTable;
