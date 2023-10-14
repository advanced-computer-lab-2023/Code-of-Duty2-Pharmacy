import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const buttons = [
    { text: "register as patient", path: "/patient-registration" },
    { text: "register as pharmacist", path: "/pharmacist-registration" },
    { text: "login as administrator", path: "/Administrator" },
    { text: "login as pharmacist", path: "/Pharmacist" },
    { text: "login as patient", path: "/Patient" },
  ];

  return (
    <div>
      <h1>Home page</h1>
      {buttons.map((button) => (
        <button key={button.text} onClick={() => handleClick(button.path)}>
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default Home;
