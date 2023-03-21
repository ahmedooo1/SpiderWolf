import Image from "next/image";
import cardimg2 from '../../public/spider1.png';

function ContactComponent() {
  return (
    <div className="max-h-full flex items-center justify-center w-full ">
      <div className="w-full max-w-xl">
        <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 m-4">
          <Image src={cardimg2} alt="Service 1" className="w-full h-40 rounded-md" />

          <h1 className="text-3xl font-bold text-center mb-6 text-gray-200">Nous contacter</h1>
          <form className="w-full max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-200 font-bold mb-2" htmlFor="name">
                Nom
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-900"
                id="name"
                type="text"
                placeholder="Nom"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-900"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 bg-gray-900"
                id="message"
                placeholder="Message"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default ContactComponent;
