"use client";

import { EditIcon } from "@/components/Icons/EditIcon";
import { EyeIcon } from "@/components/Icons/EyeIcon";
import { LockIcon } from "@/components/Icons/LockIcon";
import { Text } from "@/components/atoms";
import { mockServer } from "@/components/config/mockServer";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Search from "@/components/molecules/Search";
import Listing from "@/components/organisms/Listing";
import { useItemListTransform } from "@/hooks/use-item-list-transform";
import {
  ItemListType,
  UserType,
  OrderItemsHeaderList,
  Searchs,
} from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ListUnits: React.FC = () => {
  const { listTransform } = useItemListTransform();
  const OrderItemsHeaderList: OrderItemsHeaderList = {
    itemsHeader: ["N", "NOME", "QUANT. SEGMENTOS", " QUANT. CURSOS", ""],
    itemsList: ["name", "", "segments.length", "courses.length", ""],
  };
  let list = listTransform(mockServer.unidades, OrderItemsHeaderList.itemsList);

  const searchSchema = z.object({
    search: z.string().min(2, { message: "Must be 2 or more characters long" }),
  });

  type SearchSchemaType = z.infer<typeof searchSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
  });

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>;
  };

  function handlerForm(data: SearchSchemaType) {
    console.log("handlerForm Search: ", data);
  }

  const searchs: Searchs = [
    {
      id: 1,
      propsInput: { ...register("search") },
      placeholder: "Search...",
      name: "search",
    },
  ];

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4 mb-6">
        <div className="w-full">
          <Breadcrumb />
        </div>

        <div className="w-full mt-6">
          <Search handlerForm={handleSubmit(handlerForm)} searchs={searchs} />
        </div>

        <div className="w-full mt-6 lg:mt-8">
          <Listing
            itemsHeader={OrderItemsHeaderList.itemsHeader}
            avatar={renderAvatar}
            list={list}
            listActions={mockServer.listActionsLeads}
            hrefButton="dashboard/units/register"
            textButton="Nova Unidade"
            title="Unidades"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ListUnits;
