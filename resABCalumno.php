<?php
/*************************************************************/
/* Archivo:  resABC.php
 * Objetivo: ejecuta la afectación a Alumnoes y retorna JSON
 * Autor:    BAOZ
 *************************************************************/
include_once("modelo/Alumno.php");
session_start();

$sErr=""; $sOpe = ""; $sCve = "";
$oAlum = new Alumno();

	/*Verificar que exista la sesión*/
	if (isset($_SESSION["usu"])){
		if (isset($_POST["txtClave"]) && !empty($_POST["txtClave"]) &&
			isset($_POST["txtOpe"]) && !empty($_POST["txtOpe"])){
			$sOpe = $_POST["txtOpe"];
			$sCve = $_POST["txtClave"];
			$oAlum->setClave($sCve);
			
			if ($sOpe != "b"){
				$oAlum->setPwd($_POST["txtContrasenia"]);
				$oAlum->setNombre($_POST["txtNombre"]);
				$oAlum->setApePat($_POST["txtApePat"]);
				$oAlum->setApeMat($_POST["txtApeMat"]);
				$oAlum->setNumControl($_POST["txtNumero"]);
				$oAlum->setCveCarrera($_POST["txtCve"]);
				$oAlum->setSemestre($_POST["txtSem"]);
			}
			try{
				if ($sOpe == 'a')
					$nResultado = $oAlum->insertar();
				else if ($sOpe == 'b')
					$nResultado = $oAlum->borrar();
				else 
					$nResultado = $oAlum->modificar();
			}catch(Exception $e){
				//Enviar el error específico a la bitácora de php (dentro de php\logs\php_error_log
				error_log($e->getFile()." ".$e->getLine()." ".$e->getMessage(),0);
				$sErr = "Error en base de datos, comunicarse con el administrador";
			}
			if ($nResultado < 1){
				$sErr = "Error en bd";
			}
		}
		else{
			$sErr = "Faltan datos";
			error_log($_POST["txtOpe"],0);
			error_log($_POST["txtClave"],0);
		}
	}
	else
		$sErr = "Falta establecer el login";
	
	if ($sErr == "")
		$sDatosJSON='{"sSit":"Ok", "sError":""}';
	else
		$sDatosJSON='{"sSit":"Error", "sError":"'.$sErr.'"}';
	header('Content-type: application/json');
	echo $sDatosJSON;
?>