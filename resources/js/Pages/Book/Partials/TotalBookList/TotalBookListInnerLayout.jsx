import React, { useState } from "react";
import TotalBookListFilter from "./TotalBookListFilter";
import TotalBookListTable from "./TotalBookListTable";
import LibraryHeaderMenus from "@/Components/Partials/Menus/Library/LibraryHeaderMenus";

const TotalBookListInnerLayout = ({
    totalBookList,
    bookTypeStatus,
    bookTypeUser,
    classrooms,
    students,
    teacherData,
    classNameData,
    bookCategory,
    bookType,
}) => {
    const [loading, setLoading] = useState(false);
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
                        <TotalBookListFilter
                            totalBookCount={totalBookList?.length}
                            classNameData={classNameData}
                            bookCategory={bookCategory}
                            bookType={bookType}
                            bookTypeStatus={bookTypeStatus}
                            setLoading={setLoading}
                        />
                        <TotalBookListTable
                            totalBookList={totalBookList}
                            bookTypeStatus={bookTypeStatus}
                            bookTypeUser={bookTypeUser}
                            classrooms={classrooms}
                            students={students}
                            teacherData={teacherData}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TotalBookListInnerLayout;
