import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import CreateVoucher from './CreateVoucher';

const CreateVoucherInnerLayout = ({
    classrooms = [],
    voucher_modes = [],
    feeTypes = [],
    students = [],
    student,
    studentFeeVouchers = []
}) => {

    const [selectedStudent, setSelectedStudent] = useState({});

    useEffect(() => {
        if(student?.id != null) {
            setSelectedStudent(student);
        }
        else {
            setSelectedStudent({});
        }
    },[student])


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateVoucher
                        classrooms={classrooms}
                        voucher_modes={voucher_modes}
                        feeTypes={feeTypes}
                        students={students}
                        selectedStudent={selectedStudent}
                        setSelectedStudent={setSelectedStudent}
                        studentFeeVouchers={studentFeeVouchers}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateVoucherInnerLayout;
