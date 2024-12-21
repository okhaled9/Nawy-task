"use client";

import { Input } from "@nextui-org/react";
import { useState, forwardRef, useImperativeHandle } from "react";
import { ApartmentInterface } from "./ApartmentCard";

export interface FilterApartmentsRef {
  clearFilters: () => void;
}

interface FilterApartmentsProps {
  apartments: ApartmentInterface[];
  onFilterChange: (filtered: ApartmentInterface[]) => void;
  onClearFilters?: () => void;
}

const FilterApartments = forwardRef<FilterApartmentsRef, FilterApartmentsProps>(
  ({ apartments, onFilterChange, onClearFilters }, ref) => {
    const [filters, setFilters] = useState({
      title: "",
      project: "",
      unitnumber: ""
    });

    const [noMatches, setNoMatches] = useState({
      title: false,
      project: false,
      unitnumber: false
    });

    useImperativeHandle(ref, () => ({
      clearFilters: () => {
        const emptyFilters = {
          title: "",
          project: "",
          unitnumber: ""
        };
        setFilters(emptyFilters);
        setNoMatches({
          title: false,
          project: false,
          unitnumber: false
        });
        onFilterChange(apartments);
        if (onClearFilters) {
          onClearFilters();
        }
      }
    }));

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);

      // Reset noMatches state
      const newNoMatches = {
        title: false,
        project: false,
        unitnumber: false
      };

      // Check each non-empty filter for matches
      if (newFilters.title) {
        newNoMatches.title = !apartments.some((apartment) =>
          apartment.title.toLowerCase().includes(newFilters.title.toLowerCase())
        );
      }
      if (newFilters.project) {
        newNoMatches.project = !apartments.some((apartment) =>
          apartment.project
            .toLowerCase()
            .includes(newFilters.project.toLowerCase())
        );
      }
      if (newFilters.unitnumber) {
        newNoMatches.unitnumber = !apartments.some((apartment) =>
          apartment.unitnumber
            .toLowerCase()
            .includes(newFilters.unitnumber.toLowerCase())
        );
      }

      setNoMatches(newNoMatches);

      const filtered = apartments.filter((apartment) => {
        const titleMatch =
          !newFilters.title ||
          apartment.title
            .toLowerCase()
            .includes(newFilters.title.toLowerCase());
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
      <div className="mb-8 rounded-lg border border-gray-200 p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Search and Filter</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            label="Title"
            placeholder="Filter by title"
            value={filters.title}
            isInvalid={noMatches.title}
            errorMessage={noMatches.title ? "No matches found" : ""}
            onChange={(e) => handleFilterChange("title", e.target.value)}
          />
          <Input
            label="Project"
            placeholder="Filter by project"
            value={filters.project}
            isInvalid={noMatches.project}
            errorMessage={noMatches.project ? "No matches found" : ""}
            onChange={(e) => handleFilterChange("project", e.target.value)}
          />
          <Input
            label="Unit Number"
            placeholder="Filter by unit number"
            value={filters.unitnumber}
            isInvalid={noMatches.unitnumber}
            errorMessage={noMatches.unitnumber ? "No matches found" : ""}
            onChange={(e) => handleFilterChange("unitnumber", e.target.value)}
          />
        </div>
      </div>
    );
  }
);

FilterApartments.displayName = "FilterApartments";

export default FilterApartments;
