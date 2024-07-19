import { Stack } from 'expo-router/stack';
import { AppProvider } from '@/context/userContext';

export default function Layout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}