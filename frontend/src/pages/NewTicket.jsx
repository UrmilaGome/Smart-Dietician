import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import { createDiet } from "../features/diet/dietSlice";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.diet
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name] = useState(user.name);
  const [email] = useState(user.email);

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    allergies: "",
    exercise: "",
    meals: "",
    vegeterian: "",
    issues: "",
  });

  const {
    gender,
    age,
    weight,
    height,
    goal,
    allergies,
    exercise,
    meals,
    vegeterian,
    issues,
  } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let prompt = `My name is ${name} and i am ${gender} , my age is ${age} , my height is ${height} feet and weight is ${weight} kgs , my goal is to weight ${goal} , i have allergies to ${allergies} , ${exercise} i exercise,  i eat ${meals} meals a day , i am ${vegeterian} and i have issues like : ${issues} , Can you provide me with a detailed diet and workout plan in bullet points? according to my details and please suggest foods according to my issue specially (mention that separately), and I would like to have a plan that includes specific exercises and meals. Please provide me with a breakdown of daily activities, including exercises, reps, sets, meal times, and types of food to eat. Thank you! (give me response in html with headings and paragraphs)`;
    dispatch(createDiet(prompt));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/diet");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url={"/"} />
      <section className="heading">
        <h1>Creating New Ticket</h1>
        <p>Please Fill Out The Form</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type="text" className="form-control" value={name} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="email">Customer Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">Enter Your Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={age}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Enter Your Weight In Kg</label>
            <input
              type="number"
              name="weight"
              className="form-control"
              value={weight}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Enter Your Height In Feet</label>
            <input
              type="number"
              name="height"
              className="form-control"
              value={height}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="goal">Select Your Goal</label>
            <select
              name="goal"
              id="goal"
              value={goal}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="loss">Weight Loss</option>
              <option value="gain">Weight Gain</option>
              <option value="maintainence">Maintenance</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="allergies">Do you have any food allergies?</label>
            <input
              type="text"
              name="allergies"
              className="form-control"
              placeholder="please specify your food allergies here."
              value={allergies}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exercise">Do you Exersice Regularly?</label>
            <select
              name="exercise"
              id="exercise"
              value={exercise}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="regularly">Yes</option>
              <option value="sometimes">Sometimes</option>
              <option value="Not at all">Not at all</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="meals">
              How many meals do you take typically in a day?
            </label>
            <input
              type="text"
              name="meals"
              className="form-control"
              placeholder="Eg. 3"
              value={meals}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exercise">Are You Vegeterian?</label>
            <select
              name="vegeterian"
              id="vegeterian"
              value={vegeterian}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="vegeterian">Yes</option>
              <option value="non vegeterian">No</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="issues">Enter Your Issue Here</label>
            <textarea
              name="issues"
              id="issues"
              className="form-group"
              placeholder="Enter detials like if you have medical condtions or any other specific issue (write in details)..."
              value={issues}
              onChange={(e) => handleChange(e)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Create My Diet Plan</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
