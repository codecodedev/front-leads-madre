"use client";

import { Button, Form, Text } from "@/components/atoms";
import Box from "@/components/atoms/Box";
import { FormFieldText } from "@/components/molecules";
import FormFieldSelect from "@/components/molecules/FormFieldSelect";
import { useHandlerValuesField } from "@/hooks/use-hanlder-values-field";
import {
  BoxTemplateForm,
  FieldsTemplateForm,
  LimitColsGrid,
  Templateform,
} from "@/types/general";
import React, { useEffect } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

type FormDashboardProps = {
  templateform: Templateform;
  handlerForm: (state: any) => void;
  handleSubmit: UseFormHandleSubmit<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  loading?: boolean;
};

const FormDashboard = ({
  handlerForm,
  templateform,
  handleSubmit,
  register,
  errors,
  loading = false,
}: FormDashboardProps) => {
  const handlerFieldRender = (field: FieldsTemplateForm) => {
    const propsField = {
      props: { ...register(field.id, { required: field.required }) },
      label: field.label,
      classInput: `bg-gray-300 ${field.classInput ?? ""} ${
        errors[field.id] && "ring-red-500 focus:ring-red-500"
      }`,
      error: errors[field.id]?.message,
      disabled: field.disabled,
    };
    if (field.type == "select") {
      return (
        <FormFieldSelect
          key={field.id}
          {...propsField}
          type="select"
          options={field.options}
        />
      );
    } else {
      return <FormFieldText key={field.id} {...propsField} type={field.type} />;
    }
  };

  const handlerBoxRender = (boxitem: BoxTemplateForm) => {
    const grid_cols: LimitColsGrid = boxitem?.fields?.length as LimitColsGrid;
    return (
      <Box key={boxitem.id} cols={grid_cols}>
        {boxitem.fields.map((field) => handlerFieldRender(field))}
      </Box>
    );
  };

  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit(handlerForm)} className="mb-8">
        <div className="w-[90vw] md:w-full flex flex-row justify-between items-center">
          <Text className="uppercase font-bold text-2xl lg:text-4xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
            {templateform?.title}
          </Text>
          <Button
            className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
            type="submit"
          >
            {templateform?.textButton}
          </Button>
        </div>

        {templateform?.sections.map((section) => (
          <div key={section.id} className="w-[90vw] md:w-full mt-10 lg:mt-8">
            <div className="p-4 pb-2 bg-gray-200 rounded-xl rounded-b-none w-56 shadow-md shadow-slate-400">
              <Text className="text-black font-normal text-sm text-center uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                {section.title}
              </Text>
            </div>
            <div className="w-[90vw] grid-cols-12 md:w-full border-2 flex flex-col gap-4 bg-gray-200 p-6 rounded-xl rounded-tl-none shadow-md shadow-slate-400">
              {!loading ? (
                section?.boxs.map((boxitem) => handlerBoxRender(boxitem))
              ) : (
                <Text>Loading...</Text>
              )}
            </div>
          </div>
        ))}
      </Form>
    </div>
  );
};

export default FormDashboard;
