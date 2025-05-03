import ApexChart from 'react-apexcharts';

const DaysCollectionAnalyticsChart = ({
    last7DaysCollectionAnalysis
}) => {
  const chartOptions = {
    series: [{
        data: [...Object.values(last7DaysCollectionAnalysis)?.map(item => item?.total_fee ?? 0)]
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
      offsetY: 7,
      fontSize: '14px',
      fontFamily: 'Inter, Inter',
      fontWeight: 500,
      itemMargin: {
        horizontal: 0,
        vertical: 0,
      },
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Registration Date'],
      dataLabels: {
        offsetX: -15,
        formatter: function (val) {
          return val + "K"
        }
      },
      markers: {
        fillColors: ['#A1C7FF'],
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
    colors: ['rgba(0,227,150,1', 'rgba(0,227,150,1'],
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
            ...Object.values(last7DaysCollectionAnalysis)?.map(item => [item.registration_date])
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
          fontSize: '14px',
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
        text: 'Total Collection',
        offsetX: -2,
        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'inter, sans-serif',
          fontWeight: 600,
        },
      },
      tickAmount: 5,
      max: 1000,
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
      <ApexChart options={chartOptions} series={chartOptions.series} type="bar" height={405} />
    </div>
  );
};

export default DaysCollectionAnalyticsChart;
