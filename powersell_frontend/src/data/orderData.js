import 삼다수 from '../images/home/삼다수.jpg';
import 신라면 from '../images/home/신라면.jpg';
import 컵밥 from '../images/home/컵밥.jpg';
import 햇반 from '../images/home/햇반.jpg';

const orderData = [
    { id: 1, name: "박진효", phoneNumber: "01020444630", orderStatus: "ARRIVED", thumbnail: 삼다수, itemName: '제주 삼다수 2L (6개입)', count: 1, price: 1400, originalPrice: 6600, orderTime: '2023-08-03 21:00', address: '서울 서대문구 연희로5길 16-13 506호', password: '1234'},
    { id: 2, name: "김진효", phoneNumber: "01020444630", orderStatus: "DELIVERING", thumbnail: 신라면, itemName: '농심 신라면 (5개입)', count: 2, price: 800, originalPrice: 3900, orderTime: '2023-08-03 21:10', address: '서울 서대문구 연희로5길 16-13 506호', password: '1256' },
    { id: 3, name: "이진효", phoneNumber: "01012345678", orderStatus: "CANCELED", thumbnail: 컵밥, itemName: '오뚜기 컵밥 오삼불고기덮밥 310g', count: 3, price: 600, originalPrice: 2500, orderTime: '2023-08-03 21:20', address: '서울 서대문구 연희로5길 16-13 101동 507호', password: '1278' },
    { id: 4, name: "최진효", phoneNumber: "01012345678", orderStatus: "WAITING", thumbnail: 햇반, itemName: '햇반 백미밥 210g (3개입)', count: 4, price: 1200, originalPrice: 5890, orderTime: '2023-08-03 21:30', address: '서울 서대문구 연희로5길 16-13 102동 508호', password: '1299' },
];

export default orderData;