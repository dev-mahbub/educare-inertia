// RouteSummaryList.js
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from 'react';


const RouteSummaryList = ({
    areaData = [],
    setLoading = '',
    setSelectedArea
}) => {

    const [searchValue, setSearchValue] = useState('');
    const [areaSearchData, setAreaSearchData] = useState(areaData);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAreaSearch = (value) => {
        setSearchValue(value);
        const filteredData = areaData.filter(item => item?.area_title?.toLowerCase().includes(value.trim().toLowerCase()));
        setAreaSearchData(filteredData);
    }

    const handleArea = (index, stoppageId, areaId) => {
        setSelectedItem(index);
        router.post(route('transport_report.areawise_summary'), { transport_stoppage_id: stoppageId, area_id: areaId });
        setLoading(false);
        setSelectedArea(areaSearchData[index] ?? {});
    }

    const studentCountSum = areaData?.reduce((sum, item) => sum + item?.student_count, 0);

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Area Wise Summary
                </h5>
            </div>
            <form>
                <div className="flex flex-wrap gap-2.5 justify-between mb-2.5">
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_route"
                            value={searchValue.search_route}
                            onChange={(e) => handleAreaSearch(e.target.value)}
                            placeHolder="Search Route"
                            className="block"
                        />
                    </div>
                    {areaData?.length > 0 &&
                        <div className="educare-filter-action-btn inline-flex gap-2">
                            <div>
                                <Tooltip title="Excel Sheet" placement="top" arrow>
                                    <a
                                        target="_blank"
                                        href={route('export_excel.transport.area_summary_report')}
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
                            <th>Area</th>
                            <th>Student</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areaSearchData?.length > 0 ?
                            areaSearchData?.map((item, index) => (
                                <tr className={`${selectedItem == index ? 'educare-table-row-active' : ' '}`} key={index}>
                                    <td>{item?.area_title}</td>
                                    <td>
                                        <button
                                            className="font-semibold text-primary"
                                            type="button"
                                            onClick={(e) => handleArea(index, item?.transport_stoppage_id, item?.area_id)}
                                        >
                                            {item?.student_count}
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                            </tr>
                        }

                        {areaData.length > 0 && <tr>
                            <td>
                                <h6 className="text-[15px] font-semibold text-heading font-primary">
                                    Total
                                </h6>
                            </td>
                            <td>
                                <h6 className="text-[15px] font-semibold text-heading font-primary">
                                    {studentCountSum}
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
