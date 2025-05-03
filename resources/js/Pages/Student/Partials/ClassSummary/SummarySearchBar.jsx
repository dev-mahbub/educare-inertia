import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/react";
import React from "react";

const SummarySearchBar = () => {
    return (
        <div className="educare-header-search-bar-main">
            <div className="educare-header-search-bar-left flex items-center gap-2">
                <Link
                    href="/student/create"
                    className="educare-primary-btn-md-fill leading-10"
                >
                    <i className="icon-PlusCircle"></i> Add Student
                </Link>
            </div>
            <div className="educare-header-search-bar-right maxXs:flex-grow">
                <div className="educare-header-search-bar-form educare-student-header-search-bar-form">
                    <TextInput
                        id="summary_search"
                        // value={data.search}
                        // onChange={(e) => setData("summary_search", e.target.value)}
                        placeHolder="Search..."
                        type="text"
                        className="block"
                    />
                    <button type="submit">
                        <i className="icon-search-interface-symbol text-[18px] text-heading"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummarySearchBar;
