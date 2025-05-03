import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useState } from 'react';
import StudentDiscountFilter from './StudentDiscountFilter';
import StudentDiscountList from './StudentDiscountList';

const StudentDiscountInnerLayout = ({
    classrooms = [],
    discounts = [],
    feeTypes = [],
    students = [],
    studentUnpaidFees=[],
    student
}) => {

    const [unpaidFeesData, setUnpaidFeesData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [selectedDiscount, setSelectedDiscount] = useState({});
    const [discountAddStatus, setDiscountAddStatus] = useState(false);



    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentDiscountFilter
                        classrooms={classrooms}
                        discounts={discounts}
                        students={students}
                        setSelectedStudent={setSelectedStudent}
                        selectedStudent={selectedStudent}
                        setSelectedDiscount={setSelectedDiscount}
                        selectedDiscount={selectedDiscount}
                        setUnpaidFeesData={setUnpaidFeesData}
                        studentUnpaidFees={studentUnpaidFees}
                        discountAddStatus={discountAddStatus}
                        setDiscountAddStatus={setDiscountAddStatus}
                        student={student}
                     />
                    <StudentDiscountList
                        feeTypes={feeTypes}
                        unpaidFees={unpaidFeesData}
                        selectedStudent={selectedStudent}
                        selectedDiscount={selectedDiscount}
                        setSelectedStudent={setSelectedStudent}
                        setSelectedDiscount={setSelectedDiscount}
                        setDiscountAddStatus={setDiscountAddStatus}
                     />
                </div>
            </div>
        </div>
    );
};

export default StudentDiscountInnerLayout;
