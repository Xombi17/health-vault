import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HealthWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Health Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Good</div>
        <p>Based on your recent check-ups and activities</p>
      </CardContent>
    </Card>
  )
}

