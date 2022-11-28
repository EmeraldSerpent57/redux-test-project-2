import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    name: "Sci-fi Book",
    description: "An alien utopia!",
  },
  {
    id: "p2",
    price: 8,
    name: "Romance Book",
    description: "Love, hardships, and an unforgettable ending!",
  },
  {
    id: "p3",
    price: 7,
    name: "Self-Help Book",
    description: "Want to better yourself? Read this!",
  },
  {
    id: "p4",
    price: 8,
    name: "Fantasy Book",
    description: "Vampires, Fairies, and Werewolves, OH MY!",
  },
  {
    id: "p5",
    price: 10,
    name: "Cook Book",
    description: "Easy and delicious recipies!",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
        
      </ul>
    </section>
  );
};

export default Products;
