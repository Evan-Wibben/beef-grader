// Pie Chart for BCS
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Cow {
    id: number;
    breed: string;
    age: number;
    notes: string;
    bcs_score: string;
    image_url: string | null;
}

interface PieChartProps {
    cows: Cow[];
}

const PieChart: React.FC<PieChartProps> = ({ cows }) => {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    }>({
        labels: [],
        datasets: [{
            label: 'Cow Classification',
            data: [],
            backgroundColor: []
        }]
    });

    const classificationColors: { [key: string]: string } = {
        'Beef 1-3': 'rgba(220, 38, 38, 1)',
        'Beef 4': 'rgba(255, 206, 86, 0.6)',
        'Beef 5': 'rgba(75, 192, 192, 0.6)',
        'Beef 6': 'rgba(90, 130, 43, .6)',
        'Beef 7': 'rgba(54, 162, 235, 0.6)',
        'Beef 8-9': 'rgba(220, 38, 38, .5)',
    };

    useEffect(() => {
        const classificationCounts: { [key: string]: number } = {};
        
        cows.forEach(cow => {
            const classification = cow.bcs_score;
            if (classification) {
                classificationCounts[classification] = (classificationCounts[classification] || 0) + 1;
            }
        });

        const labels = Object.keys(classificationCounts);
        const data = Object.values(classificationCounts);
        
        const backgroundColors = labels.map(label => classificationColors[label] || 'rgba(200, 200, 200, 0.6)');

        setChartData({
            labels,
            datasets: [{
                label: 'Cow Classification',
                data,
                backgroundColor: backgroundColors,
            }]
        });
    }, [cows]);

    return (
        <div className='pb-8'>
            <h2 className="text-center">Classification Distribution</h2>
            <div className='h-64 flex flex-col items-center'>
                <Pie data={chartData} />
            </div>
        </div>
    );
};

export default PieChart;