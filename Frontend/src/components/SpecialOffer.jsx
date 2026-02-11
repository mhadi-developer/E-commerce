import React from "react";

const SpecialOffer = () => {
  const offers = [
    {
      id: 1,
      img: "assesst/img/offer-1.jpg",
      discount: "Save 20%",
      title: "Special Offer",
      link: "#",
    },
    {
      id: 2,
      img: "assesst/img/offer-2.jpg",
      discount: "Save 20%",
      title: "Special Offer",
      link: "#",
    },
  ];

  return (
    <div className="container-fluid pt-5 pb-3">
      <div className="row px-xl-5">
        {offers.map((offer) => (
          <div key={offer.id} className="col-md-6">
            <div className="product-offer mb-30" style={{ height: "300px" }}>
              <img className="img-fluid" src={offer.img} alt={offer.title} />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">{offer.discount}</h6>
                <h3 className="text-white mb-3">{offer.title}</h3>
                <a href={offer.link} className="btn btn-primary">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;
