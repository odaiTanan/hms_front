import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = { title: string };

const Title = ({ title }: Props) => {
  return (
    <div className="center py-8  ">
      <h1 className="font-bold text-[30px] center gap-2 center mb-2 text-primary text-xl ">
        <FontAwesomeIcon
          className="text-gray-500  scale-x-[-1]"
          icon={faStethoscope}
        />{" "}
        {title}
        <FontAwesomeIcon className="text-gray-500" icon={faStethoscope} />
      </h1>
    </div>
  );
};

export default Title;
