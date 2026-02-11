import React from 'react'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router'
import { CartContext } from '../App.jsx'
import { useContext } from 'react'




function ProductCard(props){


const {cart , setCart} = useContext(CartContext)


// function slugify(text) {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, '')   // remove special characters
//     .replace(/[\s_-]+/g, '-')   // replace spaces/underscores with hyphens
//     .replace(/^-+|-+$/g, '');   // remove leading/trailing hyphens
// }

const handelAddToCart = (p)=>{

let foundItem = cart.find((i)=>i._id==p._id)

if(!foundItem){
  p.quantity=1
 
  setCart([...cart, p])

}



}


  return (
    <div>
  <div className="card my-3">
  <div className='card-img'>
    <img src={props.product.image} className="card-img-top" alt="..."/>
  </div>
  <div className="card-body text-center">
    <button href="#" className="btn btn-info w-100 mb-3" disabled={cart.find((i)=>i.id==props.product._id)?true:false} onClick={()=>handelAddToCart(props.product)}>{cart.find((i)=>i._id==props.product._id)?'Added':'Add to Cart'}</button>
<Link to={`/products/${props.product.slug}`} style={{textDecoration:"none", color:"black"}}>
    <h5 className="card-title">{props.product.title}</h5>
</Link>
    <p className="card-text mb-1">{props.product.price}-RS</p>
      <Rating readonly={true} allowFraction={true} transition={true} initialValue={props.product.rating.rate} />({props.product.rating.count})
        </div>
      </div>
    </div>
  )
}

export default ProductCard
