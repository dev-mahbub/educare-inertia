
import React, { useState } from 'react';
import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import DueRegistrationAmountFilter from './DueRegistrationAmountFilter';
import DueRegistrationAmountTable from './DueRegistrationAmountTable';

const DueRegistrationAmountInnerLayout = ({ academicYear }) => {
    const [enquiryRegAmountData, setEnquiryRegAmountData] = useState([]);
    
    // Function to handle filtering logic based on the selected academic year
    // const handleFilter = (academicYearId) => {
    //     setSelectedAcademicYear(academicYearId);
    // };

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* Pass the academic year data and filter handler to the filter component */}
                    <DueRegistrationAmountFilter
                        // academicYearData={academicYear}
                        // onSelectAcademicYear={handleFilter}
                        setEnquiryRegAmountData={setEnquiryRegAmountData}
                        academicYear={academicYear}
                    />
                    {/* Pass the selected academic year to the table component */}
                    <DueRegistrationAmountTable
                        enquiryRegAmountData={enquiryRegAmountData}
                    />
                </div>
            </div>
        </div>
    );
};

export default DueRegistrationAmountInnerLayout;
