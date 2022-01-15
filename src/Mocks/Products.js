const products = [
  {
    id: 1,
    icon:
      'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    images: [
      'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
      'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
      'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    ],
    price: 25999,
    details:'Praesent hendrerit finibus orci eu facilisis. Mauris porttitor sit amet elit nec dictum. Maecenas suscipit eros consectetur dolor maximus',
    title: 'IPhone X 64 GB',
    discount: 10,
    rating: 4.5,
    quantity: 1,
    reviews: [
      {
        dp:
          'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
        name: 'Jhon Doe',
        createdAt: '1 day ago',
        rating: 4,
        review:
          ' A truly local space with an artist flare. Great coffee, fresh nasgor, and traditional javanese coffee. If I were dating, I’d do a coffee date here. Warm vibe.',
      },
      {
        dp:
          'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
        name: 'Jhon Jhon',
        createdAt: '1 day ago',
        rating: 3,
        review:
          ' A truly local space with an artist flare. Great coffee, fresh nasgor, and traditional javanese coffee. If I were dating, I’d do a coffee date here. Warm vibe.',
      },
    ],
  },
  {
    id: 2,
    icon:
      'https://images.unsplash.com/photo-1606342000003-62b0e935f869?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
    images: [
      'https://images.unsplash.com/photo-1606342000003-62b0e935f869?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
      'https://images.unsplash.com/photo-1606342000003-62b0e935f869?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
      'https://images.unsplash.com/photo-1606342000003-62b0e935f869?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
    ],
    price: 25999,
    details:'Praesent hendrerit finibus orci eu facilisis. Mauris porttitor sit amet elit nec dictum. Maecenas suscipit eros consectetur dolor maximus',
    title: 'Iphone 11 Pro Max 128 GB',
    rating: 4,
    quantity: 1,
    reviews: [],
  },
  {
    id: 3,
    icon:
      'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    images: [
      'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
      'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
      'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    ],
    price: 25999,
    details:'Praesent hendrerit finibus orci eu facilisis. Mauris porttitor sit amet elit nec dictum. Maecenas suscipit eros consectetur dolor maximus',
    title: 'IPhone X 64 GB',
    discount: 10,
    rating: 4.3,
    quantity: 1,
    reviews: [
      {
        dp: '../../../assets/images/dp.jpg',
        name: 'Jhon Doe',
        createdAt: '1 day ago',
        rating: 4,
        review:
          ' A truly local space with an artist flare. Great coffee, fresh nasgor, and traditional javanese coffee. If I were dating, I’d do a coffee date here. Warm vibe.',
      },
      {
        dp:
          'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
        name: 'Jhon Jhon',
        createdAt: '1 day ago',
        rating: 3,
        review:
          ' A truly local space with an artist flare. Great coffee, fresh nasgor, and traditional javanese coffee. If I were dating, I’d do a coffee date here. Warm vibe.',
      },
      {
        dp:
          'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
        name: 'Jhon Jhon',
        createdAt: '1 day ago',
        rating: 3,
        review:
          ' A truly local space with an artist flare. Great coffee, fresh nasgor, and traditional javanese coffee. If I were dating, I’d do a coffee date here. Warm vibe.',
      },
    ],
  },
  {
    id: 4,
    icon:
      'https://images.unsplash.com/photo-1606342000003-62b0e935f869?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
    images: [
      'https://images.unsplash.com/photo-1606342000003-62b0e935f869?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
      'https://images.unsplash.com/photo-1606342000003-62b0e935f869?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
      'https://images.unsplash.com/photo-1606342000003-62b0e935f869?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
    ],
    price: 25999,
    details:'Praesent hendrerit finibus orci eu facilisis. Mauris porttitor sit amet elit nec dictum. Maecenas suscipit eros consectetur dolor maximus',
    title: 'Iphone 11 Pro Max 128 GB',
    rating: 3.9,
    quantity: 1,
    reviews: [],
  },
];

export {products};
