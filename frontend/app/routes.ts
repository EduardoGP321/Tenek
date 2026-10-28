import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("distribuye", "routes/distribuye.tsx"),
    route("cervezas", "routes/cervezas.tsx"),
    route("experiencia", "routes/experiencias.tsx"),
    route("contacto", "routes/contacto.tsx"),
    route("academia", "routes/academia.tsx"),
    route("ubicaciones", "routes/ubicaciones.tsx"),
] satisfies RouteConfig;
