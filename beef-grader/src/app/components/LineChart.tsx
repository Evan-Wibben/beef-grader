import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { parseISO, isValid, format } from 'date-fns';
import { TooltipItem } from 'chart.js';

ChartJS.register(...registerables);

interface Cow {
    id: number;
    breed: string;
    age: number;
    notes: string;
    bcs_score: string;
    image_url: string | null;
    created_at: string;
}

interface LineChartProps {
    cows: Cow[];
}

const LineChart: React.FC<LineChartProps> = ({ cows }) => {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            data: { x: Date; y: number }[];
            borderColor: string[]; 
            backgroundColor: string[];
            pointRadius: number; 
            pointBackgroundColor: string[];
        }[];
    }>({
        labels: [],
        datasets: [{
            data: [],
            borderColor: [],
            backgroundColor: [],
            pointBackgroundColor: [],
            pointRadius: 6 
        }]
    });

    useEffect(() => {
        if (cows.length === 0) {
            return;
        }

        const sortedCows = [...cows].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

        const dailyBCSMap = new Map<string, { totalScore: number; count: number }>();

        sortedCows.forEach(cow => {
            if (!cow || !cow.created_at) return;

            const bcsScore = parseBCSScore(cow.bcs_score);
            const date = format(parseISO(cow.created_at), 'yyyy-MM-dd');

            if (!isValid(parseISO(cow.created_at))) return;

            if (!dailyBCSMap.has(date)) {
                dailyBCSMap.set(date, { totalScore: 0, count: 0 });
            }

            const entry = dailyBCSMap.get(date)!;
            entry.totalScore += bcsScore;
            entry.count += 1;
        });

        const labels = Array.from(dailyBCSMap.keys());
        const averagedData = labels.map(date => {
            const entry = dailyBCSMap.get(date)!;
            return { x: new Date(date), y: entry.totalScore / entry.count };
        });

        const pointColors = averagedData.map(item => getColorForBCS(item.y));

        setChartData({
            labels,
            datasets: [{
                data: averagedData,
                borderColor: Array(labels.length).fill('rgba(0, 0, 0, .4)'), 
                backgroundColor: pointColors.map(color => color.replace(/rgba\((\d+), (\d+), (\d+), (\d+)\)/, (match, r, g, b) => `rgba(${r}, ${g}, ${b}, 0.2)`)),
                pointBackgroundColor: pointColors,
                pointRadius: 6
            }]
        });
    }, [cows]);

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'category' as const,
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                beginAtZero: true,
                max: 9,
                ticks: {
                    stepSize: 1
                },
                title: {
                    display: true,
                    text: 'Average BCS Score'
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label(context: TooltipItem<'line'>) {
                        return `Average BCS Score: ${context.parsed.y}`;
                    }
                }
            }
        }
    };

    return (
        <div className='pb-8'>
            <h2 className="text-center">Average BCS Progression</h2>
            <div className='flex flex-col items-center'>
                {chartData.datasets[0].data.length > 0 ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <p>No data available for BCS Score chart.</p>
                )}
            </div>
        </div>
    );
};

function getColorForBCS(score: number): string {
    if (score >= 1 && score <= 3) return 'rgb(154, 41, 0)';
    if (score >= 4 && score <= 4.9) return 'rgb(255, 208, 101)';
    if (score >= 5 && score <= 5.9) return 'rgb(153, 210, 221)';
    if (score >= 6 && score <= 6.9) return 'rgb(120, 199, 28)';
    if (score >= 7 && score <= 7.9) return 'rgb(255, 208, 101)';
    if (score >= 8 && score <= 9) return 'rgb(154, 41, 0)';
    return 'rgba(128, 128, 128, 1)';
}

function parseBCSScore(score: string): number {
    if (score === 'Beef 1-3') return 2; 
    if (score === 'Beef 4') return 4; 
    if (score === 'Beef 5') return 5; 
    if (score === 'Beef 6') return 6; 
    if (score === 'Beef 7') return 7; 
    if (score === 'Beef 8-9') return 8.5; 
    return NaN; 
}

export default LineChart;