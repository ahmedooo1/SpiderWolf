
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import LoginComponent from "@/components/Login/Login"


function LoginPage(){
    return(<> 
       <div className="flex justify-center items-center text-3xl font-bold h-screen  ">
        
    <h2><LoginComponent/></h2>
    
    </div>
    </>)
}

export default LoginPage


LoginPage.getLayout = function pageLayout(page){
    return (<>
    <Header/>
    {page}
    <Footer/>

    </>)
}

