const Home = () => {
  const year = new Date().getFullYear()

  return (
    <>
    <h1 className="text-red-800 text-4x1 text-center"> Hello World</h1>

    <p className="text-center">
      copyright &copy;{year}
    </p>
    </>
  )

}
export default Home;