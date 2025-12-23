import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { 
  getMessaging, 
  requestPermission, 
  subscribeToTopic, 
  onNotificationOpenedApp, 
  AuthorizationStatus 
} from '@react-native-firebase/messaging';

export const useNotifications = (userIdentifier) => {
  const router = useRouter();

  useEffect(() => {
    if (!userIdentifier) return;

    const messaging = getMessaging();

    const setup = async () => {
      const authStatus = await requestPermission(messaging);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const cleanId = userIdentifier.replace(/[@.]/g, '_');
        const topic = `user_${cleanId}`;
        await subscribeToTopic(messaging, topic);
      }
    };

    setup();

    const unsubscribe = onNotificationOpenedApp(messaging, remoteMessage => {

    });

    return unsubscribe;
  }, [userIdentifier]);
};