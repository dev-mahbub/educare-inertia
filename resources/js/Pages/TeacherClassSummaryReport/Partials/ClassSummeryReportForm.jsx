import { Link, useForm } from '@inertiajs/react';
import React from 'react';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';

const ClassSummeryReportForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        month_id: '',
    });

    return (
        <div>
            <div className="flex justify-between items-end flex-wrap">
                <div className="educare-card-title card-title-no-padding">
                    <h5>Class Summary Report</h5>
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                    <div>
                        <div className="educare-input-field-styles max-w-[155px]">
                            <SelectInput
                                data_label="Month"
                                data={[]}
                                value={
                                    data.month_id
                                }
                                onChange={(e) =>
                                    setData(
                                        "month_id",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.month_id
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="educare-default-table xs:overflow-x-auto mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Number of Classes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>30-07-2024</td>
                            <td>234</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassSummeryReportForm;