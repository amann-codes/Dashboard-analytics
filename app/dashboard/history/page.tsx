"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { TimeFrame } from "@/types/analytics";
import { DataTable } from "@/components/ui/data-table";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card } from "@/components/ui/card";
import axios from "axios";

export default function HistoryPage() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("none");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/data`);
        setData(response.data);

        toast({
          title: "Data Loaded",
          description: "Analytics data fetched successfully.",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
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
  }, [timeFrame]);

  const handleTimeFrameChange = (value: TimeFrame) => {
    setTimeFrame(value);
    toast({
      title: "Time Frame Changed",
      description: `Displaying ${value} data.`,
    });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    toast({
      title: "Sorting Applied",
      description: `Sorting data by ${value}.`,
    });
  };

  const handleFilterChange = (value: string) => {
    setFilterRegion(value);
    toast({
      title: "Filter Applied",
      description: `Filtering data by region: ${value}.`,
    });
  };

  const processData = (dataCategory: any) => {
    let processedData = [...dataCategory];
    if (sortOption === "valueAsc") {
      processedData.sort((a, b) => a.value - b.value);
    } else if (sortOption === "valueDesc") {
      processedData.sort((a, b) => b.value - a.value);
    }
    return processedData;
  };

  const currentData = data ? data[timeFrame] : null;

  return (
    <div className="space-y-6 px-8 py-3">
      <Toaster />
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
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
      <Card className="p-6 space-y-6">
        <div className="flex gap-4">
          <Select
            value={timeFrame}
            onValueChange={(value) => handleTimeFrameChange(value as TimeFrame)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOption}
            onValueChange={(value) => handleSortChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="valueAsc">Ascending</SelectItem>
              <SelectItem value="valueDesc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : currentData ? (
          <>
            <DataTable
              data={processData(currentData.revenue)}
              title="Revenue Data"
            />
            <DataTable
              data={processData(currentData.userGrowth)}
              title="User Growth Data"
            />
            <DataTable
              data={processData(currentData.engagement)}
              title="Engagement Data"
            />
          </>
        ) : (
          <p>No data available.</p>
        )}
      </Card>
    </div>
  );
}
