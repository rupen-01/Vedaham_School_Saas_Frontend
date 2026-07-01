import React from "react";
import { Icon } from "@iconify/react";

const MenuItem2 = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Icon icon="solar:widget-4-bold-duotone" />,
  },
  {
    name: "Institutions",
    icon: <Icon icon="famicons:school" />,
    subItems: [
      { name: "Add Institution", path: "/institutions/add" },
      { name: "Manage Institutions", path: "/institutions/manage" },
    ],
  },
  {
    name: "Plans",
    icon: <Icon icon="basil:invoice-solid" />,
    subItems: [
      { name: "Add Plan", path: "/plans/add" },
      { name: "Manage Plans", path: "/plans/manage" },
      { name: "Plan Analytics", path: "/plans/analytics" },
    ],
  },
  {
    name: "Users",
    icon: <Icon icon="solar:user-bold-duotone" />,
    subItems: [
      { name: "Add User", path: "/users/add" },
      { name: "Manage Users", path: "/users/manage" },
    ],
  },
  {
    name: "Messages",
    icon: <Icon icon="fluent:people-chat-48-regular" />,
    subItems: [
      { name: "Support Tickets", path: "/messages/support-tickets" },
      { name: "Feedbacks", path: "/messages/feedbacks" },
      { name: "Announcements", path: "/messages/announcements" },
    ],
  },
  {
    name: "LMS",
    icon: <Icon icon="solar:shield-user-bold-duotone" />,
    subItems: [
      { name: "Add Lead", path: "/lms/add-lead" },
      { name: "Manage Leads", path: "/lms/manage-leads" },
      { name: "Lead Analytics", path: "/lms/lead-analytics" },
      { name: "Lead Reports", path: "/lms/lead-reports" },
    ],
  },
  {
    name: "Subscriptions",
    icon: <Icon icon="solar:wallet-bold-duotone" />,
    subItems: [
      { name: "Subscription View", path: "/subscriptions/view" },
      { name: "Subscription Analytics", path: "/subscriptions/analytics" },
      { name: "Subscription Reports", path: "/subscriptions/reports" },
    ],
  },
  {
    name: "Settings",
    icon: <Icon icon="solar:settings-bold-duotone" />,
    subItems: [
      { name: "Modules", path: "/settings/modules"},
      { name: "Payment Gateway", path: "/settings/payment-gateway" },
      { name: "Role Permissions", path: "/settings/role-permissions" },
      { name: "Terms and Conditions", path: "/settings/terms-and-conditions" },
    ],
  },
];

export default MenuItem2;
