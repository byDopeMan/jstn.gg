from flask import Flask, render_template
from utils.discord import fetch_discord_status
from utils.db import increment_view, init_db

app = Flask(__name__)

@app.route("/")
def home():
    views = increment_view()
    user = fetch_discord_status()

    # Add additional user info
    user.update({
        "languages": ["Python", "JavaScript", "TypeScript"],
        "location": "Germany",
        "views": views,
        "github_username": "jstin-frl",
        "bio": "learning developer"
    })

    return render_template("profile.html", user=user)

if __name__ == "__main__":
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)