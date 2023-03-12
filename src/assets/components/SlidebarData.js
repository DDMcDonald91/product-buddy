import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as AiFillYoutube from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "Art Generator",
    path: "/image-generator",
    icon: <FaIcons.FaEnvelopeOpenText style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "Business Names Generator",
    path: "/business-name-generator",
    icon: <IoIcons.IoMdPeople style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "Business Slogan Generator",
    path: "/business-slogan-generator",
    icon: <IoIcons.IoMdPeople style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "Product Descriptions",
    path: "/product-description-generator",
    icon: <IoIcons.IoIosPaper style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "Product Name Generator",
    path: "/product-title-generator",
    icon: <FaIcons.FaCartPlus style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "YouTube Script Generator",
    path: "/youtube-script-generator",
    icon: <AiIcons.AiFillYoutube style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "YouTube Topic Ideas",
    path: "/youtube-topic-generator",
    icon: <AiIcons.AiFillYoutube style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "YouTube Title Ideas",
    path: "/youtube-title-generator",
    icon: <AiIcons.AiFillYoutube style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "YouTube Description Ideas",
    path: "/youtube-description-generator",
    icon: <AiIcons.AiFillYoutube style={{color: 'white'}} />,
    cName: "nav-text"
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle style={{color: 'white'}} />,
    cName: "nav-text"
  },
];
