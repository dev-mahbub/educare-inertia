import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const PublishReportCardParentList = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        publishTypeOne: "",
        publishTypeTow: "",
    });

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Publish Report Card For Parent
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Academic Year</th>
                                        <th>Action</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>2022-2023</td>
                                        <td>
                                            <div className="educare-create-school-settings-list-check">
                                                <div className="educare-radio-field-styles flex gap-3">
                                                    <RadioInput
                                                        name="publishTypeOneOne"
                                                        value="publish"
                                                        checked={data.publishTypeOne === "publish"}
                                                        onChange={() => setData("publishTypeOne", "publish")}
                                                    />
                                                    <RadioInput
                                                        name="publishTypeOne"
                                                        value="Non publish"
                                                        checked={data.publishTypeOne === "non_publish"}
                                                        onChange={() => setData("publishTypeOne", "non_publish")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <PrimaryButton
                                                // disabled={processing}
                                                className="educare-primary-btn-md-fill"
                                            >
                                                Send Message
                                            </PrimaryButton>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>2022-2023</td>
                                        <td>
                                            <div className="educare-create-school-settings-list-check">
                                                <div className="educare-radio-field-styles flex gap-3">
                                                    <RadioInput
                                                        name="publishTypeTow"
                                                        value="publish"
                                                        checked={data.publishTypeTow === "publish"}
                                                        onChange={() => setData("publishTypeTow", "publish")}
                                                    />
                                                    <RadioInput
                                                        name="publishTypeTow"
                                                        value="Non publish"
                                                        checked={data.publishTypeTow === "non_publish"}
                                                        onChange={() => setData("publishTypeTow", "non_publish")}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <PrimaryButton
                                                // disabled={processing}
                                                className="educare-primary-btn-md-fill"
                                            >
                                                Send Message
                                            </PrimaryButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PublishReportCardParentList;