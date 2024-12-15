from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React Front-End

# API route to fetch blueprint URLs
@app.route('/get-blueprints', methods=['GET'])
def get_blueprints():
    # Simulate URLs for two blueprints
    data = {
        "blueprint_data": {
            "blueprint1": "https://www.pega.com/",
            "blueprint2": "https://www.pega.com/"
        }
    }
    return jsonify(data)

@app.route('/scoreboard', methods=['GET'])
def get_scoreboard():
    data = [
        { "name": "Alice", "score": 100 },
        { "name": "Bob", "score": 90 }
     ]

    return data

# API route to save user feedback
@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    # Here, you can handle user feedback and save it to a database or log it
    feedback = request.json  # Example: {"feedback": "First Better"}
    print("Feedback received:", feedback)
    return jsonify({"message": "Feedback saved successfully"}), 200


if __name__ == '__main__':
    app.run(debug=True)
