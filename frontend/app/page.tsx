import { ApartmentInterface } from "../components/ApartmentCard";
import HomeWrapper from "../components/HomeWrapper";

async function getApartments(): Promise<ApartmentInterface[]> {
  try {
    const res = await fetch("http://backend:8000/apartments");

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
      <HomeWrapper apartments={apartments} />
    </main>
  );
}
