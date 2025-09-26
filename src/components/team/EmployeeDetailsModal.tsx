import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { Trash2, User, Clock as ClockIcon, Edit, Save } from "lucide-react";
import { Employee, TimeInput } from "../../types/employee";

interface EmployeeDetailsModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (employee: Employee) => void;
  onAddRequest: (employee: Employee) => void;
  onSaveEmployee: (employee: Employee) => void;
  timeInputs: Record<string, TimeInput>;
  offDays: Record<string, boolean>;
  isEditingAvailability: boolean;
  onTimeChange: (day: string, field: 'startTime' | 'endTime', value: string) => void;
  onPeriodChange: (day: string, field: 'startPeriod' | 'endPeriod', value: string) => void;
  onOffDayChange: (day: string, isOff: boolean) => void;
  onToggleEditAvailability: () => void;
  onEmployeeInfoChange: (field: string, value: string) => void;
  getRoleColor: (role: string) => string;
  getRequestStatusColor: (status: string) => string;
}

export function EmployeeDetailsModal({
  employee,
  isOpen,
  onClose,
  onDelete,
  onAddRequest,
  onSaveEmployee,
  timeInputs,
  offDays,
  isEditingAvailability,
  onTimeChange,
  onPeriodChange,
  onOffDayChange,
  onToggleEditAvailability,
  onEmployeeInfoChange,
  getRoleColor,
  getRequestStatusColor
}: EmployeeDetailsModalProps) {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="!w-[80vw] !max-w-[80vw] max-h-[85vh] !flex !flex-col !p-0" 
        style={{ 
          '--dialog-close-top': '0.5rem',
          width: '80vw',
          maxWidth: '80vw'
        } as React.CSSProperties}
      >
        <DialogHeader className="relative flex-shrink-0 p-6 pb-4">
          <DialogTitle className="flex items-center justify-between">
            <span>{employee.name}</span>
            <div className="flex gap-3" style={{ marginRight: '20px' }}>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAddRequest(employee)}
              >
                Add Request
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  onDelete(employee);
                  onClose();
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
                    <Badge className={getRoleColor(employee.role)}>
                      {employee.role}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Employment Status</Label>
                  <div className="mt-1">
                    <Select 
                      value={employee.status} 
                      onValueChange={(value: string) => onEmployeeInfoChange('status', value)}
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
                    value={employee.phone}
                    onChange={(e) => onEmployeeInfoChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={employee.email}
                    onChange={(e) => onEmployeeInfoChange('email', e.target.value)}
                    placeholder="employee@email.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Submitted Requests</Label>
                <div className="mt-2 space-y-2">
                  {employee.requests.length > 0 ? (
                    employee.requests.map((request, index) => (
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
                    onClick={onToggleEditAvailability}
                    className="h-7 px-3 text-xs"
                  >
                    {isEditingAvailability ? (
                      <>
                        <Save size={14} className="mr-1" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit size={14} className="mr-1" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
                <div className="mt-2 border rounded-md overflow-hidden" style={{ minWidth: '0' }}>
                  <div className="bg-muted/50 px-3 py-1.5 border-b">
                    <div className="grid grid-cols-4 gap-6 text-xs font-medium text-muted-foreground" style={{ gridTemplateColumns: '1fr 3fr' }}>
                      <div>Day</div>
                      <div className="col-span-3 text-right">Availability</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {Object.entries(timeInputs).map(([day, times]) => {
                      const isOff = offDays[day] || false;
                      
                      return (
                        <div key={day} className="px-3 py-2 hover:bg-muted/30 transition-colors">
                          <div className="grid grid-cols-4 gap-6 items-center" style={{ gridTemplateColumns: '1fr 3fr' }}>
                            <span className="font-medium text-xs">{day}</span>
                            <div className="col-span-3 flex items-center gap-6 justify-end" style={{ minWidth: '0' }}>
                              {isEditingAvailability ? (
                                <>
                                  <Input
                                    value={times.startTime}
                                    onChange={(e) => onTimeChange(day, 'startTime', e.target.value)}
                                    placeholder="0:00-0:00"
                                    disabled={isOff}
                                    className="!w-32 !h-8 !text-sm !text-center !text-gray-900 !border-2 !border-gray-300 !bg-white !shadow-sm focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-200 focus:!ring-offset-1 disabled:!bg-gray-100 disabled:!border-gray-200 disabled:!text-gray-500 !px-3 !py-1"
                                    style={{ width: '128px', height: '32px', fontSize: '14px' }}
                                  />
                                  <Select
                                    value={times.startPeriod}
                                    onValueChange={(value: string) => onPeriodChange(day, 'startPeriod', value)}
                                    disabled={isOff}
                                  >
                                    <SelectTrigger className="!w-20 !h-8 !text-sm !text-gray-900 !border-2 !border-gray-300 !bg-white !shadow-sm focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-200 focus:!ring-offset-1 disabled:!bg-gray-100 disabled:!border-gray-200 disabled:!text-gray-500 !px-3 !py-1 [&>svg]:!hidden" style={{ width: '80px', height: '32px', fontSize: '14px' }}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="AM">AM</SelectItem>
                                      <SelectItem value="PM">PM</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <span className="text-xs text-muted-foreground">-</span>
                                  <Input
                                    value={times.endTime}
                                    onChange={(e) => onTimeChange(day, 'endTime', e.target.value)}
                                    placeholder="0:00-0:00"
                                    disabled={isOff}
                                    className="!w-32 !h-8 !text-sm !text-center !text-gray-900 !border-2 !border-gray-300 !bg-white !shadow-sm focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-200 focus:!ring-offset-1 disabled:!bg-gray-100 disabled:!border-gray-200 disabled:!text-gray-500 !px-3 !py-1"
                                    style={{ width: '128px', height: '32px', fontSize: '14px' }}
                                  />
                                  <Select
                                    value={times.endPeriod}
                                    onValueChange={(value: string) => onPeriodChange(day, 'endPeriod', value)}
                                    disabled={isOff}
                                  >
                                    <SelectTrigger className="!w-20 !h-8 !text-sm !text-gray-900 !border-2 !border-gray-300 !bg-white !shadow-sm focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-200 focus:!ring-offset-1 disabled:!bg-gray-100 disabled:!border-gray-200 disabled:!text-gray-500 !px-3 !py-1 [&>svg]:!hidden" style={{ width: '80px', height: '32px', fontSize: '14px' }}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="AM">AM</SelectItem>
                                      <SelectItem value="PM">PM</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Checkbox
                                    checked={isOff}
                                    onCheckedChange={(checked) => onOffDayChange(day, checked as boolean)}
                                    className="ml-8"
                                  />
                                </>
                              ) : (
                                <div className="flex items-center gap-6 justify-end">
                                  <span className="text-sm text-muted-foreground">
                                    {isOff ? "OFF" : `${times.startTime || ""} ${times.startPeriod || ""} - ${times.endTime || ""} ${times.endPeriod || ""}`}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-shrink-0 p-6 pt-0">
          <div className="flex justify-end">
            <Button onClick={() => onSaveEmployee(employee)}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
