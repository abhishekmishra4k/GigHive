'use client';

import { Sparkline, SparklineChart as TremorSparklineChart } from '@tremor/react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';

type SparklineChartProps = {
    data: { x: number; y: number }[];
    color: string;
}

export function SparklineChart({ data, color }: SparklineChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                 <defs>
                    <linearGradient id={`color-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Tooltip 
                    contentStyle={{ display: 'none' }}
                    cursor={{ stroke: color, strokeWidth: 1 }}
                />
                <Area 
                    type="monotone" 
                    dataKey="y" 
                    stroke={color}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#color-${color})`}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
