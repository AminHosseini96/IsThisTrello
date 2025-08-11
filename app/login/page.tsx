"use client";

import { useUiStore } from "@/stores";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginUser, registerUser } from "@/services/authServices";

export default function LoginPage() {
  const isSignedUp = useUiStore((state) => state.ui.isSignedUp);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUi = useUiStore((state) => state.setUi);

  const router = useRouter();
  useEffect(() => {
    setUi({ isLoading: false, isLoggedIn: false, isSignedUp: true });
  }, [setUi]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isSignedUp) {
      try {
        await registerUser({
          email,
          password,
          name,
          avatar: "",
          boards: [],
        });
        router.push("/");
      } catch (error) {
        console.log(error);
        alert("Signup failed");
      }
    } else {
      try {
        await loginUser({ email, password });
        router.push("/");
      } catch (error) {
        console.log(error);
        alert("Login failed");
      }
    }
  }

  return (
    <>
      <div
        className={
          "mt-36 grid h-4/5 w-4/5 grid-cols-[3fr_2fr] gap-6 justify-self-center"
        }
      >
        <div
          className={
            "flex h-full w-full flex-col items-center justify-evenly rounded-xl bg-gray-900 pt-20 pb-20"
          }
        >
          <div className={"flex flex-row items-center justify-between"}>
            <Image
              alt={""}
              src={"/assets/trello_icon.png"}
              width={80}
              height={80}
              className={"ml-2 rounded-md bg-white"}
            />
            <span className={"center ml-2 text-3xl text-white"}>
              IsThisTrello
            </span>
          </div>
          <div
            className={"flex flex-col items-center justify-between gap-10 p-14"}
          >
            <span className={"text-4xl"}>
              Capture, organize, and tackle your to-dos from anywhere.
            </span>
            <span className={"text-2xl"}>
              Escape the clutter and chaos—unleash your productivity with
              IsThisTrello.
            </span>
          </div>
        </div>
        <div
          className={"flex w-full flex-col items-center rounded-xl bg-gray-900"}
        >
          <form
            onSubmit={handleSubmit}
            className="flex h-full w-3/4 flex-col justify-around"
          >
            <div className={"flex w-full flex-col items-center gap-5"}>
              {!isSignedUp && (
                <input
                  type="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded border p-2"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded border p-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded border p-2"
              />
            </div>
            <div className={"flex w-full flex-col items-center gap-10"}>
              <button
                type="submit"
                className="w-full cursor-pointer rounded bg-blue-600 p-2 text-white hover:bg-blue-500"
                onClick={handleSubmit}
              >
                {isSignedUp ? "Login" : "Sign Up"}
              </button>
              {isSignedUp && (
                <span
                  onClick={() => setUi({ isSignedUp: false })}
                  className={"cursor-pointer hover:text-cyan-200"}
                >
                  Don&apos;t have an account? SignUp
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
