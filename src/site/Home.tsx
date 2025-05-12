import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Title from "../components/Title";
import Departments from "./Departments";
import Doctors from "./Doctors";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <div className="container "></div>
      <div className="relative w-full h-[calc(100vh-75px)] bg-fixed bg-cover bg-center bg-[url(/src/assets/landing.jpg)]">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 text-center text-white">
          <h1 className="font-bold text-[#EEEEEE] text-3xl md:text-4xl">
            Comprehensive Healthcare with Compassion
          </h1>
          <p className="text-lg max-w-md text-[#EEEEEE] px-4">
            Expert care for you and your family. Book an appointment today!
          </p>
        </div>
      </div>
      <Departments />
      <Title title="Doctors" />
      <Doctors />
    </>
  );
};

export default Home;
