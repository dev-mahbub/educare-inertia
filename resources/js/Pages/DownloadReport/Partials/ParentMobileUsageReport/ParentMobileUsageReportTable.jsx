import React,{useState} from "react";
import ParentMobileUsageReportRightTable from "./ParentMobileUsageReportRightTable";
import ParentMobileUsageReportLeftTable from "./ParentMobileUsageReportLeftTable";

const ParentMobileUsageReportTable = () => {
    const [openTable, setOpenTable] = useState(false)
    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Parent Mobile Usage Report
                </h5>
            </div>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                    <ParentMobileUsageReportLeftTable setOpenTable={setOpenTable}/>
                </div>
                <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                    <ParentMobileUsageReportRightTable openTable={openTable}/>
                </div>
            </div>
        </>
    );
};

export default ParentMobileUsageReportTable;
