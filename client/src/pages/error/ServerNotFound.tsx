import PageError from "../../components/error/PageError";

const ServerNotAvailable: React.FC = () => {
  return <PageError title="502" message="Server is currently unavailable" />;
};

export default ServerNotAvailable;
