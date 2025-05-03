import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import React from 'react';

const ParentCredentialUpdateForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        dummy_card_check_1: "",
        dummy_card_check_2: "",
        dummy_card_check_3: "",
        dummy_card_check_4: "",
    });
    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Change Parent User & Password
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="dummy_card_check_1"
                                        name="dummy_card_check_1"
                                        checked={
                                            data.dummy_card_check_1
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_card_check_1",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="dummy_card_check_1"
                                        value="Computer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentCredentialUpdateForm;