import React from 'react';
import ApexChart from 'react-apexcharts';

const BdPieChart = () => {
  const chartOptions = {
    series: [65, 35],
    chart: {
        type: 'donut',
        width: 380,
        height: 380,
    },
    stroke: {
      show: true,
      width: 0,
    },
    dataLabels: {
      style: {
        colors: ['#fff'],
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360, 
        expandOnClick: true,
        customScale: 1,
        donut: {
          size: '55%',
          background: '',
        },
      },
    },
    labels: ['SENT', 'AVAILABLE'],
    colors: ['#A1C7FF', '#0B52BD'],
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'bottom',
      horizontalAlign: 'center', 
      floating: false,
      fontSize: '14px',
      fontFamily: 'Inter, Inter',
      colors: ['#505E73'],
      fontWeight: 500,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      markers: {
          width: 8,
          height: 8,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 8,
          customHTML: undefined,
          onClick: undefined,
          offsetX: -2,
          offsetY: 1
      },
      itemMargin: {
          horizontal: 7,
          vertical: 7
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
        breakpoint: 350,
        options: {
          chart: {
            width: '100%',
            height: 'auto', 
          },
        },
      },
    ],
  };

  return (
    <div>
      <ApexChart options={chartOptions} series={chartOptions.series} type="donut" width={264} height={362} />
    </div>
  );
};

export default BdPieChart;
