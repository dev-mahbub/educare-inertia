import CashBookReport from './CashBookReport';
import CashBookSummaryReport from './CashBookSummaryReport';

const CashBookReportForm = ({
    cashBookReport,
    cashBookSummary
}) => {
    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                    <CashBookReport
                        cashBookReport={cashBookReport}
                    />
                </div>
                <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                    <CashBookSummaryReport
                        cashBookSummary={cashBookSummary}
                    />
                </div>
            </div>
        </div>
    );
};

export default CashBookReportForm;
