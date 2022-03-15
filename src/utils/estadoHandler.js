export function estadoForPrisma(estado) {
  if (estado === "Completo") {
    estado = ["COMPLETO"];
  } else if (estado === "En proceso") {
    estado = ["EN_PROCESO"];
  } else if (estado === "En revision") {
    estado = ["EN_REVISION"];
  }
  return estado;
}
export function estadoForFront(estado) {
  if (estado === "COMPLETO") {
    estado = "Completo";
  } else if (estado === "EN_PROCESO") {
    estado = "En proceso";
  } else if (estado === "EN_REVISION") {
    estado = "En revision";
  }
  return estado;
}
