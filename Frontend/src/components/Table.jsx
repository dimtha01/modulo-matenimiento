import { useEffect, useState } from "react";

const API = 'https://dummyjson.com/products';

const Table = () => {
  const [datos, setDatos] = useState([])

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      console.log(data)
      setDatos(data.products);
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(() => {
    getDatos();
  }, []);
  console.log(datos)
  return (
    <>
      <div className="container">
        <table className="table border my-4">
          <thead>
            <tr>
              <th scope="col">titulo</th>
              <th scope="col">titulo</th>
              <th scope="col">titulo</th>

            </tr>
          </thead>
          <tbody>
            {datos && datos.map((item, index) => {
              return <tr key={index}>
                <th scope="col"><img src={item.images} alt="hoal" height={20}/></th>
                <th scope="col">{item.title}</th>
                <th scope="col">{item.title}</th>
              </tr>
            })}
          </tbody>
        </table>

      </div>

    </>
  )
}

export default Table