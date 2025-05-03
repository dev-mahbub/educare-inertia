import React from 'react';
import MultiIssuesBooksLeftForm from './MultiIssuesBooksLeftForm';
import MultiIssuesBooksRightTable from './MultiIssuesBooksRightTable';

const MultiIssuesBooksTables = () => {
    return (
        <>
             <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xxxl:col-span-5">
                    <MultiIssuesBooksLeftForm/>
                </div>
                <div className="col-span-12 xxxl:col-span-7">
                    <MultiIssuesBooksRightTable/>
                </div>
            </div>
        </>
    );
};

export default MultiIssuesBooksTables;