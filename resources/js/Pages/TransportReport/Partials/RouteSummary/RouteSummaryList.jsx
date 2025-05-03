// RouteSummaryList.js
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from 'react';


const RouteSummaryList = ({
    routeData = [],
    totalStudent = '',
    setLoading = '',
    selectedItem,
    setSelectedItem
}) => {

    const [searchValue, setSearchValue] = useState('');
    const [routeSearchData, setRouteSearchData] = useState(routeData);

    const handleRouteSearch = (value) => {
        setSearchValue(value);
        const filteredData = routeData.filter(item => item?.name.toLowerCase().includes(value.trim().toLowerCase()));
        setRouteSearchData(filteredData);
    }

    const handleRoute = (id) => {
        setSelectedItem(id);
        router.post(route('transport_report.route_summary'), { id: id });
        setLoading(false);
    }

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Route Summary
                </h5>
            </div>
            <form>
                <div className="flex flex-wrap gap-2.5 justify-between mb-2.5">
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_route"
                            value={searchValue.search_route}
                            onChange={(e) => handleRouteSearch(e.target.value)}
                            placeHolder="Search Route"
                            className="block"
                        />
                    </div>
                    {routeData?.length > 0 &&
                        <div className="educare-filter-action-btn inline-flex gap-2">
                            <div>
                                <Tooltip title="Download Excel" placement="top" arrow>
                                    <a
                                        target="_blank"
                                        href={route('export_excel.transport.route_summary_report')}
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        </div>
                    }
                </div>
            </form>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Route</th>
                            <th>Student</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routeSearchData?.length > 0 ?
                            routeSearchData?.map((item, index) => (
                                <tr className={`${selectedItem == item?.id ? 'educare-table-row-active' : ' '}`} key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <button
                                            className="font-semibold text-primary"
                                            type="button"
                                            onClick={(e) => handleRoute(item?.id)}
                                        >
                                            {item?.allocated_students_count}
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                            </tr>
                        }

                        {routeData.length > 0 && <tr>
                            <td>
                                <h6 className="text-[15px] font-semibold text-heading font-primary">
                                    Total
                                </h6>
                            </td>
                            <td>
                                <h6 className="text-[15px] font-semibold text-heading font-primary">
                                    {totalStudent}
                                </h6>
                            </td>
                        </tr>}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RouteSummaryList;
