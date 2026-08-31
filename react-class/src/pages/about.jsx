import Counter from "../components/Counter";
import ControlledFormXray from "../components/controlled-form-xray";

 const About = () => {
    const year = new Date().getFullYear()
    return(
        <>
        <h1 className="text-red-800 text-4xl text-center">About Page</h1>

      <p className="text-center">
        Copyright &copy; {year}
      </p>

      <Counter/>

      <ControlledFormXray/>
        </>
    )
}

export default About;