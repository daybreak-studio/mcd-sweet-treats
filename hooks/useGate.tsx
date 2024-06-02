import { toast } from "@/components/Toast/ToastRenderer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InfoSVG from "@/public/icons/info.svg";
import { useCookiePreference } from "@/components/Cookies";

export default function useGate({
  condition,
  message,
  redirect,
}: {
  condition: () => boolean;
  message: string;
  redirect: string;
}) {
  const router = useRouter();
  const { isAskingPermission } = useCookiePreference();

  const [shouldShowGate, setShouldShowGate] = useState(false);
  useEffect(() => {
    console.log(isAskingPermission);

    if (condition() && !isAskingPermission) {
      setShouldShowGate(true);
    }
  }, [isAskingPermission]);

  useEffect(() => {
    if (!shouldShowGate) return;

    toast({
      text: message,
      canDismiss: true,
      icon: <InfoSVG />,
      duration: 10000,
    });
    router.push(redirect);
  }, [shouldShowGate]);
}
