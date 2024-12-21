import { ApartmentInterface } from "@/components/ApartmentCard";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import DeleteApartmentButton from "@/components/DeleteApartmentButton";
import ImageGallery from "@/components/ImageGallery";

async function getApartment(id: string): Promise<ApartmentInterface | null> {
  try {
    const res = await fetch(`http://backend:8000/apartments/${id}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching apartment:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApartmentPage({ params }: PageProps) {
  const { id } = await params;
  const apartment = await getApartment(id);

  if (!apartment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button
            as={Link}
            href="/"
            variant="light"
            className="mb-8"
            startContent={<IoArrowBack className="text-xl" />}
          >
            Back to Listings
          </Button>
        </div>
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Apartment Not Found</h1>
          <p className="text-gray-600">
            The apartment you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button
          as={Link}
          href="/"
          variant="light"
          className="mb-8"
          startContent={<IoArrowBack className="text-xl" />}
        >
          Back to Listings
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1.5fr,auto]">
        <ImageGallery images={apartment.images || []} title={apartment.title} />

        <div>
          <h1 className="mb-4 text-3xl font-bold">{apartment.title}</h1>
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Project Details</h2>
            <div className="flex flex-col gap-2 text-gray-600">
              <p>Project: {apartment.project}</p>
              <p>Unit Number: {apartment.unitnumber}</p>
            </div>
          </div>
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-full bg-primary/10 px-4 py-2 text-primary">
              ${apartment.price.toLocaleString()}
            </div>
            <div className="rounded-full bg-gray-100 px-4 py-2">
              {apartment.area} m²
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Location</h2>
            <p className="text-gray-600">{apartment.address}</p>
          </div>

          {apartment.description && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <p className="text-gray-600">{apartment.description}</p>
            </div>
          )}
        </div>

        <div className="flex items-start pt-4">
          <DeleteApartmentButton apartmentId={id} />
        </div>
      </div>
    </div>
  );
}
