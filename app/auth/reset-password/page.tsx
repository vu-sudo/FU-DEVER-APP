"use client";
import React from "react";

import { Form, Formik } from "formik";
import InputForm from "@/components/InputForm";
import Image from "next/image";
import Logo from "@image/page/authentication/signin/logo.svg";
import ResetImg from "@image/page/authentication/reset/resetImage.jpg";
import { registerAccount } from "@/apis/auth";
import { registerSchema } from "@/ultils/validation";

type UserRegister = {
  email : string,
  password : string,
  confirmPassword: string,
}
function ResetPassword() {
  const onSubmit = async (values: UserRegister, actions: any) => {
  
  //   try {
  //     const loginResponse = await registerAccount(values);
  //     const token = loginResponse.data;
      
    
  //   } catch (error: unknown) {
  //     if (error instanceof ValidationError) {
  //       if (error?.name === "ValidationError") {
  //         toast.error(error.errors[0]);
  //       }
  //     }
  //     if (axios.isAxiosError(error)) {
  //       if (
  //         error.response?.status === 401 ||
  //         error.response?.status === 404 ||
  //         error.response?.status === 400
  //       ) {
  //         toast.error("Wrong password or email");
  //       }
  //       if(error.response?.status === 422) 
  //       var userError = error.response.data.errors.match(/\[(.*?)\]/);
  //       toast.error(userError[1]+" has not confirmed email");
  //     }
  //     actions.resetForm();
  //   //export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';
  // }
};
  return (
    <section>
      <div className="h-screen w-full flex justify-center bg-[#F9FAFB] dark:bg-[#F9FAFB] bg-opacity-50 items-center">
        <div className="flex flex-col max-w-[1440px] mt-6  justify-center items-center w-full ">
          <a href="#">
            <Image
              src={Logo}
              alt="Picture of the author"
              className="w-[210px] h-auto mb-10"
            />
          </a>
          <div className="max-w-[1024px] h-[581px] shadow-lg bg-white w-full flex items-center rounded-lg overflow-hidden ">
            <div className="">
              <Image
                src={ResetImg}
                alt="Picture of login"
                className="w-full h-[581px] "
              />
            </div>
            <div className=" px-16 w-[calc(100%-387px)]  ">
              <h2 className="text-3xl  leading-9 font-bold mb-8">
                Reset your password
              </h2>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={registerSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-6">
                      <div className="text-sm font-medium block leading-5 mb-2">
                        Your email:
                      </div>
                      <InputForm
                        label="email"
                        name="email"
                        type="email"
                        id="email"
                        placeholder="name@company.com"
                      ></InputForm>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm font-medium block leading-5 mb-2">
                        Your new password:
                      </div>
                      <InputForm
                        label="password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your new password"
                      ></InputForm>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm font-medium block leading-5 mb-2">
                        Confirm your new password:
                      </div>
                      <InputForm
                        label="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm your new password"
                      ></InputForm>
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-5 py-3 leading-6 font-medium rounded-lg text-white text-base"
                    >
                      Reset password
                    </button>
                    <div className=" text-sm leading-5 font-medium text-[#6B7280]">
                      Already have an account?
                      <a
                        href="https://www.fu-dever.com/auth/sign-in"
                        className="text-[#0098FF] ml-1  hover:underline"
                      >
                        Login here
                      </a>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
