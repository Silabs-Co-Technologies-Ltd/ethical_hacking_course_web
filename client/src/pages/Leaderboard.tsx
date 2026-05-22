import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Trophy, Medal } from "lucide-react";

export default function Leaderboard() {
  const { data: topLeaders } = trpc.leaderboard.top.useQuery({ limit: 100 });

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold">Leaderboard</h1>
          </div>
          <Button variant="outline" asChild>
            <a href="/academy">Back to Academy</a>
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-slate-900/50">
                  <th className="px-6 py-4 text-left text-sm font-bold">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Learner</th>
                  <th className="px-6 py-4 text-right text-sm font-bold">Points</th>
                  <th className="px-6 py-4 text-right text-sm font-bold">Courses</th>
                </tr>
              </thead>
              <tbody>
                {topLeaders?.map((entry: any, index: number) => (
                  <tr
                    key={entry.id}
                    className="border-b border-border hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        {getMedalIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">User #{entry.userId}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-cyan-400">{entry.points}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-muted-foreground">{Math.floor(entry.points / 100)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
