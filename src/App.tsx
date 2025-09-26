import { useState } from "react";
import { Navigation } from "./components/common/Navigation";
import { Dashboard } from "./components/dashboard/Dashboard";
import { TeamManagement } from "./components/team/TeamManagement";
import { Settings } from "./components/settings/Settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "team":
        return <TeamManagement />;
      case "settings":
        return <Settings isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      <main className="h-[calc(100vh-73px)]">
        {renderCurrentPage()}
      </main>
    </div>
  );
}