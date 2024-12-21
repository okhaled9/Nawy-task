"use client";

import { useRef, useState } from "react";
import AddApartmentModal from "./AddApartmentModal";
import FilterApartments, { FilterApartmentsRef } from "./FilterApartments";
import HomeHeader from "./HomeHeader";
import Empty from "./Empty";
import { ApartmentInterface } from "./ApartmentCard";
import ApartmentCard from "./ApartmentCard";

interface HomeWrapperProps {
  apartments: ApartmentInterface[];
}

export default function HomeWrapper({ apartments }: HomeWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredApartments, setFilteredApartments] = useState(apartments);
  const filterRef = useRef<FilterApartmentsRef>(null);

  return (
    <>
      <HomeHeader onAddClick={() => setIsModalOpen(true)} />
      <FilterApartments
        ref={filterRef}
        apartments={apartments}
        onFilterChange={setFilteredApartments}
      />
      {filteredApartments.length === 0 ? (
        <Empty
          onAddClick={() => setIsModalOpen(true)}
          onClearSearch={() => filterRef.current?.clearFilters()}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredApartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      )}
      <AddApartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
