import Image from "next/image"
import cardimg1 from '../../public/Wolf3.png';
import cardimg2 from '../../public/spider1.png';
import cardimg3 from '../../public/Wolf-face.png';
function SectionCards(){
    return(<>
    {/* la deuxieme sections dans home page (les cards) */}
    <section class="dark:bg-gray-900 py-12">
<div class="container mx-auto px-6">
  <h2 class="text-3xl font-bold mb-8">Nos services</h2>
  <div class="flex flex-wrap -mx-4">
    <div class="w-full md:w-1/3 px-4 mb-8  ">
      <div class="bg-gradient-to-br from-pink-400 to-blue-600 cursor-pointer rounded shadow-lg hover:shadow-2xl transition-all duration-300">
        <Image src={cardimg1} alt="Service 1" class="w-full h-60"/> 
        <div class="px-6 py-4">
          <h3 class="text-xl font-bold mb-2">Service 1</h3>
          <p class="text-white text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, est eget bibendum commodo, velit velit convallis velit, at tempor nulla ipsum eget metus.</p>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-4 mb-8 ">
      <div class="bg-gradient-to-br from-pink-400 to-blue-600 cursor-pointer rounded shadow-lg hover:shadow-2xl transition-all duration-300">
      <Image src={cardimg2} alt="Service 1" class="w-full h-60"/> 

        <div class="px-6 py-4">
          <h3 class="text-xl font-bold mb-2">Service 2</h3>
          <p class="text-white text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, est eget bibendum commodo, velit velit convallis velit, at tempor nulla ipsum eget metus.</p>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-4 mb-8 ">
      <div class="bg-gradient-to-br from-pink-400 to-blue-600 cursor-pointer rounded shadow-lg hover:shadow-2xl transition-all duration-300">
      <Image src={cardimg3} alt="Service 1" class="w-full h-60"/> 

        <div class="px-6 py-4">
          <h3 class="text-xl font-bold mb-2">Service 3</h3>
          <p class="text-white text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, est eget bibendum commodo, velit velit convallis velit, at tempor nulla ipsum eget metus.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
    </>)
}
export default SectionCards