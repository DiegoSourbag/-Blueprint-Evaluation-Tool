from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React Front-End

# Initial ELO ratings
scores = { 
    "A": {"model": "A", "ELO": 1200},
    "B": {"model": "B", "ELO": 1200}
}

# Blueprint data
blueprints = {
    "blueprint_data": {
        "blueprint1": {"model": "A", "link": "https://www.pega.com/"},
        "blueprint2": {"model": "B", "link": "https://www.pega.com/"},
    }
}

def update_elo_ratings(RA, RB, result_A, result_B, K=32):
    """
    Update Elo ratings based on a comparison between two players or entities.
    """
    # Calculate the expected scores
    EA = 1 / (1 + 10 ** ((RB - RA) / 400))
    EB = 1 / (1 + 10 ** ((RA - RB) / 400))
    
    # Update ratings
    new_RA = RA + K * (result_A - EA)
    new_RB = RB + K * (result_B - EB)
    
    return new_RA, new_RB

# API route to fetch blueprint URLs
@app.route('/get-blueprints', methods=['GET'])
def get_blueprints():
    return jsonify(blueprints)

# API route to fetch the scoreboard
@app.route('/scoreboard', methods=['GET'])
def get_scoreboard():
    return jsonify(scores)

# API route to submit feedback and update ELO ratings
@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    feedback = request.json  # Example input: {"feedback": "First Better"}

    # Determine the results based on feedback
    if feedback["feedback"] == "First Better":
        result_a, result_b = 1, 0
    elif feedback["feedback"] == "Second Better":
        result_a, result_b = 0, 1
    else:  # Assuming "Equally good/bad"
        result_a, result_b = 0.5, 0.5
    
    # Get current ELO scores
    RA = scores["A"]["ELO"]
    RB = scores["B"]["ELO"]
    
    # Update scores
    new_RA, new_RB = update_elo_ratings(RA, RB, result_a, result_b)
    
    # Save updated scores back to the scoreboard
    scores["A"]["ELO"] = new_RA
    scores["B"]["ELO"] = new_RB
    
    return jsonify({"message": "Feedback saved successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
