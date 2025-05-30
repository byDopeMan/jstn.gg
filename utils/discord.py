import requests
import json

def fetch_discord_status(user_id="523227058227380234"):
    """
    Fetch Discord status from Lanyard API
    Falls back to provided data if API is unavailable
    """
    url = f"https://api.lanyard.rest/v1/users/{user_id}"
    
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()["data"]
        else:
            # Fallback to provided data
            data = get_fallback_data()
    except:
        # Fallback to provided data if API fails
        data = get_fallback_data()

    user = data["discord_user"]
    
    # Build avatar URL
    avatar_url = f"https://cdn.discordapp.com/avatars/{user['id']}/{user['avatar']}.png?size=512"
    
    # Get display name with fallback priority
    display_name = user.get("global_name") or user.get("display_name") or user["username"]
    username = user.get("username")
    
    # Get activity info
    activities = data.get("activities", [])
    current_activity = None
    custom_status = None
    custom_emoji = None
    
    for activity in activities:
        if activity.get("type") == 4:  # Custom status
            emoji = activity.get("emoji", {})
            if emoji:
                custom_emoji = emoji.get("name", "")
            activity_state = activity.get("state", "")
            # Combine emoji and state
            custom_status = f"{custom_emoji} {activity_state}".strip() if custom_emoji or activity_state else None
        elif activity.get("name") and activity.get("type") != 4:
            current_activity = activity.get("name")
    
    # Get status
    status = data.get("discord_status", "offline")
    
    # Map status to colors
    status_colors = {
        "online": "#23a55a",
        "idle": "#f0b132", 
        "dnd": "#f23f43",
        "offline": "#80848e"
    }
    
    return {
        "display_name": display_name,
        "username": username,
        "avatar_url": avatar_url,
        "status": status,
        "status_color": status_colors.get(status, "#80848e"),
        "activity": current_activity or "No activity",
        "custom_status": custom_status,
        "custom_emoji": custom_emoji,  # Separate emoji field
        "user_id": user["id"],
        "discriminator": user.get("discriminator", "0"),
        "public_flags": user.get("public_flags", 0),
        "bot": user.get("bot", False)
    }

def get_fallback_data():
    """Fallback data based on provided JSON"""
    return {
        "discord_user": {
            "id": "523227058227380234",
            "username": "jstin.frl", 
            "avatar": "f91a50c11a272c2b4c4cf5b9be288b18",
            "discriminator": "0",
            "bot": False,
            "global_name": "Jstn",
            "display_name": "Jstn",
            "public_flags": 64
        },
        "activities": [
            {
                "id": "custom",
                "name": "Custom Status", 
                "type": 4,
                "emoji": {"name": "🌻"},
                "state": "learning developer"
            }
        ],
        "discord_status": "dnd"
    }