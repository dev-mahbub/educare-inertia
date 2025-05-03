import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import AcademicsMobileNavs from "./AcademicsMobileNavs";
import { useState } from "react";

const AcademicsHeaderMenu = ({ title }) => {
    {
        /* Toggle Mobile Navs function Start */
    }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {
        /* Toggle Mobile Navs function End */
    }
    return (
        <>
            <div className="educare-mis-report-menu-area">
                <div className="educare-mis-report-menu">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className="icon-cap"></i>
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                                <ul>
                                    <li>
                                        <Link
                                            href={route(
                                                "academic_syllabus.list"
                                            )}
                                        >
                                            Syllabus
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("exam.send_exam_marks")}
                                        >
                                            Send Exam Marks
                                        </Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Enter Marks
                                                    <i className="icon-CaretDown"></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam.enter_marks"
                                                    )}
                                                >
                                                    Subject Wise
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam.upload_subject_marks"
                                                    )}
                                                >
                                                    Upload Exam Marks
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Academic Actions
                                                    <i className="icon-CaretDown"></i>
                                                </button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route(
                                                        "subject.assign_to_class_new_design"
                                                    )}
                                                >
                                                    Assign Class Subjects
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "subject.assign_to_class"
                                                    )}
                                                >
                                                    Assign Section Subjects
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "student_subject.list"
                                                    )}
                                                >
                                                    Assign Student Subjects
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_roaster.list"
                                                    )}
                                                >
                                                    Set Exam Roaster
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_roaster.set_bulk"
                                                    )}
                                                >
                                                    Set Bulk Exam Roaster
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("exam.remarks")}
                                                >
                                                    Set Exam Remark
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_attendance.list"
                                                    )}
                                                >
                                                    Set Exam Attendance
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_date.list"
                                                    )}
                                                >
                                                    Set Exam Date
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_date_range.list"
                                                    )}
                                                >
                                                    Set Exam Attendance Date
                                                    Range
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam.freeze_marks"
                                                    )}
                                                >
                                                    Freeze Marks
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "result_card.configuration"
                                                    )}
                                                >
                                                    Result Card Configuration
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "result_card.exam_grouping"
                                                    )}
                                                >
                                                    Result Card Exam Grouping
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "result_card.publish"
                                                    )}
                                                >
                                                    Publish Report Card For
                                                    Parent
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Masters
                                                    <i className="icon-CaretDown"></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("subject.list")}
                                                >
                                                    Subjects
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "subject_group.list"
                                                    )}
                                                >
                                                    Subject Group
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_grade.list"
                                                    )}
                                                >
                                                    Grading
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("exam.add")}
                                                >
                                                    Add Exam
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam.add_remark"
                                                    )}
                                                >
                                                    Exam Remark
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic.settings"
                                                    )}
                                                >
                                                    Academic Setting
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam.term_wise"
                                                    )}
                                                >
                                                    Term Wise Exam
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Reports
                                                    <i className="icon-CaretDown"></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.optional_subject"
                                                    )}
                                                >
                                                    Optional Subject Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.student_subject_report"
                                                    )}
                                                >
                                                    Student Subject Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.absent"
                                                    )}
                                                >
                                                    Absent Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.academic_exam_report"
                                                    )}
                                                >
                                                    Academic Exam Report
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Academic Reports
                                                    <i className="icon-CaretDown"></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.consolidated"
                                                    )}
                                                >
                                                    Consolidated Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.final_consolidated"
                                                    )}
                                                >
                                                    Final Consolidated Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.preview_report_card"
                                                    )}
                                                >
                                                    PREVIEW : Academic Report
                                                    Card(1-12)
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.subject_report"
                                                    )}
                                                >
                                                    Subject Wise Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.student_subject_wise_report"
                                                    )}
                                                >
                                                    Student Subject Wise Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.exam_wise_report"
                                                    )}
                                                >
                                                    Exam Wise Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report_graph.weaker"
                                                    )}
                                                >
                                                    Graph-Weakers Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report_graph.toppers"
                                                    )}
                                                >
                                                    Graph-Toopers Report
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report_graph.subjectwiseoverall"
                                                    )}
                                                >
                                                    Graph-Subject Wise Overall
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report_graph.classwiseoverall"
                                                    )}
                                                >
                                                    Graph-Class Wise Overall
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </div>
                            {/* Mobile Navs Activation Start */}
                            <div className="educare-sidebar-navs-btn sm:hidden inline-block">
                                <button
                                    type="button"
                                    onClick={toggleMobileNavsShow}
                                >
                                    Menus <i className="icon-CaretDown"></i>
                                </button>
                            </div>
                            {/* Mobile Navs Activation End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Navs Component Start */}
            <AcademicsMobileNavs
                isMobileNavsShow={isMobileNavsShow}
                onRemoveMobileNavs={() => setIsMobileNavsShow(false)}
            />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default AcademicsHeaderMenu;
