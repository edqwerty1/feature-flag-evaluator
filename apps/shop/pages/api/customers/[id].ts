import type { NextApiRequest, NextApiResponse } from "next";
import { customers } from "@/lib/catalogData";
import { applyCatalogCors } from "@/lib/catalogApiCors";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  applyCatalogCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const raw = req.query.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (!id) {
    return res.status(400).json({ error: "Customer id required" });
  }

  const customer = customers[decodeURIComponent(id)];
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  return res.status(200).json(customer);
}
