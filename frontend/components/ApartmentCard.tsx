import Image from "next/image";

interface ApartmentImage {
  id: number;
  path: string;
  apartmentId: number;
}

export interface ApartmentInterface {
  id: number;
  title: string;
  address: string;
  description?: string;
  area: number;
  price: number;
  images?: ApartmentImage[];
}

export default function ApartmentCard({
  apartment
}: {
  apartment: ApartmentInterface;
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative aspect-video bg-gray-200">
        {apartment.images?.[0] && (
          <Image
            src={`http://localhost:8000/static/${apartment.images[0].path}`}
            alt={apartment.title}
            width={640}
            height={360}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{apartment.title}</h3>
        <p className="mb-2 text-sm text-gray-600">{apartment.address}</p>
        {apartment.description && (
          <p className="mb-3 text-sm text-gray-700">{apartment.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">{apartment.area}</span>
            <span className="text-gray-500"> m²</span>
          </div>
          <div className="font-semibold text-primary">
            ${apartment.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
