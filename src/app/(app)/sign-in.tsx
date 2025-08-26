import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import GoogleSignIn from '../components/GoogleSignIn'



export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [isLoading, setIsLoading ] = React.useState(false);
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;
    if (!emailAddress || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return
    }
    setIsLoading(true);
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
     } finally {
    setIsLoading(false);
    };
  }





  return (
    <SafeAreaView className="flex-1">
         <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >

    {/* Header section */}

    <View className="flex-1 justify-center ">
        {/* Logo branding */}
        <View className="items-center mb-6">
            <View className="w-20 h-20 bg-gradient-to-br from-blue-600-to-purple-600 rounded-2xl items-center justify-center "  >
           
        
            <Ionicons  name="fitness" 
            size={40} 
            color="white" 
            style={{ 
                textShadowColor: 'rgba(0, 0, 0, 0.4)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 10,
            }} 
        />
        
       </View>
       
        <Text className="text-3xl font-bold text-gray-900 ">
            FitTracker
        </Text>
        <Text className="text-md  text-gray-600 text-center mb-2">
            Track your fitness journey{"\n"}and reach your goals
            </Text>
      
    </View>
</View>

{/* Sign-In form */}
<View className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-4">
<Text className="text-lg font-bold text-gray-900 mb-2 text-center">Welcome back</Text>


{/* Email input */}
<View>
    <Text className="text-sm font-medium text-gray-700 mb-2">
        Email Address
    </Text>
    <View className="flex-row items-center bg-gray-50 rounded-lg px-2 py-2 border border-gray-200">
    <Ionicons name="mail-outline" size={20} color="#6B7280" />
    <TextInput
        value={emailAddress}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        className="ml-3 flex-1 text-gray-900"
        editable={!isLoading}
        />
    </View>

      {/* Password input */}
    <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-2">
        Password</Text>
        <View className="flex-row items-center bg-gray-50 rounded-xl px-2 py-2 border border-gray-200 mt-2">
        <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
       
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        className="flex-1 ml-3 text-gray-900"
        editible={!isLoading}
      />
      </View>
      </View>
      </View>
      </View>
      {/* Sign In  Button */}
      <TouchableOpacity onPress={onSignInPress}
      disabled={isLoading}
      className={`rounded-xl py-2  mb-4  ${isLoading ? 'bg-gray-400' : 'bg-blue-600' }`}
      activeOpacity={0.8}
      >
        <View className="flex-row justify-center items-center">

        {isLoading ? (
            <Ionicons name="refresh" size={20} color="white"  />
        ) : (
            <Ionicons name="log-in-outline" size={20} color="white" />
            // <Text className="text-white text-lg font-semibold">
            //     Sign In
            // </Text>
        )}
        <Text className="text-white text-lg font-semibold ml-2">
            {isLoading ? 'Signing In...' : 'Sign In'}
        </Text>
        </View>
      </TouchableOpacity>

      {/* Divider */}

        <View className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="px-4 text-gray-500 text-sm">OR</Text>
            <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Google sign In button */}
        <GoogleSignIn/>
        {/* to be implemented */}
       
       {/* Sign up link */}
       <View className=" flex-row justify-center items-center mb-2 mt-4 pb-6">
         <Text className="text-gray-500 text-sm">Don't have an account? </Text>
        <Link href="/sign-up" asChild>
        <TouchableOpacity>
            <Text className="text-blue-600 font-semibold">Sign Up</Text>
        </TouchableOpacity>
        </Link>
        </View>
        {/* Footer section */}
      <View className="pb-6">
         
       
         {/* <Text>Sign up</Text> */}
           <Text className="text-center text-gray-500 text-sm ">Start your fitness Journey today </Text>
            {/* <Text className="text-center text-gray-500 text-sm ">© 2025 FitTracker. All rights reserved.</Text> */}
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}