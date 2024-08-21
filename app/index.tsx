import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Bars3Icon,
  ClockIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/outline";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { useRouter,Link } from "expo-router";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const bannerImages = [
  {
    id: "1",
    imageUrl:
      "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    imageUrl:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    imageUrl:
      "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const categories = [
  {
    id: "1",
    name: "Fruits & Vegetables",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "2",
    name: "Meat & Seafood",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "3",
    name: "Dairy Products",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "4",
    name: "Bakery & Breakfast",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "5",
    name: "PepsiCo Exclusive",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "6",
    name: "Beverages",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "7",
    name: "Everyday Grocery",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "8",
    name: "Oil & Ghee",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "9",
    name: "Essential Living",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "10",
    name: "Noodles & Pasta",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "11",
    name: "Spices & Dressings",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
  {
    id: "12",
    name: "Tea & Coffee",
    icon: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  },
];

const numColumns = 4;
const INITIAL_VISIBLE_CATEGORIES = 8;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const progress = useSharedValue(0);
  const carouselRef = useRef(null);
  const router = useRouter();

  const renderBannerItem = ({ item }: any) => (
    <View className="px-4" style={{ borderRadius: 10, overflow: "hidden" }}>
      <Image
        source={{ uri: item.imageUrl }}
        className="h-40 rounded-md"
        style={{
          width: PAGE_WIDTH - 60,
        }}
        resizeMode="cover"
      />
    </View>
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity className="w-20">
      <View className="bg-white items-center rounded-md  shadow-md">
        <Image
          source={{ uri: item.icon }}
          className="h-16 w-16 rounded-md"
          resizeMode="cover"
        />
        <Text className="text-center text-xs font-semibold mt-2">
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, INITIAL_VISIBLE_CATEGORIES);

  const toggleCategories = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAllCategories((prev) => !prev);
  };

  return (
    <View className="flex-1 bg-white w-full">
      {/* Header */}
      <View className="bg-white pt-10 px-6 pb-4">
        <View className="flex flex-row items-center justify-center gap-5 pb-4">
          <Bars3Icon size={26} color="black" />
          <View className="flex items-start flex-1">
            <Text className="text-black text-base font-bold">
              57 Fatima Road
            </Text>
            <Text className="text-black text-xs">Lahore</Text>
          </View>
          <HeartIcon size={25} color="black" />
          <ShoppingBagIcon size={25} color="black" />
        </View>
        <View className="flex flex-row gap-4 items-center font-bold">
          <ClockIcon size={24} color="black" />
          <Text className="text-black text-s font-bold flex-1">
            Delivery: 25-30 min
          </Text>
          <Text className="text-gray-400 text-s font-bold">Change</Text>
        </View>
      </View>

      <ScrollView>
        <View className="px-6 pb-4 mt-8">
          <View className="flex flex-row items-center gap-2 bg-white border border-gray-300 rounded-full px-2 pb-2">
            <MagnifyingGlassIcon size={24} color="black" />
            <TextInput
              placeholder="Search products..."
              className="flex-1 ml-2 text-gray-700"
              style={{ paddingVertical: 0 }}
            />
            <Link
              className="bg-gray-700 py-2 px-4 rounded-full"
              href='/modal'
            >
              <Text className="text-white font-semibold">AI Record</Text>
            </Link>
          </View>
        </View>
        {/* Carousel */}
        <View style={{ alignItems: "center" }}>
          <Carousel
            ref={carouselRef}
            width={PAGE_WIDTH - 40}
            height={170}
            data={bannerImages}
            loop
            autoPlay
            onSnapToItem={(index) => setCurrentIndex(index)}
            onProgressChange={(_, absoluteProgress) =>
              (progress.value = absoluteProgress)
            }
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            renderItem={renderBannerItem}
          />

          {/* Dots for pagination */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {bannerImages.map((_, index) => (
              <TouchableOpacity key={index}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      currentIndex === index ? "#D70F64" : "#E0E0E0",
                    marginHorizontal: 5,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categories Section */}
        <View className="px-4 pt-4">
          <Text className="text-black font-semibold text-lg">Categories</Text>
          <FlatList
            data={displayedCategories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
            scrollEnabled={false}
          />
          {categories.length > INITIAL_VISIBLE_CATEGORIES && (
            <TouchableOpacity
              onPress={toggleCategories}
              className="flex flex-row items-center justify-center mt-4"
            >
              <Text className="text-black font-semibold mr-2">
                {showAllCategories ? "View Less" : "View All"}
              </Text>
              {showAllCategories ? (
                <ArrowUpIcon size={20} color="black" />
              ) : (
                <ArrowDownIcon size={20} color="black" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}





