import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as AiFillYoutube from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Art Generator",
    path: "/image-generator",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text"
  },
  {
    title: "Business Names Generator",
    path: "/business-name-generator",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text"
  },
  {
    title: "Product Descriptions",
    path: "/ecommerce-generator",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Product Name Generator",
    path: "/title-generator",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text"
  },
  {
    title: "YouTube Script Generator",
    path: "/youtube-script-generator",
    icon: <AiIcons.AiFillYoutube />,
    cName: "nav-text"
  },
  {
    title: "YouTube Topic Ideas",
    path: "/youtube-topic-generator",
    icon: <AiIcons.AiFillYoutube />,
    cName: "nav-text"
  },
  {
    title: "YouTube Title Ideas",
    path: "/youtube-title-generator",
    icon: <AiIcons.AiFillYoutube />,
    cName: "nav-text"
  },
  {
    title: "YouTube Description Ideas",
    path: "/youtube-description-generator",
    icon: <AiIcons.AiFillYoutube />,
    cName: "nav-text"
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text"
  },
];
