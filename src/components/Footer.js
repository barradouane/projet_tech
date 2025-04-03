import { useState, useEffect } from 'react';
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa';

// Map of location addresses
const locationMap = {
  Calais: "50 Rue Ferdinand Buisson",
  Dunkerque: "220 Av. de l'Université",
  Boulogne: "21 Rue Saint-Louis",
  SaintOmer: "La Malassise, 11 Chem. de la Malassise"
};

export default function Footer({ site = "Calais" }) {
  const [coordinates, setCoordinates] = useState(null);

  // Fetch geocode data when component mounts or the 'site' prop changes
  useEffect(() => {
    const geocodeLocation = async (location) => {
      try {
        const response = await fetch('https://neutrinoapi.net/geocode-address', {
          method: 'POST',
          headers: {
            'User-ID': 'NawalMlk',
            'API-Key': 'QT2BOjy6JXIhtENBCExBz1gSLPO2f6NXe6ixU4Me0vmeOWbU',
          },
          body: new URLSearchParams({
            address: locationMap[location],
            'language-code': 'en',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        console.log('Geocode data:', data); // Debugger pour vérifier les données
        if (data.found > 0) {
          setCoordinates({
            lat: data.locations[0].latitude,
            lng: data.locations[0].longitude,
          });
        } else {
          console.log('No locations found');
        }
      } catch (error) {
        console.error('Error during geocoding:', error);
      }
    };

    geocodeLocation(site);
  }, [site]);

  return (
    <div className="sm:p-12 p-8 mt-6 bg-secondary text-white">
      <div className="flex flex-col justify-center items-center">
        <h4 className="font-bold text-3xl my-3">Contactez-nous</h4>
        <p className="sm:text-2xl text-1xl">École d'Ingénieurs du Littoral Cote d'Opale</p>
        <p>50 Rue Ferdinand Buisson</p>
        <p>CS 30613- 62228 CALAIS CEDEX</p>
        <p>Direction générale : Tél .: 03 21 17 10 05</p>

        {/* OpenStreetMap embedded via iframe with dynamic location */}
        {coordinates && (
          <div className="mt-6 w-full max-w-md h-64">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.01}%2C${coordinates.lat - 0.01}%2C${coordinates.lng + 0.01}%2C${coordinates.lat + 0.01}&layer=mapnik`}
              title="Map"
            ></iframe>
          </div>
        )}

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-6">
          <a href="https://www.instagram.com/ulco.univ/#" className="hover:text-primary transition-colors duration-300">
            <FaInstagram size={24} />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://www.youtube.com/channel/UCx0VyxMXqjmKOxln7Hw-FqQ" className="hover:text-primary transition-colors duration-300">
            <FaYoutube size={24} />
            <span className="sr-only">YouTube</span>
          </a>
          <a href="https://www.facebook.com/ULCO.Univ/" className="hover:text-primary transition-colors duration-300">
            <FaFacebook size={24} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://www.linkedin.com/school/ulco-univ/?originalSubdomain=fr" className="hover:text-primary transition-colors duration-300">
            <FaLinkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
