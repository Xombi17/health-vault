import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function VaccineProgressWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vaccine Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={75} className="w-full" />
        <p className="mt-2">75% of recommended vaccines completed</p>
      </CardContent>
    </Card>
  )
}

