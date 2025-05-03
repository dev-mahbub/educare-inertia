// VehicleSummaryList.js
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useState } from "react";

const VehicleSummaryList = ({
    routeDetails = [],
    setLoading = false,
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [vehicleSearchData, setVehicleSearchData] = useState(routeDetails);
    const [selectedItem, setSelectedItem] = useState('');
    const handleVehicleSearch = (value) => {
        setSearchValue(value);
        const filteredData = routeDetails.filter(item => item?.route_name.toLowerCase().includes(value.toLowerCase()));
        setVehicleSearchData(filteredData);
    }
    const handleVehicle = (routeId) => {
        setSelectedItem(routeId);
        router.post(route('transport_report.vehicle_summary'), { transport_route_id: routeId });
        setLoading(false);
    }
    const totalStudents = vehicleSearchData.reduce((sum, item) => sum + item.students_count, 0);
    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Vehicle Summary
                </h5>
            </div>
            <div className="col-span-12 md:col-span-6">
                <div className="educare-input-field-styles mb-2">
                    <TextInput
                        id="search_route"
                        value={searchValue.search_route}
                        onChange={(e) => handleVehicleSearch(e.target.value)}
                        placeHolder="Search here"
                        className="block"
                    />
                </div>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Route</th>
                            <th>Student</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleSearchData?.length > 0 ?
                            vehicleSearchData?.map((item, index) => (
                                <tr className={`${selectedItem == item?.transport_route_id ? 'educare-table-row-active' : ' '}`} key={index}>
                                    <td>{item.vehicle_name}</td>
                                    <td>{item.route_name}</td>
                                    <td>
                                        <button
                                            className="font-semibold text-primary"
                                            type="button"
                                            onClick={(e) => handleVehicle(item?.transport_route_id)}
                                        >
                                            {item?.students_count}
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                            </tr>
                        }
                        {vehicleSearchData.length > 0 && <tr>
                            <td colSpan={2}>
                                <h6 className="text-[15px] font-semibold text-heading font-primary">
                                    Total
                                </h6>
                            </td>
                            <td>
                                <h6 className="text-[15px] font-semibold text-heading font-primary">
                                    {totalStudents}
                                </h6>
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehicleSummaryList;
