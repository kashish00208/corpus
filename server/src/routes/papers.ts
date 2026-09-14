import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import { resolveArxivUrl } from "../tools/arxiv";
import { extractDataFromURL } from "../tools/parser";

export default async function paper(req: Request, res: Response) {
  try {
    const { paper_url } = req.body;

    if (!paper_url) {
      return res.status(400).json({
        message: "Provide a Paper URL",
      });
    }

    const validate_url = await resolveArxivUrl(paper_url);

    if (!validate_url) {
      return res.status(400).json({
        message: "Provide a valid Arxiv URL of paper",
      });
    }

    const parsedData = await extractDataFromURL(validate_url);

    if (!parsedData) {
      return res.status(400).json({
        message: "Could not extract data from the URL",
      });
    }

    console.log(parsedData);

    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="paper.pdf"'
    );

    doc.pipe(res);

    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text(parsedData.title || "Research Paper", {
        align: "center",
      });

    doc.moveDown();

    if (parsedData.authors) {
      doc
        .fontSize(12)
        .font("Helvetica")
        .text(`Authors: ${parsedData.authors.join(", ")}`);
    }

    doc.moveDown();

    if (parsedData.abstract) {
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("Abstract");

      doc.moveDown(0.5);

      doc
        .fontSize(11)
        .font("Helvetica")
        .text(parsedData.abstract);
    }

    doc.end();

  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "Failed to generate PDF",
      });
    }
  }
}
