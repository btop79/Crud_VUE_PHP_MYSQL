<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!--Decalarando y llamando archivios CSS -->
    <!-- Estilos Boostrap CSS -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!--FontAwesome CSS para mostrar iconos --->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous" />
    <!-- Sweetalert2 para mensajes crear notificaciones y mas-->
    <link rel="stylesheet" href="plugings/sweetalert2/sweetalert2.min.css">
    <!-- CSS Custom -->
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <header>
        <h1 class="text-center text-dark"><span class="badge badge-success ">PASTELES</span></h1>
    </header>
    <p style="text-align: center;">¡Bienvenidos!</p>

    <div id="appPasteles">
        <div class="Container">
            <div class="row">
                <div class="col" style="text-align: center;">
                    <button @click="btnAgregar" class="btn btn-primary" title="Nuevo">Agregar Pastel <i class="fas fa-plus-circle fa-2x5"></i></button> <!--Con fontawesome -->
                </div>
                <div class="col" style="text-align: center;">
                    <button @click="btnAgregarIngrediente" class="btn btn-primary" title="Nuevo">Agregar Ingrediente <i class="fas fa-plus-circle fa-2x5"></i></button> <!--Con fontawesome -->
                </div>

            <!--tabla de bootstrap-->
            </div>
            <!--tabla de pasteles-->
            <div class="row mt-5">
                <div class="col-lg-12">
                    <h4 class="mx-auto">Lista de Pasteles</h4>
                    <table class="table table-striped">
                        <thead>
                            <tr class="bg-dark text-light" style="text-align: center;">
                                <th>Id Pastel</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Preparado por</th>
                                <th>Fecha creacion</th>
                                <th>Fecha vencimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody style="text-align: center;">
                            <tr v-for="(pasteles,indice) of pastel"> <!--Etiquetas vuejs para obtener los datos de las tablas-->
                                <td>{{pasteles.Id_pastel}}</td>
                                <td>{{pasteles.Nombre}}</td>
                                <td>{{pasteles.Descripcion}}</td>
                                <td>{{pasteles.Preparado_por}}</td>
                                <td>{{pasteles.Fecha_creacion}}</td>
                                <td>{{pasteles.Fecha_vencimiento}}</td>
                                <!--<td>
                                            <div class="col-md-8">
                                            <input type="number" v-model.number="pasteles.stock" class="form-control text-right" disabled> 
                                            </div> 
                                        </td> -->
                                <td>
                                    <div class="btn-group" role="group">
                                        <button class="btn btn-warning" little="Editar" @click="btnEditar(pasteles.Id_pastel, pasteles.Nombre, pasteles.Descripcion, pasteles.Preparado_por, pasteles.Fecha_creacion, pasteles.Fecha_vencimiento)"><i class="fas fa-pencil-alt"></i></button>
                                        <button class="btn btn-danger" title="Eliminar" @click="btnBorrar(pasteles.Id_pastel)"><i class="fas fa-trash-alt"></i></button>
                                        <button class="btn btn-primary" title="Ingredientes" @click="btnAsociarIngrediente(pasteles.Id_pastel, pasteles.Nombre)"><i class="fas fa-sticky-note"></i></button>

                                    </div>
                                </td>


                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--tabla de pastel_ingredientes-->
            <div class="row mt-4">
                <div class="col-lg-12">
                    <h4 class="mx-auto">Detalle de ingredientes</h4>
                    <table class="table table-striped">
                        <thead>
                            <tr class="bg-dark text-light"  style="text-align: center;">
                                <th>Id</th>
                                <th>Pastel</th>
                                <th>Ingrediente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody style="text-align: center;">
                            <tr v-for="(detalle,indice) of IngredienteAsignado"> <!--Etiquetas vuejs para obtener los datos de las tablas-->
                                <td>{{detalle.Id_Pastel_ingrediente}}</td>
                                <td>{{detalle.Nombre}}</td>
                                <td>{{detalle.Nombre_ingrediente}}</td>

                                <td>
                                    <div class="btn-group" role="group">
                                        <button class="btn btn-danger" title="Eliminar" @click="btnBorrarAsociarIngrediente(detalle.Id_Pastel_ingrediente)"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!--tabla de ingredientes-->
            <div class="row mt-4">
                <div class="col-lg-12">
                    <h4 class="mx-auto">Lista de Ingredientes</h4>
                    <table class="table table-striped">
                        <thead>
                            <tr class="bg-dark text-light"  style="text-align: center;">
                                <th>Id ingrediente</th>
                                <th>Nombre ingrediente</th>
                                <th>Descripcion ingrediente</th>
                                <th>Fecha ingreso ingrediente</th>
                                <th>Fecha vencimiento ingrediente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody style="text-align: center;">
                            <tr v-for="(ingredientes,indice) of ingrediente"> <!--Etiquetas vuejs para obtener los datos de las tablas-->
                                <td>{{ingredientes.Id_ingrediente}}</td>
                                <td>{{ingredientes.Nombre_ingrediente}}</td>
                                <td>{{ingredientes.Descripcion_ingrediente}}</td>
                                <td>{{ingredientes.Fecha_ingreso_in}}</td>
                                <td>{{ingredientes.Fecha_vencimiento_in}}</td>

                                <td>
                                    <div class="btn-group" role="group">
                                        <button class="btn btn-warning" little="Editar" @click="btnEditarIngrediente(ingredientes.Id_ingrediente, ingredientes.Nombre_ingrediente, ingredientes.Descripcion_ingrediente, ingredientes.Fecha_ingreso_in, ingredientes.Fecha_vencimiento_in)"><i class="fas fa-pencil-alt"></i></button>
                                        <button class="btn btn-danger" title="Eliminar" @click="btnBorrarIngrediente(ingredientes.Id_ingrediente)"><i class="fas fa-trash-alt"></i></button>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!--Declarando y llamando archivos javascript -->
    <script src="jquery/jquery-3.6.4.min.js"></script>
    <script src="popper/popper.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>

    <!--Vue.JS -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

    <!--Anxios -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>

    <!---Sweetalert2 --->
    <script src="plugings/sweetalert2/sweetalert2.all.min.js"></script>

    <!--Codigo custom -->
    <script src="main.js"></script>
</body>

</html>