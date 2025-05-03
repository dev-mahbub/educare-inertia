import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ManageChequeList from './ManageChequeList';
import ManageChequesFilter from './ManageChequesFilter';

const ManageChequeInnerLayout = ({ chequeReports = [], classrooms = [] }) => {

    const [filteredChequeReports, setFilteredChequeReports] = useState([]);
    const [totalCheque, setTotalCheque] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFilteredChequeReports(chequeReports);
        setLoading(false);
    }, [chequeReports]);

    useEffect(() => {
        setTotalCheque(filteredChequeReports?.length);
    },[filteredChequeReports]);


    // filter cheque reports start
        const filterChequeReports = () => {
            setLoading(false);

            router.post(route('cheque.manage_cheque'), formData);
        }
    // filter cheque reports end


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ManageChequesFilter
                        classrooms={classrooms}
                        totalCheque={totalCheque}
                        setLoading={setLoading}
                        setFormData={setFormData}
                        filterChequeReports={filterChequeReports}
                    />
                    <ManageChequeList
                        chequeReports={filteredChequeReports}
                        loading={loading}
                        filterChequeReports={filterChequeReports}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageChequeInnerLayout;
