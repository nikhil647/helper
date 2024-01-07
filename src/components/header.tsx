import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import LoginButton from "./LoginButton";
import { AcmeLogo } from "../Logo/AcmeLogo";
export default function App() {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">Pista</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link color="warning" href="#">
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" aria-current="page">
            About Us
          </Link>
        </NavbarItem>
        <LoginButton />

        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
