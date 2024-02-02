import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";

import { ObtenerCliente, ActualizarClientes } from "../Data/Clientes";

import Formulario from "../Components/Formulario";
import Error from "../Components/Error";

export async function loader({ params }) {
  const Cliente = await ObtenerCliente(params.ClienteId);

  if (Object.values(Cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "El cliente no fue encontrado",
    });
  }
  return Cliente;
}

export async function action({ request, params }) {
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

  //ACTUALIZAR EL CLIENTE
  await ActualizarClientes(params.ClienteId, Datos);

  return redirect("/");
}

function EditarCliente() {
  const Navigate = useNavigate();
  const Cliente = useLoaderData();
  const Errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        A continuacion podras modificar los datos de un cliente
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
          <Formulario Cliente={Cliente} />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Guardar Cambios"
          ></input>
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
