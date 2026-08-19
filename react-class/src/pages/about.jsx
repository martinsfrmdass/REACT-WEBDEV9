import Counter from "../components/Counter";


const About = () => {
  const year = new Date().getFullYear()

  return (
    <>
    <h1 className="text-red-800 text-4x1 text-center"> About page</h1>

    <p className="text-center">
      copyright &copy;{year}
    </p>

    <Counter/>
    </>
  )

}
export default About;