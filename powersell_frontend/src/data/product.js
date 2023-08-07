import 삼다수 from '../images/home/삼다수.jpg';
import 햇반 from '../images/home/햇반.jpg'
import 컵밥 from '../images/home/컵밥.jpg';
import 신라면 from '../images/home/신라면.jpg';
import 구운란 from '../images/home/구운란.png';

const products = [
  {
    id: 1,
    thumbnail: 삼다수,
    name: "제주 삼다수 2L (6개입)",
    originalPrice: 6600,
    discountRate: 80,
    salePrice: 1400,
  },
  {
    id: 2,
    thumbnail: 신라면,
    name: "농심 신라면 (5개입)",
    originalPrice: 3900,
    discountRate: 80,
    salePrice: 800,
  },
  {
    id: 3,
    thumbnail: 햇반,
    name: "햇반 백미밥 210g (3개입)",
    originalPrice: 5890,
    discountRate: 80,
    salePrice: 1200,
  },
  {
    id: 4,
    thumbnail: 컵밥,
    name: "오뚜기 컵밥 오삼불고기덮밥 310g",
    originalPrice: 2500,
    discountRate: 80,
    salePrice: 600,
  },
  {
    id: 5,
    thumbnail: 구운란,
    name: "곰곰 구운란 10구",
    originalPrice: 6290,
    discountRate: 80,
    salePrice: 1300,
  },
];

export default products;