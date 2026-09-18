const linksViews = document.querySelectorAll("[data-view]");

const PortalEventosConteudos = document.getElementById("PortalEventosConteudos");

linksViews.forEach(function (link) {

    link.addEventListener("click", function (evento) {

        evento.preventDefault();

        const view = link.dataset.view;

        if (view === "Dashboard") {


            PortalEventosConteudos.innerHTML = `
                <h3>Dashboard</h3>
                <div class="navbar-nav flex-row gap-3">
                    <li class="navbar-nav display-5">
                        total de eventos
                        <div id="numeroContador" class="display-6 fw-bold">
                            0
                        </div>

                    <li class="navbar-nav display-5">
                        eventos agendados
                        <div id="numeroContador" class="display-6 fw-bold">
                            0
                        </div>

                    <li class="navbar-nav display-5">
                        eventos realizados
                        <div id="numeroContador" class="display-6 fw-bold">
                            0
                        </div>
                    </li>
                </div>
                `;

        }

        if (view === "Novo-evento") {

            PortalEventosConteudos.innerHTML = `
                <h3>Produtos</h3>
                <form>
                    <table>
                        <tr>
                            <th>Campo</th>
                            <th>tipo</th>
                            <th>Obrigatorio</th>
                        </tr>
                        <tr>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                        </tr>
                        <tr>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                        </tr>
                         <tr>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                        </tr>
                        <tr>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                        </tr>
                         <tr>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                            <td><input type="text" value=""></td>
                        </tr>
                    </table>
                </form>

            `;

        }

        if (view === "Eventos") {

            PortalEventosConteudos.innerHTML = `
                <h3>Contato</h3>

                <p>
                    Entre em contato conosco.
                </p>

                <div class="alert alert-success">
                    E-mail: contato@exemplo.com
                </div>
            `;

        }

    });

});
