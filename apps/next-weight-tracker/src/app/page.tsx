"use client"
import {redirect} from "next/navigation";
import {useAuthStore} from "@/stores/authStore";

export default function Home() {
  const token = useAuthStore(state => state.accessToken);
  if (token) {
    return redirect('/dashboard');
  } else {
    redirect('/public/login'); 
  }
}
