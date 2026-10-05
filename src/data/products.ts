export interface Product {
  id: number;
  title: string;
  titleMl: string;
  price: string;
  image: string;
  maker: string;
  makerMl: string;
  district: string;
  districtMl: string;
  category: string;
  makerAvatar: string;
  story: string;
  rating: number;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    title: "Premium Banana Chips",
    titleMl: "പ്രീമിയം നേന്ത്രക്കായ വറുത്തത്",
    price: "₹150",
    image: "https://picsum.photos/id/292/800/1000",
    maker: "Amina",
    makerMl: "ആമിന",
    district: "Kozhikode",
    districtMl: "കോഴിക്കോട്",
    category: "Food & Spices",
    makerAvatar: "https://i.pravatar.cc/150?img=5",
    story: "Hand sliced and fried in pure coconut oil.",
    rating: 4.8
  },
  {
    id: 2,
    title: "Handwoven Cotton Saree",
    titleMl: "കൈത്തറി കോട്ടൺ സാരി",
    price: "₹1,200",
    image: "https://picsum.photos/id/338/800/1000",
    maker: "Lakshmi",
    makerMl: "ലക്ഷ്മി",
    district: "Thrissur",
    districtMl: "തൃശ്ശൂർ",
    category: "Clothing",
    makerAvatar: "https://i.pravatar.cc/150?img=9",
    story: "Woven by hand over 3 days.",
    rating: 4.9
  },
  {
    id: 3,
    title: "Organic Turmeric Powder",
    titleMl: "ഓർഗാനിക് മഞ്ഞൾപ്പൊടി",
    price: "₹120",
    image: "https://picsum.photos/id/305/800/1000",
    maker: "Mary",
    makerMl: "മേരി",
    district: "Kochi",
    districtMl: "കൊച്ചി",
    category: "Food & Spices",
    makerAvatar: "https://i.pravatar.cc/150?img=10",
    story: "Sun dried and ground at home.",
    rating: 4.7
  },
  {
    id: 4,
    title: "Homemade Jackfruit Halwa",
    titleMl: "ചക്ക ഹൽവ",
    price: "₹180",
    image: "https://picsum.photos/id/102/800/1000",
    maker: "Sujatha",
    makerMl: "സുജാത",
    district: "Trivandrum",
    districtMl: "തിരുവനന്തപുരം",
    category: "Food & Spices",
    makerAvatar: "https://i.pravatar.cc/150?img=20",
    story: "Made with love and pure ghee.",
    rating: 4.6
  },
  {
    id: 5,
    title: "Spicy Mango Pickle",
    titleMl: "മാങ്ങ അച്ചാർ",
    price: "₹140",
    image: "https://picsum.photos/id/225/800/1000",
    maker: "Bindu",
    makerMl: "ബിന്ദു",
    district: "Kozhikode",
    districtMl: "കോഴിക്കോട്",
    category: "Food & Spices",
    makerAvatar: "https://i.pravatar.cc/150?img=24",
    story: "A 100 year old family recipe.",
    rating: 4.8
  },
  {
    id: 6,
    title: "Hand painted Terracotta Pots",
    titleMl: "കളിമൺ പാത്രങ്ങൾ",
    price: "₹450",
    image: "https://picsum.photos/id/175/800/1000",
    maker: "Raji",
    makerMl: "രാജി",
    district: "Thrissur",
    districtMl: "തൃശ്ശൂർ",
    category: "Handicrafts",
    makerAvatar: "https://i.pravatar.cc/150?img=25",
    story: "Perfect for your indoor garden.",
    rating: 4.5
  },
  {
    id: 7,
    title: "Bamboo Woven Basket",
    titleMl: "മുളങ്കുട്ട",
    price: "₹350",
    image: "https://picsum.photos/id/132/800/1000",
    maker: "Leela",
    makerMl: "ലീല",
    district: "Wayanad",
    districtMl: "വയനാട്",
    category: "Handicrafts",
    makerAvatar: "https://i.pravatar.cc/150?img=32",
    story: "Eco friendly, durable, and traditional.",
    rating: 4.9
  },
  {
    id: 8,
    title: "Aromatic Cardamom Candles",
    titleMl: "ഏലയ്ക്ക മെഴുകുതിരികൾ",
    price: "₹250",
    image: "https://picsum.photos/id/111/800/1000",
    maker: "Sara",
    makerMl: "സാറ",
    district: "Idukki",
    districtMl: "ഇടുക്കി",
    category: "Home Decor",
    makerAvatar: "https://i.pravatar.cc/150?img=40",
    story: "Brings the scent of the hills to your home.",
    rating: 4.7
  }
];
