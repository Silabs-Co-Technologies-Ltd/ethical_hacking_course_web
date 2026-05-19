import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateProps {
  userName: string;
  completionDate: Date;
  totalLessonsCompleted: number;
  totalModulesCompleted: number;
}

export function Certificate({
  userName,
  completionDate,
  totalLessonsCompleted,
  totalModulesCompleted,
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#0F1419',
        scale: 2,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `ethical-hacking-certificate-${userName}-${Date.now()}.png`;
      link.click();
    } catch (error) {
      console.error('Failed to download certificate:', error);
    }
  };

  const handleShare = () => {
    const text = `I just completed the Ethical Hacking Course! 🎓\n\nCompleted ${totalModulesCompleted} modules and ${totalLessonsCompleted} lessons.\n\nJoin me in mastering cybersecurity: ethicalhack-9oajw7ap.manus.space`;

    if (navigator.share) {
      navigator.share({
        title: 'Ethical Hacking Course Certificate',
        text: text,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert('Certificate info copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Certificate */}
      <div
        ref={certificateRef}
        className="relative w-full aspect-video bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary rounded-lg p-12 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-primary/30" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-primary/30" />

        <div className="relative z-10 space-y-6">
          <div className="text-5xl font-bold text-primary">🎓</div>

          <h1 className="text-4xl font-bold text-primary">Certificate of Completion</h1>

          <p className="text-lg text-muted-foreground">This certifies that</p>

          <p className="text-3xl font-bold text-accent">{userName}</p>

          <p className="text-lg text-muted-foreground max-w-2xl">
            has successfully completed the Ethical Hacking Course: From Zero to Hero,
            demonstrating proficiency in cybersecurity fundamentals, network security,
            and ethical hacking practices.
          </p>

          <div className="grid grid-cols-2 gap-8 text-center pt-4">
            <div>
              <p className="text-3xl font-bold text-primary">{totalModulesCompleted}</p>
              <p className="text-sm text-muted-foreground">Modules Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">{totalLessonsCompleted}</p>
              <p className="text-sm text-muted-foreground">Lessons Completed</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Completed on {completionDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleDownload}
          className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Download className="w-4 h-4" /> Download Certificate
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex-1 gap-2"
        >
          <Share2 className="w-4 h-4" /> Share
        </Button>
      </div>

      {/* Certificate Info */}
      <Card className="bg-card border-border p-6">
        <h3 className="font-bold mb-4">Certificate Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Recipient:</span>
            <span className="font-mono">{userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Completion Date:</span>
            <span className="font-mono">{completionDate.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Modules Completed:</span>
            <span className="font-mono">{totalModulesCompleted} / 10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lessons Completed:</span>
            <span className="font-mono">{totalLessonsCompleted} / 25+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Certificate ID:</span>
            <span className="font-mono text-primary">EHC-{Date.now().toString().slice(-8).toUpperCase()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
