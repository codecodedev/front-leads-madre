"use client";

import { Button, Text } from "@/components/atoms";
import { HeaderList } from "@/components/molecules";
import ItemList from "@/components/molecules/ItemList";
import { useHandlerRouter } from "@/hooks/use-handler-router";
import { ItemListType, ListActionsProps } from "@/types/general";
import React from "react";
import { twJoin, twMerge } from "tailwind-merge";

type ListingProps = {
  title?: string;
  textButton?: string;
  hrefButton?: string;
  list: Array<ItemListType> | undefined;
  listActions?: Array<ListActionsProps>;
  avatar?: (item: ItemListType, index: number) => React.JSX.Element;
  itemsHeader?: Array<string>;
  variant?: "default" | "segmented";
  loading?: boolean;
  errorMessage?: string;
};

const Listing = ({
  listActions,
  title,
  textButton,
  hrefButton,
  list,
  avatar = (item, index) => <></>,
  itemsHeader,
  variant = "default",
  loading,
  errorMessage,
}: ListingProps) => {
  const { pushRouter } = useHandlerRouter();
  return (
    <div
      className={twJoin(
        "w-[90vw] md:w-full flex flex-col justify-center items-center",
        variant === "segmented" && "p-[1vw] rounded-xl bg-gray-500"
      )}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <Text
          className={twMerge(
            `uppercase font-bold text-2xl lg:text-4xl ${
              variant == "default" ? "text-black" : "text-white"
            } whitespace-nowrap overflow-hidden text-ellipsis`
          )}
        >
          {title}
        </Text>
        {textButton && (
          <Button
            onClick={() => pushRouter(hrefButton)}
            className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
            type="button"
          >
            {textButton}
          </Button>
        )}
      </div>
      {itemsHeader && itemsHeader.length > 0 && (
        <div
          className={twMerge(
            variant === "segmented"
              ? "w-[88vw] md:w-full"
              : "w-[90vw] md:w-full"
          )}
        >
          <HeaderList itemsHeader={itemsHeader} />
        </div>
      )}
      {list != undefined ? (
        <div
          className={twMerge(
            "w-full mt-4 flex flex-col gap-4 pb-4 justify-start items-center",
            variant === "segmented" && "w-[88vw] lg:w-[93vw]"
          )}
        >
          {listActions &&
            list?.map((item, index) => (
              <ItemList
                key={item.id}
                listActions={listActions}
                avatar={avatar(item, index)}
                info1={item.info1}
                info2={item.info2}
                info3={item.info3}
                info4={item.info4}
                info5={item.info5}
                id={item.id}
              />
            ))}
        </div>
      ) : loading ? (
        <div className="w-full h-[20vh] p-4 flex justify-center items-center">
          <Text>Loading...</Text>
        </div>
      ) : (
        errorMessage && (
          <div className="w-full h-[20vh] p-4 flex justify-center items-center">
            <Text>{errorMessage}</Text>
          </div>
        )
      )}
    </div>
  );
};

export default Listing;
