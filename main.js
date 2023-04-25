
var url = "bd/crud.php";
var appPasteles = new Vue({
    //usaremos 5 propiedades
    el: "#appPasteles", //se llama un id
    data: {
        pastel: [],
        Nombre: "",
        Descripcion: "",
        Preparado_por: "",
        Fecha_creacion: "",
        Fecha_vencimiento: "",
        ingrediente: [],
        ingrediente2: {},
        Nombre_ingrediente: "",
        Descripcion_ingrediente: "",
        Fecha_ingreso_in: "",
        Fecha_vencimiento_in: "",
        IngredienteAsignado:[],
    },   
    
    methods: {
        //botones con sweetalert
        //PASTELES
        btnAgregar: async function () { //se una el pluging de sweetalert2, y cuando enviamos los datos mediante axios se debe usar la palabra async
            const {value: formValues } = await Swal.fire({
                title: 'Nuevo',
                html:
                    '<div class="row"><label class="col-sm-4 col-form-label">Nombre</label><div class="col-sm-7"><input id="Nombre" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Descripcion</label><div class="col-sm-7"><input id="Descripcion" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Preparado por</label><div class="col-sm-5"><input id="Preparado_por" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Fecha creacion</label><div class="col-sm-5"><input id="Fecha_creacion" type="date" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Fecha vencimiento</label><div class="col-sm-4"><input id="Fecha_vencimiento" type="date" class="form-control"></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#20c997',
                cancelButtonColor: '#dc3545',
                preConfirm: () => {
                    return [ //capturamos nuestros valores
                        this.Nombre = document.getElementById('Nombre').value,
                        this.Descripcion = document.getElementById('Descripcion').value,
                        this.Preparado_por = document.getElementById('Preparado_por').value,
                        this.Fecha_creacion = document.getElementById('Fecha_creacion').value,
                        this.Fecha_vencimiento = document.getElementById('Fecha_vencimiento').value
                    ]
                }
            })
            if (this.Nombre == "" || this.Descripcion== "" || this.Preparado_por == "" || this.Fecha_creacion == "" || this.Fecha_vencimiento == "") { //control del stock si ingresa mal  los datos son incompletos
                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                })
            }
            else {
                this.agregarPastel(); //llamamos a la funcion agregar para que pida datos crud y haga la operacion
                //mensaje para mostrar que fue agregado exitosamente un producto
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    icon: 'success',
                    title: '¡Pastel Agregado!'
                })
            }
        },
        btnEditar: async function (Id_pastel, Nombre, Descripcion, Preparado_por, Fecha_creacion, Fecha_vencimiento) { //a la funcion se le pasan los parametros
            
            await Swal.fire({
                title: 'EDITAR', //se utilizan ++ para insertar javascipt en html
                html:
                    '<div class="form-group"><div class="row"><label class="col-sm-4 col-form-label">Nombre</label><div class="col-sm-7"><input id="Nombre" value="' + Nombre + '" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Descripcion</label><div class="col-sm-7"><input id="Descripcion" value="' + Descripcion + '" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Preparado por</label><div class="col-sm-7"><input id="Preparado_por" value="' + Preparado_por + '" type="text" class="form-control"></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label">Fecha creacion</label><div class="col-sm-7"><input id="Fecha_creacion" value="' + Fecha_creacion + '" type="date" class="form-control"></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label">Fecha vencimiento</label><div class="col-sm-7"><input id="Fecha_vencimiento" value="' + Fecha_vencimiento + '" type="date" class="form-control"></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
            }).then((result) => {
                //console.error(Fecha_creacion, Fecha_vencimiento);
                if (result.value) {
                    //capturo los nuevos datos si es que se modifican
                        Nombre = document.getElementById('Nombre').value,
                        Descripcion = document.getElementById('Descripcion').value,
                        Preparado_por = document.getElementById('Preparado_por').value,
                        Fecha_creacion = document.getElementById('Fecha_creacion').value,
                        Fecha_vencimiento = document.getElementById('Fecha_vencimiento').value,

                        this.editarPastel(Id_pastel, Nombre, Descripcion, Preparado_por, Fecha_creacion, Fecha_vencimiento); //procedimiento
                    Swal.fire(
                        '¡Actualizado!',
                        '¡El registro ha sido actualizado!',
                        'success'
                    )
                }
            });

        },
        btnBorrar: function (Id_pastel) {
            Swal.fire({
                title: '¿Está seguro que desea borrar el registro: ' + Id_pastel + " ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#20c997',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Borrar',
            }).then((result) => {
                if (result.value) {
                    this.borrarPastel(Id_pastel); //procedimiento borrar tiene una conexion axios que se conecta con nuestro crud case:3
                    //Mostramos un mensaje sobre la eliminacion
                    Swal.fire(
                        '¡Eliminado!',
                        'EL registro ha sido borrado',
                        'success'
                    )
                }
            })
        },

        //PROCEDIMIENTOS - PASTELES
        //Procedimiento Listar
        listarPastel: function () {
            axios.post(url, { opcion: 4 }).then(response => {
                this.pastel = response.data;
                console.log(this.pastel);
            });
        },
        //Procedimiento CREAR
        //PROCEDIMIENTOS PASTELES
        agregarPastel:function(){
            axios.post(url,{opcion:1, Nombre:this.Nombre, Descripcion:this.Descripcion, Preparado_por:this.Preparado_por, Fecha_creacion:this.Fecha_creacion, Fecha_vencimiento:this.Fecha_vencimiento}).then(response => {
                this.listarPastel();
                this.listarIngrediente();
                this.listarPastelIngrediente();
            });
            this.Nombre = "";
            this.Descripcion = "";
            this.Preparado_por = "";
            this.Fecha_creacion = "";
            this.Fecha_vencimiento = "";
        },
        //Procedimiento EDITAR
        editarPastel:function(Id_pastel, Nombre, Descripcion, Preparado_por, Fecha_creacion, Fecha_vencimiento){
            //console.error(Fecha_creacion, "   ", Fecha_vencimiento);
            axios.post(url,{opcion:2, Id_pastel:Id_pastel, Nombre:Nombre, Descripcion:Descripcion, Preparado_por:Preparado_por, Fecha_creacion:Fecha_creacion, Fecha_vencimiento:Fecha_vencimiento }).then(response => {
                this.listarPastel();
                this.listarIngrediente();
                this.listarPastelIngrediente();
            });
        },
        //Procedimiento BORRAR
        borrarPastel:function(Id_pastel){
            axios.post(url,{opcion:3, Id_pastel:Id_pastel}).then(response => {
                this.listarPastel();
                this.listarIngrediente();
                this.listarPastelIngrediente();
            });

        },

        //botones con sweetalert
        //INGREDIENTES
        btnAgregarIngrediente: async function () { //se una el pluging de sweetalert2, y cuando enviamos los datos mediante axios se debe usar la palabra async
            const {value: formValues } = await Swal.fire({
                title: 'Nuevo',
                html:
                    '<div class="row"><label class="col-sm-4 col-form-label">Nombre ingrediente</label><div class="col-sm-7"><input id="Nombre_ingrediente" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Descripcion ingrediente</label><div class="col-sm-7"><input id="Descripcion_ingrediente" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Fecha ingreso</label><div class="col-sm-5"><input id="Fecha_ingreso_in" type="date" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Fecha vencimiento</label><div class="col-sm-4"><input id="Fecha_vencimiento_in" type="date" class="form-control"></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#20c997',
                cancelButtonColor: '#dc3545',
                preConfirm: () => {
                    return [ //capturamos nuestros valores
                        this.Nombre_ingrediente = document.getElementById('Nombre_ingrediente').value, //traer una variable declarado en el data
                        this.Descripcion_ingrediente = document.getElementById('Descripcion_ingrediente').value,
                        this.Fecha_ingreso_in = document.getElementById('Fecha_ingreso_in').value,
                        this.Fecha_vencimiento_in = document.getElementById('Fecha_vencimiento_in').value
                    ]
                }
            })
            if (this.Nombre_ingrediente == "" || this.Descripcion_ingrediente== "" ||  this.Fecha_ingreso_in == "" || this.Fecha_vencimiento_in == "") { //control del stock si ingresa mal  los datos son incompletos
                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                })
            }
            else {
                this.agregarIngrediente(); //llamamos a la funcion agregar para que pida datos crud y haga la operacion
                //mensaje para mostrar que fue agregado exitosamente un producto
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    icon: 'success',
                    title: '¡Ingrediente Agregado!'
                })
            }
        },
        btnEditarIngrediente: async function (Id_ingrediente, Nombre_ingrediente, Descripcion_ingrediente, Fecha_ingreso_in, Fecha_vencimiento_in) { //a la funcion se le pasan los parametros
            
            await Swal.fire({
                title: 'EDITAR', //se utilizan ++ para insertar javascipt en html
                html:
                    '<div class="form-group"><div class="row"><label class="col-sm-4 col-form-label">Nombre ingrediente</label><div class="col-sm-7"><input id="Nombre_ingrediente" value="' + Nombre_ingrediente + '" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Descripcion ingrediente</label><div class="col-sm-7"><input id="Descripcion_ingrediente" value="' + Descripcion_ingrediente + '" type="text" class="form-control"></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label">Fecha ingreso</label><div class="col-sm-7"><input id="Fecha_ingreso_in" value="' + Fecha_ingreso_in + '" type="date" class="form-control"></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label">Fecha vencimiento</label><div class="col-sm-7"><input id="Fecha_vencimiento_in" value="' + Fecha_vencimiento_in + '" type="date" class="form-control"></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    //capturo los nuevos datos si es que se modifican
                        Nombre_ingrediente = document.getElementById('Nombre_ingrediente').value,
                        Descripcion_ingrediente = document.getElementById('Descripcion_ingrediente').value,
                        Fecha_ingreso_in = document.getElementById('Fecha_ingreso_in').value,
                        Fecha_vencimiento_in = document.getElementById('Fecha_vencimiento_in').value,

                        this.editarIngrediente(Id_ingrediente, Nombre_ingrediente, Descripcion_ingrediente, Fecha_ingreso_in, Fecha_vencimiento_in); //procedimiento
                    Swal.fire(
                        '¡Actualizado!',
                        '¡El registro ha sido actualizado!',
                        'success'
                    )
                }
            });

        },
        btnBorrarIngrediente: function (Id_ingrediente) {
            Swal.fire({
                title: '¿Está seguro que desea borrar el registro: ' + Id_ingrediente + " ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#20c997',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Borrar',
            }).then((result) => {
                if (result.value) {
                    this.borrarIngrediente(Id_ingrediente); //procedimiento borrar tiene una conexion axios que se conecta con nuestro crud case:3
                    //Mostramos un mensaje sobre la eliminacion
                    Swal.fire(
                        '¡Eliminado!',
                        'EL registro ha sido borrado',
                        'success'
                    )
                }
            })
        },
        btnAsociarIngrediente: function (Id_pastel, Nombre) {
            Swal.fire({
                title: 'Asociar Ingrediente',
                text:'Pastel: '+Nombre,
                input: 'select',
                inputOptions: this.ingrediente2,
                inputPlaceholder: 'Seleccionar opción',
                showCancelButton: true
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log(result.value);
                  console.log(Id_pastel);
                  axios.post(url,{opcion:9, ID_pastel:Id_pastel, ID_ingrediente:result.value,}).then(response => {
                    this.listarPastel();
                    this.listarIngrediente();
                    this.listarPastelIngrediente();
                });
                }
              });
        },

        //PROCEDIMIENTOS INGREDIENTES
        //Procedimiento Listar
        listarIngrediente: function () {
            axios.post(url, { opcion: 8 }).then(response => {
                this.ingrediente = response.data;
                this.ingrediente2 = response.data.reduce((obj, opcion) => {
                    obj[opcion.Id_ingrediente] = `${opcion.Nombre_ingrediente} (${opcion.Descripcion_ingrediente})`;
                    return obj;
                  }, {});;
            
                console.log(this.ingrediente2);
            });
        },
        //Procedimiento CREAR
        agregarIngrediente:function(){
            axios.post(url,{opcion:5, Nombre_ingrediente:this.Nombre_ingrediente, Descripcion_ingrediente:this.Descripcion_ingrediente,  Fecha_ingreso_in:this.Fecha_ingreso_in, Fecha_vencimiento_in:this.Fecha_vencimiento_in}).then(response => {
                this.listarPastel();
                this.listarIngrediente();
                this.listarPastelIngrediente();
            });
            this.Nombre = "";
            this.Descripcion = "";
            this.Preparado_por = "";
            this.Fecha_creacion = "";
            this.Fecha_vencimiento = "";
        },
        //Procedimiento EDITAR
        editarIngrediente:function(Id_ingrediente, Nombre_ingrediente, Descripcion_ingrediente, Fecha_ingreso_in, Fecha_vencimiento_in){
            //console.error(Fecha_creacion, "   ", Fecha_vencimiento);
            axios.post(url,{opcion:6, Id_ingrediente:Id_ingrediente,Nombre_ingrediente:Nombre_ingrediente, Descripcion_ingrediente:Descripcion_ingrediente, Fecha_ingreso_in:Fecha_ingreso_in, Fecha_vencimiento_in:Fecha_vencimiento_in }).then(response => {
                this.listarPastel();
                this.listarIngrediente();
                this.listarPastelIngrediente();
            });
        },
        //Procedimiento BORRAR
        borrarIngrediente:function(Id_ingrediente){
            axios.post(url,{opcion:7, Id_ingrediente:Id_ingrediente}).then(response => {
                this.listarPastel();
                this.listarIngrediente();
                this.listarPastelIngrediente();
            });

        },

        //Procedimiento lista de ingredientes asociados
        listarPastelIngrediente: function () {
            axios.post(url, { opcion: 10 }).then(response => {
                this.IngredienteAsignado = response.data;
                console.log(this.IngredienteAsignado);
            });
        },
        btnBorrarAsociarIngrediente: function (Id_Pastel_ingrediente) {
            Swal.fire({
                title: '¿Está seguro que desea borrar el registro: ' + Id_Pastel_ingrediente + " ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#20c997',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Borrar',
            }).then((result) => {
                if (result.value) {
                    this.borrarIngredientePastel(Id_Pastel_ingrediente); //procedimiento borrar tiene una conexion axios que se conecta con nuestro crud case:3
                    //Mostramos un mensaje sobre la eliminacion
                    Swal.fire(
                        '¡Eliminado!',
                        'EL registro ha sido borrado',
                        'success'
                    )
                }
            })
        },
          //Procedimiento BORRAR
          borrarIngredientePastel:function(Id_Pastel_ingrediente){
            axios.post(url,{opcion:11, Id_ingredientePastel:Id_Pastel_ingrediente}).then(response => {
                this.listarPastel();
                this.listarIngrediente();
                this.listarPastelIngrediente();
            });

        },

        },

        created: function () { //cada vez que el vue inicia busca y estas funciones se ejecutan primero
            this.listarPastel();
            this.listarIngrediente();
            this.listarPastelIngrediente();
        },
        computed: {  //computed sirve para hacer calculos y otras cosas

        }
    });



