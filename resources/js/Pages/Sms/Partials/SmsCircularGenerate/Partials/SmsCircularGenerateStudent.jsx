import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { concatName } from "@/Hooks/GlobalFunction";
import { router, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SmsCircularGenerateStudent = ({
    generatedData,
    students,
    classrooms
}) => {

    const {
        data,
        setData
    } = useForm({
        classroom_id: "",
        select_all_student: false,
        student_ids: [],
    });

    // handle change classroom start
    const handleChangeClassroom = (value) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: value,
            select_all_student: false,
            student_ids: []
        }));

        const form_data ={
            classroom_id: value
        }

        router.post(route('sms.sms_circular_generate'), form_data);
    }
    // handle change classroom end

    // Handle checkbox selection start
    const handleCircularGenerateSelect = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedStudentIds = [...data.student_ids];

        if (name === "select_all_student") {
            newFormData.select_all_student = value;

            if (value) {
                newCheckedStudentIds = students?.map(item => item.id);
            } else {
                newCheckedStudentIds = [];
            }

            newFormData.student_ids = newCheckedStudentIds;
        } else {
            if (value) {
                newCheckedStudentIds.push(id);
            } else {
                newCheckedStudentIds = newCheckedStudentIds.filter(checkedId => checkedId !== id);
            }

            newFormData.student_ids = newCheckedStudentIds;
            newFormData.select_all_student = newCheckedStudentIds.length === students?.length;
        }

        setData(newFormData);
    };
    // Handle checkbox selection end

    // handle download sms circular start
    const handleDownloadSmsCircular = (e) => {
        e.preventDefault();

        if(data?.student_ids?.length == 0) {
            toast.error("Please select at least one student.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const params = {
                circular_id: generatedData?.id,
                student_ids: JSON.stringify(data?.student_ids),
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
            {
                generatedData?.audience_type === 'Student' && <div className='grid grid-cols-12 my-[20px]'>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Class"
                                data={classrooms}
                                value={
                                    data.classroom_id
                                }
                                onChange={(e) =>
                                    handleChangeClassroom(e.target.value)
                                }
                                className="block"
                            />
                        </div>
                    </div>
                </div>
            }
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
                                                        name="select_all_student"
                                                        checked={data.select_all_student || false}
                                                        onChange={(e) =>
                                                            handleCircularGenerateSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th>Adm. No.</th>
                                        <th>Audience</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students?.length > 0 ? (
                                        students.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                name={"student_id_" + item.id}
                                                                checked={data.student_ids.includes(item.id)}
                                                                onChange={(e) =>
                                                                    handleCircularGenerateSelect(e.target.name, e.target.checked, item.id)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item?.admission_no}</td>
                                                <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                <td>{concatName(item?.father?.first_name, item?.father?.middle_name, item?.father?.last_name)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center">Data not found</td>
                                        </tr>
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

export default SmsCircularGenerateStudent;
