import { MenuIcon } from "@/components/Icons/MenuIcon";
import { Button } from "@/components/atoms";
import Avatar from "@/components/molecules/Avatar";
import InfoUserNav from "@/components/molecules/InfoUserNav";
import React, { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type NavBarProps = {
  setOpenMenu: Dispatch<SetStateAction<any>>;
  openMenu: boolean | null;
};

const NavBar: React.FC<NavBarProps> = ({ setOpenMenu, openMenu }) => {
  function openCloseMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <nav
      className={twMerge(
        "w-screen z-40 h-auto items-center fixed whitespace-nowrap bg-gray-300",
        openMenu === true && "animate-openNavBar",
        openMenu === false && "animate-closeNavBar"
      )}
    >
      <div
        className={twMerge(
          "h-[var(--navbar-height)]",
          "flex w-full flex-row relative flex-nowrap items-center justify-between",
          !openMenu ? "px-6" : "md:px-6"
        )}
      >
        <Button
          className={twMerge(
            openMenu
              ? "md:p-4 p-0 md:w-auto w-[var(--width-nav-bar)] flex justify-center items-center"
              : ""
          )}
          onClick={openCloseMenu}
          type="button"
        >
          <MenuIcon size={30} />
        </Button>
        <div
          className={twMerge(
            "flex flex-row gap-4",
            openMenu && "hidden md:flex"
          )}
        >
          <Avatar
            classIcon={`size-${[50]}px`}
            href="dashboard/profile"
            image="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            size={50}
          />
          <InfoUserNav className="hidden md:flex" nameUser="Argerio Q. Silva" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
