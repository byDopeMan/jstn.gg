import requests

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
    spotify_info = None
    
    for activity in activities:
        if activity.get("type") == 4:  # Custom status
            emoji = activity.get("emoji", {})
            if emoji:
                custom_emoji = emoji.get("name", "")
            activity_state = activity.get("state", "")
            # Combine emoji and state
            custom_status = f"{custom_emoji} {activity_state}".strip() if custom_emoji or activity_state else None
        elif activity.get("name") == "Spotify" and activity.get("type") == 2:  # Spotify activity
            current_activity = f"🎵 {activity.get('details', 'Unknown Track')}"
            spotify_info = {
                "song": activity.get("details", "Unknown Track"),
                "artist": activity.get("state", "Unknown Artist"),
                "album": activity.get("assets", {}).get("large_text", "Unknown Album"),
                "album_art": activity.get("assets", {}).get("large_image", "").replace("spotify:", "https://i.scdn.co/image/"),
                "timestamps": activity.get("timestamps", {})
            }
        elif activity.get("name") and activity.get("type") not in [2, 4]:  # Other activities
            current_activity = activity.get("name")
    
    # Check if listening to Spotify from main data
    if data.get("listening_to_spotify") and data.get("spotify"):
        spotify_data = data["spotify"]
        current_activity = f"🎵 {spotify_data.get('song', 'Unknown Track')}"
        spotify_info = {
            "song": spotify_data.get("song", "Unknown Track"),
            "artist": spotify_data.get("artist", "Unknown Artist"),
            "album": spotify_data.get("album", "Unknown Album"),
            "album_art": spotify_data.get("album_art_url", ""),
            "timestamps": spotify_data.get("timestamps", {})
        }
    
    # Get status
    status = data.get("discord_status", "offline")
    
    # Map status to colors
    status_colors = {
        "online": "#23a55a",
        "idle": "#f0b132", 
        "dnd": "#f23f43",
        "offline": "#80848e"
    }
    
    # Get guild/clan info
    guild_info = None
    if user.get("primary_guild"):
        guild = user["primary_guild"]
        guild_info = {
            "tag": guild.get("tag"),
            "badge": guild.get("badge"),
            "identity_enabled": guild.get("identity_enabled", False)
        }
    
    return {
        "display_name": display_name,
        "username": username,
        "avatar_url": avatar_url,
        "status": status,
        "status_color": status_colors.get(status, "#80848e"),
        "activity": current_activity or "No activity",
        "custom_status": custom_status,
        "custom_emoji": custom_emoji,
        "spotify": spotify_info,
        "listening_to_spotify": data.get("listening_to_spotify", False),
        "guild": guild_info,
        "user_id": user["id"],
        "discriminator": user.get("discriminator", "0"),
        "public_flags": user.get("public_flags", 0),
        "bot": user.get("bot", False),
        "active_platforms": {
            "desktop": data.get("active_on_discord_desktop", False),
            "mobile": data.get("active_on_discord_mobile", False),
            "web": data.get("active_on_discord_web", False)
        }
    }

def get_fallback_data():
    """Enhanced fallback data based on your provided JSON"""
    return {
        "discord_user": {
            "id": "523227058227380234",
            "username": "jstin.frl", 
            "avatar": "f91a50c11a272c2b4c4cf5b9be288b18",
            "discriminator": "0",
            "bot": False,
            "global_name": "Jstn",
            "display_name": "Jstn",
            "public_flags": 64,
            "primary_guild": {
                "tag": "WRLD",
                "identity_guild_id": "1187058242484961300",
                "badge": "4f25524787fd4a78abbe4cf889599ea7",
                "identity_enabled": True
            }
        },
        "activities": [
            {
                "id": "custom",
                "name": "Custom Status", 
                "type": 4,
                "emoji": {"name": "🌻"},
                "state": "learning developer"
            },
            {
                "flags": 48,
                "id": "spotify:1",
                "name": "Spotify",
                "type": 2,
                "state": "Warlord Colossus",
                "details": "Remedy This Failure",
                "timestamps": {"start": 1748573395019, "end": 1748573510950},
                "assets": {
                    "large_image": "spotify:ab67616d0000b273867c4e4313e650cd587cfb70",
                    "large_text": "Remedy This Failure"
                }
            }
        ],
        "discord_status": "dnd",
        "listening_to_spotify": True,
        "spotify": {
            "timestamps": {"start": 1748573395019, "end": 1748573510950},
            "album": "Remedy This Failure",
            "album_art_url": "https://i.scdn.co/image/ab67616d0000b273867c4e4313e650cd587cfb70",
            "artist": "Warlord Colossus",
            "song": "Remedy This Failure",
            "track_id": "0woqOQAH1XckKTKbS0jeqv"
        },
        "active_on_discord_desktop": True,
        "active_on_discord_mobile": False,
        "active_on_discord_web": False
    }