"use client"
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./common/Header";
import Footer from "./common/Footer";

export default function LayoutWrapper({ children }) {

  let [removeCommons,setRemoveCommons]=useState(false)
  const router=usePathname()
  
  // useEffect(()=>{
  //   if(router == "/checkouts"){
  //     setRemoveCommons(true)
  //   }
  //   else{
  //     setRemoveCommons(false)
  //   }
  // },[])

  return (
    <main>
      <Header/>
      {/* {removeCommons && <Header /> } */}
      {children}
      {/* {removeCommons && <Footer /> } */}
      <Footer/>
    </main>
  );
}