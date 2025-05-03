import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import AcademicsExamMobileNavs from "./AcademicsExamMobileNavs";

const AcademicsExamHeaderMenu = ({ title }) => {
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
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Exam Marks
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
                                                    Upload Excel Marks
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("exam.send_exam_marks")}
                                        >
                                            Send Marks
                                        </Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                   Exam Setup
                                                    <i className="icon-CaretDown"></i>
                                                </button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route(
                                                        "subject.assign_to_class_new_design"
                                                    )}
                                                >
                                                    Allocate Class Subjects
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "subject.assign_to_class"
                                                    )}
                                                >
                                                    Allocate Section Subjects
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "student_subject.list"
                                                    )}
                                                >
                                                    Allocate Student Subjects
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_roaster.list"
                                                    )}
                                                >
                                                    Exam Marks Allocation
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_roaster.set_bulk"
                                                    )}
                                                >
                                                    Bulk Exam Marks Allocation
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("exam.remarks")}
                                                >
                                                    Enter Exam Remark
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_attendance.list"
                                                    )}
                                                >
                                                    Enter Exam Attendance
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_date.list"
                                                    )}
                                                >
                                                    Allocate Exam Date
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam_date_range.list"
                                                    )}
                                                >
                                                    Allocate Exam Duration
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam.freeze_marks"
                                                    )}
                                                >
                                                    Freeze Exam Marks
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "result_card.configuration"
                                                    )}
                                                >
                                                    Report Card Templates
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "result_card.exam_grouping"
                                                    )}
                                                >
                                                    Report Card Grouping
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "result_card.publish"
                                                    )}
                                                >
                                                    Report Card Publish
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
                                                   Exam Master
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
                                                    Subject Groups
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_grade.list"
                                                    )}
                                                >
                                                    Grading System
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("exam.add")}
                                                >
                                                    Exam Type
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam.add_remark"
                                                    )}
                                                >
                                                    Exam Remarks
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic.settings"
                                                    )}
                                                >
                                                    Exam Setting & Signatures
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "exam.term_wise"
                                                    )}
                                                >
                                                    Create Termwise Exam
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("academic_report.preview_report_card")}
                                        >
                                            Download Report Card
                                        </Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Exam Reports
                                                    <i className="icon-CaretDown"></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.optional_subject"
                                                    )}
                                                >
                                                    Optional Subject Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.student_subject_report"
                                                    )}
                                                >
                                                    Subject Wise Student Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href="#"
                                                >
                                                    Subject Wise Teacher Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.absent"
                                                    )}
                                                >
                                                    Absent Report
                                                </Dropdown.Link>
                                                {/* <Dropdown.Link
                                                    href={route(
                                                        "academic_report.academic_exam_report"
                                                    )}
                                                >
                                                    Exam Summary
                                                </Dropdown.Link> */}
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.consolidated"
                                                    )}
                                                >
                                                    Overall Performance Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.final_consolidated"
                                                    )}
                                                >
                                                    Final Performance Summary
                                                </Dropdown.Link>
                                                {/* <Dropdown.Link
                                                    href={route(
                                                        "academic_report.preview_report_card"
                                                    )}
                                                >
                                                    Download Report Card
                                                </Dropdown.Link> */}
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.subject_report"
                                                    )}
                                                >
                                                    Subject Performance Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.student_subject_wise_report"
                                                    )}
                                                >
                                                    Student Subject Performance
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.exam_wise_report"
                                                    )}
                                                >
                                                    Exam Performance Summary
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report_graph.weaker"
                                                    )}
                                                >
                                                    Weak Performance Analysis
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report_graph.toppers"
                                                    )}
                                                >
                                                    Top Performance Analysis
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report_graph.subjectwiseoverall"
                                                    )}
                                                >
                                                    Subject-wise Performance Analysis
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report_graph.classwiseoverall"
                                                    )}
                                                >
                                                    Class-wise Performance Analysis
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        "academic_report.exam_wise_report"
                                                    )}
                                                >
                                                    Exam-based Performance Summary
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
            <AcademicsExamMobileNavs
                isMobileNavsShow={isMobileNavsShow}
                onRemoveMobileNavs={() => setIsMobileNavsShow(false)}
            />
            {/* <AcademicsMobileNavs
                isMobileNavsShow={isMobileNavsShow}
                onRemoveMobileNavs={() => setIsMobileNavsShow(false)}
            /> */}
            {/* Mobile Navs Component End */}
        </>
    );
};

export default AcademicsExamHeaderMenu;
