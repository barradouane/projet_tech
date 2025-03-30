import { useNavigate } from "react-router-dom";

export default function EventsData(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${props.id}`, {
      state: {
        image: props.image,
        heading: props.heading,
        date: props.date,
        text: props.text,
        eventsDataDetailed: props.eventsDataDetailed,
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="p-2 sm:mx-4 sm:my-8 my-2 mx-4 relative w-[90%] text-start shadow-[0_5px_25px_2px_rgba(0,0,0,0.11)] rounded-lg cursor-pointer"
    >
      <div className="h-48 rounded-lg overflow-hidden">
        <img
          className="w-full h-full transition-all duration-300 ease-in-out rounded-lg hover:transform hover:scale-[1.3]"
          src={props.image}
          alt="image"
        />
      </div>
      <h4 className="text-primary font-medium text-2xl text-center py-3">{props.heading}</h4>
      <h6 className="inline-block bg-light text-left px-4 rounded-lg font-medium text-secondary italic">
        {props.date}
      </h6>
      <p className="font-medium text-justify p-2">{props.text}</p>
    </div>
  );
}
