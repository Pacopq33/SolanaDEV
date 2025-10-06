"use client"

import { useMockExpeditions } from "@/hooks/use-mock-expeditions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Rocket, Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useI18n } from "@/lib/i18n/context"

export function ActiveExpeditions() {
  const { expeditions, loading } = useMockExpeditions()
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState(Date.now())
  const { t } = useI18n()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleClaim = (expeditionId: string) => {
    toast({
      title: t.planets.claimToastTitle,
      description: t.planets.claimToastDescription,
    })
  }

  if (loading || expeditions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">{t.planets.activeExpeditions.toUpperCase()}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {expeditions.map((expedition) => {
          const timeRemaining = Math.max(0, expedition.endTime - currentTime)
          const totalDuration = expedition.endTime - expedition.startTime
          const progress = ((totalDuration - timeRemaining) / totalDuration) * 100
          const isComplete = timeRemaining === 0

          const hours = Math.floor(timeRemaining / 3600000)
          const minutes = Math.floor((timeRemaining % 3600000) / 60000)
          const seconds = Math.floor((timeRemaining % 60000) / 1000)

          return (
            <Card key={expedition.id} className="border-primary/30 bg-card/30 backdrop-blur hologram">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-primary">{expedition.planetName}</CardTitle>
                  <Badge
                    className={
                      isComplete
                        ? "bg-accent/20 text-accent border-accent/50"
                        : "bg-primary/20 text-primary border-primary/50"
                    }
                  >
                    {isComplete ? t.planets.status.complete.toUpperCase() : t.planets.status.active.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Rocket className="h-4 w-4" />
                  <span>{t.planets.shipCount.replace("{count}", expedition.shipCount.toString())}</span>
                </div>

                {!isComplete ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-secondary" />
                          <span className="text-muted-foreground">{t.planets.timeRemaining}</span>
                        </div>
                        <span className="font-bold font-mono">
                          {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
                          {seconds.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-accent" />
                      <span className="text-accent font-bold">{t.planets.readyToClaim}</span>
                    </div>
                    <Button
                      onClick={() => handleClaim(expedition.id)}
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                    >
                      {t.planets.claimRewards.toUpperCase()}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
