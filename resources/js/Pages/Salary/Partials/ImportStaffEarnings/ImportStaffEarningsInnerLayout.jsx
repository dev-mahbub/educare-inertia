import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import ImportSalaryInfo from './ImportSalaryInfo';
import ImportSalaryTableList from './ImportSalaryTableList';

const ImportStaffEarningsInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <SalaryHeaderMenu title="Salary Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <div className='educare-parent-montly-income-area'>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                                <ImportSalaryInfo />
                            </div>
                            <div className="col-span-12 xl:col-span-6 lg:col-span-6 hidden">
                                <ImportSalaryTableList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportStaffEarningsInnerLayout;
