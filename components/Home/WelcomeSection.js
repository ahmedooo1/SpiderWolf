import Image from 'next/image';
import wolf1 from '../../public/Wolf1.png';
import wolf2 from '../../public/Wolf2.png';
import React, { useState, useEffect } from 'react';

function WelcomeSection(){
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setIndex((index + 1) % 2);
      }, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }, [index]);
  
return(<>
{/* la premiere section dans home page (avec l'auto slide) */}
  <div className="flex flex-col justify-center items-center text-3xl font-bold h-full">
      {[
        (<>
          <div className="flex flex-wrap justify-center w-11/12 relative m-10 ">
            <Image src={wolf1} alt="wolf1" className="w-full max-h-screen shadow-lg opacity-80" />
            <div className="absolute font-mono text-5xl text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h2 className="font-mono">Welcome to - <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-blue-600 font-extrabold bg-orange-50 opacity-70 font-sans border-b-4 border-dashed  border-light-blue-500">SPIDERWOLF</span></h2>
              <p className="font-mono text-lg p-10">Here where you can waste your time with no regrets ;)</p>
            </div>
          </div>
       </> ),
        (<>
          <div className="flex flex-wrap justify-center w-11/12 relative m-10">
            <Image src={wolf2} alt="wolf1" className="w-full max-h-screen shadow-lg opacity-80" />
            <div className="absolute font-mono text-5xl text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h2 className="font-mono">Welcome to - <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-blue-600 font-extrabold bg-orange-50 opacity-70 font-sans border-b-4 border-dashed  border-light-blue-500">SPIDERWOLF</span></h2>
              <p className="font-mono text-lg p-10">Here where you can waste your time with no regrets ;)</p>
            </div>
          </div>
        </>),
      ][index]}
    </div>


</>)

}

export default WelcomeSection