"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="grid md:grid-cols-2 gap-8 mt-4">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <Skeleton className="w-[150px] h-4 mb-2" />
                  <Skeleton className="w-[100px] h-4 " />
                </div>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </section>
  );
};

export default Loading;
