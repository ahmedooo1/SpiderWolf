function LoginForm() {
    return (
      <div class="bg-gray-900 h-screen w-screen flex items-center justify-center">
        <div class="w-full max-w-sm">
          <form class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-white  mb-2 text-xl" for="username">
                Nom d&apos;utilisateur
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="username"
                type="text"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div class="mb-6">
              <label class="block text-white   mb-2 text-xl" for="password">
                Mot de passe
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="password"
                type="password"
                placeholder="Mot de passe"
                required
              />
            </div>
            <div class="flex flex-col items-center justify-between">
                
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline font-mono text-xl"
                type="submit"
              >
                Se connecter
              </button>
              <a
                class="inline-block align-baseline  text-sm text-blue-500 hover:text-blue-800 mt-2"
                href="#"
              >
                Mot de passe oublié?
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  export default LoginForm