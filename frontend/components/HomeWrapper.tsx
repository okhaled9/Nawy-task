"use client";

import { useState } from "react";
import AddApartmentModal from "./AddApartmentModal";
import HomeHeader from "./HomeHeader";
import Empty from "./Empty";
import { ApartmentInterface } from "./ApartmentCard";
import ApartmentCard from "./ApartmentCard";

interface HomeWrapperProps {
  apartments: ApartmentInterface[];
}

export default function HomeWrapper({ apartments }: HomeWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HomeHeader onAddClick={() => setIsModalOpen(true)} />
      {apartments.length === 0 ? (
        <Empty onAddClick={() => setIsModalOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apartments.map((apartment) => (
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
