import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Award, Download, Share2, Eye } from "lucide-react";
import { useState } from "react";

interface CertificateCardProps {
  enrollment: any;
  course: any;
}

export function CertificateCard({ enrollment, course }: CertificateCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const generateMutation = trpc.certificates.generate.useMutation();
  const { data: certificate } = trpc.certificates.detail.useQuery(
    { certificateNumber: enrollment.certificateNumber || "" },
    { enabled: !!enrollment.certificateNumber }
  );

  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateMutation.mutateAsync({
        enrollmentId: enrollment.id,
        courseId: course.id,
      });
      // Refresh the page to show the new certificate
      window.location.reload();
    } catch (error) {
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (enrollment.certificateUrl) {
      const link = document.createElement("a");
      link.href = enrollment.certificateUrl;
      link.download = `${course.title.replace(/\s+/g, "_")}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && enrollment.certificateUrl) {
      try {
        await navigator.share({
          title: "My Certificate",
          text: `I just completed the course: ${course.title}`,
          url: enrollment.certificateUrl,
        });
      } catch (error) {
        // Share cancelled or not supported
      }
    } else if (enrollment.certificateUrl) {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(enrollment.certificateUrl);
      alert("Certificate URL copied to clipboard!");
    }
  };

  const completionDate = enrollment.completedAt
    ? new Date(enrollment.completedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <Card className="p-6 border-green-500/30 hover:border-green-500/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="font-bold text-lg">{course.title}</h3>
            <p className="text-sm text-muted-foreground">{course.category}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Completed:</span>
          <span className="font-medium">{completionDate}</span>
        </div>
        {enrollment.certificateNumber && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cert ID:</span>
            <span className="font-mono text-xs">{enrollment.certificateNumber}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {!enrollment.certificateGenerated ? (
          <Button
            onClick={handleGenerateCertificate}
            disabled={isGenerating}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isGenerating ? "Generating..." : "Generate Certificate"}
          </Button>
        ) : (
          <>
            <Button
              onClick={handleDownload}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              size="sm"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {showPreview && enrollment.certificateUrl && (
        <div className="mt-4 border border-border rounded-lg p-4 bg-slate-900/50">
          <p className="text-sm text-muted-foreground mb-2">Certificate Preview:</p>
          <iframe
            src={enrollment.certificateUrl}
            className="w-full h-96 rounded"
            title="Certificate Preview"
          />
        </div>
      )}
    </Card>
  );
}
