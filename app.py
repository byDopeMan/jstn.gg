from flask import Flask, render_template, request, make_response
from utils.discord import fetch_discord_status  
from utils.db import increment_view, get_view_count, init_db
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route("/")
def home():
    try:
        # Check if user has visited before (via cookie)
        last_visit = request.cookies.get('last_visit')
        should_increment = True
        
        if last_visit:
            try:
                last_visit_time = datetime.fromisoformat(last_visit)
                # Only count if last visit was more than 24 hours ago
                if datetime.now() - last_visit_time < timedelta(hours=24):
                    should_increment = False
            except:
                # Invalid cookie, treat as new visitor
                pass
        
        if should_increment:
            views = increment_view()
        else:
            views = get_view_count()
        
        user = fetch_discord_status()
        user.update({
            "languages": ["Python", "JavaScript", "TypeScript"],
            "location": "Germany",
            "views": views,
            "github_username": "jstin-frl", 
            "bio": "learning developer"
        })

        # Render template first to make sure it works
        rendered_template = render_template("profile.jinja2", user=user)
        response = make_response(rendered_template)
        
        # Set cookie with current timestamp if we counted this visit
        if should_increment:
            response.set_cookie('last_visit', 
                              datetime.now().isoformat(),
                              max_age=60*60*24*30)  # Cookie expires after 30 days
        
        return response
        
    except Exception as e:
        # Fallback in case of any errors
        print(f"Error in home route: {e}")
        return f"Error: {str(e)}", 500

if __name__ == "__main__":
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)