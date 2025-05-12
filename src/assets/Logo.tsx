import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <div className="flex gap-1 items-end font-bold">
      <FontAwesomeIcon
        className={`text-primary text-[35px] ${className}`}
        icon={faHospital}
      />
    </div>
  );
};

export default Logo;
