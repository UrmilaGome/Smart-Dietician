import React from "react";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";

const DietPlan = () => {
  const { isLoading, isError, isSucess, message, diet } = useSelector(
    (state) => state.diet
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <BackButton url={"/"} />
      <section>
        <div
          style={{ textAlign: "left" }}
          dangerouslySetInnerHTML={{ __html: diet.text }}
        />
        <button
          style={{ marginTop: "20px" }}
          className="btn btn-block"
          onClick={handlePrint}
        >
          Print This Plan
        </button>
      </section>
    </>
  );
};

export default DietPlan;
