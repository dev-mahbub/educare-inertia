import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import BulkDiscountFilter from './BulkDiscountFilter';
import BulkDiscountList from './BulkDiscountList';

const BulkDiscountInnerLayout = ({ classrooms = [], discounts = [], feeTypes = [], fees = [], students = [] }) => {

    const [studentsData, setStudentsData] = useState([])
    const [selectedDiscountData, setSelectedDiscountData] = useState({});
    const [submitEvent, setSubmitEvent] = useState({});
    const [discountAddStatus, setDiscountAddStatus] = useState(false);

    useEffect(() => {
        setStudentsData(students?.sort(customSort))
    }, [students]);

    const selectedDiscountDataFromChild = (data) => {
        setSelectedDiscountData(data);
    }

    const submitEventFromChild = (e) => {
        setSubmitEvent(e);
    }

    const discountAddStatusFromChild = (status) => {
        let count = 0;

        if (status == true) {
            count++;
            setStudentsData([]);
        }

        if (count <= 1) {
            setDiscountAddStatus(status);
        }
        else {
            setDiscountAddStatus(false);
            count = 0;
        }
    }

    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.classroom_roll && b.classroom_roll && a.classroom_roll.roll_no != null && b.classroom_roll.roll_no != null) {
            return a.classroom_roll.roll_no - b.classroom_roll.roll_no;
        } else if (!a.classroom_roll || a.classroom_roll.roll_no == null) {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the end of the sorted array
        }
    }
    // sort students by classroom roll end


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <BulkDiscountFilter
                        classrooms={classrooms}
                        discounts={discounts}
                        setStudentsData={setStudentsData}
                        sendSlecetedDiscountDataToParent={selectedDiscountDataFromChild}
                        sendSubmitEventToParent={submitEventFromChild}
                        discountAddStatus={discountAddStatus}
                        setDiscountAddStatus={setDiscountAddStatus}
                    />
                    <BulkDiscountList
                        feeTypes={feeTypes}
                        students={studentsData}
                        selectedDiscount={selectedDiscountData}
                        fees={fees}
                        submitEvent={submitEvent}
                        sendDiscountAddStatusToParent={discountAddStatusFromChild}
                    />
                </div>
            </div>
        </div>
    );
};

export default BulkDiscountInnerLayout;
