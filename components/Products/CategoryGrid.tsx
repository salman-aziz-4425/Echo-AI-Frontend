import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

const categories = [
  { id: '1', name: 'Fruits & Vegetables', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '2', name: 'Meat & Seafood', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '3', name: 'Dairy Products', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '4', name: 'Bakery & Breakfast', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '5', name: 'PepsiCo Exclusive', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '6', name: 'Beverages', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '7', name: 'Everyday Grocery', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '8', name: 'Oil & Ghee', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '9', name: 'Essential Living', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '10', name: 'Noodles & Pasta', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '11', name: 'Spices & Dressings', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
  { id: '12', name: 'Tea & Coffee', icon: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg' },
];

const numColumns = 4;

const CategoryGrid = () => {
  const renderItem = ({ item }:any) => (
    <TouchableOpacity className="w-20 p-2">
      <View className="bg-white items-center rounded-md p-3 shadow-md w-full">
        <Image
          source={{ uri: item.icon }}
          className="h-16 w-16 rounded-md"
          resizeMode="cover"
        />
        <Text className="text-center text-xs font-semibold mt-2">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View >
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={{ alignItems: 'center' }}
      />
      <TouchableOpacity className="mt-4 self-center">
        <Text className="text-blue-600 font-semibold">View all categories</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryGrid;
``
