import { Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import AllocateProductLocationFilterLeft from "./AllocateProductLocationFilterLeft";
const AllocateProductLocationLeftTable = ({
    setAlocateItem,
    products,
    setMode
}) => {
    // const dummyProductData = [
    //     {
    //         id: 1,
    //         Item: "Soyabin",
    //         totalQuantity: 100,
    //         availabeQuantity: 90,
    //         allocatedQuantity: 50,
    //         view: false,
    //     },
    //     {
    //         id: 2,
    //         Item: "GK",
    //         totalQuantity: 294,
    //         availabeQuantity: 100,
    //         allocatedQuantity: 40,
    //         view: true,
    //     },
    //     {
    //         id: 3,
    //         Item: "TEA CUP",
    //         totalQuantity: 294,
    //         availabeQuantity: 100,
    //         allocatedQuantity: 20,
    //         view: false,
    //     },
    //     {
    //         id: 4,
    //         Item: "Book",
    //         totalQuantity: 294,
    //         availabeQuantity: 100,
    //         allocatedQuantity: 55,
    //         view: true,
    //     },
    //     {
    //         id: 5,
    //         Item: "Bag",
    //         totalQuantity: 294,
    //         availabeQuantity: 100,
    //         allocatedQuantity: 44,
    //         view: false,
    //     },
    // ];

    const [filterText, setFilterText] = useState('');

    const filteredProducts = useMemo(() => {
        return products?.filter((item) => {
            const inputText = filterText?.toLowerCase()?.trim();
            const productTitle = item?.title?.toLowerCase();

            return productTitle && productTitle.includes(inputText);
        });
    }, [filterText, products]);

    // handle view product allocation start
    const handleViewProductAllocation = (item) => {
        setAlocateItem(item);
        setMode('view');
    }
    // handle view product allocation end

    // handle allocate product select start
    const handleAllocateProductSelect = (item) => {
        setAlocateItem(item);
        setMode('allocate');
    }
    // handle allocate product select end

    return (
        <>
            <AllocateProductLocationFilterLeft
                products={filteredProducts}
                setFilterText={setFilterText}
            />

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Tot. Qty.</th>
                            <th>Avlbl. Qty.</th>
                            <th>Allocated Qty.</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts?.length > 0 ?
                            filteredProducts.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.title}</td>
                                    <td>{item?.opening_stock ?? 0}</td>
                                    <td> {item?.available_stock ?? 0} </td>
                                    <td> {item?.allocated_quantity ?? 0} </td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            {item?.product_location_allocations?.length > 0 ? (
                                                <>
                                                    <div>
                                                        <Tooltip
                                                            title="view"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleViewProductAllocation(item)
                                                                }
                                                                className="educare-tertiary-btn-sm-fill"
                                                            >
                                                                <i className="icon-eye"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            <div>
                                                <Tooltip
                                                    title="Allocate"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleAllocateProductSelect(item)
                                                        }
                                                        type="button"
                                                        className="educare-warning-btn-sm-fill"
                                                    >
                                                        <i className="icon-Storefront"></i>
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
                                    colSpan="10"
                                >
                                    Data not found
                                </td>
                            </tr>
                         }

                        {/* {dummyProductData.map((item) => (
                            <tr key={item?.id}>
                                <td>{item?.Item}</td>
                                <td>{item?.totalQuantity}</td>
                                <td> {item?.availabeQuantity} </td>
                                <td> {item?.allocatedQuantity} </td>
                                <td>
                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                        {item?.view === true ? (
                                            <>
                                                <div>
                                                    <Tooltip
                                                        title="view"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setAlocateItem(
                                                                    item
                                                                )
                                                            }
                                                            className="educare-tertiary-btn-sm-fill"
                                                        >
                                                            <i className="icon-eye"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        <div>
                                            <Tooltip
                                                title="Allocate"
                                                placement="top"
                                                arrow
                                            >
                                                <button
                                                    onClick={() =>
                                                        setAlocateItem(item)
                                                    }
                                                    type="button"
                                                    className="educare-warning-btn-sm-fill"
                                                >
                                                    <i className="icon-Storefront"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllocateProductLocationLeftTable;
