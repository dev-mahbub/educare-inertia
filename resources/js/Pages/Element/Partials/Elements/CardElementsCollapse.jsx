import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { useState } from 'react';

const CardElementsCollapse = () => {
    //card enable/disable start
    const [cardActive, setCardActive] = useState(false);
    const handleToggle = () => {
        setCardActive(!cardActive);
    };
    //card enable/disable start

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        dummy_card_collapse_check_1: "",
        dummy_card_collapse_check_2: "",
        dummy_card_collapse_check_3: "",
        dummy_card_collapse_check_4: "",
    });
    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[30px] pb-7 pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className={`educare-common-card-title ${cardActive ? "" : "pb-0"}`}>
                    <h5 onClick={handleToggle} className='cursor-pointer'>
                        <i className="icon-BookBookmark"></i>
                        Common Card With Collapse Style
                    </h5>
                    <span onClick={handleToggle} className="cursor-pointer">
                        <i className={`${cardActive ? "icon-minus" : "icon-plus"}`}></i>
                    </span>
                </div>
                <div className={`educare-common-card-wrap-border border-t border-grayLight/20 pt-5 ${cardActive ? "" : "hidden"}`}>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="dummy_card_collapse_check_1"
                                        name="dummy_card_collapse_check_1"
                                        checked={
                                            data.dummy_card_collapse_check_1
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_card_collapse_check_1",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="dummy_card_collapse_check_1"
                                        value="Computer"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="dummy_card_collapse_check_2"
                                        name="dummy_card_collapse_check_2"
                                        checked={
                                            data.dummy_card_collapse_check_2
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_card_collapse_check_2",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="dummy_card_collapse_check_2"
                                        value="Social Studies"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="dummy_card_collapse_check_3"
                                        name="dummy_card_collapse_check_3"
                                        checked={
                                            data.dummy_card_collapse_check_3
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_card_collapse_check_3",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="dummy_card_collapse_check_3"
                                        value="Science"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="dummy_card_collapse_check_4"
                                        name="dummy_card_collapse_check_4"
                                        checked={
                                            data.dummy_card_collapse_check_4
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_card_collapse_check_4",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="dummy_card_collapse_check_4"
                                        value="Economics"
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

export default CardElementsCollapse;