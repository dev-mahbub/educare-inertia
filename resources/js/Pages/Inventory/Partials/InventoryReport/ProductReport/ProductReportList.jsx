import Loader from "@/Components/Loader";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

export default function ProductReportList({
    proCats = [],
    subProCats = [],
    productArrType = [],
    products = [],
}) {
    const [subCat, setSubCat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState(products);

    useEffect(() => {
        setProductData(products);
        setLoading(false);
    }, [products]);

    const { data, setData } = useForm({
        type: "",
        category_id: "",
        sub_category_id: "",
        search_query: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route("product_report.list"), data);
            setLoading(false);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route("product_report.list"));
    };

    const handleCategory = (id) => {
        setData((prevData) => ({
            ...prevData,
            category_id: id,
            sub_category_id: "",
        }));
        const filterSubCats = subProCats.filter((item) => item.parent_id == id);
        if (filterSubCats) {
            setSubCat(filterSubCats);
        }
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
                            <div className="educare-admission-filtar-bar-area z-[4] relative">
                                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                                    <div className="educare-header-filtar-bar-main">
                                        <form>
                                            <div className=" educare-header-filtar-bar-inner-main">
                                                {/* delete count if don't need */}
                                                <div className="educare-header-filtar-bar-count mr-auto">
                                                    <span>Total : {productData?.length}</span>
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
                                                                <SelectInput
                                                                    id="type"
                                                                    data_label="type"
                                                                    data={
                                                                        productArrType
                                                                    }
                                                                    value={
                                                                        data.type
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "type",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                            </div>
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput
                                                                    id="category_id"
                                                                    data_label="group"
                                                                    data={
                                                                        proCats
                                                                    }
                                                                    value={
                                                                        data.category_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleCategory(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                            </div>
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput
                                                                    id="sub_category_id"
                                                                    data_label="sub group"
                                                                    data={
                                                                        subCat
                                                                    }
                                                                    value={
                                                                        data.sub_category_id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "sub_category_id",
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
                                                                    value={
                                                                        data.search_query
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "search_query",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="text"
                                                                    placeHolder="Search here"
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
                                                            title="Search"
                                                            placement="top"
                                                        >
                                                            <button
                                                                className="educare-secondary-btn-md-fill"
                                                                onClick={
                                                                    handleSearch
                                                                }
                                                            >
                                                                <i className="icon-search-interface-symbol"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Reset"
                                                            placement="top"
                                                            onClick={
                                                                handleReset
                                                            }
                                                        >
                                                            <button className="educare-gray-btn-md-fill">
                                                                <i className="icon-ArrowsClockwise"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    {productData?.length > 0 &&
                                                        <div>
                                                            <Tooltip
                                                                title="Download Excel"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <a
                                                                    href={route('export_excel.inventory.product_report', data)}
                                                                    target='_blank'
                                                                    className="educare-success-btn-md-fill"
                                                                >
                                                                    <i className="icon-FileX"></i>
                                                                </a>
                                                            </Tooltip>
                                                        </div>
                                                    }
                                                    {/* Replace changable buttons */}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>SL No</th>
                                            <th>Product name</th>
                                            <th>Type</th>
                                            <th>Group</th>
                                            <th>Bal.Stock</th>
                                        </tr>
                                    </thead>
                                    {loading ? (
                                        <Loader></Loader>
                                    ) : (
                                        <tbody>
                                            {productData?.length > 0 ? (
                                                productData?.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>{++index}</td>
                                                            <td>
                                                                {item?.title}
                                                            </td>
                                                            <td>
                                                                {item?.type}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item?.category_title
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    // item?.opening_stock
                                                                    item?.available_stock
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )
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
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
