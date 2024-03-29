"use client";

import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormDashboard from "@/components/organisms/FormDashboard";
import React from "react";
import { templateform } from "./templateForm";
import { loginUser } from "@/actions/auth";
import { formSchemaSignin } from "../SingIn/schema";

const RegisterUnits: React.FC = () => {
  function handleRegister(data: object) {
    console.log("data FormDashboard: ", data);
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4 ">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            templateform={templateform}
            action={loginUser}
            schema={formSchemaSignin}
            pathSuccess="dashboard/indicators"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default RegisterUnits;
