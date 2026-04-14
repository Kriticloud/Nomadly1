import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Nomadly API is running" });
  });

  // Mock destinations data
  app.get("/api/destinations", (req, res) => {
    res.json([
      { id: 'italy', name: 'Amalfi Coast', country: 'Italy', image: 'https://picsum.photos/seed/amalfi/1920/1080' },
      { id: 'japan', name: 'Kyoto', country: 'Japan', image: 'https://picsum.photos/seed/kyoto/1920/1080' },
      { id: 'patagonia', name: 'Patagonia', country: 'Argentina', image: 'https://picsum.photos/seed/patagonia/1920/1080' },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
