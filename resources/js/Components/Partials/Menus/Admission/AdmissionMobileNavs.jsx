import { Link } from "@inertiajs/react";
import { useState } from "react";

// Example data structure
const menuData = [

    { label: "Social Enquiry generation", navsUrl: "#" },
    {
        label: "Admission Enquiry",
        subItems: [
            { label: "Add Admission Enquiry", navsUrl: route('admission_enquery_reg.enquiry_form') },
            { label: "Admission Enquiry Report", navsUrl: '/admission/registration/enquiry/report' },
            // { label: "Activity Date Wise Report", navsUrl: '/admission/registration/enquiry/activity-report-datewise' },
            // { label: "Follow Date Wise Report", navsUrl: '/admission/registration/enquiry/follow-report-datewise' },
            { label: "Admission Status Summary", navsUrl: '/admission/registration/enquiry/status-summary' },
            { label: "Admission Class Wise Summary", navsUrl: '/admission/registration/enquiry/class-wise-summary' },
            { label: "Registration & Source By Report", navsUrl: '/admission/registration/enquiry/registration-and-sourcebyreport' },

        ],
    },
    {
        label: "Exam",
        subItems: [
            { label: "Set Admission Exam Date", navsUrl: route('admission_exam.set_exam_date') },
            { label: "Exam Change Status", navsUrl: route('admission_exam.change_selected_status') },
            { label: "Admission Exam Summary", navsUrl: route('admission_exam.exam_summary') },
            // { label: "Send Message", navsUrl: route('admission_exam.send_student_message') },
            { label: "Enter Registration Subject Marks", navsUrl: route('admission_exam.registration_marks_entry') },
            { label: "Registration Exam Report", navsUrl: route('admission_exam.registration_exam_report') },

        ],
    },
    { label: "New Registration", navsUrl: route('admission_enquery_reg.create_registration') },
    { label: "Registrations", navsUrl: route('admission.registration_list') },
    {
        label: "Report",
        subItems: [
            { label: "Registration Report ", navsUrl: route('admission_registration_report.registration_report') },
            { label: "Registration Daily Collection ", navsUrl: route('admission_registration_report.daily_collection') },
            { label: "Registration Monthly Collection ", navsUrl: route('admission_registration_report.monthly_collection') },
            { label: "Deleted Registration ", navsUrl: route('admission_registration_report.deleted') },
            // { label: "Due Registration Amount ", navsUrl: route('admission_registration_report.due_Amount') },
            { label: "Daily Admission Report ", navsUrl: route('admission_registration_report.daily_admission') },

        ],
    },
    {
        label: "Masters",
        subItems: [
            { label: "Start Admission Process ", navsUrl: '/admission/process' },
            { label: "Admission Source ", navsUrl: '/admission/enquirysource' },
            { label: "Admission Enquiry Status ", navsUrl: '/admission/enquirystatus' },
            { label: "Student Type Category ", navsUrl: '/admission/studenttype' },
            { label: "Setting ", navsUrl: '/admission/registration/setting' },

        ],
    },


];

const AdmissionMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
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

export default AdmissionMobileNavs;
