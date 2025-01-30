import productData from "../../data/productData";
import ProductPreviewComponent from "../../components/ProductPreviewComponent/ProductPreviewComponent";
import './CatalogPage.css';


export default function CatalogPage(props) {
    return (
        <div className="catalog-page">
            <h1>Catalog</h1>
            <div className="product-list">
                {productData.map((product) => (
                    <ProductPreviewComponent key={product.id} product={product} addToCart={props.addToCart} />
                ))}
            </div>
        </div>
    );
}