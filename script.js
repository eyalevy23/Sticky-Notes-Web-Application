const init = () => {
  const container = document.getElementById("notes");

  const div = document.createElement("div");
  div.className = "relative";
  div.innerHTML = `
        <div class="note -top-1 bg-[#A4C8E1]" style="transform: rotate(8deg)">
            <h2>Title #10</h2>
            <p>Text Content #1</p>
        </div>
        <img class="pin" src="/asset/image.svg" alt="" />
  `;
  container.appendChild(div);
};

document.addEventListener("DOMContentLoaded", init);
