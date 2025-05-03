// RouteSummaryList.js
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from 'react';


const StoppageSummaryList = ({
    stopPageData = [],
    totalStudent = '',
    setLoading = '',
    selectedItem,
    setSelectedItem
}) => {

    const [searchValue, setSearchValue] = useState('');
    const [stopPageSearchData, setStopPageSearchData] = useState(stopPageData);

    const handleStopPageSearch = (value) => {
        setSearchValue(value);
        const filteredData = stopPageData.filter(item => item?.stoppage.toLowerCase().includes(value.trim().toLowerCase()));
        setStopPageSearchData(filteredData);
    }

    const handleStopPage = (id) => {
        setSelectedItem(id);
        router.post(route('transport_report.stoppage_summary'), { id: id });
        setLoading(false);
    }

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Stoppage Summary
                </h5>
            </div>
            <form>
                <div className="flex flex-wrap gap-2.5 justify-between mb-2.5">
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_route"
                            value={searchValue.search_route}
                            onChange={(e) => handleStopPageSearch(e.target.value)}
                            placeHolder="Search Route"
                            className="block"
                        />
                    </div>

                    {stopPageData?.length > 0 &&
                        <div className="educare-filter-action-btn inline-flex gap-2">
                            <div>
                                <Tooltip title="Download Excel" placement="top" arrow>
                                    <a
                                        target="_blank"
                                        href={route('export_excel.transport.stoppage_summary_report')}
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
                            <th>Stoppage</th>
                            <th>Student</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stopPageSearchData?.length > 0 ?
                            stopPageSearchData?.map((item, index) => (
                                <tr className={`${selectedItem == item?.id ? 'educare-table-row-active' : ' '}`} key={index}>
                                    <td>{item.stoppage}</td>
                                    <td>
                                        <button
                                            className="font-semibold text-primary"
                                            type="button"
                                            onClick={(e) => handleStopPage(item?.id)}
                                        >
                                            {item?.transport_allocations_count}
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                            </tr>
                        }

                        {stopPageData.length > 0 && <tr>
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

export default StoppageSummaryList;
