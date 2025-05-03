import { Link } from "@inertiajs/react";
import { useState } from "react";

// Example data structure
const menuData = [
    { label: "Create Student", navsUrl: route('student.create') },
    { label: "Students List", navsUrl: route('student.list') },
    { label: "Search", navsUrl: route('student.search') },
    {
        label: "Report",
        subItems: [
            { label: "Class Summery", navsUrl: route('student.summary') },
            { label: "Custom Download ", navsUrl: route('student_report.custom_download') },
            { label: "Pre-defined Download ", navsUrl: route('student_report.predefined_download') },
            { label: "Parent Income", navsUrl: route('student_report.parent_income') },
            { label: "EWS", navsUrl: route('student_report.ewsreport') },
            { label: "Student Age Report", navsUrl: route('student_report.student_age_report') },
            { label: "Document Report", navsUrl: route('student_report.student_document_report') },
            { label: "Monthly Admission Report", navsUrl: route('student_report.monthly_admission') },
            { label: "Student Promoted Report", navsUrl: route('student_report.student_promoted_report') },
        ],
    },
    {
        label: "Certificate",
        subItems: [
            { label: "Student", navsUrl: route('student_certificate.student_certificate') },
            { label: "Teacher", navsUrl: route('student_certificate.teacher_certificate') },
            { label: "Certificate List", navsUrl: route('student_certificate.certificate_list') },
            { label: "Generated Certificate", navsUrl: route('student_certificate.generated_certificate') },
            { label: "Custom ID CARD", navsUrl: route('student_certificate.custom_id_card') },
        ],
    },
    {
        label: "TC",
        subItems: [
            { label: "Generate TC", navsUrl: route('student_certificate.generate_tc') },
            { label: "TC Summary Report", navsUrl: route('student_certificate.tc_summary_report') },
            { label: "Generated TC Report", navsUrl: route('student_certificate.generated_tc_report') },
        ],
    },
    {
        label: "Inactive",
        subItems: [
            { label: "Make Student Inactive", navsUrl: route('student.make_inactive') },
            { label: "Inactive Student Report", navsUrl: route('student.inactive_list') },
        ],
    },
    { label: "Upgrade", navsUrl: route('student.upgrade') },
    {
        label: "Change Academics",
        subItems: [
            { label: "Change Status", navsUrl: route('student.change_status') },
            { label: "Change Class", navsUrl: route('student.change_class') },
            { label: "Change Section", navsUrl: route('student.change_section') },
            { label: "Change Course Duration", navsUrl: route('student.change_duration') },
        ],
    },
    {
        label: "Update Student",
        subItems: [
            { label: "Update Details", navsUrl: route('student.update_details') },
            { label: "Update Biometric", navsUrl: route('student.update_biometric') },
            { label: "Update User Password", navsUrl: route('student.update_user_password') },
            { label: "Bulk Upload Student Image", navsUrl: route('student.bulk_upload_image') },
        ],
    },
];

const StudentMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
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

export default StudentMobileNavs;
