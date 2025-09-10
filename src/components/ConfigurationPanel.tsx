import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Trash2, Check, X, Zap } from "lucide-react";

interface ConfigurationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfigurationPanel({ isOpen, onClose }: ConfigurationPanelProps) {
  const [scheduleStartDay, setScheduleStartDay] = useState("Monday");
  const [scheduleEndDay, setScheduleEndDay] = useState("Sunday");
  
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Calculate the end day based on start day for a 7-day range
  const getEndDayFromStart = (startDay: string) => {
    const startIndex = daysOfWeek.indexOf(startDay);
    const endIndex = (startIndex + 6) % 7; // 6 days after start = 7 day range
    return daysOfWeek[endIndex];
  };
  
  // Validate if the selected range is exactly 7 days
  const isValidRange = (start: string, end: string) => {
    const startIndex = daysOfWeek.indexOf(start);
    const endIndex = daysOfWeek.indexOf(end);
    const expectedEndIndex = (startIndex + 6) % 7;
    return endIndex === expectedEndIndex;
  };
  
  // Handle start day change and auto-calculate end day
  const handleStartDayChange = (day: string) => {
    setScheduleStartDay(day);
    setScheduleEndDay(getEndDayFromStart(day));
  };
  
  // Mock data
  const roles = ["Manager", "Server", "Cook", "Bartender", "Host"];
  const [operatingHours, setOperatingHours] = useState({
    Monday: { open: "10:00", close: "22:00" },
    Tuesday: { open: "10:00", close: "22:00" },
    Wednesday: { open: "10:00", close: "22:00" },
    Thursday: { open: "10:00", close: "22:00" },
    Friday: { open: "10:00", close: "23:00" },
    Saturday: { open: "09:00", close: "23:00" },
    Sunday: { open: "11:00", close: "21:00" },
  });

  const staffingRequirements = [
    { day: "Monday", role: "Server", open: 2, mid: 3, closing: 2 },
    { day: "Monday", role: "Cook", open: 1, mid: 2, closing: 1 },
    { day: "Tuesday", role: "Server", open: 2, mid: 3, closing: 2 },
    { day: "Tuesday", role: "Cook", open: 1, mid: 2, closing: 1 },
  ];

  const pendingRequests = [
    { id: 1, employee: "Sarah Johnson", date: "Nov 22", reason: "Doctor appointment", status: "pending" },
    { id: 2, employee: "Mike Chen", date: "Nov 23-24", reason: "Family visit", status: "pending" },
    { id: 3, employee: "Emma Davis", date: "Nov 20", reason: "Personal day", status: "pending" },
  ];

  const handleApproveRequest = (id: number) => {
    console.log(`Approved request ${id}`);
  };

  const handleDenyRequest = (id: number) => {
    console.log(`Denied request ${id}`);
  };

  const handleOperatingHoursChange = (day: string, type: 'open' | 'close', value: string) => {
    setOperatingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [type]: value
      }
    }));
  };

  const handleGenerateSchedule = () => {
    console.log("Generating schedule...");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Restaurant Configuration</SheetTitle>
          <SheetDescription>
            Configure your restaurant settings and generate the weekly schedule.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="hours">Hours</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schedule-start-day">Start Day</Label>
                      <Select value={scheduleStartDay} onValueChange={handleStartDayChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="schedule-end-day">End Day</Label>
                      <Select value={scheduleEndDay} onValueChange={setScheduleEndDay}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm">
                      <span className="font-medium">Schedule Week: </span>
                      {scheduleStartDay} - {scheduleEndDay}
                    </div>
                    {!isValidRange(scheduleStartDay, scheduleEndDay) && (
                      <div className="text-sm text-destructive mt-1">
                        ⚠️ Selected range must be exactly 7 consecutive days
                      </div>
                    )}
                    {isValidRange(scheduleStartDay, scheduleEndDay) && (
                      <div className="text-sm text-muted-foreground mt-1">
                        ✓ Valid 7-day schedule range
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shift Waves</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <div>
                      <div className="font-medium">Open</div>
                      <div className="text-sm text-muted-foreground">Start of operating hours</div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <div>
                      <div className="font-medium">Mid</div>
                      <div className="text-sm text-muted-foreground">30% into operating hours</div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <div>
                      <div className="font-medium">Closing</div>
                      <div className="text-sm text-muted-foreground">60% into operating hours</div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Roles
                    <Button size="sm" variant="outline">
                      <Plus size={16} className="mr-1" />
                      Add Role
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <div key={role} className="flex items-center justify-between p-2 border rounded">
                        <span>{role}</span>
                        <Button size="sm" variant="ghost">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hours" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Operating Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(operatingHours).map(([day, hours]) => (
                      <div key={day} className="grid grid-cols-3 gap-4 items-center">
                        <Label>{day}</Label>
                        <Input 
                          type="time" 
                          value={hours.open} 
                          onChange={(e) => handleOperatingHoursChange(day, 'open', e.target.value)}
                        />
                        <Input 
                          type="time" 
                          value={hours.close} 
                          onChange={(e) => handleOperatingHoursChange(day, 'close', e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staffing Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {staffingRequirements.map((req, index) => (
                      <div key={index} className="grid grid-cols-5 gap-2 items-center text-sm">
                        <span>{req.day}</span>
                        <span>{req.role}</span>
                        <div className="text-center">
                          <div>Open: {req.open}</div>
                        </div>
                        <div className="text-center">
                          <div>Mid: {req.mid}</div>
                        </div>
                        <div className="text-center">
                          <div>Close: {req.closing}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="border rounded p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium">{request.employee}</div>
                            <div className="text-sm text-muted-foreground">{request.date}</div>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleApproveRequest(request.id)}
                            >
                              <Check size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDenyRequest(request.id)}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm">{request.reason}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t">
            <Button 
              onClick={handleGenerateSchedule}
              className="w-full"
              size="lg"
            >
              <Zap size={16} className="mr-2" />
              Generate Schedule
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}