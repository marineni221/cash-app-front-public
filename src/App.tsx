import React from "react";
import { AuthProvider } from "context/authContext";
import { LoaderCircle } from "lucide-react";
import Layout from "pages/Layout";
import { EventProvider } from "context/EventContext";
import { CampagneCreatedProvider } from "context/campaignCreatedContext";

const Loader = () => {
  return (
    <div className="backdrop-blur-3xl absolute w-full h-screen px-10 flex justify-center items-center  ">
      <LoaderCircle className="animate-spin text-white w-20 h-20" />
    </div>
  );
};

export default function App() {
  return (
    <div>
      <React.Suspense fallback={<Loader />}>
        <AuthProvider>
          <EventProvider>
            <CampagneCreatedProvider>
              <Layout />
            </CampagneCreatedProvider>
          </EventProvider>
        </AuthProvider>
      </React.Suspense>
    </div>
  );
}
