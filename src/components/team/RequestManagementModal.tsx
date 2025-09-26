import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { NewRequest } from "../../types/employee";

interface RequestManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (request: NewRequest) => void;
  employeeName: string;
  newRequest: NewRequest;
  onFieldChange: (field: string, value: string) => void;
}

export function RequestManagementModal({
  isOpen,
  onClose,
  onAdd,
  employeeName,
  newRequest,
  onFieldChange
}: RequestManagementModalProps) {
  const handleSubmit = () => {
    onAdd(newRequest);
    onClose();
  };

  const handleCancel = () => {
    onFieldChange("date", "");
    onFieldChange("reason", "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Request for {employeeName}</DialogTitle>
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
              onChange={(e) => onFieldChange("date", e.target.value)}
              placeholder="Nov 25 or Nov 25-26" 
            />
          </div>
          <div>
            <Label htmlFor="request-reason">Reason</Label>
            <Textarea 
              id="request-reason" 
              value={newRequest.reason}
              onChange={(e) => onFieldChange("reason", e.target.value)}
              placeholder="Reason for time off request..."
              maxLength={500}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
