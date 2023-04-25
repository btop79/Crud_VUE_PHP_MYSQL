<?php //metodo para la conexion
    class Conexion{
        public static function Conectar(){
            define('servidor', 'localhost');
            define('nombre_bd', 'crudvuephp');
            define('usuario', 'root');
            define('password', '');
            $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'); //PDO permite la conexion con bd
            try{
                $conexion = new PDO("mysql:host=".servidor."; dbname=".nombre_bd, usuario, password, $opciones);
                return $conexion;
            }catch (Exception $e){ //e=error
                die("El error de Conexion es: ". $e->getMessage());
            } 
        }
    }
?>