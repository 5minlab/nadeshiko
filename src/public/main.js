class TableRow extends React.Component {
	render() {
		const { table, idx } = this.props;

		return (
			<tr key={idx}>
				<td>
					<a href={`./tables/${table}`} target="_blank">{table}</a>
				</td>
				<td>
					<form>
						<button
							class="small ui button"
							type="submit"
							formaction={`./tables/${table}/sync`}
							formmethod="post"
							formtarget="_blank"
						>
							sync
						</button>
					</form>
				</td>
			</tr>
		);
	}
}

class CommandButtonList extends React.Component {
	render() {
		return (
			<div>
				<form>
					<button
						class="ui button"
						type="submit"
						formaction={`./commands/fetch`}
						formmethod="post"
						formtarget="_blank"
					>
						fetch
					</button>

					<button
						class="ui button"
						type="submit"
						formaction={`./commands/load`}
						formmethod="post"
						formtarget="_blank"
					>
						load
					</button>
				</form>
			</div>
		);
	}
}

class MetadataView extends React.Component {
	render() {
		const { metadata } = this.props;
		const { references, constraints } = metadata;
		return (
			<div>
				<h3>references</h3>
				<table class="ui celled compact table">
					<thead>
						<tr>
							<th>table</th>
							<th>range</th>
							<th>sheet</th>
						</tr>
					</thead>
					<tbody>
						{references.map((ref, idx) => <tr key={idx}>
							<td>{ref.table}</td>
							<td>{ref.range}</td>
							<td>{ref.sheet}</td>
						</tr>)}
					</tbody>
				</table>

				<h3>constraints</h3>
				<ul>
					{constraints.map((constraint, idx) => <li key={idx}>
						{JSON.stringify(constraint)}
					</li>)}
				</ul>
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			metadata: {
				constraints: [],
				references: [],
			},
		};
	}

	componentDidMount() {
		this.fetchMetadata();
	}

	async fetchMetadata() {
		const resp = await fetch('./metadata');
		const data = await resp.json();
		this.setState({ metadata: data });
	}

	getTables() {
		const { metadata } = this.state;
		const references = metadata.references;
		const tables = references.map((x) => x.table);
		return tables;
	}

	render() {
		const { metadata } = this.state;
		const tables = this.getTables();

		return (
			<div class="ui text container">
				<h1>masterdata</h1>

				<h2>commands</h2>
				<CommandButtonList />

				<h2>tables</h2>
				<table class="ui selectable celled compact table">
					<thead>
						<tr>
							<th>table</th>
							<th>actions</th>
						</tr>
					</thead>
					<tbody>
						{tables.map((table, idx) => <TableRow table={table} idx={idx} />)}
					</tbody>
				</table>

				<h2>metadata</h2>
				<MetadataView metadata={metadata} />
			</div>
		);
	}
}
ReactDOM.render(
	<App />,
	document.getElementById('id01'),
);
