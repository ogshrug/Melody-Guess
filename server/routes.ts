import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const songsPath = path.resolve(process.cwd(), "songs");
  app.use("/songs", express.static(songsPath));

  return httpServer;
}
