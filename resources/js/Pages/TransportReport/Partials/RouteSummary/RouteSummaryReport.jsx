import { useState } from 'react';
import RouteStudentsList from './RouteStudentsList';
import RouteSummaryList from './RouteSummaryList';

const RouteSummaryReport = ({
    routeData,
    totalStudent,
    studentData,
    routeName,
}) => {

    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    return (
        <div className='grid grid-cols-12 gap-5'>
            <div className="col-span-12 lg:col-span-4">
                <RouteSummaryList
                    routeData={routeData}
                    totalStudent={totalStudent}
                    setLoading={setLoading}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />
            </div>
            <div className="col-span-12 lg:col-span-8">
                <RouteStudentsList
                    studentData={studentData}
                    loading={loading}
                    setLoading={setLoading}
                    routeName={routeName}
                    selectedItem={selectedItem}
                />
            </div>
        </div>
    );
};

export default RouteSummaryReport;
