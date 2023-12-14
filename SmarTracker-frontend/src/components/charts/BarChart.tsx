import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = () => {
  const data = [
    {
      country: 'AD',
      'hot dog': 113,
      'hot dogColor': 'hsl(29, 70%, 50%)',
      burger: 173,
      burgerColor: 'hsl(298, 70%, 50%)',
      sandwich: 145,
      sandwichColor: 'hsl(173, 70%, 50%)',
      kebab: 66,
      kebabColor: 'hsl(97, 70%, 50%)',
      fries: 98,
      friesColor: 'hsl(248, 70%, 50%)',
      donut: 59,
      donutColor: 'hsl(38, 70%, 50%)'
    },
    {
      country: 'AE',
      'hot dog': 189,
      'hot dogColor': 'hsl(96, 70%, 50%)',
      burger: 42,
      burgerColor: 'hsl(146, 70%, 50%)',
      sandwich: 108,
      sandwichColor: 'hsl(330, 70%, 50%)',
      kebab: 92,
      kebabColor: 'hsl(210, 70%, 50%)',
      fries: 153,
      friesColor: 'hsl(29, 70%, 50%)',
      donut: 199,
      donutColor: 'hsl(265, 70%, 50%)'
    },
    {
      country: 'AF',
      'hot dog': 1,
      'hot dogColor': 'hsl(111, 70%, 50%)',
      burger: 48,
      burgerColor: 'hsl(62, 70%, 50%)',
      sandwich: 94,
      sandwichColor: 'hsl(56, 70%, 50%)',
      kebab: 191,
      kebabColor: 'hsl(9, 70%, 50%)',
      fries: 15,
      friesColor: 'hsl(305, 70%, 50%)',
      donut: 180,
      donutColor: 'hsl(28, 70%, 50%)'
    },
    {
      country: 'AG',
      'hot dog': 36,
      'hot dogColor': 'hsl(126, 70%, 50%)',
      burger: 83,
      burgerColor: 'hsl(31, 70%, 50%)',
      sandwich: 188,
      sandwichColor: 'hsl(136, 70%, 50%)',
      kebab: 191,
      kebabColor: 'hsl(211, 70%, 50%)',
      fries: 3,
      friesColor: 'hsl(166, 70%, 50%)',
      donut: 82,
      donutColor: 'hsl(62, 70%, 50%)'
    },
    {
      country: 'AI',
      'hot dog': 84,
      'hot dogColor': 'hsl(159, 70%, 50%)',
      burger: 69,
      burgerColor: 'hsl(60, 70%, 50%)',
      sandwich: 69,
      sandwichColor: 'hsl(250, 70%, 50%)',
      kebab: 18,
      kebabColor: 'hsl(120, 70%, 50%)',
      fries: 106,
      friesColor: 'hsl(16, 70%, 50%)',
      donut: 62,
      donutColor: 'hsl(207, 70%, 50%)'
    },
    {
      country: 'AL',
      'hot dog': 84,
      'hot dogColor': 'hsl(174, 70%, 50%)',
      burger: 4,
      burgerColor: 'hsl(40, 70%, 50%)',
      sandwich: 191,
      sandwichColor: 'hsl(115, 70%, 50%)',
      kebab: 107,
      kebabColor: 'hsl(132, 70%, 50%)',
      fries: 59,
      friesColor: 'hsl(76, 70%, 50%)',
      donut: 29,
      donutColor: 'hsl(193, 70%, 50%)'
    },
    {
      country: 'AM',
      'hot dog': 119,
      'hot dogColor': 'hsl(257, 70%, 50%)',
      burger: 115,
      burgerColor: 'hsl(57, 70%, 50%)',
      sandwich: 1,
      sandwichColor: 'hsl(151, 70%, 50%)',
      kebab: 172,
      kebabColor: 'hsl(175, 70%, 50%)',
      fries: 99,
      friesColor: 'hsl(32, 70%, 50%)',
      donut: 166,
      donutColor: 'hsl(346, 70%, 50%)'
    }
  ];
  return (
    <ResponsiveBar
      data={data}
      keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
      indexBy='country'
      margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
      padding={0.3}
      groupMode='grouped'
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'fries'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'sandwich'
          },
          id: 'lines'
        }
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
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
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
      role='application'
      ariaLabel='Nivo bar chart demo'
      barAriaLabel={(e) =>
        e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
      }
    />
  );
};

export default BarChart;
