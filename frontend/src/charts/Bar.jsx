import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Stimulations',
        },

    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};

const labels = ['1st simulation', '2nd simulation', '3rd simulation'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Avg. Fleet Efficiency',
            data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(231, 164, 150, 1)',
        },
        {
            label: 'Avg. Operational',
            data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(225, 100, 73, 1)',
        }, 
        {
            label: 'Avg. Env. Impact',
            data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(246, 236, 234, 1)',
        },
        
        {
            label: 'Avg. General',
            data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
    ],
};

const BarChart = () => {
    return <Bar options={options} data={data} />;
};
export default BarChart;