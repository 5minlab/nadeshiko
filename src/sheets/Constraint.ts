export enum ConstraintType {
	ForeignKey = 'fk',
	Unique = 'unique'
}

export interface Constraint {
	type: ConstraintType
	firstTable: string
	firstAttribute: string
	secondTable: string
	secondAttribute: string
}

export const makeConstraint = (row: string[]): Constraint => {
	// TODO check type value
	return {
		type: row[0] as ConstraintType,
		firstTable: row[1],
		firstAttribute: row[2],
		secondTable: row[3],
		secondAttribute: row[4]
	}
}

export const makeConstraints = (
	values: string[][] | undefined
): Constraint[] => {
	if (values === undefined) {
		return []
	}
	// else...
	return values.map(row => makeConstraint(row))
}

export class ConstraintTable {
	private readonly constraints: Constraint[]

	constructor(constraints: Constraint[]) {
		this.constraints = constraints
	}
}
