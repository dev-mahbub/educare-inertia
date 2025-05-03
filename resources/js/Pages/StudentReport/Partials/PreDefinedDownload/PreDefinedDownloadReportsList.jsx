import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PreDefinedDownloadReportsList = ({
    data
}) => {

    // handle download student report pdf start
    const handleDownloadStudentReportPdf = (url, orientation = 'L') => {
        let params = {};

        if(data?.class_section_type == 'class_type') {
            params = {
                class_section_type: data?.class_section_type,
                class_name_ids: JSON.stringify(data?.class_name_ids ?? []),
                status: data?.status ?? "",
                orientation: orientation
            }
        }
        else if(data?.class_section_type == 'section_type') {
            params = {
                class_section_type: data?.class_section_type,
                classroom_ids: JSON.stringify(data?.classroom_ids ?? []),
                status: data?.status ?? "",
                orientation: orientation
            }
        }

        if (data?.class_name_ids?.length == 0 && data?.classroom_ids?.length == 0) {
            toast.error("Please select at least one class.", {
                position: 'top-right',
                autoClose: 1500,
            });

           return;
        }

        const updatedUrl = new URL(url);

        Object.keys(params).forEach(key => {
            updatedUrl.searchParams.append(key, params[key])
        });

        window.open(updatedUrl);
    }
    // handle download student report pdf end


    // handle download student report pdf start
    const handleDownloadStudentSummaryReportPdf = (url, orientation = 'L') => {
        const params = {
            status: data?.status ?? "",
            orientation: orientation
        }

        const updatedUrl = new URL(url);

        Object.keys(params).forEach(key => {
            updatedUrl.searchParams.append(key, params[key])
        });

        window.open(updatedUrl);
    }
    // handle download student report pdf end


    // handle download student report excel start
    const handleDownloadStudentReportExcel = (url) => {
        let params = {};

        if(data?.class_section_type == 'class_type') {
            params = {
                class_section_type: data?.class_section_type,
                class_name_ids: JSON.stringify(data?.class_name_ids ?? []),
                status: data?.status ?? "",
            }
        }
        else if(data?.class_section_type == 'section_type') {
            params = {
                class_section_type: data?.class_section_type,
                classroom_ids: JSON.stringify(data?.classroom_ids ?? []),
                status: data?.status ?? "",
            }
        }

        if (data?.class_name_ids?.length == 0 && data?.classroom_ids?.length == 0) {
            toast.error("Please select at least one class.", {
                position: 'top-right',
                autoClose: 1500,
            });

           return;
        }

        const updatedUrl = new URL(url);

        Object.keys(params).forEach(key => {
            updatedUrl.searchParams.append(key, params[key])
        });

        window.location.href = updatedUrl;
    }
    // handle download student report excel end


    // handle download student report excel start
    const handleDownloadStudentSummaryReportExcel = (url) => {
        const params = {
                status: data?.status ?? "",
            }

        const updatedUrl = new URL(url);

        Object.keys(params).forEach(key => {
            updatedUrl.searchParams.append(key, params[key])
        });

        window.location.href = updatedUrl;
    }
    // handle download student report excel end


    return (
        <>
            <div className='grid grid-cols-12 gap-5'>
                <div className="col-span-12 lg:col-span-6">
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={2}>
                                            <i className="icon-ListBullets mr-1"></i>
                                            Student Reports
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>General Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_all_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_all_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_all_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DOB & DOA Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_birth_date_wise_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_birth_date_wise_report'), "P")
                                                                }}pdf_student
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_birth_date_wise_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Gender Wise Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_gender_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_gender_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_gender_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Contact Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_contact_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_contact_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_contact_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Address Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_address_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_address_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_address_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_email_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_email_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_email_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Religion Wise Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_religion_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_religion_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_religion_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Category Wise Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_category_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_category_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_category_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>InActive Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_inactive_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_inactive_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.inactive_student_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sibiling Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_sibling_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_sibling_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_sibling_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>House Wise Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_house_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_house_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_house_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>New Student Report(New Admissions)</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.new_student_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.new_student_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.new_student_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Old Student Report(Old Admissions)</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.old_student_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.old_student_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.old_student_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Employment Category Wise Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_employment_category_wise_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_employment_category_wise_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_employment_category_wise_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Dayscholar/Boarding Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_boarding_type_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_boarding_type_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_boarding_type_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Student Document Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_document_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_document_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_document_wise_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Student With Transport</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_with_transport_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_with_transport_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_with_transport_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Student Without Transport</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_without_transport_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportPdf(route('pdf_student.student_without_transport_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentReportExcel(route('export_excel.student_without_transport_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6">
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={2}>
                                            <i className="icon-ListBullets mr-1"></i>
                                            Summary Reports
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gender Wise Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_gender_wise_summary_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_gender_wise_summary_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportExcel(route('export_excel.student_gender_wise_summary_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Religion Wise Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_religion_wise_summary_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_religion_wise_summary_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportExcel(route('export_excel.student_religion_wise_summary_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Category Wise Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_category_wise_summary_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_category_wise_summary_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportExcel(route('export_excel.student_category_wise_summary_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>InActive Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <a
                                                                target="_blank"
                                                                className="educare-warning-btn-md-fill"
                                                                href={route('pdf_student.student_inactive_summary_report', { orientation: "L" })}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </a>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <a
                                                                target="_blank"
                                                                className="educare-warning-btn-md-fill"
                                                                href={route('pdf_student.student_inactive_summary_report', { orientation: "P" })}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </a>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <a
                                                                // target="_blank"
                                                                className="educare-success-btn-md-fill"
                                                                href={route('export_excel.student_inactive_summary_report')}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </a>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Old / New Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_old_new_summary_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_old_new_summary_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportExcel(route('export_excel.student_old_new_summary_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Employment Category Wise Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_employment_category_wise_summary_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_employment_category_wise_summary_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Dayscholar/Hosteler Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_boarding_wise_summary_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_boarding_wise_summary_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Excel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-success-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportExcel(route('export_excel.student_boarding_wise_summary_report'))
                                                                }}
                                                            >
                                                                <i className="icon-FileX"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Student Document Report</td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_document_wise_summary_report'), "L")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Download Pdf"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type='button'
                                                                className="educare-warning-btn-md-fill"
                                                                onClick={() => {
                                                                    handleDownloadStudentSummaryReportPdf(route('pdf_student.student_document_wise_summary_report'), "P")
                                                                }}
                                                            >
                                                                <i className="icon-FilePdf"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PreDefinedDownloadReportsList;
