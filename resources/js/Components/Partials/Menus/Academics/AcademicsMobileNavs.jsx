import { Link } from "@inertiajs/react";
import React, { useState } from "react";

// Example data structure
const menuData = [
    { label: "Syllabus", navsUrl: route('academic_syllabus.list') },
    { label: "Send Exam Marks", navsUrl: route('exam.send_exam_marks') },
    {
        label: "Enter Marks",
        subItems: [
            { label: "Subject Wise", navsUrl: route('exam.enter_marks') },
            { label: "Upload Exam Marks", navsUrl: route('exam.upload_subject_marks') },
        ],
    },
    {
        label: "Academic Actions",
        subItems: [
            { label: "Assign Class Subjects", navsUrl: route('subject.assign_to_class') },
            { label: "Set Exam Roaster", navsUrl: route('exam_roaster.list') },
            { label: "Set Bulk Exam Roaster", navsUrl: route('exam_roaster.set_bulk') },
            { label: "Set Exam Remark", navsUrl: route('exam.remarks') },
            { label: "Set Exam Date", navsUrl: route('exam_date.list') },
            { label: "Set Exam Attendance Date Range", navsUrl: route('exam_date_range.list') },
            { label: "Freeze Marks", navsUrl: route('exam.freeze_marks') },
            { label: "Result Card  Configuration", navsUrl: route('result_card.configuration') },
            { label: "Result Card Exam Grouping", navsUrl: route('result_card.exam_grouping') },
            { label: "Publish Report Card For Parent", navsUrl: route('result_card.publish') },
        ],
    },
    {
        label: "Masters",
        subItems: [
            { label: "Subjects", navsUrl: route('subject.list') },
            { label: "Grading", navsUrl: route('academic_grade.list') },
            { label: "Add Exam", navsUrl: route('exam.add') },
            { label: "Exam Remark", navsUrl: route('exam.add_remark') },
            { label: "Academic Setting", navsUrl: route('academic.settings') },
            { label: "Term Wise Exam", navsUrl: route('exam.term_wise') },
        ],
    },
    {
        label: "Reports",
        subItems: [
            { label: "Optional Subject Report", navsUrl: route('academic_report.optional_subject') },
            { label: "Student Subject Report", navsUrl: route('academic_report.student_subject_report') },
            { label: "Absent Report", navsUrl: route('academic_report.absent') },
            { label: "Academic Exam Report", navsUrl: route('academic_report.academic_exam_report') },
        ],
    },
    {
        label: "Academic Reports",
        subItems: [
            { label: "Consolidated Report", navsUrl: route('academic_report.consolidated') },
            { label: "Final Consolidated Report", navsUrl: route('academic_report.final_consolidated') },
            { label: "PREVIEW : Academic Report Card(1-12)", navsUrl: route('academic_report.preview_report_card') },
            { label: "Subject Wise Report", navsUrl: route('academic_report.subject_report') },
            { label: "Student Subject Wise Report", navsUrl: route('academic_report.student_subject_wise_report') },
            { label: "Exam Wise Report", navsUrl: route('academic_report.exam_wise_report') },
            { label: "Graph-Weakers Report", navsUrl: route('academic_report_graph.weaker') },
            { label: "Graph-Toopers Report", navsUrl: route('academic_report_graph.toppers') },
            { label: "Graph-Subject Wise Overall", navsUrl: route('academic_report_graph.subjectwiseoverall') },
            { label: "Graph-Class Wise Overall", navsUrl: route('academic_report_graph.classwiseoverall') },
        ],
    },
];

const AcademicsMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
    const [openItems, setOpenItems] = useState([]);
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item, isParent) => {
        // Toggle the item's open/closed state
        const isOpen = openItems.includes(item);
        const updatedOpenItems = isOpen
            ? openItems.filter((openItem) => openItem !== item)
            : [item];

        setOpenItems(updatedOpenItems);
        setActiveItem(item);

        // Close all other open menus
        const closeOtherMenus = menuData
            .filter((menuItem) => menuItem !== item)
            .flatMap((menuItem) => menuItem.subItems || []);

        setOpenItems((prevOpenItems) => [
            ...prevOpenItems.filter((openItem) => !closeOtherMenus.includes(openItem)),
            ...updatedOpenItems,
        ]);
    };


    const renderSubMenu = (subItems, isParent) => {
        if (subItems && subItems.length > 0) {
            return (
                <ul>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <Link href={subItem.navsUrl}
                                className={`${subItem === activeItem
                                    ? "active-element"
                                    : ""
                                    } ${subItem === activeItem && isParent
                                        ? "child-parent"
                                        : ""
                                    } ${subItem.subItems ? "shelf-single-active" : ""}`}
                                onClick={() =>
                                    handleItemClick(subItem, isParent)
                                }
                            >
                                {subItem.label}
                                {subItem.subItems && (
                                    <>
                                        {openItems.includes(subItem) ? (
                                            <span className="icon-MinusCircle"></span>
                                        ) : (
                                            <span className="icon-PlusCircle"></span>
                                        )}
                                    </>
                                )}
                            </Link>
                            {openItems.includes(subItem) &&
                                renderSubMenu(subItem.subItems, true)}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <>
            <div className={`educare-sidebar-navs ${isMobileNavsShow ? 'active' : ''}`}>
                <ul className="educare-shelf">
                    {menuData.map((menuItem, index) => (
                        <li
                            key={index}
                            className={menuItem === activeItem ? "active-element" : ""}
                        >
                            {menuItem.subItems ? (
                                <button
                                    type="button"
                                    className={`${menuItem === activeItem ? "active-element" : ""
                                        } ${menuItem.subItems ? "shelf-single-active" : ""}`}
                                    onClick={() => handleItemClick(menuItem, false)}
                                >
                                    {menuItem.label}
                                    {menuItem.subItems && (
                                        <>
                                            {openItems.includes(menuItem) ? (
                                                <span className="icon-MinusCircle"></span>
                                            ) : (
                                                <span className="icon-PlusCircle"></span>
                                            )}
                                        </>
                                    )}
                                </button>
                            ) : (
                                <Link href={menuItem.navsUrl} className="shelf-parent-url">
                                    {menuItem.label}
                                </Link>
                            )}
                            {openItems.includes(menuItem) &&
                                renderSubMenu(menuItem.subItems, false)}
                        </li>
                    ))}
                </ul>


                {/* <div className="hidden">
                    <span onClick={onRemoveMobileNavs}>Cancel</span>
                </div> */}
            </div>

            {/* <div className={`educare-sidebar-navs-overlay ${isMobileNavsShow ? 'active' : ''}`} onClick={onRemoveMobileNavs}></div> */}
        </>
    );
};

export default AcademicsMobileNavs;
