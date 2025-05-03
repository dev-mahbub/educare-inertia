import React, { useState } from "react";
import VendorsLeftForm from "./VendorsLeftForm";
import VendorsRightTable from "./VendorsRightTable";

const VendorsTables = ({
    libraryVendor,
}) => {
    const [vendor, setVendor] = useState({})
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <VendorsLeftForm vendor={vendor} />
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <VendorsRightTable
                        setVendor={setVendor}
                        libraryVendor={libraryVendor}
                    />
                </div>
            </div>
        </>
    );
};

export default VendorsTables;
