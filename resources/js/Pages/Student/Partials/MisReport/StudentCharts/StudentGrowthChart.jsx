import ApexChart from 'react-apexcharts';

const StudentGrowthChart = ( {getTotalStudentPerSession} ) => {

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

    const max_number = getTotalStudentPerSession?.length > 0 ? getMaxNumber(Math.max(
        ...getTotalStudentPerSession?.map(item => item.total_student)
    )) + 10 : 100;

  const chartOptions = {
    series: [{
      name: '',
        data: [...getTotalStudentPerSession?.map(item => item.total_student)]
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
      customLegendItems: ['Session'],
      dataLabels: {
        offsetX: -15,
        formatter: function (val) {
          return val + "K"
        }
      },
      markers: {
        fillColors: ['rgba(11,82,189,1)'],
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
        columnWidth: '45%',
        endingShape: 'rounded'
      }
    },
    colors: ['rgba(11,82,189,1)', 'rgba(11,82,189,1)'],
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
        ...getTotalStudentPerSession?.map(item => item.academic_session)
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
      type: 'numeric', 
      tickAmount: 5,
        // max: getTotalStudentPerSession?.length > 0 ? getMaxNumber(Math.max(
        //     ...getTotalStudentPerSession?.map(item => item.total_student)
        // )) + 20 : 100,
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'inter, sans-serif',
          fontWeight: 500,
          colors: '#rgba(11,82,189,1)',
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

export default StudentGrowthChart;
