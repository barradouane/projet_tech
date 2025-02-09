export default function NewsData(props){
    return(
        <div className="p-2 sm:mx-4 sm:my-8 my-2 mx-4 relative sm:w-[34%] w-[90%] text-start shadow-[0_5px_25px_2px_rgba(0,0,0,0.11)] rounded-lg cursor-pointer">
            <div className="h-48 rounded-lg overflow-hidden">
                <img className="w-full h-full transition-all duration-300 ease-in-out rounded-lg hover:transform hover:scale-[1.3]" src={props.image} alt="image"/>
            </div>
            <h4 className="text-primary font-medium text-2xl text-center py-3">{props.heading}</h4>
            <p className="font-medium text-justify p-2">{props.text}</p>

        </div>
    )
}