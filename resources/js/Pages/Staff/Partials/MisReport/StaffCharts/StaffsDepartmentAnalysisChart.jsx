import React from 'react';
import ApexChart from 'react-apexcharts';

const StaffsDepartmentAnalysisChart = ({departmentsStaffs}) => {
  const chartOptions = {
    series: [{
      name: "",
      data: [...departmentsStaffs?.map(item => item.count)]
    }],
    chart: {
      type: 'bar',
      height: 350,
        toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: "rgba(135, 148, 168, 0.2)",
      padding: {
        bottom: 0,
      },
    },
    legend: {
      fontSize: '12px',
      fontFamily: 'Inter, Inter',
      fontWeight: 500,
      itemMargin: {
        horizontal: 0,
        vertical: 0,
      },
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Departments'],
      dataLabels: {
        offsetX: -15,
        formatter: function (val) {
          return val + "K"
        }
      },
      markers: {
        fillColors: ['rgba(255,69,96,1)'],
        width: 8,
        height: 8,
        strokeWidth: 0,
        strokeColor: '#fff',
        radius: 8,
        offsetX: -2,
        offsetY: 0,
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    colors: ['rgba(255,69,96,1)', 'rgba(255,69,96,1)'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: [
        ...departmentsStaffs?.map(item => item.title)
      ],
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
        text: 'No. Of Staffs',
        offsetX: -2,
        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'inter, sans-serif',
          fontWeight: 600,
        },
      },
      tickAmount: 7,
      max: 3,
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
    tooltip: {
      y: {
        formatter: function (val) {
          return + val + " Staffs"
        }
      }
    }
  };

  return (
    <div>
      <ApexChart options={chartOptions} series={chartOptions.series} type="bar" height={405} />
    </div>
  );
};

export default StaffsDepartmentAnalysisChart;
