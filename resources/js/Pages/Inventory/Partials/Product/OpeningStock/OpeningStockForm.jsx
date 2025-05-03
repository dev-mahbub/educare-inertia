import SelectInput2 from "@/Components/SelectInput2";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function OpeningStockForm({
    products = [],
    proCats = [],
    subProCats = [],
    catId = "",
    subCatId = "",
    search = "",
}) {
    const [editedItemId, setEditedItemId] = useState(null);
    const [itemValues, setItemValues] = useState({
        id: "",
        opening_stock: "",
        rate_per_product: "",
        amount: "",
    });

    const handleInputChange = (id, field, value) => {
        if (field == 'rate_per_product') {
            setItemValues((prevData) => ({
                 ...prevData,
                 id,
                 [field]: value,
                 amount:prevData?.opening_stock * value
            }));
        } else if (field == 'opening_stock') {
            setItemValues((prevData) => ({
                ...prevData,
                id,
                [field]: value,
                amount: prevData?.rate_per_product * value
            }));
        } else {
            setItemValues((prevData) => ({ ...prevData, id, [field]: value }));
        }

        // setItemValues((prevData) => ({ ...prevData, id, [field]: value }));
    };

    useEffect(() => {
        setEditedItemId(null);
    }, [products]);

    const handleSubmit = (title) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Please be sure before updating opening quantity of ${title}. ! you will not be able to further change the opening quantity of ${title}.!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0b52bd",
            cancelButtonColor: "#38b3fe",
            confirmButtonText: "Yes, update!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("opening_stock_product.save"), itemValues);
            }
        });
    };

    const handleEditClick = (id, opening_stock, rate_per_product, amount) => {
        setEditedItemId(id);
        setItemValues({ id, opening_stock, rate_per_product, amount });
    };

    const handleEditCancel = () => {
        setEditedItemId(null);
        setItemValues({});
    };

    // filter
    const handleGroup = (catId) => {
        if (catId === "Select group") {
            router.get(
                `/inventory/product/opening-stock?sub_cat_id=${subCatId}&search=${search}`
            );
        } else if (!isNaN(parseInt(catId))) {
            router.get(
                `/inventory/product/opening-stock?cat_id=${catId}&search=${search}`
            );
        }
    };

    const handleSubGroup = (subCatId) => {
        if (subCatId === "Select sub group") {
            router.get(
                `/inventory/product/opening-stock?cat_id=${catId}&search=${search}`
            );
        } else if (!isNaN(parseInt(subCatId))) {
            router.get(
                `/inventory/product/opening-stock?cat_id=${catId}&sub_cat_id=${subCatId}&search=${search}`
            );
        }
    };

    const handleSearch = (search) => {
        if (search) {
            router.get(
                `/inventory/product/opening-stock?cat_id=${catId}&sub_cat_id=${subCatId}&search=${search}`
            );
        } else {
            router.get(
                `/inventory/product/opening-stock?cat_id=${catId}&sub_cat_id=${subCatId}`
            );
        }
    };

    const handleReset = () => {
        router.get(route("opening_stock_product.list"));
    };

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-header-filtar-bar-area z-[4] relative">
                                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                                    <div className="educare-header-filtar-bar-main">
                                        <div>
                                            <div className=" educare-header-filtar-bar-inner-main">
                                                {/* delete count if don't need */}
                                                <div className="educare-header-filtar-bar-count mr-auto">
                                                    <div className="educare-card-title pb-none">
                                                        <h5>
                                                            <i className="icon-ListBullets"></i>
                                                            Set Opening Stock{" "}
                                                            ({products?.length})
                                                        </h5>
                                                    </div>
                                                </div>
                                                {/* delete count if don't need */}
                                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                                    <div className="educare-header-filtar-bar-fields-area relative">
                                                        <span
                                                            className="educare-header-filter-prev"
                                                            onClick={
                                                                handlePrevClick
                                                            }
                                                        >
                                                            <i className="icon-left-chevron"></i>
                                                        </span>
                                                        <div
                                                            className="educare-header-filtar-bar-fields-wrap"
                                                            ref={listRef}
                                                            style={{
                                                                transform: `translateX(-${
                                                                    currentIndex *
                                                                    120
                                                                }px)`,
                                                            }}
                                                        >
                                                            {/* Replace changable inputs */}
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput2
                                                                    id="category_id"
                                                                    data_label="group"
                                                                    data={
                                                                        proCats
                                                                    }
                                                                    selectedData={
                                                                        catId
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleGroup(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                            </div>
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput2
                                                                    id="sub_category_id"
                                                                    data_label="sub group"
                                                                    data={
                                                                        subProCats
                                                                    }
                                                                    selectedData={
                                                                        subCatId
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSubGroup(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                            </div>
                                                            <div className="educare-select-field-styles">
                                                                <TextInput
                                                                    id="search_query"
                                                                    defaultValue={
                                                                        search
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSearch(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="text"
                                                                    placeholder="Search here"
                                                                />
                                                            </div>
                                                            {/* Replace changable inputs */}
                                                        </div>
                                                        <span
                                                            className="educare-header-filter-next"
                                                            onClick={
                                                                handleNextClick
                                                            }
                                                        >
                                                            <i className="icon-chevron"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                                    {/* Replace changable buttons */}
                                                    <div>
                                                        <Tooltip
                                                            title="Reset"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    handleReset
                                                                }
                                                                className="educare-gray-btn-md-fill"
                                                            >
                                                                <i className="icon-ArrowsClockwise"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    {/* Replace changable buttons */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>SL No</th>
                                            <th>Product code</th>
                                            <th>Product name</th>
                                            <th>Product size</th>
                                            <th>Group</th>
                                            <th>Sub group</th>
                                            <th>Opening stock</th>
                                            <th>Rate per Unit</th>
                                            <th>Amount</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.length > 0 ? (
                                            products?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>
                                                        {item?.product_code}
                                                    </td>
                                                    <td>
                                                        {item?.title?.length >
                                                        40
                                                            ? item?.title?.slice(
                                                                  0,
                                                                  40
                                                              ) + "..."
                                                            : item?.title}
                                                    </td>
                                                    <td>
                                                        {item?.product_size}
                                                    </td>
                                                    <td>
                                                        {item?.category_title}
                                                    </td>
                                                    <td>
                                                        {
                                                            item?.sub_category_title
                                                        }
                                                    </td>
                                                    <td>
                                                        {editedItemId ===
                                                        item?.id ? (
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="opening_stock"
                                                                    defaultValue={
                                                                        item.opening_stock
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleInputChange(
                                                                            item?.id,
                                                                            "opening_stock",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="number"
                                                                    disabled={
                                                                        item?.is_opening_stock
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            item?.is_opening_stock
                                                                                ? "#e3e3e3"
                                                                                : "",
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="opening_stock"
                                                                    defaultValue={
                                                                        item.opening_stock
                                                                    }
                                                                    className="block"
                                                                    type="number"
                                                                    disabled={
                                                                        true
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            item?.is_opening_stock
                                                                                ? "#e3e3e3"
                                                                                : "rgb(58 255 114 / 33%)",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editedItemId ===
                                                        item?.id ? (
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="rate_per_product"
                                                                    defaultValue={
                                                                        item.rate_per_product
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleInputChange(
                                                                            item?.id,
                                                                            "rate_per_product",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="number"
                                                                />
                                                            </div>
                                                        ) : (
                                                            item.rate_per_product
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editedItemId ===
                                                        item?.id ? (
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="amount"
                                                                    value={
                                                                        // item.rate_per_product * item.opening_stock
                                                                        itemValues.rate_per_product * itemValues.opening_stock
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        // handleInputChange(
                                                                        //     item?.id,
                                                                        //     "amount",
                                                                        //     e
                                                                        //         .target
                                                                        //         .value
                                                                        // )
                                                                        handleInputChange(
                                                                            item?.id,
                                                                            "amount",
                                                                            itemValues.rate_per_product * itemValues.opening_stock
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="number"
                                                                />
                                                            </div>
                                                        ) : (
                                                            item.rate_per_product * item.opening_stock
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                            {editedItemId ===
                                                            item.id ? (
                                                                <>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Remove"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="educare-danger-btn-sm-fill"
                                                                                onClick={
                                                                                    handleEditCancel
                                                                                }
                                                                            >
                                                                                X
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Save"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                className="educare-success-btn-sm-fill"
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handleSubmit(
                                                                                        item.title
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i className="icon-check-1"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Edit"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleEditClick(
                                                                                        item?.id,
                                                                                        item?.opening_stock,
                                                                                        item?.rate_per_product,
                                                                                        item?.amount
                                                                                    )
                                                                                }
                                                                                className="educare-warning-btn-sm-fill"
                                                                                type="button"
                                                                            >
                                                                                <i className="icon-pen"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="10"
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
                </div>
            </div>
        </>
    );
}
