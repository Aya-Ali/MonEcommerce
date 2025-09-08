'use client'
import { Dispatch, SetStateAction, useContext } from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../../components/ui/navigation-menu"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "src/lib/utils"
import { signOut, useSession } from "next-auth/react"
import { CountContext } from "src/context/CountContext"


export function Navbar() {

  const { status, data } = useSession()
  const pathname = usePathname()
  const countData = useContext(CountContext)


  const MenuItems: { path: string, content: string, auth: boolean }[] = [
    { path: "/home", content: "home", auth: false },
    { path: "/products", content: "products", auth: false },
    { path: "/category", content: "category", auth: false },
    { path: "/cart", content: "cart", auth: true },
    { path: "/allorders", content: "orders", auth: true },
    { path: "/wishlist", content: "wishlist", auth: false },
  ]
  const MenuAuth: { path: string, content: string }[] = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ]
  function Logout() {
    signOut({ callbackUrl: "/login" })
  }
  return (
    <NavigationMenu className=" py-5 shadow  max-w-full justify-between">
      <NavigationMenuList>
        <NavigationMenuItem >
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={'/'}>
              <Image src='/images/freshcart-logo.svg' alt="logo" width={100} height={100} />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {

          MenuItems.map((el) => {
            return <NavigationMenuItem key={el.path}>
              {
                el.auth && status === "authenticated" ? <NavigationMenuLink asChild className={el.path == pathname ? cn(navigationMenuTriggerStyle(), 'text-main hover:text-main') : navigationMenuTriggerStyle()}>
                  <Link href={el.path} className="relative">
                    {el.content}

                    {el.path == '/cart' && <span className=" absolute top-0 right-0 ">{countData?.numCart}</span>}


                  </Link>
                </NavigationMenuLink> : ""
              }

              {
                el.auth ? "" : <NavigationMenuLink asChild className={el.path == pathname ? cn(navigationMenuTriggerStyle(), 'text-main hover:text-main') : navigationMenuTriggerStyle()}>
                  <Link href={el.path}>{el.content}</Link>
                </NavigationMenuLink>

              }


            </NavigationMenuItem>
          })
        }
      </NavigationMenuList>
      <NavigationMenuList>

        {
          status === "authenticated" ? <>

            <NavigationMenuItem >
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <i className="fa-brands fa-facebook"></i>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem >
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <span onClick={Logout}>Logout</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem >
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <span className="bg-red-400 p-5">Hello {data?.user.name}</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </> : <>

            {

              MenuAuth.map((el) => {
                return <NavigationMenuItem key={el.path}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={el.path}>{el.content}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              })
            }
          </>
        }


      </NavigationMenuList>
    </NavigationMenu>
  )
}
