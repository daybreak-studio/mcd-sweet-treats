import React from "react";
import Cross from "./cross.svg";
import TracyShadow from "../TracyShadow";

type Props = {};

const TermsAndCondition = (props: Props) => {
  return (
    <div className="fixed inset-0 overflow-y-scroll">
      <div className="mx-auto w-full border-[1rem] border-accent bg-light p-12 sm:my-24 sm:max-w-[500px]">
        <div className="flex flex-row justify-between">
          <h2 className="font-serif-xl mb-4">Terms</h2>
          <a href={"#"}>
            <Cross />
          </a>
        </div>

        {`These terms and conditions relate to the use of the mcdonalds.com/ca website (the “Site”) and the mobile application (the “App” OR “McDonald's App”) offered by McDonald’s Restaurants of Canada Limited (“McDonald’s”) (collectively the Site and the App are referred to as the “Application”, and the installation, access or use of the Application, any websites, mobile applications, email newsletters and subscriptions, and other digital properties on which these terms and conditions are posted or referenced are collectively referred to as the “Online Services”).

By downloading, installing, accessing or otherwise using the Online Services, you agree to be bound by these Terms & Conditions (“Terms”). If you do not agree, you should not download, install, access or otherwise use the Online Services. These terms form a legal agreement between you and McDonald’s (the “Agreement”). This Agreement contains provisions that limit the liability of McDonald’s.

These terms and conditions relate to the use of the mcdonalds.com/ca website (the “Site”) and the mobile application (the “App” OR “McDonald's App”) offered by McDonald’s Restaurants of Canada Limited (“McDonald’s”) (collectively the Site and the App are referred to as the “Application”, and the installation, access or use of the Application, any websites, mobile applications, email newsletters and subscriptions, and other digital properties on which these terms and conditions are posted or referenced are collectively referred to as the “Online Services”).

By downloading, installing, accessing or otherwise using the Online Services, you agree to be bound by these Terms & Conditions (“Terms”). If you do not agree, you should not download, install, access or otherwise use the Online Services. These terms form a legal agreement between you and McDonald’s (the “Agreement”). This Agreement contains provisions that limit the liability of McDonald’s.

These terms and conditions relate to the use of the mcdonalds.com/ca website (the “Site”) and the mobile application (the “App” OR “McDonald's App”) offered by McDonald’s Restaurants of Canada Limited (“McDonald’s”) (collectively the Site and the App are referred to as the “Application”, and the installation, access or use of the Application, any websites, mobile applications, email newsletters and subscriptions, and other digital properties on which these terms and conditions are posted or referenced are collectively referred to as the “Online Services”).

By downloading, installing, accessing or otherwise using the Online Services, you agree to be bound by these Terms & Conditions (“Terms”). If you do not agree, you should not download, install, access or otherwise use the Online Services. These terms form a legal agreement between you and McDonald’s (the “Agreement”). This Agreement contains provisions that limit the liability of McDonald’s.

These terms and conditions relate to the use of the mcdonalds.com/ca website (the “Site”) and the mobile application (the “App” OR “McDonald's App”) offered by McDonald’s Restaurants of Canada Limited (“McDonald’s”) (collectively the Site and the App are referred to as the “Application”, and the installation, access or use of the Application, any websites, mobile applications, email newsletters and subscriptions, and other digital properties on which these terms and conditions are posted or referenced are collectively referred to as the “Online Services”).

By downloading, installing, accessing or otherwise using the Online Services, you agree to be bound by these Terms & Conditions (“Terms”). If you do not agree, you should not download, install, access or otherwise use the Online Services. These terms form a legal agreement between you and McDonald’s (the “Agreement”). This Agreement contains provisions that limit the liability of McDonald’s.`}
      </div>
    </div>
  );
};

export default TermsAndCondition;
