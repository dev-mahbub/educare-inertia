import ApexChart from 'react-apexcharts';

const StudentReligionChart = ( {getReligionWiseStudent} ) => {

    // heleper method to get max number
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

    const max_number = getReligionWiseStudent?.length > 0 ? getMaxNumber(Math.max(
      ...getReligionWiseStudent?.map(item => item.students_count)
  )) + 10 : 25;
  const chartOptions = {
    series: [{
      name: "",
      data: [...getReligionWiseStudent?.map(item => item.students_count)]
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
      customLegendItems: ['Religion'],
      dataLabels: {
        offsetX: -15,
        formatter: function (val) {
          return val + "K"
        }
      },
      markers: {
        fillColors: ['rgba(0,143,251,1)'],
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
    colors: ['rgba(0,143,251,1)'],
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
        ...getReligionWiseStudent?.map(item => item.name)
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
        text: 'Students',
        offsetX: -2,
        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'inter, sans-serif',
          fontWeight: 600,
        },
      },
      tickAmount: 5,
      type: 'numeric',
    // max: getReligionWiseStudent?.length > 0 ? getMaxNumber(Math.max(
    //     ...getReligionWiseStudent?.map(item => item.students_count)
    // )) + 10 : 25,
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
          return + val + " Students"
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

export default StudentReligionChart;
