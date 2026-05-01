import type { NextApiRequest, NextApiResponse } from "next";
import { flagStore } from "@/lib/flagStore";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(flagStore.getStore());
  }

  if (req.method === "PUT") {
    const flags = req.body;
    if (!Array.isArray(flags)) {
      return res.status(400).json({ error: "Body must be an array of flags" });
    }
    flagStore.setStore(flags);
    return res.status(200).json(flags);
  }

  res.status(405).json({ error: "Method not allowed" });
}
