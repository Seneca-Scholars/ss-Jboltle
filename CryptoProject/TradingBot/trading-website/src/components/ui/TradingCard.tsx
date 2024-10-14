import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TradingCard() {

  const [isclicked, setClicked] = useState(false)
  return (
    <div className="cardcontainer">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Trade Coins</CardTitle>
        <CardDescription>Enter your Wallet secret</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Secret Key</Label>
              <Input id="secret" placeholder="Enter Secret Key" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Wallet Address</Label>
              <Input id="address" placeholder="Enter Wallet Address" />

            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>

        <Button>Submit</Button>


      </CardFooter>
    </Card>
    </div>
  )
}
