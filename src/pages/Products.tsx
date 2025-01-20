import ProductCard from "../components/ProductCard";
import SearchForm from "../components/SearchForm";

const Products = () => {
  return (
    <div
      className="flex items-center justify-center flex-col bg-slate-50"
      style={{ height: "90vh", width: "100vw" }}
    >
      <SearchForm />
      <div>
        <ProductCard />
      </div>
    </div>
  );
};

export default Products;
