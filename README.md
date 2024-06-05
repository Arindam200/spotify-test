# Playlist Generator

This is a playlist generator application that creates playlists based on the user's mood and favorite artists. The application integrates with Spotify  to fetch similar artists and tracks. Additionally, it uses Arcjet for bot protection to ensure that only legitimate requests are processed.

## Features

- Generate playlists based on mood and favorite artists.
- Fetch similar artists and tracks from Spotify.
- Protect routes from automated bot requests using Arcjet.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Arindam200/spotify-test.git
    ```

    ```sh
    cd playlist-generator
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root of the project and add your keys:
    ```plaintext
    SPOTIFY_CLIENT_ID=your_spotify_client_id
    SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    ARCJET_KEY=your_arcjet_key
    ```

## Usage

1. Start the server:
    ```bash
    npm run dev
    ```

2. Make a POST request to `/generate-playlist` with the following JSON body:
    ```json
    {
        "mood": "happy",
        "artists": ["4NHQUGzhtTLFvgF5SZesLK", "6eUKZXaKkcviH0Ku9w2n3V"]
    }
    ```

3. The response will contain the generated playlist:
    ```json
    {
        "playlist": [
            {
                "name": "Track 1",
                "artist": "Artist 1",
                "album": "Album 1"
            },
            {
                "name": "Track 2",
                "artist": "Artist 2",
                "album": "Album 2"
            }
            // More tracks...
        ],
    }
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

