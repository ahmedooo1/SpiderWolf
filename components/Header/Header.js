import Image from "next/image";
import Link from "next/link";
import img from '../../public/spiderwolf-newlogo.png';
import { useSession } from "next-auth/react"
import Dropdown from "../Admin/Sidebar/DropDown";

function HeaderComponent() {
  const { data: session, status } = useSession();
  return (
    <>
      <nav className="w-full h-20 dark:bg-gray-800 bg-gray-900 flex justify-around items-center relative">
        <div className="absolute left-0 top-0 z-10 w-40 block">
          <Image src={img} alt='logosw' className="h-60 animate-bounce duration-500" width={600} height={60} />
        </div>
        <div className="hidden md:flex justify-around items-center w-96">
          <ul className="flex">
            <Link href='/' passHref>
              <li className="w-full h-full flex items-center justify-between px-4 py-2 font-medium text-white hover:bg-gray-800">
                Accueil
              </li>
            </Link>
            <Link href='/collections' passHref>
              <li className="w-full h-full flex items-center justify-between px-4 py-2 font-medium text-white hover:bg-gray-800">
                Collections
              </li>
            </Link>
            <Link href='/apropos' passHref>
              <li className="w-full h-full flex items-center justify-between px-6 py-2 font-medium text-white hover:bg-gray-800 whitespace-nowrap">
                A propos
              </li>
            </Link>
            <Link href='/contact' passHref>
              <li className="w-full h-full flex items-center justify-between px-4 py-2  font-medium text-white hover:bg-gray-800">
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center justify-center w-full md:w-auto">
          <div className="flex items-center">
            {session ? (
              <Dropdown
                icone="user"
                label={session.user.name}
                items={
                  session.user.role === "ADMIN"
                    ? [{ label: 'Profile', href: '/profile' },
                    { label: 'Admin', href: '/admin/dashboard' },
                    { label: 'Sign Out' },
                    ]
                    : [
                      { label: 'Profile', href: '/profile' },
                      { label: 'Sign Out' },
                    ]
                }
              />
            ) : (
              <>
                <Link href='/auth/login' passHref>
                  <button className="w-full h-full flex items-center justify-between px-4 py-2  font-medium text-white hover:bg-gray-800">
                    Login
                  </button>
                </Link>
                <Link href='/auth/register' passHref>
                  <button className="w-full h-full flex items-center justify-between px-4 py-2  font-medium text-white hover:bg-gray-800">
                    Sign-up
                  </button>
                </Link>
              </>
            )}


          </div>

        </div>

        <div className="md:hidden flex items-center">
          <button className="text-gray-500 hover:text-gray-600 focus:outline-none">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path fillRule="evenodd" d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
            </svg>
          </button>
        </div>

      </nav>
    </>
  );
}

export default HeaderComponent;
