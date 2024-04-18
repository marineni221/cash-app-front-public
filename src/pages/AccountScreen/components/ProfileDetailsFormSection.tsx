import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import { Checkbox } from "components/ui/checkbox";
import { Input } from "components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "components/ui/select";
import avatar from "assets/avatars/300-23.jpg";

export const ProfileDetailsFormSection = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="border-b border-gray-200 font-bold">
        Profile Details
      </CardHeader>
      <CardContent className="mt-6">
        <div className="grid grid-cols-3">
          <span className="font-medium">Avatar</span>
          <div className="col-span-2 w-[140px] h-[130px] border-4 border-white shadow-[0_10px_100px_rgba(0,0,0,0.1)] rounded-xl">
            <img
              src={avatar}
              className="w-full h-full rounded-lg object-cover"
              alt="Avatar"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 mt-4">
          <span className="font-medium text-sm">
            Full Name <span className="text-red-500">*</span>
          </span>
          <div className="grid grid-cols-2 gap-4 col-span-2">
            <Input value={"Zal"} placeholder="Zal" />
            <Input value={"Ben Hassan"} placeholder="Ben Hassan" />
          </div>
        </div>

        <div className="grid grid-cols-3 mt-4">
          <span className="font-medium text-sm">
            Company<span className="text-red-500">*</span>
          </span>
          <Input
            value={"Ben Hassan"}
            className="col-span-2"
            placeholder="Ben Hassan"
          />
        </div>

        <div className="grid grid-cols-3 mt-4">
          <span className="font-medium text-sm">
            Contact Phone<span className="text-red-500">*</span>
          </span>
          <Input
            value={"+221 78 145 29 99"}
            className="col-span-2"
            placeholder="Ben Hassan"
          />
        </div>

        <div className="grid grid-cols-3 mt-4">
          <span className="font-medium text-sm">
            Country<span className="text-red-500">*</span>
          </span>
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Country</SelectLabel>
                <SelectItem value="London">London</SelectItem>
                <SelectItem value="Sénégal">Sénégal</SelectItem>
                <SelectItem value="Russia">Russia</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Gambie">Gambie</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 mt-4">
          <span className="font-medium text-sm">
            Language<span className="text-red-500">*</span>
          </span>
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="London">Deutsh - German</SelectItem>
                <SelectItem value="Sénégal">Français - French</SelectItem>
                <SelectItem value="Russia">Italiano - Italian</SelectItem>
                <SelectItem value="France">English</SelectItem>
                <SelectItem value="Gambie">Português - Portuguese</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 mt-4">
          <span className="font-medium text-sm">Communication</span>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="email" />
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="phone" />
              <label
                htmlFor="phone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phone
              </label>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-6 border-t border-gray-200 flex items-center justify-end">
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};
