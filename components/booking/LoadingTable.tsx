"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingTable = ({ rows }: { rows?: number }) => {
  const tableRow = Array.from({ length: rows || 5 }, (_, index) => {
    return (
      <div className="mb-8 text-center" key={index}>
        <Skeleton className="w-full h-8 rounded" />
      </div>
    );
  });

  return <>{tableRow}</>;
};

export default LoadingTable;
