import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default function Home() {
  const { user } = useUser()

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/login">
          <Text>Sign In</Text>
        </Link>
        <Link href="/signup">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
      <StatusBar style="dark"/>
    </SafeAreaView>
  )
}