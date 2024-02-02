import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Components/Layout";
import ErrorPage from "./Components/ErrorPage";
import { action as EliminarClienteAction } from "./Components/Cliente";

import NuevoCliente, {
  action as NuevoClienteAction,
} from "./Pages/NuevoCliente";
import Index, { loader as ClientesLoader } from "./Pages/Index";
import EditarCliente, {
  loader as EditarClienteLoader,
  action as EditarClienteAction,
} from "./Pages/EditarCliente";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: ClientesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Clientes/Nuevo",
        element: <NuevoCliente />,
        action: NuevoClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Clientes/:ClienteId/Editar",
        element: <EditarCliente />,
        loader: EditarClienteLoader,
        action: EditarClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Clientes/:ClienteId/Eliminar",
        action: EliminarClienteAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router}></RouterProvider>
  </React.StrictMode>
);
