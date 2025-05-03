import React from 'react';
import ApexChart from 'react-apexcharts';

const BdColumnCharts = () => {
  const chartOptions = {
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63]
    }, {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91]
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    grid: {
      borderColor: "rgba(135, 148, 168, 0.2)",
      padding: {
        bottom: 8,
    }, 
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#A1C7FF', '#0B52BD'],
    legend: {
      fontSize: '12px',
      fontFamily: 'Inter, Inter',
      fontWeight: 500,
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['COLLECTION', 'EXPENSES'],
      markers: {
        fillColors: ['#00E396', '#775DD0'],
        width: 8,
        height: 8,
        strokeWidth: 0,
        strokeColor: '#fff',
        radius: 8,
        offsetX: -2,
        offsetY: 0,
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'STA'],
      labels: {
        show: true,
        rotate: -445,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
          fontSize: '12px',
          fontFamily: 'inter, sans-serif',
          fontWeight: 500,
          colors: '#505E73',
          cssClass: 'apexcharts-xaxis-label',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: '', // $ (thousands)
        style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: 'inter, sans-serif',
            fontWeight: 600,
        },
      },
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'inter, sans-serif',
          fontWeight: 500,
          colors: '#505E73',
        },
      },
    },
    fill: {
      opacity: 1
    },
  };

  return (
    <div>
      <ApexChart options={chartOptions} series={chartOptions.series} type="bar" height={333}/>
    </div>
  );
};

export default BdColumnCharts;
