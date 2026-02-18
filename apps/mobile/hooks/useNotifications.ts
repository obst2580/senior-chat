import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

const STUB_MESSAGE = '알림 기능은 준비 중이에요';

export function useNotifications() {
  const [isPermissionGranted] = useState(false);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    Alert.alert('준비 중', STUB_MESSAGE);
    return false;
  }, []);

  const scheduleNotification = useCallback(
    async (
      _title: string,
      _body: string,
      _triggerDate: Date,
    ): Promise<string | null> => {
      Alert.alert('준비 중', STUB_MESSAGE);
      return null;
    },
    [],
  );

  return {
    isPermissionGranted,
    requestPermission,
    scheduleNotification,
  };
}
