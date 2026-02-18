import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface PhotoData {
  readonly uri: string;
  readonly base64: string;
}

export function useCamera() {
  const [photo, setPhoto] = useState<PhotoData | null>(null);

  const takePhoto = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('권한 필요', '카메라 사용 권한이 필요해요');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto({
        uri: result.assets[0].uri,
        base64: result.assets[0].base64 ?? '',
      });
    }
  }, []);

  const pickFromGallery = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진 접근 권한이 필요해요');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto({
        uri: result.assets[0].uri,
        base64: result.assets[0].base64 ?? '',
      });
    }
  }, []);

  const clearPhoto = useCallback(() => {
    setPhoto(null);
  }, []);

  return {
    photoUri: photo?.uri ?? null,
    photoBase64: photo?.base64 ?? null,
    takePhoto,
    pickFromGallery,
    clearPhoto,
  };
}
