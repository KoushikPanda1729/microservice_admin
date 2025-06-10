import { AppImages } from "@/commons/constants/appImages";
import { memo } from "react";

const DashboardPreview = () => {
  return (
    <div className="w-full h-full">
      <img
        src={AppImages.loginBanner}
        alt="Dashboard Preview"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default memo(DashboardPreview);
