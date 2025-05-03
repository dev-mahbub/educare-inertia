import React from "react";
import PurchaseTables from "./PurchaseTables";
import LibraryHeaderMenus from "@/Components/Partials/Menus/Library/LibraryHeaderMenus";

const PurchaseInnerLayout = ({
    bookTypes,
    paymentMode,
    libraryVendor,
    bankNames,
    bookCategory,
    classNames,
    subjects,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LibraryHeaderMenus title="Library Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <PurchaseTables
                            bookTypes={bookTypes}
                            paymentMode={paymentMode}
                            libraryVendor={libraryVendor}
                            bankNames={bankNames}
                            bookCategory={bookCategory}
                            classNames={classNames}
                            subjects={subjects}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchaseInnerLayout;
