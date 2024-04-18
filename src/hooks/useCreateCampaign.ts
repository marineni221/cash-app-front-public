import { CampagneCreatedContext } from "context/campaignCreatedContext"
import { useContext } from "react"

export const useCreatedCampaign = () => {
    const { createdCampagne, setCreatedCampagne, resetCampaign } = useContext(CampagneCreatedContext);
    return { createdCampagne, setCreatedCampagne, resetCampaign };
}
