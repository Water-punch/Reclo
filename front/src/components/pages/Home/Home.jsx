import { useNavigate } from "react-router-dom";
import NavBar from "../../common/NavBar";
import Chart from "./Chart";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="freespace">freespace</div>

      <div
        className="testbanner"
        onClick={() => {
          navigate("/test");
        }}
      >
        test banner
      </div>
      <div className="freespace">freespace</div>
      <div className="trendbanner">
        <Chart />
      </div>
      <div className="freespace">freespace</div>
      <div className="introbanner">intro banner</div>
      <div className="freespace">freespace</div>
      <div className="footer">footer</div>
    </>
  );
};

export default Home;
