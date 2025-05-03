import { Link } from '@inertiajs/react';
import React from 'react';

export default function FeeMain() {
    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="leading-8 pb-5">
                        <h5 className='text-danger font-semibold text-2xl'> Request online payment gateway integration.</h5>
                    </div>
                    <div className='pb-2'>
                        <h5 className='text-lg text-headingLight font-semibold'>List of Documents Required for the Online Payment Gateway Integration.</h5>
                    </div>
                    <div>
                        <ul>
                            <li className=' pb-4 text-headingLight'>Step 1. Google form Link: <Link href='#' className='font-semibold text-primary'>CLICK HERE.</Link></li>
                            <li className=' pb-4 text-headingLight'>Step 2. Letter of Engagement (Plz download from this link): <Link href='#' className='font-semibold text-primary'>DOWNLOAD</Link> (duly signed & stamped by Authorised signatory).</li>
                            <li className=' pb-4 text-headingLight'>Step 3. Cancelled Cheque (Photocopy would also do).</li>
                            <li className=' pb-4 text-headingLight'>Step 4. <strong>School / Trust’s PAN no.</strong></li>
                            <li className=' pb-4 text-headingLight'>Step 5. <strong>Auth. Signatory PAN No.</strong></li>
                            <li className=' pb-4 text-headingLight'>Step 6. <strong>KYC of Auth. Signatory</strong> Aadhar Card /Voter ID / Driving License / Passport copy <strong>(Any one of these).</strong></li>
                            <li className=' pb-4 text-headingLight'>Step 7. <strong>Affiliation Certificate</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
