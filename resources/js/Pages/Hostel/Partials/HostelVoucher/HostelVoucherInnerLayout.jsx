import HostelHeaderMenus from "@/Components/Partials/Menus/Hostel/HostelHeaderMenus";
import React from "react";
import HostelVoucherTableAndForm from "./HostelVoucherTableAndForm";

const HostelVoucherInnerLayout = ({
    hostelVoucherSetting,
    hostelVoucher,
    installmentNo,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <HostelHeaderMenus title="HOSTEL MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <HostelVoucherTableAndForm
                            hostelVoucherSetting={hostelVoucherSetting}
                            hostelVoucher={hostelVoucher}
                            installmentNo={installmentNo}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HostelVoucherInnerLayout;
