import React from 'react';

const StudentViewList = ({ academicSyllabuses }) => {

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Class Name</th>
                                        <th>Subject Name</th>
                                        <th>Attachment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {academicSyllabuses?.length > 0 ?
                                        academicSyllabuses?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.title}</td>
                                                <td>{item?.class_name?.title}</td>
                                                <td>{item?.subject?.title}</td>
                                                <td>
                                                    
                                                    <a href={item?.file?.path} target='_blank' className="text-blue-500 hover:underline">
                                                        <i className="icon-DownloadSimple"></i> {" "}
                                                        {item?.file?.name}
                                                    </a>
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="8">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
};

export default StudentViewList;
