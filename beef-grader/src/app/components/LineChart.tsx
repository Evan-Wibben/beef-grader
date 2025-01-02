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
        }[];
    }>({
        labels: [],
        datasets: [{
            data: [],
            borderColor: [],
            backgroundColor: [], 
            pointRadius: 6
        }]
    });

    useEffect(() => {
        if (cows.length === 0) {
            return;
        }

        const sortedCows = [...cows].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        
        const data = sortedCows.map(cow => {
            if (!cow || !cow.created_at) {
                return null;
            }
        
            const bcsScore = parseBCSScore(cow.bcs_score);
            const date = parseISO(cow.created_at);
            if (!isValid(date)) {
                return null;
            }

            return { x: date, y: bcsScore };
        }).filter((item): item is { x: Date; y: number } => item !== null);
        
        const pointColors = data.map(item => getColorForBCS(item.y));

        setChartData({
            labels: data.map(item => format(item.x, 'MM/dd/yyyy')),
            datasets: [{
                data,
                borderColor: Array(data.length).fill('rgba(0, 0, 0, .3)'),
                backgroundColor: pointColors.map(color => color.replace(/rgba\((\d+), (\d+), (\d+), (\d+)\)/, (match, r, g, b) => `rgba(${r}, ${g}, ${b}, 1)`)),
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
                    text: 'BCS Score'
                }
            }
        },
        plugins: {
            legend: {
                display: false, // Hide the legend completely
            },
            tooltip: {
                callbacks: {
                    label(context: TooltipItem<'line'>) {
                        return `BCS Score: ${context.parsed.y}`;
                    }
                }
            }
        }
    };

    return (
        <div className='pb-8'>
            <h2 className="text-center">BCS Progression</h2>
            <div className='h-64 flex flex-col items-center'>
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
    if (score >= 1 && score <= 3) return 'rgba(220, 38, 38, 1)';
    if (score === 4) return 'rgba(255, 206, 86, 1)';
    if (score === 5) return 'rgba(187, 221, 54, 1)';
    if (score === 6) return 'rgba(90, 130, 43, 1)';
    if (score === 7) return 'rgba(54, 162, 235, 1)';
    if (score >= 8 && score <= 9) return 'rgba(220, 38, 38, .5)';
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