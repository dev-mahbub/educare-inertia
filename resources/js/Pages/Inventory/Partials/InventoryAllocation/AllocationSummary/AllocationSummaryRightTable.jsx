import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const AllocationSummaryRightTable = ({
    allocationData
 }) => {

    const [allocationProductReport, setAllocationProductReport] = useState([]);
    const [returnAllocationProductReport, setReturnAllocationProductReport] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        allowcation_search_input: "",
        return_search_input: "",
    });

    useEffect(() => {
        setAllocationProductReport(allocationData?.allocation_product_report ?? []);
        setReturnAllocationProductReport(allocationData?.return_allocation_product_report ?? []);
    }, [allocationData]);

    // handle search allocation product report start
    const handleSearchAllocationProductReport = (value) => {
        setData('allowcation_search_input', value);

        const filteredReport = allocationData?.allocation_product_report?.filter(item =>
            item?.allocated_by?.toLowerCase().includes(value.toLowerCase()) ||
            item?.allocate_date?.toLowerCase().includes(value.toLowerCase()) ||
            String(item?.allocate_quantity)?.toLowerCase().includes(value.toLowerCase()) ||
            item?.description?.toLowerCase().includes(value.toLowerCase())
        );

        setAllocationProductReport(filteredReport);
    }
    // handle search allocation product report end

    // handle search return allocation product report start
    const handleSearchReturnAllocationProductReport = (value) => {
        setData('return_search_input', value);

        const filteredReport = allocationData?.return_allocation_product_report?.filter(item =>
            item?.received_by?.toLowerCase().includes(value.toLowerCase()) ||
            item?.return_date?.toLowerCase().includes(value.toLowerCase()) ||
            String(item?.return_quantity)?.toLowerCase().includes(value.toLowerCase()) ||
            item?.description?.toLowerCase().includes(value.toLowerCase())
        );

        setReturnAllocationProductReport(filteredReport);
    }
    // handle search return allocation product report end

    const headerTopData = (e) => {
        e.preventDefault();
    };
    const headerTopTwoData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={headerTopData} className="mb-5">
                <div className="flex flex-wrap gap-2.5 justify-between items-center">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Allocation detail{" "}
                            {/* {allocationData?.Staff
                                ? `( ${allocationData?.Staff})`
                                : ""} */}
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div>
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                                Total : {allocationProductReport?.length}
                            </span>
                        </div>
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="allowcation_search_input"
                                value={data.allowcation_search_input}
                                onChange={(e) =>
                                    handleSearchAllocationProductReport(e.target.value)
                                }
                                placeHolder="Search here"
                                className="block"
                            />
                            <InputError
                                message={errors.allowcation_search_input}
                                className="mt-2"
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
            </form>

            <div className="educare-default-table xs:overflow-x-auto mb-5">
                <table>
                    <thead>
                        <tr>
                            <th>Alloc. date</th>
                            <th>Qty.</th>
                            <th>Note</th>
                            <th>Allocated By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocationProductReport?.length > 0 ? (
                            allocationProductReport.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.allocate_date}</td>
                                    <td> {item?.allocate_quantity} </td>
                                    <td> {item?.description} </td>
                                    <td> {item?.allocated_by} </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center text-red-500" colSpan="5">
                                    Data not found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <form onSubmit={headerTopTwoData} className="mb-5">
                <div className="flex flex-wrap gap-2.5 justify-between items-center">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Return detail{" "}
                            {/* {allocationData?.Staff
                                ? `( ${allocationData?.Staff})`
                                : ""} */}
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div>
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                                Total : {returnAllocationProductReport?.length}
                            </span>
                        </div>
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="return_search_input"
                                value={data.return_search_input}
                                onChange={(e) =>
                                    handleSearchReturnAllocationProductReport(e.target.value)
                                }
                                placeHolder="Search here"
                                className="block"
                            />
                            <InputError
                                message={errors.return_search_input}
                                className="mt-2"
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
            </form>

            <div className="educare-default-table xs:overflow-x-auto mb-5">
                <table>
                    <thead>
                        <tr>
                            <th>Return date</th>
                            <th>Qty.</th>
                            <th>Note</th>
                            <th>Received By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnAllocationProductReport?.length > 0 ? (
                            returnAllocationProductReport.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.return_date}</td>
                                    <td> {item?.return_quantity} </td>
                                    <td> {item?.description} </td>
                                    <td> {item?.received_by} </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center text-red-500" colSpan="5">
                                    Data not found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllocationSummaryRightTable;
