"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Calendar,
  Target,
  Users,
  TrendingUp,
  Star,
  Award,
  Activity,
  Trophy,
  Clock,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";
import { IPlayer } from "@/types/player.interface";
import { formatDate } from "@/lib/timeAndDate";
import { shortText } from "@/lib";
import { EGoalType } from "@/types/match.interface";

interface PerformanceTabsProps {
  player: IPlayer;
}

export function PerformanceTabs({ player }: PerformanceTabsProps) {
  const recentMatches = player.matches.slice(0, 5);
  const recentGoals = player.goals.slice(0, 5);
  const recentAssists = player.assists.slice(0, 5);
  const recentRatings = player.ratings.slice(0, 5);
  const mvpCount = player.mvp.length;
  const yellowCards = player.cards.filter(
    (card) => card.type === "yellow"
  ).length;
  const redCards = player.cards.filter((card) => card.type === "red").length;

  // Calculate performance statistics
  const avgRating =
    player.ratings.length > 0
      ? (
          player.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          player.ratings.length
        ).toFixed(1)
      : "0.0";

  const [ratingTrend, setRatingTrend] = useState<number[]>([]);

  useEffect(() => {
    // Calculate rating trend from last 5 ratings
    if (player.ratings.length >= 5) {
      const lastFive = player.ratings.slice(-5).map((r) => r.rating);
      setRatingTrend(lastFive);
    } else {
      setRatingTrend(player.ratings.map((r) => r.rating));
    }
  }, [player.ratings]);

  // Calculate goal distribution
  const goalTypes = player.goals.reduce((acc, goal) => {
    acc[goal?.modeOfScore as EGoalType] =
      (acc[goal?.modeOfScore as EGoalType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Tabs defaultValue="matches" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
        <TabsTrigger value="matches" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Matches</span>
        </TabsTrigger>
        <TabsTrigger value="goals" className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          <span className="hidden sm:inline">Goals</span>
        </TabsTrigger>
        <TabsTrigger value="assists" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Assists</span>
        </TabsTrigger>
        <TabsTrigger value="ratings" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Ratings</span>
        </TabsTrigger>
      </TabsList>

      {/* Matches Tab */}
      <TabsContent value="matches" className="space-y-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Recent Matches</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {player.matches.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Matches
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {
                    player.matches.filter((m) => m?.results?.startsWith("w"))
                      .length
                  }
                </div>
                <div className="text-sm text-muted-foreground">Wins</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {
                    player.matches.filter((m) => m?.results?.startsWith("l"))
                      .length
                  }
                </div>
                <div className="text-sm text-muted-foreground">Losses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {
                    player.matches.filter((m) => m?.results?.startsWith("d"))
                      .length
                  }
                </div>
                <div className="text-sm text-muted-foreground">Draws</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {recentMatches.length > 0 ? (
          <div className="space-y-3">
            {recentMatches.map((match, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {match?.opponent?.contactName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(match?.date)} •{" "}
                            {shortText(match?.title)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold text-lg ${
                          match?.results?.startsWith("W")
                            ? "text-green-600"
                            : match?.results?.startsWith("L")
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      >
                        {match?.results}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Result
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground">No match data available</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Goals Tab */}
      <TabsContent value="goals" className="space-y-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Goal Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {player.goals.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Goals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {player.goals.reduce(
                    (acc, goal) =>
                      acc + (goal?.modeOfScore?.includes("penalty") ? 1 : 0),
                    0
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Penalties</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {player.goals.reduce(
                    (acc, goal) =>
                      acc + (goal?.modeOfScore?.includes("header") ? 1 : 0),
                    0
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Headers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(
                    player.goals.reduce(
                      (acc, goal) => acc + Number(goal?.minute),
                      0
                    ) / player.goals.length
                  ) || 0}
                </div>
                <div className="text-sm text-muted-foreground">Avg. Minute</div>
              </CardContent>
            </Card>
          </div>

          {/* Goal Type Distribution */}
          {Object.keys(goalTypes).length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Goal Type Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(goalTypes).map(([type, count]) => (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{type}</span>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(count / player.goals.length) * 100}
                          className="w-32 h-2"
                        />
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {recentGoals.length > 0 ? (
          <div className="space-y-3">
            {recentGoals.map((goal, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Target className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Goal vs Match {goal?.match?.slice(-6)}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Minute {goal?.minute} • {goal?.modeOfScore}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {goal?.minute}'
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground">No goal data available</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Assists Tab */}
      <TabsContent value="assists" className="space-y-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Assist Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {player.assists.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Assists
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    player.assists.reduce(
                      (acc, assist) => acc + Number(assist?.minute),
                      0
                    ) / player.assists.length
                  ) || 0}
                </div>
                <div className="text-sm text-muted-foreground">Avg. Minute</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {(
                    (player.assists.length / player.matches.length) * 100 || 0
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-sm text-muted-foreground">Per Match</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {recentAssists.length > 0 ? (
          <div className="space-y-3">
            {recentAssists.map((assist, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Assist vs Match {assist.match?.slice(-6)}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Minute {assist.minute} • {assist.modeOfScore}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {assist.minute}'
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground">No assist data available</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Ratings Tab */}
      <TabsContent value="ratings" className="space-y-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Performance Ratings</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {avgRating}
                </div>
                <div className="text-sm text-muted-foreground">Avg. Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {mvpCount}
                </div>
                <div className="text-sm text-muted-foreground">MVP Awards</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {yellowCards}
                </div>
                <div className="text-sm text-muted-foreground">
                  Yellow Cards
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {redCards}
                </div>
                <div className="text-sm text-muted-foreground">Red Cards</div>
              </CardContent>
            </Card>
          </div>

          {/* Rating Trend Chart */}
          {ratingTrend.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">
                  Rating Trend (Last {ratingTrend.length} matches)
                </h4>
                <div className="flex items-end h-32 gap-2">
                  {ratingTrend.map((rating, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="w-full bg-linear-to-t from-purple-500 to-purple-300 rounded-t-md"
                        style={{ height: `${(rating / 10) * 100}%` }}
                      />
                      <div className="text-xs mt-2">{rating.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">
                        M{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {recentRatings.length > 0 ? (
          <div className="space-y-3">
            {recentRatings.map((rating, index) => {
              const match = player.matches.find((m) => m._id === rating.match);
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            rating.rating >= 8.5
                              ? "bg-green-100"
                              : rating.rating >= 7.0
                              ? "bg-blue-100"
                              : rating.rating >= 6.0
                              ? "bg-amber-100"
                              : "bg-red-100"
                          }`}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              rating.rating >= 8.5
                                ? "text-green-500"
                                : rating.rating >= 7.0
                                ? "text-blue-500"
                                : rating.rating >= 6.0
                                ? "text-amber-500"
                                : "text-red-500"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {match
                              ? `vs ${match?.opponent}`
                              : `Match ${rating.match?.slice(-6)}`}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {match?.date
                              ? formatDate(match?.date)
                              : "Date not available"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            rating.rating >= 8.5
                              ? "text-green-600"
                              : rating.rating >= 7.0
                              ? "text-blue-600"
                              : rating.rating >= 6.0
                              ? "text-amber-600"
                              : "text-red-600"
                          }`}
                        >
                          {rating.rating.toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Rating
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground">No rating data available</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}
