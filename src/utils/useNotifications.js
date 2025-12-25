import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { 
  getMessaging, 
  requestPermission, 
  subscribeToTopic, 
  onNotificationOpenedApp, 
  AuthorizationStatus, 
  unsubscribeFromTopic
} from '@react-native-firebase/messaging';

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
        console.log(`abonnement au topic : ${topic}`);
      }
    };

    setup();

    const unsubscribe = onNotificationOpenedApp(messaging, remoteMessage => {

    });

    return () => {
      console.log(`Désabonnement du topic : ${topic}`);
      
      unsubscribeFromTopic(messaging, topic);
      unsubscribe();
    };
  }, [userIdentifier]);
};