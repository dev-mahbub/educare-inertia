import React from 'react';
import SmsMenuCategory from '../../SmsMenuCategory';
import SmsAppCredentialForm from './SmsAppCredentialForm';
import SmsAppCredentialList from './SmsAppCredentialList';
import { useForm } from '@inertiajs/react';

const SmsAppCredentialInnerLayout = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_audience: "parents",
    });

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <SmsMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-5">
                            <SmsAppCredentialForm />
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <SmsAppCredentialList
                                data={data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmsAppCredentialInnerLayout;