export interface Product {
  id: string;
  name: string;
  code: string;
  image: string;
  price: number;
  currency: string;
  unit: string;
  opecPrice: number;
  availability: 'high' | 'medium' | 'low';
  specifications: string[];
  minOrder: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Crude Oil',
    code: 'CRUDE',
    image: 'https://d64gsuwffb70l.cloudfront.net/69138b477443873c621b20e5_1762888614364_8ff1b7c9.webp',
    price: 82.45,
    currency: 'USD',
    unit: 'barrel',
    opecPrice: 82.45,
    availability: 'high',
    specifications: ['API Gravity: 38-42', 'Sulfur Content: <0.5%', 'OPEC Reference Basket'],
    minOrder: 10000
  },
  {
    id: '2',
    name: 'Natural Gas',
    code: 'NATGAS',
    image: 'https://d64gsuwffb70l.cloudfront.net/69138b477443873c621b20e5_1762888616178_826ef40b.webp',
    price: 3.25,
    currency: 'USD',
    unit: 'MMBtu',
    opecPrice: 3.25,
    availability: 'high',
    specifications: ['LNG Quality', 'Pipeline Grade', 'International Standards'],
    minOrder: 50000
  },
  {
    id: '3',
    name: 'Aviation Fuel (Jet A1)',
    code: 'JETFUEL',
    image: 'https://d64gsuwffb70l.cloudfront.net/69138b477443873c621b20e5_1762888617943_510bd71b.webp',
    price: 95.80,
    currency: 'USD',
    unit: 'barrel',
    opecPrice: 95.80,
    availability: 'medium',
    specifications: ['ASTM D1655', 'Freeze Point: -47°C', 'Flash Point: 38°C min'],
    minOrder: 5000
  },
  {
    id: '4',
    name: 'Premium Motor Spirit (PMS)',
    code: 'PMS',
    image: 'https://d64gsuwffb70l.cloudfront.net/69138b477443873c621b20e5_1762888619724_7212d6b7.webp',
    price: 78.30,
    currency: 'USD',
    unit: 'barrel',
    opecPrice: 78.30,
    availability: 'high',
    specifications: ['RON 91-95', 'Lead Free', 'Euro V Standard'],
    minOrder: 8000
  },
  {
    id: '5',
    name: 'Liquefied Petroleum Gas (LPG)',
    code: 'LPG',
    image: 'https://d64gsuwffb70l.cloudfront.net/69138b477443873c621b20e5_1762888621507_122f1cf2.webp',
    price: 42.60,
    currency: 'USD',
    unit: 'MT',
    opecPrice: 42.60,
    availability: 'medium',
    specifications: ['Propane/Butane Mix', 'Purity: 95%+', 'Commercial Grade'],
    minOrder: 20000
  },
  {
    id: '6',
    name: 'Automotive Gas Oil (AGO)',
    code: 'AGO',
    image: 'https://d64gsuwffb70l.cloudfront.net/69138b477443873c621b20e5_1762888624374_ab25b393.webp',
    price: 85.90,
    currency: 'USD',
    unit: 'barrel',
    opecPrice: 85.90,
    availability: 'high',
    specifications: ['Diesel EN 590', 'Cetane Number: 51+', 'Sulfur: <10ppm'],
    minOrder: 7000
  }
];
