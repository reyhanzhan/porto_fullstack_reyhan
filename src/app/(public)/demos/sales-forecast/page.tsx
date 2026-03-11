"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Simulated sales data
function generateSalesData() {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return months.map((month, i) => {
    const base = 180000 + i * 15000;
    const seasonal = Math.sin((i / 12) * Math.PI * 2) * 30000;
    const actual = Math.round(base + seasonal + (Math.random() - 0.5) * 20000);
    const forecast = i >= 9 ? Math.round(base + seasonal * 0.8 + 10000) : undefined;

    return {
      month,
      actual: i < 10 ? actual : undefined,
      forecast: forecast ?? (i >= 7 ? Math.round(base + seasonal * 0.8 + 10000) : undefined),
      target: Math.round(base * 1.1),
      enterprise: Math.round(actual * 0.6),
      smb: Math.round(actual * 0.3),
      services: Math.round(actual * 0.1),
    };
  });
}

function generateQuarterlyData() {
  return [
    { quarter: "Q1 2025", revenue: 580000, deals: 45, avgDeal: 12889 },
    { quarter: "Q2 2025", revenue: 720000, deals: 52, avgDeal: 13846 },
    { quarter: "Q3 2025", revenue: 890000, deals: 61, avgDeal: 14590 },
    { quarter: "Q4 2025", revenue: 1050000, deals: 68, avgDeal: 15441 },
  ];
}

type ViewType = "monthly" | "quarterly" | "segments";

export default function SalesForecastDemo() {
  const [view, setView] = useState<ViewType>("monthly");
  const salesData = useMemo(() => generateSalesData(), []);
  const quarterlyData = useMemo(() => generateQuarterlyData(), []);

  const totalRevenue = quarterlyData.reduce((sum, q) => sum + q.revenue, 0);
  const totalDeals = quarterlyData.reduce((sum, q) => sum + q.deals, 0);
  const avgGrowth = 23.5;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/demos"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All Demos
      </Link>

      <div className="mb-8">
        <Badge variant="success" className="mb-3">Live Demo</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Sales Forecasting Dashboard</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Interactive sales analytics with trend analysis and predictive forecasting.
          Data represents a simulated B2B SaaS company.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Annual Revenue",
            value: `$${(totalRevenue / 1e6).toFixed(1)}M`,
            change: `+${avgGrowth}%`,
            up: true,
          },
          { label: "Total Deals", value: totalDeals.toString(), change: "+18%", up: true },
          {
            label: "Avg Deal Size",
            value: `$${Math.round(totalRevenue / totalDeals).toLocaleString()}`,
            change: "+8%",
            up: true,
          },
          { label: "Win Rate", value: "34%", change: "-2%", up: false },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <p className="text-xs text-zinc-500 font-medium">{kpi.label}</p>
              <p className="mt-1 text-2xl font-bold">{kpi.value}</p>
              <div className="mt-1 flex items-center gap-1">
                {kpi.up ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={`text-xs font-medium ${
                    kpi.up ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {kpi.change} YoY
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-fit">
        {(["monthly", "quarterly", "segments"] as ViewType[]).map((v) => (
          <Button
            key={v}
            variant={view === v ? "default" : "ghost"}
            size="sm"
            onClick={() => setView(v)}
            className="capitalize"
          >
            {v}
          </Button>
        ))}
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {view === "monthly" && "Monthly Revenue vs Target (with Forecast)"}
            {view === "quarterly" && "Quarterly Revenue & Deal Volume"}
            {view === "segments" && "Revenue by Segment"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {view === "monthly" ? (
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "none",
                      borderRadius: 8,
                      color: "#fafafa",
                      fontSize: 12,
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#18181b"
                    fill="#18181b"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="Actual Revenue"
                    connectNulls={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.05}
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    name="Forecast"
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#ef4444"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    dot={false}
                    name="Target"
                  />
                </AreaChart>
              ) : view === "quarterly" ? (
                <BarChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === "revenue" ? `$${value.toLocaleString()}` : value,
                      name === "revenue" ? "Revenue" : "Deals",
                    ]}
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "none",
                      borderRadius: 8,
                      color: "#fafafa",
                      fontSize: 12,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#18181b" radius={[4, 4, 0, 0]} name="Revenue" />
                </BarChart>
              ) : (
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "none",
                      borderRadius: 8,
                      color: "#fafafa",
                      fontSize: 12,
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="enterprise"
                    stackId="1"
                    stroke="#18181b"
                    fill="#18181b"
                    fillOpacity={0.7}
                    name="Enterprise"
                  />
                  <Area
                    type="monotone"
                    dataKey="smb"
                    stackId="1"
                    stroke="#71717a"
                    fill="#71717a"
                    fillOpacity={0.5}
                    name="SMB"
                  />
                  <Area
                    type="monotone"
                    dataKey="services"
                    stackId="1"
                    stroke="#a1a1aa"
                    fill="#a1a1aa"
                    fillOpacity={0.3}
                    name="Services"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
