import {Rectangle} from './main.js'

describe('test rectangle', () => {

	test('constructor valid parameters', () => {
		expect(() => {
			new Rectangle(1, 2, 3, 4)
		}).not.toThrow()
	})

	test('constructor invalid x', () => {
		expect(() => {
			new Rectangle('lalala', 2, 3, 4)
		}).toThrowError('invalid x')
	})

	test('constructor invalid y', () => {
		expect(() => {
			new Rectangle(1, true, 3, 4)
		}).toThrowError('invalid y')
	})

	test('constructor invalid height', () => {
		expect(() => {
			new Rectangle(1, 2, -3000, 4)
		}).toThrowError('invalid height')
	})

	test('constructor invalid width', () => {
		expect(() => {
			new Rectangle(1, 2, 3000, 0)
		}).toThrowError('invalid width')
	})

	test('set x', () => {
		const rect = new Rectangle(-14, 700, 3, 4)
		rect.setX(-5)
		expect(rect.getX()).toBe(-5)
	})

	test('set y', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		rect.setY(-30000)
		expect(rect.getY()).toBe(-30000)
	})

	test('set height', () => {
		const rect = new Rectangle(-42000, 0, 3, 4)
		rect.setHeight(5)
		expect(rect.getHeight()).toBe(5)
	})

	test('set width', () => {
		const rect = new Rectangle(0, 0, 1, 0.1)
		rect.setWidth(5000)
		expect(rect.getWidth()).toBe(5000)
	})

	test('set invalid x', () => {
		expect(() => {
			const rect = new Rectangle(1, 2, 3, 4)
			rect.setX(true)
		}).toThrowError('invalid x')
	})

	test('set invalid y', () => {
		expect(() => {
			const rect = new Rectangle(1, 2, 3, 4)
			rect.setY('-1')
		}).toThrowError('invalid y')
	})

	test('set invalid height', () => {
		expect(() => {
			const rect = new Rectangle(1, 2, 3, 4)
			rect.setHeight('0')
		}).toThrowError('invalid height')
	})

	test('set invalid width', () => {
		expect(() => {
			const rect = new Rectangle(1, 2, 3, 4)
			rect.setWidth(-1000)
		}).toThrowError('invalid width')
	})

	test('get area', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getArea()).toBe(12)
	})

	test('get big area', () => {
		const rect = new Rectangle(1, 2, 3000, 4000)
		expect(rect.getArea()).toBe(12e6)
	})

	test('get perimeter', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getPerimeter()).toBe(14)
	})

	test('get big perimeter', () => {
		const rect = new Rectangle(1, 2, 34984, 41687)
		expect(rect.getPerimeter()).toBe(34984 + 34984 + 41687 + 41687)
	})

	test('get x', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getX()).toBe(1)
	})

	test('get y', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getY()).toBe(2)
	})

	test('get height', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getHeight()).toBe(3)
	})

	test('get width', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getWidth()).toBe(4)
	})

	test('invalid intersect parameter', () => {
		expect(() => {
			const rect = new Rectangle(1, 2, 3000, 4)
			rect.intersect('123')
		}).toThrowError('invalid parameter')
	})

	test('intersection coincidence', () => {
		const rect1 = new Rectangle(1, 2, 3, 4)
		const rect2 = new Rectangle(1, 2, 3, 4)
		expect(rect1.intersect(rect2)).toBe(true)
		expect(rect2.intersect(rect1)).toBe(true)
	})

	test('intersection corner in', () => {
		const rect1 = new Rectangle(1, 2, 3, 4)
		const rect2 = new Rectangle(-1, 0, 4, 3)
		expect(rect1.intersect(rect2)).toBe(true)
	})

	test('intersection touch y', () => {
		const rect1 = new Rectangle(1, 2, 3, 4)
		const rect2 = new Rectangle(5, 3, 3, 4)
		expect(rect1.intersect(rect2)).toBe(true)
	})

	test('intersection touch x', () => {
		const rect1 = new Rectangle(2, 1, 4, 3)
		const rect2 = new Rectangle(3, 5, 4, 3)
		expect(rect1.intersect(rect2)).toBe(true)
	})

	test('intersection in', () => {
		const rect1 = new Rectangle(1, 2, 3, 4)
		const rect2 = new Rectangle(2, 3, 0.1, 0.1)
		expect(rect1.intersect(rect2)).toBe(true)
	})

	test('intersection not x', () => {
		const rect1 = new Rectangle(1, 2, 3, 4)
		const rect2 = new Rectangle(100, -1, 4, 3)
		expect(rect1.intersect(rect2)).toBe(false)
	})

	test('intersection not y', () => {
		const rect1 = new Rectangle(1, 2, 3, 4)
		const rect2 = new Rectangle(-1, -100, 4, 3)
		expect(rect1.intersect(rect2)).toBe(false)
	})

	test('intersection not both', () => {
		const rect1 = new Rectangle(1, 2, 3, 4)
		const rect2 = new Rectangle(5.1, 6, 0.1, 0.1)
		expect(rect1.intersect(rect2)).toBe(false)
	})
})
