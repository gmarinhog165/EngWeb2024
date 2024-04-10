import json

# Load your JSON data
with open('dataset.json', 'r') as f:
    data = json.load(f)

# Initialize a dictionary to store athletes for each sport
sports_athletes = {}

# Iterate through each entry in the data
for entry in data:
    _id = entry['_id']
    desportos = entry['desportos']

    # Iterate through each sport in the 'desportos' list
    for sport in desportos:
        # If the sport is not already in the dictionary, add it
        if sport not in sports_athletes:
            sports_athletes[sport] = []

        # Add the athlete's _id to the list of athletes for this sport
        sports_athletes[sport].append(_id)

all_sports_data = {'sports': []}

# Iterate through each sport and its athletes and add it to the all_sports_data dictionary
for sport, athletes in sports_athletes.items():
    sport_data = {'sport': sport, 'athletes': athletes}
    all_sports_data['sports'].append(sport_data)

# Save the data as a single JSON file
with open('all_sports_data.json', 'w') as outfile:
    json.dump(all_sports_data, outfile, indent=4)