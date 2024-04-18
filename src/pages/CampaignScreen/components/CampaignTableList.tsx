import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { Campaign } from "models/Campaign";
import { CampaignTableItem } from "./CampaignTableItem";
import { Modal } from "components/Modal";
import { createPortal } from "react-dom";
import { PaymentsScreen } from "pages/PaymentsScreen";

interface CampaignTableListProps {
  campaigns: Campaign[];
}

export const CampaignTableList = ({ campaigns }: CampaignTableListProps) => {
  const [showPaymentScreenModal, setShowPaymentScreenModal] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState<Campaign>(campaigns[0]);

  useEffect(() => {
    setActiveCampaign(campaigns[0]);
  }, [campaigns]);

  return (
    <>
      <Table>
        <TableCaption>A list of your campaigns.</TableCaption>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead>Campaigns name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => {
            return (
              <CampaignTableItem
                key={campaign.id}
                onClick={() => {
                  setShowPaymentScreenModal(true);
                  setActiveCampaign(campaign);
                }}
                campaign={campaign}
              />
            );
          })}
        </TableBody>
      </Table>

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
