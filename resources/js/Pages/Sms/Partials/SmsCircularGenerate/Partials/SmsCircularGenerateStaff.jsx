import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { concatName } from "@/Hooks/GlobalFunction";
import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SmsCircularGenerateStaff = ({
    generatedData,
    staffs
}) => {

    const {
        data,
        setData
    } = useForm({
        select_all_staff: false,
        staff_ids: [],
    });

    // Handle checkbox selection start
    const handleCircularGenerateSelect = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedStaffIds = [...data.staff_ids];

        if (name === "select_all_staff") {
            newFormData.select_all_staff = value;

            if (value) {
                newCheckedStaffIds = staffs?.map(item => item.id);
            } else {
                newCheckedStaffIds = [];
            }

            newFormData.staff_ids = newCheckedStaffIds;
        } else {
            if (value) {
                newCheckedStaffIds.push(id);
            } else {
                newCheckedStaffIds = newCheckedStaffIds.filter(checkedId => checkedId !== id);
            }

            newFormData.staff_ids = newCheckedStaffIds;
            newFormData.select_all_staff = newCheckedStaffIds.length === staffs?.length;
        }

        setData(newFormData);
    };
    // Handle checkbox selection end

    // handle download sms circular start
    const handleDownloadSmsCircular = (e) => {
        e.preventDefault();

        if (data?.staff_ids?.length == 0) {
            toast.error("Please select at least one staff.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const params = {
                circular_id: generatedData?.id,
                staff_ids: JSON.stringify(data?.staff_ids),
            }

            const url = route('sms_pdf.download_circular', params);

            window.open(url);
        }
    }
    // handle download sms circular end

    return (
        <>
            <div className='flex justify-between gap-5 flex-wrap'>
                <h3 className='text-headingLight text-[20px] font-semibold'>{generatedData?.title}</h3>
                <PrimaryButton
                    className="educare-success-btn-md-fill"
                    type="button"
                    onClick={handleDownloadSmsCircular}
                >
                    Download Circular
                </PrimaryButton>
            </div>

            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            {generatedData?.audience_type}
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="select_all_staff"
                                                        checked={data.select_all_staff || false}
                                                        onChange={(e) =>
                                                            handleCircularGenerateSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffs?.length > 0 ? (
                                        staffs.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name={"staff_id_" + item.id}
                                                                checked={data.staff_ids.includes(item.id)}
                                                                onChange={(e) =>
                                                                    handleCircularGenerateSelect(e.target.name, e.target.checked, item.id)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                <td>{item?.phone}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <>
                                            <td colSpan={2} className="text-center">Class not found</td>

                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SmsCircularGenerateStaff;
