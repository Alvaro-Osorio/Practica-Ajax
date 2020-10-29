<?php
/*************************************************************/
/* Archivo:  tablaconsultores.php
 * Objetivo: consulta general sobre Alumnoes y acceso a operaciones detalladas
 * Autor:    BAOZ
 *************************************************************/
include_once("modelo/Alumno.php");
session_start();
$sErr="";
$sNom="";
$sTipo="";
$arrAlumnos=null;
$oUsu = new Usuario(); //no necesito include porque lo tiene Alumno.php
$oAlum = new Alumno();
$i=0;
	/*Verificar que hayan llegado los datos*/
	if (isset($_SESSION["usu"])){
		$oUsu = $_SESSION["usu"];
		$sNom = $oUsu->getNombre();
		$sTipo = $_SESSION["tipo"];
		try{
			$arrAlumnos = $oAlum->buscarTodos();
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
				<form name="formTablaGral" onsubmit="return false;">
					<input type="hidden" name="txtCveTbl" id="txtCveTbl"/>
					<input type="hidden" name="txtOpeTbl" id="txtOpeTbl"/>
					<input type="hidden" name="txtIdxTbl" id="txtIdxTbl"/>
					<table border="1" id="tblAlum">
						<tr>
							<td>Clave</td>
							<td>Nombre</td>
							<td>Apellido Paterno</td>
							<td>Apellido Materno</td>
							<td>Numero Control</td>
							<td>Cve Carrera</td>
							<td>Semestre</td>
							<td>Operaci&oacute;n</td>
						</tr>
						<?php
							if ($arrAlumnos!=null){
								$i=0;
								foreach($arrAlumnos as $oAlum){
									$i++; //El primer Alumno está en la línea 1 (la línea 0 es la cabecera)
						?>
						<tr id="lin<?php echo $i;?>">
							<td class="llave"><?php echo $oAlum->getClave(); ?></td>
							<td><?php echo $oAlum->getNombre(); ?></td>
							<td><?php echo $oAlum->getApePat(); ?></td>
							<td><?php echo $oAlum->getApeMat(); ?></td>
							<td><?php echo $oAlum->getNumControl() ; ?></td>
							<td><?php echo $oAlum->getCveCarrera() ; ?></td>
							<td><?php echo $oAlum->getSemestre()." &nbsp;";?></td>
							
							<td>
								<input type="submit" name="Submit" value="Modificar" 
								onClick="txtCveTbl.value=<?php echo $oAlum->getClave(); ?>; txtOpeTbl.value='m'; txtIdxTbl.value='lin<?php echo $i; ?>';llamaEditarAlumno();">
								<input type="submit" name="Submit" value="Borrar" 
								onClick="txtCveTbl.value=<?php echo $oAlum->getClave(); ?>; txtOpeTbl.value='b'; txtIdxTbl.value='lin<?php echo $i; ?>';llamaEditarAlumno();">
							</td>
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
					<input type="button" value="Crear Alumno" 
					onClick="txtCveTbl.value='-1';txtOpeTbl.value='a';llamaEditarAlumno();">
				</form>
				<div id="dlgEdicionAlumno" title="Editar Alumno">
					<form name="abc" 
						  onsubmit="return evalua(txtClave, txtContrasenia, txtRepite, txtNombre,txtApePat);">
						<input type="hidden" name="txtOpe" id="txtOpe">
						Clave
						<input type="number" name="txtClave" id="txtClave" size="6"
						min="1" max="32500"/>
						<br/>
						Contrase&ntilde;a
						<input type="password" name="txtContrasenia" id="txtContrasenia"/>
						<br/>
						Repite Contrase&ntilde;a
						<input type="password" name="txtRepite" id="txtRepite"/>
						<br/>
						Nombre
						<input type="text" name="txtNombre" id="txtNombre"/>
						<br/>
						Apellido Paterno
						<input type="text" name="txtApePat" id="txtApePat" />
						<br/>
						Apellido Materno
						<input type="text" name="txtApeMat" id="txtApeMat"/>
						<br/>
						Numero de Control
						<input type="number" name="txtNumero" id="txtNumero"/>
						<br/>
						Cve Carrera
						<input type="number" name="txtCve" id="txtCve"/>
						<br/>
						Semestre
						<input type="number" name="txtSem" id="txtSem"/>
						<br/>
						<button id="btnGuardarAlumno" value="Crear Alumno"/>
					</form>
				</div>
			</section>
		</div>
<?php
include_once("abajo.php");
?>