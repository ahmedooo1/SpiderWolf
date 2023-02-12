import Image from "next/image";
import cardimg2 from '../../public/spider1.png';

function ContactComponent() {
    return (
      <div class="bg-gray-900 max-h-full flex items-center justify-center w-full ">
        <div class=" w-full max-w-sm ">
          <div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 m-4">
          <Image src={cardimg2} alt="Service 1" class="w-full h-40 rounded-md"/> 

            <h1 class="text-3xl font-bold text-center mb-6">Nous contacter</h1>
            <form class="w-full">
              <div class="mb-4">
                <label class="block text-gray-200 font-bold mb-2" for="name">
                  Nom
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Nom"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-200 font-bold mb-2" for="email">
                  Email
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-200 font-bold mb-2" for="message">
                  Message
                </label>
                <textarea
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  id="message"
                  placeholder="Message"
                />
              </div>
              <div class="flex items-center justify-center">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  export default ContactComponent
  