import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from "@inertiajs/react";

const MonthlyAdmissionFilter = ({
    academicYears,
    monthlyAdmissionReports
}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        academic_year_id: '',
    });

    // handle academic year change start
    const handleAcademicYearChange = (e) => {
        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id: academic_year_id
        }));

        const form_data = {
            academic_year_id: academic_year_id
        }

        router.post(route('student_report.monthly_admission'), form_data)
    }
    // handle academic year change end

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    return (
        <div className='mb-2.5'>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Student Monthly Admission Report
                </h5>
            </div>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className='flex justify-between items-center flex-wrap'>
                            <div>
                                <span className='min-h-[30px] inline-block border px-4 leading-7
                     border-supportingA whitespace-nowrap rounded-2xl text-[14px]
                      text-supportingA'>Total : {Object.keys(monthlyAdmissionReports)?.length}</span>
                            </div>
                            <div className="educare-select-field-styles">
                                <SelectInput
                                    id="academic_year_id"
                                    data_label="Session"
                                    data={academicYears}
                                    value={data.academic_year_id}
                                    onChange={(e) => {
                                        setData("academic_year_id", e.target.value);
                                        handleAcademicYearChange(e);
                                    }
                                    }
                                    type="text"
                                    className="block"
                                />
                                <InputError
                                    message={errors.academic_year_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyAdmissionFilter;
