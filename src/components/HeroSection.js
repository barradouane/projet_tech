import heroImage from '../assets/images/hero1.jpg';
import heroImage2 from '../assets/images/hero.jpg';
import heroImage3 from '../assets/images/heroPicture.jpg';

export default function HeroSection() {
  return (
    <div className="m-0 p-0">
    <div
      className="flex items-center justify-center w-full sm:h-screen h-[400px] bg-cover bg-center my-0"
      style={{ backgroundImage: `url(${heroImage3})` }}
    >
    
    
   </div>

   <div className="sm:my-1 my-1 sm:mx-28 mx-8">
    <div className=" flex sm:flex-row flex-col items-center justify-between sm:mt-[60px] mt-[10px]">
        <div className=" mx-2 sm:w-[50%] w-full text-center sm:text-left text-[1.1rem]">
        <h2 className=" sm:text-[45px] text-[40px] font-medium text-secondary pb-4 pt-0">Bienvenue Malki Nawal</h2>
          <p className="text-justify sm:pr-5 pr-0">Explore ton espace étudiant, conçu pour répondre à tous tes besoins quotidiens !
Retrouve facilement tes cours, actualités, outils, et plus encore sur une interface intuitive et moderne, pensée pour simplifier ta vie à <span className='text-primary font-extrabold '>EILCO</span>. Gagne du temps et reste connecté à l'essentiel, que ce soit sur ton ordinateur ou ton smartphone.</p>  
        </div>
        <div className="relative sm:w-1/2 w-full my-7 flex flex-col items-start z-[-99] sm:mt-0 mt-[40px]">
            <img alt="img" src={heroImage} className="sm:h-[400px] h-[260px] w-1/2 object-cover rounded-[6px] shadow-[rgba(0,0,0,0.19)_-1px_1px_62px_-18px] mb-4
"/>
            <img alt="img" src={heroImage2} className="absolute top-[-8%] right-[-4px] sm:h-[400px] h-[260px] w-1/2 object-cover rounded-[6px] shadow-[rgba(0,0,0,0.19)_-1px_1px_62px_-18px] mb-4
"/>
        </div>
    </div>
    </div>
  

</div>
  );
}
