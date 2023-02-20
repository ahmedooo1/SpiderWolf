import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import SignUpComponent from "@/components/SignUp/SignUp"


function SignUpPage(){
    return(<> 
       <div className="flex justify-center items-center text-3xl font-bold h-screen  ">
        
    <h2><SignUpComponent/></h2>
    
    </div>
    </>)
}

export default SignUpPage


SignUpPage.getLayout = function pageLayout(page){
    return (<>
    <Header/>
    {page}
    <Footer/>

    </>)
}