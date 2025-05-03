import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import AdmissionExamSummaryFilter from "./AdmissionExamSummaryFilter";

export default function AdmissionExamSummaryList({
    boarding,
    admissionExamSummary,
    registrations
}) {

    const [selectedStatus, setSelectedStatus] = useState("");

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search: "",
        boarding_type: "",
        from_date: "",
        to_date: "",
    });

    const filteredRegistrationData = useMemo(() => {
        const filterText = data?.search?.trim()?.toLowerCase();

        return registrations?.filter((item) => {
            const studentName = (item?.first_name + " " + item?.middle_name + " " + item?.last_name)?.toLowerCase();
            const fatherName = (item?.father_first_name + " " + item?.father_middle_name + " " + item?.father_last_name)?.toLowerCase();
            const fatherMobile = item?.father_mobile?.toLowerCase();
            const registrationNo = item?.registration_no?.toLowerCase();
            const registrationDate = item?.registration_date?.toLowerCase();
            const registrationStatus = (item?.registration_status)?.toLowerCase();
            const classTtile = (item?.class_title)?.toLowerCase();

            return (
                studentName?.includes(filterText) ||
                fatherName?.includes(filterText) ||
                fatherMobile?.includes(filterText) ||
                registrationNo?.includes(filterText) ||
                registrationDate?.includes(filterText) ||
                registrationStatus?.includes(filterText) ||
                classTtile?.includes(filterText)
            );
        });
    }, [registrations, data?.search]);

    // handle filter data start
    const handleFilterAdmissionExamSummaryData = (status) => {
        setSelectedStatus(status);

        const form_data = {
            exam_status: status,
            search: data?.search,
            boarding_type: data?.boarding_type,
            from_date: data?.from_date,
            to_date: data?.to_date,
        }

        router.post(route('admission_exam.exam_summary'), form_data);
    }
    // handle filter data end

    // handle download exam summary report pdf start
    const handleDownloadExamSummaryReportPdf = (e) => {
        e.preventDefault();

        const params = {
            exam_status: selectedStatus,
            boarding_type: data?.boarding_type ?? "",
            from_date: data?.from_date ?? "",
            to_date: data?.to_date ?? "",
        }

        const url = route('admission_pdf_generator.exam_summary_report', params);

        window.open(url);
    }
    // handle download exam summary report pdf end

    // handle download exam summary report excel start
    const handleDownloadExamSummaryReportExcel = (e) => {
        e.preventDefault();

        const params = {
            exam_status: selectedStatus,
            boarding_type: data?.boarding_type ?? "",
            from_date: data?.from_date ?? "",
            to_date: data?.to_date ?? "",
        }

        const url = route('export_excel.admission_exam_summary', params);

        window.open(url);
    }
    // handle download exam summary report excel end


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="xxxl:col-span-3  col-span-12">
                        <div className="educare-card-title pb-none mt-2">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Exam Summary
                            </h5>
                        </div>
                        <div className="educare-classroom-table-wrapper mt-3">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Student Count</th>
                                            <th>Exam Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.values(admissionExamSummary)?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Tooltip
                                                        title="Click"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button onClick={() => handleFilterAdmissionExamSummaryData(item.exam_status)}>
                                                            <h5 className=" text-blue-600">
                                                                {item?.student_count}
                                                            </h5>
                                                        </button>
                                                    </Tooltip>
                                                </td>
                                                <td>
                                                    <span className={`badge ${item?.exam_status == 'Selected' ? 'success' : (item?.exam_status == 'Not Selected' ? 'danger' : 'warning')}`}>
                                                        {item.exam_status ?? "Pending"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="xxxl:col-span-9 col-span-12">
                        <div className="flex justify-between items-end mb-2.5">
                            <div className="educare-card-title pb-none">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    {selectedStatus} Student
                                </h5>
                            </div>
                            <div className="flex gap-2 educare-header-filtar-bar-action educare-filter-action-btn">
                                {Object.keys(filteredRegistrationData)?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Pdf"
                                            placement="top"
                                            arrow

                                            as="button"
                                        >
                                            <button
                                                className="educare-warning-btn-md-fill"
                                                onClick={(e) => {
                                                    handleDownloadExamSummaryReportPdf(e)
                                                }}
                                            >
                                                <i className="icon-FilePdf"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                }

                                {Object.keys(filteredRegistrationData)?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                className="educare-success-btn-md-fill"
                                                onClick={(e) => {
                                                    handleDownloadExamSummaryReportExcel(e)
                                                }}
                                            >
                                                <i className="icon-FileX"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                }
                            </div>
                        </div>
                        <AdmissionExamSummaryFilter
                            selectedStatus={selectedStatus}
                            boarding = {boarding}
                            registrations={filteredRegistrationData}
                            data={data}
                            setData={setData}
                            reset={reset}
                        />
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>
                                                Regis.No.
                                            </th>
                                            <th>
                                                Student Name
                                            </th>
                                            <th>
                                                Class
                                            </th>
                                            <th>
                                                Father's Name
                                            </th>
                                            <th>
                                                Mobile
                                            </th>
                                            <th>
                                                Reg Date
                                            </th>
                                            {selectedStatus == "Selected" &&
                                                <th>
                                                    Actiion
                                                </th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Object.keys(filteredRegistrationData)?.length > 0 ?
                                        Object.values(filteredRegistrationData)?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {(item?.registration_status == 'Registration Rejected' || item?.registration_status == 'Cancelled') &&
                                                        <span className="badge danger"> {item?.registration_status}</span>
                                                    }

                                                    {item?.registration_status == 'New' &&
                                                        <span className="badge warning"> {item?.registration_status}</span>
                                                    }

                                                    {item?.registration_status == 'Admission Taken' &&
                                                        <span className="badge info"> {item?.registration_status}</span>
                                                    }

                                                    {item?.registration_status == 'On Hold' &&
                                                        <span className="badge primary"> {item?.registration_status}</span>
                                                    }

                                                    {/* <span className={`badge ${item?.registration_status == 'Registration Rejected' || item?.registration_status == 'Cancelled' ? 'danger' : 'success'}`}> {item?.registration_status}</span> */}
                                                </td>
                                                <td>{item.registration_no}</td>
                                                <td>{item.first_name} {item.middle_name} {item.last_name}</td>
                                                <td>{item.class_title}</td>
                                                <td>{item.father_first_name} {item.father_middle_name} {item.father_last_name}</td>
                                                <td>{item.father_mobile}</td>
                                                <td>{item.registration_date}</td>

                                                {selectedStatus == "Selected" &&
                                                    <td>
                                                        <Tooltip
                                                            title="Registration Form"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <a
                                                                href={route('admission_pdf_generator.registration_form', item?.id)}
                                                                target="_blank"
                                                                className="educare-warning-btn-md-fill"
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </a>
                                                        </Tooltip>

                                                        {item?.registration_status == 'New' &&
                                                            <Tooltip
                                                                title="Start Admission Proceess"
                                                                placement="top"
                                                                arrow
                                                                as="button"
                                                            >
                                                                <a
                                                                    href={route('admission_registration.add_admission', item?.id)}
                                                                    target="_blank"
                                                                    className="educare-secondary-btn-md-fill"
                                                                >
                                                                    <i className="icon-FileText"></i>
                                                                </a>
                                                            </Tooltip>
                                                        }
                                                    </td>
                                                }
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="8"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
