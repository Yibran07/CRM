export async function ObtenerClientes() {
  const Respuesta = await fetch(import.meta.env.VITE_API_URL);
  const Resultado = await Respuesta.json();

  return Resultado;
}

export async function ObtenerCliente(id) {
  const Respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  const Resultado = await Respuesta.json();

  return Resultado;
}

export async function AgregarCliente(Datos) {
  try {
    const Respuesta = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(Datos),
      headers: {
        "Content-type": "application/json",
      },
    });
    await Respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export async function ActualizarClientes(id, Datos) {
  try {
    const Respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(Datos),
      headers: {
        "Content-type": "application/json",
      },
    });
    await Respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export async function EliminarCliente(id) {
  try {
    const Respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    });
    await Respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
