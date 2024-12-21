"use client";

import { Button } from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";

interface HomeHeaderProps {
  onAddClick: () => void;
}

export default function HomeHeader({ onAddClick }: HomeHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Available Apartments</h1>
      <Button
        color="primary"
        startContent={<IoAdd className="text-xl" />}
        onPress={onAddClick}
      >
        Add Apartment
      </Button>
    </div>
  );
}
