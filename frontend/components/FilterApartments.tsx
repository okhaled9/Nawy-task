"use client";

import { Input } from "@nextui-org/react";
import { useState } from "react";
import { ApartmentInterface } from "./ApartmentCard";

interface FilterApartmentsProps {
  apartments: ApartmentInterface[];
  onFilterChange: (filtered: ApartmentInterface[]) => void;
}

export default function FilterApartments({
  apartments,
  onFilterChange
}: FilterApartmentsProps) {
  const [filters, setFilters] = useState({
    title: "",
    project: "",
    unitnumber: ""
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const filtered = apartments.filter((apartment) => {
      const titleMatch =
        !newFilters.title ||
        apartment.title.toLowerCase().includes(newFilters.title.toLowerCase());
      const projectMatch =
        !newFilters.project ||
        apartment.project
          .toLowerCase()
          .includes(newFilters.project.toLowerCase());
      const unitMatch =
        !newFilters.unitnumber ||
        apartment.unitnumber
          .toLowerCase()
          .includes(newFilters.unitnumber.toLowerCase());

      return titleMatch && projectMatch && unitMatch;
    });

    onFilterChange(filtered);
  };

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Input
        label="Title"
        placeholder="Filter by title"
        value={filters.title}
        onChange={(e) => handleFilterChange("title", e.target.value)}
      />
      <Input
        label="Project"
        placeholder="Filter by project"
        value={filters.project}
        onChange={(e) => handleFilterChange("project", e.target.value)}
      />
      <Input
        label="Unit Number"
        placeholder="Filter by unit number"
        value={filters.unitnumber}
        onChange={(e) => handleFilterChange("unitnumber", e.target.value)}
      />
    </div>
  );
}
