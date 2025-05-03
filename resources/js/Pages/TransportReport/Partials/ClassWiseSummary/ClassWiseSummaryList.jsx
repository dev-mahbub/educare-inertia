// RouteSummaryList.js
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from 'react';


const ClassWiseSummaryList = ({
    classrooms = [],
    setLoading = '',
}) => {

    const [searchValue, setSearchValue] = useState('');
    const [classroomSearchData, setClassroomSearchData] = useState(classrooms);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClassroomSearch = (value) => {
        setSearchValue(value);
        const filteredData = Object.values(classrooms)?.filter(item => item?.classroom_title?.toLowerCase().includes(value.toLowerCase()));
        setClassroomSearchData(filteredData);
    }

    const handleClassroom = (index, classroomId) => {
        setSelectedItem(index);
        router.post(route('transport_report.classwise_report'), { classroom_id: classroomId });
        setLoading(false);
    }

    const studentCountSum = Object.values(classroomSearchData)?.reduce((sum, item) => sum + item?.students.length, 0);

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Class Summary
                </h5>
            </div>
            <form>
                <div className="flex flex-wrap gap-2.5 justify-between mb-2.5">
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_route"
                            value={searchValue.search_route}
                            onChange={(e) => handleClassroomSearch(e.target.value)}
                            placeHolder="Search Route"
                            className="block"
                        />
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        <div>
                            <Tooltip title="Excel Sheet" placement="top" arrow>
                                <button
                                    type="button"
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </form>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Student</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(classroomSearchData)?.length > 0 ?
                            Object.values(classroomSearchData)?.map((item, index) => (
                                <tr className={`${selectedItem == index ? 'educare-table-row-active' : ' '}`} key={index}>
                                    <td>{item.classroom_title}</td>
                                    <td>
                                        <button
                                            className="font-semibold text-primary"
                                            type="button"
                                            onClick={(e) => handleClassroom(index, item?.classroom_id)}
                                        >
                                            {item?.students?.length}
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                            </tr>
                        }

                        {Object.keys(classroomSearchData)?.length > 0 && <tr>
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

export default ClassWiseSummaryList;
