import { FC, SVGProps } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";

export type ParamsProp = {
  locale: string;
  id?: string;
};

type LimitFields<T> = [T, T, T, T, T];

type LimitFieldsForm<T> = [T, ...T[]] & {
  length: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export type FieldsList = LimitFields<UserHookType | "">;

export type IconSvgProps = {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
};

export type ListActionsProps = {
  id: number;
  onclick?: (id: any) => void;
  icon: string;
  href?: string;
  name?: string;
};

export type OrderItemsHeaderList = {
  itemsHeader: Array<string>;
  itemsList: FieldsList;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  number: string;
  status: string;
  image: string;
};

export type IndicatorType = {
  id: number;
  name: string;
  city: string;
  link: string;
  whatsapp: string;
  user_at: string;
  document: string;
  key_pix: string;
  email: string;
  status: string;
  leads?: Lead[];
};

type Lead = {
  id: number;
  name: string;
  whatsapp: string;
  training_course: string;
  indicator_id: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type UserHookType =
  | "id"
  | "name"
  | "email"
  | "number"
  | "status"
  | "whatsapp"
  | "training_course"
  | `indicator.${string}`
  | "cidade"
  | "link"
  | "data"
  | "number_courses"
  | "created_at"
  | `segments.${string}`
  | `courses.${string}`
  | "quant_leads";

export type ItemListType = {
  id: number;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  info5: string;
};

export type ItemListHookType = "id" | "info1" | "info2" | "info3" | "info4";

export type IndicatorsType = {
  id: number;
  name: string;
  cidade: string;
  link: string;
  data: string;
};

export type IndicatorsHookType = "id" | "name" | "cidade" | "link" | "data";

export type Templateform = {
  title: string;
  textButton: string;
  sections: Array<SectionTemplateForm>;
};

export type SectionTemplateForm = {
  id: number;
  title: string;
  boxs: Array<BoxTemplateForm>;
};

export type BoxTemplateForm = {
  id: number;
  fields: LimitFieldsForm<FieldsTemplateForm>;
};

export type FieldsTemplateForm = {
  id: typesForIdFieldsForm;
  required: boolean;
  type: "text" | "date" | "image" | "select" | "password" | "file";
  label: string;
  messageError?: string;
  classInput?: string;
  options?: Array<OptionsTemplateForm>;
  value?: string | number;
  disabled?: boolean;
  roles?: Roles
};

type Roles = {
  minCaracters?: number
}

export type OptionsTemplateForm = {
  label: string;
  value: number | null;
};

type typesForIdFieldsForm =
  | "name"
  | "last_name"
  | "status"
  | "date"
  | "whatsapp"
  | "document"
  | "datebirth"
  | "genero"
  | "email"
  | "password"
  | "nivel"
  | "permission"
  | "image"
  | "key_pix"
  | "user_at"
  | "city"
  | "unit"
  | "formation"
  | "course"
  | "document"
  | "situation"
  | "indicator_id"
  | "consultant"
  | "lead_at"
  | "segments"
  | "courses"
  | "search";

export type FieldsFormSchema = {
  name?: z.ZodString;
  last_name?: z.ZodString;
  whatsapp?: z.ZodString;
  document?: z.ZodString;
  email?: z.ZodString;
  password?: z.ZodString;
  key_pix?: z.ZodString;
  status?: z.ZodString;
  user_at?: z.ZodString;
  city?: z.ZodString;
  datebirth?: z.ZodString;
  genero?: z.ZodString;
  nivel?: z.ZodString;
  permission?: z.ZodString;
  image?: z.ZodString;
  unit?: z.ZodString;
  formation?: z.ZodString;
  course?: z.ZodString;
  situation?: z.ZodString;
  indicator_id?: z.ZodString;
  consultant?: z.ZodString;
  lead_at?: z.ZodString;
  segments?: z.ZodString;
  courses?: z.ZodString;
  date?: z.ZodString;
  search?: z.ZodString;
}

type NamesSearchs = "search";

export type Searchs = Array<{
  id?: number;
  propsInput: UseFormRegisterReturn<string>;
  placeholder: string;
  name: NamesSearchs;
}>;

export type LimitColsGrid = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
