
'use client';

// import { BarChart, LineChart, TrendingUp, Smile } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartLegend,
//   ChartLegendContent,
// } from '@/components/ui/chart';
// import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Line, LineChart as RechartsLineChart, ResponsiveContainer } from 'recharts';
// import type { ChartConfig } from '@/components/ui/chart';
// import { useEffect, useState } from 'react';

// const moodData = [
//   { date: 'Mon', moodLevel: 7 },
//   { date: 'Tue', moodLevel: 6 },
//   { date: 'Wed', moodLevel: 8 },
//   { date: 'Thu', moodLevel: 7 },
//   { date: 'Fri', moodLevel: 9 },
//   { date: 'Sat', moodLevel: 8 },
//   { date: 'Sun', moodLevel: 7 },
// ];

// const symptomSeverityData = [
//   { month: 'Jan', severity: 8 },
//   { month: 'Feb', severity: 7 },
//   { month: 'Mar', severity: 6 },
//   { month: 'Apr', severity: 5 },
//   { month: 'May', severity: 4 },
//   { month: 'Jun', severity: 3 },
// ];

// const moodChartConfig = {
//   moodLevel: {
//     label: 'Mood Level (1-10)',
//     color: 'hsl(var(--chart-1))',
//   },
// } satisfies ChartConfig;

// const symptomChartConfig = {
//   severity: {
//     label: 'Symptom Severity (1-10)',
//     color: 'hsl(var(--chart-2))',
//   },
// } satisfies ChartConfig;

export function ProgressVisualization() {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return (
  //     <div className="space-y-6">
  //       <Card className="shadow-lg">
  //         <CardHeader>
  //           <CardTitle className="text-xl font-semibold">Loading Charts...</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <p className="text-muted-foreground">Please wait while the charts are being prepared.</p>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }
  
  return (
    // <div className="space-y-8 py-4">
    //   <Card className="shadow-lg">
    //     <CardHeader>
    //       <CardTitle className="text-xl font-semibold flex items-center">
    //         <Smile className="mr-2 h-6 w-6 text-primary" /> Weekly Mood Tracker
    //       </CardTitle>
    //       <CardDescription>Visualize your mood levels over the past week. (Mock Data)</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <ChartContainer config={moodChartConfig} className="h-[300px] w-full">
    //         <RechartsBarChart accessibilityLayer data={moodData}>
    //           <CartesianGrid vertical={false} />
    //           <XAxis
    //             dataKey="date"
    //             tickLine={false}
    //             tickMargin={10}
    //             axisLine={false}
    //             tickFormatter={(value) => value.slice(0, 3)}
    //           />
    //           <YAxis domain={[0, 10]} />
    //           <ChartTooltip content={<ChartTooltipContent />} />
    //           <ChartLegend content={<ChartLegendContent />} />
    //           <Bar dataKey="moodLevel" fill="var(--color-moodLevel)" radius={4} />
    //         </RechartsBarChart>
    //       </ChartContainer>
    //     </CardContent>
    //   </Card>

    //   <Card className="shadow-lg">
    //     <CardHeader>
    //       <CardTitle className="text-xl font-semibold flex items-center">
    //         <TrendingUp className="mr-2 h-6 w-6 text-primary" /> Symptom Severity Over Time
    //       </CardTitle>
    //       <CardDescription>Track changes in symptom severity over the months. (Mock Data)</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <ChartContainer config={symptomChartConfig} className="h-[300px] w-full">
    //         <RechartsLineChart accessibilityLayer data={symptomSeverityData} margin={{ left: 12, right: 12 }}>
    //           <CartesianGrid vertical={false} />
    //           <XAxis
    //             dataKey="month"
    //             tickLine={false}
    //             axisLine={false}
    //             tickMargin={8}
    //             tickFormatter={(value) => value.slice(0, 3)}
    //           />
    //           <YAxis domain={[0, 10]} />
    //           <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
    //           <ChartLegend content={<ChartLegendContent />} />
    //           <Line
    //             dataKey="severity"
    //             type="monotone"
    //             stroke="var(--color-severity)"
    //             strokeWidth={3}
    //             dot={{
    //               fill: "var(--color-severity)",
    //             }}
    //             activeDot={{
    //               r: 6,
    //             }}
    //           />
    //         </RechartsLineChart>
    //       </ChartContainer>
    //     </CardContent>
    //   </Card>
    // </div>
    <div>
      {/* Content will be handled by PastAnalysesDisplay */}
    </div>
  );
}
