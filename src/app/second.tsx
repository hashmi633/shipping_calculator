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
import { useEffect, useState } from "react"


export default function Component() {

  type dimension = {
    length: string,
    width: string,
    height: string
  }

  const [destinationCountry, setDestinationCountry] = useState<string[]>([]);
  const [destCountry, setDestCountry] = useState<string>('Netherlands');
  const [noResult, setNoResult] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [originCountry, setOriginCountry] = useState<string>('Netherlands');
  const [weight, setWeight] = useState<string>("0.4");
  const [resultsFetched, setResultsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dimension, setDimension] = useState<dimension>({
    length: "",
    width: "",
    height: ""
  })
  type ShippingOption = {
    carrier: string;
    rate: string;
  };

  let message: string = "";

  useEffect(() => {
    const fetchDestinationCountries = async () => {
      try {
        const response = await fetch('api/destination', {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        const data = await response.json()
        const sortedCountries = data.results.sort((a: string, b: string) => a.localeCompare(b));
        setDestinationCountry(sortedCountries)
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchDestinationCountries();
  }, []
  );

  const onChange = (e: any) => {
    if (parseFloat(e.target.value) >= 0 || e.target.value === '') {
      setDimension({ ...dimension, [e.target.name]: e.target.value })
    }
  }

  const onClickFind = async (originCountry: string, destCountry: string, weight: number, length: number, width: number, height: number) => {

    if (!weight) {
      alert("Weight field cannot be empty");
      return;
    }
    setNoResult(false);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/rate?originCountry=${originCountry}&destCountry=${destCountry}&weight=${weight}&length=${length}&width=${width}&height=${height}`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setShippingOptions(data.results); // Assuming you want to store the results in state
      setResultsFetched(true);

      if (
        data.results.length === 0
        &&
        data.messages === "No Result Found"
      ) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }

    } catch (error) {
      return console.error('Error:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:flex-row items-stretch gap-4 md:gap-8 p-4">
      <div className="flex-1 md:flex-none md:w-1/3">
        <Card className="h-full border-2 border-gray-300">
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
                    <select className="ml-2 border border-gray-200 w-44 h-8 dark:border-gray-800">
                      <option value="" >  {destCountry}</option>
                    </select>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent >

                    {destinationCountry.map((country) => (
                      <DropdownMenuItem
                        key={country} onSelect={() => setDestCountry(country)}>
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
                  <Input id="weight" placeholder="Enter weight" required type="number" value={weight}
                    onChange={(e) => {
                      if (parseFloat(e.target.value) >= 0
                        || e.target.value === ''
                      )
                        setWeight(e.target.value)
                    }}
                  />
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
              <Button className="w-full" type="button" onClick={() => onClickFind(originCountry, destCountry, parseFloat(weight), parseFloat(dimension.length), parseFloat(dimension.width), parseFloat(dimension.height))}>
                Show shipping options
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
      <div className="flex-1">
        {
          isLoading ? (
            <div>Loading...</div> // Placeholder for your loading spinner
          ) :


            resultsFetched &&
            <Card className="h-full border-2 border-gray-300">


              {resultsFetched &&
                (
                  <div className="flex-1">

                    <CardHeader>
                      <CardTitle>Shipping Results</CardTitle>
                    </CardHeader>
                    <div >
                      {
                        shippingOptions.map((option, index) => (
                          <Card key={index} className="border-2 mr-2 ml-2 mb-1">
                            <CardHeader>
                              <CardTitle>
                                {option.carrier} - Standard Shipping
                                <div className="text-4xl  mt-1">{option.rate}</div>
                              </CardTitle>
                            </CardHeader>
                            {/* <CardContent> */}
                            {/* <div className="grid gap-4"> */}
                            {/* <div className="flex items-center gap-2 "> */}
                            {/* <TruckIcon className="w-4 h-4" /> */}
                            {/* </div> */}
                            {/* </div> */}

                            {/* <Button variant="outline">Select</Button> */}
                            {/* </CardContent> */}
                          </Card>
                        ))
                      }
                    </div>
                  </div>
                )

              }
              {
                noResult &&
                <CardHeader>
                  <CardTitle>No Result Found</CardTitle>
                </CardHeader>

              }
            </Card>
        }
      </div>
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
