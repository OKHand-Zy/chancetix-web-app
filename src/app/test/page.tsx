"use client";
import { db } from "@/lib/db"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { 
  Card,
  CardContent
} from "@/components/ui/Shadcn/card"

import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function TestPage() {
  
  return (
    <div>
      <HashLoader
        color="#36d7b7"
        loading
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
