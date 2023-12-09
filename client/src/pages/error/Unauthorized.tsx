import PageError from "../../components/error/PageError";

const Unauthorized: React.FC = () => {
  return <PageError title="401" message="Unauthorized: Access is denied due to insufficient access privileges" />;
};

export default Unauthorized;
