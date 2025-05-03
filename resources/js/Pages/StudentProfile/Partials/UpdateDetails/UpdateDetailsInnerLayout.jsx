import React from "react";
import UpdateFilter from "./UpdateFilter";
import UpdateDetailsList from "./UpdateDetailsList";
import StudentHeaderMenus from "@/Components/Partials/Menus/Student/StudentHeaderMenus";

const UpdateDetailsInnerLayout = ({
    students,
    genders,
    houses,
    categories,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>

                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Update Student Details
                        </h5>
                    </div>
                    <UpdateFilter students={students} />
                    <UpdateDetailsList
                        students={students}
                        genders={genders}
                        houses={houses}
                        categories={categories}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateDetailsInnerLayout;
