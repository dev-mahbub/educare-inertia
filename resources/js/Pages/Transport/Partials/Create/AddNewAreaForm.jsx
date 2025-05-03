import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";

export default function AddNewAreaForm({ areas = '' }) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        title: "",
        pick_price: "",
        drop_price: "",
        pick_drop_price: "",
        description: "",
    });

    const handleAreaInsert = (e) => {
        e.preventDefault();
        post(route("area.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleRest = () => {
        reset();
    }


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
              
                    Transport ....
                </div>
            </div>
        </>
    );
}
