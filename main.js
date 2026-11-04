document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  const form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const fields = [
        ["Nome", data.get("name")],
        ["Empresa/propriedade", data.get("company") || "Não informado"],
        ["Tipo de sistema", data.get("type")],
        ["Tamanho aproximado", data.get("size") || "Não informado"],
        ["Cidade/região", data.get("city")],
        ["Necessidade", data.get("message") || "Gostaria de conversar sobre um orçamento."]
      ];
      const message = "Olá! Vim pelo site da A.G.R Serviços e gostaria de solicitar um orçamento.\n\n" +
        fields.map(([label, value]) => `${label}: ${String(value).trim()}`).join("\n");
      const url = `https://wa.me/5555984255172?text=${encodeURIComponent(message)}`;
      const status = document.getElementById("form-status");
      if (status) status.textContent = "Abrindo o WhatsApp com os dados preenchidos…";
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
});