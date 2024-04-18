import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, X } from "lucide-react";
import { UploadFile } from "./UploadFile";
import { DateHourSelection } from "./DateHourSelection";
import { DispatchType } from "./DispatchType";
import { CampaignInfos } from "./CampaignInfos";
import { Campaign, DispatchTypes } from "models/Campaign";
import SummaryScreen from "./SummaryScreen";
import { CREATE_CAMPAIGN_PATH } from "api/endpoints";
import { axiosFormData } from "api/axios";
import { useLocation, useNavigate } from "react-router";
import { ApiResponse } from "models/ApiResponse";
import { useCreatedCampaign } from "hooks/useCreateCampaign";

interface CreateCampaignProps {
  onClose: () => void;
}

const steps = [
  "Campaign Info",
  "Date and Hour",
  "Upload File",
  "Dispatch Type",
  "Summary",
];

export const CreateCampaign = ({ onClose }: CreateCampaignProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [createCampaignCompleted, setCreateCampaignCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [validCampaignInfos, setValidCampaignInfos] = React.useState(false);
  const [validDateHourSelection, setValidDateHourSelection] =
    React.useState(false);
  const [validUploadFile, setValidUploadFile] = React.useState(false);
  const [validDispatchType, setValidDispatchType] = React.useState(false);
  const [campaign, setCampaign] = React.useState<Campaign>({
    name: "",
    description: "",
    account_id: 3,
    dispatch_date: "",
    dispatch_type: DispatchTypes.wallet,
    filename: "",
    wallet_provider: "",
  });

  const {setCreatedCampagne} = useCreatedCampaign();

  const [next1, setNext1] = React.useState(false);
  const [next2, setNext2] = React.useState(false);
  const [next3, setNext3] = React.useState(false);
  const [next4, setNext4] = React.useState(false);

  const goToNextStep = () => {
    if (activeStep === 0) setNext1(true);
    if (activeStep === 1) setNext2(true);
    if (activeStep === 2) setNext3(true);
    if (activeStep === 3) setNext4(true);

    if (activeStep === steps.length - 1) {
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    if (activeStep === 0) setNext1(false);
    if (activeStep === 1) setNext2(false);
    if (activeStep === 2) setNext3(false);
    if (activeStep === 3) setNext4(false);

    if (activeStep === 0) {
      return;
    }
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onNext1 = (name: string, comment: string) => {
    setCampaign((prevState) => {
      return { ...prevState, name, description: comment };
    });
  };

  const onNext2 = (date: string) => {
    setCampaign((prevState) => {
      return { ...prevState, dispatch_date: date };
    });
  };

  const onNext3 = (file: File) => {
    setCampaign((prevState) => {
      return { ...prevState, contacts_file: file };
    });
  };

  const onNext4 = (dispatchType: DispatchTypes, walletProvider?: string) => {
    if (walletProvider) {
      setCampaign((prevState) => {
        return {
          ...prevState,
          dispatch_type: dispatchType,
          wallet_provider: walletProvider,
        };
      });
    } else {
      setCampaign((prevState) => {
        return { ...prevState, dispatch_type: dispatchType };
      });
    }
  };

  const clearForm = () => {
    setCampaign({
      name: "",
      description: "",
      account_id: 3,
      dispatch_date: "",
      dispatch_type: DispatchTypes.wallet,
      filename: "",
      wallet_provider: "",
    });
    setActiveStep(0);
    setValidCampaignInfos(false);
    setValidDateHourSelection(false);
    setValidUploadFile(false);
    setValidDispatchType(false);
    setNext1(false);
    setNext2(false);
    setNext3(false);
    setNext4(false);
    setCreateCampaignCompleted(true);
  }

  const onComplete = async () => {
    setIsLoading(true);
    console.log("campaign completed => ", campaign);
    const formdata = new FormData();
    formdata.append("name", campaign.name);
    formdata.append("description", campaign.description);
    formdata.append("date", campaign.dispatch_date.toString());
    formdata.append("dispatch_type", campaign.dispatch_type);
    formdata.append("wallet_provider", campaign.wallet_provider);
    formdata.append(
      "contacts_file",
      campaign.contacts_file as Blob,
      campaign.contacts_file?.name
    );
    formdata.append("account_id", campaign.account_id.toString());

    try {
      const axiosResponse = await axiosFormData.post<ApiResponse<Campaign>>(
        CREATE_CAMPAIGN_PATH,
        formdata
      );
      console.log('axiosResponse', axiosResponse);
      setCreatedCampagne(axiosResponse.data.data);
      
      setTimeout(() => {
        if (axiosResponse.status === 201) {
          setIsLoading(false);
          clearForm();
          setTimeout(() => {
            setCreateCampaignCompleted(true);
          }, 2000);
          onClose();
          navigate("/campaigns", { state: location });
        }
      }, 2000);
    } catch (error) {
      console.error("Un error occured while saving campaign data", error);
    }
  };

  return (
    <div className="w-[768px] font-poppins relative">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-2xl">Create Campaign</CardTitle>
          <X
            className="text-secondary hover:text-muted-foreground cursor-pointer w-5 h-5"
            onClick={onClose}
          />
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-row items-center justify-center space-x-10 mb-10">
            {steps.map((step, index) => {
              return (
                <div
                  key={step}
                  className={`py-3 text-sm ${
                    activeStep === index
                      ? "text-primary border-b-2 border-primary"
                      : ""
                  } ${index < activeStep && "text-secondary"} font-semibold`}
                >
                  {step}
                </div>
              );
            })}
          </div>

          <div>
            <div
              className={`${
                activeStep === 0 ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <CampaignInfos
                setValidCampaignInfo={setValidCampaignInfos}
                next={next1}
                onNext={onNext1}
                createCampaignCompleted={createCampaignCompleted}
              />
            </div>

            <div
              className={`${
                activeStep === 1 ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <DateHourSelection
                setValidDateHourSelection={setValidDateHourSelection}
                next={next2}
                onNext={onNext2}
                createCampaignCompleted={createCampaignCompleted}
              />
            </div>

            <div
              className={`${
                activeStep === 2 ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <UploadFile
                setValidUploadFile={setValidUploadFile}
                next={next3}
                onNext={onNext3}
                createCampaignCompleted={createCampaignCompleted}
              />
            </div>

            <div
              className={`${
                activeStep === 3 ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <DispatchType
                setValidDispatchType={setValidDispatchType}
                next={next4}
                onNext={onNext4}
                createCampaignCompleted={createCampaignCompleted}
              />
            </div>

            <div
              className={`${
                activeStep === 4 ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <SummaryScreen campaign={campaign} />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-row items-center justify-between space-x-3 mt-6">
          {activeStep > 0 ? (
            <Button
              onClick={goToPreviousStep}
              className="bg-blue-50 text-primary hover:text-white flex flex-row items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
          ) : (
            <div />
          )}

          <Button
            onClick={() => {
              if (activeStep === steps.length - 1) {
                onComplete();
              } else {
                goToNextStep();
              }
            }}
            className="flex flex-row items-center space-x-2"
            disabled={
              (activeStep === 0 && !validCampaignInfos) ||
              (activeStep === 1 && !validDateHourSelection) ||
              (activeStep === 2 && !validUploadFile) ||
              (activeStep === 3 && !validDispatchType) 
              || isLoading
            }
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>
              {activeStep === steps.length - 1 ? "Finish" : "Next Step"}
            </span>
            {activeStep !== steps.length - 1 && (
              <ArrowRight className="w-4 h-4" />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
