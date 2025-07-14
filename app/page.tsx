import { Product as ProductType,  Banner as BannerType } from '../sanity.types';
//we have created a sanity.types folder which makes interface of Product based on schemaType
import {client} from '../sanity/lib/client' 
import { Product, FooterBanner, HeroBanner} from '../components'


const fetchProducts = async () => {      //_type = name
  const query = '*[_type == "product"]';// filter to only those where the _type field is "product" from sanity schema
  return await client.fetch(query);    
};

const fetchBanner = async () => {
  const query = '*[_type == "banner"]';
  return await client.fetch(query);
};

const index = async () => {
  const products:ProductType[] = await fetchProducts();
  const bannerData : BannerType[] = await fetchBanner();

  return (
    <>
     <HeroBanner  heroBanner={bannerData.length > 0 ? bannerData[0] : null} />
     
     <div className="products-heading">
        <h2 >Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>
        
        <div className="products-container">
          {/* mapped products should go in Product component by using productProp which have value of whole object element of array (named product also) */}
           {products?.map((product)=> <Product key={product._id}
           productProp={product}
           />)} 
        </div>
     
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
</>
  );
}
 
export default index