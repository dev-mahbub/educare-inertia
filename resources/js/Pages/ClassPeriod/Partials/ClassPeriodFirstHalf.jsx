import PrimaryButton from "@/Components/PrimaryButton";
import { Tooltip } from '@mui/material';
import { useState } from "react";
import CreatePeriodFirstHalfPopup from "./popup/CreatePeriodFirstHalfPopup";

const ClassPeriodFirstHalf = ({
    convertToLocaleTime,
    schoolPeriods,
    classroomPeriods,
    formData,
    handleDeleteClassroomPeriod
}) => {

    const [listPopup, setListPopup] = useState(false);
    const handleListPopupClick = () => {
        setListPopup(!listPopup);
    };

    return (
        <>
            <div className="lg:col-span-6 col-span-12">
                <div className="educare-master-create-school-period-wrapper">
                    <div className="educare-create-school-settings-form-wrap">
                        <div className="educare-master-create-periods-title-item">
                            <div className="educare-master-create-periods-title-top flex justify-between items-center mb-[10px]">
                                <div className="educare-master-create-periods-title">
                                    <h5 className="text-[18px] font-semibold text-headingLight">First Half</h5>
                                </div>
                                <div className="educare-master-create-periods-title-button">
                                    <PrimaryButton
                                        onClick={(e) => {
                                            handleListPopupClick();
                                        }}
                                        type='button'
                                        className="bg-primary text-white px-[10px] pt-[4px] pb-[5px] text-[14px] flex items-center gap-[5px] rounded-[5px]"
                                    >
                                        <i className="icon-PlusCircle"></i>
                                        add period
                                    </PrimaryButton>
                                </div>
                            </div>
                            <div className="educare-default-table maxXs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No.</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classroomPeriods?.length > 0 ?
                                            classroomPeriods.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {convertToLocaleTime(item?.start_time)}
                                                    </td>
                                                    <td>
                                                        {convertToLocaleTime(item?.end_time)}
                                                    </td>
                                                    <td>
                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                            <Tooltip title="Delete" placement="top" arrow>
                                                                <button
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={() => handleDeleteClassroomPeriod(item.id)}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        :
                                            <tr>
                                                <td className="text-center" colSpan={4}>Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreatePeriodFirstHalfPopup
                listPopup={listPopup}
                setListPopup={setListPopup}
                convertToLocaleTime={convertToLocaleTime}
                schoolPeriods={schoolPeriods}
                formData={formData}
            />
        </>
    );
};

export default ClassPeriodFirstHalf;
