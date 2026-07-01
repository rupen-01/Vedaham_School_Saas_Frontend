import { createContext, useContext, useEffect, useState } from "react";


const AppContext = createContext();

// 2. Create a Provider Component
export const ColorThemeProvider = ({ children }) => {
  const [color, setColor] = useState("#6950e8");
  const [darkColor, setDarkColor] = useState("#007867");
  const [bgColor, setBgColor] = useState("#f7f5fe");
  // const [color, setColor] = useState("#00a76f");
  // const [darkColor, setDarkColor] = useState("#007867");
  // const [bgColor, setBgColor] = useState("#00a76f14");
  const [theme, setTheme] = useState("light");
  const [activeNavStyle,setNavStyle]=useState("nav-open");
  const [activeNavColor,setNavColor]=useState("light");
  const [activeFont,setFont]=useState("public Sans")
  const [isCollapsed, setIsCollapsed] = useState(false);

  const resetDefaults = () => {
    setColor("#00a76f");
    setBgColor("#00a76f14");
    setTheme("light");
    setNavStyle("nav-open");
    setNavColor("light");
    setFont("public Sans");
    setDarkColor("#007867")
    setIsCollapsed(false);
    localStorage.removeItem("selectedTheme");
  };

  const handleNavDirection =(direction)=>{
    if(direction==="nav-open"){
      setIsCollapsed(false);
    }
    if(direction==="nav-close"){
      setIsCollapsed(true);
    }
    setNavStyle(direction);
  }

  // Save theme settings to local storage
  const saveToLocalStorage = () => {
    const themeSettings = {
      color,
      bgColor,
      theme,
      activeFont,
      activeNavStyle,
      activeNavColor,
      isCollapsed,
      darkColor,
    };
    localStorage.setItem("selectedTheme", JSON.stringify(themeSettings));
  };

  // Restore settings on page load
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("selectedTheme"));
    if (savedTheme) {
      setColor(savedTheme.color);
      setBgColor(savedTheme.bgColor);
      setTheme(savedTheme.theme);
      setFont(savedTheme.activeFont);
      setNavStyle(savedTheme.activeNavStyle);
      setNavColor(savedTheme.activeNavColor);
      setIsCollapsed(savedTheme.isCollapsed);
      setDarkColor(savedTheme.darkColor);
    }
  }, []);

  const FONT_CLASSES = {
    "Public Sans": "publicFont",
    "Inter": "InterFont",
    "DM Sans": "DMSansFont",
    "Nunito Sans": "NunitoFont",
  };
  
  useEffect(() => {
    document.body.className = FONT_CLASSES[activeFont] || "";
  }, [activeFont]);

  // Update local storage whenever theme settings change
  useEffect(() => {
    saveToLocalStorage();
  }, [color, bgColor, theme, activeNavStyle, activeNavColor, activeFont, isCollapsed]);

  return (
    <AppContext.Provider value={{ activeFont, setFont, color, setColor, bgColor, setBgColor, setNavColor, activeNavColor, activeNavStyle,handleNavDirection, isCollapsed, setIsCollapsed, resetDefaults, darkColor, setDarkColor }}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom Hook for using Context
export const useColorContext = () => {
  return useContext(AppContext);
};
