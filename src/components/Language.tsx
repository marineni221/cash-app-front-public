import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "en",
    flagCode: "us",
    label: "English",
  },
  {
    code: "fr",
    flagCode: "fr",
    label: "French",
  },
];

export const Language = () => {
  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = React.useState("en");

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  React.useEffect(() => {
    const preferredLanguage = localStorage.getItem("i18nextLng");
    console.log("preferred language: " + preferredLanguage);
    
    if (!preferredLanguage) {
        setSelectedLanguage("en");
    } else {
        setSelectedLanguage(preferredLanguage);
    }
  }, []);
  
  return (
    <div className="mt-8 px-16">
      <Select
        value={selectedLanguage}
        onValueChange={(value) => {
          setSelectedLanguage(value);
          changeLanguage(value);
        }}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem
              key={language.code}
              value={language.code}
              className="flex items-center"
            >
              <ReactCountryFlag
                countryCode={language.flagCode}
                svg
                style={{ width: 15, height: 15 }}
              />
              <span className="ml-2">{language.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
