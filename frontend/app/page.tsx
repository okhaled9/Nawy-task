import { ApartmentInterface } from "../components/ApartmentCard";
import ApartmentCard from "../components/ApartmentCard";
import Empty from "../components/Empty";

async function getApartments(): Promise<ApartmentInterface[]> {
  try {
    const res = await fetch("http://localhost:8000/apartments", {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.log("fetching error");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching apartments:", error);
    return [];
  }
}

export default async function Home() {
  const apartments = await getApartments();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Available Apartments</h1>
      {apartments.length === 0 ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      )}
    </main>
  );
}
