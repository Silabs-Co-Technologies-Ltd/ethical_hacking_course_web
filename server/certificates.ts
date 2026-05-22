import { nanoid } from "nanoid";
import { storagePut } from "./storage";

/**
 * Certificate generation utility using reportlab via Python
 * This creates professional PDF certificates with Silabs branding
 */

interface CertificateData {
  learnerName: string;
  courseTitle: string;
  courseCategory: string;
  completionDate: Date;
  certificateNumber: string;
}

/**
 * Generate a branded PDF certificate
 * Uses Python with reportlab to create professional certificates
 */
export async function generateCertificate(data: CertificateData): Promise<{
  url: string;
  key: string;
  certificateNumber: string;
}> {
  try {
    // Create certificate number if not provided
    const certNumber = data.certificateNumber || `SILABS-${nanoid(12).toUpperCase()}`;

    // Format the completion date
    const completionDate = new Date(data.completionDate);
    const formattedDate = completionDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create SVG certificate template (will be converted to PDF)
    const certificateSvg = createCertificateSVG({
      learnerName: data.learnerName,
      courseTitle: data.courseTitle,
      courseCategory: data.courseCategory,
      completionDate: formattedDate,
      certificateNumber: certNumber,
    });

    // Convert SVG to PDF using Python (since reportlab is available)
    const pdfBuffer = await svgToPdf(certificateSvg);

    // Upload to storage
    const fileKey = `certificates/${certNumber}.pdf`;
    const { url, key } = await storagePut(fileKey, pdfBuffer, "application/pdf");

    return {
      url,
      key,
      certificateNumber: certNumber,
    };
  } catch (error) {
    console.error("Certificate generation failed:", error);
    throw new Error("Failed to generate certificate");
  }
}

/**
 * Create an SVG certificate template with Silabs branding
 */
