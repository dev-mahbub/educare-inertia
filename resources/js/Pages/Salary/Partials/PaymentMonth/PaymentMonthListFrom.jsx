import { useState } from "react";
import PaymentMonthForm from "./PaymentMonthForm";
import PaymentMonthTableList from "./PaymentMonthTableList";

export default function PaymentMonthListFrom({
    paymentMonths
}) {

    const [selectedItem, setSelectedItem] = useState({});
    const [formMode, setFormMode] = useState('create');

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <PaymentMonthForm
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            formMode={formMode}
                            setFormMode={setFormMode}
                        />
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <PaymentMonthTableList
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            setFormMode={setFormMode}
                            paymentMonths={paymentMonths}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
