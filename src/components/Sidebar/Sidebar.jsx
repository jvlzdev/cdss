import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { SlHome } from "react-icons/sl";
import { FaHospitalUser } from "react-icons/fa";
import { BsInfoSquare, BsEnvelopeAt } from "react-icons/bs";
import { FaTshirt, FaRedhat } from "react-icons/fa";
// import logo from "@/img/logo.svg";
import { Link, useLocation } from "react-router-dom";
import logoImg from '../../assets/logo.png'
export default function Sidebar({ show, setter }) {
  const router = useLocation();
  // Define our base class
  const className =
    "w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";
  // Clickable menu items
  const MenuItem = ({ icon, name, route }) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      router.pathname === route
        ? "text-white"
        : "text-white/50 hover:text-white";
    return (
      <Link
        to={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-6 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };
  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );
  return (
    <>
      <div style={{ background: '#345673' }} className={`${className}${appendClass}`}>
      <div style={{ background: '#345673', height: '100px' }}/>
        <div className="flex-col p-2">
          <MenuItem name="Dashboard" route="/" icon={<SlHome />} />
          <MenuItem name="Employees" route="/employees" icon={<FaHospitalUser />} />
          <MenuItem name="Patients" route="/patients" icon={<FaUser />} />
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
