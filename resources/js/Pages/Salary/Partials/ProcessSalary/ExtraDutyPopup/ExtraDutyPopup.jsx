import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ExtraDutyPopup({
    className = '',
    extraDutyPopup,
    setExtraDutyPopup,
    staffExtraDutyData,
    setStaffExtraDutyData
}) {

    const extraDutyPopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setExtraDutyPopup(false);
    };

    // handle checkbox select start
    const handleCheckboxSelect = (parentIndex, childIndex, field, value) => {
        const updatedData = [...staffExtraDutyData];

        updatedData[parentIndex]['attendances'][childIndex][field] = value;

        setStaffExtraDutyData(updatedData);
    }
    // handle checkbox select end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={extraDutyPopup} onClose={closeModal}>
                    <form onSubmit={extraDutyPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Extra Duties</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>Date</th>
                                                <th>Day</th>
                                                <th>Pay</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {staffExtraDutyData?.length > 0 &&
                                                staffExtraDutyData.map((item, index) => (
                                                    item?.attendances?.map((attendance, innerIndex) => (
                                                        <tr key={innerIndex}>
                                                            <td>
                                                                {innerIndex == 0 &&
                                                                    <span
                                                                        className='badge info'
                                                                    >
                                                                        {item?.payment_month_title}
                                                                    </span>
                                                                }
                                                            </td>
                                                            <td>{attendance?.attendance_formatted_date}</td>
                                                            <td>{attendance?.attendance_day}</td>
                                                            <td>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="monday_august_id"
                                                                            name="monday_august_id"
                                                                            checked={
                                                                                attendance?.is_selected
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleCheckboxSelect(index, innerIndex, 'is_selected', e.target.checked)
                                                                            }
                                                                            disabled={attendance?.is_disabled}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
