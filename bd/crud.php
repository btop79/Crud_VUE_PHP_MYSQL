<?php

include_once 'conexion.php';
$objeto = new Conexion(); //instancia de la clase conexion
$conexion = $objeto->Conectar();

//necesario para recibir parametros con Axios
$_POST = json_decode(file_get_contents("php://input"), true);

//Recepción de los datos enviados mediante POST desde main.js
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
//variables para pastel
$Id_pastel = (isset($_POST['Id_pastel'])) ? $_POST['Id_pastel'] : '';
$Nombre = (isset($_POST['Nombre'])) ? $_POST['Nombre'] : '';
$Descripcion = (isset($_POST['Descripcion'])) ? $_POST['Descripcion'] : '';
$Preparado_por = (isset($_POST['Preparado_por'])) ? $_POST['Preparado_por'] : '';
$Fecha_creacion = (isset($_POST['Fecha_creacion'])) ? $_POST['Fecha_creacion'] : '';
$Fecha_vencimiento = (isset($_POST['Fecha_vencimiento'])) ? $_POST['Fecha_vencimiento'] : '';
//variables para ingredientes 
$Id_ingrediente = (isset($_POST['Id_ingrediente'])) ? $_POST['Id_ingrediente'] : '';
$Nombre_ingrediente = (isset($_POST['Nombre_ingrediente'])) ? $_POST['Nombre_ingrediente'] : '';
$Descripcion_ingrediente = (isset($_POST['Descripcion_ingrediente'])) ? $_POST['Descripcion_ingrediente'] : '';
$Fecha_ingreso_in = (isset($_POST['Fecha_ingreso_in'])) ? $_POST['Fecha_ingreso_in'] : '';
$Fecha_vencimiento_in = (isset($_POST['Fecha_vencimiento_in'])) ? $_POST['Fecha_vencimiento_in'] : '';
// variables para asociar ingredientes
$ID_pastel1 = (isset($_POST['ID_pastel'])) ? $_POST['ID_pastel'] : '';
$ID_ingrediente1 = (isset($_POST['ID_ingrediente'])) ? $_POST['ID_ingrediente'] : '';
$Id_ingredientePastel = (isset($_POST['Id_ingredientePastel'])) ? $_POST['Id_ingredientePastel'] : '';
//echo ($Fecha_creacion, $Fecha_vencimiento)

switch ($opcion) { //se hacen las funciones
    case 1: //agregar pastel
        $consulta = "INSERT INTO pastel (Nombre, Descripcion, Preparado_por, Fecha_creacion, Fecha_vencimiento) VALUES ('$Nombre', '$Descripcion', '$Preparado_por', '$Fecha_creacion', '$Fecha_vencimiento') ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        break;
    case 2: //editar pastel
        $consulta = "UPDATE pastel SET Nombre='$Nombre', Descripcion='$Descripcion', Preparado_por='$Preparado_por', Fecha_creacion='$Fecha_creacion', Fecha_vencimiento='$Fecha_vencimiento' WHERE Id_pastel='$Id_pastel'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3: //borrar pastel
        $consulta = "DELETE FROM pastel WHERE Id_pastel='$Id_pastel' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        break;
    case 4: //listar pastel
        $consulta = "SELECT Id_pastel, Nombre, Descripcion, Preparado_por, Fecha_creacion, Fecha_vencimiento FROM pastel";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5: //agregar ingrediente
        $consulta = "INSERT INTO ingrediente (Nombre_ingrediente, Descripcion_ingrediente, Fecha_ingreso_in, Fecha_vencimiento_in) VALUES ('$Nombre_ingrediente', '$Descripcion_ingrediente', '$Fecha_ingreso_in', '$Fecha_vencimiento_in') ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        break;
    case 6: //editar ingrediente
        $consulta = "UPDATE ingrediente SET Nombre_ingrediente='$Nombre_ingrediente', Descripcion_ingrediente='$Descripcion_ingrediente',  Fecha_ingreso_in='$Fecha_ingreso_in', Fecha_vencimiento_in='$Fecha_vencimiento_in' WHERE Id_ingrediente='$Id_ingrediente'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 7: //borrar ingrediente
        $consulta = "DELETE FROM ingrediente WHERE Id_ingrediente='$Id_ingrediente'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        break;
    case 8: //listar ingrediente
        $consulta = "SELECT Id_ingrediente, Nombre_ingrediente, Descripcion_ingrediente, Fecha_ingreso_in, Fecha_vencimiento_in FROM ingrediente";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 9: //registrar tabla pastel_ingrediente
        $consulta = "INSERT INTO pastel_ingredientes (ID_pastel, ID_ingrediente) VALUES ('$ID_pastel1', '$ID_ingrediente1') ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        break;
    case 10: //listar ingrediente
        $consulta = "SELECT pastel_ingredientes.Id_Pastel_ingrediente, pastel.Nombre,ingrediente.Nombre_ingrediente FROM `pastel_ingredientes` LEFT JOIN pastel on pastel_ingredientes.ID_pastel=pastel.Id_pastel LEFT JOIN ingrediente on pastel_ingredientes.ID_ingrediente=ingrediente.Id_ingrediente";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 11: //borrar ingrediente
        $consulta = "DELETE FROM pastel_ingredientes WHERE Id_Pastel_ingrediente='$Id_ingredientePastel'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a js
$conexion = NULL;
