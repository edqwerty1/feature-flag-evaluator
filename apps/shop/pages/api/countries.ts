import type { NextApiRequest, NextApiResponse } from "next";
import { countries } from "@/lib/catalogData";
import { applyCatalogCors } from "@/lib/catalogApiCors";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  applyCatalogCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json(countries);
}
