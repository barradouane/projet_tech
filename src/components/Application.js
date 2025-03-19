export default function Application(props) {
    const handleRedirect = () => {
        if (props.lien) {
            window.location.href = props.lien;
        } else {
            console.error("Pas de lien donné!");
        }
    };

    return ( 
        <div className="p-4 sm:mx-4 my-4 mx-4 relative w-[90%] text-start shadow-[0_5px_25px_2px_rgba(0,0,0,0.11)] rounded-lg cursor-pointer" onClick={handleRedirect}>
            <h4 className="text-primary font-medium text-[20px] text-center py-2">{props.titre}</h4>
            <p className="font-light text-justify p-2">
                {props.description}
            </p>
        </div>
    );
}
