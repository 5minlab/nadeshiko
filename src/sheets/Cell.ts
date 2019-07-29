import { Attribute, AttributeType } from './Attribute'

export class Cell {
	private readonly attr: Attribute
	private readonly data: string | undefined

	constructor(attr: Attribute, data: string | undefined) {
		this.attr = attr
		this.data = data
	}

	public get value() {
		return this.attr.cast(this.data)
	}
	public get key() {
		return this.attr.name
	}
	public get ty(): AttributeType {
		return this.attr.ty
	}
	public get raw() {
		return this.data
	}
}
