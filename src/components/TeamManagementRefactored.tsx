import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { EmployeeCard } from "./EmployeeCard";
import { EmployeeDetailsModal } from "./EmployeeDetailsModal";
import { AddEmployeeModal } from "./AddEmployeeModal";
import { RequestManagementModal } from "./RequestManagementModal";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { Employee, NewEmployee, NewRequest, TimeInput } from "../types/employee";
import { 
  mockEmployees, 
  getStatusColor, 
  getRoleColor, 
  getRequestStatusColor, 
  isValidTimeFormat 
} from "../utils/employeeUtils";

export function TeamManagement() {
  // State management
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Employee | null>(null);
  const [showAddRequest, setShowAddRequest] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  
  // Form states
  const [newEmployee, setNewEmployee] = useState<NewEmployee>({
    name: "",
    status: "",
    role: "",
    phone: "",
    email: "",
  });
  const [newRequest, setNewRequest] = useState<NewRequest>({
    date: "",
    reason: "",
  });

  // State for structured time inputs
  const [timeInputs, setTimeInputs] = useState<Record<string, TimeInput>>({});
  const [offDays, setOffDays] = useState<Record<string, boolean>>({});
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);

  // Initialize time inputs when employee is selected
  React.useEffect(() => {
    if (selectedEmployee) {
      const initialTimeInputs: Record<string, TimeInput> = {};
      const initialOffDays: Record<string, boolean> = {};
      
      Object.entries(selectedEmployee.availability).forEach(([day, hours]) => {
        if (hours === "Not Available") {
          initialTimeInputs[day] = { startTime: "", startPeriod: "AM", endTime: "", endPeriod: "AM" };
          initialOffDays[day] = true;
        } else {
          initialOffDays[day] = false;
          const match = hours.match(/(\d{1,2}:\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}:\d{2})\s*(AM|PM)/);
          if (match) {
            initialTimeInputs[day] = {
              startTime: match[1],
              startPeriod: match[2],
              endTime: match[3],
              endPeriod: match[4],
            };
          } else {
            initialTimeInputs[day] = { 
              startTime: hours, 
              startPeriod: "AM", 
              endTime: "", 
              endPeriod: "AM" 
            };
          }
        }
      });
      
      setTimeInputs(initialTimeInputs);
      setOffDays(initialOffDays);
    }
  }, [selectedEmployee]);

  // Event handlers
  const handleNewEmployeeChange = (field: string, value: string) => {
    setNewEmployee(prev => ({ ...prev, [field]: value }));
  };

  const handleNewRequestChange = (field: string, value: string) => {
    setNewRequest(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEmployee = (employee: NewEmployee) => {
    console.log("Adding employee:", employee);
    setNewEmployee({ name: "", status: "", role: "", phone: "", email: "" });
    setShowAddEmployee(false);
  };

  const handleAddRequest = (request: NewRequest) => {
    console.log("Adding request:", request);
    setNewRequest({ date: "", reason: "" });
    setShowAddRequest(null);
  };

  const handleTimeChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
    const sanitizedValue = value.replace(/[^0-9:]/g, '');
    setTimeInputs(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: sanitizedValue
      }
    }));
  };

  const handlePeriodChange = (day: string, field: 'startPeriod' | 'endPeriod', value: string) => {
    setTimeInputs(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleOffDayChange = (day: string, isOff: boolean) => {
    setOffDays(prev => ({ ...prev, [day]: isOff }));
    if (isOff) {
      setTimeInputs(prev => ({
        ...prev,
        [day]: { startTime: "", startPeriod: "AM", endTime: "", endPeriod: "AM" }
      }));
    }
  };

  const handleSaveAvailability = () => {
    if (!selectedEmployee) return;
    
    const validationErrors: string[] = [];
    
    Object.entries(timeInputs).forEach(([day, times]) => {
      if (!offDays[day]) {
        if (times.startTime && !isValidTimeFormat(times.startTime)) {
          validationErrors.push(`${day} start time must be in format 1:00-12:59`);
        }
        if (times.endTime && !isValidTimeFormat(times.endTime)) {
          validationErrors.push(`${day} end time must be in format 1:00-12:59`);
        }
      }
    });
    
    if (validationErrors.length > 0) {
      alert("Please fix the following errors:\n" + validationErrors.join("\n"));
      return;
    }
    
    const formattedAvailability: Record<string, string> = {};
    Object.entries(timeInputs).forEach(([day, times]) => {
      if (offDays[day]) {
        formattedAvailability[day] = "Not Available";
      } else if (times.startTime || times.endTime) {
        const startText = times.startTime || "";
        const endText = times.endTime || "";
        const startPeriod = times.startPeriod || "";
        const endPeriod = times.endPeriod || "";
        
        if (startText && endText) {
          formattedAvailability[day] = `${startText} ${startPeriod} - ${endText} ${endPeriod}`;
        } else if (startText) {
          formattedAvailability[day] = `${startText} ${startPeriod}`;
        } else if (endText) {
          formattedAvailability[day] = `${endText} ${endPeriod}`;
        } else {
          formattedAvailability[day] = "Not Available";
        }
      } else {
        formattedAvailability[day] = "Not Available";
      }
    });
    
    const updatedEmployee = { ...selectedEmployee, availability: formattedAvailability };
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => emp.id === selectedEmployee.id ? updatedEmployee : emp)
    );
    setSelectedEmployee(updatedEmployee);
    console.log("Availability changes saved successfully:", updatedEmployee);
  };

  const handleSaveEmployee = (employee: Employee) => {
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => emp.id === employee.id ? employee : emp)
    );
    setSelectedEmployee(null);
    console.log("Employee changes saved successfully:", employee);
  };

  const handleToggleEditAvailability = () => {
    if (isEditingAvailability) {
      handleSaveAvailability();
    }
    setIsEditingAvailability(!isEditingAvailability);
  };

  const handleEmployeeInfoChange = (field: string, value: string) => {
    if (!selectedEmployee) return;
    const updatedEmployee = { ...selectedEmployee, [field]: value };
    setSelectedEmployee(updatedEmployee);
  };

  // Sort employees by role, then by name within each role
  const sortedEmployees = [...employees].sort((a, b) => {
    if (a.role === "Manager" && b.role !== "Manager") return -1;
    if (b.role === "Manager" && a.role !== "Manager") return 1;
    
    const roleCompare = a.role.localeCompare(b.role);
    if (roleCompare !== 0) return roleCompare;
    
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Team Management</span>
            <Button onClick={() => setShowAddEmployee(true)}>
              <Plus size={16} className="mr-2" />
              Add Employee
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onClick={() => setSelectedEmployee(employee)}
                getStatusColor={getStatusColor}
                getRoleColor={getRoleColor}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <EmployeeDetailsModal
        employee={selectedEmployee}
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        onDelete={(employee) => setShowDeleteConfirm(employee)}
        onAddRequest={(employee) => setShowAddRequest(employee)}
        onSaveEmployee={handleSaveEmployee}
        timeInputs={timeInputs}
        offDays={offDays}
        isEditingAvailability={isEditingAvailability}
        onTimeChange={handleTimeChange}
        onPeriodChange={handlePeriodChange}
        onOffDayChange={handleOffDayChange}
        onToggleEditAvailability={handleToggleEditAvailability}
        onEmployeeInfoChange={handleEmployeeInfoChange}
        getRoleColor={getRoleColor}
        getRequestStatusColor={getRequestStatusColor}
      />

      <AddEmployeeModal
        isOpen={showAddEmployee}
        onClose={() => setShowAddEmployee(false)}
        onAdd={handleAddEmployee}
        newEmployee={newEmployee}
        onFieldChange={handleNewEmployeeChange}
      />

      <RequestManagementModal
        isOpen={!!showAddRequest}
        onClose={() => setShowAddRequest(null)}
        onAdd={handleAddRequest}
        employeeName={showAddRequest?.name || ""}
        newRequest={newRequest}
        onFieldChange={handleNewRequestChange}
      />

      <DeleteConfirmationDialog
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => setShowDeleteConfirm(null)}
        employee={showDeleteConfirm}
      />
    </div>
  );
}
