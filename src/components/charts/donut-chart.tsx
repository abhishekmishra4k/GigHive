'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Label, Pie, PieChart, Cell } from 'recharts';

type DonutChartProps = {
    data: {
        status: string;
        value: number;
        fill: string;
    }[]
}

export function DonutChart({ data }: DonutChartProps) {
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
        <ChartContainer
            config={{}}
            className="mx-auto aspect-square h-full max-h-[250px]"
        >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="status"
            innerRadius="60%"
            strokeWidth={5}
          >
             <Label
                content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                    <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                        >
                        {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                        >
                        Applications
                        </tspan>
                    </text>
                    )
                }
                }}
            />
             {data.map((entry) => (
                <Cell key={`cell-${entry.status}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm mt-4">
        {data.map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-muted-foreground">{item.status} ({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
