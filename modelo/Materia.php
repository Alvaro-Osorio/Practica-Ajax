<?php
include_once("AccesoDatos.php");
class Materia{

private $nClave=0;
private $nNombre="";
private $nCreditos=0;	

   
	function setClave($pnValor){
       $this->nClave = $pnValor;
	}
   
	function getClave(){
       return $this->nClave;
	}
   
	function setNombreMateria($pnValor){
       $this->nNombre= $pnValor;
	}
   
	function getNombreMateria(){
       return $this->nNombre;
	}
   
   function setCreditos($pnValor){
       $this->nCreditos = $pnValor;
	}
   
	function getCreditos(){
       return $this->nCreditos;
	}

	/*Busca todas las Materias*/
	function buscarTodos(){
	$oAccesoDatos=new AccesoDatos();
	$sQuery="";
	$arrRS=null;
	$arrMat = null;
	$arrLinea=null;
	$j=0;
	$oMat=null;
		if ($oAccesoDatos->conectar()){
		 	$sQuery = "SELECT ncvemateria, snombremateria, ncreditos
						FROM materia";				
			$arrRS = $oAccesoDatos->ejecutarConsulta($sQuery);
			$oAccesoDatos->desconectar();
			if ($arrRS){
				foreach($arrRS as $arrLinea){
					$oMat = new Materia();
					$oMat->setClave($arrLinea[0]);
					$oMat->setNombreMateria($arrLinea[1]);
					$oMat->setCreditos($arrLinea[2]);
					
            		$arrMat[$j] = $oMat;
					$j=$j+1;
                }
			}
        }
		return $arrMat;
	}
 }
 ?>