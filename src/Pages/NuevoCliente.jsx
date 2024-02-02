import { useNavigate, Form, useActionData, redirect } from "react-router-dom";

import Formulario from "../Components/Formulario";
import Error from "../Components/Error";

import { AgregarCliente } from "../Data/Clientes";

export async function action({ request }) {
  const FormData = await request.formData();
  const Datos = Object.fromEntries(FormData);
  const Email = FormData.get("email");

  //VALIDACION
  const Errores = [];
  if (Object.values(Datos).includes("")) {
    Errores.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(Email)) {
    Errores.push("El Email no es valido");
  }

  //RETORNAR DATOS SI HAY ERRORES
  if (Object.keys(Errores).length) {
    return Errores;
  }

  await AgregarCliente(Datos);

  return redirect("/");
}

function NuevoCliente() {
  const Navigate = useNavigate();
  const Errores = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 uppercase font-bold"
          onClick={() => Navigate("/")}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {Errores?.length &&
          Errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="POST" noValidate>
          <Formulario />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Registrar Cliente"
          ></input>
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
