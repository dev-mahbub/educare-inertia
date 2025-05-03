import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const VoucherDueFilter = ({
    transportFeeStructureSetting = [],
    academicYearData,
    currentAcademicYear,
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        academic_year_id: "",
    });

    const handleVoucherDueFilterData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <form onSubmit={handleVoucherDueFilterData}>
            <div className='flex flex-wrap gap-2.5 mb-5 items-center justify-between'>
                <div className="educare-card-title pb-none leading-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Transfer Transport Voucher Due
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5'>
                    <div className='inline-flex flex-wrap gap-2.5 items-center leading-none'>
                        <h6 className='text-[15px] font-semibold text-headingLight'>Current Session :</h6>
                        <span className='text-[15px] font-medium text-headingLight'>{currentAcademicYear?.academic_session}</span>
                    </div>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="academic_year_id"
                            data_label="Due Academic Year"
                            data={academicYearData}
                            value={
                                data.academic_year_id
                            }
                            onChange={(e) =>
                                setData(
                                    "academic_year_id",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.academic_year_id
                            }
                            className="mt-2"
                        />
                    </div>
                    {
                        transportFeeStructureSetting
                            ? <div>
                                <PrimaryButton
                                    className="educare-primary-btn-md-fill whitespace-nowrap"
                                >
                                    Transfer Due
                                </PrimaryButton>
                            </div>
                            :
                            ''
                    }

                </div>
            </div>
        </form>
    );
};

export default VoucherDueFilter;
