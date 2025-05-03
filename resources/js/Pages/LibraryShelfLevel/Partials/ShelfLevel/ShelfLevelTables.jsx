import React, { useState } from 'react';
import ShelfLevelInfraLavels from './ShelfLevelInfraLavels';
import ShelfLevelTable from './ShelfLevelTable';

const ShelfLevelTables = ({ librarySelfLevels }) => {
    const [selectedItem, setSelectedItem] = useState("");
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                    <ShelfLevelInfraLavels
                        setSelectedItem={setSelectedItem}
                        librarySelfLevels={librarySelfLevels}
                    />
                </div>
                <div className="col-span-12 xl:col-span-8 lg:col-span-9">
                    <ShelfLevelTable
                        selectedItem={selectedItem}
                    />
                </div>
            </div>
        </>
    );
};

export default ShelfLevelTables;
