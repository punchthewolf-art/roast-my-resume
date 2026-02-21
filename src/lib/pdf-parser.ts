import pdf from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    const text = data.text.trim();

    if (!text || text.length < 50) {
      throw new Error(
        "Could not extract meaningful text from the PDF. The file might be image-based or empty."
      );
    }

    // Limit text to ~8000 chars to stay within reasonable token limits
    return text.slice(0, 8000);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Could not extract")) {
      throw error;
    }
    throw new Error("Failed to parse PDF file. Please ensure it is a valid PDF.");
  }
}
