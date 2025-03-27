import Navbar from "./Navbar";
export default function Sante(){
    return(
        <div className="flex flex-col items-center pt-36 min-h-screen pb-20">
        <Navbar />
        <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-2 mb-0 sm:mt-3 mt-0">
            Santé et social à l'EILCO
        </h1>
      
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:w-[90%] w-[85%] mt-6">
        <div className="bg-primary border-[0.6px] border-light p-4 rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
            <ul className="text-light">    
                <h2 className="font-bold text-2xl text-light my-2 text-center">Soutien Psychologique et Médical - SUMPPS</h2>
                <hr className="mb-4"/>
                <li className="text-justify">
  Le <a href="https://www.univ-littoral.fr/campus/campus-pour-tous-egalite-sante/sante/" className="text-red-400 font-bold underline" target="_blank">SUMPPS</a> de l'Université est là pour te soutenir face aux défis émotionnels et médicaux. Si tu te sens seul(e), stressé(e) ou si tu as besoin d'une consultation médicale, tu peux compter sur leur écoute et leur aide.
</li>

                <li className="list-disc ml-2"><strong>Services</strong> : Consultations médicales, psychologie, et bien plus.</li>
                <li className="list-disc ml-2">Présent sur les 4 sites de l’ULCO.</li>
                
            </ul>
        </div>

        <div className="bg-light border-[0.6px] border-light p-4 rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
            <ul className="text-secondary">    
                <h2 className="font-bold text-2xl text-primary my-2 text-center">Soutien par les Étudiants Relais Santé (ERS)</h2>
                <hr className="mb-4 border-secondary"/>
                <li className="text-justify">
                Les Étudiants Relais Santé (ERS) sont là pour t'aider à mieux comprendre et gérer ta santé. Ils organisent des actions de prévention sur des thèmes comme la gestion du stress, la nutrition et la vie affective.
</li>
                <li className="list-disc ml-2">Rejoins-les : Participe à leurs ateliers et forme-toi pour mieux prendre soin de toi.</li>
                
            </ul>
        </div>


        <div className="bg-primary border-[0.6px] border-light p-4 rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
            <ul className="text-light">    
                <h2 className="font-bold text-2xl text-light my-2 text-center">Aide Sociale - Service Social ULCO</h2>
                <hr className="mb-4"/>
                <li className="text-justify">
                En cas de difficultés financières, sociales ou d’isolement, tu peux bénéficier du soutien du service social de l’ULCO. Des assistantes sociales du CROUS sont là pour t’écouter et t'accompagner.
</li>

                <li className="list-disc ml-2"><strong>Contact unique</strong> : 03.20.88.66.27</li>
                
            </ul>
        </div>

        <div className="bg-light border-[0.6px] border-light p-4 rounded-[16px] shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
            <ul className="text-secondary">    
                <h2 className="font-bold text-2xl text-primary my-2 text-center">Étudiants en Situation de Handicap</h2>
                <hr className="mb-4 border-secondary"/>
                <li className="text-justify">
                Si tu es en situation de handicap, tu peux bénéficier de services adaptés : copies de cours, aménagements pour les examens, matériel spécialisé et accompagnement personnalisé.
</li>
                <li className="list-disc ml-2"><strong>Pour les aménagements d'examen</strong> : Contacte Handicap’ULCO dès ton inscription (avant la rentrée) à l'adresse suivante : <span className="text-red-500">handicap.etudiants@univ-littoral.fr</span></li>
                
            </ul>
        </div>
        
        </div>
    </div>
    )
}