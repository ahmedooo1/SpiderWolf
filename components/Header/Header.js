import Image from "next/image";
import Link from "next/link";
import img from '../../public/spiderwolf-newlogo.png';
import { useSession } from "next-auth/react"
import Dropdown from "../Admin/Sidebar/DropDown";
import { signOut } from "next-auth/react"

function HeaderComponent() {
  const { data: session, status } = useSession();
  return (
    <>
      <nav className="w-screen h-20 dark:bg-gray-800 flex justify-around items-center relative">
        <div className="absolute left-0 top-0 z-10 w-60 block">
          <Image src={img} alt='logosw' className="h-60 animate-bounce duration-500" width={400} height={60} />
        </div>

        <div className="flex justify-around items-center w-96 relative">
          <div className="flex flex-row justify-between">
            <ul className="flex">
              <li className="hover:bg-gray-600 rounded-md active:bg-slate-700 px-3 py-1 cursor-pointer mx-2">
                <Link href='/' passHref>Accueil</Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md px-3 w-24 py-1 cursor-pointer mx-3">Collections</li>
              <li className="hover:bg-gray-600 rounded-md px-3 w-24 py-1 cursor-pointer mx-3">
                <Link href='/apropos' passHref>A propos</Link>
              </li>
              <li className="hover:bg-gray-600 rounded-md px-3 w-24 py-1 cursor-pointer mx-3">
                <Link href='/contact' passHref>Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex">
          {session ? (
            <Dropdown
              icone ="user"
              label={session.user.name}
              items={[
                { label: 'Profile', href: '/admin/games' },
                { label: 'Sign Out'},
              ]}
            />
          ) : (
            <>
              <Link href='/auth/login' passHref>
                <div className="hover:bg-gray-600 rounded-md active:bg-slate-700 px-3 py-1 cursor-pointer bg-slate-900 mr-2">
                  Login
                </div>
              </Link>
              <Link href='/auth/register' passHref>
                <div className="hover:bg-gray-600 rounded-md active:bg-slate-700 px-3 py-1 cursor-pointer bg-slate-900">
                  Sign-up
                </div>
              </Link>
            </>
          )}
        </div>

      </nav>
    </>
  );
}

export default HeaderComponent;
