import Application from "./Application";
import Navbar from "./Navbar";

export default function Stage() {
    return (
        <div className="flex flex-col items-center pt-36 min-h-screen pb-20">
            <Navbar />
            
            <h1 className="sm:text-4xl text-3xl font-semibold text-secondary sm:mb-6 mb-0">
                Stages et alternances
            </h1>
            
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-10 sm:mx-16 mx-6">
                
                {/* Processus de recherche de stage */}
                <div>
                    <h3 className="text-secondary font-medium text-2xl text-left py-3">
                        Stages : Le processus complet
                    </h3>
                    <hr className="mb-6" />
                    <div className="p-5 sm:mx-4 sm:my-8 my-2 mx-4 relative w-[90%] text-start 
                                shadow-[0_5px_25px_2px_rgba(0,0,0,0.11)] rounded-lg">
                        <ol className="list-decimal list-inside">
                            <li>Complétez votre convention sur <strong>PSTAGE</strong>.</li>
                            <li>Attendez la validation pédagogique de votre convention par le Directeur des Études (DE).</li>
                            <li>Recevez votre convention validée par mail du service ARE.</li>
                            <li>Téléchargez, signez et datez votre convention avant de l’envoyer à l’organisme d’accueil.</li>
                            <li>Récupérez la convention signée et envoyez-la immédiatement au secrétariat administratif du service ARE.</li>
                            <li>Attendez la validation administrative par l’école. Vous recevrez ensuite la convention validée par mail.</li>
                        </ol>
                        <button className="my-4 px-4 py-2 bg-primary text-white rounded-lg">
                            Télécharger le guide complet 2024-2025
                        </button>
                    </div>
                </div>
                
                {/* Alternances */}
                <div>
                    <h3 className="text-secondary font-medium text-2xl text-left py-3">
                        Alternances
                    </h3>
                    <hr className="mb-6" />
                    <div className="p-5 sm:mx-4 sm:my-8 my-2 mx-4 relative w-[90%] text-start 
                                shadow-[0_5px_25px_2px_rgba(0,0,0,0.11)] rounded-lg">
                        <h4 className="text-primary font-medium text-[20px] text-start py-2">C'est quoi ?</h4>
                        <p>L’alternance te permet de te former à un métier pendant tes études et donc de t’intégrer plus facilement à la vie et la culture de l’entreprise.</p>
                        
                        <h4 className="text-red-400 font-medium text-[20px] text-start py-2">Un statut de salarié</h4>
                        <p>Tu auras le statut de salarié. Comme tout autre salarié, tu auras des missions à réaliser, effectueras un travail précis et seras rémunéré sur une base mensuelle.</p>
                    </div>
                </div>
                
                {/* Applications utiles */}
                <div className="applications-utiles">
                    <h3 className="text-secondary font-medium text-2xl text-left py-3">
                        Applications clés
                    </h3>
                    <hr className="mb-6" />
                    
                    <Application 
                        titre="PSTAGE"
                        lien=""
                        description="PSTAGE est l’outil de gestion de conventions de stages pour les étudiants de l’ULCO. Elle est utilisée par les étudiants et les enseignants référents."
                    />
                    
                    <Application 
                        titre="JOB TEASER"
                        lien="https://connect.jobteaser.com/?client_id=e500827d-07fc-4766-97b4-4f960a2835e7..."
                        description="Job Teaser est la plateforme idéale pour accéder à des offres de stage, suivre l'évolution de tes candidatures et gérer l'ensemble de ton parcours professionnel."
                    />
                    
                    <Application 
                        titre="DUNEO"
                        lien="https://www.duneo-cfa.fr/"
                        description="Le rôle de DUNEO est de développer l’ALTERNANCE au sein de l’UNIVERSITE DU LITTORAL COTE D’OPALE. Il sera l’interface entre l’Université, ton employeur et toi."
                    />
                </div>
            </div>
        </div>
    );
}
