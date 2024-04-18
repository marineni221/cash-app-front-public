import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { CloudUpload } from "lucide-react";
import { bytesToKilobytes, bytesToMegabytes } from "helpers/helpers";
import { ToastAction } from "../../components/ui/toast";
import { toast } from "../../components/ui/use-toast";
import { ExcelReader } from "helpers/read_excel_file";
import { Contact } from "models/Contact";

const allowedTypes = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

interface UploadFileProps {
  setValidUploadFile: Dispatch<SetStateAction<boolean>>;
  next: boolean;
  onNext: (file: File) => void;
  createCampaignCompleted: boolean;
}

export const UploadFile = ({
  setValidUploadFile,
  next,
  onNext,
  createCampaignCompleted,
}: UploadFileProps) => {
  const [dragEntered, setDragEntered] = useState(false);
  const [file, setFile] = useState<File>();

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragEntered(true);
    const files = e.dataTransfer.files;
    const selectedFile = files[0];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        variant: "destructive",
        title: "Unsupported file type",
        description: "The file format you have selected is not supported",
        action: (
          <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
        ),
      });
      setValidUploadFile(false);
      return;
    }

    const result = await ExcelReader.getData(selectedFile);
    const duplicateContacts = checkDuplicatedPhone(result);

    if (duplicateContacts.length) {
      setValidUploadFile(false);
      toast({
        variant: "destructive",
        title: "Duplicated Contacts Detected",
        description:
          "The file contains duplicated contacts and you must resolve it before continuing",
        action: <ToastAction altText="Dismiss the toast">Check</ToastAction>,
      });
      return;
    }

    setValidUploadFile(true);
    setFile(selectedFile);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const selectedFile = files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        variant: "destructive",
        title: "Unsupported file type",
        description: "The file format you have selected is not supported",
        action: <ToastAction altText="Dismiss the toast">Dismiss</ToastAction>,
      });
      setValidUploadFile(false);
      return;
    }

    const result = await ExcelReader.getData(selectedFile);
    const duplicateContacts = checkDuplicatedPhone(result);

    if (duplicateContacts.length) {
      setValidUploadFile(false);
      toast({
        variant: "destructive",
        title: "Duplicated Contacts Detected",
        description:
          "The file contains duplicated contacts and you must resolve it before continuing",
        action: <ToastAction altText="Dismiss the toast">Check</ToastAction>,
      });
      return;
    }

    setDragEntered(true);
    setFile(selectedFile);
    setValidUploadFile(true);
    e.target.value = "";
  };

  function checkDuplicatedPhone(contacts: Contact[]): Contact[] {
    const phoneMap = new Map<string, Contact[]>();
    const duplicateContacts: Contact[] = [];

    contacts.forEach((contact) => {
      if (!phoneMap.has(contact.phone)) {
        phoneMap.set(contact.phone, [contact]);
      } else {
        const existingContacts = phoneMap.get(contact.phone) as Contact[];
        existingContacts.push(contact);
        phoneMap.set(contact.phone, existingContacts);
      }
    });

    phoneMap.forEach((contactGroup) => {
      if (contactGroup.length > 1) {
        duplicateContacts.push(...contactGroup);
      }
    });

    return duplicateContacts;
  }

  React.useEffect(() => {
    if (next) {
      onNext(file as File);
    }
  }, [next]);

  useEffect(() => {
    if (createCampaignCompleted) {
      setFile(undefined);
      setDragEntered(false);
    }
  }, [createCampaignCompleted]);

  return (
    <div>
      <Card>
        <CardHeader className="">
          <CardTitle className="text-lg">Contact File</CardTitle>
        </CardHeader>
        <CardContent
          className=""
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragEntered(true)}
          onDragLeave={() => setDragEntered(false)}
        >
          <div
            className={`w-full h-[250px] transition-colors duration-200 border-2 border-dashed ${
              dragEntered ? "border-primary" : "border-secondary"
            } rounded-md ${
              dragEntered ? "bg-blue-50" : "bg-transparent"
            } flex flex-col items-center justify-center space-y-4`}
          >
            <CloudUpload
              className={`transition-colors duration-200 ${
                dragEntered ? "text-primary" : "text-muted-foreground"
              } w-14 h-14`}
            />
            <p
              className={`transition-colors duration-200 ${
                dragEntered ? "text-primary" : "text-secondary"
              } text-sm text-center w-[200px]`}
            >
              Drag your file here, file less than 5MB or
            </p>
            <label
              htmlFor="file"
              className={`px-14 py-2 rounded-md text-white cursor-pointer transition-colors duration-200 ${
                dragEntered
                  ? "bg-primary"
                  : "bg-muted-foreground hover:bg-secondary"
              }`}
            >
              Browse File
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-sm text-muted-foreground">
            Supported formats: CSV, XLSX, XLS
          </span>
        </CardFooter>
      </Card>

      {file && (
        <div className="mt-6 bg-secondary/20 rounded-md p-6 flex justify-between items-center">
          <span>{file?.name}</span>
          <span>
            Size:{" "}
            {bytesToMegabytes(file?.size) < 1
              ? bytesToKilobytes(file?.size).toFixed(2).toString() + " KB"
              : bytesToMegabytes(file?.size).toFixed(2).toString() + " MB"}{" "}
          </span>
        </div>
      )}
    </div>
  );
};
