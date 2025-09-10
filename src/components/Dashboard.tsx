import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight, Settings, Download, PanelRightOpen } from "lucide-react";
import { ConfigurationPanel } from "./ConfigurationPanel";

export function Dashboard() {
  const [currentWeek, setCurrentWeek] = useState("Nov 18 - Nov 24, 2024");
  const [showConfigPanel, setShowConfigPanel] = useState(false);

  // Role color assignment system - matches TeamManagement
  const roleColors = {
    "Manager": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "Server": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    "Bartender": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Host": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "Cook": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "Dishwasher": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  };

  const getRoleColor = (role: string) => {
    return roleColors[role] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  // Mock schedule data - matches TeamManagement employees
  const unsortedEmployees = [
    { name: "John Smith", role: "Manager" },
    { name: "Sarah Johnson", role: "Server" },
    { name: "Mike Chen", role: "Cook" },
    { name: "Emma Davis", role: "Server" },
    { name: "Alex Rodriguez", role: "Bartender" },
    { name: "Lisa Wilson", role: "Host" },
    { name: "David Kim", role: "Dishwasher" },
    { name: "Maria Garcia", role: "Server" },
  ];

  // Sort employees by role, then by name within each role (same as TeamManagement)
  const employees = [...unsortedEmployees].sort((a, b) => {
    // First sort by role (Manager first, then alphabetical)
    if (a.role === "Manager" && b.role !== "Manager") return -1;
    if (b.role === "Manager" && a.role !== "Manager") return 1;
    
    const roleCompare = a.role.localeCompare(b.role);
    if (roleCompare !== 0) return roleCompare;
    
    // Then sort by name within the same role
    return a.name.localeCompare(b.name);
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = ["18", "19", "20", "21", "22", "23", "24"];

  const getScheduleEntry = (employeeIndex: number, dayIndex: number) => {
    // Mock schedule entries - expanded to match new employee list
    const schedules = [
      ["9:00-17:00", "9:00-17:00", "9:00-17:00", "9:00-17:00", "9:00-17:00", "OFF", "OFF"], // John Smith - Manager
      ["17:00-1:00", "17:00-1:00", "17:00-1:00", "17:00-1:00", "17:00-1:00", "17:00-1:00", "OFF"], // Alex Rodriguez - Bartender
      ["8:00-16:00", "8:00-16:00", "8:00-16:00", "PTO", "8:00-16:00", "8:00-16:00", "OFF"], // Mike Chen - Cook
      ["16:00-24:00", "16:00-24:00", "16:00-24:00", "OFF", "16:00-24:00", "16:00-24:00", "16:00-24:00"], // David Kim - Dishwasher
      ["10:00-18:00", "10:00-18:00", "OFF", "10:00-18:00", "10:00-18:00", "10:00-18:00", "10:00-18:00"], // Lisa Wilson - Host
      ["12:00-20:00", "OFF", "12:00-20:00", "12:00-20:00", "12:00-20:00", "12:00-20:00", "12:00-20:00"], // Emma Davis - Server
      ["10:00-18:00", "10:00-18:00", "10:00-18:00", "10:00-18:00", "10:00-18:00", "OFF", "OFF"], // Maria Garcia - Server
      ["11:00-19:00", "11:00-19:00", "OFF", "11:00-19:00", "11:00-19:00", "11:00-19:00", "11:00-19:00"], // Sarah Johnson - Server
    ];
    return schedules[employeeIndex]?.[dayIndex] || "";
  };

  const getEntryStyle = (entry: string) => {
    if (entry === "OFF") return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    if (entry === "PTO") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  };

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2>Mario's Italian Restaurant</h2>
              <Button variant="ghost" size="sm">
                <Settings size={16} />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Export to Google Sheets
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowConfigPanel(true)}
              >
                <PanelRightOpen size={16} className="mr-2" />
                Configure
              </Button>
            </div>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button variant="ghost" size="sm">
              <ChevronLeft size={16} />
            </Button>
            <span className="font-medium">{currentWeek}</span>
            <Button variant="ghost" size="sm">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        {/* Schedule Table */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 w-48">Employee</th>
                    {days.map((day, index) => (
                      <th key={day} className="text-center p-3 min-w-32">
                        <div>{day}</div>
                        <div className="text-sm text-muted-foreground">{dates[index]}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, empIndex) => (
                    <tr key={employee.name} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <Badge className={`text-xs mt-1 ${getRoleColor(employee.role)}`}>
                            {employee.role}
                          </Badge>
                        </div>
                      </td>
                      {days.map((_, dayIndex) => {
                        const entry = getScheduleEntry(empIndex, dayIndex);
                        return (
                          <td key={dayIndex} className="p-3 text-center">
                            {entry && (
                              <div className={`px-2 py-1 rounded text-xs ${getEntryStyle(entry)}`}>
                                {entry}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Panel */}
      <ConfigurationPanel 
        isOpen={showConfigPanel} 
        onClose={() => setShowConfigPanel(false)} 
      />
    </div>
  );
}