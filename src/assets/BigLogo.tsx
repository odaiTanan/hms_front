import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string;
};

const BigLogo = ({ className }: Props) => {
  return (
    <div
      className={`h-[200px] w-[200px] flex flex-col gap-2 justify-center items-center ${className}`}
    >
      <FontAwesomeIcon
        className={`text-primary text-[70px] `}
        icon={faHospital}
      />
      <h1 className="text-[25px] text-primary font-bold">Medical</h1>
      <h1 className="text-[20px] text-primary font-bold">Center</h1>
    </div>
  );
};

export default BigLogo;
