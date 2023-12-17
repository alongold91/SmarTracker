import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Flex } from 'antd';
import style from './Charts.module.css';

const BarChart = () => {
  const data = [
    {
      year: '2023',
      January: 113,
      JanuaryColor: '#4169E1',
      February: 173,
      FebruaryColor: '#008000',
      March: 145,
      MarchColor: '#FF2400',
      April: 66,
      AprilColor: '#FFFF55',
      May: 98,
      MayColor: '#967BB6',
      June: 59,
      JuneColor: '#00C7FF',
      July: 79,
      JulyColor: '#FF7F50',
      August: 137,
      AugustColor: '#228B22',
      September: 34,
      SeptemberColor: '#FF00FF',
      October: 213,
      OctoberColor: '#FFFF00',
      November: 172,
      NovemberColor: '#708090',
      December: 146,
      DecemberColor: '#800020'
    }
  ];
  return (
    <ResponsiveBar
      data={data}
      keys={[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]}
      indexBy='year'
      padding={0.02}
      margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
      groupMode='grouped'
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={[
        '#4169E1',
        '#008000',
        '#FF2400',
        '#FFFF55',
        '#967BB6',
        '#00C7FF',
        '#FF7F50',
        '#228B22',
        '#FF00FF',
        '#FFFF00',
        '#708090',
        '#800020'
      ]}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0
      }}
      axisLeft={{
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Sum',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 0
      }}
      enableGridY={false}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]]
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 6,
          itemWidth: 100,
          itemHeight: 25,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      tooltip={(e) => (
        <Flex
          align='center'
          justify='center'
          vertical
          className={style.barChartTooltip}
        >
          <p className='caption'>
            {e.id}, {e.data.year}
          </p>
          <p className='caption'>{e.value}&#8362;</p>
        </Flex>
      )}
      role='application'
      ariaLabel='Yearly expenses'
      barAriaLabel={(e) =>
        e.id + ': ' + e.formattedValue + ' in year: ' + e.indexValue
      }
    />
  );
};

export default BarChart;
