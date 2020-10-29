<!DOCTYPE html>
<html>
	<head>
		<title>Ejemplo BD y jQuery</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
			<!-- Inclusión de hojas de estilos -->
			<link rel="stylesheet" type="text/css" href="css/estilo1.css"> 
			<link rel="stylesheet" type="text/css" href="jslib/jquery-ui-custom/jquery-ui.css">
			<!-- Inclusión de biblioteca jQuery -->
			<script type="text/javascript" src="jslib/jquery-3.2.1.js">
			</script>
			<!-- Inclusión de biblioteca jQueryUI -->
			<script type="text/javascript" src="jslib/jquery-ui-custom/jquery-ui.js">
			</script>
			<!-- JS propio -->
			<script language="javascript" src="js/ingresa.js"></script>
			<script language="javascript" src="js/varios.js"></script>
			<script>
				$(document).ready(function(){
					$('input[type="button"]').addClass("ui-button ui-corner-all");
					$('input[type="submit"]').addClass("ui-button ui-corner-all");
				});
			</script>
	</head>
	<body class="ui-widget">
        <div id="header">
			<header>
				<div class="por_columnas_cab">
					<figure style="height: 2.7em; display: inline-block;">
						<img src="media/logo.jpg" border="0" style="height: 100%;" />
					</figure>
					<h1 id="nomSitio">Escuela</h1>
					<h1 id="nomSitio">&nbsp;</h1>
				</div>
			</header>
        </div>