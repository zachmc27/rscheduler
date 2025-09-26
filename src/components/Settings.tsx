import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User, Users, Mail, Phone, Moon, Sun } from "lucide-react";

interface SettingsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Settings({ isDarkMode, onToggleDarkMode }: SettingsProps) {
  const [userSettings, setUserSettings] = useState({
    name: "Restaurant Manager",
    email: "manager@mariositalian.com",
    password: "",
    confirmPassword: "",
  });

  const [teamSettings, setTeamSettings] = useState({
    communicationMethod: "Email",
    disableEmailEntry: false,
  });

  const [restaurantSettings, setRestaurantSettings] = useState({
    name: "Mario's Italian Restaurant",
    phone: "",
    email: "",
    address: "",
  });

  const handleUserSettingsChange = (field: string, value: string) => {
    setUserSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleTeamSettingsChange = (field: string, value: string | boolean) => {
    setTeamSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleRestaurantSettingsChange = (field: string, value: string) => {
    setRestaurantSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveUserSettings = () => {
    console.log("Saving user settings:", userSettings);
  };

  const handleSaveTeamSettings = () => {
    console.log("Saving team settings:", teamSettings);
  };

  const handleSaveRestaurantSettings = () => {
    console.log("Saving restaurant settings:", restaurantSettings);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="mb-6">Settings</h2>

      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user" className="flex items-center gap-2">
            <User size={16} />
            User Preferences
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users size={16} />
            Team Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={userSettings.name}
                    onChange={(e) => handleUserSettingsChange("name", e.target.value)}
                    style={{
                      border: '1px solid #9ca3af',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      backgroundColor: 'white',
                      marginTop: '5px'
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => handleUserSettingsChange("email", e.target.value)}
                    style={{
                      border: '1px solid #9ca3af',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      backgroundColor: 'white',
                      marginTop: '5px'
                    }}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={userSettings.password}
                    onChange={(e) => handleUserSettingsChange("password", e.target.value)}
                    style={{
                      border: '1px solid #9ca3af',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      backgroundColor: 'white',
                      marginTop: '5px'
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={userSettings.confirmPassword}
                    onChange={(e) => handleUserSettingsChange("confirmPassword", e.target.value)}
                    style={{
                      border: '1px solid #9ca3af',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      backgroundColor: 'white',
                      marginTop: '5px'
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveUserSettings}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Sun size={16} className="text-muted-foreground" />
                    <span>Light Mode</span>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={onToggleDarkMode}
                    className="mx-2"
                  />
                  <div className="flex items-center gap-2">
                    <Moon size={16} className="text-muted-foreground" />
                    <span>Dark Mode</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Choose between light and dark themes for the application.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="communication-method">Preferred Communication Method</Label>
                <Select 
                  value={teamSettings.communicationMethod} 
                  onValueChange={(value: string) => handleTeamSettingsChange("communicationMethod", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        Email
                      </div>
                    </SelectItem>
                    <SelectItem value="Phone">
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        Phone
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Default method for communicating with team members.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Disable Email Entry</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, email addresses won't be required for new employees.
                  </p>
                </div>
                <Switch
                  checked={teamSettings.disableEmailEntry}
                  onCheckedChange={(value: boolean) => handleTeamSettingsChange("disableEmailEntry", value)}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveTeamSettings}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input
                  id="restaurant-name"
                  value={restaurantSettings.name}
                  onChange={(e) => handleRestaurantSettingsChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="restaurant-phone">Phone Number</Label>
                  <Input
                    id="restaurant-phone"
                    value={restaurantSettings.phone}
                    onChange={(e) => handleRestaurantSettingsChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="restaurant-email">Email Address</Label>
                  <Input
                    id="restaurant-email"
                    type="email"
                    value={restaurantSettings.email}
                    onChange={(e) => handleRestaurantSettingsChange("email", e.target.value)}
                    placeholder="info@mariositalian.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="restaurant-address">Address</Label>
                <Input
                  id="restaurant-address"
                  value={restaurantSettings.address}
                  onChange={(e) => handleRestaurantSettingsChange("address", e.target.value)}
                  placeholder="123 Main Street, City, State 12345"
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveRestaurantSettings}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}