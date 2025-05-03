import React from "react";
import MemberManageLeftList from "./MemberManageLeftList";
import { useState } from "react";
import MemberManageRightList from "./MemberManageRightList";
import { useForm } from "@inertiajs/react";

export default function MemberManageMain() {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        //Member manage left list 
        select_all: "",
        checkOne: false,
        checkTwo: false,
        checkThree: false,
        //memberManage left filter
        select_team_participants: "studentOnly",
        select_class: "class",
        //right list select
        select_team: "select_team",

    });

    const [checkedData, setCheckedData] = useState({});
    const [checkedDataForRightList, setCheckedDataForRightList] = useState({});


    const handleCheckedDataToMove = () => {
        setCheckedDataForRightList(checkedData)
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <MemberManageLeftList
                            data={data}
                            setData={setData}
                            errors={errors}
                            setCheckedData={setCheckedData}
                            handleCheckedDataToMove={handleCheckedDataToMove}
                        />
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <MemberManageRightList
                            data={data}
                            setData={setData}
                            errors={errors}
                            checkedDataForRightList={checkedDataForRightList}
                            setCheckedDataForRightList={setCheckedDataForRightList}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
