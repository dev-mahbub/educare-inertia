import React from "react";
import ApexChart from "react-apexcharts";

const GraphSubjectWiseOverallListPieChart = ({ ranges = [] }) => {
    const chartOptions = {
        series: ranges?.map((item) => item?.total_student),
        chart: {
            height: "auto",
            width: "auto",
            type: "pie",
        },
        labels: [...ranges?.map((item) => [`${item?.min}-${item?.max}`])],
        colors: [
            "#F7B84B",
            "#405189",
            "#299CDB",
            "#F06548",
            "#00e396",
            "#008ffb",
        ],
        legend: {
            show: true,
            position: "top",
            verticalAlign: "bottom",
            align: "center",
            fontSize: "14px",
            colors: ["#F7B84B"],
            fontWeight: 400,
            labels: {
                colors: ["#7C7C7C"],
            },
            markers: {
                width: 30,
                height: 12,
                strokeWidth: 0,
                strokeColor: "#fff",
                radius: 6,
                offsetX: -2,
                offsetY: 0,
            },
            itemMargin: {
                horizontal: 5,
                vertical: 0,
            },
            onItemClick: {
                toggleDataSeries: true,
            },
            onItemHover: {
                highlightDataSeries: true,
            },
        },
        responsive: [
            {
                breakpoint: 450,
                options: {
                    chart: {
                        width: "100%",
                        height: "auto",
                    },
                },
            },
        ],
    };

    return (
        <div>
            <ApexChart
                options={chartOptions}
                series={chartOptions.series}
                type="pie"
                width={500}
                height={500}
            />
        </div>
    );
};

export default GraphSubjectWiseOverallListPieChart;
