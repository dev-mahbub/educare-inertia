import { useState } from "react";
import AllocateProductLocationLeftTable from "./AllocateProductLocationLeftTable";
import AllocateProductLocationRightTable from "./AllocateProductLocationRightTable";

const AllocateProductLocationTabels = ({
    products,
    infraLevels
}) => {

    const [mode, setMode] = useState('');
    const [alocateItem, setAlocateItem] = useState({});

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                        <AllocateProductLocationLeftTable
                            setAlocateItem={setAlocateItem}
                            products={products}
                            setMode={setMode}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                        <AllocateProductLocationRightTable
                            alocateItem={alocateItem}
                            mode={mode}
                            infraLevels={infraLevels}
                            setAlocateItem={setAlocateItem}
                            setMode={setMode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllocateProductLocationTabels;
