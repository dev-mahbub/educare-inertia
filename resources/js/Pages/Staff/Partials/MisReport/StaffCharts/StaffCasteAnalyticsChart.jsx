import React from 'react';
import ApexChart from 'react-apexcharts';

const StaffCasteAnalyticsChart = ({castleStaffs}) => {
  const chartOptions = {
	series: [...castleStaffs?.map(item => item.count)],
	chart: {
		height: "100%",
		width: "100%",
        type: 'pie',
	},
	labels: [...castleStaffs?.map(item => item.title)],
	colors: ["#00E396", "#FF4560"],
	legend: {
		show: true,
		position: 'right',
		verticalAlign: 'bottom',
		align: 'center',
		fontSize: '12px',
		fontWeight: 400,
		labels: {
			colors: ["#7C7C7C"],
		},
		markers: {
			width: 12,
			height: 12,
			strokeWidth: 0,
			strokeColor: '#fff',
			radius: "50%",
			offsetX: -2,
			offsetY: 0,
		},
		itemMargin: {
			horizontal: 5,
			vertical: 0,
		},
		onItemClick: {
			toggleDataSeries: true
		},
		onItemHover: {
			highlightDataSeries: true
		},
	},
	responsive: [
        {
          breakpoint: 450,
          options: {
            chart: {
              width: '100%',
              height: '100%', 
            },
          },
		  legend: {
			position: 'bottom',
			verticalAlign: 'bottom',
			align: 'center',
			fontSize: '12px',
			fontWeight: 400,
		},
        },
    ],
  };

  return (
    <div>
      <ApexChart options={chartOptions} series={chartOptions.series} type="pie" width={450} height={450} />
    </div>
  );
};

export default StaffCasteAnalyticsChart;
