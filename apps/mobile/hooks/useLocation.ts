import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';

interface LocationState {
  readonly latitude: number | null;
  readonly longitude: number | null;
  readonly city: string | null;
  readonly district: string | null;
  readonly permitted: boolean;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    city: null,
    district: null,
    permitted: false,
  });

  const requestPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocation((prev) => ({ ...prev, permitted: false }));
      return;
    }

    try {
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [address] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        city: address?.city ?? address?.region ?? null,
        district: address?.district ?? address?.subregion ?? null,
        permitted: true,
      });
    } catch {
      setLocation((prev) => ({ ...prev, permitted: true }));
    }
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return location;
}
