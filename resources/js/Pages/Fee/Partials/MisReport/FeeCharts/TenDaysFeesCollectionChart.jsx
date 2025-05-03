import ApexChart from 'react-apexcharts';

const TenDaysFeesCollectionChart = ({
    lastTenDaysFeeCollection = []
}) => {
    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end

    function getMaxNumber(number) {
        if (number <= 0) {
            return 5;
        }

        let maxNumber = Math.round(number);

        while (maxNumber % 5 != 0) {
            maxNumber++;
        }

        return maxNumber
    }

  const chartOptions = {
    series: [{
        data: Object.values(lastTenDaysFeeCollection)?.map(amount => amount / 1000)
    }],
    chart: {
      type: 'bar',
      height: 350,
    },
    grid: {
      borderColor: "rgba(135, 148, 168, 0.2)",
      padding: {
        bottom: 0,
      },
    },
    legend: {
      offsetY: 8,
      fontSize: '14px',
      fontFamily: 'Inter, Inter',
      fontWeight: 500,
      itemMargin: {
        horizontal: 0,
        vertical: 0,
      },
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Date'],
      dataLabels: {
        offsetX: -15,
        formatter: function (val) {
          return val + "K"
        }
      },
      markers: {
        fillColors: ['rgba(0, 227, 150, 1'],
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
    colors: ['rgba(0, 227, 150, 1', 'rgba(0, 227, 150, 1'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
        categories: Object.keys(lastTenDaysFeeCollection)?.map(date => [date]),
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
        text: 'Amount',
        offsetX: -3,
        offsetY: -10,
        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'inter, sans-serif',
          fontWeight: 600,
        },
      },
      tickAmount: 5,
        // max: 25,
        max: Object.keys(lastTenDaysFeeCollection)?.length > 0 ? getMaxNumber(Math.max(
            ...Object.values(lastTenDaysFeeCollection)?.map(amount => formatNumber(amount / 1000))
        )) + 20 : 25,
      labels: {
        formatter: (val) => {
          return val / 1 + 'K'
        },
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
      enabled: true,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter'
      },
      onDatasetHover: {
          highlightDataSeries: true,
      },
      x: {
        show: true,
        format: 'dd MMM',
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => 'Amount',
        },
      },
      z: {
        formatter: undefined,
        title: 'Size: '
      }
    }
  };

  return (
    <div>
      <ApexChart options={chartOptions} series={chartOptions.series} type="bar" height={405} />
    </div>
  );
};

export default TenDaysFeesCollectionChart;
