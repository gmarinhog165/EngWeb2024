import json

# Read the data from "filmes.json" file
with open("filmes.json", "r") as f:
    data = f.readlines()

# Initialize dictionaries to store actors and genres with their IDs and associated movies
atores = {}
generos = {}
ator_id_counter = 1
genero_id_counter = 1
movie_ids_mapping = {}  # To store the mapping of movie titles to their actual IDs

# Process each line and create a list of dictionaries for movies
filmes = []

for line in data:
    # Convert the line to a dictionary
    movie_data = json.loads(line)
    # Extract movie ID and title
    movie_id = movie_data.pop('_id')['$oid']
    movie_title = movie_data['title']
    # Store the mapping of movie IDs to their titles
    movie_ids_mapping[movie_id] = movie_title
    # Rename "_id" to "id"
    movie_data['id'] = movie_id
    # Extract the cast list
    cast = movie_data.get('cast', [])
    # Extract the genres list
    genres = movie_data.get('genres', [])
    
    # Update actors dictionary and associate movies with each actor
    for actor in cast:
        # Check if the actor already exists in the dictionary of actors
        actor_id = atores.get(actor)
        if actor_id is None:
            actor_id = ator_id_counter
            atores[actor] = {"id": actor_id, "nome": actor, "filmes": [movie_id]}
            ator_id_counter += 1
        else:
            # Add the movie ID to the list of movies for this actor
            atores[actor]['filmes'].append(movie_id)
    
    # Update genres dictionary and associate movies with each genre
    for genre in genres:
        # Check if the genre already exists in the dictionary of genres
        genre_id = generos.get(genre)
        if genre_id is None:
            genre_id = genero_id_counter
            generos[genre] = {"id": genre, "nome": genre, "filmes": [movie_id]}
            genero_id_counter += 1
        else:
            # Add the movie ID to the list of movies for this genre
            generos[genre]['filmes'].append(movie_id)
    
    cast_dict = {}
    for actor in cast:
        actor_id = atores[actor]["id"]
        cast_dict[actor_id] = actor
    movie_data['cast'] = cast_dict
    # Append the modified movie dictionary to the list
    filmes.append(movie_data)

# Create a dictionary with key "filmes" containing the list of movies
result = {"filmes": filmes}

# Reverse the movie_ids_mapping dictionary to retrieve movie titles from IDs
movie_ids_to_titles = {k: v for k, v in movie_ids_mapping.items()}

# Replace movie IDs with actual movie titles in the lists of associated movies for each actor
for actor in atores.values():
    actor_movies = {}
    for movie_id in actor["filmes"]:
        if movie_id in movie_ids_to_titles:
            actor_movies[str(movie_id)]= (movie_ids_to_titles[movie_id])
        else:
            print(f"Warning: Movie ID '{movie_id}' not found in movie_ids_to_titles.")
    actor["filmes"] = actor_movies

# Replace movie IDs with actual movie titles in the lists of associated movies for each genre
for genre in generos.values():
    genre_movies = {}
    for movie_id in genre["filmes"]:
        if movie_id in movie_ids_to_titles:
            genre_movies[str(movie_id)] = (movie_ids_to_titles[movie_id])
        else:
            print(f"Warning: Movie ID '{movie_id}' not found in movie_ids_to_titles.")
    genre["filmes"] = genre_movies

# Convert the dictionaries of actors and genres into lists of dictionaries
result["atores"] = list(atores.values())
result["generos"] = list(generos.values())

# Write the result into "filmes2.json" file
with open("filmes2.json", "w+") as f:
    json.dump(result, f, indent=4)