function createCertificateSvg(data: {
  learnerName: string;
  courseTitle: string;
  courseCategory: string;
  completionDate: string;
  certificateNumber: string;
}): string {
  const width = 1200;
  const height = 800;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
    
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  
  <!-- Border -->
  <rect x="40" y="40" width="${width - 80}" height="${height - 80}" 
        fill="none" stroke="#06b6d4" stroke-width="3" rx="10"/>
  
  <rect x="50" y="50" width="${width - 100}" height="${height - 100}" 
        fill="none" stroke="#22d3ee" stroke-width="1" rx="8"/>
  
  <!-- Silabs Logo/Header -->
  <circle cx="100" cy="100" r="35" fill="#06b6d4"/>
  <text x="100" y="115" font-family="Arial, sans-serif" font-size="32" font-weight="bold" 
        text-anchor="middle" fill="#000">S</text>
  
  <text x="160" y="95" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
        fill="#06b6d4">SILABS ACADEMY</text>
  <text x="160" y="120" font-family="Arial, sans-serif" font-size="12" 
        fill="#94a3b8">Technologia Omnibus</text>
  
  <!-- Certificate Title -->
  <text x="${width / 2}" y="200" font-family="Georgia, serif" font-size="48" font-weight="bold" 
        text-anchor="middle" fill="#06b6d4">Certificate of Completion</text>
  
  <!-- Decorative line -->
  <line x1="200" y1="230" x2="${width - 200}" y2="230" stroke="#22d3ee" stroke-width="2"/>
  
  <!-- Main text -->
  <text x="${width / 2}" y="310" font-family="Arial, sans-serif" font-size="16" 
        text-anchor="middle" fill="#cbd5e1">This certifies that</text>
  
  <!-- Learner name -->
  <text x="${width / 2}" y="380" font-family="Georgia, serif" font-size="42" font-weight="bold" 
        text-anchor="middle" fill="#f1f5f9">${escapeXml(data.learnerName)}</text>
  
  <!-- Course completion text -->
  <text x="${width / 2}" y="440" font-family="Arial, sans-serif" font-size="16" 
        text-anchor="middle" fill="#cbd5e1">has successfully completed the course</text>
  
  <!-- Course title -->
  <text x="${width / 2}" y="500" font-family="Georgia, serif" font-size="32" font-weight="bold" 
        text-anchor="middle" fill="#06b6d4">${escapeXml(data.courseTitle)}</text>
  
  <!-- Category -->
  <text x="${width / 2}" y="550" font-family="Arial, sans-serif" font-size="14" 
        text-anchor="middle" fill="#94a3b8">Category: ${escapeXml(data.courseCategory)}</text>
  
  <!-- Completion date -->
  <text x="${width / 2}" y="600" font-family="Arial, sans-serif" font-size="14" 
        text-anchor="middle" fill="#94a3b8">Completed on ${data.completionDate}</text>
  
  <!-- Certificate number -->
  <text x="100" y="${height - 80}" font-family="monospace" font-size="12" 
        fill="#64748b">Cert ID: ${data.certificateNumber}</text>
  
  <!-- Signature lines -->
  <line x1="150" y1="${height - 150}" x2="350" y2="${height - 150}" stroke="#22d3ee" stroke-width="1"/>
  <text x="250" y="${height - 120}" font-family="Arial, sans-serif" font-size="12" 
        text-anchor="middle" fill="#94a3b8">Director, Silabs Academy</text>
  
  <line x1="${width - 350}" y1="${height - 150}" x2="${width - 150}" y2="${height - 150}" stroke="#22d3ee" stroke-width="1"/>
  <text x="${width - 250}" y="${height - 120}" font-family="Arial, sans-serif" font-size="12" 
        text-anchor="middle" fill="#94a3b8">Verified Credential</text>
  
  <!-- Footer -->
  <text x="${width / 2}" y="${height - 40}" font-family="Arial, sans-serif" font-size="11" 
        text-anchor="middle" fill="#64748b">Silabs & Co Technologies Ltd. | ethicalhack-9oajw7ap.manus.space</text>
</svg>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Convert SVG to PDF using Python subprocess
 * Requires: pip install cairosvg
 */
async function svgToPdf(svgContent: string): Promise<Buffer> {
  const { execSync } = await import("child_process");
  const fs = await import("fs");
  const path = await import("path");
  const os = await import("os");

  const tempDir = os.tmpdir();
  const svgFile = path.join(tempDir, `cert-${nanoid()}.svg`);
  const pdfFile = path.join(tempDir, `cert-${nanoid()}.pdf`);

  try {
    // Write SVG to temporary file
    fs.writeFileSync(svgFile, svgContent);

    // Convert SVG to PDF using cairosvg
    try {
      execSync(`cairosvg "${svgFile}" -o "${pdfFile}"`, { stdio: "pipe" });
    } catch (e) {
      // Fallback: use Python with reportlab if cairosvg not available
      const pythonScript = `
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.units import inch

# Create a simple PDF certificate as fallback
pdf_buffer = io.BytesIO()
c = canvas.Canvas(pdf_buffer, pagesize=landscape(letter))
c.setFont("Helvetica-Bold", 24)
c.drawString(2*inch, 7*inch, "Silabs Academy Certificate")
c.save()
pdf_buffer.seek(0)
with open("${pdfFile}", "wb") as f:
    f.write(pdf_buffer.getvalue())
`;
      const pythonFile = path.join(tempDir, `cert-${nanoid()}.py`);
      fs.writeFileSync(pythonFile, pythonScript);
      execSync(`python3 "${pythonFile}"`, { stdio: "pipe" });
      fs.unlinkSync(pythonFile);
    }

    // Read the generated PDF
    const pdfBuffer = fs.readFileSync(pdfFile);

    // Clean up temporary files
    fs.unlinkSync(svgFile);
    fs.unlinkSync(pdfFile);

    return pdfBuffer;
  } catch (error) {
    // Clean up on error
    try {
      fs.unlinkSync(svgFile);
      fs.unlinkSync(pdfFile);
    } catch (e) {
      // Ignore cleanup errors
    }

    console.error("SVG to PDF conversion failed:", error);
    throw new Error("Failed to convert certificate to PDF");
  }
}

/**
 * Generate certificate using reportlab directly (Python-based)
 * This is a more reliable approach
 */
export async function generateCertificateWithReportlab(data: CertificateData): Promise<{
  url: string;
  key: string;
  certificateNumber: string;
}> {
  const { execSync } = await import("child_process");
  const fs = await import("fs");
  const path = await import("path");
  const os = await import("os");

  const certNumber = data.certificateNumber || `SILABS-${nanoid(12).toUpperCase()}`;
  const tempDir = os.tmpdir();
  const pdfFile = path.join(tempDir, `cert-${nanoid()}.pdf`);

  const pythonScript = `
import sys
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from datetime import datetime

# Page dimensions
page_width, page_height = landscape(letter)

# Create PDF
c = canvas.Canvas("${pdfFile}", pagesize=(page_width, page_height))

# Background
c.setFillColor(HexColor("#0f172a"))
c.rect(0, 0, page_width, page_height, fill=1, stroke=0)

# Border
c.setStrokeColor(HexColor("#06b6d4"))
c.setLineWidth(3)
c.rect(0.3*inch, 0.3*inch, page_width - 0.6*inch, page_height - 0.6*inch)

# Silabs Logo
c.setFillColor(HexColor("#06b6d4"))
c.circle(0.8*inch, page_height - 0.8*inch, 0.3*inch, fill=1)

# Header text
c.setFont("Helvetica-Bold", 20)
c.setFillColor(HexColor("#06b6d4"))
c.drawString(1.3*inch, page_height - 0.65*inch, "SILABS ACADEMY")

c.setFont("Helvetica", 10)
c.setFillColor(HexColor("#94a3b8"))
c.drawString(1.3*inch, page_height - 0.95*inch, "Technologia Omnibus")

# Certificate title
c.setFont("Georgia", 48)
c.setFillColor(HexColor("#06b6d4"))
c.drawCentredString(page_width/2, page_height - 2*inch, "Certificate of Completion")

# Decorative line
c.setStrokeColor(HexColor("#22d3ee"))
c.setLineWidth(2)
c.line(1.5*inch, page_height - 2.3*inch, page_width - 1.5*inch, page_height - 2.3*inch)

# Main text
c.setFont("Helvetica", 14)
c.setFillColor(HexColor("#cbd5e1"))
c.drawCentredString(page_width/2, page_height - 3*inch, "This certifies that")

# Learner name
c.setFont("Georgia", 36)
c.setFillColor(HexColor("#f1f5f9"))
c.drawCentredString(page_width/2, page_height - 3.8*inch, "${escapeXml(data.learnerName)}")

# Course completion text
c.setFont("Helvetica", 14)
c.setFillColor(HexColor("#cbd5e1"))
c.drawCentredString(page_width/2, page_height - 4.5*inch, "has successfully completed the course")

# Course title
c.setFont("Georgia", 28)
c.setFillColor(HexColor("#06b6d4"))
c.drawCentredString(page_width/2, page_height - 5.2*inch, "${escapeXml(data.courseTitle)}")

# Category
c.setFont("Helvetica", 12)
c.setFillColor(HexColor("#94a3b8"))
c.drawCentredString(page_width/2, page_height - 5.8*inch, "Category: ${escapeXml(data.courseCategory)}")

# Completion date
completion_date = "${data.completionDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}"
c.drawCentredString(page_width/2, page_height - 6.3*inch, f"Completed on {completion_date}")

# Certificate number
c.setFont("Courier", 10)
c.setFillColor(HexColor("#64748b"))
c.drawString(0.5*inch, 0.5*inch, "Cert ID: ${certNumber}")

# Signature lines
c.setStrokeColor(HexColor("#22d3ee"))
c.setLineWidth(1)
c.line(1*inch, 1.3*inch, 2.5*inch, 1.3*inch)
c.setFont("Helvetica", 10)
c.setFillColor(HexColor("#94a3b8"))
c.drawCentredString(1.75*inch, 0.95*inch, "Director, Silabs Academy")

c.line(page_width - 2.5*inch, 1.3*inch, page_width - 1*inch, 1.3*inch)
c.drawCentredString(page_width - 1.75*inch, 0.95*inch, "Verified Credential")

# Footer
c.setFont("Helvetica", 9)
c.setFillColor(HexColor("#64748b"))
c.drawCentredString(page_width/2, 0.3*inch, "Silabs & Co Technologies Ltd. | ethicalhack-9oajw7ap.manus.space")

c.save()
print("Certificate generated successfully")
`;

  try {
    const pythonFile = path.join(tempDir, `cert-${nanoid()}.py`);
    fs.writeFileSync(pythonFile, pythonScript);

    // Execute Python script
    execSync(`python3 "${pythonFile}"`, { stdio: "pipe" });

    // Read the generated PDF
    const pdfBuffer = fs.readFileSync(pdfFile);

    // Upload to storage
    const fileKey = `certificates/${certNumber}.pdf`;
    const { url, key } = await storagePut(fileKey, pdfBuffer, "application/pdf");

    // Clean up temporary files
    fs.unlinkSync(pythonFile);
    fs.unlinkSync(pdfFile);

    return {
      url,
      key,
      certificateNumber: certNumber,
    };
  } catch (error) {
    console.error("Certificate generation failed:", error);
    throw new Error("Failed to generate certificate");
  }
}
