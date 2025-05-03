import { useForm } from "@inertiajs/react";
import { useState } from "react";
import LocationProductListLeftDiv from "./LocationProductListLeftDiv";
import LocationProductListRightDiv from "./LocationProductListRightDiv";

const LocationProductListTables = ({
    locationWiseProductReport,
    infraLevels,
    statusArray
}) => {
    const [selectedInfraLevel, setSelectedInfraLevel] = useState({});

    const {
        data,
        setData
    } = useForm({
        search: "",
        status: ""
    });

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                        <LocationProductListLeftDiv
                            infraLevels={infraLevels}
                            setSelectedInfraLevel={setSelectedInfraLevel}
                            data={data}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                        <LocationProductListRightDiv
                            locationWiseProductReport={locationWiseProductReport}
                            statusArray={statusArray}
                            selectedInfraLevel={selectedInfraLevel}
                            data={data}
                            setData={setData}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocationProductListTables;
