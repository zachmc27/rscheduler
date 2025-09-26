import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Phone, Mail, Calendar } from "lucide-react";
import { Employee } from "../types/employee";

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
  getStatusColor: (status: string) => string;
  getRoleColor: (role: string) => string;
}

export function EmployeeCard({ 
  employee, 
  onClick, 
  getStatusColor, 
  getRoleColor 
}: EmployeeCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{employee.name}</h3>
          <Badge className={getStatusColor(employee.status)}>
            {employee.status}
          </Badge>
        </div>
        
        <div className="mb-3">
          <Badge className={getRoleColor(employee.role)}>
            {employee.role}
          </Badge>
        </div>
        
        <div className="space-y-1">
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
  );
}
