/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rIRf3HJeuJ4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="#"
        >
          <Package2Icon className="h-6 w-6" />
          <span className="">Shipping Cost Estimator</span>
        </Link>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />

              <Input
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
              size="icon"
              variant="ghost"
            >
              {/* <img
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              /> */}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Cost Estimator</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sender-address">Sender's Address</Label>
                  <Input id="sender-address" placeholder="Enter your address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient-address">Recipient's Address</Label>
                  <Input id="recipient-address" placeholder="Enter recipient's address" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="package-dimensions">Package Dimensions</Label>
                  <Input id="package-dimensions" placeholder="Enter package dimensions" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="package-weight">Package Weight</Label>
                  <Input id="package-weight" placeholder="Enter package weight" />
                </div>
              </div>
              <Button type="submit">Calculate Shipping Cost</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <TruckIcon className="w-4 h-4" />
                <span className="font-medium">Standard Shipping</span>
              </div>
              <div className="text-4xl font-bold">$19.99</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Estimated delivery in 3-5 business days</div>
              <Button variant="outline">Select</Button>
            </div>
            <Separator className="my-8" />
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <TruckIcon className="w-4 h-4" />
                <span className="font-medium">Express Shipping</span>
              </div>
              <div className="text-4xl font-bold">$39.99</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Estimated delivery in 1-2 business days</div>
              <Button variant="outline">Select</Button>
            </div>
            <Separator className="my-8" />
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <TruckIcon className="w-4 h-4" />
                <span className="font-medium">Overnight Shipping</span>
              </div>
              <div className="text-4xl font-bold">$59.99</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Estimated delivery in 1 business day</div>
              <Button variant="outline">Select</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function Package2Icon(props: any) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
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
