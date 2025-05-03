
import { Tooltip } from "@mui/material";
const AllocateProductLocationReportTable = ({
    productLocationReport
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Stock Group</th>
                                        <th>Code</th>
                                        <th>Active/Inactive</th>
                                        <th>Location</th>
                                        <th>Allocate By</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productLocationReport?.length > 0 ?
                                        productLocationReport.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.product_name}</td>
                                                <td>{item?.category_title}</td>
                                                <td>{item?.product_code}</td>
                                                <td>
                                                    {" "}
                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                        <div>
                                                            <Tooltip
                                                                title={item?.status}
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className={`transition ease-in-out duration-150 undefined educare-${item?.status == 'Active' ? 'success' : 'warning'}-btn-md-fill`}
                                                                >
                                                                    {item?.status}
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>{" "}
                                                </td>
                                                <td>{item?.infra_level_name}</td>
                                                <td>{item?.allocated_by}</td>
                                                <td>{item?.allocate_date}</td>
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
                </div>
            </div>
        </>
    );
};

export default AllocateProductLocationReportTable;
