import React from 'react';
import ImportBookForm from './ImportBookForm';
import ImportBookTable from './ImportBookTable';

const ImportBookFormTable = () => {
    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <ImportBookForm />
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <ImportBookTable />
                </div>
            </div>
        </div>
    );
};

export default ImportBookFormTable;