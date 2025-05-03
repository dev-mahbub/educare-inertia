import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';

const BuySmsFilter = ({
    smsQuantities,
    setSelectedSmsQuantity
}) => {

    // const buySmsQuantityInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        sms_quantity: "",
    });

    // handle change sms quantity start
    const handleChangeSmsQuantity = (value) => {
        setData((prevData) => ({
            ...prevData,
            sms_quantity: value
        }));

        setSelectedSmsQuantity(smsQuantities?.find(item => item?.id == value));
        // const form_data = {
        //     selectedSmsQuantities: smsQuantities?.find(item => item?.id == value)
        // }
        // router.post(route('our_service.buy_sms'), form_data);
    }
    // handle change sms quantity end

    const buySmsData = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={buySmsData} className='mb-5'>
            <div className="grid grid-cols-12">
                <div className="xl:col-span-4 md:col-span-6 col-span-12">
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="sms_quantity"
                            data_label="SMS"
                            data={smsQuantities}
                            // ref={
                            //     buySmsQuantityInput
                            // }
                            value={
                                data.sms_quantity
                            }
                            onChange={(e) =>
                                handleChangeSmsQuantity(e.target.value)
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.sms_quantity
                            }
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BuySmsFilter;
