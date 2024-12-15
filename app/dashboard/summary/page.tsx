"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TimeFrame, Data } from "@/types/analytics";
import { LineChart } from "@/components/ui/charts/line-chart";
import { BarChart } from "@/components/ui/charts/bar-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomAreaChart } from "@/components/ui/charts/area-chart";
import { PieChart } from "@/components/ui/charts/pie-chart";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function DashboardPage() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const { toast } = useToast();
  const [allData, setAllData] = useState<{ [key in TimeFrame]: Data } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/data`);
        setAllData(response.data);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch analytics data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handleTimeFrameChange = (frame: TimeFrame) => {
    setTimeFrame(frame);
    toast({
      title: "Data Updated",
      description: `Showing ${frame} analytics data`,
      variant: "default",
    });
  };

  const currentData = allData ? allData[timeFrame] : null;

  return (
    <div className="space-y-6 px-8 py-3">
      <Toaster />
      <h1 className="text-3xl font-bold gap-x-5">Analytics Dashboard</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/summary">/summary</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/history">/history</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs
        defaultValue="daily"
        onValueChange={(value) => handleTimeFrameChange(value as TimeFrame)}
      >
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Growth</h2>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <LineChart data={currentData?.userGrowth || []} />
            )}
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Revenue Trends</h2>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <BarChart data={currentData?.revenue || []} />
            )}
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Engagement Metrics</h2>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <CustomAreaChart data={currentData?.engagement || []} />
            )}
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Visitors</h2>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <PieChart data={currentData?.pieChartData || []} />
            )}
          </Card>
        </div>
      </Tabs>
    </div>
  );
}
