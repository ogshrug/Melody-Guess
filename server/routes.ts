import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";
import fs from "fs";

interface Song {
  id: string;
  title: string;
  artist: string;
  filename: string;
}

interface GameConfig {
  totalRounds: number;
  initialDuration: number;
  maxDuration: number;
  skipIncrement: number;
  maxSkips: number;
  songs: Song[];
}

function loadGameConfig(): GameConfig {
  const configPath = path.resolve(process.cwd(), "songs", "game-config.json");
  
  try {
    const configData = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(configData);
  } catch (error) {
    return {
      totalRounds: 3,
      initialDuration: 2,
      maxDuration: 16,
      skipIncrement: 2,
      maxSkips: 5,
      songs: []
    };
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const songsPath = path.resolve(process.cwd(), "songs");
  app.use("/songs", express.static(songsPath));

  const publicPath = path.resolve(process.cwd(), "public");
  app.use(express.static(publicPath));

  app.get("/api/game-config", (_req, res) => {
    const config = loadGameConfig();
    res.json(config);
  });

  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(publicPath, "index.html"));
  });

  return httpServer;
}
