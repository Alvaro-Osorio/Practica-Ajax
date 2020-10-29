<?php
/*************************************************************/
/* Archivo:  ejAjaxPhpBD1\index.php
 * Objetivo: página inicial de manejo de catálogo, 
 *           incluye manejo de sesiones y plantillas
 * Autor:    BAOZ
 *************************************************************/
include_once("arriba.php");
include_once("menu.php");
?>
        <div id="contenido">
			<section>
			<script src="js/ingresa.js"></script>
			<div id="espacio1">
				<form id="frm" action="return false;">
					Clave  
					<input type="text" name="txtCve" id="txtCve" required="true"/>
					<br/>
					Contrase&ntilde;a  
					<input type="password" name="txtPwd" id="txtPwd" required="true"/>
					<br/>
					<button id="btnEnviar">Enviar</button>
				</form>
			</div>
			</section>
		</div>
<?php
include_once("abajo.php");
?>