import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import React from 'react';
import biometricImage from "../../../../../images/icon/placeholder.jpg"
import RadioInput from '@/Components/RadioInput';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useRef } from 'react';

const BuyBiometricList = () => {
    const buyerAddressInput = useRef();

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        biometric_product_a: "",
        biometric_product_b: "",
        check_yearly_license: "",
        second_year_license: "",
        buyer_address: "",
    });
    console.log(data)
    const buyBiometricListData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset('city', 'zip');
                //     cityInput.current.focus();
                // }
            },
        });
    };
    //form validation end
    return (
        <div className="educare-admission-list-area">
            <div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <form onSubmit={buyBiometricListData}>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="lg:col-span-9 col-span-12">
                                <div className="educare-admission-list pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Check</th>
                                                <th>Model</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="educare-radio-field-styles">
                                                        <RadioInput 
                                                            id="biometric_product_a"
                                                            name="biometric_product"
                                                            value=""
                                                            checked={
                                                                data.biometric_product_a
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "biometric_product_a",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className='block font-semibold text-heading mb-1'>MB-20</span>
                                                    <img className='max-w-[80px]' src={biometricImage} alt="img not found" />
                                                </td>
                                                <td>
                                                    <div className='max-w-[290px] font-primary'>
                                                        User Capacity - 300,
                                                        Finger Capacity - 500,
                                                        Face Capacity - 500,
                                                        Transaction Capacity - 50,000,
                                                        Communication - LAN , USB 2.0 (Host),
                                                        Wifi Connectivity - NO,
                                                        Battery Backup - NO,
                                                    </div>
                                                </td>
                                                <td><div className='inline-flex items-center'><i className='icon-CurrencyInr'></i>8000</div></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="educare-radio-field-styles">
                                                        <RadioInput
                                                            id="biometric_product_b"
                                                            name="biometric_product"
                                                            value=""
                                                            checked={
                                                                data.biometric_product_b
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "biometric_product_b",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className='block font-semibold text-heading mb-1'>MB-160</span>
                                                    <img className='max-w-[80px]' src={biometricImage} alt="img not found" />
                                                </td>
                                                <td>
                                                    <div className='max-w-[290px] font-primary'>
                                                        User Capacity - 1,500,
                                                        Finger Capacity - 1,000,
                                                        Face Capacity - 1,000,
                                                        Transaction Capacity - 80,000,
                                                        Communication - LAN , TCP/IP, USB-Host,
                                                        Wifi Connectivity - NO,
                                                        Battery Backup - NO,
                                                    </div>
                                                </td>
                                                <td><div className='inline-flex items-center'><i className='icon-CurrencyInr'></i>11,102</div></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="lg:col-span-3 col-span-12">
                                <div className="educare-admission-list pb-none table-width-full">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Model</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>MB-20</td>
                                                <td><div className='inline-flex items-center'><i className='icon-CurrencyInr'></i>8000</div></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className='inline-flex gap-x-1'>
                                                        <div className="educare-checkbox-field-styles mt-0.5">
                                                            <Checkbox
                                                                name="check_yearly_license"
                                                                checked={
                                                                    data.check_yearly_license
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "check_yearly_license",
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        Yearly Licence Rs 2000 + Set up Cost Rs 2000 One time
                                                    </div>
                                                </td>
                                                <td><div className='inline-flex items-center'><i className='icon-CurrencyInr'></i>4000</div></td>
                                            </tr>
                                            <tr>
                                                <td>Sub Total</td>
                                                <td><div className='inline-flex items-center'><i className='icon-CurrencyInr'></i>12000</div></td>
                                            </tr>
                                            <tr>
                                                <td>GST Amount(18%)</td>
                                                <td><div className='inline-flex items-center'><i className='icon-CurrencyInr'></i>4000</div></td>
                                            </tr>
                                            <tr>
                                                <td><b>Amount to Pay</b></td>
                                                <td><div><b className='inline-flex items-center'><i className='icon-CurrencyInr'></i>16000</b></div></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-3'>
                                    <h5 className='text-[15px] font-medium text-headingLight'>Note :</h5>
                                    <div className='inline-flex gap-x-1'>
                                        <div className="educare-checkbox-field-styles">
                                            <Checkbox
                                                name="second_year_license"
                                                checked={
                                                    data.second_year_license
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "second_year_license",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='text-[15px] font-normal text-headingLight'>
                                            From 2nd Year licence charge/year will be <i className='icon-CurrencyInr'></i>2000
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-1'>
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="buyer_address"
                                            value="Buyer Address :"
                                        />
                                        <TextInput
                                            id="buyer_address"
                                            ref={
                                                buyerAddressInput
                                            }
                                            value={
                                                data.buyer_address
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "buyer_address",
                                                    e.target.value
                                                )
                                            }
                                            placeHolder="Write Address"
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.buyer_address
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className='text-end mt-5'>
                                    <PrimaryButton
                                        disabled={processing}
                                        className="educare-primary-btn-md-fill"
                                    >
                                        Pay Now
                                    </PrimaryButton>
                                </div>
                                <div className='mt-5 bg-white/70 p-5 rounded-lg'>
                                    <h4 className='text-[18px] font-semibold text-headingLight mb-1.5'>Transaction Charges :</h4>
                                    <ul className='flex flex-col gap-1.5'>
                                        <li className='flex justify-between gap-2.5'>
                                            <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>Net Banking :</span>
                                            <span className='text-[14px] font-medium text-headingLight'>1.55%</span>
                                        </li>
                                        <li className='flex justify-between gap-2.5'>
                                            <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>Credit Card :</span>
                                            <span className='text-[14px] font-medium text-headingLight'>1.85%</span>
                                        </li>
                                        <li className='flex justify-between gap-2.5'>
                                            <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>Debit Card :</span>
                                            <span className='text-[14px] font-medium text-headingLight'>0.9% below & 1% above 2k</span>
                                        </li>
                                        <li className='flex justify-between gap-2.5'>
                                            <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>UPI Card :</span>
                                            <span className='text-[14px] font-medium text-headingLight'>Free</span>
                                        </li>
                                        <li className='flex justify-between gap-2.5'>
                                            <span className='text-[14px] font-semibold text-headingLight whitespace-nowrap'>Wallet :</span>
                                            <span className='text-[14px] font-medium text-headingLight'>2%</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BuyBiometricList;