import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Phone, Mail, Trash2, Calendar, User, Clock as ClockIcon } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: "FT" | "PT";
  role: string;
  availability: Record<string, string>;
  requests: Array<{ date: string; reason: string; status: string }>;
}

export function TeamManagement() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Employee | null>(null);
  const [showAddRequest, setShowAddRequest] = useState<Employee | null>(null);
  const [editingAvailability, setEditingAvailability] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    status: "",
    role: "",
    phone: "",
    email: "",
  });
  const [newRequest, setNewRequest] = useState({
    date: "",
    reason: "",
  });

  // Role color assignment system - randomly assigns colors when roles are "created"
  const roleColors: Record<string, string> = {
    "Manager": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "Server": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    "Bartender": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Host": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "Cook": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "Dishwasher": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  };

  // Mock employee data
  const [employees] = useState<Employee[]>([
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
        { date: "Nov 25", reason: "Vacation day", status: "approved" },
      ],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "(555) 234-5678",
      email: "sarah.johnson@email.com",
      status: "PT",
      role: "Server",
      availability: {
        Monday: "11:00 AM - 7:00 PM",
        Tuesday: "11:00 AM - 7:00 PM",
        Wednesday: "Not Available",
        Thursday: "11:00 AM - 7:00 PM",
        Friday: "11:00 AM - 7:00 PM",
        Saturday: "11:00 AM - 7:00 PM",
        Sunday: "11:00 AM - 7:00 PM",
      },
      requests: [
        { date: "Nov 22", reason: "Doctor appointment", status: "pending" },
      ],
    },
    {
      id: 3,
      name: "Mike Chen",
      phone: "(555) 345-6789",
      email: "mike.chen@email.com",
      status: "FT",
      role: "Cook",
      availability: {
        Monday: "8:00 AM - 4:00 PM",
        Tuesday: "8:00 AM - 4:00 PM",
        Wednesday: "8:00 AM - 4:00 PM",
        Thursday: "Not Available",
        Friday: "8:00 AM - 4:00 PM",
        Saturday: "8:00 AM - 4:00 PM",
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
  ]);

  const getStatusColor = (status: string) => {
    return status === "FT" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  };

  const getRoleColor = (role: string) => {
    return roleColors[role] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  // Sort employees by role, then by name within each role
  const sortedEmployees = [...employees].sort((a, b) => {
    // First sort by role (Manager first, then alphabetical)
    if (a.role === "Manager" && b.role !== "Manager") return -1;
    if (b.role === "Manager" && a.role !== "Manager") return 1;
    
    const roleCompare = a.role.localeCompare(b.role);
    if (roleCompare !== 0) return roleCompare;
    
    // Then sort by name within the same role
    return a.name.localeCompare(b.name);
  });

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "denied": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  const handleNewEmployeeChange = (field: string, value: string) => {
    setNewEmployee(prev => ({ ...prev, [field]: value }));
  };

  const handleNewRequestChange = (field: string, value: string) => {
    setNewRequest(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEmployee = () => {
    console.log("Adding employee:", newEmployee);
    setNewEmployee({ name: "", status: "", role: "", phone: "", email: "" });
    setShowAddEmployee(false);
  };

  const handleAddRequest = () => {
    console.log("Adding request:", newRequest);
    setNewRequest({ date: "", reason: "" });
    setShowAddRequest(null);
  };

  const handleAvailabilityChange = (day: string, value: string) => {
    if (!selectedEmployee) return;
    
    const updatedEmployee = {
      ...selectedEmployee,
      availability: {
        ...selectedEmployee.availability,
        [day]: value
      }
    };
    setSelectedEmployee(updatedEmployee);
  };

  const handleEmployeeInfoChange = (field: 'status' | 'phone' | 'email', value: string) => {
    if (!selectedEmployee) return;
    
    const updatedEmployee = {
      ...selectedEmployee,
      [field]: value
    };
    setSelectedEmployee(updatedEmployee);
  };

  const handleSaveEmployee = () => {
    console.log("Saving employee changes:", selectedEmployee);
    // TODO: Implement actual save functionality
    // This would typically update the employees array or make an API call
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Team Management</h2>
        <Button onClick={() => setShowAddEmployee(true)}>
          <Plus size={16} className="mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEmployees.map((employee) => (
          <Card 
            key={employee.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedEmployee(employee)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{employee.name}</span>
                <div className="flex gap-2">
                  <Badge className={getRoleColor(employee.role)}>
                    {employee.role}
                  </Badge>
                  <Badge className={getStatusColor(employee.status)}>
                    {employee.status}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone size={14} />
                  {employee.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail size={14} />
                  {employee.email}
                </div>
                {employee.requests.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} />
                    <span>{employee.requests.length} pending request{employee.requests.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employee Detail Modal */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] !flex !flex-col !p-0" style={{ '--dialog-close-top': '0.5rem' } as React.CSSProperties}>
          <DialogHeader className="relative flex-shrink-0 p-6 pb-4">
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedEmployee?.name}</span>
              <div className="flex gap-3" style={{ marginRight: '20px' }}>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAddRequest(selectedEmployee)}
                >
                  Add Request
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setShowDeleteConfirm(selectedEmployee);
                    setSelectedEmployee(null);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </DialogTitle>
            <DialogDescription>
              Employee details and availability
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0 max-h-[calc(85vh-120px)]">
            {selectedEmployee && (
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic" className="flex items-center gap-2">
                    <User size={16} />
                    Basic Information
                  </TabsTrigger>
                  <TabsTrigger value="availability" className="flex items-center gap-2">
                    <ClockIcon size={16} />
                    Weekly Availability
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Role</Label>
                      <div className="mt-1">
                        <Badge className={getRoleColor(selectedEmployee.role)}>
                          {selectedEmployee.role}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label>Employment Status</Label>
                      <div className="mt-1">
                        <Select 
                          value={selectedEmployee.status} 
                          onValueChange={(value: string) => handleEmployeeInfoChange('status', value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FT">Full Time</SelectItem>
                            <SelectItem value="PT">Part Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={selectedEmployee.phone}
                        onChange={(e) => handleEmployeeInfoChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={selectedEmployee.email}
                        onChange={(e) => handleEmployeeInfoChange('email', e.target.value)}
                        placeholder="employee@email.com"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Submitted Requests</Label>
                    <div className="mt-2 space-y-2">
                      {selectedEmployee.requests.length > 0 ? (
                        selectedEmployee.requests.map((request, index) => (
                          <div key={index} className="border rounded p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{request.date}</span>
                              <Badge className={getRequestStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{request.reason}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No requests submitted</p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="space-y-4 mt-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Weekly Availability</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingAvailability(!editingAvailability)}
                      >
                        {editingAvailability ? 'Save' : 'Edit'}
                      </Button>
                    </div>
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted/50 px-3 py-1.5 border-b">
                        <div className="grid grid-cols-2 gap-4 text-xs font-medium text-muted-foreground">
                          <div>Day</div>
                          <div className="text-right">Availability</div>
                        </div>
                      </div>
                      <div className="divide-y">
                        {Object.entries(selectedEmployee.availability).map(([day, hours]) => (
                          <div key={day} className="px-3 py-2 hover:bg-muted/30 transition-colors">
                            <div className="grid grid-cols-2 gap-4 items-center">
                              <span className="font-medium text-xs">{day}</span>
                            {editingAvailability ? (
                              <Input
                                value={hours}
                                onChange={(e) => handleAvailabilityChange(day, e.target.value)}
                                placeholder="e.g., 9:00 AM - 5:00 PM"
                                className="text-right h-6 text-xs border-0 bg-transparent focus:bg-background focus:border focus:border-input"
                              />
                            ) : (
                                <span className={`text-xs text-right ${hours === "Not Available" ? "text-muted-foreground" : ""}`}>
                                  {hours}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Save Button */}
                <div className="flex justify-end pt-3 border-t mt-6">
                  <Button onClick={handleSaveEmployee} className="min-w-24">
                    Save Changes
                  </Button>
                </div>
              </Tabs>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Employee Modal */}
      <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Enter the employee's information and availability.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={newEmployee.name}
                  onChange={(e) => handleNewEmployeeChange("name", e.target.value)}
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newEmployee.role} onValueChange={(value: string) => handleNewEmployeeChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Server">Server</SelectItem>
                    <SelectItem value="Bartender">Bartender</SelectItem>
                    <SelectItem value="Host">Host</SelectItem>
                    <SelectItem value="Cook">Cook</SelectItem>
                    <SelectItem value="Dishwasher">Dishwasher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Employment Status</Label>
              <Select value={newEmployee.status} onValueChange={(value: string) => handleNewEmployeeChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FT">Full Time</SelectItem>
                  <SelectItem value="PT">Part Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={newEmployee.phone}
                  onChange={(e) => handleNewEmployeeChange("phone", e.target.value)}
                  placeholder="(555) 123-4567" 
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={newEmployee.email}
                  onChange={(e) => handleNewEmployeeChange("email", e.target.value)}
                  placeholder="john.doe@email.com" 
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setNewEmployee({ name: "", status: "", role: "", phone: "", email: "" });
                setShowAddEmployee(false);
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddEmployee}>
                Add Employee
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Request Modal */}
      <Dialog open={!!showAddRequest} onOpenChange={() => setShowAddRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Request for {showAddRequest?.name}</DialogTitle>
            <DialogDescription>
              Add a new time-off request for this employee.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="request-date">Date(s)</Label>
              <Input 
                id="request-date" 
                value={newRequest.date}
                onChange={(e) => handleNewRequestChange("date", e.target.value)}
                placeholder="Nov 25 or Nov 25-26" 
              />
            </div>
            <div>
              <Label htmlFor="request-reason">Reason</Label>
              <Textarea 
                id="request-reason" 
                value={newRequest.reason}
                onChange={(e) => handleNewRequestChange("reason", e.target.value)}
                placeholder="Reason for time off request..."
                maxLength={500}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setNewRequest({ date: "", reason: "" });
                setShowAddRequest(null);
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddRequest}>
                Add Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Employee</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {showDeleteConfirm?.name} from your team? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowDeleteConfirm(null)}>
              Remove Employee
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}