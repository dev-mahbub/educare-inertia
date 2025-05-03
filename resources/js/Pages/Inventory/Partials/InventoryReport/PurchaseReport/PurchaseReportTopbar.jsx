import { Tooltip } from '@mui/material';

const PurchaseReportTopbar = ({
    formData,
    purchaseReportLength
}) => {

    const CommonHeaderFilterTopData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={CommonHeaderFilterTopData} className='mb-2.5'>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Purchase Register
                        </h5>
                    </div>

                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}
                        {purchaseReportLength > 0 &&
                            <div>
                                <Tooltip
                                    title="Download PDF"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        href={route('pdf_account.purchase_report', formData)}
                                        target='_blank'
                                        className="educare-warning-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }

                        {purchaseReportLength > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        href={route('export_excel.inventory.purchase_report', formData)}
                                        target='_blank'
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }
                        {/* Replace changable buttons */}
                    </div>
                </div>
            </form>
            <div className='mb-5'></div>
        </>
    );
};

export default PurchaseReportTopbar;
