import AproposComponent from "@/components/Apropos"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"

function About(){
    return(<> 
       <div className="flex justify-center items-center text-3xl font-bold h-screen  ">
        
    <h2><AproposComponent/></h2>
    
    </div>
    </>)
}

export default About


About.getLayout = function pageLayout(page){
    return (<>
    <Header/>
    {page}
    <Footer/>

    </>)
}

