import React, { useEffect, useState } from "react";
import { Campaign } from "models/Campaign";
import { CampaignCardItem } from "./CampaignCardItem";
import { createPortal } from "react-dom";
import { Modal } from "components/Modal";
import { PaymentsScreen } from "pages/PaymentsScreen";

interface CampaignCardListProps {
  campaigns: Campaign[];
}

export const CampaignCardList = ({ campaigns }: CampaignCardListProps) => {
  const [showPaymentScreenModal, setShowPaymentScreenModal] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState<Campaign>(campaigns[0]);

  useEffect(() => {
    setActiveCampaign(campaigns[0]);
  }, [campaigns]);

  return (
    <>
      <div className="flex flex-row items-center gap-4 flex-wrap font-poppins">
        {campaigns.map((campaign) => {
          return (
            <CampaignCardItem
              key={campaign.id}
              campaign={campaign}
              onClick={() => setShowPaymentScreenModal(true)}
            />
          );
        })}
      </div>
      {createPortal(
        <Modal
          open={showPaymentScreenModal}
          onClose={() => setShowPaymentScreenModal(false)}
        >
          {activeCampaign && (
            <PaymentsScreen
              onClose={() => setShowPaymentScreenModal(false)}
              campaign={activeCampaign}
            />
          )}
        </Modal>,
        document.body
      )}
    </>
  );
};
