# Songs Directory

Place your MP3 files here for the Songless Unlimited game.

## Configuration

Edit the song list in `client/src/lib/gameConfig.ts` to match your audio files:

```typescript
songs: [
  {
    id: "song1",
    title: "Your Song Title",
    artist: "Artist Name", 
    filename: "your-song.mp3"  // Must match the filename in this folder
  },
  // Add more songs...
]
```

## Requirements

- Files should be in MP3 format
- Place 3 songs minimum (one per round)
- Keep filenames simple (no spaces, use hyphens)

## Example

1. Add `bohemian-rhapsody.mp3` to this folder
2. Update gameConfig.ts:
   ```typescript
   {
     id: "song1",
     title: "Bohemian Rhapsody",
     artist: "Queen",
     filename: "bohemian-rhapsody.mp3"
   }
   ```
