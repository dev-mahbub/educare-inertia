import { Link } from "@inertiajs/react";
import React, { useState } from "react";

// Example data structure
const menuData = [
    {
        label: "Exam Marks",
        subItems: [
            { label: "Subject Wise", navsUrl: route('exam.enter_marks') },
            { label: "Upload Excel Marks", navsUrl: route('exam.upload_subject_marks') },
        ],
    },
    { label: "Send Marks", navsUrl: route('exam.send_exam_marks') },
    {
        label: "Exam Setup",
        subItems: [
            { label: "Allocate Class Subjects", navsUrl: route('subject.assign_to_class_new_design') },
            { label: "Allocate Section Subjects", navsUrl: route('subject.assign_to_class') },
            { label: "Allocate Student Subjects", navsUrl: route('student_subject.list') },
            { label: "Exam Marks Allocation", navsUrl: route('exam_roaster.list') },
            { label: "Bulk Exam Marks Allocation", navsUrl: route('exam_roaster.set_bulk') },
            { label: "Enter Exam Remark", navsUrl: route('exam.remarks') },
            { label: "Enter Exam Attendance", navsUrl: route('exam_attendance.list') },
            { label: "Allocate Exam Date", navsUrl: route('exam_date.list') },
            { label: "Allocate Exam Duration", navsUrl: route('exam_date_range.list') },
            { label: "Freeze Exam Marks", navsUrl: route('exam.freeze_marks') },
            { label: "Report Card Templates", navsUrl: route('result_card.configuration') },
            { label: "Report Card Grouping", navsUrl: route('result_card.exam_grouping') },
            { label: "Report Card Publish", navsUrl: route('result_card.publish') },
        ],
    },
    {
        label: "Exam Master",
        subItems: [
            { label: "Subjects", navsUrl: route('subject.list') },
            { label: "Subject Groups", navsUrl: route('subject_group.list') },
            { label: "Grading System", navsUrl: route('academic_grade.list') },
            { label: "Exam Type", navsUrl: route('exam.add') },
            { label: "Exam Remarks", navsUrl: route('exam.add_remark') },
            { label: "Exam Setting & Signatures", navsUrl: route('academic.settings') },
            { label: "Create Termwise Exam", navsUrl: route('exam.term_wise') },
        ],
    },
    { label: "Download Report Card", navsUrl: route('academic_report.preview_report_card') },
    {
        label: "Exam Reports",
        subItems: [
            { label: "Optional Subject Summary", navsUrl: route('academic_report.optional_subject') },
            { label: "Subject Wise Student Summary", navsUrl: route('academic_report.student_subject_report') },
            { label: "Subject Wise Teacher Summary", navsUrl: '#' },
            { label: "Absent Report", navsUrl: route('academic_report.absent') },
            // { label: "Exam Summary", navsUrl: route('academic_report.academic_exam_report') },
            { label: "Overall Performance Summary", navsUrl: route('academic_report.consolidated') },
            { label: "Final Performance Summary", navsUrl: route('academic_report.final_consolidated') },
            // { label: "Download Report Card", navsUrl: route('academic_report.preview_report_card') },
            { label: "Subject Performance Summary", navsUrl: route('academic_report.subject_report') },
            { label: "Student Subject Performance", navsUrl: route('academic_report.student_subject_wise_report') },
            { label: "Exam Performance Summary", navsUrl: route('academic_report.exam_wise_report') },
            { label: "Weak Performance Analysis", navsUrl: route('academic_report_graph.weaker') },
            { label: "Top Performance Analysis", navsUrl: route('academic_report_graph.toppers') },
            { label: "Subject-wise Performance Analysis", navsUrl: route('academic_report_graph.subjectwiseoverall') },
            { label: "Class-wise Performance Analysis", navsUrl: route('academic_report_graph.classwiseoverall') },
            { label: "Exam-based Performance Summary", navsUrl: route('academic_report.exam_wise_report') },
        ],
    }
];

const AcademicsExamMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
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

export default AcademicsExamMobileNavs;
