import { Link } from "react-router-dom";
import BottomBar from "../components/navbar/BottomBar";

const Thanks = () => {
  return (
    <>
      <div className="relative min-h-screen" id="thanks">
        <div className="pt-40 pb-20">
          <div className="max-w-lg w-full bg-black bg-opacity-75 drop-shadow mx-auto rounded-md py-20 px-4 text-center text-white">
            <h2 className="font-extrabold text-3xl">Thank you.</h2>
            <p>We got your request, Stay with us.</p>

            <div className="w-full text-center pt-10">
              <Link
                to="/"
                className="py-3 px-8 rounded-md bg-gray-800 text-white font-bold"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default Thanks;
