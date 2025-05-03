import LocationProductListRightDivFilter from "./LocationProductListRightDivFilter";

const LocationProductListRightDiv = ({
    locationWiseProductReport,
    statusArray,
    selectedInfraLevel,
    data,
    setData
}) => {
    return (
        <>
            <div className="educare-card-title pb-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Product List ({selectedInfraLevel?.name ?? ''})
                </h5>
            </div>
            <LocationProductListRightDivFilter
                statusArray={statusArray}
                locationWiseProductReport={locationWiseProductReport}
                selectedInfraLevel={selectedInfraLevel}
                data={data}
                setData={setData}
            />
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Code</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Allocate By</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locationWiseProductReport?.length > 0 ?
                            locationWiseProductReport.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.product_name}</td>
                                    <td>{item?.product_code}</td>
                                    <td>{item?.status}</td>
                                    <td>{item?.infra_level_name}</td>
                                    <td>{item?.allocated_by}</td>
                                    <td>{item?.allocate_date}</td>
                                </tr>
                            ))
                        :
                            <tr>
                                <td
                                    className="text-center text-red-500"
                                    colSpan="6"
                                >
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LocationProductListRightDiv;
