<?php
/*************************************************************/
/* Archivo:  tablaconsultores.php
 * Objetivo: consulta general sobre Alumnoes y acceso a operaciones detalladas
 * Autor:    BAOZ
 *************************************************************/
include_once("modelo/Materia.php");
include_once("modelo/Usuario.php");
session_start();
$sErr="";
$sNom="";
$sTipo="";
$arrMaterias=null;
$oUsu = new Usuario();
$oMat = new Materia();
	if (isset($_SESSION["usu"])){
		$oUsu = $_SESSION["usu"];
		$sNom = $oUsu->getNombre();
		$sTipo = $_SESSION["tipo"];
		try{
			$arrMaterias = $oMat->buscarTodos();
		}catch(Exception $e){
			//Enviar el error específico a la bitácora de php (dentro de php\logs\php_error_log
			error_log($e->getFile()." ".$e->getLine()." ".$e->getMessage(),0);
			$sErr = "Error en base de datos, comunicarse con el administrador";
		}
	}
	else
		$sErr = "Falta establecer el login";
	
	if ($sErr == ""){
		include_once("arriba.php");
		include_once("menu.php");
	}
	else{
		header("Location: error.php?sErr=".$sErr);
		exit();
	}
 ?>
        <div id="contenido">
			<section>
				
					<table border="1" id="tblMaterias">
						<tr>
							<td>Clave</td>
							<td>Nombre</td>
							<td>Creditos</td>
						</tr>
						<?php
							if ($arrMaterias!=null){
								//$i=0;
								foreach($arrMaterias as $oMat){
									//$i++; 
						?>
						<tr>
							<td class="llave"><?php echo $oMat->getClave(); ?></td>
							<td><?php echo $oMat->getNombreMateria() ; ?></td>
							<td><?php echo $oMat->getCreditos();?></td>
							
						</tr>
						<?php 
								}//foreach
							}else{
						?>     
						<tr>
							<td colspan="7">No hay datos</td>
						</tr>
						<?php
							}
						?>
					</table>
				</form>
			</section>
		</div>
<?php
include_once("abajo.php");
?>