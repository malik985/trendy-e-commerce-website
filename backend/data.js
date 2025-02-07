import bcrypt from 'bcryptjs'
const data ={
    users: [
        {
          name: 'malik',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ],
    products:[
        {
            // _id: '1',
            name:"redmi",
            slug:"redmi",
            category:"phone",
            image:"/images/p1.jpg",
            price: 120,
            countInStock:10,
            brqnd:"phone",
            rating:4.5,
            numReviews:10,
            description:"gdjkedckdldkdci"

        },
        {
           //  _id: '2',
            name:"sums",
            slug:"sums",
            category:"phone",
            image:"/images/p2.jpg",
            price: 120,
            countInStock:10,
            brqnd:"phone",
            rating:4.5,
            numReviews:10,
            description:"gdjkedckdldkdci"

        },
        {
           //  _id: '3',
            name:"nokia",
            slug:"nokia",
            category:"phone",
            image:"/images/p3.jpg",
            price: 120,
            countInStock:10,
            brqnd:"phone",
            rating:4.5,
            numReviews:10,
            description:"gdjkedckdldkdci"

        },
    ]
}
export default data;