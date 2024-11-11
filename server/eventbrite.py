import re
import json
import requests
from bs4 import BeautifulSoup

# URL for the HTML page
url = 'https://www.eventbrite.ca/d/canada--ubc-point-grey--university-of-british-columbia/all-events/?page=2'

# Make the request
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    with open("eventbrite_page.html", "w", encoding="utf-8") as file:
        file.write(response.text)
    print("HTML page saved as 'eventbrite_page.html'")
else:
    print(f"Error {response.status_code}: Unable to retrieve page.")

# Path to your HTML file
file_path = 'eventbrite_page.html'

# Load the HTML content from the file
with open(file_path, 'r', encoding='utf-8') as file:
    content = file.read()
soup = BeautifulSoup(content, "html.parser")

# Dictionary to store events by name
events_dict = {}

# Original Date regex pattern for events like "Mon, Nov 18, 7:30 PM"
original_date_pattern = re.compile(r"\b\w{3},\s\w{3}\s\d{1,2},\s\d{1,2}:\d{2}\s(?:AM|PM)\b")

# Additional Date pattern for "Today at 9:00 PM"
today_date_pattern = re.compile(r"\bToday at\s\d{1,2}:\d{2}\s(?:AM|PM)\b")

# New pattern for any day of the week (e.g., "Friday at 10:00 AM")
day_at_time_pattern = re.compile(r"\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) at\s\d{1,2}:\d{2}\s(?:AM|PM)\b")

# Venue and Location Patterns
venue_pattern = re.compile(r"^[\w\s]+$")
location_pattern = re.compile(r"\b([A-Z][a-z]*(?:\s[A-Z][a-z]*)*),\s[A-Z]{2}\b")

# Locate each event card anchor tag containing event info
event_cards = soup.find_all("a", class_="event-card-link")

for card in event_cards:
    # Event Name and Link
    event_name = card.get("aria-label", "").replace("View ", "").strip()
    event_link = card.get("href", "N/A")

    # Location
    location = card.get("data-event-location", "N/A")

    # Price Status
    price_status = card.get("data-event-paid-status", "N/A").capitalize()

    # Category
    category = card.get("data-event-category", "N/A")

    # Image URL
    image_tag = card.find("img", class_="event-card-image")
    image_url = image_tag["src"] if image_tag else "N/A"

    # Date
    date_tag = card.find_next("p", class_="Typography_body-md-bold__487rx")
    if date_tag:
        date_text = date_tag.get_text(strip=True)
        # Check all date patterns in sequence
        if original_date_pattern.search(date_text):
            event_date = date_text
        elif today_date_pattern.search(date_text):
            event_date = date_text
        elif day_at_time_pattern.search(date_text):
            event_date = date_text
        else:
            event_date = "N/A"
    else:
        event_date = "N/A"

    # Venue/Location
    venue_tag = date_tag.find_next("p", class_="Typography_body-md__487rx") if date_tag else None
    venue = venue_tag.get_text(strip=True) if venue_tag and venue_pattern.match(venue_tag.get_text()) else "N/A"

    # Initialize or update the event information
    if event_name not in events_dict:
        events_dict[event_name] = {
            "name": event_name,
            "link": event_link,
            "date": event_date,
            "location": location if location_pattern.match(location) else "N/A",
            "venue": venue,
            "price": price_status,
            "category": category,
            "image_url": image_url
        }
    else:
        # Update only fields that are missing or "N/A" in the current record
        existing_event = events_dict[event_name]
        
        # Update based on regex validation
        if existing_event["date"] == "N/A":
            if original_date_pattern.search(event_date) or today_date_pattern.search(event_date) or day_at_time_pattern.search(event_date):
                existing_event["date"] = event_date
        
        if existing_event["location"] == "N/A" and location_pattern.match(location):
            existing_event["location"] = location
            
        if existing_event["venue"] == "N/A" and venue_pattern.match(venue):
            existing_event["venue"] = venue
            
        existing_event["price"] = existing_event["price"] if existing_event["price"] != "N/A" else price_status
        existing_event["category"] = existing_event["category"] if existing_event["category"] != "N/A" else category
        existing_event["image_url"] = existing_event["image_url"] if existing_event["image_url"] != "N/A" else image_url

# Output the results
for i, (event_name, event) in enumerate(events_dict.items(), 1):
    print(f"Event {i}:")
    print(f"Event Name: {event['name']}")
    print(f"Date: {event['date']}")
    print(f"Location: {event['location']}")
    print(f"Venue: {event['venue']}")
    print(f"Price: {event['price']}")
    print(f"Link: {event['link']}")
    print(f"Category: {event['category']}")
    print(f"Image URL: {event['image_url']}")
    print("\n" + "-" * 40 + "\n")


# Write the final data to a JSON file
output_file = 'events_data.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(list(events_dict.values()), f, indent=4, ensure_ascii=False)

print(f"Data successfully written to {output_file}")