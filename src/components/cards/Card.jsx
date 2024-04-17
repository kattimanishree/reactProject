import React, { useState, useEffect } from "react";
import "./Card.css";

const Card = ({ product, addItem, removeItem, addedItems }) => {
  const [isAdded, setIsAdded] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const item = addedItems.find((addedItem) => addedItem.id === product.id);

  useEffect(() => {
    setIsAdded(!item);
  }, [item]);

  const handleUpdate = () => {
    console.log("Updated Product:", updatedProduct);

    localStorage.setItem(`product_${product.id}`, JSON.stringify(updatedProduct));
    setIsEditMode(false);
  };

  useEffect(() => {
    const storedData = localStorage.getItem(`product_${product.id}`);
    if (storedData) {
      setUpdatedProduct(JSON.parse(storedData));
    }
  }, [product.id]);

  return (
    <div className="card">
      <img className="card__img" src={updatedProduct.image} alt="" />
      <div>
        <h2>{updatedProduct.category}</h2>
        {isEditMode ? (
          <div>
            <input
              type="text"
              value={updatedProduct.title}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  title: e.target.value,
                })
              }
            />
            <textarea
              value={updatedProduct.description}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  description: e.target.value,
                })
              }
            />
            <input
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>
        ) : (
          <>
            <h4>{updatedProduct.title}</h4>
            <p>{updatedProduct.description}</p>
            <p>${updatedProduct.price}</p>
          </>
        )}
      </div>
      <div className="card-price-add">
        <span>Price: ${updatedProduct.price}</span>
        {isEditMode ? (
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <>
            <button
              className={isAdded ? "add-item-btn" : "remove-item-btn"}
              onClick={() => {
                isAdded ? addItem(updatedProduct) : removeItem(updatedProduct);
                setIsAdded(!isAdded);
              }}
            >
              {isAdded ? "POST" : "DELETE"}
            </button>
            <button className="put-btn" onClick={() => setIsEditMode(true)}>
              PUT
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
