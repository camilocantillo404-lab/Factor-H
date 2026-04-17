"use client";

import { useState } from "react";

export default function FormCompra() {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const comprar = async () => {
    if (!form.nombre || !form.direccion || !form.telefono) {
      alert("Completa todos los campos");
      return;
    }

    const res = await fetch("/api/orden", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    // redirige a PayU
    window.location.href = data.linkPago;
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        name="nombre"
        placeholder="Nombre completo"
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        name="direccion"
        placeholder="Dirección de entrega"
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        name="telefono"
        placeholder="Número telefónico"
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <button
        onClick={comprar}
        className="bg-black text-white p-2 rounded"
      >
        Comprar ahora
      </button>
    </div>
  );
}