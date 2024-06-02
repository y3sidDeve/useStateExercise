import React, { useState } from "react";
import Title from "./Title";
import ButtonSuc from "./ButtonSuc";
import FormGroup from "./FormGroup";

// EJERCICIO POR YESID BERNAL - SEMANA 3
// funcion que contendra el formulario

function Form() {
  // Variables de la factura
  const iva = 0.16;

  const titulo_factura = "Factura";

  const button_data = {
    text: "Agregar Producto",
    classes: "btn btn-success mt-4 col-lg-12",
  };

  const form_group_data = [
    {
      label: "Numero de factura",
      type: "number",
      placeholder: "Ingrese No de factura",
      key: "factura",
      classes: "form-group col-lg-6 mb-2",
    },
    {
      label: "Nombre del Cliente",
      type: "text",
      placeholder: "Ingrese su nombre",
      key: "nombre",
      classes: "form-group col-lg-6 mb-2",
    },
    {
      label: "Cédula",
      type: "number",
      placeholder: "Ingrese su cédula",
      key: "cedula",
      classes: "form-group col-lg-6 mb-2",
    },
    {
      label: "Teléfono",
      type: "text",
      placeholder: "Ingrese su teléfono",
      key: "telefono",
      classes: "form-group col-lg-6 mb-2",
    },
    {
      label: "Correo",
      type: "email",
      placeholder: "Ingrese su correo",
      key: "correo",
      classes: "form-group col-12 mb-2",
    },
    {
      label: "",
      type: "number",
      placeholder: "ID Producto",
      key: "id",
      classes: "form-group col-6 mb-3",
    },
    {
      label: "",
      type: "text",
      placeholder: "Descripcion",
      key: "description",
      classes: "form-group col-6 mb-3",
    },
    {
      label: "",
      type: "number",
      placeholder: "Valor Unitario",
      key: "price",
      classes: "form-group col-6 mb-1",
    },
    {
      label: "",
      type: "number",
      placeholder: "Cantidad",
      key: "quantity",
      classes: "form-group col-6 mb-1",
    },
  ];

  // Estado inicial del producto
  const initialProductState = {
    id: "",
    description: "",
    price: "",
    quantity: "",
  };

  // Estados del formulario
  const [product, setProduct] = useState(initialProductState);
  const [productList, setProductList] = useState([]);

  // Maneja el cambio de valores del formulario
  // Basicamente, cada vez que se escribe en un input, se actualiza el estado del producto
  // solo al final, cuando se envía el formulario, se agrega el producto a la lista de productos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  // Maneja el envío del formulario
  // Agrega el producto a la lista de productos
  // Limpia el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setProductList((prevList) => [...prevList, product]);

    console.log(productList);
    console.log(product);

    // limpiar el formulario:
    setProduct({ initialProductState });
  };

  // Elimina un producto de la lista
  const handleDelete = (index) => {
    setProductList((prevList) => prevList.filter((_, i) => i !== index)); // Filtra la lista de productos para eliminar el producto en la posición index
  };

  return (
    <>
    {/* El formulario se compone de otros componentes para asemejar el estilo del ejercicio, a pesar de poderse dividir mas,
     no pude crear el sistema con componentes mas especificos  */}
      <form onSubmit={handleSubmit} className="form container">  
        <div className="row p-5">
          <Title text={titulo_factura} />
          {form_group_data.map((data, index) => (
            <FormGroup
              key={index}
              label={data.label}
              type={data.type}
              placeholder={data.placeholder}
              classes={data.classes}
              name={data.key}
              onChange={handleChange}
              value={product[data.key] || ""}
            />
          ))}
          <ButtonSuc
            type="submit"
            text={button_data.text}
            classes={button_data.classes}
          />
          <table className="table mt-3 table-bordered">
            <thead>
              <tr className="table-secondary">
                <th>Id Producto</th>
                <th>Descripcion</th>
                <th>Valor Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price * product.quantity}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn btn-danger p-1"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row total_back">
            <div className="col-lg-2 offset-9 fw-semibold">
              <p>Subtotal</p>
              <p>{`IVA (${iva * 100}%):`}</p>
              <p>Total</p>
            </div>
            <div className="col-lg-1 fw-semibold">
              <p>
                {productList
                  .reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
              <p>
                {(
                  productList.reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  ) * iva
                ).toFixed(2)}
              </p>
              <p>
                {(
                  productList.reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  ) +
                  productList.reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  ) *
                    iva
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
