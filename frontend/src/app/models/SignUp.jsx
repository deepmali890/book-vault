'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { FcUnlock } from 'react-icons/fc';
import { BsArrowRight } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

import loginlogo from '../../../public/White_Book_Store_Minimalist_Logo-removebg-preview.png';
import Loding from '../components/ui/Loding';

const SignUp = ({ loginStatus, setLoginStatus }) => {
  const [compStatus, setCompStatus] = useState(true); // true = login, false = sign up

  return (
    <div className={`${loginStatus ? "opacity-100 visible fixed z-[9999999] w-full" : "opacity-0 invisible fixed"} duration-500 top-0`}>
      <div className="w-full h-screen bg-[rgba(0,0,0,0.7)]">
        <div className="w-[600px] h-screen absolute right-0 bg-white rounded-s-3xl overflow-y-auto">
          <div className="w-full flex justify-end text-3xl">
            <div className="cursor-pointer p-4">
              <RxCross2 onClick={() => setLoginStatus(!loginStatus)} />
            </div>
          </div>

          <div className="text-center">
            <Image src={loginlogo} className="w-[80px] mx-auto my-3" alt="logo" />
            <h2 className="my-1 text-[22px] font-semibold">Your Account Awaits!</h2>
            <p className="text-[20px] flex gap-2 items-center justify-center">
              Sign in to unlock your personalized features. <FcUnlock />
            </p>
          </div>

          {compStatus ? (
            <LoginBox loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
          ) : (
            <SignUpBox
              compStatus={compStatus}
              setCompStatus={setCompStatus}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />
          )}

          <div>
            <div className="text-[13px] mt-6 text-center font-semibold">Social login</div>
            <div className="flex justify-center gap-6 my-4">
              <button className="border-2 hover:bg-[#CCCCCC] lg:w-auto w-full rounded-md duration-500 border-gray-800 py-2.5 px-10 text-[14px] font-medium flex items-center justify-center gap-3">
                <FaFacebookF className="text-[16px]" /> Sign in with Facebook
              </button>
              <button className="border-2 hover:bg-[#CCCCCC] rounded-md lg:w-auto w-full duration-500 border-gray-800 py-2.5 px-10 text-[14px] font-medium flex items-center justify-center gap-3">
                <FaGoogle className="text-[16px]" /> Sign in with Google
              </button>
            </div>
            <button className="border-2 hover:bg-[#CCCCCC] rounded-md lg:w-auto w-full duration-500 border-gray-800 py-2.5 px-10 text-[14px] mx-auto font-medium flex items-center justify-center gap-3">
              <FaGithub className="text-[16px]" /> Sign in with GitHub
            </button>
          </div>

          <div className="text-center">
            <div className="text-[13px] font-semibold">Create an account</div>
            <div className="text-[14px] font-semibold">
              Don't have an account?{' '}
              <span onClick={() => setCompStatus(false)} className="underline underline-offset-4 cursor-pointer">
                Sign up <BsArrowRight className="inline" />
              </span>
            </div>
            <h5 className="text-[10px] font-semibold mt-5">
              By signing in, you agree to Book Vault’s Terms & Conditions and Privacy Policy, consent to receive Book
              Vault’s electronic communications, and unlock a personalized book journey with exclusive features,
              updates, and offers tailored just for you.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

function LoginBox({ loginStatus, setLoginStatus }) {
  const [loginData, setLoginData] = useState({});
  const [loding, setLoding] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    setLoding(true);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, loginData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setLoding(false);
        if (response.status === 200 || response.status === 201) {
          toast.success(response.data.message || 'Logged in successfully!');
          const { token, userId } = response.data;
          Cookies.set('book_vault', JSON.stringify({ token, userId }), { expires: 7, path: '/' });
          setLoginStatus(false);
          e.target.reset();
        }
      })
      .catch((error) => {
        setLoding(false);
        toast.error(error.response?.data?.message || 'Something went wrong!');
      });
  };

  return (
    <div className="px-10">
      <form onSubmit={loginHandler}>
        <div className="w-full gap-1.5">
          <label htmlFor="email">Email :</label>
          <input
            name="email"
            required
            type="email"
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            placeholder="Email"
            className="w-full outline-none py-2 border border-gray-300 ps-2"
          />
        </div>

        <div className="w-full gap-1.5 mt-2">
          <label htmlFor="password">Password :</label>
          <input
            name="password"
            required
            type="password"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            placeholder="Password"
            className="w-full outline-none py-2 border border-gray-300 ps-2"
          />
        </div>

        <Link href="/pages/forgetpassword/emailverify">
          <div className="text-[13px] font-semibold underline cursor-pointer mt-1">Forgot Password?</div>
        </Link>
        <button type="submit" className="p-3.5 mt-2 w-full bg-gray-800 hover:rounded-full rounded text-white font-semibold">
          <Loding loding={loding} title="Log in" />
        </button>
      </form>
    </div>
  );
}

function SignUpBox({ setCompStatus, compStatus, loginStatus, setLoginStatus }) {
  const [signUpData, setSignUpData] = useState({});
  const [loding, setLoding] = useState(false);

  const signUpHandler = (e) => {
    e.preventDefault();
    setLoding(true);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, signUpData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setLoding(false);
        if (response.status === 200 || response.status === 201) {
          toast.success(response.data.message || 'User registered successfully!');
          setLoginStatus(false);
        }
      })
      .catch((error) => {
        setLoding(false);
        toast.error(error.response?.data?.message || 'Something went wrong!');
      });
  };

  return (
    <section>
      <div className="pt-3 text-[14px] text-center font-semibold my-2">
        Already have an account?{' '}
        <span onClick={() => setCompStatus(true)} className="underline underline-offset-4 cursor-pointer">
          Log in <BsArrowRight className="inline" />
        </span>
      </div>

      <form onSubmit={signUpHandler}>
        <div className="grid grid-cols-2 gap-3 w-full px-4">
          <div className="w-full gap-1.5">
            <label htmlFor="firstname">First Name :</label>
            <input
              name="firstname"
              required
              type="text"
              onChange={(e) => setSignUpData({ ...signUpData, firstname: e.target.value })}
              placeholder="First Name"
              className="w-full outline-none py-2 border border-gray-300 ps-2"
            />
          </div>
          <div className="w-full gap-1.5">
            <label htmlFor="lastname">Last Name :</label>
            <input
              name="lastname"
              required
              type="text"
              onChange={(e) => setSignUpData({ ...signUpData, lastname: e.target.value })}
              placeholder="Last Name"
              className="w-full outline-none py-2 border border-gray-300 ps-2"
            />
          </div>
        </div>

        <div className="px-4">
          <div className="w-full gap-1.5 mt-2">
            <label htmlFor="email">Email :</label>
            <input
              name="email"
              required
              type="email"
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              placeholder="Email"
              className="w-full outline-none py-2 border border-gray-300 ps-2"
            />
          </div>

          <div className="w-full gap-1.5 mt-2">
            <label htmlFor="password">Password :</label>
            <input
              name="password"
              required
              type="password"
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
              placeholder="Password"
              className="w-full outline-none py-2 border border-gray-300 ps-2"
            />
          </div>
        </div>

        <button type="submit" className="p-3.5 mt-2 w-full bg-gray-800 hover:rounded-full rounded text-white font-semibold mx-auto">
          <Loding loding={loding} title="Sign Up" />
        </button>
      </form>
    </section>
  );
}
