import { RiHealthBookLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="heading">
        <RiHealthBookLine style={{ fontSize: "100px" }} />
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        Create New Diet Plan
      </Link>

      <Link to="/diet" className="btn btn-block">
        View My Diet Plans
      </Link>
    </div>
  );
}

export default Home;
