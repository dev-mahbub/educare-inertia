import ApexChart from 'react-apexcharts';

const FeeMonthlyColumnCharts = ({ studentSubjectWiseRepo }) => {
  const chartOptions = {
    series: [{
      name: 'Student Subject Wise Report',
      data: studentSubjectWiseRepo?.map(item => item.total_percentage),
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
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
        categories: studentSubjectWiseRepo?.map(item => [item?.exam_title]),
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
      tickAmount: 10,
      max: 100,
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
      enabled: false,
  }
  };

  return (
    <div>
      <ApexChart options={chartOptions} series={chartOptions.series} type="bar" height={333} />
    </div>
  );
};

export default FeeMonthlyColumnCharts;
