import React from "react";
import SetSalePriceForm from "./SetSalePriceForm";
import SetSalePriceRightTable from "./SetSalePriceRightTable";
import { useState } from "react";

const SetSalePriceTables = ({
    productNames,
    product,
    username,
    salePriceProduct,
}) => {
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState(false);

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                        <SetSalePriceForm
                            productNames={productNames}
                            setLoading={setLoading}
                            product={product}
                            editData={editData}
                            setEditData={setEditData}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-8 lg:col-span-9">
                        <SetSalePriceRightTable
                            salePriceProduct={salePriceProduct}
                            product={product}
                            loading={loading}
                            setLoading={setLoading}
                            username={username}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetSalePriceTables;
