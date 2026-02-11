import React from "react";

const FilterSection = ({ title, allLabel, allId, items }) => {
  return (
    <>
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">{title}</span>
      </h5>

      <div className="bg-secondary p-4 mb-30">
        <form>
          {/* All Option */}
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              defaultChecked
              id={allId}
            />
            <label className="custom-control-label" htmlFor={allId}>
              {allLabel}
            </label>
            <span className="badge border font-weight-normal">1000</span>
          </div>

          {/* Dynamic Options */}
          {items.map((item) => (
            <div
              key={item.id}
              className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id={item.id}
              />
              <label className="custom-control-label" htmlFor={item.id}>
                {item.label}
              </label>
              <span className="badge border font-weight-normal text-primary">
                {item.count}
              </span>
            </div>
          ))}
        </form>
      </div>
    </>
  );
};

const ShopSidebar = () => {
  const priceFilters = [
    { id: "price-1", label: "$0 - $100", count: 150 },
    { id: "price-2", label: "$100 - $200", count: 295 },
    { id: "price-3", label: "$200 - $300", count: 246 },
    { id: "price-4", label: "$300 - $400", count: 145 },
    { id: "price-5", label: "$400 - $500", count: 168 },
  ];

  const colorFilters = [
    { id: "color-1", label: "Black", count: 150 },
    { id: "color-2", label: "White", count: 295 },
    { id: "color-3", label: "Red", count: 246 },
    { id: "color-4", label: "Blue", count: 145 },
    { id: "color-5", label: "Green", count: 168 },
  ];

  const sizeFilters = [
    { id: "size-1", label: "XS", count: 150 },
    { id: "size-2", label: "S", count: 295 },
    { id: "size-3", label: "M", count: 246 },
    { id: "size-4", label: "L", count: 145 },
    { id: "size-5", label: "XL", count: 168 },
  ];

  return (
    <div className="col-lg-3 col-md-4">
      <FilterSection
        title="Filter by price"
        allLabel="All Price"
        allId="price-all"
        items={priceFilters}
      />

      <FilterSection
        title="Filter by color"
        allLabel="All Color"
        allId="color-all"
        items={colorFilters}
      />

      <FilterSection
        title="Filter by size"
        allLabel="All Size"
        allId="size-all"
        items={sizeFilters}
      />
    </div>
  );
};

export default ShopSidebar;
