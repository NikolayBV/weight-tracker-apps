"use client"

import {useAuth} from "@/utils/hooks/useAuth";
import {useEffect} from "react";
import {redirect} from "next/navigation";
import Loader from "@/components/ui/loader/Loader";
import {useLoadWeights} from "@/utils/hooks/useLoadWeights";

export default function Home() {
  const {auth, loading} = useAuth();
  
  useEffect(() => {
    if (auth) {
      redirect('/dashboard/main');
    } else {
      redirect('/public/login');
    }
  })
  return (
      <>
        {loading && <Loader />}
      </>
  );
}