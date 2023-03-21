import { getSession } from "next-auth/react";
import { FaUser, FaShieldAlt } from "react-icons/fa";

export default function Profile({ session }) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto pt-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-gray-800 rounded-lg shadow-xl">
            <div className="px-6 py-8">
              <div className="flex justify-center mb-4">
                <div className="inline-flex bg-red-500 rounded-full border-gray-200 shadow-md p-4">
                  <FaUser className="h-6 w-6 text-gray-200" />
                </div>
              </div>
              <h2 className="text-center text-3xl font-bold mb-2 text-gray-200">{session.user.name}</h2>
              <p className="text-center text-gray-500">{session.user.email}</p>
            </div>
            <div className="px-6 pb-8 pt-4">
              <a
                href="#"
                className="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
              >
                Edit Profile
              </a>
              <a
                href="#"
                className="block bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Upgrade Account
              </a>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl">
            <div className="px-6 py-8">
              <div className="flex justify-center mb-4">
                <div className="inline-flex bg-red-500 rounded-full border-gray-200 shadow-md p-4">
                  <FaShieldAlt className="h-6 w-6 text-gray-200" />
                </div>
              </div>
              <h2 className="text-center text-3xl font-bold mb-2 text-gray-200">Security</h2>
              <p className="text-center text-gray-500">Your account is secure.</p>
            </div>
            <div className="px-6 pb-8 pt-4">
              <a
                href="#"
                className="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
