"use client";

import { Button } from "@nextui-org/react";

interface EmptyProps {
  onAddClick: () => void;
  onClearSearch: () => void;
}

export default function Empty({ onAddClick, onClearSearch }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 text-4xl">🏠</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        No Apartments Found
      </h3>
      <p className="mb-6 text-center text-sm text-gray-600">
        There are currently no apartments available.
        <br />
        Please check back later.
      </p>
      <div className="flex gap-4">
        <Button variant="light" onPress={onClearSearch}>
          Clear Search
        </Button>
        <Button color="primary" onPress={onAddClick}>
          Create Apartment
        </Button>
      </div>
    </div>
  );
}
