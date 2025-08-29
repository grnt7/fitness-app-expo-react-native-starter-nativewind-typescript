import { View, Text, TouchableOpacity, TextInput, FlatList,} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'

const Exercises = () => {

  const [searchQuery, setSearchQuery] = useState('')
  // const [exercises, setExercises] = useState([])

  return (
    <SafeAreaView className="flex 1 bg-gray-50">
      {/* Header */}
      <View className=" px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Exercise Library</Text>
        
          <Text className="text-gray-600 mt-1">Discover and master new exercises</Text>
        
      </View>
      {/* Search Bar */}
      <View className="flex-row items-center px-4 py-3 bg-gray-100 rounded-xl mt-4">
        <Ionicons name="search" size={20} color="#6b7280" />
        <TextInput
          placeholder="Search Exercises..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 border border-gray-300 rounded-md p-2 text-gray-800"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Exercise List */}
      <View className="flex-1 px-4 mt-4">
        <FlatList
          keyExtractor={(item) => item._id}
          data={[]}
          renderItem={({ item }) => <ExerciseCard item={item}
          onPress={() => router.push('exercise-detail?id=${item.id)')}
          />}
        />
      </View>

      {/* Exercise Details */}

      {/* Footer */}

      <Text>Exercises</Text>
    </SafeAreaView>
  )
}

export default Exercises