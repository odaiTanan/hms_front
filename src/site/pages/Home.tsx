import Title from "../../components/Title";
import Departments from "../sections/Departments";
import Doctors from "../sections/Doctors";
import SendMessage from "../sections/SendMessage";

const Home = () => {
  return (
    <>
      <div className="container "></div>
      <div className="relative px-2 w-full h-[calc(100vh-75px)] bg-fixed bg-cover bg-center bg-[url(/src/assets/landing.jpg)]">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 text-center text-white">
          <h1 className="font-bold text-[#EEEEEE] text-3xl md:text-4xl">
            Comprehensive Healthcare with Compassion
          </h1>
          <p className="text-lg max-w-md text-[#EEEEEE] px-4">
            Expert care for you and your family. Book an appointment today!
          </p>
        </div>
      </div>{" "}
      <div className="section mt-[50px]">
        <Title title="Departments" />
        <Departments />
      </div>{" "}
      <svg
        className="rotate-[180deg] -mb-2 dark:absolute"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
      >
        <path
          d="M0 0v60c9 0 18-3 25-10 13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s37 13 50 0c14-14 37-14 50 0 7 7 16 10 25 10V0H0Z"
          className=" fill-g dark:hidden"
        ></path>
      </svg>{" "}
      <div className="  bg-background w-full center">
        <div className="section z-[100]">
          <Title title="Doctors" />
          <Doctors />
        </div>
      </div>{" "}
      <svg
        className="-mt-[2] dark:absolute"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
      >
        <path
          d="M0 0v60c9 0 18-3 25-10 13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s37 13 50 0c14-14 37-14 50 0 7 7 16 10 25 10V0H0Z"
          className="  fill-g dark:hidden"
        ></path>
      </svg>{" "}
      <div className="mt-[50px]">
        {" "}
        <Title title="Send a message" />
        <SendMessage />
      </div>
    </>
  );
};

export default Home;
