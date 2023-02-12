import Image from "next/image"
import cardimg1 from '../../public/Wolf3.png';

function AproposComponent(){
    return(<>

    <div class="bg-gray-900 h-screen flex flex-col items-center justify-center">
   
      <div class=" w-1/2">
         
        <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 text-lg">
          <Image src={cardimg1} alt="Service 1" class="w-full h-60 rounded-md"/> 
          <h1 class="text-3xl font-bold text-center mb-6">À propos de nous</h1>
          <p class="text-gray-200 leading-normal mb-4">
            Nous sommes une entreprise axée sur la satisfaction du client et la
            qualité des produits. Nous croyons en la force de l&apos;innovation et
            en l&apos;importance de fournir des solutions de haute qualité à nos
            clients.
          </p>
          <p class="text-gray-200 leading-normal mb-4">
            Nous nous efforçons constamment d&apos;améliorer nos produits et
            services pour répondre aux besoins en constante évolution de nos
            clients. Nous sommes fiers de notre équipe de professionnels
            dévoués et talentueux qui travaillent dur pour garantir le succès
            de nos clients.
          </p>
          <p class="text-gray-200 leading-normal mb-4">
            Nous sommes impatients de vous aider à atteindre vos objectifs
            commerciaux grâce à nos produits et services de qualité supérieure.
            N&apos;hésitez pas à nous contacter pour en savoir plus sur ce que nous
            pouvons faire pour vous.
          </p>
        </div>
      </div>
    </div>

    
    
    </>)
}

export default AproposComponent