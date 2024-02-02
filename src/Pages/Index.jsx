import { useLoaderData } from "react-router-dom";

import Cliente from "../Components/Cliente";

import { ObtenerClientes } from "../Data/Clientes";

export function loader() {
  const Clientes = ObtenerClientes();

  return Clientes;
}

function Index() {
  const Clientes = useLoaderData();

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      {Clientes.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Clientes.map((cliente) => (
              <Cliente cliente={cliente} key={cliente.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay clientes aún</p>
      )}
    </div>
  );
}

export default Index;
