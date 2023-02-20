function SignUpForm() {
    return (
      <div className="bg-gray-900 h-screen w-screen flex items-center justify-center">
        <div className="w-full max-w-sm">
          <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-white  mb-2 text-xl" for="username">
                Nom d&apos;utilisateur
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="username"
                type="text"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div className="mb-9">
              <label className="block text-white  mb-2 text-xl" for="username">
                Prénom
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="username"
                type="text"
                placeholder="Prénom"
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-white  mb-2 text-xl" for="username">
                Nom de famille
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="username"
                type="text"
                placeholder="Nom de famille"
                required
              />
            </div>
            <div className="mb-7">
              <label className="block text-white  mb-2 text-xl" for="username">
                email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="username"
                type="text"
                placeholder="email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-white   mb-2 text-xl" for="password">
                Mot de passe
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="password"
                type="password"
                placeholder="Mot de passe"
                required
              />
            </div>
            <div className="flex flex-col items-center justify-between">
                
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-mono text-xl"
                type="submit"
              >
                S&apos;inscrire
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  export default SignUpForm