import React from "react";
import BookSearchByLocationInfraLevels from "./BookSearchByLocationInfraLevels";
import BookSearchByLocationTable from "./BookSearchByLocationTable";

const BookSearchByLocationTables = () => {
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                    <BookSearchByLocationInfraLevels />
                </div>
                <div className="col-span-12 xl:col-span-8 lg:col-span-9">
                    <BookSearchByLocationTable />
                </div>
            </div>
        </>
    );
};

export default BookSearchByLocationTables;
