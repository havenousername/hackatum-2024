import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { faker } from '@faker-js/faker';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Customer", "Business"],
    datasets: [
      {
        data: [faker.number.int({ min: 0, max: 100 }),faker.number.int({ min: 0, max: 100 })],
        backgroundColor: [
          'rgba(239, 187, 176, 1)',
          'rgba(225, 100, 73, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={data} />
  )
}

export default PieChart;