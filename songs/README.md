# Songs Directory

Place your MP3 files here for the Songless Unlimited game.

## Configuration

Edit the `game-config.json` file in this folder to configure your songs:

```json
{
  "totalRounds": 3,
  "initialDuration": 2,
  "maxDuration": 16,
  "skipIncrement": 2,
  "maxSkips": 5,
  "songs": [
    {
      "id": "song1",
      "title": "Your Song Title",
      "artist": "Artist Name",
      "filename": "your-song.mp3"
    }
  ]
}
```

## Requirements

- Files should be in MP3 format
- Place at least 3 songs (one per round by default)
- Keep filenames simple (no spaces, use hyphens)

## Example

1. Add `bohemian-rhapsody.mp3` to this folder
2. Update game-config.json:
   ```json
   {
     "id": "song1",
     "title": "Bohemian Rhapsody",
     "artist": "Queen",
     "filename": "bohemian-rhapsody.mp3"
   }
   ```

## Game Settings

- `totalRounds`: Number of rounds in the game
- `initialDuration`: Starting snippet length in seconds
- `maxDuration`: Maximum snippet length after all skips
- `skipIncrement`: Seconds added per skip
- `maxSkips`: Maximum number of skips allowed
