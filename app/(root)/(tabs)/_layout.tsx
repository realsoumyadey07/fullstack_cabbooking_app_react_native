import { Stack } from "expo-router"

const Layout = ()=> {
     return (
          <Stack>
               <Stack.Screen name="home" />
               <Stack.Screen name="chat" />
               <Stack.Screen name="history" />
               <Stack.Screen name="profile" />
          </Stack>
     )
}

export default Layout