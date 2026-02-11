import React from 'react'
import card from '../assets/card.png'
function Card(){
  return (
    <div>
      <img className="card-img" src={card} alt="" />
      <h1>Lorem, ipsum dolor.</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quidem.</p>
    </div>
  )
}

export default Card
