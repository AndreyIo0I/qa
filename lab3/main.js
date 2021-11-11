export class Rectangle {
	#x
	#y
	#height
	#width

	constructor(x, y, height, width) {
		this.setX(x)
		this.setY(y)
		this.setHeight(height)
		this.setWidth(width)
	}

	setX(x) {
		if (typeof x !== 'number') {
			throw Error('invalid x')
		}
		this.#x = x
	}

	setY(y) {
		if (typeof y !== 'number') {
			throw Error('invalid y')
		}
		this.#y = y
	}

	setHeight(height) {
		if (typeof height !== 'number' || height <= 0) {
			throw Error('invalid height')
		}
		this.#height = height
	}

	setWidth(width) {
		if (typeof width !== 'number' || width <= 0) {
			throw Error('invalid width')
		}
		this.#width = width
	}

	getX() {
		return this.#x
	}

	getY() {
		return this.#y
	}

	getWidth() {
		return this.#width
	}

	getHeight() {
		return this.#height
	}

	getArea() {
		return this.#height * this.#width
	}

	getPerimeter() {
		return 2 * (this.#height + this.#width)
	}

	intersect(rect) {
		if (!(rect instanceof Rectangle)) {
			throw Error('invalid parameter')
		}
		const xIntersection = this.#x + this.#width >= rect.getX() && rect.getX() + rect.getWidth() >= this.getX()
		const yIntersection = this.#y + this.#height >= rect.getY() && rect.getY() + rect.getHeight() >= this.getY()
		return xIntersection && yIntersection
	}
}
