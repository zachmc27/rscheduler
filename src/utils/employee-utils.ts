import { Employee } from "../types/employee";

// Mock data for employees
export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    status: "FT",
    role: "Manager",
    availability: {
      Monday: "9:00 AM - 5:00 PM",
      Tuesday: "9:00 AM - 5:00 PM",
      Wednesday: "9:00 AM - 5:00 PM",
      Thursday: "9:00 AM - 5:00 PM",
      Friday: "9:00 AM - 5:00 PM",
      Saturday: "Not Available",
      Sunday: "Not Available",
    },
    requests: [
      { date: "Nov 25", reason: "Thanksgiving", status: "approved" },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "(555) 234-5678",
    email: "sarah.johnson@email.com",
    status: "FT",
    role: "Server",
    availability: {
      Monday: "11:00 AM - 7:00 PM",
      Tuesday: "11:00 AM - 7:00 PM",
      Wednesday: "11:00 AM - 7:00 PM",
      Thursday: "11:00 AM - 7:00 PM",
      Friday: "11:00 AM - 7:00 PM",
      Saturday: "11:00 AM - 7:00 PM",
      Sunday: "Not Available",
    },
    requests: [],
  },
  {
    id: 3,
    name: "Mike Chen",
    phone: "(555) 345-6789",
    email: "mike.chen@email.com",
    status: "PT",
    role: "Cook",
    availability: {
      Monday: "4:00 PM - 10:00 PM",
      Tuesday: "4:00 PM - 10:00 PM",
      Wednesday: "Not Available",
      Thursday: "4:00 PM - 10:00 PM",
      Friday: "4:00 PM - 10:00 PM",
      Saturday: "4:00 PM - 10:00 PM",
      Sunday: "Not Available",
    },
    requests: [
      { date: "Nov 23-24", reason: "Family visit", status: "pending" },
    ],
  },
  {
    id: 4,
    name: "Emma Davis",
    phone: "(555) 456-7890",
    email: "emma.davis@email.com",
    status: "PT",
    role: "Server",
    availability: {
      Monday: "12:00 PM - 8:00 PM",
      Tuesday: "Not Available",
      Wednesday: "12:00 PM - 8:00 PM",
      Thursday: "12:00 PM - 8:00 PM",
      Friday: "12:00 PM - 8:00 PM",
      Saturday: "12:00 PM - 8:00 PM",
      Sunday: "12:00 PM - 8:00 PM",
    },
    requests: [
      { date: "Nov 20", reason: "Personal day", status: "pending" },
    ],
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    phone: "(555) 567-8901",
    email: "alex.rodriguez@email.com",
    status: "FT",
    role: "Bartender",
    availability: {
      Monday: "5:00 PM - 1:00 AM",
      Tuesday: "5:00 PM - 1:00 AM",
      Wednesday: "5:00 PM - 1:00 AM",
      Thursday: "5:00 PM - 1:00 AM",
      Friday: "5:00 PM - 1:00 AM",
      Saturday: "5:00 PM - 1:00 AM",
      Sunday: "Not Available",
    },
    requests: [],
  },
  {
    id: 6,
    name: "Lisa Wilson",
    phone: "(555) 678-9012",
    email: "lisa.wilson@email.com",
    status: "PT",
    role: "Host",
    availability: {
      Monday: "10:00 AM - 6:00 PM",
      Tuesday: "10:00 AM - 6:00 PM",
      Wednesday: "Not Available",
      Thursday: "10:00 AM - 6:00 PM",
      Friday: "10:00 AM - 6:00 PM",
      Saturday: "10:00 AM - 6:00 PM",
      Sunday: "10:00 AM - 6:00 PM",
    },
    requests: [],
  },
  {
    id: 7,
    name: "David Kim",
    phone: "(555) 789-0123",
    email: "david.kim@email.com",
    status: "PT",
    role: "Dishwasher",
    availability: {
      Monday: "4:00 PM - 12:00 AM",
      Tuesday: "4:00 PM - 12:00 AM",
      Wednesday: "4:00 PM - 12:00 AM",
      Thursday: "Not Available",
      Friday: "4:00 PM - 12:00 AM",
      Saturday: "4:00 PM - 12:00 AM",
      Sunday: "4:00 PM - 12:00 AM",
    },
    requests: [],
  },
  {
    id: 8,
    name: "Maria Garcia",
    phone: "(555) 890-1234",
    email: "maria.garcia@email.com",
    status: "FT",
    role: "Server",
    availability: {
      Monday: "10:00 AM - 6:00 PM",
      Tuesday: "10:00 AM - 6:00 PM",
      Wednesday: "10:00 AM - 6:00 PM",
      Thursday: "10:00 AM - 6:00 PM",
      Friday: "10:00 AM - 6:00 PM",
      Saturday: "Not Available",
      Sunday: "Not Available",
    },
    requests: [
      { date: "Dec 1", reason: "Birthday", status: "pending" },
    ],
  },
];

// Role colors mapping
export const roleColors: Record<string, string> = {
  Manager: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Server: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Bartender: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Host: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Dishwasher: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  Cook: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

// Helper functions
export const getStatusColor = (status: string) => {
  return status === "FT" 
    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
};

export const getRoleColor = (role: string) => {
  return roleColors[role] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
};

export const getRequestStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "denied": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default: return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  }
};

// Validation function for time format (1:00 to 12:59)
export const isValidTimeFormat = (time: string): boolean => {
  if (!time) return true; // Allow empty input
  
  // Check if it matches the pattern (1-12):(00-59)
  const timeRegex = /^(1[0-2]|[1-9]):([0-5][0-9])$/;
  return timeRegex.test(time);
};
