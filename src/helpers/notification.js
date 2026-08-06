import { getToken } from "firebase/messaging";
import { messaging } from "@/firebase";

export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey: "BJeeRJRTKubhfmxKXlJUHNJ1cr8tpszXVWnFE1Waa0d3al4dDrlKDgwJtIUaiRyJmmd5z2i_icP5b5_ogi1r43c",
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("FCM Token:", token);
      return token;
    }

    return null;
  } catch (error) {
    console.error("FCM Error:", error);
    return null;
  }
};