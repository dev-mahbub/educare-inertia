import React from 'react';

const DoubleColumnTable = () => {
    return (
        <div className="educare-classroom-table-wrapper mb-5">
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Double Column Table
                </h5>
            </div>
            <div className="educare-default-table table-width-full">
                <table>
                    <tbody>
                        <tr>
                            <td className='w-[50%]'>
                                <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                    <h5 className='text-[14px] text-headingLight font-semibold'>Student Name:</h5>
                                    <span className='text-[14px] text-headingLight font-normal'>Anil</span>
                                </div>
                            </td>
                            <td>
                                <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                    <h5 className='text-[14px] text-headingLight font-semibold'>Adm. No:</h5>
                                    <span className='text-[14px] text-headingLight font-normal'>11141</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='w-[50%]'>
                                <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                    <h5 className='text-[14px] text-headingLight font-semibold'>Father Name:</h5>
                                    <span className='text-[14px] text-headingLight font-normal'>Akhil</span>
                                </div>
                            </td>
                            <td>
                                <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                    <h5 className='text-[14px] text-headingLight font-semibold'>Father Mobile:</h5>
                                    <span className='text-[14px] text-headingLight font-normal'>41841284</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='w-[50%]'>
                                <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                    <h5 className='text-[14px] text-headingLight font-semibold'>Mother Name:</h5>
                                    <span className='text-[14px] text-headingLight font-normal'>Mamta</span>
                                </div>
                            </td>
                            <td>
                                <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                    <h5 className='text-[14px] text-headingLight font-semibold'>Mother Mobile:</h5>
                                    <span className='text-[14px] text-headingLight font-normal'>25948764</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoubleColumnTable;