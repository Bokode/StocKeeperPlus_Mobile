/*import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { 
  getMessaging, 
  requestPermission, 
  subscribeToTopic, 
  onNotificationOpenedApp, 
  AuthorizationStatus, 
  unsubscribeFromTopic
} from '@react-native-firebase/messaging';

// Utilisation de l'IAG pour la compréhension de firebase //
export const useNotifications = (userIdentifier) => {
  const router = useRouter();
  const cleanId = userIdentifier?.replace(/[@.]/g, '_');
  const topic = `user_${cleanId}`;

  useEffect(() => {
    if (!userIdentifier) return;

    const messaging = getMessaging();

    const setup = async () => {
      const authStatus = await requestPermission(messaging);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        
        
        await subscribeToTopic(messaging, topic);
      }
    };

    setup();

    const unsubscribe = onNotificationOpenedApp(messaging, remoteMessage => {

    });

    return () => {
      unsubscribeFromTopic(messaging, topic);
      unsubscribe();
    };
  }, [userIdentifier]);
};*/