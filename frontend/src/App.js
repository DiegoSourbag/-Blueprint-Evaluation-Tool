import React, { useEffect, useState } from "react";
import BlueprintView from "./components/BlueprintView";
import axios from "axios";
import Layout from "./components/Layout";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [blueprints, setBlueprints] = useState(null); // Blueprint URLs state
  const [loading, setLoading] = useState(false); // Loading state
  const [formSubmitted, setFormSubmitted] = useState(false); // Tracks form submission
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // Tracks feedback submission
  const [selectedIndustry, setSelectedIndustry] = useState(""); // User's selected industry
  const [scoreboard, setScoreboard] = useState([]); // Scoreboard data

  const fetchScoreboard = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/scoreboard");
      setScoreboard(response.data);
    } catch (error) {
      console.error("Error fetching scoreboard:", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedIndustry) {
      setLoading(true);
      axios
        .get("http://127.0.0.1:5000/get-blueprints", { industry: selectedIndustry })
        .then((response) => {
          setBlueprints(response.data.blueprint_data);
          setFormSubmitted(true);
        })
        .catch((error) => console.error("Error fetching blueprints:", error))
        .finally(() => setLoading(false));
    } else {
      alert("Please select an industry before submitting!");
    }
  };

  const handleFeedbackSubmit = async (feedback) => {
    try {
      await axios.post("http://127.0.0.1:5000/submit-feedback", { feedback });
      alert("Feedback submitted successfully!");
      setFeedbackSubmitted(true);
      fetchScoreboard(); // Fetch the scoreboard after feedback
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <Layout>
      <div className="App">
        {!formSubmitted ? (
          <form onSubmit={handleFormSubmit}>
            <h1>Let's start your Blueprint</h1>
            <label htmlFor="industry-select">Which industry is your application for?</label>
            <select
              id="industry-select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Select an Industry --
              </option>
              <option value="Banking">Banking</option>
              <option value="Communications">Communications</option>
              <option value="Consumer Services">Consumer Services</option>
              <option value="Cross Industry (e.g. HR, IT, Finance, etc.)">
                Cross Industry (e.g. HR, IT, Finance, etc.)
              </option>
              <option value="Energy & Utilities">Energy & Utilities</option>
              <option value="Government">Government</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Insurance">Insurance</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Transportation & Logistics">Transportation & Logistics</option>
              <option value="Just for fun">Just for fun</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        ) : loading ? (
          <div>Loading blueprints...</div>
        ) : feedbackSubmitted ? (
          <Scoreboard data={scoreboard} />
        ) : (
          <div>
            <h2>Blueprints</h2>
            <div className="blueprint-container">
              <BlueprintView src={blueprints.blueprint1} title="Blueprint 1" />
              <BlueprintView src={blueprints.blueprint2} title="Blueprint 2" />
            </div>
            <div className="feedback-buttons">
              <button onClick={() => handleFeedbackSubmit("First Better")}>First Better</button>
              <button onClick={() => handleFeedbackSubmit("Second Better")}>Second Better</button>
              <button onClick={() => handleFeedbackSubmit("Both Good")}>Both Good</button>
              <button onClick={() => handleFeedbackSubmit("Both Bad")}>Both Bad</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
