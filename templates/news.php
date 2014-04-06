<div class="bs-docs-section">
	<div class="page-header">
		<h1 id="news">News</h1>
	</div>
	<p>Pour ajouter, éditer et supprimer les news.</p>
	<p>Elles seront affichées dans l'ordre décroissant (la plus récente en premier) dans l'application. La date est celle de la création de la news (modifier une news ne change pas la date)</p>

	<div id="onDeleteNewsAlert" class="alert alert-danger fade in">
		<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
		<h4>La news a bien été supprimée !</h4>
		<p>(C'est trop tard, il n'est plus possible de la récupérer. )</p>
	</div>

	<table id="news-table" class="table table-bordered table-stripped table-hover"></table>

	<!-- Button to trigger modal -->
	<a id="addNewsTriggerModal" data-toggle="modal" href="#addNewModal" class="btn btn-primary btn-lg">Ajouter une news</a>
	<!-- ADD Modal -->
	<div class="modal fade" id="addNewModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">Ajouter une nouvelle</h4>
				</div>
				<form role="form">
					<div class="modal-body">
						<input id="newTitle" type="text" class="form-control" placeholder="Titre">
						<br />
						<textarea id="newContent" class="form-control" rows="3" placeholder="Contenu"></textarea>
						<br />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
						<button type="button" class="btn btn-primary" id="addNewButton">Ajouter</button>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->

	<!-- EDIT Modal -->
	<div class="modal fade" id="editNewsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">Modifier une nouvelle</h4>
				</div>
				<form role="form">
					<div class="modal-body">
						<input id="rowID" type="hidden" value="">
						<input id="newTitle" type="text" class="form-control" placeholder="Titre">
						<br />
						<textarea id="newContent" class="form-control" rows="3" placeholder="Nouvelle"></textarea>
						<br />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
						<button type="button" class="btn btn-primary" id="editNewButton">Enregistrer</button>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
</div>
