import TextInput from "@/Components/TextInput";
import { getLength50 } from "@/Hooks/GlobalFunction";
import { useState } from "react";

const AllocationSummaryLeftTable = ({
    setAllocationData,
    allocationSummary
}) => {

    const [filteredProductData, setFilteredProductData] = useState(allocationSummary);
    const [data, setData] = useState({ search_input: "" });

    const handleSearch = (value) => {
        setData("search_input", value);

        const filteredProducts = allocationSummary.filter(item =>
            item?.staff_name.toLowerCase().includes(value.toLowerCase()) ||
            getLength50(item, 'product_title').toLowerCase().includes(value.toLowerCase())
        );

        setFilteredProductData(filteredProducts);
    };

    return (
        <>
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Allocation summary
                    </h5>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_input"
                            value={data.search_input}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeHolder="Search here"
                            className="block"
                        />
                    </div>
                    {/* <div className="educare-filter-action-btn flex flex-wrap gap-2">
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div> */}
                </div>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Staff</th>
                            <th>Product</th>
                            <th>Current Qty.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProductData.map((item) => (
                            <tr key={item?.id}>
                                <td>{item?.staff_name} </td>
                                <td>{getLength50(item, 'product_title')}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="font-semibold text-primary"
                                        onClick={() => {
                                            setAllocationData(item)
                                        }
                                        }
                                    >
                                        {item?.allocated_quantity}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllocationSummaryLeftTable;
