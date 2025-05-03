import TextInput from "@/Components/TextInput";
import React from "react";

const StudentHeaderSearch = () => {
    return (
        <div className="educare-header-search-bar-main">
            <div className="educare-header-search-bar-left flex items-center gap-2">
                <i className="icon-info text-[18px]"></i>
                <h5 className="text-[18px] font-semibold text-headingLight">
                    Recently viewed
                </h5>
            </div>
            <div className="educare-header-search-bar-right maxXs:flex-grow">
                <div className="educare-header-search-bar-form educare-student-header-search-bar-form">
                    <form action="#">
                        <TextInput type="text" placeHolder="Search... or mobile or student" />
                        <button type="submit">
                            <i className="icon-search-interface-symbol text-[18px] text-heading"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentHeaderSearch;
