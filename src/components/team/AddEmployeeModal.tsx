import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { NewEmployee } from "../../types/employee";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: NewEmployee) => void;
  newEmployee: NewEmployee;
  onFieldChange: (field: string, value: string) => void;
}

export function AddEmployeeModal({
  isOpen,
  onClose,
  onAdd,
  newEmployee,
  onFieldChange
}: AddEmployeeModalProps) {
  const handleSubmit = () => {
    onAdd(newEmployee);
    onClose();
  };

  const handleCancel = () => {
    onFieldChange("name", "");
    onFieldChange("status", "");
    onFieldChange("role", "");
    onFieldChange("phone", "");
    onFieldChange("email", "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Add a new team member to your restaurant staff.
          </DialogDescription>
        </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={newEmployee.name}
                onChange={(e) => onFieldChange("name", e.target.value)}
                placeholder="John Doe" 
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={newEmployee.role} onValueChange={(value: string) => onFieldChange("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Server">Server</SelectItem>
                  <SelectItem value="Bartender">Bartender</SelectItem>
                  <SelectItem value="Host">Host</SelectItem>
                  <SelectItem value="Dishwasher">Dishwasher</SelectItem>
                  <SelectItem value="Cook">Cook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Employment Status</Label>
              <Select value={newEmployee.status} onValueChange={(value: string) => onFieldChange("status", value)}>
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
                  onChange={(e) => onFieldChange("phone", e.target.value)}
                  placeholder="(555) 123-4567" 
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={newEmployee.email}
                  onChange={(e) => onFieldChange("email", e.target.value)}
                  placeholder="john.doe@email.com" 
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Add Employee
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
}
