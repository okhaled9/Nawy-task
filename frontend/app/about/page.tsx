export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-16 text-center text-5xl font-bold text-blue-950 text-transparent">
        About Nawy
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="transform rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-transform duration-300 hover:scale-105">
          <h2 className="mb-4 text-2xl font-semibold text-blue-600">
            Our Vision
          </h2>
          <p className="leading-relaxed text-gray-700">
            What started out as a collective dream and an innovative idea has
            now become a reality. Finding the right home has always been a
            stressful process, that&apos;s where Nawy comes in. We have helped
            more than 100,000 families easily find the most suitable property to
            turn into a loving home.
          </p>
        </div>

        <div className="transform rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-transform duration-300 hover:scale-105">
          <h2 className="mb-4 text-2xl font-semibold text-teal-600">
            Our Services
          </h2>
          <p className="leading-relaxed text-gray-700">
            As a prop-tech property startup, we offer various services to our
            customers including brokerage and property financing services. The
            property financing or the &quot;Move now, Pay later&quot; service is
            allowing hundreds of families to immediately move into their dream
            houses with payment plans of up to 10 years.
          </p>
        </div>

        <div className="transform rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-transform duration-300 hover:scale-105">
          <h2 className="mb-4 text-2xl font-semibold text-blue-600">
            Leadership
          </h2>
          <p className="leading-relaxed text-gray-700">
            Co-founded by Mostafa El Beltagy, Mohamed Abou Ghanima, Abdel-Azim
            Osman, Ahmed Rafea, and Aly Rafea, Nawy is driven by dedication and
            innovation to be the number one platform for real estate solutions
            in the region.
          </p>
        </div>

        <div className="transform rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-transform duration-300 hover:scale-105">
          <h2 className="mb-4 text-2xl font-semibold text-teal-600">
            Innovation
          </h2>
          <p className="leading-relaxed text-gray-700">
            Currently, we have 200+ employees in numerous departments working
            passionately to deliver exceptional experiences to our customers.
            Nawy has a notable tech team that utilizes machine learning and
            artificial intelligence to develop new cutting edge technologies and
            tools to give our customers personalized recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
