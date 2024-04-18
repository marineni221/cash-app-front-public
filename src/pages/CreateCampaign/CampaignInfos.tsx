import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Input } from "../../components/ui/input";
import axios from "api/axios";
import { SEARCH_CAMPAIGN_PATH } from "api/endpoints";

interface CampaignInfosError {
  name: string;
  comment: string;
  nameExists: boolean;
}

interface CampaignInfoProps {
  setValidCampaignInfo: Dispatch<SetStateAction<boolean>>;
  next: boolean;
  onNext: (name: string, comment: string) => void;
  createCampaignCompleted: boolean;
}

export const CampaignInfos = ({
  setValidCampaignInfo,
  next,
  onNext,
  createCampaignCompleted,
}: CampaignInfoProps) => {
  const [name, setName] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState<CampaignInfosError>({
    name: "",
    comment: "",
    nameExists: false,
  });

  const searchCampaignByName = async (name: string) => {
    try {
      const axiosResponse = await axios.get(SEARCH_CAMPAIGN_PATH + name);
      console.log("response", axiosResponse);
      return axiosResponse.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const validateData = async () => {
      if (!name) {
        setError({ name: "name is required", comment: "", nameExists: false });
        setValidCampaignInfo(false);
      } else {
        const response = await searchCampaignByName(name)
        console.log('search response => ', response !== null);
        if (response !== null) {
          setError({ name: "", comment: "", nameExists: true });
          setValidCampaignInfo(false);
        } else {
          setError({ name: "", comment: "", nameExists: false });
          setValidCampaignInfo(true);
        }
      }
    };

    validateData();
  }, [name]);

  useEffect(() => {
    if (!comment) {
      setError({
        name: "",
        comment: "comment is required",
        nameExists: false,
      });
      setValidCampaignInfo(false);
    } else {
      setValidCampaignInfo(true);
    }
  }, [comment]);

  React.useEffect(() => {
    if (next) {
      onNext(name, comment);
    }
  }, [next]);

  useEffect(() => {
    if (createCampaignCompleted) {
      setName("");
      setComment("");
    }
  }, [createCampaignCompleted]);

  return (
    <>
      <div>
        <label htmlFor="campaign-name" className="font-normal">
          <span>Campaign Name</span>
          <span className="text-red-500"> *</span>
        </label>
        <Input
          id="campaign-name"
          className="mt-2"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {error.nameExists && (
          <span className="block text-xs text-red-500 mt-2">
            The name of the campaign is already exists
          </span>
        )}

        {error.name.length > 0 && (
          <span className="block text-xs text-red-500">{error.name}</span>
        )}
      </div>

      <div className="mt-6">
        <label htmlFor="campaign-name" className="font-normal">
          <span>Comment</span>
          <span className="text-red-500"> *</span>
        </label>
        <Input
          id="campaign-name"
          className="mt-2"
          placeholder="Ex: payment employee"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {error.comment.length > 0 && (
          <span className="text-xs text-red-500">{error.name}</span>
        )}
      </div>
    </>
  );
};
