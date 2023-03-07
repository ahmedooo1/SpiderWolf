import Image from "next/image"
import Link from "next/link"
import img from '../../public/spiderwolf-newlogo.png'

function headerComponent() {
  return (<>

    <nav className="w-screen h-20 dark:bg-gray-800 flex justify-around items-center  relative">
      {/* <div className=" absolute left-0 top-0 z-10 w-60 block">
              <Image src={img} alt='logosw' className=" h-60 animate-bounce duration-500" width='400' />
            </div> */}

      <div className="flex  justify-around items-center w-96 relative">



        <div className="flex flex-row justify-between  ">
          <ul className="flex " >
            <Link href='/' legacyBehavior passHref>
              <li className="hover:bg-gray-600 rounded-md active:bg-slate-700 px-3 py-1  cursor-pointer mx-2 ">Accueil</li>
            </Link>
            <li className="hover:bg-gray-600 rounded-md  px-3 w-24 py-1  cursor-pointer mx-3">Collections</li>
            <Link href='/apropos' passHref>
              <li className="hover:bg-gray-600 rounded-md  px-3 w-24 py-1  cursor-pointer mx-3">A propos</li>
            </Link>
            <Link href='/contact' passHref>
              <li className="hover:bg-gray-600 rounded-md  px-3 w-24 py-1  cursor-pointer mx-3">Contact</li>
            </Link>

          </ul>
        </div>
      </div>


      <div className="hover:bg-gray-600 rounded-md active:bg-slate-700 px-3 py-1  cursor-pointer mx-2 bg-slate-900">
        <Link href='/login' legacyBehavior passHref>
          <a>Login</a>
        </Link>
      </div>
      <div className="hover:bg-gray-600 rounded-md active:bg-slate-700 px-3 py-1  cursor-pointer mx-2 bg-slate-900">
        <Link href='/signup' legacyBehavior passHref>
          <a>Sign-up</a>
        </Link>
      </div>
    </nav>




  </>)
}

export default headerComponent