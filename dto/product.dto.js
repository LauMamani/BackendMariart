const productDTO = (product) => {
    return {
      _id: product._id,  
      thumbnail: product.thumbnail,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category
    };
  };
  export default productDTO;

 
