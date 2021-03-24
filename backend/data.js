import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Puma',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],


  products: [
    {
      name: 'Nike Slim Shirt',
      image: [
        [
          {
            original: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            color:'Light'
          },
          {
            original: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            color:'Red'
          }
        ],
        [
          {
            original: "https://www.recc-paris.com/1073-medium_default_2x/top-tony.jpg",
            thumbnail: "https://www.recc-paris.com/1073-medium_default_2x/top-tony.jpg",
            color:'White'
          }
        ],
        [
          {
            original: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            thumbnail: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            color:'Purple'
          },

        ],
      ],
      price: 120,
      size: [{ value: "S",quantity:2 }, { value: "M",quantity:0  }, { value: "L",quantity:2  }],
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      // numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Shirt',
      image: [
        [
          {
            original: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            color:'Black'
          },
          {
            original: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            color:'Rose'
          }
        ],
        [
          {
            original: "https://www.recc-paris.com/1073-medium_default_2x/top-tony.jpg",
            thumbnail: "https://www.recc-paris.com/1073-medium_default_2x/top-tony.jpg",
            color:'White'
          }
        ], [
          {
            original: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            thumbnail: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            color:'Black'
          },
          {
            original: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            thumbnail: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            color:'Yellow'
          }
        ],
      ],
      price: 100,
      size: [{ value: "S",quantity:2 }, { value: "M",quantity:0  }],
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      // numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Lacoste Free Shirt',
      image: [
        [
          {
            original: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            color:'White'
          },
          {
            original: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            color:'Blue'
          }
        ],
        [
          {
            original: "https://www.recc-paris.com/1073-medium_default_2x/top-tony.jpg",
            thumbnail: "https://www.recc-paris.com/1073-medium_default_2x/top-tony.jpg",
            color:'Rose'
          }
        ], [
          {
            original: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            thumbnail: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            color:'Purple'
          },
          {
            original: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            thumbnail: "https://www.recc-paris.com/1093-home_default/robe-brittany.jpg",
            color:'Light'
          }
        ],
      ],
      price: 220,
      size: [ { value: "M",quantity:2  }, { value: "L",quantity:2  }, { value: "XL",quantity:0  }],
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      // numReviews: 17,
      description: 'high quality product',
    },
    {
      name: 'Nike Slim Pant',
      image: [
        [
          {
            original: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            color:'White'
          },
          {
            original: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            color:'Blue'
          }
        ],
        [
          {
            original: "https://www.recc-paris.com/1073-medium_default_2x/top-tony.jpg",
            thumbnail: "https://www.recc-paris.com/1073-medium_default_2x/top-tony.jpg",
            color:'Rose'
          }
        ], 
      ],
      price: 78,
      size: [{ value: "S",quantity:2 },  { value: "XL",quantity:0  }],
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      // numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'Puma Slim Pant',
      image: [
        [
          {
            original: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            color:'White'
          },
          {
            original: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            color:'Blue'
          }
        ]
      ],
      price: 65,
      size: [{ value: "S",quantity:3 }, { value: "L",quantity:1  }, { value: "XL",quantity:0  }],
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      // numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Pant',
      image: [
        [
          {
            original: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1091-superlarge_default/robe-cecilia.jpg",
            color:'Blue'
          },
          {
            original: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            thumbnail: "https://www.recc-paris.com/1090-superlarge_default/robe-cecilia.jpg",
            color:'Yellow'
          }
        ],
      ],
      size: [{ value: "S",quantity:2 }, { value: "M",quantity:2  }, { value: "L",quantity:2  }, { value: "XL",quantity:0  }],
      
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      // numReviews: 15,
      description: 'high quality product',
    },
  ],
};
export default data;
