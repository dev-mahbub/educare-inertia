import { Tooltip } from '@mui/material';

const InstallmentWiseFeeCollectionTopbar = ({
    params,
    feeCollectionSummary
}) => {
    return (
        <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
            <div className="educare-card-title mr-auto pb-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Installment wise Fee Collection
                </h5>
            </div>

            {(Object.keys(feeCollectionSummary)?.length > 0 && Object.keys(feeCollectionSummary?.installment_wise_data)?.length > 0) &&
                <div className="educare-filter-action-btn inline-flex gap-2">
                    <div>
                        <Tooltip
                            title="Download Pdf"
                            placement="top"
                            arrow
                        >
                            <a
                                target="_blank"
                                href={route('pdf_fee_demand_slip.installment_wise_fee_collection_report', params)}
                                className="educare-warning-btn-md-fill"
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
                        >
                            <a
                                target="_blank"
                                href={route('export_excel.installment_wise_fee_collection_report', params)}
                                className="educare-success-btn-md-fill"
                            >
                                <i className="icon-FileX"></i>
                            </a>
                        </Tooltip>
                    </div>
                </div>
            }
        </div>
    );
};

export default InstallmentWiseFeeCollectionTopbar;
