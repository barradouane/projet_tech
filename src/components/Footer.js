import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";

const locationMap = {
  Calais: "50 Rue Ferdinand Buisson, Calais, France",
  Dunkerque: "Dunkerque, France",
  Boulogne: "Boulogne-sur-Mer, France",
  "Saint-Omer": "Saint-Omer, France",
};

export default function Footer({ site = "Calais" }) {
  const location = locationMap[site] || locationMap["Calais"];
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(location)}`;

  return (
    <div className="sm:p-12 p-8 mt-6 bg-secondary text-white">
      <div className="flex flex-col justify-center items-center">
        <h4 className="font-bold text-3xl my-3">Contactez-nous</h4>
        <p className="sm:text-2xl text-1xl">École d'Ingénieurs du Littoral Cote d'Opale</p>
        <p>50 Rue Ferdinand Buisson</p>
        <p>CS 30613- 62228 CALAIS CEDEX</p>
        <p>Direction générale : Tél .: 03 21 17 10 05</p>

        {/* Embedded Google Map */}
        <div className="mt-6 w-full max-w-md h-64">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

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
