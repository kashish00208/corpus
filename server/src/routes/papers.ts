//paper route
import { Request, Response } from "express";
import { resolveArxivUrl } from "../tools/arxiv";

export default async function paper(req: Request, res: Response) {
  const paper_url = req.body.trim();

  if (!paper_url) {
    res.status(400).json({ mesaage: "Provide a Paper URL" });
  }

  const validate_url = await resolveArxivUrl(paper_url);

  if (!validate_url) {
      res.status(400).json({ mesaage: "Provide a valida Arxiv URL of paper" });
  }
}
