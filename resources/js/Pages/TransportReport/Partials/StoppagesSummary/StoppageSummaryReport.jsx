import { useState } from 'react';
import StoppageStudentsList from './StoppageStudentsList';
import StoppageSummaryList from './StoppageSummaryList';

const StoppageSummaryReport = ({
    stopPageData,
    totalStudent,
    studentData,
    stopPageName,
}) => {

    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    return (
        <div className='grid grid-cols-12 gap-5'>
            <div className="col-span-12 lg:col-span-4">
                <StoppageSummaryList
                    stopPageData={stopPageData}
                    totalStudent={totalStudent}
                    setLoading={setLoading}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />
            </div>
            <div className="col-span-12 lg:col-span-8">
                <StoppageStudentsList
                    studentData={studentData}
                    loading={loading}
                    setLoading={setLoading}
                    stopPageName={stopPageName}
                    selectedItem={selectedItem}
                />
            </div>
        </div>
    );
};

export default StoppageSummaryReport;
