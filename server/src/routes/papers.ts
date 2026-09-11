//paper route
import { Request, Response } from "express";
import { resolveArxivUrl } from "../tools/arxiv";
import { extractDataFromURL } from "../tools/parser";

export default async function paper(req: Request, res: Response) {
  const {paper_url } = req.body;

  if (!paper_url) {
    res.status(400).json({ mesaage: "Provide a Paper URL" });
  }

  const validate_url = await resolveArxivUrl(paper_url);

  if (!validate_url) {
    res.status(400).json({ mesaage: "Provide a valida Arxiv URL of paper" });
  }

  const parsedData = await extractDataFromURL(validate_url);

  console.log(parsedData);

  if (!parsedData) {
    res.status(400).json({ mesaage: "could not extract data from the url " });
  }

  return res.status(200).json({message:"Extracted data from paper successfully"})
}
