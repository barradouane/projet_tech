import { useLocation, useNavigate } from "react-router-dom";

export default function EventDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p className="text-center text-red-500">Aucun événement trouvé.</p>;
  }

  return (
    <div className="p-4 sm:mx-20 mx-4 text-[#2a2a2a]">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-primary text-white rounded-lg"
      >
        ← Retour
      </button>
      <div className="h-64 rounded-lg overflow-hidden">
        <img className="w-full h-full object-cover" src={state.image} alt="image" />
      </div>
      <h2 className="text-4xl font-medium text-center text-secondary py-4">{state.heading}</h2>
      <h4 className="text-lg font-medium italic text-secondary text-center">{state.date}</h4>
      <p className="text-justify text-base py-4">{state.text}</p>

      {state.eventsDataDetailed && (
        <div className="bg-light p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-primary mb-2">Détails supplémentaires</h3>
          <p>{state.eventsDataDetailed}</p>
        </div>
      )}
    </div>
  );
}
