/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zTGkKiy0AaV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"


export default function Component() {

  type dimension = {
    length: number,
    width: number,
    height: number
  }

  const countries: string[] = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'Netherlands', 'France'];

  const [destinationCountry, setDestinationCountry] = useState<string>('');
  const [originCountry, setOriginCountry] = useState<string>('Netherlands');
  const [weight, setWeight] = useState<number>(0);
  const [dimension, setDimension] = useState<dimension>({
    length: 0,
    width: 0,
    height: 0
  })
  const [shippingOptions, setShippingOptions] = useState<[]>([])

  const onChange = (e: any) => {
    setDimension({ ...dimension, [e.target.name]: e.target.value })
  }

  const [resultsFetched, setResultsFetched] = useState(false);

  const onClickFind = async (originCountry: string, destinationCountry: string, weight: number, length: number, width: number, height: number) => {
    console.log(weight);
    try {
      const response = await fetch(`/api/rate?originCountry=${originCountry}&destinationCountry=${destinationCountry}&weight=${weight}&length=${length}&width=${width}&height=${height}`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setShippingOptions(data.results); // Assuming you want to store the results in state
      setResultsFetched(true);

    } catch (error) {
      return console.error('Error:', error);
    }
  };

  return (
    <main className="flex flex-col md:flex-row items-stretch">
      <div className="md:flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Cost Estimator</CardTitle>
            <CardDescription>Enter the package details to estimate the shipping cost.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {/* <div className="space-y-2">
              <Label htmlFor="origin">Origin Country</Label>
              <Input id="origin" placeholder="Enter origin address" required />
            </div> */}
              <div className="space-y-2">
                <Label htmlFor="origin">Origin Country</Label>
                <span className="ml-12   w-32 h-8 dark:border-gray-800">
                  Netherlands
                </span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination Country</Label>
                {/* <Input id="destination" placeholder="Enter destination address" required /> */}


                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <select className="ml-2 border border-gray-200 w-32 h-8 dark:border-gray-800">
                      <option value="">  {destinationCountry || "Select"}</option>
                    </select>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    {countries.map((country) => (
                      <DropdownMenuItem key={country} onSelect={() => setDestinationCountry(country)}>
                        {country}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (in cm)</Label>
                  <Input name="length" placeholder="Enter length" required type="number" value={dimension.length} onChange={onChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (in cm)</Label>
                  <Input name="width" placeholder="Enter width" required type="number" value={dimension.width} onChange={onChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (in cm)</Label>
                  <Input name="height" placeholder="Enter height" required type="number" value={dimension.height} onChange={onChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (in kg)</Label>
                  <Input id="weight" placeholder="Enter weight" required type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} />
                </div>
              </div>
              {/* <div className="space-y-2">
              <Label htmlFor="method">Shipping Method</Label>
              <Select >
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="overnight">Overnight</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
              <Button className="w-full" type="button" onClick={() => onClickFind(originCountry, destinationCountry, weight, dimension.length, dimension.width, dimension.height)}>
                Estimate Cost
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
      {resultsFetched && (
        <div className="md:flex-1 mt-4 md:mt-0 md:ml-4">

          <CardHeader>
            <CardTitle>Shipping Results</CardTitle>
          </CardHeader>
          {shippingOptions.map((option, index) => (
            <Card key={index} className="mt-4 md:mt-0">
              <CardHeader>
                <CardTitle>{`Option ${index + 1}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="w-4 h-4" />

                  </div>
                  <div className="text-4xl font-bold">{option}</div>
                  <Button variant="outline">Select</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}

function TruckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M15 18H9" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  )
}
