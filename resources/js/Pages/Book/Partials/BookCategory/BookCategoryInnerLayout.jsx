import LibraryHeaderMenus from "@/Components/Partials/Menus/Library/LibraryHeaderMenus";
import React from "react";
import BookCategoryTables from "./BookCategoryTables";

const BookCategoryInnerLayout = ({
    bookCategory,
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
                        <BookCategoryTables
                            bookCategory={bookCategory}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookCategoryInnerLayout;
