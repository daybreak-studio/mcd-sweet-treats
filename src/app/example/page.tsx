"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import Dropdown from "@/components/Dropdown/Dropdown";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import Textfield from "@/components/Textfield/Textfield";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <AppFrame>
      <motion.div></motion.div>
      <div className="mt-8 mb-auto">
        <LogoLockup />
      </div>
      <h1 className="font-serif-lg">Send grandma a sweet message</h1>
      <div>Your video goes here</div>
      <div className="flex flex-col gap-1">
        <Textfield label={"Your full name"} placeholder={"Enter your name"} />
        <Textfield label={"Email"} placeholder={"Enter email address"} />
        <Dropdown.menu label={"From"}>
          <Dropdown.item value={"test"}>fdsa</Dropdown.item>
          <Dropdown.item value={"test2"}>fdsa 2</Dropdown.item>
        </Dropdown.menu>
        <Dropdown.menu label={"To"}>
          <Dropdown.item value={"test"}>fdsa</Dropdown.item>
        </Dropdown.menu>

        <Checkbox>fdsafdsa</Checkbox>
      </div>
      <div className="mb-12 mt-4">
        <Button>Continue</Button>
      </div>
      <div className="mb-8 font-sans-xs opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
